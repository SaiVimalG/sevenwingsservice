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
      { title: "Immigration Blog & Visa Insights | 7 Wings Immigration Hyderabad" },
      { name: "description", content: "Latest visa news, PR updates and immigration guides for Germany, Australia, Canada and the JSS Program. Written by 7 Wings Immigration consultants in Hyderabad." },
      { property: "og:title", content: "Immigration Blog & Visa Insights | 7 Wings Immigration" },
      { property: "og:description", content: "Visa tips, PR updates and migration guides written by senior 7 Wings consultants." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: BlogPost[] };
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pb-20 pt-40 text-white lg:pt-48">
        <div className="absolute inset-0 [background:radial-gradient(700px_350px_at_80%_20%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
              Visa Tips &amp; Migration Guides
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
              Latest Insights &amp; <span className="text-gradient-gold">Updates</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg">
              Plain-English guides on Germany Opportunity Card, Australia PR, Canada PR and the JSS Program — written by senior consultants at 7 Wings Immigration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-cream py-10 md:py-12">
          <div className="mx-auto max-w-[1400px] px-6">
            <Reveal>
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group grid gap-8 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                    Featured · {featured.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" /> {featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> {featured.readTime}</span>
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-gold" /> {featured.author}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-navy-deep transition-colors group-hover:text-gold-deep md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep">
                    Read full article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">More Articles</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy-deep md:text-4xl">All Posts</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block h-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 font-display text-lg font-bold text-navy-deep transition-colors group-hover:text-gold-deep">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep">
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
