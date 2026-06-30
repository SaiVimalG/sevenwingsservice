import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export interface RelatedLink {
  to: string;
  label: string;
  description?: string;
}

export interface RelatedLinksProps {
  title?: string;
  intro?: string;
  links: RelatedLink[];
  variant?: "card" | "inline" | "compact";
  className?: string;
}

/** Bold internal link with northeast arrow — site standard. */
export function InternalLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`internal-link inline-flex items-baseline gap-0.5 font-bold text-navy-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-deep hover:decoration-gold ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 shrink-0 -translate-y-px text-gold-deep" aria-hidden />
    </Link>
  );
}

export function RelatedLinks({
  title = "Related on 7 Wings",
  intro,
  links,
  variant = "card",
  className = "",
}: RelatedLinksProps) {
  if (!links.length) return null;

  if (variant === "inline") {
    return (
      <p className={`text-sm text-muted-foreground ${className}`}>
        {title && <span className="font-semibold text-navy-deep">{title}: </span>}
        {links.map((l, i) => (
          <span key={l.to}>
            <InternalLink to={l.to}>{l.label}</InternalLink>
            {i < links.length - 1 ? <span className="mx-1.5 text-muted-foreground/60">·</span> : null}
          </span>
        ))}
      </p>
    );
  }

  if (variant === "compact") {
    return (
      <ul className={`space-y-2 text-sm ${className}`}>
        {links.map((l) => (
          <li key={l.to}>
            <InternalLink to={l.to}>{l.label}</InternalLink>
            {l.description && (
              <span className="ml-2 text-muted-foreground">— {l.description}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className={`rounded-3xl border border-gold/25 bg-cream/60 p-6 md:p-8 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
        Explore further
      </p>
      <h3 className="mt-2 font-display text-xl font-bold text-navy-deep md:text-2xl">{title}</h3>
      {intro && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{intro}</p>}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li
            key={l.to}
            className="rounded-2xl border border-black/5 bg-white p-4 transition-shadow hover:shadow-[0_15px_40px_-25px_rgba(13,46,125,0.18)]"
          >
            <InternalLink to={l.to} className="text-base">
              {l.label}
            </InternalLink>
            {l.description && (
              <p className="mt-1 text-xs text-muted-foreground">{l.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
