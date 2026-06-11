import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero pt-36 pb-20 text-white">
      <div className="absolute inset-0 [background:radial-gradient(800px_400px_at_80%_20%,color-mix(in_oklab,var(--gold)_20%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {eyebrow && (
          <p className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
