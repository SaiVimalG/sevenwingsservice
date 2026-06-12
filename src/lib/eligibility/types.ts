export type Option = {
  label: string;
  value: string;
  points: number;
  tip?: string;
};

export type Field = {
  key: string;
  label: string;
  tooltip?: string;
  category: string;
  options: Option[];
  // Optional dynamic scoring (e.g. partner points dependent on visa)
  points?: (value: string, all: Record<string, string>) => number;
};

export type ComparisonTable = {
  headers: string[];
  rows: string[][];
};

export type SeoSection = {
  h2: string;
  body?: string;
  bullets?: string[];
  subsections?: { h3: string; body: string; bullets?: string[] }[];
};

export type FaqItem = { q: string; a: string };

export type CalculatorConfig = {
  url: string; // path beginning with /eligibility/...
  country: string;
  countryFlag: string; // emoji
  countryColor?: string; // tailwind classes for accent
  badge: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  trustChips: string[];
  basePoints?: number;
  basePointsLabel?: string;
  maxPoints: number;
  passingThreshold: number; // minimum eligibility
  competitiveThreshold: number;
  highlyCompetitiveThreshold: number;
  scoreUnit?: string; // "Points" default
  fields: Field[];
  recommendations: { ifBelow: number; tips: string[] };
  sections: SeoSection[];
  comparison?: { title: string; table: ComparisonTable };
  faqs: FaqItem[];
  relatedCalculators?: { label: string; href: string }[];
};
