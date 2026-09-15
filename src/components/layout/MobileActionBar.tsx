import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Users } from "lucide-react";

const CALL_NUMBER = "+91 80621 80254";
const CALL_HREF = `tel:${CALL_NUMBER.replace(/\s/g, "")}`;
const WHATSAPP_HREF = `https://wa.me/918062180254?text=${encodeURIComponent("i am intereseted.")}`;
const MAIL_HREF = "mailto:info@7wingsimmigration.com";

export function MobileActionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <div className="h-[72px] md:hidden" aria-hidden="true" />
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy/10 bg-white py-2 md:hidden"
        aria-label="Mobile quick actions"
      >
        <div className="flex items-stretch justify-around">
          <a
            href={CALL_HREF}
            className="flex flex-1 flex-col items-center gap-1 border-r border-navy/10 py-1 active:opacity-80"
            aria-label={`Call us at ${CALL_NUMBER}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-deep text-white shadow-sm">
              <Phone className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-medium text-navy-deep">Call Us</span>
          </a>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 flex-col items-center gap-1 border-r border-navy/10 py-1 active:opacity-80"
            aria-label="Chat with us on WhatsApp"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-deep text-white shadow-sm">
              <MessageCircle className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-medium text-navy-deep">WhatsApp</span>
          </a>

          <a
            href={MAIL_HREF}
            className="flex flex-1 flex-col items-center gap-1 border-r border-navy/10 py-1 active:opacity-80"
            aria-label="Email us"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-deep text-white shadow-sm">
              <Mail className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-medium text-navy-deep">Mail Us</span>
          </a>

          <Link
            to="/contact"
            className="flex flex-1 flex-col items-center gap-1 py-1 active:opacity-80"
            aria-label="Go to contact page"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-deep text-white shadow-sm">
              <Users className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="text-[10px] font-medium text-navy-deep">Consultation</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
