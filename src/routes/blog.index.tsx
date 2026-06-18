import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { listPublishedPosts, type DbBlogPost } from "@/lib/blog.functions";
import { BLOG, SITE, type BlogPost } from "@/lib/site";

const postsQuery = queryOptions({
  queryKey: ["blog", "published"],
  queryFn: () => listPublishedPosts(),
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({
    meta: [
      { title: "Immigration Blog & Guides | 7 Wings Immigration" },
      { name: "description", content: "Country guides, visa updates and migration insights from senior 7 Wings counsellors." },
      { property: "og:title", content: "Immigration Blog & Guides | 7 Wings" },
      { property: "og:description", content: "Country guides, visa updates and migration insights." },
      { property: "og:url", content: `${SITE.url}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <PageShell>
        <div className="container py-24 text-center">
          <p className="text-red-600 mb-4">{error.message}</p>
          <Button onClick={() => { reset(); router.invalidate(); }}>Retry</Button>
        </div>
      </PageShell>
    );
  },
  notFoundComponent: () => <div>Not found</div>,
  component: BlogIndex,
});

type ListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

function toItem(p: DbBlogPost): ListItem {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    image: p.image_url,
    date: new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    readTime: p.read_time,
  };
}

function staticToItem(p: BlogPost): ListItem {
  return {
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
    image: p.image, date: p.date, readTime: p.readTime,
  };
}

function BlogIndex() {
  const { data: dbPosts } = useSuspenseQuery(postsQuery);
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const items: ListItem[] = [
    ...dbPosts.map(toItem),
    ...BLOG.filter((p) => !dbSlugs.has(p.slug)).map(staticToItem),
  ];

  return (
    <PageShell>
      <section className="container py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Immigration Blog & Guides</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Country guides, visa updates and senior counsel insights for Indian applicants.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition">
              <div className="aspect-video overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-5">
                <div className="text-xs text-primary font-medium mb-2">{p.category} · {p.readTime}</div>
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
