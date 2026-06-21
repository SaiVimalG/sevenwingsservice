import { useEffect, useRef, useState } from "react";

export function CountUp({ end, suffix = "", duration = 1.6 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setValue(end);
        return;
      }
      const start = performance.now();
      let raf = 0;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / (duration * 1000));
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(end * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };
    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { run(); io.disconnect(); }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
