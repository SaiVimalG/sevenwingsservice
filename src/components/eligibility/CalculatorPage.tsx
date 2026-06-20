import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Shield,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Phone,
  Calculator,
  TrendingUp,
  Award,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE } from "@/lib/site";
import { toast } from "sonner";
import type { CalculatorConfig } from "@/lib/eligibility/types";

export function CalculatorPage({ config }: { config: CalculatorConfig }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const score = useMemo(() => {
    let total = config.basePoints ?? 0;
    const breakdown: Record<string, number> = {};
    for (const f of config.fields) {
      const v = answers[f.key] ?? "";
      let p = 0;
      if (f.points) p = f.points(v, answers);
      else {
        const opt = f.options.find((o) => o.value === v);
        p = opt?.points ?? 0;
      }
      breakdown[f.category] = (breakdown[f.category] ?? 0) + p;
      total += p;
    }
    return { total, breakdown };
  }, [answers, config]);

  const status = (() => {
    if (score.total >= config.highlyCompetitiveThreshold)
      return { label: "Highly Competitive", color: "text-emerald-300", ring: "ring-emerald-400/40", bar: "bg-emerald-400" };
    if (score.total >= config.competitiveThreshold)
      return { label: "Competitive", color: "text-emerald-200", ring: "ring-emerald-300/30", bar: "bg-emerald-300" };
    if (score.total >= config.passingThreshold)
      return { label: "Eligible", color: "text-gold-soft", ring: "ring-gold/40", bar: "bg-gold" };
    return { label: "Needs Improvement", color: "text-orange-300", ring: "ring-orange-400/30", bar: "bg-orange-400" };
  })();

  const pct = Math.min(100, Math.round((score.total / config.maxPoints) * 100));

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero pt-28 pb-10 text-white md:pt-32 md:pb-12 lg:pt-36">
        <div className="absolute inset-0 [background:radial-gradient(800px_400px_at_80%_20%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Breadcrumbs url={config.url} leaf={config.h1} />
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft backdrop-blur">
                <span className="text-lg leading-none">{config.countryFlag}</span>
                {config.badge}
              </span>
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
                {config.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-white/90 md:text-lg">{config.subheading}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
                {config.trustChips.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator + sticky sidebar */}
      <section className="relative bg-background py-12 md:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {config.basePointsLabel && (
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm">
                <p className="font-semibold text-foreground">
                  {config.basePointsLabel}{" "}
                  <span className="text-gold-deep">
                    (+{config.basePoints} starting points)
                  </span>
                </p>
              </div>
            )}

            {config.fields.map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.2) }}
                className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {f.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-foreground md:text-lg">
                      {f.label}
                    </h3>
                    {f.tooltip && (
                      <p className="mt-1 text-xs text-muted-foreground">{f.tooltip}</p>
                    )}
                  </div>
                  <CategoryPoints
                    value={
                      f.points
                        ? f.points(answers[f.key] ?? "", answers)
                        : f.options.find((o) => o.value === (answers[f.key] ?? ""))?.points ?? 0
                    }
                  />
                </div>
                <select
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-offset-2 transition focus:ring-2 focus:ring-gold/60"
                  value={answers[f.key] ?? ""}
                  onChange={(e) => setAnswers({ ...answers, [f.key]: e.target.value })}
                >
                  <option value="">— Select —</option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label} {o.points > 0 ? `(+${o.points})` : o.points < 0 ? `(${o.points})` : ""}
                    </option>
                  ))}
                </select>
              </motion.div>
            ))}

            {/* Recommendations */}
            {score.total < config.recommendations.ifBelow && (
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gold-deep" />
                  <h3 className="font-semibold text-foreground">How to improve your score</h3>
                </div>
                <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                  {config.recommendations.tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className={`overflow-hidden rounded-3xl border bg-gradient-to-br from-navy-deep via-navy to-navy-deep p-6 text-white shadow-elegant ring-1 ${status.ring}`}>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/95">
                <span>Current Score</span>
                <Calculator className="h-4 w-4" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <motion.span
                  key={score.total}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-6xl font-bold tabular-nums"
                >
                  {score.total}
                </motion.span>
                <span className="text-white/95">/ {config.maxPoints} {config.scoreUnit ?? "pts"}</span>
              </div>
              <p className={`mt-1 text-sm font-semibold ${status.color}`}>● {status.label}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`h-full ${status.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className="mt-2 text-xs text-white/95">
                Minimum to qualify: <span className="font-semibold text-white">{config.passingThreshold} {config.scoreUnit ?? "pts"}</span>
              </p>

              {/* Breakdown */}
              <div className="mt-5 space-y-2">
                {Object.entries(score.breakdown)
                  .filter(([, v]) => v > 0)
                  .map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between text-xs">
                      <span className="text-white/90">{k}</span>
                      <span className="font-semibold text-gold-soft">+{v}</span>
                    </div>
                  ))}
              </div>

              <div className="mt-5 grid gap-2">
                <Button asChild className="bg-gold text-navy-deep hover:bg-gold-soft">
                  <Link to="/book-consultation">Book Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp an expert
                </a>
              </div>
            </div>

            {config.relatedCalculators && config.relatedCalculators.length > 0 && (
              <div className="mt-6 rounded-2xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Related calculators
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {config.relatedCalculators.map((r) => (
                    <li key={r.href}>
                      <Link to={r.href} className="group flex items-center justify-between text-foreground hover:text-gold-deep">
                        {r.label}
                        <ChevronRight className="h-3.5 w-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* SEO Long-Form Content */}
      <section className="bg-muted/30 py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-6">
          {config.sections.map((s) => (
            <div key={s.h2} className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.h2}</h2>
              {s.body && <p className="mt-3 whitespace-pre-line text-muted-foreground">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.subsections && (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {s.subsections.map((ss) => (
                    <div key={ss.h3} className="rounded-xl border bg-card p-4">
                      <h3 className="font-semibold text-foreground">{ss.h3}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{ss.body}</p>
                      {ss.bullets && (
                        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                          {ss.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Comparison */}
          {config.comparison && (
            <div className="mb-10">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {config.comparison.title}
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border bg-card">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-muted/60 text-left">
                    <tr>
                      {config.comparison.table.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.comparison.table.rows.map((row, i) => (
                      <tr key={i} className="border-t">
                        {row.map((c, j) => (
                          <td key={j} className="px-4 py-3 text-muted-foreground">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQs */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {config.faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <LeadCapture country={config.country} />
    </PageShell>
  );
}

function CategoryPoints({ value }: { value: number }) {
  return (
    <span
      className={`inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-full border px-2 text-xs font-semibold ${
        value > 0
          ? "border-gold/40 bg-gold/10 text-gold-deep"
          : "border-muted bg-muted/40 text-muted-foreground"
      }`}
    >
      +{value}
    </span>
  );
}

function Breadcrumbs({ url, leaf }: { url: string; leaf: string }) {
  const parts = url.split("/").filter(Boolean);
  const crumbs = [{ name: "Home", url: "/" }];
  let acc = "";
  parts.forEach((p, i) => {
    acc += "/" + p;
    crumbs.push({ name: i === parts.length - 1 ? leaf : p.replace(/-/g, " "), url: acc });
  });
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/95">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => (
          <li key={c.url} className="flex items-center gap-1.5 capitalize">
            {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
            {i === crumbs.length - 1 ? (
              <span className="text-white/90">{c.name}</span>
            ) : (
              <Link to={c.url} className="hover:text-gold-soft">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function LeadCapture({ country }: { country: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", occupation: "", experience: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please complete name, email and phone.");
      return;
    }
    try {
      setSubmitting(true);
      const { submitContact } = await import("@/lib/forms.functions");
      await submitContact({
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          country_interest: country,
          message: `Eligibility report request — Occupation: ${form.occupation || "—"}, Experience: ${form.experience || "—"}`,
        },
      });
      toast.success("Thank you — our advisor will contact you within 24 hours.");
      setForm({ name: "", email: "", phone: "", occupation: "", experience: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-background py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-navy-deep to-navy p-8 text-white md:p-12">
          <div className="flex items-center gap-2 text-gold-soft">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Your assessment is ready</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            Get your detailed {country} immigration report
          </h2>
          <p className="mt-2 max-w-xl text-white/90">
            Speak to a {country} migration specialist for a personalised pathway, document checklist, and timeline.
          </p>

          <form onSubmit={submit} className="mt-6 grid gap-3 md:grid-cols-2">
            <Field id="name" label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field id="email" type="email" label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field id="phone" label="Phone (with country code)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field id="occupation" label="Occupation" value={form.occupation} onChange={(v) => setForm({ ...form, occupation: v })} />
            <div className="md:col-span-2">
              <Field id="experience" label="Years of experience" value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 md:col-span-2">
              <Button type="submit" disabled={submitting} className="bg-gold text-navy-deep hover:bg-gold-soft">
                {submitting ? "Sending…" : "Get Detailed Report"}
              </Button>
              <Button asChild type="button" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/book-consultation"><Phone className="mr-1 h-4 w-4" /> Book Free Consultation</Link>
              </Button>
              <a
                href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp expert
              </a>
            </div>
          </form>

          <p className="mt-4 flex items-center gap-2 text-xs text-white/80">
            <Shield className="h-3.5 w-3.5" /> Your details are confidential and never shared.
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, type = "text",
}: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs uppercase tracking-widest text-white/95">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 border-white/20 bg-white/5 text-white placeholder:text-white/90"
      />
    </div>
  );
}
