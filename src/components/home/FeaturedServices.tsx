import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { COUNTRY_PROGRAMS } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedServices() {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = COUNTRY_PROGRAMS.length;
  const active = COUNTRY_PROGRAMS[activeIndex];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prevCountry = COUNTRY_PROGRAMS[prevIndex];
  const nextCountry = COUNTRY_PROGRAMS[nextIndex];

  const goPrev = () => { setPaused(true); setActiveIndex(prevIndex); };
  const goNext = () => { setPaused(true); setActiveIndex(nextIndex); };
  const goTo = (i: number) => { setPaused(true); setActiveIndex(i); };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? goNext : goPrev)();
    touchStartX.current = null;
  };

  return (
    <section
      id="featured-services"
      className="relative overflow-hidden bg-cream py-10 sm:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* heading */}
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

            {/* compact flag selector — all countries, active highlighted */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous country"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/20 bg-white text-navy shadow-sm transition-all hover:border-gold hover:bg-gold hover:text-navy-deep"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                {COUNTRY_PROGRAMS.map((c, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={c.key}
                      onClick={() => goTo(i)}
                      aria-label={c.country}
                      aria-pressed={isActive}
                      title={c.country}
                      className={[
                        "grid place-items-center rounded-full transition-all duration-300",
                        isActive
                          ? "h-12 w-12 border-2 border-gold bg-white text-2xl shadow-gold sm:h-14 sm:w-14 sm:text-3xl"
                          : "h-8 w-8 border border-navy/15 bg-white text-base opacity-60 hover:opacity-100 sm:h-9 sm:w-9 sm:text-lg",
                      ].join(" ")}
                    >
                      <span className="leading-none">{c.flag}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next country"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/20 bg-white text-navy shadow-sm transition-all hover:border-gold hover:bg-gold hover:text-navy-deep"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-navy/70">
              {active.country}
            </p>
          </div>
        </div>

        {/* country detail card — single country at a time */}
        <div
          className="relative overflow-hidden rounded-b-3xl border-2 border-t-0 border-[#061a52] px-6 py-12 text-white shadow-elegant sm:px-10 sm:py-16"
          style={{ background: "linear-gradient(135deg, #061a52 0%, #0a2470 55%, #061a52 100%)" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14"
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

                <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {active.programs.map((p) => (
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
