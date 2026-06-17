import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PopupLeadForm } from "./PopupLeadForm";

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
      <PopupLeadForm />
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
    <section className="relative overflow-hidden bg-hero pb-10 pt-28 text-white md:pb-12 md:pt-32 lg:pt-36">
      <div className="absolute inset-0 [background:radial-gradient(500px_220px_at_85%_30%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {eyebrow && (
          <p className="mb-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl font-bold leading-tight md:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 md:text-base">{subtitle}</p>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
