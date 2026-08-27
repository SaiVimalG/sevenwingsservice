import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  Loader2,
  User,
  Mail,
  Globe2,
  Briefcase,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/lib/site";
import { submitLead } from "@/lib/leads.functions";
import { Input, Textarea, Select } from "@/components/forms/Forms";
import { PhoneField } from "@/components/forms/PhoneField";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Get a Free Immigration Consultation | 7 Wings Immigration" },
      {
        name: "description",
        content:
          "Submit your enquiry for Germany, Australia, Canada or global immigration. A senior counsellor from 7 Wings Immigration will call you back within 4 working hours.",
      },
      {
        property: "og:title",
        content: "Get a Free Immigration Consultation | 7 Wings Immigration",
      },
      {
        property: "og:description",
        content:
          "Free consultation for Germany Opportunity Card, Australia PR, Canada PR and JSS Program. Hyderabad's premium immigration consultancy.",
      },
      { property: "og:url", content: "https://www.7wingsimmigration.com/leads" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Get a Free Immigration Consultation | 7 Wings Immigration",
      },
      {
        name: "twitter:description",
        content: "Submit your enquiry and a senior counsellor will reply within 4 working hours.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/leads" }],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free Consultation"
        title="Tell us about your immigration goal."
        subtitle="Fill in the form below. A senior counsellor will review your profile and call you back within 4 working hours."
      />
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal>
            <LeadCaptureForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function LeadCaptureForm() {
  const fn = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const formId = useFormId("LP");

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
          service: String(f.get("service") || "") || null,
          country: String(f.get("country") || "") || null,
          city: String(f.get("city") || "") || null,
          message: String(f.get("message") || "") || null,
          website: String(f.get("website") || "") || null,
        },
      });
      toast.success("Thank you! A senior counsellor will call you within 4 working hours.");
      (e.target as HTMLFormElement).reset();
      setAccepted(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id={formId}
      data-form-id={formId}
      data-form-source="leads_page"
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-black/5 bg-white p-6 md:p-10 shadow-elegant"
    >
      <input type="hidden" name="form_id" value={formId} />
      <div className="space-y-1">
        <h2 className="font-display text-2xl font-bold text-navy-deep">
          Start your immigration journey
        </h2>
        <p className="text-sm text-muted-foreground">Fields marked with * are required.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input name="name" label="Full name" icon={User} required />
        <Input name="email" type="email" label="Email" icon={Mail} required />
      </div>
      <PhoneField name="phone" label="Phone" required />
      <div className="grid gap-5 md:grid-cols-2">
        <Select name="service" label="Service interested in" icon={Briefcase}>
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </Select>
        <Select name="country" label="Country of interest" icon={Globe2}>
          <option value="">Select a country…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.country}>
              {s.country}
            </option>
          ))}
          <option value="Other">Other</option>
        </Select>
      </div>
      <Input name="city" label="Current city" icon={MapPin} placeholder="e.g. Hyderabad" />
      <Textarea
        name="message"
        label="How can we help?"
        icon={MessageSquare}
        rows={4}
        placeholder="Tell us about your profile, goals and timeline..."
      />

      {/* Honeypot: hidden from real users, traps bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <label className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
        />
        <span>
          I agree to be contacted about my enquiry and accept the{" "}
          <a
            href="/terms"
            className="text-gold-deep underline hover:text-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-gold-deep underline hover:text-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={loading || !accepted}
        className="btn-gold btn-gold-hover w-full justify-center disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Request Free Consultation <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
