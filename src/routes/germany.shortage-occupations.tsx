import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useMemo, useState } from "react";
import {
  Search,
  X,
  Phone,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { SITE } from "@/lib/site";
import { RelatedLinks } from "@/components/RelatedLinks";
import shortageData from "@/data/germany-shortage-occupations.json";

type Job = {
  code: string;
  title: string;
  group: string;
  groupName: string;
  field: string;
};

const JOBS = shortageData as Job[];
const URL_BASE = "https://www.7wingsimmigration.com/germany/shortage-occupations";

const FIELDS = ["Management", "Science & Engineering", "Health", "Teaching", "IT & Communications"];

const FIELD_BADGE: Record<string, string> = {
  Management: "bg-purple-100 text-purple-800",
  "Science & Engineering": "bg-blue-100 text-blue-800",
  Health: "bg-emerald-100 text-emerald-800",
  Teaching: "bg-amber-100 text-amber-800",
  "IT & Communications": "bg-teal-100 text-teal-800",
};

const POPULAR = ["2512", "2221", "2144", "2142", "2151", "2211", "2523", "2342", "1330", "2262"];

const FAQS: [string, string][] = [
  ["What is the Germany shortage occupation list?", "It is the official list of shortage occupations under Section 18g (1) (2) (1) of the German Residence Act (AufenthG), based on the ISCO-08 classification. It names the professions where Germany has a recognised skills shortage."],
  ["Why does the shortage list matter for the Opportunity Card?", "If your occupation appears on this list, you earn an extra point in the Germany Opportunity Card (Chancenkarte) points system, which improves your chances of qualifying."],
  ["How does the list affect the EU Blue Card?", "Shortage occupations qualify for a lower salary threshold for the EU Blue Card, making it easier for employers to hire you and for you to get approval."],
  ["Is my ISCO code the same as my job title?", "Not always. Match your actual duties to the ISCO-08 unit group description rather than relying only on the job title used by your employer."],
  ["Do I need German language skills for a shortage occupation?", "It depends on the role. Regulated jobs such as nursing and medicine usually require B1–B2 German. IT and engineering roles can often start in English."],
  ["Do I need my qualification recognised?", "For regulated professions (health, teaching, some engineering roles) you need formal recognition. For most other roles, a recognised degree comparison via ANABIN is sufficient."],
  ["Is the shortage list updated?", "Yes. Germany reviews the list periodically. This page reflects the 2024 list published by Make it in Germany."],
  ["Can I apply without a job offer?", "Yes — with the Opportunity Card you can move to Germany for up to one year to search for a job, provided you meet the points requirement."],
  ["Do shortage occupations get faster visa processing?", "Shortage occupations are prioritised by the Federal Employment Agency and often move faster through the accelerated skilled worker procedure."],
  ["How can 7 Wings help?", "We assess your ISCO match, check your points, handle document recognition, and guide your Opportunity Card or EU Blue Card application end to end."],
];

export const Route = createFileRoute("/germany/shortage-occupations")({
  head: () => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
    const webLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Germany Shortage Occupation List",
      url: URL_BASE,
      potentialAction: {
        "@type": "SearchAction",
        target: `${URL_BASE}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
    const crumbsLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.7wingsimmigration.com/" },
        { "@type": "ListItem", position: 2, name: "Germany", item: "https://www.7wingsimmigration.com/services/germany-opportunity-card" },
        { "@type": "ListItem", position: 3, name: "Shortage Occupation List", item: URL_BASE },
      ],
    };
    return {
      meta: [
        { title: "Germany Shortage Occupation List 2025 — Check Your Job (Free Search)" },
        { name: "description", content: "Check the official Germany shortage occupation list (Mangelberufe) free. Search ISCO-08 codes for the Opportunity Card (Chancenkarte) and EU Blue Card." },
        { name: "keywords", content: "germany shortage occupation list, mangelberufe 2024, chancenkarte shortage occupation, opportunity card shortage list, eu blue card shortage occupation, isco 08 germany" },
        { property: "og:title", content: "Germany Shortage Occupation List 2025 — Mangelberufe Search" },
        { property: "og:description", content: "Search the official German shortage occupation list by job title or ISCO code. Free tool by 7 Wings Immigration." },
        { property: "og:url", content: URL_BASE },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Germany Shortage Occupation List — Check Your Job" },
        { name: "twitter:description", content: "Instantly check if your profession is a German shortage occupation for the Opportunity Card and EU Blue Card." },
      ],
      links: [{ rel: "canonical", href: URL_BASE }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
        { type: "application/ld+json", children: JSON.stringify(webLd) },
        { type: "application/ld+json", children: JSON.stringify(crumbsLd) },
      ],
    };
  },
  component: ShortageOccupationsPage,
});

function ShortageOccupationsPage() {
  const [q, setQ] = useState("");
  const [field, setField] = useState("all");
  const dq = useDeferredValue(q);

  const results = useMemo(() => {
    const needle = dq.trim().toLowerCase();
    return JOBS.filter((j) => {
      if (field !== "all" && j.field !== field) return false;
      if (!needle) return true;
      return (
        j.title.toLowerCase().includes(needle) ||
        j.code.includes(needle) ||
        j.groupName.toLowerCase().includes(needle)
      );
    });
  }, [dq, field]);

  const grouped = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of results) {
      const key = `${j.group} — ${j.groupName}`;
      const arr = map.get(key);
      if (arr) arr.push(j);
      else map.set(key, [j]);
    }
    return [...map.entries()];
  }, [results]);

  const waLink = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I want to check if my occupation is on the Germany shortage occupation list.")}`;

  return (
    <PageShell>
      <PageHero
        eyebrow="Germany Immigration Tool"
        title="Germany Shortage Occupation List 2025"
        subtitle="Check instantly whether your profession is a German shortage occupation (Mangelberuf) for the Opportunity Card and EU Blue Card."
      />

      {/* Intro / CTA strip */}
      <section className="bg-cream/40 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="mb-4 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services/$slug" params={{ slug: "germany-opportunity-card" }} className="hover:text-foreground">Germany</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shortage Occupation List</span>
          </nav>
          <p className="text-base text-foreground/80 md:text-lg">
            Search the official list of shortage occupations under Section 18g (1) (2) (1) of the German Residence Act (AufenthG), based on the ISCO-08 classification. If your occupation is listed, you gain an extra point on the Chancenkarte and a lower salary threshold for the EU Blue Card.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#search" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
              <Search className="h-4 w-4" /> Check shortage occupation
            </a>
            <Link
              to="/eligibility/germany/opportunity-card-calculator"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold hover:bg-accent"
            >
              Opportunity Card points calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search occupation, ISCO code or keyword…"
              aria-label="Search shortage occupations"
              className="w-full rounded-2xl border border-black/10 bg-white py-4 pl-12 pr-12 text-base shadow-sm outline-none placeholder:text-black/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setField("all")}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${field === "all" ? "border-gold bg-gold/15 text-navy-deep" : "border-black/10 bg-white hover:border-gold"}`}
            >
              All fields
            </button>
            {FIELDS.map((f) => (
              <button
                key={f}
                onClick={() => setField(f)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${field === f ? "border-gold bg-gold/15 text-navy-deep" : "border-black/10 bg-white hover:border-gold"}`}
              >
                {f}
              </button>
            ))}
            <span className="ml-1 text-sm text-muted-foreground">{results.length} occupations</span>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="bg-cream/40 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-xl font-semibold md:text-2xl">Most searched shortage occupations</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {POPULAR.map((code) => {
              const hit = JOBS.find((j) => j.code === code);
              if (!hit) return null;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setField("all");
                    setQ(hit.title);
                  }}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold transition hover:border-gold hover:shadow-sm"
                >
                  {hit.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {dq.trim() || field !== "all" ? "Search results" : "Full shortage occupation list"}
            </h2>
            <p className="text-xs text-muted-foreground">{results.length} of {JOBS.length} occupations</p>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/10 bg-white p-10 text-center">
              <p className="font-semibold">Your occupation is not on the shortage list</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a broader keyword or clear the filters. You can still qualify for the Opportunity Card without a shortage occupation —{" "}
                <Link to="/book-consultation" className="font-semibold underline">talk to our team</Link>.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {grouped.map(([groupLabel, jobs]) => (
                <div key={groupLabel} className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-cream/60 px-4 py-3">
                    <h3 className="text-sm font-semibold text-navy-deep">{groupLabel}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${FIELD_BADGE[jobs[0].field] ?? "bg-slate-100 text-slate-800"}`}>
                      {jobs[0].field}
                    </span>
                  </div>
                  <table className="w-full text-sm">
                    <tbody>
                      {jobs.map((j) => (
                        <tr key={j.code} className="border-t border-black/5">
                          <td className="w-24 px-4 py-3 font-mono font-semibold">{j.code}</td>
                          <td className="px-4 py-3">{j.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EXPLAINER */}
      <section className="bg-cream/40 py-12">
        <div className="mx-auto max-w-5xl space-y-8 px-6">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">What is a German shortage occupation?</h2>
            <p className="mt-3 text-foreground/80">
              A shortage occupation (Mangelberuf) is a profession where Germany cannot fill vacancies with local or EU workers. The Federal Government publishes the list under Section 18g of the Residence Act using the international ISCO-08 occupation codes. Engineering, IT, healthcare, teaching and skilled management roles dominate the current list.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">Why it matters for your visa</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
              <li><strong>Opportunity Card (Chancenkarte):</strong> a shortage occupation adds +1 point to your score.</li>
              <li><strong>EU Blue Card:</strong> shortage occupations qualify for the reduced salary threshold.</li>
              <li><strong>Faster processing:</strong> priority handling under the accelerated skilled worker procedure.</li>
              <li><strong>Stronger job search:</strong> German employers actively recruit from these occupation groups.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">How to use this list</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-foreground/80">
              <li>Search your job title or ISCO code above.</li>
              <li>Read the unit group name and confirm your real duties match it.</li>
              <li>Check your total Chancenkarte score with our points calculator.</li>
              <li>Get your degree comparison (ANABIN/ZAB) and, for regulated jobs, formal recognition.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* MID BANNER */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl bg-hero p-8 text-center text-white shadow-lg md:p-12">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Is your profession in demand in Germany?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-white/85">
              Our Germany team will confirm your ISCO match, calculate your Opportunity Card points, and plan your move.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-gold-soft"
              >
                Check Eligibility
              </Link>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HELPFUL LINKS */}
      <section className="bg-cream/40 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-xl font-semibold">Helpful links</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/services/$slug" params={{ slug: "germany-opportunity-card" }} className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <Briefcase className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Germany Opportunity Card service</p>
            </Link>
            <Link to="/eligibility/germany/opportunity-card-calculator" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <GraduationCap className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Chancenkarte points calculator</p>
            </Link>
            <Link to="/services/$slug" params={{ slug: "jss-program" }} className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <Briefcase className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">JSS job-search program</p>
            </Link>
            <Link to="/contact" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <MessageCircle className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Free assessment</p>
            </Link>
            <a href="https://www.make-it-in-germany.com/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <ExternalLink className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Make it in Germany (official)</p>
            </a>
            <a href="https://anabin.kmk.org/anabin.html" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <ExternalLink className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">ANABIN degree database</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold">
                  {question}
                  <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-foreground/80">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-10 md:py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <RelatedLinks
            title="Plan your Germany move"
            intro="Combine the shortage list with your points score and the right service."
            links={[
              { to: "/eligibility/germany/opportunity-card-calculator", label: "Germany Opportunity Card points calculator", description: "Score your Chancenkarte eligibility in 60 seconds." },
              { to: "/services/germany-opportunity-card", label: "Germany Opportunity Card service", description: "End-to-end support from documents to landing." },
              { to: "/services/jss-program", label: "JSS Program", description: "Job-search support for German employers." },
              { to: "/book-consultation", label: "Book a free consultation", description: "Talk to our Germany immigration team." },
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
