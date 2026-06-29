import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Search,
  X,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Phone,
  MessageCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { SITE } from "@/lib/site";
import nocData from "@/data/noc-2021.json";

type Noc = {
  code: string;
  title: string;
  definition: string;
  teer: number;
  broad: string;
  broadName: string;
};

const NOC = nocData as Noc[];
const URL_BASE = "https://www.7wingsimmigration.com/canada/noc-finder";

const TEER_LABELS: Record<number, string> = {
  0: "TEER 0 — Management",
  1: "TEER 1 — University degree",
  2: "TEER 2 — College / 2+ yr apprenticeship",
  3: "TEER 3 — College / <2 yr apprenticeship",
  4: "TEER 4 — High school + on-the-job",
  5: "TEER 5 — Short-term / no formal education",
};

const TEER_SHORT: Record<number, string> = {
  0: "Management",
  1: "University degree",
  2: "College / Apprenticeship 2y+",
  3: "College / Apprenticeship <2y",
  4: "High school",
  5: "Short-term training",
};

const CATEGORIES: { code: string; name: string }[] = [
  { code: "0", name: "Legislative & Senior Management" },
  { code: "1", name: "Business, Finance & Admin" },
  { code: "2", name: "Natural & Applied Sciences" },
  { code: "3", name: "Health" },
  { code: "4", name: "Education, Law, Social & Gov" },
  { code: "5", name: "Art, Culture, Recreation & Sport" },
  { code: "6", name: "Sales & Service" },
  { code: "7", name: "Trades & Transport" },
  { code: "8", name: "Natural Resources & Agriculture" },
  { code: "9", name: "Manufacturing & Utilities" },
];

const POPULAR = [
  "Software engineers and designers",
  "Registered nurses",
  "Civil engineers",
  "Financial auditors and accountants",
  "Cooks",
  "Electricians",
  "Welders",
  "Transport truck drivers",
  "Mechanical engineers",
  "Elementary school and kindergarten teachers",
];

const FAQS: [string, string][] = [
  ["What is a Canada NOC Code?", "NOC (National Occupational Classification) is Canada's official taxonomy of occupations. Each 5-digit code identifies a specific occupation along with its duties and requirements, and IRCC uses it to assess immigration applications."],
  ["How do I find my NOC Code?", "Search by your job title, related keywords, or the 5-digit code in the search box above. Match your real duties against the official definition before selecting a code."],
  ["What is TEER?", "TEER (Training, Education, Experience, Responsibilities) is the 6-level system that replaced the old Skill Type. TEER 0–3 jobs typically qualify for Express Entry; TEER 4 and 5 have limited pathways."],
  ["Can one job have multiple NOC Codes?", "Job titles often overlap. Pick the NOC whose lead statement and main duties most closely match the work you actually performed."],
  ["Which NOC is eligible for Express Entry?", "Express Entry programs generally require TEER 0, 1, 2, or 3 occupations. Some category-based draws also include specific TEER 4 jobs (e.g., long-haul truck drivers)."],
  ["How do I choose the correct occupation?", "Compare your actual duties — not the title — to the NOC's lead statement and main duties. Your reference letters must reflect those duties."],
  ["What happens if I select the wrong NOC?", "An incorrect NOC can lead to a refusal for misrepresentation. Always verify with a licensed consultant."],
  ["Does IRCC verify work duties?", "Yes. IRCC compares your reference letters, contracts, and pay records against the NOC's lead statement and main duties."],
  ["How is NOC used in Canada PR?", "It determines program eligibility, CRS skill-transferability points, PNP streams, and LMIA requirements."],
  ["Is NOC 2021 different from NOC 2016?", "Yes. NOC 2021 uses 5-digit codes and the new TEER system. IRCC moved to NOC 2021 on 16 November 2022."],
  ["What is a Unit Group in NOC?", "The Unit Group is the 5-digit, most specific level of NOC — that's the one you submit to IRCC."],
  ["Do students need a NOC?", "International students need a NOC for PGWP-related work and when applying for PR under CEC after graduation."],
  ["Is NOC required for a work permit?", "Yes — LMIA-based and many LMIA-exempt work permits require a NOC to determine wage and duties."],
  ["Can self-employment use a NOC?", "Yes, the Self-employed Persons Program uses NOC for cultural, athletic, and farm management occupations."],
  ["Do PNPs use NOC differently?", "Each PNP has its own in-demand occupation list mapped to specific NOC codes and TEER levels."],
  ["What if my occupation is not listed?", "Search using related keywords and pick the closest unit group based on duties. Speak to a consultant if uncertain."],
  ["Do I need experience in a single NOC?", "Express Entry programs require continuous experience in one primary NOC, though related NOCs can support skill transferability."],
  ["Does part-time work count?", "Yes — IRCC converts part-time hours into full-time equivalents (1,560 hours = 1 year)."],
  ["Can I update my NOC after submission?", "Only before a final decision and only with a formal explanation and supporting documents."],
  ["How often is NOC updated?", "Statistics Canada and ESDC review the NOC every five years. NOC 2021 V1.0 is the current version IRCC uses."],
];

