import type { BlogPost } from "@/lib/site";
import { BLOG } from "@/lib/site";
import type { DbBlogPost } from "@/lib/blog.functions";

// Convert a DB post into the BlogPost shape used by the UI.
// Sections store markdown; we expose them as a single-element paragraphs array,
// rendered with markdown support in blog.$slug.tsx.
export function dbToBlogPost(p: DbBlogPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    category: p.category,
    author: p.author,
    image: p.image,
    intro: p.intro,
    sections: p.sections.map((s) => ({ heading: s.heading, paragraphs: [s.markdown] })),
    why7Wings: p.why7Wings,
    cta: {
      label: p.cta?.label ?? "Book a free consultation",
      to: p.cta?.slug ? "/services/$slug" : "/book-consultation",
      slug: p.cta?.slug,
    },
  };
}

// Merge DB posts (newest first) with static fallback posts, dedup by slug.
export function mergePosts(dbPosts: DbBlogPost[]): BlogPost[] {
  const mapped = dbPosts.map(dbToBlogPost);
  const slugs = new Set(mapped.map((p) => p.slug));
  const fallback = BLOG.filter((p) => !slugs.has(p.slug));
  return [...mapped, ...fallback];
}
