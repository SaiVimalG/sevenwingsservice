import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import aboutImg from "@/assets/about.jpg";
import { SITE, WHY_CHOOSE_US } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About 7 Wings | Immigration Consultants Hyderabad" },
      { name: "description", content: "Senior-led immigration consultancy in Amberpet, Hyderabad. 1000+ Germany, Australia, Canada and UK visa successes." },
      { property: "og:title", content: "About 7 Wings | Immigration Consultants Hyderabad" },
      { property: "og:description", content: "A senior-led, Hyderabad-based immigration consultancy built around transparent fees and 1000+ documented successes." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/about" },
      { property: "og:image", content: aboutImg },
      { name: "twitter:title", content: "About 7 Wings Immigration Hyderabad" },
      { name: "twitter:description", content: "Senior-led immigration consultancy in Hyderabad with 1000+ successful visa cases." },
      { name: "twitter:image", content: aboutImg },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/about" }],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About 7 Wings"
        title="A Hyderabad consultancy with an eagle's eye for detail."
        subtitle="We help professionals, students and families convert international ambition into documented, defensible immigration results."
      />
      <section className="py-12 md:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img src={aboutImg} alt="7 Wings Immigration consultants in Hyderabad" width={1024} height={1024} loading="lazy" className="rounded-3xl border border-black/5 shadow-elegant" />
          </Reveal>
          <div>
            <Reveal><h2 className="font-display text-4xl font-bold text-navy-deep">Why&nbsp; 7&nbsp; Wings Immigration?</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                The number 7 symbolizes trust, growth, success, wisdom, and new beginnings. Combined with the power of wings, it represents freedom, opportunity, and the courage to explore new horizons. At Seven Wings Immigration, we help individuals and families take flight toward a brighter future with confidence and clarity.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We're based in <strong className="text-navy-deep">{SITE.city}</strong>, but our work spans <strong className="text-navy-deep">Germany, Australia, Canada</strong> and our flagship <strong className="text-navy-deep">JSS Program</strong>. Senior counsellors lead every case — no junior hand-offs, no template advice.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["Vision", "Freedom", "Leadership", "Strength", "Confidence", "Global Mobility"].map((v) => (
                  <div key={v} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-navy-deep">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gold/20 text-gold-deep"><Check className="h-3 w-3" /></span>
                    {v}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-10">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal><h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-bold text-navy-deep">Our values, in writing.</h2></Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold">
                  <h3 className="font-display text-xl font-semibold text-navy-deep">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-14 text-center">
              <Link to="/book-consultation" className="inline-flex btn-gold btn-gold-hover">Start your assessment <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
