import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Users, Award, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Free Immigration Eligibility Check | 7 Wings Immigration" },
      { name: "description", content: "Check your immigration eligibility for Canada, Australia, Germany, UK, New Zealand and USA with our free assessment calculator. Get an instant score and personalised recommendations." },
      { property: "og:title", content: "Free Immigration Eligibility Check | 7 Wings Immigration" },
      { property: "og:description", content: "Instant eligibility scoring across the world's top immigration pathways." },
      { property: "og:url", content: "/eligibility" },
    ],
    links: [{ rel: "canonical", href: "/eligibility" }],
  }),
  component: EligibilityPage,
});

// ───────── Types ─────────
type FieldType = "number" | "select";
type Field = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string; points?: number }[];
  points?: (v: string, all: Record<string, string>) => number;
  category?: "Age" | "Education" | "Work exp." | "Language" | "Employment" | "Adaptability" | "Other";
  min?: number;
  max?: number;
};
type Pathway = {
  slug: string;
  name: string;
  short: string;
  max: number;
  thresholds: { good: number; excellent: number };
  scale?: "100" | "1200";
  fields: Field[];
};

// ───────── Helpers ─────────
const ageScore = (v: string) => {
  const a = Number(v);
  if (!a) return 0;
  if (a >= 18 && a <= 35) return 12;
  if (a <= 45) return 6;
  if (a <= 60) return 2;
  return 0;
};
const opt = (label: string, value: string, points = 0) => ({ label, value, points });

// ───────── Pathways ─────────
const FSW: Pathway = {
  slug: "fsw",
  name: "Federal Skilled Workers Program",
  short: "Do you meet the minimum to enter Express Entry?",
  max: 100,
  thresholds: { good: 60, excellent: 75 },
  fields: [
    { key: "age", label: "What is your age?", type: "number", placeholder: "e.g. 28", min: 18, max: 60, category: "Age", points: ageScore },
    {
      key: "edu", label: "Educational qualifications (ECA)", type: "select", category: "Education",
      options: [
        opt("— Select —", "", 0),
        opt("Secondary school", "ss", 5),
        opt("1-yr post-secondary", "1y", 15),
        opt("2-yr program", "2y", 19),
        opt("Bachelor's / 3+ yr program", "ba", 21),
        opt("Two or more credentials", "two", 22),
        opt("Master's degree", "ma", 23),
        opt("PhD", "phd", 25),
      ],
    },
    {
      key: "exp", label: "Work experience (years)", type: "select", category: "Work exp.",
      options: [opt("— Select —", "", 0), opt("0 (ineligible)", "0", 0), opt("1", "1", 9), opt("2", "2", 11), opt("3", "3", 11), opt("4", "4", 13), opt("5", "5", 13), opt("6+", "6", 15)],
    },
    {
      key: "lang1", label: "1st official language CLB", type: "select", category: "Language",
      options: [opt("— Select —", "", 0), opt("CLB 5 (ineligible)", "5", 0), opt("CLB 6 (ineligible)", "6", 0), opt("CLB 7", "7", 16), opt("CLB 8", "8", 20), opt("CLB 9+", "9", 24)],
    },
    {
      key: "lang2", label: "2nd official language CLB", type: "select", category: "Language",
      options: [opt("— Select —", "", 0), opt("None", "none", 0), opt("CLB 5+ all abilities", "5", 4)],
    },
    { key: "lmia", label: "Arranged employment (LMIA)?", type: "select", category: "Employment",
      options: [opt("— Select —", "", 0), opt("No", "no", 0), opt("Yes", "yes", 10)] },
    { key: "spouse", label: "Accompanying spouse/partner?", type: "select", category: "Adaptability",
      options: [opt("— Select —", "", 0), opt("No", "no", 0), opt("Yes", "yes", 5)] },
    { key: "workCa", label: "Previous work in Canada (you)?", type: "select", category: "Adaptability",
      options: [opt("— Select —", "", 0), opt("No", "no", 0), opt("Yes (1+ year)", "yes", 10)] },
    { key: "studyCa", label: "Previous study in Canada (you)?", type: "select", category: "Adaptability",
      options: [opt("— Select —", "", 0), opt("No", "no", 0), opt("Yes (2+ years)", "yes", 5)] },
    { key: "rel", label: "Relative in Canada (PR/citizen)?", type: "select", category: "Adaptability",
      options: [opt("— Select —", "", 0), opt("None", "none", 0), opt("Parent / Sibling", "close", 5), opt("Other relative", "other", 2)] },
  ],
};

