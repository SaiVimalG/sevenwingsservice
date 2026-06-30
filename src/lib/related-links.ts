import type { RelatedLink } from "@/components/RelatedLinks";

/** Canonical related-link sets keyed by context. Internal links only. */

export const SERVICE_RELATED: Record<string, RelatedLink[]> = {
  "germany-opportunity-card": [
    { to: "/eligibility/germany/opportunity-card-calculator", label: "Germany Opportunity Card points calculator", description: "Score your Chancenkarte eligibility in 60 seconds." },
    { to: "/services/jss-program", label: "JSS Program", description: "Job-search support for Germany roles." },
    { to: "/services/canada-pr", label: "Canada PR pathway", description: "Compare with Express Entry options." },
    { to: "/blog", label: "Latest Germany articles", description: "Visa updates, ZAB recognition and city guides." },
  ],
  "australia-pr": [
    { to: "/eligibility/australia/189-points-calculator", label: "Subclass 189 points calculator" },
    { to: "/eligibility/australia/190-points-calculator", label: "Subclass 190 points calculator" },
    { to: "/eligibility/australia/491-points-calculator", label: "Subclass 491 points calculator" },
    { to: "/services/jss-program", label: "JSS Program for Australia recruiters" },
  ],
  "canada-pr": [
    { to: "/eligibility/canada/crs-calculator", label: "Canada CRS calculator" },
    { to: "/eligibility/canada/federal-skilled-worker-program", label: "Federal Skilled Worker calculator" },
    { to: "/eligibility/canada/saskatchewan-sinp-calculator", label: "Saskatchewan SINP calculator" },
    { to: "/eligibility/canada/quebec-skilled-worker-program", label: "Quebec Skilled Worker calculator" },
    { to: "/canada/noc-finder", label: "Canada NOC 2021 code finder" },
  ],
  "jss-program": [
    { to: "/services/germany-opportunity-card", label: "Germany Opportunity Card" },
    { to: "/services/australia-pr", label: "Australia PR" },
    { to: "/services/canada-pr", label: "Canada PR" },
    { to: "/eligibility", label: "Eligibility calculators hub" },
  ],
};

export const CALCULATOR_RELATED: Record<string, RelatedLink[]> = {
  "/eligibility/canada/crs-calculator": [
    { to: "/services/canada-pr", label: "Canada PR full service" },
    { to: "/eligibility/canada/federal-skilled-worker-program", label: "FSW eligibility" },
    { to: "/eligibility/canada/saskatchewan-sinp-calculator", label: "Saskatchewan SINP" },
    { to: "/canada/noc-finder", label: "Find your Canada NOC code" },
  ],
  "/eligibility/canada/federal-skilled-worker-program": [
    { to: "/services/canada-pr", label: "Canada PR full service" },
    { to: "/eligibility/canada/crs-calculator", label: "CRS calculator" },
    { to: "/canada/noc-finder", label: "NOC 2021 code finder" },
  ],
  "/eligibility/canada/saskatchewan-sinp-calculator": [
    { to: "/services/canada-pr", label: "Canada PR full service" },
    { to: "/eligibility/canada/crs-calculator", label: "CRS calculator" },
    { to: "/canada/noc-finder", label: "NOC 2021 code finder" },
  ],
  "/eligibility/canada/quebec-skilled-worker-program": [
    { to: "/services/canada-pr", label: "Canada PR full service" },
    { to: "/eligibility/canada/crs-calculator", label: "CRS calculator" },
  ],
  "/eligibility/australia/189-points-calculator": [
    { to: "/services/australia-pr", label: "Australia PR service" },
    { to: "/eligibility/australia/190-points-calculator", label: "Subclass 190 calculator" },
    { to: "/eligibility/australia/491-points-calculator", label: "Subclass 491 calculator" },
  ],
  "/eligibility/australia/190-points-calculator": [
    { to: "/services/australia-pr", label: "Australia PR service" },
    { to: "/eligibility/australia/189-points-calculator", label: "Subclass 189 calculator" },
    { to: "/eligibility/australia/491-points-calculator", label: "Subclass 491 calculator" },
  ],
  "/eligibility/australia/491-points-calculator": [
    { to: "/services/australia-pr", label: "Australia PR service" },
    { to: "/eligibility/australia/189-points-calculator", label: "Subclass 189 calculator" },
    { to: "/eligibility/australia/190-points-calculator", label: "Subclass 190 calculator" },
  ],
  "/eligibility/germany/opportunity-card-calculator": [
    { to: "/services/germany-opportunity-card", label: "Germany Opportunity Card service" },
    { to: "/services/jss-program", label: "JSS Program (job search support)" },
  ],
  "/eligibility/uk/skilled-worker-visa-calculator": [
    { to: "/services/jss-program", label: "JSS Program for UK recruiters" },
    { to: "/eligibility", label: "All eligibility calculators" },
  ],
};

/** Country-tagged related links for blog articles. */
export function blogRelatedByCountry(country?: string): RelatedLink[] {
  const c = (country || "").toLowerCase();
  if (c.includes("germany")) {
    return [
      { to: "/services/germany-opportunity-card", label: "Germany Opportunity Card service" },
      { to: "/eligibility/germany/opportunity-card-calculator", label: "Chancenkarte points calculator" },
    ];
  }
  if (c.includes("australia")) {
    return [
      { to: "/services/australia-pr", label: "Australia PR service" },
      { to: "/eligibility/australia/189-points-calculator", label: "Subclass 189 points calculator" },
      { to: "/eligibility/australia/190-points-calculator", label: "Subclass 190 points calculator" },
    ];
  }
  if (c.includes("canada")) {
    return [
      { to: "/services/canada-pr", label: "Canada PR service" },
      { to: "/eligibility/canada/crs-calculator", label: "Canada CRS calculator" },
      { to: "/canada/noc-finder", label: "Canada NOC 2021 code finder" },
    ];
  }
  if (c.includes("uk") || c.includes("britain")) {
    return [
      { to: "/eligibility/uk/skilled-worker-visa-calculator", label: "UK Skilled Worker visa calculator" },
      { to: "/services/jss-program", label: "JSS Program for UK roles" },
    ];
  }
  return [
    { to: "/services", label: "All immigration services" },
    { to: "/eligibility", label: "Eligibility calculators hub" },
    { to: "/book-consultation", label: "Book a free consultation" },
  ];
}

export const NOC_FINDER_RELATED: RelatedLink[] = [
  { to: "/services/canada-pr", label: "Canada PR full service" },
  { to: "/eligibility/canada/crs-calculator", label: "Canada CRS calculator" },
  { to: "/eligibility/canada/federal-skilled-worker-program", label: "Federal Skilled Worker calculator" },
  { to: "/eligibility/canada/saskatchewan-sinp-calculator", label: "Saskatchewan SINP calculator" },
];
