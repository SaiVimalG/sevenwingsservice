import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={`flex h-full min-w-0 items-center overflow-hidden p-0 m-0 leading-none ${className}`} aria-label={`${SITE.name} home`}>
      <img
        src={SITE.logoUrl}
        alt={`${SITE.name} logo`}
        className="block h-[78px] max-h-[97.5%] w-auto max-w-none shrink-0 object-contain"
      />
    </Link>
  );
}
