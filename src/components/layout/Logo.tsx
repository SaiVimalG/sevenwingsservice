import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={`group flex h-full items-center py-0.5 leading-none ${className}`} aria-label={`${SITE.name} home`}>
      <img
        src={SITE.logoUrl}
        alt={`${SITE.name} logo`}
        className="block h-full max-h-[76px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}
