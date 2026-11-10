import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BRAND_LOGO_KEY, validBlogAdmin } from "./blog-cover";

export const getBlogBrand = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().max(500) }).parse(d))
  .handler(async ({ data }) => {
    if (!validBlogAdmin(data.token, process.env.ADMIN_BLOG_TOKEN)) throw new Error("Invalid admin password.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const bucket = supabaseAdmin.storage.from("blog-images");
    const { data: files, error } = await bucket.list("brand");
    if (error) throw new Error(error.message);
    if (!files?.some((file) => file.name === "cover-logo")) return { url: "" };
    const { data: signed, error: signError } = await bucket.createSignedUrl(BRAND_LOGO_KEY, 3600);
    if (signError || !signed) throw new Error(signError?.message || "Cannot load brand logo.");
    return { url: signed.signedUrl };
  });

export const saveBlogBrand = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; base64: string; contentType: string }) => z.object({
    token: z.string().max(500), base64: z.string().min(10).max(7_000_000),
    contentType: z.enum(["image/png", "image/jpeg", "image/webp"]),
  }).parse(d))
  .handler(async ({ data }) => {
    if (!validBlogAdmin(data.token, process.env.ADMIN_BLOG_TOKEN)) throw new Error("Invalid admin password.");
    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.length > 5 * 1024 * 1024) throw new Error("Logo must be under 5 MB.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const bucket = supabaseAdmin.storage.from("blog-images");
    const { error } = await bucket.upload(BRAND_LOGO_KEY, bytes, { contentType: data.contentType, upsert: true, cacheControl: "0" });
    if (error) throw new Error(error.message);
    const { data: signed, error: signError } = await bucket.createSignedUrl(BRAND_LOGO_KEY, 3600);
    if (signError || !signed) throw new Error(signError?.message || "Cannot load saved logo.");
    return { url: signed.signedUrl };
  });