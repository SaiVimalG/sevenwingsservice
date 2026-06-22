import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are an expert immigration content writer for 7 Wings Immigration, a consultancy that helps Indians move abroad (Canada, Australia, Germany, UK, etc.).

Given a blog TOPIC, write a complete, SEO-friendly blog article in JSON with this exact shape:
{
  "title": "...",        // catchy, <=70 chars, includes the main keyword
  "excerpt": "...",      // 1-2 sentence summary, <=180 chars
  "contentHtml": "..."   // full article body as clean semantic HTML
}

contentHtml rules:
- Use <h2> for main sections and <h3> for sub-sections (never <h1>).
- Use <p>, <ul>/<li>, <ol>/<li>, <strong>, <em>, <a href="...">.
- 800-1400 words, structured with an intro paragraph, 4-7 sections, and a short conclusion.
- Indian audience: mention IELTS/PTE, INR costs where relevant, processing times, eligibility points.
- No <html>, <body>, <head>, <script>, <style>, no markdown, no code fences.
- Do not include the title inside contentHtml.

Return ONLY the JSON object, nothing else.`;

export const generateBlogWithAI = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; topic: string }) =>
    z
      .object({
        token: z.string().min(1).max(500),
        topic: z.string().min(3).max(300),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_BLOG_TOKEN?.trim();
    if (!expected) throw new Error("ADMIN_BLOG_TOKEN not configured.");
    if (data.token.trim() !== expected) throw new Error("Invalid admin token.");

    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY missing on server.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Topic: ${data.topic}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("AI rate limit reached. Please try again in a minute.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in your Lovable workspace.");
      throw new Error(`AI request failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = json.choices?.[0]?.message?.content ?? "";
    if (!raw) throw new Error("AI returned an empty response.");

    let parsed: { title?: string; excerpt?: string; contentHtml?: string };
    try {
      parsed = JSON.parse(raw);
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("AI returned non-JSON output.");
      parsed = JSON.parse(m[0]);
    }

    return {
      title: (parsed.title ?? "").trim(),
      excerpt: (parsed.excerpt ?? "").trim(),
      contentHtml: (parsed.contentHtml ?? "").trim() || "<p></p>",
    };
  });
