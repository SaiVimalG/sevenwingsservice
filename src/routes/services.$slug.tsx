import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, List } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { BlogContactForm } from "@/components/forms/Forms";
import { SERVICE_MAP, SERVICES, type Service, type ServiceSlug } from "@/lib/site";

const TOC = [
  { id: "whats-included", label: "What's included" },
  { id: "process", label: "Our process" },
  { id: "faqs", label: "FAQs" },
  { id: "get-started", label: "Get started" },
];

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_MAP[params.slug as ServiceSlug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    const url = `https://home.7wingsimmigration.com/services/${s.slug}`;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDescription },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: s.image },
        { name: "twitter:title", content: s.metaTitle },
        { name: "twitter:description", content: s.metaDescription },
        { name: "twitter:image", content: s.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: s.title,
          provider: {
            "@type": "Organization",
            name: "7 Wings Immigration",
            url: "https://home.7wingsimmigration.com",
            address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
          },
          areaServed: ["Hyderabad", "Telangana", "India", s.country],
          description: s.metaDescription,
          url,
        }),
      }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <PageShell><div className="grid min-h-[60vh] place-items-center"><p>Programme not found.</p></div></PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="grid min-h-[60vh] place-items-center"><p>Could not load this programme.</p></div></PageShell>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hero pb-10 pt-28 text-white md:pb-12 md:pt-32 lg:pt-36">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <Link to="/services" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">← All programmes</Link>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                <span>{s.flag}</span> {s.country}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">{s.title}</h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl text-white/90">{s.intro}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book-consultation" className="btn-gold btn-gold-hover">Apply Now <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold">Ask a question</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <img src={s.image} alt={`${s.country} reference`} width={1024} height={768} className="rounded-[2rem] border border-white/10 shadow-elegant" />
          </Reveal>
        </div>
      </section>

      <article className="py-12 md:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: content */}
          <div className="min-w-0">
            {/* Mobile TOC */}
            <details className="mb-8 rounded-2xl border border-black/10 bg-cream p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-navy-deep">
                <List className="h-4 w-4 text-gold-deep" /> Table of contents
              </summary>
              <ul className="mt-3 space-y-1.5 pl-1">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block text-sm text-muted-foreground hover:text-navy-deep">
                      · {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <section id="whats-included" className="scroll-mt-28">
              <Reveal><h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">What's included.</h2></Reveal>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {s.features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-deep"><Check className="h-5 w-5" /></div>
                      <h3 className="mt-4 font-display text-xl font-semibold text-navy-deep">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="process" className="scroll-mt-28 mt-14 rounded-3xl bg-cream p-6 md:p-10">
              <Reveal><h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Our process for {s.title}.</h2></Reveal>
              <ol className="mt-8 space-y-4">
                {s.process.map((p, i) => (
                  <Reveal key={p} delay={i * 0.05}>
                    <li className="flex gap-5 rounded-2xl border border-black/5 bg-white p-6">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep font-display font-bold text-navy-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="self-center text-base text-navy-deep">{p}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </section>

            <section id="faqs" className="scroll-mt-28 mt-14">
              <Reveal><h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">FAQs for {s.title}.</h2></Reveal>
              <div className="mt-8 space-y-3">
                {s.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={i * 0.05}>
                    <details className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(13,46,125,0.15)] open:shadow-gold">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-navy-deep">
                        {f.q}
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="get-started" className="scroll-mt-28 mt-14 rounded-3xl bg-hero p-8 text-white md:p-12">
              <Reveal>
                <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to start your <span className="text-gradient-gold">{s.country}</span> journey?</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/book-consultation" className="mt-6 inline-flex btn-gold btn-gold-hover">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
              </Reveal>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/95">
                <span>Other programmes:</span>
                {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
                  <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }} className="rounded-full border border-white/15 px-3 py-1 transition-colors hover:border-gold hover:text-gold">{x.flag} {x.title}</Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right: sticky TOC + form */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                  <List className="h-3.5 w-3.5" /> On this page
                </p>
                <ul className="mt-4 space-y-1 border-l border-black/10">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block border-l-2 -ml-px border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-gold hover:text-navy-deep"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

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
            </div>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
