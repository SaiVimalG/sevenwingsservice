import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { TESTIMONIALS } from "@/lib/site";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Visa Success Stories from Hyderabad Clients | 7 Wings Immigration" },
      { name: "description", content: "Real Germany, Australia and Canada PR success stories from 7 Wings Immigration's Hyderabad clients — engineers, students and families who landed abroad with senior-led guidance." },
      { property: "og:title", content: "Visa Success Stories | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Real landings from real Hyderabad clients — Germany, Australia, Canada and UK." },
      { property: "og:url", content: "https://home.7wingsimmigration.com/success-stories" },
      { name: "twitter:title", content: "Visa Success Stories — 7 Wings Hyderabad" },
      { name: "twitter:description", content: "Real Germany, Australia and Canada PR successes from our Hyderabad clients." },
    ],
    links: [{ rel: "canonical", href: "https://home.7wingsimmigration.com/success-stories" }],
  }),
  component: Stories,
});

function Stories() {
  return (
    <PageShell>
      <PageHero eyebrow="Success Stories" title="Real landings from real clients." subtitle="A handful of the engineers, analysts, students and families who chose 7 Wings and now call somewhere new home." />
      <section className="py-12 md:py-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [column-fill:_balance]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <Reveal key={i} delay={(i % 6) * 0.05}>
                <figure className="mb-6 break-inside-avoid rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.18)] transition-all hover:-translate-y-1 hover:shadow-gold">
                  <div className="mb-4 flex gap-0.5 text-gold">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                  <blockquote className="text-base leading-relaxed text-navy-deep">"{t.text}"</blockquote>
                  <figcaption className="mt-5 border-t border-black/5 pt-4">
                    <p className="font-semibold text-navy-deep">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