const CRS: Pathway = {
  slug: "crs",
  name: "Comprehensive Ranking System (CRS)",
  short: "Your ranking in the Express Entry pool",
  max: 1200,
  scale: "1200",
  thresholds: { good: 470, excellent: 510 },
  fields: [
    { key: "age", label: "What is your age?", type: "number", placeholder: "e.g. 28", min: 18, max: 60, category: "Age",
      points: (v) => { const a = Number(v); if (!a) return 0; if (a >= 20 && a <= 29) return 110; if (a <= 35) return 95; if (a <= 45) return 50; return 10; } },
    { key: "spouse", label: "Accompanying spouse/partner?", type: "select", category: "Other",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",-10)] },
    { key: "edu", label: "Highest education", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("High school","hs",30), opt("1-year program","1y",90), opt("2-year program","2y",98), opt("Bachelor's / 3+ yr","ba",120), opt("Two credentials","two",128), opt("Master's / professional","ma",135), opt("PhD","phd",150)] },
    { key: "l1", label: "1st official language CLB", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("CLB 7","7",68), opt("CLB 8","8",92), opt("CLB 9","9",116), opt("CLB 10+","10",136)] },
    { key: "l2", label: "2nd official language CLB", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("None","none",0), opt("CLB 5-6","5",6), opt("CLB 7-8","7",12), opt("CLB 9+","9",24)] },
    { key: "canExp", label: "Canadian experience (years)", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("None","0",0), opt("1","1",40), opt("2","2",53), opt("3","3",64), opt("4","4",72), opt("5+","5",80)] },
    { key: "forExp", label: "Foreign experience", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("None","0",0), opt("1-2 years","2",25), opt("3+ years","3",50)] },
    { key: "pnp", label: "Provincial nomination?", type: "select", category: "Other",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes (+600 CRS)","yes",600)] },
    { key: "sib", label: "Sibling in Canada?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",15)] },
    { key: "canEdu", label: "Canadian education", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("None","0",0), opt("1-2 year credential","1",15), opt("3+ year credential","3",30)] },
    { key: "french", label: "French proficiency", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("None","none",0), opt("NCLC 7+ Fr + CLB ≤4 En","a",25), opt("NCLC 7+ Fr + CLB 5+ En","b",50)] },
  ],
};

const SINP: Pathway = {
  slug: "sinp",
  name: "Saskatchewan SINP",
  short: "Provincial nominee — 60/110 to qualify",
  max: 110,
  thresholds: { good: 60, excellent: 80 },
  fields: [
    { key: "age", label: "What is your age?", type: "number", placeholder: "e.g. 28", min: 18, max: 60, category: "Age",
      points: (v) => { const a = Number(v); if (!a) return 0; if (a >= 22 && a <= 34) return 12; if (a <= 45) return 8; if (a <= 50) return 2; return 0; } },
    { key: "edu", label: "Educational qualifications", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("Certificate / 2 semesters","cert",12), opt("2-year diploma","dip",15), opt("Bachelor's / 3-yr degree","ba",20), opt("Trade certification","trade",20), opt("Master's degree","ma",23), opt("Doctorate","phd",23)] },
    { key: "exp5", label: "Experience in last 5 years", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("None","0",0), opt("1 year","1",2), opt("2 years","2",4), opt("3 years","3",6), opt("4 years","4",8), opt("5 years","5",10)] },
    { key: "exp10", label: "Experience 6-10 years prior", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("None","0",0), opt("2 years","2",2), opt("3 years","3",3), opt("4 years","4",4), opt("5 years","5",5)] },
    { key: "lang", label: "1st language CLB", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("CLB 5","5",6), opt("CLB 6","6",12), opt("CLB 7","7",16), opt("CLB 8+","8",20)] },
    { key: "job", label: "Saskatchewan employer job offer?", type: "select", category: "Employment",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",30)] },
    { key: "rel", label: "Close relative in Saskatchewan?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("None","none",0), opt("Parent / Sibling / Child","close",20), opt("Other relative","other",10)] },
    { key: "workSk", label: "Previous work in Saskatchewan (12+ months)?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",5)] },
    { key: "studySk", label: "Previous study in Saskatchewan (1+ year)?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",5)] },
  ],
};

