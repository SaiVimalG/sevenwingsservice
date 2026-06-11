import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={`flex h-full items-center overflow-hidden p-0 m-0 ${className}`} aria-label={`${SITE.name} home`}>
      <img
        src={SITE.logoUrl}
        alt={`${SITE.name} logo`}
        className="block h-[94%] w-auto max-w-none object-contain"
      />
    </Link>
  );
}
