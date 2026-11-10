// Target matches the existing blog cover pictures (760x608, under 100 KB).
export const COVER_SPEC = { width: 760, height: 608, ratio: "5:4", maxKB: 100 } as const;

export const SUBJECTS = [
  "Realistic Professional Human",
  "Authentic Local / Cultural Character",
  "Abstract & Conceptual",
  "Modern Workplace / Team",
  "Scenic / Landscape / Architecture",
] as const;

export const MOODS = ["Clean Corporate & Bright", "Cinematic & High-Contrast", "Warm & Lifestyle", "Minimalist & Modern"] as const;

const SUBJECT_TEXT: Record<string, string> = {
  [SUBJECTS[0]]: "a realistic professional person whose ethnicity, business attire and grooming authentically match {c} and the topic",
  [SUBJECTS[1]]: "an authentic local character from {c} in respectful traditional or regional everyday attire",
  [SUBJECTS[2]]: "abstract, conceptual 3D/graphic elements that metaphorically represent the topic, with no people",
  [SUBJECTS[3]]: "a diverse, collaborative team in a modern office setting typical of {c}",
  [SUBJECTS[4]]: "a recognisable landscape or architecture of {c}, with no focal people",
};

export function buildCoverPrompt(o: { title: string; country: string; subject: string; mood: string; overlay: boolean }) {
  const c = o.country.trim() || "a global context";
  const s = (SUBJECT_TEXT[o.subject] ?? o.subject).replaceAll("{c}", c);
  return [
    `Create a blog banner image for the article "${o.title.trim()}".`,
    `Subject: ${s}. Clothing, ethnicity and backdrop must feel authentic to ${c} and relevant to the article topic.`,
    `Mood & lighting: ${o.mood}.`,
    `Size: exactly ${COVER_SPEC.width}x${COVER_SPEC.height}px, ${COVER_SPEC.ratio} landscape aspect ratio.`,
    `Composition: one clear focal area, generous clean negative space, uncluttered background, lightweight visual density, smooth gradients that survive heavy web compression (target under ${COVER_SPEC.maxKB} KB).`,
    o.overlay
      ? `Typography: overlay the exact title "${o.title.trim()}" in bold, highly legible sans-serif text, spelled exactly, placed in the negative space.`
      : "No text, letters, logos or watermarks anywhere in the image.",
    "Photorealistic, high quality, professional editorial style.",
  ].join("\n");
}