const QSWP: Pathway = {
  slug: "quebec",
  name: "Quebec QSWP",
  short: "French is the highest-impact factor",
  max: 100,
  thresholds: { good: 60, excellent: 75 },
  fields: [
    { key: "age", label: "What is your age?", type: "number", placeholder: "e.g. 30", min: 18, max: 60, category: "Age",
      points: (v) => { const a = Number(v); if (!a) return 0; if (a <= 35) return 16; if (a <= 45) return 8; return 0; } },
    { key: "edu", label: "Educational qualifications", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("General Secondary","gs",2), opt("Vocational","voc",6), opt("Technical 1-2 yr","t12",6), opt("Technical 3 yr","t3",9), opt("University 1 yr","u1",4), opt("University 2 yr","u2",6), opt("University 3+ yr","u3",10), opt("Master's","ma",12), opt("Doctorate","phd",14)] },
    { key: "field", label: "Field of study demand", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("General / Not Listed","none",0), opt("Listed","l",6), opt("High Demand","h",9), opt("Priority","p",12), opt("Top Demand","t",16)] },
    { key: "exp", label: "Work experience (months)", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("<6 months","0",0), opt("6-11","6",4), opt("12-23","12",4), opt("24-35","24",6), opt("36-47","36",6), opt("48+","48",8)] },
    { key: "french", label: "French proficiency", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("None / Basic (ineligible)","none",0), opt("Advanced","adv",14), opt("Superior","sup",16)] },
    { key: "english", label: "English proficiency", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("None / Basic","none",0), opt("Intermediate","int",2), opt("Advanced","adv",4), opt("Superior","sup",6)] },
    { key: "job", label: "Validated job offer in Quebec?", type: "select", category: "Employment",
      options: [opt("— Select —","",0), opt("None","none",0), opt("In Montreal","mtl",8), opt("Outside Montreal","out",10)] },
    { key: "spouse", label: "Accompanying spouse?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",3)] },
    { key: "studyQc", label: "Study stay in Quebec?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",5)] },
    { key: "workQc", label: "Work stay in Quebec?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",5)] },
    { key: "fam", label: "Family in Quebec?", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",3)] },
    { key: "kids12", label: "Children 12 years or under", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("0","0",0), opt("1","1",4), opt("2","2",8)] },
    { key: "kids13", label: "Children aged 13–21", type: "select", category: "Adaptability",
      options: [opt("— Select —","",0), opt("0","0",0), opt("1","1",2), opt("2","2",4)] },
  ],
};

// Generic placeholder pathway used for Australia / UK / Germany / NZ / USA
const generic = (slug: string, name: string, short: string): Pathway => ({
  slug, name, short, max: 100, thresholds: { good: 60, excellent: 75 },
  fields: [
    { key: "age", label: "What is your age?", type: "number", placeholder: "e.g. 28", min: 18, max: 55, category: "Age", points: ageScore },
    { key: "edu", label: "Highest education", type: "select", category: "Education",
      options: [opt("— Select —","",0), opt("Diploma","dip",10), opt("Bachelor's","ba",15), opt("Master's","ma",20), opt("PhD","phd",25)] },
    { key: "exp", label: "Work experience (years)", type: "select", category: "Work exp.",
      options: [opt("— Select —","",0), opt("0-2","0",5), opt("3-5","3",10), opt("6-8","6",15), opt("8+","8",20)] },
    { key: "lang", label: "English proficiency (IELTS)", type: "select", category: "Language",
      options: [opt("— Select —","",0), opt("6.0","6",10), opt("7.0","7",15), opt("8.0+","8",20)] },
    { key: "job", label: "Job offer in country?", type: "select", category: "Employment",
      options: [opt("— Select —","",0), opt("No","no",0), opt("Yes","yes",15)] },
  ],
});

