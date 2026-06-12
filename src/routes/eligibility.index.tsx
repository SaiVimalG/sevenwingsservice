import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calculator } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";

const CALCS = [
  {
    group: "Australia 🇦🇺",
    items: [
      { name: "Subclass 189 — Independent", desc: "Free Australia Subclass 189 SkillSelect points calculator.", href: "/eligibility/australia/189-points-calculator" },
      { name: "Subclass 190 — State Nominated", desc: "Calculate your Australia 190 visa eligibility with +5 state nomination.", href: "/eligibility/australia/190-points-calculator" },
      { name: "Subclass 491 — Regional", desc: "Australia 491 regional visa points test with +15 nomination bonus.", href: "/eligibility/australia/491-points-calculator" },
    ],
  },
  {
    group: "Canada 🇨🇦",
    items: [
      { name: "Federal Skilled Worker (FSWP)", desc: "Free FSWP 100-point eligibility calculator.", href: "/eligibility/canada/federal-skilled-worker-program" },
      { name: "Express Entry CRS", desc: "Estimate your Comprehensive Ranking System score (1200 points).", href: "/eligibility/canada/crs-calculator" },
      { name: "Saskatchewan SINP", desc: "Saskatchewan International Skilled Worker points test.", href: "/eligibility/canada/saskatchewan-sinp-calculator" },
      { name: "Quebec Skilled Worker (QSWP)", desc: "Quebec Arrima / PRTQ selection grid calculator.", href: "/eligibility/canada/quebec-skilled-worker-program" },
    ],
  },
  {
    group: "Germany 🇩🇪",
    items: [
      { name: "Opportunity Card (Chancenkarte)", desc: "Free Germany Opportunity Card 6-point job-seeker calculator.", href: "/eligibility/germany/opportunity-card-calculator" },
    ],
  },
  {
    group: "United Kingdom 🇬🇧",
    items: [
      { name: "Skilled Worker Visa", desc: "UK Skilled Worker visa 70-point eligibility check.", href: "/eligibility/uk/skilled-worker-calculator" },
    ],
  },
];

export const Route = createFileRoute("/eligibility/")({
  head: () => ({
    meta: [
      { title: "Free Immigration Eligibility Calculators | 7 Wings Immigration" },
      { name: "description", content: "Free, real-time eligibility calculators for Australia (189, 190, 491), Canada (FSWP, CRS, SINP, Quebec), Germany Opportunity Card and UK Skilled Worker visas. Get your migration score instantly." },
      { property: "og:title", content: "Free Immigration Eligibility Calculators | 7 Wings Immigration" },
      { property: "og:description", content: "Real-time points calculators for Australia, Canada, Germany and UK immigration programs." },
      { property: "og:url", content: "https://sevenwingsservices.lovable.app/eligibility" },
    ],
    links: [{ rel: "canonical", href: "https://sevenwingsservices.lovable.app/eligibility" }],
  }),
  component: EligibilityHub,
});

function EligibilityHub() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Eligibility Check"
        title="Find your immigration pathway in 60 seconds"
        subtitle="Pick a country and program — get a real-time eligibility score, personalised recommendations and an expert assessment."
      />
      <section className="bg-background py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-6 space-y-14">
          {CALCS.map((g) => (
            <div key={g.group}>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{g.group}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((c, i) => (
                  <motion.div
                    key={c.href}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <Link to={c.href} className="group block h-full rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-deep">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold-deep">
                        Start calculator
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border bg-muted/40 p-6 text-sm text-muted-foreground md:text-base">
            <p className="font-semibold text-foreground">Not sure which program fits?</p>
            <p className="mt-1">Speak to a 7 Wings expert for a personalised eligibility review covering all your options across Canada, Australia, Germany, UK, New Zealand and the USA.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/book-consultation" className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy-deep hover:bg-gold-soft">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent">
                Talk to us <CheckCircle2 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
