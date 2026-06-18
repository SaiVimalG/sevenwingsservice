import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { SITE, SERVICES } from "@/lib/site";

export function Footer() {
  return (
    <>
      {/* Service Commitment — sits above the footer on a white band */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-5">
          <p className="text-center text-[11px] leading-relaxed md:text-xs">
            <span className="font-semibold text-red-500">Service Commitment:</span>{" "}
            <span className="text-navy-deep">
              7 Wings Immigration offers professional guidance and full application processing. We don't guarantee visa approvals or job placements — final decisions rest with immigration authorities, embassies and employers. We maximise your success with accurate documentation, transparent advice and dedicated support.
            </span>
          </p>
        </div>
      </div>

    <footer className="relative overflow-hidden bg-navy-mesh text-white border-t-4 border-navy-deep">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-4 pt-4 pb-6 sm:px-6 md:gap-12 md:pt-8 md:pb-14 lg:grid-cols-4">
        <div className="space-y-4 md:space-y-6 col-span-2 lg:col-span-1 pb-[2px]">
          <div className="flex items-center justify-start gap-4 -mt-2 mb-[5px]">
            <Logo variant="dark" />
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:hidden">
              {[
                { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
                { Icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
                { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
                { Icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/90 transition-all hover:border-gold hover:text-gold hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <p className="max-w-sm text-sm text-white/90">
            Hyderabad's premium immigration consultancy for Germany, Australia, Canada and JSS pathways.
            Soar beyond borders. Land with confidence.
          </p>
          <div className="hidden flex-wrap items-center gap-3 lg:flex">
            {[
              { Icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
              { Icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
              { Icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
              { Icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/90 transition-all hover:border-gold hover:text-gold hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Programs</h3>
          <ul className="space-y-3 text-sm text-white/90">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <span>{s.flag}</span> {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Company</h3>
          <ul className="space-y-3 text-sm text-white/90">
            {[
              { to: "/about", label: "About Us" },
              { to: "/success-stories", label: "Success Stories" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/refund", label: "Cancellation & Refund Policy" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</h3>
          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-gold">{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 py-5">
          <p className="text-center text-[11px] leading-relaxed md:text-xs">
            <span className="font-semibold text-red-500">Service Commitment:</span>{" "}
            <span className="text-sky">
              7 Wings Immigration offers professional guidance and full application processing. We don't guarantee visa approvals or job placements — final decisions rest with immigration authorities, embassies and employers. We maximise your success with accurate documentation, transparent advice and dedicated support.
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} 7 Wings Immigration. All rights reserved.</p>
          <p>
            Made for ambitious professionals in <span className="text-gold">Hyderabad</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
