import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { coverPrompt, validBlogAdmin } from "@/lib/blog-cover";

const schema = z.object({
  title: z.string().trim().min(3).max(200), country: z.string().trim().min(2).max(60),
  topic: z.string().max(8000), content: z.string().max(500000), instructions: z.string().max(4000),
  previous: z.string().max(20_000_000).optional(),
});

export const Route = createFileRoute("/api/public/blog-cover")({
  server: { handlers: { POST: async ({ request }) => {
    const token = request.headers.get("Authorization")?.replace(/^Bearer /, "") || "";
    if (!validBlogAdmin(token, process.env.ADMIN_BLOG_TOKEN)) return Response.json({ error: { message: "Invalid admin password." } }, { status: 401 });
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: { message: "Enter a blog title and country before generating a cover." } }, { status: 400 });
    const key = process.env.GEMINI_API_KEY;
    if (!key) return Response.json({ error: { message: "Gemini is not configured." } }, { status: 500 });
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [{ text: coverPrompt(parsed.data) }];
    if (parsed.data.previous) {
      const match = parsed.data.previous.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
      if (!match) return Response.json({ error: { message: "Invalid previous cover image." } }, { status: 400 });
      parts.push({ inlineData: { mimeType: `image/${match[1]}`, data: match[2] } });
    }
    const upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:streamGenerateContent?alt=sse", {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: {
        responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
      } }),
    });
    return new Response(upstream.body, { status: upstream.status, headers: {
      "Content-Type": upstream.headers.get("Content-Type") || "application/json", "Cache-Control": "no-store",
    } });
  } } },
});