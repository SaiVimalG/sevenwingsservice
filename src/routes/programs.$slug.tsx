import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, MessageCircle, Calendar } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { COUNTRY_PROGRAMS, findProgram, SITE, type CountryGroup, type Program } from "@/lib/site";

type LoaderData = { country: CountryGroup; program: Program };

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const match = findProgram(params.slug);
    if (!match) throw notFound();
    return match;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { country, program } = loaderData;
    const title = `${program.title} — ${country.country} | 7 Wings Immigration`;
    const desc = `${program.short} 7 Wings Immigration helps Indian applicants apply for the ${program.title} with end-to-end documentation, scoring and lodgement support.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/programs/${program.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: country.image },
      ],
      links: [{ rel: "canonical", href: `/programs/${program.slug}` }],
    };
  },
  component: ProgramPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="grid min-h-[60vh] place-items-center px-6 text-center">
        <div>
          <p className="font-display text-2xl text-navy-deep">Program not found.</p>
          <Link to="/" className="mt-4 inline-flex btn-gold btn-gold-hover">Back home <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </PageShell>
  ),
});

function ProgramPage() {
  const { country, program } = Route.useLoaderData() as LoaderData;
  const related = country.programs.filter((p: Program) => p.slug !== program.slug).slice(0, 6);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pb-20 pt-36 text-white lg:pt-44">
        <div className="absolute inset-0 [background:radial-gradient(800px_400px_at_85%_15%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <Link to="/" hash="featured-services" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">← All programs</Link>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                <span>{country.flag}</span> {country.country}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                {program.title}
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{program.short}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book-consultation" className="btn-gold btn-gold-hover">
                  Book free consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi 7 Wings, I'd like to know more about " + program.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-gold hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={40}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-sky/20 blur-2xl" />
              <img
                src={country.image}
                alt={`${country.country} reference`}
                width={1600}
                height={1200}
                className="relative aspect-[5/4] w-full rounded-[2rem] border border-white/10 object-cover shadow-elegant"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview placeholder */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Overview</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
              Why Indian applicants choose the {program.title}.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {program.short} Our Hyderabad senior team builds the application around your goals — eligibility scoring, document prep, financial proofs, lodgement and post-decision support — so you arrive in {country.country} prepared and compliant.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Senior-counsellor led file ownership",
                "Transparent flat-fee pricing",
                "End-to-end documentation & translations",
                "Family pathway planning included",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-cream p-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-navy-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-navy-deep">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-5 text-sm text-navy-deep">
              <strong>Detailed guide coming soon.</strong> Full eligibility, documents, process timeline, cost breakdown, common mistakes and 10+ FAQs for this program are being published. In the meantime, book a free consultation and we'll send you the latest checklist by email.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-cream py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          {[
            { icon: Calendar, label: "Book consultation", to: "/book-consultation" },
            { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
            { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}` },
          ].map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-gold">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-navy-deep">{c.label}</span>
              </div>
            );
            return c.to ? (
              <Link key={i} to={c.to}>{inner}</Link>
            ) : (
              <a key={i} href={c.href} target="_blank" rel="noreferrer">{inner}</a>
            );
          })}
        </div>
      </section>

      {/* Related programs */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">More {country.country} programs</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">Explore related pathways.</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p: Program, i: number) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link
                    to="/programs/$slug"
                    params={{ slug: p.slug }}
                    className="group block h-full rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-gold"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">{country.country}</p>
                    <h3 className="mt-2 font-display text-lg font-bold text-navy-deep">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

// Helper for sitemap consumers
export const ALL_PROGRAM_SLUGS = COUNTRY_PROGRAMS.flatMap((c) => c.programs.map((p) => p.slug));
