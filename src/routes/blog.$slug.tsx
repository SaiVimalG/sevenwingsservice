import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User, Check, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { BLOG_MAP, BLOG, SITE, type BlogPost } from "@/lib/site";
import type { ServiceSlug } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_MAP[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: post
        ? [
            { title: `${post.title} | 7 Wings Immigration Blog` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:image", content: post.image },
            { property: "article:published_time", content: post.date },
            { property: "article:author", content: post.author },
          ]
        : [{ title: "Article not found | 7 Wings Immigration" }],
    };
  },
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-40 text-center">
        <h1 className="font-display text-3xl text-navy-deep">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <Link to="/blog" className="mt-6 inline-flex btn-gold btn-gold-hover">Back to Blog</Link>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-40 text-center">
        <h1 className="font-display text-3xl text-navy-deep">Article not found</h1>
        <p className="mt-3 text-muted-foreground">The article you are looking for may have moved.</p>
        <Link to="/blog" className="mt-6 inline-flex btn-gold btn-gold-hover">Back to Blog</Link>
      </div>
    </PageShell>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pb-16 pt-36 text-white lg:pt-44">
        <div className="absolute inset-0 [background:radial-gradient(700px_350px_at_80%_20%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft hover:text-gold">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to Blog
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="mt-6 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">
              {post.category}
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-widest text-white/70">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-gold" /> {post.author}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cover */}
      <section className="relative -mt-10 md:-mt-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-black/5 shadow-elegant">
              <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-display text-xl leading-relaxed text-navy-deep md:text-2xl">{post.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {post.sections.map((section, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <section>
                  <h2 className="font-display text-2xl font-bold text-navy-deep md:text-3xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-muted-foreground md:text-[17px]">{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Why 7 Wings */}
          <Reveal>
            <div className="mt-14 rounded-3xl border border-gold/30 bg-cream p-7 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Why Apply Through 7 Wings Immigration</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy-deep md:text-3xl">
                What you get when you start with us
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {post.why7Wings.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm leading-relaxed text-navy-deep md:text-base">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-navy-deep">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                {post.cta.slug ? (
                  <Link to="/services/$slug" params={{ slug: post.cta.slug as ServiceSlug }} className="inline-flex justify-center btn-gold btn-gold-hover">
                    {post.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link to="/book-consultation" className="inline-flex justify-center btn-gold btn-gold-hover">
                    {post.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-medium text-navy-deep transition-all hover:border-gold-deep hover:text-gold-deep">
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Keep Reading</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy-deep md:text-4xl">Related Articles</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">{r.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{r.date} · {r.readTime}</p>
                    <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold text-navy-deep transition-colors group-hover:text-gold-deep">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
