import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  Loader2,
  User,
  Mail,
  Globe2,
  MessageSquare,
  Calendar,
  Clock,
  Briefcase,
  FileText,
} from "lucide-react";
import { submitContact, submitConsultation } from "@/lib/forms.functions";
import { SERVICES } from "@/lib/site";
import { PhoneField } from "./PhoneField";

function makeFormId(prefix: string) {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `7WFI-${prefix}-${ts}-${rand}`;
}

function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-muted-foreground">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
      />
      <span>
        I agree to be contacted about my enquiry and accept the{" "}
        <Link to="/terms" className="text-gold-deep underline hover:text-gold" target="_blank">
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-gold-deep underline hover:text-gold" target="_blank">
          Privacy Policy
        </Link>
        . *
      </span>
    </label>
  );
}

function Disclaimer({ formId }: { formId: string }) {
  return (
    <p className="text-[10px] tracking-wider text-muted-foreground/70">Ref ID: {formId}</p>
  );
}

export function ContactForm() {
  const fn = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const formId = useMemo(() => makeFormId("CU"), []);

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
          message: `${String(f.get("message") || "")}\n\n---\nForm ID: ${formId}\nSource: contact_page`,
        },
      });
      toast.success(`Thanks! Ref: ${formId}. Our team will reply within 4 working hours.`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id={formId} data-form-id={formId} data-form-source="contact_page" onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="form_id" value={formId} />
      <Input name="name" label="Full name" icon={User} required />
      <Input name="email" type="email" label="Email" icon={Mail} required />
      <PhoneField name="phone" label="Phone" required />
      <Select name="country_interest" label="Country of interest" icon={Globe2} required>
        <option value="">Select…</option>
        {SERVICES.map((s) => <option key={s.slug} value={s.country}>{s.country}</option>)}
        <option value="Other">Other</option>
      </Select>
      <Textarea name="message" label="How can we help?" icon={MessageSquare} required rows={5} />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Inquiry <ArrowRight className="h-4 w-4" /></>}
      </button>
      <Disclaimer formId={formId} />
    </form>
  );
}

export function ConsultationForm() {
  const fn = useServerFn(submitConsultation);
  const [loading, setLoading] = useState(false);
  const formId = useMemo(() => makeFormId("CN"), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const notes = String(f.get("notes") || "");
      await fn({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          phone: String(f.get("phone") || ""),
          preferred_country: String(f.get("preferred_country") || ""),
          preferred_date: String(f.get("preferred_date") || "") || null,
          preferred_time: String(f.get("preferred_time") || "") || null,
          current_status: String(f.get("current_status") || "") || null,
          notes: `${notes}\n\n---\nForm ID: ${formId}\nSource: book_consultation`.trim(),
        },
      });
      toast.success(`Consultation booked. Ref: ${formId}. We'll confirm your slot shortly.`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id={formId} data-form-id={formId} data-form-source="book_consultation" onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="form_id" value={formId} />
      <Input name="name" label="Full name" icon={User} required />
      <Input name="email" type="email" label="Email" icon={Mail} required />
      <PhoneField name="phone" label="Phone" required />
      <Select name="preferred_country" label="Preferred country" icon={Globe2} required>
        <option value="">Select…</option>
        {SERVICES.map((s) => <option key={s.slug} value={s.country}>{s.country}</option>)}
      </Select>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="preferred_date" type="date" label="Preferred date" icon={Calendar} />
        <Select name="preferred_time" label="Preferred time" icon={Clock}>
          <option value="">Select…</option>
          <option>Morning (9 – 12)</option>
          <option>Afternoon (12 – 16)</option>
          <option>Evening (16 – 20)</option>
        </Select>
      </div>
      <Input name="current_status" label="Current role / qualification" icon={Briefcase} placeholder="e.g. Software Engineer, B.Tech CSE, 4 yrs exp" />
      <Textarea name="notes" label="Anything else we should know?" icon={FileText} rows={4} />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Book Consultation <ArrowRight className="h-4 w-4" /></>}
      </button>
      <Disclaimer formId={formId} />
    </form>
  );
}

/**
 * Compact sidebar form for blog posts: Name, Email, Phone only.
 */
export function BlogContactForm() {
  const fn = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);
  const formId = useMemo(() => makeFormId("BL"), []);

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
          country_interest: null,
          message: `Blog sidebar enquiry — please call back.\n\n---\nForm ID: ${formId}\nSource: blog_sidebar\nPage: ${typeof window !== "undefined" ? window.location.pathname : "—"}`,
        },
      });
      toast.success(`Thanks! Ref: ${formId}. A senior counsellor will call you within 4 working hours.`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    }
    setLoading(false);
  }

  return (
    <form id={formId} data-form-id={formId} data-form-source="blog_sidebar" onSubmit={onSubmit} className="space-y-3">
      <input type="hidden" name="form_id" value={formId} />
      <Input name="name" label="Full name" icon={User} required />
      <Input name="email" type="email" label="Email" icon={Mail} required />
      <PhoneField name="phone" label="Phone" required />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover w-full justify-center disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Request a callback <ArrowRight className="h-4 w-4" /></>}
      </button>
      <Disclaimer formId={formId} />
    </form>
  );
}

type IconCmp = React.ComponentType<{ className?: string }>;

function FieldShell({
  label,
  required,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: IconCmp;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <div className="group flex items-stretch overflow-hidden rounded-xl border border-black/10 bg-white transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
        {Icon && (
          <span className="grid w-11 shrink-0 place-items-center border-r border-black/10 bg-cream/60 text-gold-deep">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </label>
  );
}

const baseInput =
  "w-full bg-transparent px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 outline-none";

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: IconCmp }
) {
  const { label, icon, required, ...rest } = props;
  return (
    <FieldShell label={label} required={required} icon={icon}>
      <input {...rest} required={required} className={baseInput} />
    </FieldShell>
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; icon?: IconCmp }
) {
  const { label, icon, required, ...rest } = props;
  return (
    <FieldShell label={label} required={required} icon={icon}>
      <textarea {...rest} required={required} className={`${baseInput} resize-y`} />
    </FieldShell>
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; icon?: IconCmp }
) {
  const { label, icon, required, children, ...rest } = props;
  return (
    <FieldShell label={label} required={required} icon={icon}>
      <select {...rest} required={required} className={`${baseInput} appearance-none pr-8`}>
        {children}
      </select>
    </FieldShell>
  );
}
