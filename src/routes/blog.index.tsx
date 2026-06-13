import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import type { BlogPost } from "@/lib/site";
import { listDbPosts } from "@/lib/blog.functions";
import { mergePosts } from "@/lib/blog-merge";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    try {
      const db = await listDbPosts();
      return { posts: mergePosts(db) };
    } catch {
      return { posts: mergePosts([]) };
    }
  },
  head: () => ({
    meta: [
      { title: "Immigration Blog Hyderabad | Germany, Australia, Canada Visa Insights | 7 Wings" },
      { name: "description", content: "Latest visa & PR updates, plain-English migration guides and policy news from Hyderabad's leading immigration consultancy — 7 Wings Immigration." },
      { property: "og:title", content: "Immigration Blog & Visa Insights | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Visa tips, PR updates and migration guides written by senior 7 Wings consultants in Hyderabad." },
      { property: "og:url", content: "https://home.7wingsimmigration.com/blog" },
      { name: "twitter:title", content: "Immigration Blog | 7 Wings Hyderabad" },
      { name: "twitter:description", content: "Visa news, PR updates and migration guides from Hyderabad's senior consultants." },
    ],
    links: [{ rel: "canonical", href: "https://home.7wingsimmigration.com/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: BlogPost[] };
  const [featured, ...rest] = posts;

  const allPosts = featured ? [featured, ...rest] : rest;

  return (
    <PageShell>
      {/* Compact Hero (Breadcrumb-style banner like Visaway) */}
      <section className="relative overflow-hidden bg-hero pb-10 pt-28 text-white md:pb-12 md:pt-32 lg:pt-36">
        <div className="absolute inset-0 [background:radial-gradient(500px_220px_at_85%_30%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
              Our Blog
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight md:text-4xl">
              Visa Insights &amp; <span className="text-gradient-gold">Migration Guides</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <nav className="mt-3 flex items-center justify-center gap-2 text-xs text-white/70">
              <Link to="/" className="hover:text-gold-soft">Home</Link>
              <span className="text-gold">›</span>
              <span>Our Blog</span>
            </nav>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </section>

      {/* Blog Grid (Visaway news-grid style: 3 cols, image-top with category badge, meta row, title, footer with author + arrow) */}
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-20px_rgba(13,46,125,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                      />
                      <span className="absolute left-4 top-4 rounded-md bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep shadow">
                        {post.category}
                      </span>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-deep transition-colors group-hover:text-gold-deep md:text-xl">
                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="line-clamp-2">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-navy-deep">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-deep/5 text-gold-deep">
                          <User className="h-3.5 w-3.5" />
                        </span>
                        By {post.author}
                      </div>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-deep transition-colors hover:text-navy-deep"
                      >
                        View Article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
