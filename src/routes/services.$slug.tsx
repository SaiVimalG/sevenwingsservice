import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICE_MAP, SERVICES, type Service, type ServiceSlug } from "@/lib/site";

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
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
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

      <section className="py-12 md:py-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <Reveal><h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">What's included.</h2></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
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
        </div>
      </section>

      <section className="bg-cream py-12 md:py-10">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal><h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Our process for {s.title}.</h2></Reveal>
          <ol className="mt-10 space-y-4">
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
        </div>
      </section>

      <section className="py-12 md:py-10">
        <div className="mx-auto max-w-4xl px-6">
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
        </div>
      </section>

      <section className="bg-hero py-10 md:py-14 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to start your <span className="text-gradient-gold">{s.country}</span> journey?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/book-consultation" className="mt-8 inline-flex btn-gold btn-gold-hover">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-white/95">
            <span>Other programmes:</span>
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }} className="rounded-full border border-white/15 px-3 py-1 transition-colors hover:border-gold hover:text-gold">{x.flag} {x.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
