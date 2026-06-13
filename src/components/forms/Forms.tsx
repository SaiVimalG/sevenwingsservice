import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" label="Full name" required />
        <Input name="email" type="email" label="Email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneField name="phone" label="Phone" required />
        <Select name="country_interest" label="Country of interest">
          <option value="">Select…</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.country}>{s.country}</option>)}
          <option value="Other">Other</option>
        </Select>
      </div>

      <Textarea name="message" label="How can we help?" required rows={5} />
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" label="Full name" required />
        <Input name="email" type="email" label="Email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <PhoneField name="phone" label="Phone" required />
        <Select name="preferred_country" label="Preferred country" required>
          <option value="">Select…</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.country}>{s.country}</option>)}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="preferred_date" type="date" label="Preferred date" />
        <Select name="preferred_time" label="Preferred time">
          <option value="">Select…</option>
          <option>Morning (9 – 12)</option>
          <option>Afternoon (12 – 16)</option>
          <option>Evening (16 – 20)</option>
        </Select>
      </div>
      <Input name="current_status" label="Current role / qualification" placeholder="e.g. Software Engineer, B.Tech CSE, 4 yrs exp" />
      <Textarea name="notes" label="Anything else we should know?" rows={4} />
      <button type="submit" disabled={loading} className="btn-gold btn-gold-hover disabled:opacity-60">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Book Consultation <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

function fieldClass() {
  return "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{rest.required && " *"}</span>
      <input {...rest} className={fieldClass()} />
    </label>
  );
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{rest.required && " *"}</span>
      <textarea {...rest} className={fieldClass()} />
    </label>
  );
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const { label, children, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{rest.required && " *"}</span>
      <select {...rest} className={fieldClass()}>{children}</select>
    </label>
  );
}