const COUNTRIES: { key: string; name: string; iso: string; tagline: string; pathways: Pathway[] }[] = [
  {
    key: "canada", name: "Canada", iso: "ca", tagline: "Express Entry & PNP pathways",
    pathways: [FSW, CRS, SINP, QSWP],
  },
  { key: "australia", name: "Australia", iso: "au", tagline: "Skilled Independent Visa 189",
    pathways: [generic("au-189", "Skilled Independent (189)", "Points-based PR")] },
  { key: "germany", name: "Germany", iso: "de", tagline: "Opportunity Card · Chancenkarte",
    pathways: [generic("de-oc", "Opportunity Card", "Job-seeker points system")] },
  { key: "uk", name: "United Kingdom", iso: "gb", tagline: "Skilled Worker Visa",
    pathways: [generic("uk-sw", "Skilled Worker Visa", "Sponsored employment route")] },
  { key: "nz", name: "New Zealand", iso: "nz", tagline: "Skilled Migrant Category",
    pathways: [generic("nz-smc", "Skilled Migrant Category", "Points-tested residence")] },
  { key: "usa", name: "USA", iso: "us", tagline: "EB-2 / EB-3 employment-based",
    pathways: [generic("us-eb", "EB-2 / EB-3", "Employment-based green card")] },
];

