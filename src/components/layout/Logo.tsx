import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const isDark = variant === "dark";
  return (
    <Link to="/" className={`group flex items-center ${className}`} aria-label={`${SITE.name} home`}>
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 transition-all duration-500 ${
          isDark ? "bg-white ring-white/20 group-hover:ring-[oklch(0.78_0.13_85)]" : "bg-white ring-black/5 group-hover:ring-[oklch(0.78_0.13_85)]"
        }`}
      >
        <img
          src={SITE.logoUrl}
          alt={`${SITE.name} logo`}
          width={56}
          height={56}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </span>
    </Link>
  );
}
