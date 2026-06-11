import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Check, Compass, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { SERVICES, WHY_CHOOSE_US, PROCESS_STEPS, STATS, TESTIMONIALS, FAQS, SITE } from "@/lib/site";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { name: "description", content: "Hyderabad's trusted immigration consultancy for Germany Opportunity Card, Australia PR, Canada PR and JSS programs. 1000+ successful consultations, transparent fees, senior-led guidance." },
      { property: "og:title", content: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { property: "og:description", content: "Soar beyond borders. Land with confidence. Premium immigration consultancy in Hyderabad for Germany, Australia, Canada and JSS pathways." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <BrandStrip />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pb-24 pt-36 text-white md:pb-32 md:pt-40">
      <motion.div
        aria-hidden
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Hyderabad's premium immigration consultancy
            </p>
          </Reveal>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            <RevealWords text="Your Global" />
            <br />
            <span className="text-gradient-gold"><RevealWords text="Future Starts" /></span>
            <br />
            <RevealWords text="Here." />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-base text-white/75 md:text-lg">
              7 Wings Immigration guides ambitious professionals, students and families from Hyderabad to confident landings in
              <span className="text-gold"> Germany, Australia, Canada </span> and beyond — through trusted, transparent immigration pathways.
            </p>
          </Reveal>
          <Reveal delay={0.7}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/book-consultation"><MagneticButton className="btn-gold btn-gold-hover">Apply Now <ArrowRight className="h-4 w-4" /></MagneticButton></Link>
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold">
                Book Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.9}>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-bold text-gold"><CountUp end={s.value} suffix={s.suffix} /></dt>
                  <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-white/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-sky/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
              <img src={heroImg} alt="Indian professional looking out at international flights at golden hour" width={1600} height={1024} className="aspect-[4/5] w-full object-cover" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-wider text-gold-soft">Soar Beyond Borders</p>
                <p className="mt-1 font-display text-lg text-white">Land With Confidence.</p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandStrip() {
  const items = ["Germany", "Australia", "Canada", "United Arab Emirates", "Singapore", "United Kingdom", "New Zealand"];
  return (
    <section className="border-y border-black/5 bg-cream py-8">
      <Marquee>
        {items.map((c) => (
          <span key={c} className="font-display text-xl font-semibold tracking-wide text-navy/40 transition-colors hover:text-gold-deep md:text-2xl">
            ✦ {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function About() {
  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-sky/10 blur-2xl" />
            <img src={aboutImg} alt="7 Wings Immigration consultants reviewing documents at Hyderabad office" width={1024} height={1024} loading="lazy" className="rounded-3xl border border-black/5 shadow-elegant" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-navy p-5 text-white shadow-elegant md:block">
              <p className="text-xs uppercase tracking-widest text-gold-soft">Since 2018</p>
              <p className="mt-1 font-display text-2xl">A Hyderabad team that lands every detail.</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">About 7 Wings</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-navy-deep md:text-5xl">
              Soar Beyond Borders. <span className="text-gradient-gold">Land With Confidence.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At <strong className="text-navy-deep">7 Wings Immigration</strong>, we believe talent should never be limited by geography. From our Hyderabad office, we help professionals, students and families navigate complex immigration pathways with clarity, confidence and senior-led guidance.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Inspired by the vision and strength of the eagle, we deliver strategic immigration solutions for <strong className="text-navy-deep">Germany, Australia, Canada</strong> and our flagship <strong className="text-navy-deep">JSS Program</strong> — turning international dreams into real, documented results.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Senior-led case management", "Fixed-fee transparent pricing", "Full document & translation support", "Family-first planning"].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm font-medium text-navy-deep">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-deep"><Check className="h-3 w-3" /></span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.5}>
            <Link to="/about" className="mt-9 inline-flex items-center gap-2 font-semibold text-navy-deep transition-colors hover:text-gold-deep">
              Read our full story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Our Programs</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">
              Four pathways. <span className="text-gradient-gold">One eagle-eyed team.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-elegant">
                <div className="relative h-64 overflow-hidden">
                  <img src={s.image} alt={`${s.country} skyline`} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy/30 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <span>{s.flag}</span> {s.country}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-deep transition-all hover:gap-3 hover:text-gold-deep">
                    Explore programme <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const icons = [ShieldCheck, Compass, Award, Sparkles, Globe2, Check];
  return (
    <section className="relative overflow-hidden bg-navy-mesh py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">Why Clients Trust Us</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">A consultancy you'd recommend to your <span className="text-gradient-gold">closest friend.</span></h2></Reveal>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((w, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.07]">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{w.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Our Process</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">Your journey in <span className="text-gradient-gold">four simple steps.</span></h2></Reveal>
        </div>
        <div className="relative mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-12 hidden h-px bg-[linear-gradient(to_right,transparent,oklch(0.78_0.13_85)_30%,oklch(0.78_0.13_85)_70%,transparent)] opacity-50 lg:block" />
          {PROCESS_STEPS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-20px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep font-display text-lg font-bold text-navy-deep shadow-gold">
                  {p.step}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-deep">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative overflow-hidden bg-hero py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="text-center md:text-left">
              <p className="font-display text-6xl font-bold text-gradient-gold"><CountUp end={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/65">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Success Stories</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">A few of the <span className="text-gradient-gold">landings we're proud of.</span></h2></Reveal>
        </div>
        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
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
  );
}

function FAQ() {
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">FAQ</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">Questions, <span className="text-gradient-gold">answered.</span></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-4 text-muted-foreground">Still wondering? Drop us a line and we'll reply within 4 working hours.</p></Reveal>
          <Reveal delay={0.3}><Link to="/contact" className="mt-6 inline-flex btn-gold btn-gold-hover">Ask a question <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="space-y-3">
          {FAQS.slice(0, 6).map((f, i) => (
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
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-white">
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">Ready to take flight?</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
            Book your <span className="text-gradient-gold">free 30-minute</span> consultation today.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-white/75">
            Walk in to our <strong className="text-gold">{SITE.city}</strong> office or hop on a video call. We'll score your profile against every available pathway in one sitting — no obligation.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/book-consultation"><MagneticButton className="btn-gold btn-gold-hover">Book Free Consultation <ArrowRight className="h-4 w-4" /></MagneticButton></Link>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold">
              Or call {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
