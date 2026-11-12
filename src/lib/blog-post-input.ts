import { z } from "zod";

const SectionSchema = z.object({
  heading: z.string().trim().min(1).max(200),
  markdown: z.string().trim().min(1).max(20000),
});

const FaqSchema = z.object({
  q: z.string().trim().min(1).max(300),
  a: z.string().trim().min(1).max(3000),
});

export const PostInputSchema = z.object({
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes only"),
  title: z.string().trim().min(3).max(200),
  excerpt: z.string().trim().max(500),
  category: z.string().trim().min(2).max(60),
  author: z.string().trim().min(2).max(80),
  imageUrl: z.union([z.literal(""), z.string().url().max(2000)]),
  readTime: z.string().trim().min(2).max(40),
  contentHtml: z.string().trim().min(1).max(500000),
  intro: z.string().trim().max(3000).optional().default(""),
  sections: z.array(SectionSchema).max(20).optional().default([]),
  why7Wings: z.array(z.string().trim().min(3).max(400)).max(10).optional().default([]),
  faqs: z.array(FaqSchema).max(30).optional().default([]),
  ctaLabel: z.string().trim().max(80).optional().nullable(),
  ctaSlug: z.string().trim().max(80).optional().nullable(),
  published: z.boolean().default(false),
  listed: z.boolean().default(true),
}).superRefine((post, ctx) => {
  if (!post.published) return;
  if (post.excerpt.length < 10) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["excerpt"], message: "Add an excerpt of at least 10 characters before publishing." });
  }
  if (!post.imageUrl) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["imageUrl"], message: "Add a cover image before publishing." });
  }
});

export type PostInput = z.infer<typeof PostInputSchema>;