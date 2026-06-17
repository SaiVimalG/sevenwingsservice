import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  X,
  ArrowRight,
  Loader2,
  User,
  Mail,
  Globe2,
  Sparkles,
  GraduationCap,
  Briefcase,
  MapPin,
  Languages,
  CheckCircle2,
  Phone as PhoneIcon,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContact } from "@/lib/forms.functions";
import { PhoneField } from "@/components/forms/PhoneField";

const STORAGE_KEY = "7w_popup_shown_v1";
const FORM_SOURCE = "popup_lead_v2";

const ENGLISH_LEVELS = [
  "Excellent (8+ Band)",
  "Good (7 Band)",
  "Average (6 Band)",
  "Poor (5 Band)",
  "Very Poor (4 Band)",
];
const EDUCATION = [
  "PHD / Doctorate",
  "Masters",
  "Post Graduation",
  "Two or more Certificates",
  "Graduation",
  "Intermediate / 12th",
  "Matriculation / 10th",
  "Diploma 3 years",
];
const VISA_TYPES = [
  "Express Entry",
  "PNP",
  "Business Investor Program",
  "Work Permit",
  "Study Visa",
  "Visitor Visa",
  "Tourist",
  "Others",
];
const DEST_COUNTRIES = [
  "Canada",
  "Australia",
  "Germany",
  "UK",
  "United Arab Emirates",
  "United States",
  "Spain",
  "Others",
];

function genFormId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `7WFI-PL-${ts}-${rand}`;
}

export function PopupLeadForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formId = useMemo(() => genFormId(), []);
  const fn = useServerFn(submitContact);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOpen(false);
    setAccepted(false);
    setSubmitted(false);
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, [pathname]);

  function close() {
    setOpen(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) {
      toast.error("Please accept the Terms & Conditions to continue.");
      return;
    }
    const f = new FormData(e.currentTarget);
    const country = String(f.get("country_to_immigrate") || "");
    const visa = String(f.get("visa_type") || "");

    const extras = [
      `Form ID: ${formId}`,
      `Source: ${FORM_SOURCE}`,
      `English level: ${f.get("english_level") || "—"}`,
      `Current country: ${f.get("current_country") || "—"}`,
      `Education: ${f.get("education") || "—"}`,
      `Visa type: ${visa}`,
      `Country to immigrate: ${country}`,
      `Page: ${typeof window !== "undefined" ? window.location.pathname : "—"}`,
    ].join("\n");

    setLoading(true);
    try {
      await fn({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          phone: String(f.get("phone") || ""),
          country_interest: country || null,
          message: `Popup lead — please call back.\n\n${extras}`,
        },
      });
      setSubmitted(true);
      toast.success("Thank you! We will contact you shortly.", {
        description: "A counsellor will call you within 4 working hours.",
      });
      setTimeout(() => {
        setOpen(false);
        toast.success("Thank you! We will contact you shortly.", {
          description: "A counsellor will call you within 4 working hours.",
        });
      }, 4000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white text-navy-deep shadow-lg ring-1 ring-black/10 transition-all hover:bg-navy-deep hover:text-white hover:scale-105"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {submitted ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-navy-deep">
                  Thank you! Your request is received.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A senior immigration counsellor from 7 Wings will contact you shortly —
                  typically within <span className="font-semibold text-navy-deep">4 working hours</span>.
                  Please keep your phone reachable.
                </p>
                <div className="mt-5 rounded-xl border border-black/10 bg-cream/50 p-4 text-left text-xs text-muted-foreground">
                  <p className="font-semibold uppercase tracking-wider text-navy-deep">What happens next?</p>
                  <ul className="mt-2 space-y-1.5">
                    <li>• Quick eligibility check on your profile</li>
                    <li>• A free 15-minute consultation call</li>
                    <li>• Personalised pathway &amp; next steps</li>
                  </ul>
                </div>
                <div className="mt-5 flex flex-col items-center gap-2">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:text-gold"
                  >
                    <PhoneIcon className="h-4 w-4" /> Need us sooner? Call us now
                  </a>
                  <button
                    onClick={close}
                    className="mt-2 rounded-full border border-black/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-navy-deep hover:bg-black/5"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
            <>
            <div className="bg-hero px-6 py-5 text-white">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                <Sparkles className="h-3 w-3" /> Free Consultation
              </p>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                Talk to a senior immigration expert
              </h3>
              <p className="mt-1 text-sm text-white/85">
                Share your details — we'll call you back within 4 working hours.
              </p>
            </div>


            <form
              id={formId}
              data-form-id={formId}
              data-form-source={FORM_SOURCE}
              onSubmit={onSubmit}
              className="space-y-3 p-6"
            >
              <input type="hidden" name="form_id" value={formId} />

              <Field icon={Languages}>
                <select name="english_level" className={`${input} appearance-none pr-8`} defaultValue="">
                  <option value="" disabled>What is your English level (optional)</option>
                  {ENGLISH_LEVELS.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </Field>

              <Field icon={User}>
                <input name="name" required placeholder="Full name *" className={input} />
              </Field>

              <Field icon={Mail}>
                <input name="email" type="email" required placeholder="Email *" className={input} />
              </Field>

              <Field icon={MapPin}>
                <input name="current_country" placeholder="Current country (optional)" className={input} />
              </Field>

              <PhoneField name="phone" label="" required />

              <div className="grid gap-3 sm:grid-cols-2">
                <Field icon={GraduationCap}>
                  <select name="education" className={`${input} appearance-none pr-8`} defaultValue="">
                    <option value="" disabled>Education (optional)</option>
                    {EDUCATION.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </Field>
                <Field icon={Briefcase}>
                  <select name="visa_type" required className={`${input} appearance-none pr-8`} defaultValue="">
                    <option value="" disabled>Visa Type *</option>
                    {VISA_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </Field>
              </div>

              <Field icon={Globe2}>
                <select name="country_to_immigrate" required className={`${input} appearance-none pr-8`} defaultValue="">
                  <option value="" disabled>Country to immigrate *</option>
                  {DEST_COUNTRIES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </Field>

              <label className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
                  required
                />
                <span>
                  We will use your details only to call you back about your enquiry. By submitting, you accept our{" "}
                  <Link to="/terms" className="text-gold-deep underline hover:text-gold" target="_blank">Terms &amp; Conditions</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-gold-deep underline hover:text-gold" target="_blank">Privacy Policy</Link>.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || submitted || !accepted}
                aria-busy={loading}
                className="btn-gold btn-gold-hover w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  <>Request Callback <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const input =
  "w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-muted-foreground/70 outline-none";

function Field({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-xl border border-black/10 bg-white transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
      <span className="grid w-11 shrink-0 place-items-center border-r border-black/10 bg-cream/60 text-gold-deep">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