// ───────── Component ─────────
function EligibilityPage() {
  const [countryKey, setCountryKey] = useState("canada");
  const [pathwaySlug, setPathwaySlug] = useState("fsw");
  const [values, setValues] = useState<Record<string, string>>({});

  const country = COUNTRIES.find((c) => c.key === countryKey)!;
  const pathway = country.pathways.find((p) => p.slug === pathwaySlug) ?? country.pathways[0];

  const { total, breakdown, filled } = useMemo(() => {
    const cats: Record<string, number> = { Age: 0, Education: 0, "Work exp.": 0, Language: 0, Employment: 0, Adaptability: 0 };
    let t = 0; let f = 0;
    for (const field of pathway.fields) {
      const v = values[`${pathway.slug}:${field.key}`] ?? "";
      if (v) f++;
      let p = 0;
      if (field.points) p = field.points(v, values);
      else if (field.options) p = field.options.find((o) => o.value === v)?.points ?? 0;
      t += p;
      const cat = field.category ?? "Other";
      cats[cat] = (cats[cat] ?? 0) + p;
    }
    return { total: Math.max(0, t), breakdown: cats, filled: f };
  }, [pathway, values]);

  const pct = Math.min(100, (total / pathway.max) * 100);
  const label =
    total >= pathway.thresholds.excellent ? { text: "Excellent Profile", tone: "bg-emerald-500" } :
    total >= pathway.thresholds.good ? { text: "Strong Profile", tone: "bg-gold" } :
    total >= pathway.thresholds.good * 0.7 ? { text: "Near Threshold", tone: "bg-amber-500" } :
    { text: "Below Threshold", tone: "bg-rose-500" };

  const setField = (key: string, v: string) => setValues((prev) => ({ ...prev, [`${pathway.slug}:${key}`]: v }));
  const reset = () => setValues((prev) => {
    const next = { ...prev };
    for (const f of pathway.fields) delete next[`${pathway.slug}:${f.key}`];
    return next;
  });

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-deep py-20 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(212,175,55,0.18), transparent 45%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Free Immigration Assessment
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Check your immigration eligibility <span className="text-gold">in minutes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/75 sm:text-lg">
            Find out your eligibility score for Canada, Australia, Germany, New Zealand, United Kingdom and other immigration pathways through our advanced assessment calculator.
          </p>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
            {[
              { icon: Users, t: "10,000+ Assessments" },
              { icon: Award, t: "Licensed Guidance" },
              { icon: CheckCircle2, t: "98% Client Satisfaction" },
              { icon: Shield, t: "Secure & Private" },
            ].map((b) => (
              <li key={b.t} className="flex items-center gap-2"><b.icon className="h-4 w-4 text-gold" /> {b.t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Country selector */}
      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-navy-deep sm:text-3xl">Choose your destination</h2>
          <p className="mt-1 text-sm text-muted-foreground">Switch countries any time — pathway forms update automatically.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {COUNTRIES.map((c) => {
              const active = c.key === countryKey;
              return (
                <button
                  key={c.key}
                  onClick={() => { setCountryKey(c.key); setPathwaySlug(c.pathways[0].slug); }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-4 text-left transition-all ${
                    active ? "border-gold shadow-[0_18px_40px_-18px_rgba(212,175,55,0.55)] ring-2 ring-gold/60" : "border-black/5 hover:-translate-y-0.5 hover:shadow-elegant"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={`https://hatscripts.github.io/circle-flags/flags/${c.iso}.svg`} alt={c.name} className="h-10 w-10 rounded-full object-cover shadow" />
                    <div className="min-w-0">
                      <div className="truncate font-display text-base font-bold text-navy-deep">{c.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{c.tagline}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pathways */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {country.pathways.map((p) => {
                const active = p.slug === pathwaySlug;
                return (
                  <motion.button
                    key={`${country.key}-${p.slug}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setPathwaySlug(p.slug)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-gold bg-white shadow-[0_18px_40px_-18px_rgba(212,175,55,0.55)] ring-2 ring-gold/50"
                        : "border-black/5 bg-white hover:-translate-y-0.5 hover:shadow-elegant"
                    }`}
                  >
                    <div className={`text-sm font-bold ${active ? "text-gold-deep" : "text-navy-deep"}`}>{p.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{p.short}</div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Form + Score */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-elegant">
            <div className="flex items-center justify-between gap-3 bg-navy-deep px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <img src={`https://hatscripts.github.io/circle-flags/flags/${country.iso}.svg`} className="h-7 w-7 rounded-full object-cover" alt="" />
                <h3 className="font-display text-base font-semibold sm:text-lg">{country.name} — {pathway.name}</h3>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{filled}/{pathway.fields.length}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${country.key}-${pathway.slug}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid gap-5 p-6 sm:grid-cols-2"
              >
                {pathway.fields.map((f) => {
                  const v = values[`${pathway.slug}:${f.key}`] ?? "";
                  return (
                    <div key={f.key} className="space-y-1.5">
                      <label className="text-sm font-semibold text-navy-deep">{f.label}</label>
                      {f.type === "number" ? (
                        <input
                          type="number"
                          inputMode="numeric"
                          min={f.min}
                          max={f.max}
                          placeholder={f.placeholder}
                          value={v}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="block w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy-deep outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                        />
                      ) : (
                        <select
                          value={v}
                          onChange={(e) => setField(f.key, e.target.value)}
                          className="block w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-navy-deep outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                        >
                          {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      )}
                    </div>
                  );
                })}
                <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/book-consultation" className="btn-gold btn-gold-hover">Your score is ready <ArrowRight className="h-4 w-4" /></Link>
                  <button onClick={reset} className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-navy-deep transition hover:border-gold hover:text-gold-deep">Reset</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky score */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-elegant">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your score</div>
                <motion.div
                  key={total}
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="mt-1 font-display text-6xl font-bold text-gold-deep"
                >
                  {total}
                </motion.div>
                <div className="text-xs text-muted-foreground">out of {pathway.max}</div>
              </div>

              {/* Meter */}
              <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-black/5">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${label.tone}`}
                />
              </div>
              <div className="mt-2 text-center text-xs font-semibold text-navy-deep">{label.text}</div>

              {/* Breakdown */}
              <ul className="mt-6 space-y-2.5 text-sm">
                {Object.entries(breakdown).filter(([, v]) => v !== 0 || true).map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between border-b border-dashed border-black/5 pb-1.5">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold text-navy-deep">{v}</span>
                  </li>
                ))}
              </ul>

              <Link to="/book-consultation" className="mt-6 inline-flex w-full items-center justify-center gap-2 btn-gold btn-gold-hover">
                Talk to an expert <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-gold-deep"><Phone className="h-3 w-3" /> {SITE.phone}</a>
                <span>·</span>
                <a href={`https://wa.me/${SITE.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 hover:text-gold-deep"><MessageCircle className="h-3 w-3" /> WhatsApp</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
