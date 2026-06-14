import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, MessageCircle, Calendar, List } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlogContactForm } from "@/components/forms/Forms";
import { findProgram, SITE, type CountryGroup, type Program } from "@/lib/site";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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
    const title = `${program.title} from Hyderabad — ${country.country} | 7 Wings Immigration`;
    const desc = `${program.short} 7 Wings Immigration (Hyderabad) helps Indian applicants apply for the ${program.title} with end-to-end documentation, points scoring and lodgement support.`;
    const url = `https://home.7wingsimmigration.com/programs/${program.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: country.image },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: country.image },
      ],
      links: [{ rel: "canonical", href: url }],
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
      <section className="relative overflow-hidden bg-hero pb-10 pt-28 text-white md:pb-12 md:pt-32 lg:pt-36">
        <div className="absolute inset-0 [background:radial-gradient(800px_400px_at_85%_15%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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
              <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">{program.short}</p>
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

      {/* Overview / Detailed Content */}
      {program.details ? (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Overview</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 font-display text-lg leading-[1.5] text-navy-deep md:text-xl">
                {program.details.intro}
              </p>
            </Reveal>

            <div className="mt-10 space-y-10">
              {program.details.sections.map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.05}>
                  <section>
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold font-display text-xs font-bold text-navy-deep">
                        {i + 1}
                      </span>
                      <h2 className="font-display text-2xl font-bold leading-tight text-navy-deep md:text-3xl">
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-4 space-y-2 pl-0 md:pl-10">
                      {section.paragraphs.map((p, j) => (
                        <ReactMarkdown
                          key={j}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p className="text-[13.5px] leading-[1.55] text-slate-700 md:text-[14.5px]" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold text-navy-deep" {...props} />
                            ),
                          }}
                        >
                          {p}
                        </ReactMarkdown>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-14 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-cream via-white to-cream p-7 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
                  Why apply through 7 Wings Immigration
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy-deep md:text-3xl">
                  What you get when you start with us
                </h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {program.details.why7Wings.map((w) => (
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
                  <Link to="/book-consultation" className="inline-flex justify-center btn-gold btn-gold-hover">
                    Check my Germany eligibility <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-deep/20 px-6 py-3 text-sm font-medium text-navy-deep transition-all hover:border-gold-deep hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4" /> Call {SITE.phone}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
                  Frequently asked questions
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy-deep md:text-3xl">
                  Everything you wanted to ask
                </h3>
                <Accordion type="single" collapsible className="mt-6 space-y-3">
                  {program.details.faqs.map((f, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="overflow-hidden rounded-2xl border border-black/10 bg-white px-5 shadow-[0_4px_12px_-10px_rgba(13,46,125,0.18)] data-[state=open]:border-gold/40 data-[state=open]:bg-gradient-to-br data-[state=open]:from-cream/60 data-[state=open]:to-white"
                    >
                      <AccordionTrigger className="py-4 text-left text-[15px] font-semibold text-navy-deep hover:text-gold-deep hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[14.5px] leading-[1.6] text-slate-700">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="py-10 md:py-14">
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
      )}

      {/* CTA strip */}
      <section className="bg-cream py-10 md:py-12">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 sm:grid-cols-3">
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
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-[1200px] px-6">
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