export const Route = createFileRoute("/canada/noc-finder")({
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
      name: "Canada NOC Finder",
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
        { "@type": "ListItem", position: 2, name: "Canada", item: "https://www.7wingsimmigration.com/services/canada-immigration" },
        { "@type": "ListItem", position: 3, name: "NOC Finder", item: URL_BASE },
      ],
    };
    return {
      meta: [
        { title: "Canada NOC Code 2025 — Find Your NOC & TEER (Free Search)" },
        { name: "description", content: "Find your Canada NOC code & TEER level free. Search 500+ NOC 2021 occupations by job title or 5-digit code for Express Entry, PNP, work permit & Canada PR." },
        { name: "keywords", content: "canada noc code, noc code canada, canada noc 2021, noc code finder, teer category canada, noc code for express entry, find noc code canada, ircc noc code" },
        { property: "og:title", content: "Canada NOC Code Finder 2025 — NOC 2021 & TEER Search" },
        { property: "og:description", content: "Search 500+ Canada NOC 2021 codes. Find your NOC, TEER level & PR pathway in seconds — free tool by 7 Wings Immigration." },
        { property: "og:url", content: URL_BASE },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Canada NOC Code Finder 2025 | NOC 2021 + TEER" },
        { name: "twitter:description", content: "Instantly find your Canada NOC code, TEER level & PR pathway. Free NOC 2021 search tool." },
      ],
      links: [{ rel: "canonical", href: URL_BASE }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
        { type: "application/ld+json", children: JSON.stringify(webLd) },
        { type: "application/ld+json", children: JSON.stringify(crumbsLd) },
      ],
    };
  },
  component: NocFinderPage,
});

const teerBadge = (t: number) => {
  const map: Record<number, string> = {
    0: "bg-purple-100 text-purple-800",
    1: "bg-blue-100 text-blue-800",
    2: "bg-emerald-100 text-emerald-800",
    3: "bg-teal-100 text-teal-800",
    4: "bg-amber-100 text-amber-800",
    5: "bg-rose-100 text-rose-800",
  };
  return map[t] ?? "bg-slate-100 text-slate-800";
};

