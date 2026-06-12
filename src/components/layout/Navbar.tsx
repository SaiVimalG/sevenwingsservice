import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Globe, Linkedin, Instagram, Youtube, Facebook } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SERVICES, SITE } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

function HeaderTop() {
  return (
    <div className="hidden border-b border-white/10 bg-navy-deep text-white lg:block">
      <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-between px-6 text-xs">
        <ul className="flex items-center gap-6 text-white/75">
          <li className="flex items-center gap-2">
            <span className="text-gold-soft">Help Line</span>
            <Phone className="h-3 w-3 text-gold" />
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="font-medium text-white hover:text-gold transition-colors">{SITE.phone}</a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-gold" />
            <span>{SITE.address}</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-gold" />
            <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">{SITE.email}</a>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-white/75">
            <Globe className="h-3 w-3 text-gold" />
            <span>English</span>
          </div>
          <span className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-3 text-white/65">
            <a href={SITE.social.linkedin} aria-label="LinkedIn" className="transition-colors hover:text-gold"><Linkedin className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.facebook} aria-label="Facebook" className="transition-colors hover:text-gold"><Facebook className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.instagram} aria-label="Instagram" className="transition-colors hover:text-gold"><Instagram className="h-3.5 w-3.5" /></a>
            <a href={SITE.social.youtube} aria-label="YouTube" className="transition-colors hover:text-gold"><Youtube className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <HeaderTop />
      <div
        className={`transition-all duration-500 bg-white ${
          scrolled
            ? "border-b border-black/5 shadow-[0_10px_40px_-20px_rgba(13,46,125,0.18)]"
            : ""
        }`}
      >
        <div className="mx-auto flex h-[86px] max-w-[1400px] items-center justify-between px-6 overflow-visible">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      to={item.to}
                      className="relative px-3.5 py-2 text-sm font-medium text-navy-deep transition-colors hover:text-gold-deep"
                    >
                      {item.label}
                    </Link>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-elegant">
                            {SERVICES.map((s) => (
                              <Link
                                key={s.slug}
                                to="/services/$slug"
                                params={{ slug: s.slug }}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-cream"
                              >
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy text-lg text-white">
                                  {s.flag}
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-semibold text-navy-deep">{s.title}</span>
                                  <span className="block text-xs text-muted-foreground line-clamp-1">{s.short}</span>
                                </span>
                                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-gold-deep opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-3.5 py-2 text-sm font-medium text-navy-deep transition-colors hover:text-gold-deep"
                  activeProps={{ className: "px-3.5 py-2 text-sm font-semibold text-gold-deep" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link to="/eligibility" className="ml-3 btn-gold btn-gold-hover text-sm">
              Free Eligibility Check <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          <button
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
            >
              <div className="space-y-1 px-6 py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-navy-deep hover:bg-cream"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="space-y-1 pt-2">
                  <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-gold-deep">
                    Programmes
                  </div>
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-navy-deep hover:bg-cream"
                    >
                      <span>{s.flag}</span> {s.title}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/eligibility"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 btn-gold btn-gold-hover"
                >
                  Free Eligibility Check <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
