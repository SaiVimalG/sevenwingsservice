import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Best Immigration Consultancy in Hyderabad — Services | 7 Wings" },
      { name: "description", content: "Compare 7 Wings Immigration's flagship visa & PR services from Hyderabad — Germany Opportunity Card, Australia PR, Canada PR, UK Skilled Worker and the JSS global career programme." },
      { property: "og:title", content: "Best Immigration Consultancy in Hyderabad — Services | 7 Wings" },
      { property: "og:description", content: "Best immigration consultancy in Hyderabad — Germany, Australia, Canada, UK and JSS pathways." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/services" },
      { name: "twitter:title", content: "Best Immigration Consultancy in Hyderabad — Services | 7 Wings" },
      { name: "twitter:description", content: "Germany, Australia, Canada, UK and JSS visa pathways — senior-led from Hyderabad." },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Programs"
        title="Immigration pathways, engineered around you."
        subtitle="Four flagship programmes covering the destinations our Hyderabad clients ask for most — each priced, planned and documented up front."
      />
      <section className="py-12 md:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <div className="group h-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-elegant">
                <div className="relative h-72 overflow-hidden">
                  <img src={s.image} alt={`${s.country} reference`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy/20 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <span>{s.flag}</span> {s.country}
                  </div>
                  <h2 className="absolute bottom-6 left-6 right-6 font-display text-3xl font-bold text-white">{s.title}</h2>
                </div>
                <div className="p-8">
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.intro}</p>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-deep transition-all hover:gap-3 hover:text-gold-deep">
                    Explore programme <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
