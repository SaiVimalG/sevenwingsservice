import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
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

export function ContactForm() {
  const fn = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);

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
          message: String(f.get("message") || ""),
        },
      });
      toast.success("Thanks! Our team will reply within 4 working hours.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input name="name" label="Full name" icon={User} required />
      <Input name="email" type="email" label="Email" icon={Mail} required />
      <PhoneField name="phone" label="Phone" required />
      <Select name="country_interest" label="Country of interest" icon={Globe2}>
        <option value="">Select…</option>
        {SERVICES.map((s) => <option key={s.slug} value={s.country}>{s.country}</option>)}
        <option value="Other">Other</option>
      </Select>
      <Textarea name="message" label="How can we help?" icon={MessageSquare} required rows={5} />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Inquiry <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

export function ConsultationForm() {
  const fn = useServerFn(submitConsultation);
  const [loading, setLoading] = useState(false);

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
          preferred_country: String(f.get("preferred_country") || ""),
          preferred_date: String(f.get("preferred_date") || "") || null,
          preferred_time: String(f.get("preferred_time") || "") || null,
          current_status: String(f.get("current_status") || "") || null,
          notes: String(f.get("notes") || "") || null,
        },
      });
      toast.success("Consultation booked. We'll confirm your slot shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
    </form>
  );
}

/**
 * Compact sidebar form for blog posts: Name, Email, Phone only.
 */
export function BlogContactForm() {
  const fn = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);

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
          message: "Blog sidebar enquiry — please call back.",
        },
      });
      toast.success("Thanks! A senior counsellor will call you within 4 working hours.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input name="name" label="Full name" icon={User} required />
      <Input name="email" type="email" label="Email" icon={Mail} required />
      <PhoneField name="phone" label="Phone" required />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover w-full justify-center disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Request a callback <ArrowRight className="h-4 w-4" /></>}
      </button>
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
