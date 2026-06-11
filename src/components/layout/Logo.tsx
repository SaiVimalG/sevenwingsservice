import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Logo({ className = "" }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={`group flex items-center ${className}`} aria-label={`${SITE.name} home`}>
      <img
        src={SITE.logoUrl}
        alt={`${SITE.name} logo`}
        className="h-28 w-auto object-contain scale-150 origin-left transition-transform duration-500 group-hover:scale-[1.6] -my-4"
      />
    </Link>
  );
}
