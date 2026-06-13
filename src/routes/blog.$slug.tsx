import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowRight,
  Calendar,
  Clock,
  Check,
  Phone,
  Share2,
  Bookmark,
  ChevronRight,
  List,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { BlogContactForm } from "@/components/forms/Forms";
import { BLOG_MAP, BLOG, SITE, type BlogPost } from "@/lib/site";
import { getDbPost } from "@/lib/blog.functions";
import { dbToBlogPost } from "@/lib/blog-merge";
import type { ServiceSlug } from "@/lib/site";


export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const db = await getDbPost({ data: { slug: params.slug } });
      if (db) return { post: dbToBlogPost(db) };
    } catch {
      // fall through to static
    }
    const post = BLOG_MAP[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Article not found | 7 Wings Immigration" }] };
    }
    const url = `https://home.7wingsimmigration.com/blog/${params.slug}`;
    const title = `${post.title} | 7 Wings Immigration Blog`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: [post.image],
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "7 Wings Immigration",
            logo: { "@type": "ImageObject", url: "https://home.7wingsimmigration.com/favicon.ico" },
          },
          mainEntityOfPage: url,
        }),
      }],
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

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG.filter((p) => p.slug !== post.slug).slice(0, 3);
  const progress = useReadingProgress();
  const [activeId, setActiveId] = useState<string>("");

  const toc = useMemo(
    () => post.sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
    [post.sections]
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(post.title);
  const enc = encodeURIComponent(shareUrl);

  return (
    <PageShell>
      {/* Reading progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold via-gold-deep to-gold transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero — compact, left-aligned, shares max width with the article column below */}
      <section className="relative overflow-hidden bg-hero pb-8 pt-24 text-white md:pb-10 md:pt-28 lg:pt-32">
        <div className="absolute inset-0 [background:radial-gradient(700px_300px_at_85%_20%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)_220px] lg:gap-10">
            <div className="hidden lg:block" />
            <div className="min-w-0">
              <Reveal>
                <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/95">
                  <Link to="/" className="hover:text-gold">Home</Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link to="/blog" className="hover:text-gold">Blog</Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-gold-soft">{post.category}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 font-display text-2xl font-bold leading-tight md:text-4xl lg:text-[2.6rem]">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-widest text-white/90">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}</span>
                </div>
              </Reveal>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Cover — sized to the article column, not full bleed */}
      <section className="bg-cream py-8 md:py-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)_220px] lg:gap-10">
            <div className="hidden lg:block" />
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-black/5 shadow-elegant">
                <img src={post.image} alt={post.title} className="aspect-[16/8] w-full object-cover" />
              </div>
            </Reveal>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>


      {/* Body with sticky TOC */}
      <article className="py-12 md:py-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[260px_minmax(0,1fr)_220px]">
          {/* Left: TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                <List className="h-3.5 w-3.5" /> On this page
              </p>
              <ul className="mt-4 space-y-1 border-l border-black/10">
                {toc.map((t) => {
                  const active = activeId === t.id;
                  return (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={`block border-l-2 -ml-px py-1.5 pl-4 text-sm leading-snug transition-colors ${
                          active
                            ? "border-gold font-semibold text-navy-deep"
                            : "border-transparent text-muted-foreground hover:text-navy-deep"
                        }`}
                      >
                        {t.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Center: Article body */}
          <div className="min-w-0">
            {/* Mobile TOC */}
            <details className="mb-8 rounded-2xl border border-black/10 bg-cream p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-navy-deep">
                <List className="h-4 w-4 text-gold-deep" /> Table of contents
              </summary>
              <ul className="mt-3 space-y-1.5 pl-1">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block text-sm text-muted-foreground hover:text-navy-deep">
                      · {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <Reveal>
              <p className="font-display text-xl leading-relaxed text-navy-deep md:text-2xl">
                {post.intro}
              </p>
            </Reveal>

            <div className="mt-10 space-y-12">
              {post.sections.map((section, i) => {
                const id = slugify(section.heading);
                return (
                  <Reveal key={id} delay={i * 0.05}>
                    <section id={id} className="scroll-mt-28">
                      <div className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold font-display text-xs font-bold text-navy-deep">
                          {i + 1}
                        </span>
                        <h2 className="font-display text-2xl font-bold leading-tight text-navy-deep md:text-3xl">
                          {section.heading}
                        </h2>
                      </div>
                      <div className="prose-blog mt-5 space-y-4 pl-0 md:pl-10">
                        {section.paragraphs.map((p, j) => (
                          <ReactMarkdown
                            key={j}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ node, ...props }) => (
                                <p className="text-base leading-[1.85] text-muted-foreground md:text-[17px]" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul className="ml-5 list-disc space-y-2 text-base leading-[1.85] text-muted-foreground md:text-[17px]" {...props} />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol className="ml-5 list-decimal space-y-2 text-base leading-[1.85] text-muted-foreground md:text-[17px]" {...props} />
                              ),
                              h3: ({ node, ...props }) => (
                                <h3 className="font-display text-xl font-bold text-navy-deep" {...props} />
                              ),
                              a: ({ node, ...props }) => (
                                <a className="text-gold-deep underline-offset-4 hover:underline" {...props} />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-semibold text-navy-deep" {...props} />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote className="border-l-4 border-gold pl-4 italic text-navy-deep" {...props} />
                              ),
                              code: ({ node, ...props }) => (
                                <code className="rounded bg-cream px-1.5 py-0.5 font-mono text-sm text-navy-deep" {...props} />
                              ),
                              img: ({ node, ...props }) => (
                                <img className="my-4 rounded-2xl border border-black/5" {...props} />
                              ),
                            }}
                          >
                            {p}
                          </ReactMarkdown>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                );
              })}
            </div>

            {/* Why 7 Wings */}
            <Reveal>
              <div className="mt-14 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-cream via-white to-cream p-7 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
                  Why apply through 7 Wings Immigration
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy-deep md:text-3xl">
                  What you get when you start with us
                </h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {post.why7Wings.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-4 text-sm leading-relaxed text-navy-deep shadow-[0_4px_12px_-8px_rgba(13,46,125,0.15)] md:text-[15px]"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-navy-deep">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {post.cta.slug ? (
                    <Link
                      to="/services/$slug"
                      params={{ slug: post.cta.slug as ServiceSlug }}
                      className="inline-flex justify-center btn-gold btn-gold-hover"
                    >
                      {post.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link to="/book-consultation" className="inline-flex justify-center btn-gold btn-gold-hover">
                      {post.cta.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-medium text-navy-deep transition-all hover:border-gold-deep hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4" /> Call {SITE.phone}
                  </a>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right: Contact form + share */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-gold/30 bg-white p-5 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.18)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">Talk to a consultant</p>
                <h4 className="mt-1 font-display text-lg font-bold leading-tight text-navy-deep">
                  Free 15-min eligibility call
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Share your details — a senior counsellor will call you back.
                </p>
                <div className="mt-4">
                  <BlogContactForm />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">Share</p>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${enc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-navy-deep transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-deep"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-navy-deep transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-deep"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-navy-deep transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-deep"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(shareUrl);
                      }
                    }}
                    aria-label="Copy link"
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-navy-deep transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-deep"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </article>

      {/* Mobile share strip */}
      <div className="border-t border-black/5 bg-cream py-6 lg:hidden">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-navy-deep">
            <Share2 className="h-4 w-4 text-gold-deep" /> Share this article
          </p>
          <div className="flex gap-2">
            <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${enc}`} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-navy-deep">
              <Twitter className="h-4 w-4" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-navy-deep">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-navy-deep">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-black/5 bg-cream py-10 md:py-12">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Keep reading</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-navy-deep md:text-4xl">
                  Related articles
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-gold sm:inline-flex"
              >
                All articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">
                      {r.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {r.date} · {r.readTime}
                    </p>
                    <h3 className="mt-2 line-clamp-2 font-display text-lg font-bold text-navy-deep transition-colors group-hover:text-gold-deep">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Unused import guard - keep Bookmark referenced */}
      <Bookmark className="hidden" />
    </PageShell>
  );
}
