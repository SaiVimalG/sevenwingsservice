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
          className="block h-14 w-auto max-w-none shrink-0 object-contain object-left transition-transform duration-500 ease-out sm:h-16 lg:h-[68px]"
          style={isDark ? { filter: "brightness(0) invert(1)" } : undefined}
        />

      </span>
    </Link>
  );
}
