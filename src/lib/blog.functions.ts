import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image_url: string;
  read_time: string;
  intro: string; // HTML body from rich text editor
  sections: any;
  why_7wings: any;
  cta_label: string | null;
  cta_slug: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const PostInputSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "lowercase, numbers and hyphens only"),
  title: z.string().min(1).max(240),
  excerpt: z.string().min(1).max(500),
  category: z.string().min(1).max(80),
  author: z.string().min(1).max(120).default("7 Wings Editorial"),
  image_url: z.string().url(),
  read_time: z.string().min(1).max(40).default("5 min read"),
  intro: z.string().min(1),
  cta_label: z.string().max(120).nullable().optional(),
  cta_slug: z.string().max(160).nullable().optional(),
  published: z.boolean().default(true),
});

const AuthSchema = z.object({ token: z.string().min(1) });

function checkToken(token: string) {
  const expected = process.env.ADMIN_BLOG_TOKEN;
  if (!expected) throw new Error("ADMIN_BLOG_TOKEN secret is not configured");
  if (token !== expected) throw new Error("Invalid admin token");
}

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/* ── Public reads ── */

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const admin = await getAdmin();
  const { data, error } = await admin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DbBlogPost[];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    const admin = await getAdmin();
    const { data: row, error } = await admin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row ?? null) as DbBlogPost | null;
  });

/* ── Admin: auth check ── */

export const verifyAdminToken = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => AuthSchema.parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    return { ok: true as const };
  });

/* ── Admin: list / upsert / delete ── */

export const adminListPosts = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => AuthSchema.parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    const admin = await getAdmin();
    const { data: rows, error } = await admin
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as DbBlogPost[];
  });

export const adminUpsertPost = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ token: z.string().min(1), post: PostInputSchema }).parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const admin = await getAdmin();
    const payload = {
      ...data.post,
      sections: [],
      why_7wings: [],
    };
    const query = data.post.id
      ? admin.from("blog_posts").update(payload).eq("id", data.post.id).select().single()
      : admin.from("blog_posts").insert(payload).select().single();
    const { data: row, error } = await query;
    if (error) throw new Error(error.message);
    return row as DbBlogPost;
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ token: z.string().min(1), id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const admin = await getAdmin();
    const { error } = await admin.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/* ── Admin: image upload (base64 → storage) ── */

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        token: z.string().min(1),
        filename: z.string().min(1).max(200),
        contentType: z.string().min(1).max(100),
        dataBase64: z.string().min(1),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const admin = await getAdmin();
    const bytes = Buffer.from(data.dataBase64, "base64");
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safeName}`;
    const { error: upErr } = await admin.storage
      .from("blog-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (upErr) throw new Error(upErr.message);
    const { data: signed, error: signErr } = await admin.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 5); // 5 years
    if (signErr) throw new Error(signErr.message);
    return { url: signed.signedUrl, path };
  });
