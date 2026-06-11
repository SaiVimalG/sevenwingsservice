import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { COUNTRY_PROGRAMS } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedServices() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [paused, setPaused] = useState(false);
  const [activeKey, setActiveKey] = useState(COUNTRY_PROGRAMS[0].key);
  const active = COUNTRY_PROGRAMS.find((c) => c.key === activeKey) ?? COUNTRY_PROGRAMS[0];
  const activeIndex = COUNTRY_PROGRAMS.findIndex((c) => c.key === activeKey);

  const goTo = (idx: number) => {
    const n = (idx + COUNTRY_PROGRAMS.length) % COUNTRY_PROGRAMS.length;
    setActiveKey(COUNTRY_PROGRAMS[n].key);
  };
  const goPrev = () => { setPaused(true); goTo(activeIndex - 1); };
  const goNext = () => { setPaused(true); goTo(activeIndex + 1); };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveKey((cur) => {
        const i = COUNTRY_PROGRAMS.findIndex((c) => c.key === cur);
        return COUNTRY_PROGRAMS[(i + 1) % COUNTRY_PROGRAMS.length].key;
      });
    }, 3500);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const el = tabRefs.current[activeKey];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeKey]);

  return (
    <section
      id="featured-services"
      className="relative overflow-hidden bg-cream py-24"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* heading card — white, attached to navy panel below via shared navy border + flat bottom */}
        <div className="rounded-t-3xl border-2 border-b-0 border-[#061a52] bg-white p-8 shadow-elegant sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep sm:text-xs">
                Immigration Services for Indians
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-deep sm:text-4xl md:text-5xl">
                Pathways chosen by <span className="text-gradient-gold">Indian professionals</span>, students &amp; families.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Explore the most popular visa and immigration pathways. Switch between countries to see the programs we deliver end-to-end from our Hyderabad office.
              </p>
            </Reveal>
          </div>

          {/* country tabs */}
          <div className="relative mt-10">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {COUNTRY_PROGRAMS.map((c) => {
                const isActive = c.key === activeKey;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveKey(c.key)}
                    className={[
                      "group relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all sm:px-5 sm:py-3 sm:text-[11px]",
                      isActive
                        ? "border-gold bg-gradient-to-r from-gold-soft via-gold to-gold-deep text-navy-deep shadow-gold"
                        : "border-navy/20 bg-white text-navy/70 hover:border-gold hover:text-gold-deep",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    <span className="mr-2 text-base leading-none">{c.flag}</span>
                    {c.country}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* country detail panel — navy, attached directly under the white heading card */}
        <div
          className="relative overflow-hidden rounded-b-3xl border-2 border-t-0 border-[#061a52] px-6 py-12 text-white shadow-elegant sm:px-10 sm:py-16"
          style={{ background: "linear-gradient(135deg, #061a52 0%, #0a2470 55%, #061a52 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />


        {/* content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14"
          >
            {/* left: copy */}
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur">
                <span className="text-sm leading-none">{active.flag}</span>
                {active.badge}
              </span>

              <h3 className="mt-5 font-display text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl">
                {active.headline.split(active.country).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-gradient-gold">{active.country}</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                {active.description}
              </p>

              {/* programs grid */}
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {active.programs.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      to="/programs/$slug"
                      params={{ slug: p.slug }}
                      className="group flex items-center gap-3 rounded-xl border border-gold/60 px-3 py-2.5 text-sm text-white/85 transition-all hover:border-gold hover:bg-gold/10 hover:text-white hover:shadow-gold"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold transition-all group-hover:bg-gold group-hover:text-navy-deep">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate font-medium">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/book-consultation" className="btn-gold btn-gold-hover">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold"
                >
                  Talk to an advisor
                </Link>
              </div>
            </div>

            {/* right: image */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-sky/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-elegant sm:rounded-[2rem]">
                <img
                  src={active.image}
                  alt={`${active.country} immigration reference`}
                  width={1600}
                  height={1200}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[1.4s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" />
                {/* floating sub-card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/95 p-4 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[260px] sm:p-5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                    {active.country}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-navy-deep sm:text-xl">
                    {active.programs[0].title}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>

  );
}
