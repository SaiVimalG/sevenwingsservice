import { createParser } from "eventsource-parser";
import { COVER_WIDTH, COVER_HEIGHT } from "./blog-cover";

export async function generateCover(token: string, context: Record<string, string>, onPreview: (url: string) => void) {
  const response = await fetch("/api/public/blog-cover", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(context),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => null);
    const message = result?.error?.message || `Image generation failed (${response.status}).`;
    if (response.status === 429 && /limit: 0|Free Tier/i.test(message)) {
      throw new Error("Your Google Gemini account has no image-generation quota. Enable billing in Google AI Studio before generating covers.");
    }
    throw new Error(message);
  }
  if (!response.body) throw new Error("No image stream received.");
  let image = "";
  let failure = "";
  const parser = createParser({ onEvent(event) {
    if (event.data === "[DONE]") return;
    const chunk = JSON.parse(event.data);
    if (chunk.error) { failure = chunk.error.message || "Image generation failed."; return; }
    if (chunk.promptFeedback?.blockReason) { failure = `Image request blocked: ${chunk.promptFeedback.blockReason}`; return; }
    for (const candidate of chunk.candidates || []) {
      if (["SAFETY", "IMAGE_SAFETY", "PROHIBITED_CONTENT", "RECITATION"].includes(candidate.finishReason)) failure = "Gemini declined this image request.";
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData?.data && !part.thought) {
          image = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          onPreview(image);
        }
      }
    }
  } });
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  try { while (true) { const chunk = await reader.read(); if (chunk.done) break; parser.feed(chunk.value); } }
  finally { reader.releaseLock(); }
  if (failure) throw new Error(failure);
  if (!image) throw new Error("Gemini returned no cover image.");
  return image;
}

async function loadImage(url: string) {
  const blob = await (await fetch(url)).blob();
  return createImageBitmap(blob);
}

export async function brandCover(source: string, logoUrl: string) {
  const [image, logo] = await Promise.all([loadImage(source), loadImage(logoUrl)]);
  const canvas = document.createElement("canvas");
  canvas.width = COVER_WIDTH; canvas.height = COVER_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser cannot prepare the cover image.");
  ctx.drawImage(image, 0, 0, COVER_WIDTH, COVER_HEIGHT);
  const scale = Math.min(320 / logo.width, 140 / logo.height);
  const width = logo.width * scale, height = logo.height * scale;
  const x = COVER_WIDTH - width - 80, y = 40;
  // The actual uploaded logo is composited pixel-for-pixel, never AI-recreated.
  ctx.fillStyle = "white";
  ctx.beginPath(); ctx.roundRect(x - 20, y, width + 40, height + 40, 12); ctx.fill();
  ctx.drawImage(logo, x, y + 20, width, height);
  image.close(); logo.close();
  return canvas.toDataURL("image/jpeg", 0.94);
}