import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const PopupLeadForm = lazy(() =>
  import("./PopupLeadForm").then((m) => ({ default: m.PopupLeadForm })),
);

export function PageShell({ children }: { children: ReactNode }) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setShowPopup(true), { timeout: 6000 })
      : (window.setTimeout(() => setShowPopup(true), 4000) as unknown as number);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 animate-fade-in">{children}</main>
      <Footer />
      {showPopup && (
        <Suspense fallback={null}>
          <PopupLeadForm />
        </Suspense>
      )}
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
