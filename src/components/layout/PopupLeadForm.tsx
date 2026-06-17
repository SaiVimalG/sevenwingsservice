import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Loader2, User, Mail, Globe2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContact } from "@/lib/forms.functions";
import { SERVICES } from "@/lib/site";
import { PhoneField } from "@/components/forms/PhoneField";

const STORAGE_KEY = "7w_popup_shown_v1";

export function PopupLeadForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fn = useServerFn(submitContact);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await fn({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          phone: String(f.get("phone") || ""),
          country_interest: String(f.get("country_interest") || "") || null,
          message: "Popup lead — please call back.",
        },
      });
      toast.success("Thanks! Our team will reach out within 4 working hours.");
      close();
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
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/5 text-navy-deep transition-colors hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>

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

            <form onSubmit={onSubmit} className="space-y-3 p-6">
              <Field icon={User}>
                <input name="name" required placeholder="Full name" className={input} />
              </Field>
              <Field icon={Mail}>
                <input name="email" type="email" required placeholder="Email" className={input} />
              </Field>
              <PhoneField name="phone" label="" required />
              <Field icon={Globe2}>
                <select name="country_interest" className={`${input} appearance-none pr-8`} defaultValue="">
                  <option value="" disabled>Country of interest</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.country}>{s.country}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </Field>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold btn-gold-hover w-full justify-center disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>Request Callback <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                Your details are confidential. No spam, ever.
              </p>
            </form>
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
