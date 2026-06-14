import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Immigration FAQs Hyderabad | 7 Wings Immigration" },
      { name: "description", content: "Hyderabad's most-asked immigration questions answered — Germany Opportunity Card, Australia PR, Canada PR, JSS, eligibility, fees and timelines, by 7 Wings consultants." },
      { property: "og:title", content: "Immigration FAQs | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Common questions about migration, eligibility, fees and timelines — answered by Hyderabad's senior immigration consultants." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/faq" },
      { name: "twitter:title", content: "Immigration FAQs | 7 Wings Hyderabad" },
      { name: "twitter:description", content: "Germany, Australia, Canada PR and JSS questions answered by Hyderabad's senior consultants." },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <PageShell>
      <PageHero eyebrow="FAQ" title="Everything you wanted to ask, in one place." subtitle="Don't see your question here? Reach out — we'll reply within 4 working hours." />
      <section className="py-12 md:py-10">
        <div className="mx-auto max-w-3xl space-y-3 px-6">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
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
    </PageShell>
  );
}
