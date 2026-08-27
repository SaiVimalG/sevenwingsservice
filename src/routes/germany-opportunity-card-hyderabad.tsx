import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone, Mail } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { BlogContactForm } from "@/components/forms/Forms";
import { RelatedLinks, InternalLink } from "@/components/RelatedLinks";
import { SITE, BRANCHES } from "@/lib/site";

const URL = "https://www.7wingsimmigration.com/germany-opportunity-card-hyderabad";
const TITLE =
  "Germany Opportunity Card Consultants in Hyderabad | 7 Wings Immigration";
const DESC =
  "Germany Opportunity Card (Chancenkarte) consultants in Hyderabad — free points check, ANABIN/ZAB recognition, blocked account and visa filing. Offices in HITEC City & Essen, Germany.";

const FAQS = [
  {
    q: "Who can help me apply for the Germany Opportunity Card in Hyderabad?",
    a: "7 Wings Immigration works with Germany-bound applicants from our HITEC City (Madhapur) office in Hyderabad, and we also have a branch in Essen, Germany. We handle the points assessment, ANABIN/ZAB recognition, document attestation, blocked account setup and the embassy filing.",
  },
  {
    q: "How many points do I need for the Chancenkarte?",
    a: "You need either a fully recognised qualification, or a recognised vocational/academic qualification plus at least 6 points across age, language, work experience, previous stay in Germany and a qualifying spouse.",
  },
  {
    q: "Where is the visa application submitted from Hyderabad?",
    a: "Applicants in Telangana normally book biometrics through the German Mission's outsourced visa partner. We prepare the full file, checklist and appointment strategy before you submit.",
  },
  {
    q: "How much money do I need to show?",
    a: "Around EUR 1,027 per month for the planned stay, usually through a blocked account (Sperrkonto) or a formal obligation declaration from a sponsor in Germany.",
  },
  {
    q: "Do I need German language for the Opportunity Card?",
    a: "The minimum is A1 German or B2 English. Higher German levels (B1, B2, C1) add points and dramatically improve your chances of landing a job once you are in Germany.",
  },
  {
    q: "How long does the process take from Hyderabad?",
    a: "Document preparation and ZAB/ANABIN recognition usually take a few weeks, and German missions typically decide Chancenkarte applications within about 1–3 months of biometrics.",
  },
  {
    q: "Can IT professionals from Hyderabad apply without a job offer?",
    a: "Yes — that is the point of the Chancenkarte. It lets qualified professionals enter Germany for up to 12 months to search for skilled work, with part-time work up to 20 hours a week allowed while you search.",
  },
];

const STEPS = [
  { t: "Free points check", d: "We score your profile against the official BAMF criteria in one sitting and tell you honestly whether you clear the 6-point threshold." },
  { t: "Qualification recognition", d: "ANABIN lookup for your university and degree, and a ZAB Statement of Comparability where auto-equivalence is not available." },
  { t: "Documents & attestation", d: "Degree certificates, transcripts, experience letters, translations and attestation prepared to German mission standards." },
  { t: "Funds & insurance", d: "Blocked account (Sperrkonto) opening guidance and travel/health insurance that meets German requirements." },
  { t: "Filing & biometrics", d: "Application form, cover letter, points self-assessment and appointment support for your submission." },
  { t: "Landing support", d: "Our Essen, Germany branch helps with city choice, job-search strategy, Anmeldung and next-step permits once you arrive." },
];

