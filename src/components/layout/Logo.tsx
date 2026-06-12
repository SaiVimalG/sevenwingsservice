import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link
      to="/"
      className={`group relative flex h-full min-w-0 items-center overflow-hidden p-0 m-0 leading-none ${className}`}
      aria-label={`${SITE.name} home`}
    >
      <span className="logo-shine relative inline-block transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <img
          src={SITE.logoUrl}
          alt={`${SITE.name} logo`}
          className="block w-auto max-w-none shrink-0 object-contain transition-[filter] duration-500 ease-out group-hover:brightness-105"
          style={{
            height: "76px",
            maxHeight: "95%",
            filter:
              "drop-shadow(0 0 6px color-mix(in oklab, var(--gold) 18%, transparent)) drop-shadow(0 1px 2px rgba(0,0,0,0.06))",
          }}
        />
      </span>
    </Link>
  );
}