function NocFinderPage() {
  const [q, setQ] = useState("");
  const [teer, setTeer] = useState("all");
  const [broad, setBroad] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const [selected, setSelected] = useState<Noc | null>(null);
  const dq = useDeferredValue(q);

  const results = useMemo(() => {
    const needle = dq.trim().toLowerCase();
    const filtered = NOC.filter((n) => {
      if (teer !== "all" && String(n.teer) !== teer) return false;
      if (broad !== "all" && n.broad !== broad) return false;
      if (!needle) return true;
      return (
        n.title.toLowerCase().includes(needle) ||
        n.code.includes(needle) ||
        n.definition.toLowerCase().includes(needle)
      );
    });
    return [...filtered].sort((a, b) => a.code.localeCompare(b.code));
  }, [dq, teer, broad]);

  useEffect(() => setPage(1), [dq, teer, broad]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageRows = results.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const waLink = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I need help finding the right Canada NOC code for my profile.")}`;

  return (
    <PageShell>
      <PageHero
        eyebrow="Canada Immigration Tool"
        title="Canada NOC Code Finder 2025"
        subtitle="Find your Canada NOC Code and TEER category in seconds. Free NOC 2021 search tool for Express Entry, PNP, LMIA and Canada PR applicants."
      />

      {/* Intro / CTA strip */}
      <section className="bg-cream/40 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <nav className="mb-4 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services/$slug" params={{ slug: "canada-immigration" }} className="hover:text-foreground">Canada</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">NOC Finder</span>
          </nav>
          <p className="text-base text-foreground/80 md:text-lg">
            Search 500+ official NOC 2021 occupations by job title, keyword or 5-digit code — get the right NOC Code, TEER level, lead statement and immigration pathway instantly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#search" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
              <Search className="h-4 w-4" /> Search NOC Code
            </a>
            <Link
              to="/eligibility/canada/crs-calculator"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold hover:bg-accent"
            >
              Check Canada PR Eligibility <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Intro */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl space-y-10 px-6">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">What is the Canada National Occupation Classification (NOC)?</h2>
            <p className="mt-3 text-foreground/80">
              The National Occupational Classification (NOC) is Canada's standardized framework organizing the labour market into roughly 500 occupations grouped by skill type and required training. IRCC uses NOC codes to evaluate every Canada PR, work permit, and post-graduation application — your code defines whether you qualify, which program fits, and how many CRS points you earn.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">How to find your NOC code</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-foreground/80">
              <li>Type your real job title, keyword, or 5-digit code into the search box below.</li>
              <li>Compare your day-to-day duties against the lead statement and main duties of each result.</li>
              <li>Note the 5-digit NOC code and TEER category — that's what you submit to IRCC.</li>
              <li>Confirm your work-experience letters describe the same duties listed in the NOC.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">What is TEER?</h3>
            <p className="mt-3 text-foreground/80">
              TEER (Training, Education, Experience, Responsibilities) replaced the older Skill Level system in November 2022. Each NOC code belongs to one of six TEER categories:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((t) => (
                <div key={t} className={`rounded-lg border border-black/5 p-4 ${teerBadge(t)}`}>
                  <div className="text-sm font-semibold">TEER {t}</div>
                  <div className="text-xs opacity-80">{TEER_SHORT[t]}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">Why choosing the correct NOC code matters</h3>
            <p className="mt-3 text-foreground/80">
              The right code unlocks the right program: Express Entry (TEER 0–3), Provincial Nominee Programs, LMIA wage tiers, work permit categories, and post-graduation pathways. A wrong NOC can mean a refusal — or worse, a misrepresentation finding.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" className="bg-cream/40 py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search occupation, NOC code or keyword…"
              aria-label="Search occupations"
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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={teer}
              onChange={(e) => setTeer(e.target.value)}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
              aria-label="Filter by TEER"
            >
              <option value="all">All TEER levels</option>
              {[0, 1, 2, 3, 4, 5].map((t) => (
                <option key={t} value={String(t)}>
                  {TEER_LABELS[t]}
                </option>
              ))}
            </select>
            <select
              value={broad}
              onChange={(e) => setBroad(e.target.value)}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground">{results.length} occupations</span>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {dq.trim() || teer !== "all" || broad !== "all" ? "Search results" : "All NOC 2021 occupations"}
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing {results.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, results.length)} of {results.length}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/10 bg-white p-10 text-center">
              <p className="font-semibold">No occupations match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a broader keyword or clear the filters.</p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-cream/60 text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold">TEER</th>
                      <th className="px-4 py-3 font-semibold">NOC Code</th>
                      <th className="px-4 py-3 font-semibold">Class Title</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((n) => (
                      <tr
                        key={n.code}
                        onClick={() => setSelected(n)}
                        className="cursor-pointer border-t border-black/5 transition hover:bg-cream/40"
                      >
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${teerBadge(n.teer)}`}>
                            TEER {n.teer}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold">{n.code}</td>
                        <td className="px-4 py-3">{n.title}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          <ChevronRight className="inline h-4 w-4" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* POPULAR */}
      <section className="bg-cream/40 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Popular occupations</h2>
          <p className="mt-1 text-sm text-muted-foreground">Most-searched Canada NOC codes by Indian applicants.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {POPULAR.map((title) => {
              const key = title.toLowerCase();
              const hit = NOC.find((n) => n.title.toLowerCase().includes(key)) ||
                NOC.find((n) => n.title.toLowerCase().includes(key.split(" ")[0]));
              if (!hit) return null;
              return (
                <button
                  key={title}
                  onClick={() => setSelected(hit)}
                  className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                >
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">NOC {hit.code} · TEER {hit.teer}</p>
                    <p className="mt-0.5 font-semibold">{hit.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-gold" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MID BANNER */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl bg-hero p-8 text-center text-white shadow-lg md:p-12">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Find your Canada immigration pathway</h2>
            <p className="mx-auto mt-2 max-w-2xl text-white/85">
              Not sure which NOC code matches your experience? Speak with a Canada immigration expert at 7 Wings.
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
            <Link to="/services/$slug" params={{ slug: "canada-immigration" }} className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <Briefcase className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Canada PR Services</p>
            </Link>
            <Link to="/eligibility/canada/crs-calculator" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <GraduationCap className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">CRS Calculator</p>
            </Link>
            <Link to="/eligibility/canada/federal-skilled-worker-program" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <Briefcase className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Federal Skilled Worker</p>
            </Link>
            <Link to="/contact" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <MessageCircle className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">Free Assessment</p>
            </Link>
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/find-national-occupation-code.html" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <ExternalLink className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">IRCC NOC reference</p>
            </a>
            <a href="https://noc.esdc.gc.ca/" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-black/10 bg-white p-4 hover:border-gold">
              <ExternalLink className="mb-2 h-5 w-5 text-gold-deep" />
              <p className="font-semibold">ESDC NOC 2021 official site</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-black/10 rounded-xl border border-black/10 bg-white">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold">
                  {q}
                  <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-foreground/80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DRAWER */}
      {selected && <NocDrawer n={selected} onClose={() => setSelected(null)} waLink={waLink} />}
    </PageShell>
  );
}

function NocDrawer({ n, onClose, waLink }: { n: Noc; onClose: () => void; waLink: string }) {
  const related = useMemo(
    () => NOC.filter((x) => x.code !== n.code && x.code.slice(0, 3) === n.code.slice(0, 3)).slice(0, 6),
    [n.code],
  );
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} aria-hidden />
      <aside className="flex w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-black/10 p-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-cream/60 px-2 py-0.5 font-mono text-xs font-semibold">NOC {n.code}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${teerBadge(n.teer)}`}>TEER {n.teer}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold">{n.title}</h3>
            <p className="text-xs text-muted-foreground">{n.broadName}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-black/5">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Lead statement</h4>
            <p className="mt-1 text-sm text-foreground/85">{n.definition}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">TEER {n.teer} — typical requirements</h4>
            <p className="mt-1 text-sm text-foreground/85">{TEER_SHORT[n.teer]}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Suggested immigration programs</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/85">
              {n.teer <= 3 ? (
                <>
                  <li>Express Entry — Federal Skilled Worker / CEC</li>
                  <li>Provincial Nominee Programs (province-specific)</li>
                  <li>LMIA work permit (high-wage stream)</li>
                </>
              ) : (
                <>
                  <li>LMIA work permit (low-wage / agricultural streams)</li>
                  <li>Select PNP streams (e.g., Atlantic Immigration Program)</li>
                  <li>Category-based Express Entry draws (limited)</li>
                </>
              )}
            </ul>
          </div>

          {related.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">Related occupations</h4>
              <div className="mt-2 space-y-2">
                {related.map((r) => (
                  <div key={r.code} className="rounded-lg border border-black/10 p-3 text-sm">
                    <span className="mr-2 font-mono font-semibold">NOC {r.code}</span>
                    <span>{r.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Reference</h4>
            <a
              href={`https://noc.esdc.gc.ca/Structure/NocProfile?objectid=${n.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep hover:underline"
            >
              Official ESDC profile <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-black/10 p-4">
          <Link
            to="/book-consultation"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Check Eligibility
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent"
          >
            Free Consultation
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </aside>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages: number[] = [];
  const add = (p: number) => {
    if (!pages.includes(p)) pages.push(p);
  };
  add(1);
  for (let i = page - 1; i <= page + 1; i++) if (i > 1 && i < totalPages) add(i);
  add(totalPages);
  const withGaps: (number | "…")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - (pages[i - 1] as number) > 1) withGaps.push("…");
    withGaps.push(p);
  });
  const btn = "min-w-9 h-9 px-3 rounded-md border text-sm font-medium transition";
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`${btn} border-black/10 bg-white hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        ← Prev
      </button>
      {withGaps.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            className={`${btn} ${p === page ? "border-gold bg-gold text-navy-deep" : "border-black/10 bg-white hover:bg-black/5"}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`${btn} border-black/10 bg-white hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        Next →
      </button>
    </div>
  );
}
