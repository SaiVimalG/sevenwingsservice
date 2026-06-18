import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { getPostBySlug, type DbBlogPost } from "@/lib/blog.functions";
import { BLOG_MAP, type BlogPost } from "@/lib/site";

const SITE_URL = "https://www.7wingsimmigration.com";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "slug", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const db = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!db && !BLOG_MAP[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const staticPost: BlogPost | undefined = BLOG_MAP[params.slug];
    const title = staticPost?.title ?? params.slug;
    const excerpt = staticPost?.excerpt ?? "";
    const image = staticPost?.image;
    return {
      meta: [
        { title: `${title} | 7 Wings Immigration` },
        { name: "description", content: excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: excerpt },
        { property: "og:url", content: `${SITE_URL}/blog/${params.slug}` },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${params.slug}` }],
    };
  },
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
  notFoundComponent: () => (
    <PageShell>
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold mb-3">Post not found</h1>
        <Button asChild><Link to="/blog">Back to blog</Link></Button>
      </div>
    </PageShell>
  ),
  component: BlogDetail,
});

function BlogDetail() {
  const params = Route.useParams();
  const { data: db } = useSuspenseQuery(postQuery(params.slug));
  const staticPost = BLOG_MAP[params.slug];

  if (db) return <DbView post={db} />;
  if (staticPost) return <StaticView post={staticPost} />;
  return null;
}

function DbView({ post }: { post: DbBlogPost }) {
  return (
    <PageShell>
      <article className="container max-w-3xl py-12">
        <div className="text-sm text-primary font-medium mb-2">{post.category} · {post.read_time}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-6">By {post.author} · {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        {post.image_url && <img src={post.image_url} alt={post.title} className="w-full rounded-xl mb-8" />}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.intro }} />
        {post.cta_label && post.cta_slug && (
          <div className="mt-10 p-6 rounded-xl bg-primary/5 border">
            <Button asChild size="lg">
              <a href={post.cta_slug.startsWith("http") ? post.cta_slug : post.cta_slug}>{post.cta_label}</a>
            </Button>
          </div>
        )}
      </article>
    </PageShell>
  );
}

function StaticView({ post }: { post: BlogPost }) {
  return (
    <PageShell>
      <article className="container max-w-3xl py-12">
        <div className="text-sm text-primary font-medium mb-2">{post.category} · {post.readTime}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-6">By {post.author} · {post.date}</p>
        <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
        <p className="text-lg mb-8">{post.intro}</p>
        {post.sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-2xl font-bold mb-3">{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mb-3" dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            ))}
          </section>
        ))}
        {post.why7Wings?.length > 0 && (
          <section className="mb-8 p-6 rounded-xl bg-muted">
            <h2 className="text-2xl font-bold mb-4">Why 7 Wings</h2>
            <ul className="list-disc pl-5 space-y-2">{post.why7Wings.map((w, i) => <li key={i}>{w}</li>)}</ul>
          </section>
        )}
        <div className="mt-10">
          <Button asChild size="lg"><Link to={post.cta.to as any}>{post.cta.label}</Link></Button>
        </div>
      </article>
    </PageShell>
  );
}
