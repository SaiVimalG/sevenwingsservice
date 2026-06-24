import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const isDark = variant === "dark";
  const src = isDark ? SITE.logoUrlDark : SITE.logoUrl;
  return (
    <Link
      to="/"
      className={`group relative flex h-full min-w-0 items-center p-0 m-0 leading-none ${className}`}
      aria-label={`${SITE.name} home`}
    >
      <span className="relative inline-flex h-full items-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        <img
          src={src}
          alt={`${SITE.name} logo`}
          width={160}
          height={160}
          fetchPriority="high"
          decoding="async"
          className="block h-16 w-auto max-w-none shrink-0 scale-[1.35] origin-left object-contain object-left transition-transform duration-500 ease-out sm:h-20 lg:h-24"
        />


      </span>
    </Link>
  );
}
