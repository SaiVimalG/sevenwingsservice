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
        topic: z.string().min(3).max(8000),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_BLOG_TOKEN?.trim();
    if (!expected) throw new Error("ADMIN_BLOG_TOKEN not configured.");
    if (data.token.trim() !== expected) throw new Error("Invalid admin token.");

    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY missing on server.");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: `Topic: ${data.topic}` }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) throw new Error("Gemini rate limit reached. Please try again in a minute.");
      if (res.status === 401 || res.status === 403) throw new Error("Gemini API key is invalid or lacks access.");
      throw new Error(`Gemini request failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const raw = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    if (!raw) throw new Error("Gemini returned an empty response.");

    let parsed: { title?: string; excerpt?: string; contentHtml?: string };
    try {
      parsed = JSON.parse(raw);
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Gemini returned non-JSON output.");
      parsed = JSON.parse(m[0]);
    }

    return {
      title: (parsed.title ?? "").trim(),
      excerpt: (parsed.excerpt ?? "").trim(),
      contentHtml: (parsed.contentHtml ?? "").trim() || "<p></p>",
    };
  });
