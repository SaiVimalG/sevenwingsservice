import { createFileRoute, redirect } from "@tanstack/react-router";
import { BLOG_MAP } from "@/lib/site";
import { getDbPost } from "@/lib/blog.functions";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
}

// Legacy URL /blog/:slug → new structure /blog/:country/:slug
export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    let category: string | undefined;
    try {
      const db = await getDbPost({ data: { slug: params.slug } });
      category = db?.category;
    } catch {
      // ignore
    }
    if (!category) category = BLOG_MAP[params.slug]?.category;
    if (!category) throw redirect({ to: "/blog" });
    throw redirect({
      to: "/blog/$country/$slug",
      params: { country: slugify(category), slug: params.slug },
    });
  },
  component: () => null,
});
