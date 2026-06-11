import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SectionSchema = z.object({
  heading: z.string().trim().min(1).max(200),
  markdown: z.string().trim().min(1).max(20000),
});

const PostInputSchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes only"),
  title: z.string().trim().min(3).max(200),
  excerpt: z.string().trim().min(10).max(500),
  category: z.string().trim().min(2).max(60),
  author: z.string().trim().min(2).max(80),
  imageUrl: z.string().url().max(2000),
  readTime: z.string().trim().min(2).max(40),
  intro: z.string().trim().min(10).max(3000),
  sections: z.array(SectionSchema).min(1).max(20),
  why7Wings: z.array(z.string().trim().min(3).max(400)).max(10),
  ctaLabel: z.string().trim().max(80).optional().nullable(),
  ctaSlug: z.string().trim().max(80).optional().nullable(),
  published: z.boolean().default(true),
});

export type PostInput = z.infer<typeof PostInputSchema>;

export interface DbBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  intro: string;
  sections: { heading: string; markdown: string }[];
  why7Wings: string[];
  date: string;
  cta?: { label: string; slug?: string };
  published: boolean;
  source: "db";
}

function mapRow(row: Record<string, unknown>): DbBlogPost {
  const publishedAt = new Date(row.published_at as string);
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    category: row.category as string,
    author: row.author as string,
    image: row.image_url as string,
    readTime: row.read_time as string,
    intro: row.intro as string,
    sections: (row.sections as { heading: string; markdown: string }[]) ?? [],
    why7Wings: (row.why_7wings as string[]) ?? [],
    date: publishedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    cta: row.cta_label
      ? { label: row.cta_label as string, slug: (row.cta_slug as string) ?? undefined }
      : undefined,
    published: row.published as boolean,
    source: "db",
  };
}

export const listDbPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
});

export const getDbPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ? mapRow(row) : null;
  });

function checkToken(token: string) {
  const expected = process.env.ADMIN_BLOG_TOKEN;
  if (!expected) throw new Error("ADMIN_BLOG_TOKEN is not configured on the server.");
  if (!token || token.length < 4 || token !== expected) throw new Error("Invalid admin token.");
}

export const verifyAdminToken = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    return { ok: true };
  });

export const adminListPosts = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => ({ ...mapRow(r), published: r.published as boolean }));
  });

export const adminGetPost = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; slug: string }) =>
    z.object({ token: z.string().min(1).max(500), slug: z.string().min(1).max(120) }).parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ? mapRow(row) : null;
  });

export const upsertPost = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; post: PostInput; originalSlug?: string }) =>
    z
      .object({
        token: z.string().min(1).max(500),
        post: PostInputSchema,
        originalSlug: z.string().max(120).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      slug: data.post.slug,
      title: data.post.title,
      excerpt: data.post.excerpt,
      category: data.post.category,
      author: data.post.author,
      image_url: data.post.imageUrl,
      read_time: data.post.readTime,
      intro: data.post.intro,
      sections: data.post.sections,
      why_7wings: data.post.why7Wings,
      cta_label: data.post.ctaLabel || null,
      cta_slug: data.post.ctaSlug || null,
      published: data.post.published,
    };
    if (data.originalSlug && data.originalSlug !== data.post.slug) {
      const { error } = await supabaseAdmin.from("blog_posts").update(row).eq("slug", data.originalSlug);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("blog_posts")
        .upsert(row, { onConflict: "slug" });
      if (error) throw new Error(error.message);
    }
    return { ok: true, slug: data.post.slug };
  });

export const deletePost = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; slug: string }) =>
    z.object({ token: z.string().min(1).max(500), slug: z.string().min(1).max(120) }).parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const UploadSchema = z.object({
  token: z.string().min(1).max(500),
  filename: z.string().min(1).max(200),
  contentType: z.string().min(3).max(100),
  base64: z.string().min(10).max(8_000_000), // ~6 MB after decode
});

export const uploadBlogImage = createServerFn({ method: "POST" })
  .inputValidator((d: z.infer<typeof UploadSchema>) => UploadSchema.parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    if (!/^image\/(png|jpe?g|webp|gif|avif)$/.test(data.contentType)) {
      throw new Error("Only PNG, JPEG, WebP, GIF or AVIF images are allowed.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const buf = Buffer.from(data.base64, "base64");
    if (buf.byteLength > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB.");
    const ext = data.filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabaseAdmin.storage
      .from("blog-images")
      .upload(key, buf, { contentType: data.contentType, upsert: false });
    if (upErr) throw new Error(upErr.message);
    // Long-lived signed URL (10 years). Bucket is private but URL is shareable.
    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("blog-images")
      .createSignedUrl(key, 60 * 60 * 24 * 365 * 10);
    if (signErr || !signed) throw new Error(signErr?.message || "Failed to sign URL");
    return { url: signed.signedUrl, key };
  });
