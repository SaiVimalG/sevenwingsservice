import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SERVICES } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-black/5 bg-white/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(13,46,125,0.2)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
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
                    className="relative px-4 py-2 text-sm font-medium text-navy-deep transition-colors hover:text-gold-deep"
                  >
                    {item.label}
                    <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
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
                className="px-4 py-2 text-sm font-medium text-navy-deep transition-colors hover:text-gold-deep"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-gold-deep" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link to="/book-consultation" className="ml-3 btn-gold btn-gold-hover text-sm">
            Apply Now <ArrowRight className="h-4 w-4" />
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
                  Programs
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
                to="/book-consultation"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 btn-gold btn-gold-hover"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
