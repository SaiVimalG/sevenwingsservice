import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const isDark = variant === "dark";
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label={`${SITE.name} home`}>
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 transition-all duration-500 ${
          isDark ? "bg-white ring-white/20 group-hover:ring-[oklch(0.78_0.13_85)]" : "bg-white ring-black/5 group-hover:ring-[oklch(0.78_0.13_85)]"
        }`}
      >
        <img
          src={SITE.logoUrl}
          alt={`${SITE.name} logo`}
          width={48}
          height={48}
          className="h-12 w-12 object-contain p-0.5 transition-transform duration-700 group-hover:scale-105"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.1rem] font-bold tracking-tight ${
            isDark ? "text-white" : "text-navy-deep"
          }`}
        >
          7 Wings
        </span>
        <span
          className={`text-[0.65rem] font-medium uppercase tracking-[0.2em] ${
            isDark ? "text-[oklch(0.88_0.10_88)]" : "text-gold-deep"
          }`}
        >
          Immigration
        </span>
      </span>
    </Link>
  );
}