export const Route = createFileRoute("/germany-opportunity-card-hyderabad")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "7 Wings Immigration — Germany Opportunity Card Consultants, Hyderabad",
          url: URL,
          telephone: SITE.phone,
          email: SITE.email,
          image: "https://www.7wingsimmigration.com/favicon.ico",
          address: {
            "@type": "PostalAddress",
            streetAddress: "308, 3rd Floor, Jain Sadguru Capital Park, Silicon Valley, Madhapur, HITEC City",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500081",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 17.4340529, longitude: 78.405003 },
          areaServed: ["Hyderabad", "Secunderabad", "Telangana", "Andhra Pradesh", "India"],
          makesOffer: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Germany Opportunity Card (Chancenkarte) visa consulting",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.7wingsimmigration.com/" },
            { "@type": "ListItem", position: 2, name: "Germany Opportunity Card in Hyderabad", item: URL },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  const hyd = BRANCHES.find((b) => b.id === "hyderabad")!;
  return (
    <PageShell>
      <PageHero
        eyebrow="Hyderabad · Germany Desk"
        title="Germany Opportunity Card (Chancenkarte) Consultants in Hyderabad"
        subtitle="Free points assessment, ANABIN/ZAB recognition and end-to-end Chancenkarte filing — from our HITEC City office, backed by our own branch in Essen, Germany."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-xl font-bold text-navy-deep md:text-2xl">
                Moving to Germany from Hyderabad — without a job offer
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Germany's Opportunity Card (Chancenkarte), introduced in June 2024 under §20a of the Residence Act,
                lets qualified non-EU professionals live in Germany for up to 12 months to look for skilled work —
                before they have an offer in hand. For Hyderabad's IT engineers, mechanical and civil engineers,
                nurses, doctors and skilled tradespeople, it is currently the most realistic route into the German
                labour market. You need a recognised qualification (or two years of qualified vocational training)
                plus at least 6 points across age, language, experience, prior Germany stay and spouse eligibility.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Start with our free{" "}
                <InternalLink to="/eligibility/germany/opportunity-card-calculator">
                  Germany Opportunity Card points calculator
                </InternalLink>
                , then walk into our Madhapur office with the result and we'll build the file around it.
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 font-display text-xl font-bold text-navy-deep md:text-2xl">
                What we do for you in Hyderabad
              </h2>
              <ol className="mt-4 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-deep text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-navy-deep">{s.t}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 font-display text-xl font-bold text-navy-deep md:text-2xl">
                Chancenkarte requirements at a glance
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Recognised degree or 2+ years vocational qualification",
                  "Minimum 6 points (or full recognition)",
                  "German A1 or English B2 as the language floor",
                  "Approx. €1,027/month proof of funds",
                  "German-recognised health insurance",
                  "€75 visa application fee",
                  "Stay up to 12 months to job hunt",
                  "Part-time work up to 20 hours per week",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-10 font-display text-xl font-bold text-navy-deep md:text-2xl">
                Frequently asked questions
              </h2>
              <div className="mt-4 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
                {FAQS.map((f) => (
                  <details key={f.q} className="group p-4">
                    <summary className="cursor-pointer list-none font-semibold text-navy-deep">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <RelatedLinks
                className="mt-10"
                title="Continue your Germany research"
                links={[
                  { to: "/eligibility/germany/opportunity-card-calculator", label: "Opportunity Card points calculator", description: "Score your profile in under two minutes." },
                  { to: "/services/germany-opportunity-card", label: "Germany Opportunity Card service", description: "Full scope of what our Germany desk handles." },
                  { to: "/book-consultation", label: "Book a free consultation", description: "30 minutes with a senior counsellor." },
                  { to: "/contact", label: "Visit our Hyderabad office", description: "HITEC City, Madhapur — map and directions." },
                ]}
              />
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-elegant">
                <h2 className="font-display text-lg font-bold text-navy-deep">Talk to our Germany desk</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send your details and we'll come back with your points score.
                </p>
                <div className="mt-4">
                  <BlogContactForm />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-black/5 bg-cream/40 p-6">
                <h2 className="font-display text-lg font-bold text-navy-deep">Our Hyderabad office</h2>
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                  <span>{hyd.address}</span>
                </p>
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                  <a className="hover:text-navy-deep" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
                </p>
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                  <a className="hover:text-navy-deep" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
                <a
                  href={hyd.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-deep underline decoration-gold/40 underline-offset-4"
                >
                  Get directions <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <p className="mt-4 text-xs text-muted-foreground">
                  Germany branch: {BRANCHES.find((b) => b.id === "germany")!.address}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <Link
                to="/eligibility/germany/opportunity-card-calculator"
                className="flex items-center justify-between rounded-3xl bg-navy-deep p-6 text-white shadow-elegant"
              >
                <span className="font-display text-base font-bold">Check your points free</span>
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
