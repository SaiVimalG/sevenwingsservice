import type { CalculatorConfig } from "../types";

const AU_RELATED = [
  { label: "Subclass 189 – Independent", href: "/eligibility/australia/189-points-calculator" },
  { label: "Subclass 190 – State Nominated", href: "/eligibility/australia/190-points-calculator" },
  { label: "Subclass 491 – Regional", href: "/eligibility/australia/491-points-calculator" },
];

const AU_FIELDS_BASE = (visaBase: { partnerWithEnglish: number; partnerSkilled: number }) => [
  {
    key: "age",
    label: "What is your age at the time of invitation?",
    category: "Age",
    tooltip: "Age points peak between 25–32 and reduce after 40.",
    options: [
      { label: "18 – 24", value: "18-24", points: 25 },
      { label: "25 – 32", value: "25-32", points: 30 },
      { label: "33 – 39", value: "33-39", points: 25 },
      { label: "40 – 44", value: "40-44", points: 15 },
      { label: "45+", value: "45+", points: 0 },
    ],
  },
  {
    key: "english",
    label: "What is your English language ability?",
    category: "English",
    tooltip: "IELTS 6 = Competent, 7 = Proficient, 8 = Superior. PTE / TOEFL / OET / CAE equivalents apply.",
    options: [
      { label: "Competent English (IELTS 6 / PTE 50)", value: "competent", points: 0 },
      { label: "Proficient English (IELTS 7 / PTE 65)", value: "proficient", points: 10 },
      { label: "Superior English (IELTS 8 / PTE 79)", value: "superior", points: 20 },
    ],
  },
  {
    key: "overseasExp",
    label: "Overseas skilled work experience",
    category: "Overseas Experience",
    options: [
      { label: "Less than 3 years", value: "<3", points: 0 },
      { label: "3 – 4 years", value: "3-4", points: 5 },
      { label: "5 – 7 years", value: "5-7", points: 10 },
      { label: "8+ years", value: "8+", points: 15 },
    ],
  },
  {
    key: "ausExp",
    label: "Australian skilled work experience",
    category: "Australian Experience",
    options: [
      { label: "Less than 1 year", value: "<1", points: 0 },
      { label: "1 – 2 years", value: "1-2", points: 5 },
      { label: "3 – 4 years", value: "3-4", points: 10 },
      { label: "5 – 7 years", value: "5-7", points: 15 },
      { label: "8+ years", value: "8+", points: 20 },
    ],
  },
  {
    key: "edu",
    label: "Highest educational qualification",
    category: "Education",
    options: [
      { label: "Doctorate (PhD) from recognised institution", value: "phd", points: 20 },
      { label: "Bachelor's or Master's degree", value: "bachelor", points: 15 },
      { label: "Diploma / Trade qualification", value: "diploma", points: 10 },
      { label: "Recognised qualification (assessed)", value: "recognised", points: 10 },
      { label: "No recognised qualification", value: "none", points: 0 },
    ],
  },
  {
    key: "auStudy",
    label: "Australian study requirement (2+ years)",
    category: "Australian Study",
    options: [
      { label: "Yes – meets the 2-year study requirement", value: "yes", points: 5 },
      { label: "No", value: "no", points: 0 },
    ],
  },
  {
    key: "stem",
    label: "Specialist STEM Masters or PhD",
    category: "Specialist Education",
    tooltip: "Masters by research or PhD in Science, Technology, Engineering or Mathematics.",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "No", value: "no", points: 0 },
    ],
  },
  {
    key: "naati",
    label: "Accredited community language (NAATI)",
    category: "Community Language",
    options: [
      { label: "Yes", value: "yes", points: 5 },
      { label: "No", value: "no", points: 0 },
    ],
  },
  {
    key: "proYear",
    label: "Professional Year in Australia",
    category: "Professional Year",
    tooltip: "Recognised PY in Accounting, IT or Engineering.",
    options: [
      { label: "Yes", value: "yes", points: 5 },
      { label: "No", value: "no", points: 0 },
    ],
  },
  {
    key: "regionalStudy",
    label: "Study in regional Australia",
    category: "Regional Study",
    options: [
      { label: "Yes", value: "yes", points: 5 },
      { label: "No", value: "no", points: 0 },
    ],
  },
  {
    key: "partner",
    label: "Partner / spouse contribution",
    category: "Partner",
    options: [
      { label: "Single applicant", value: "single", points: 10 },
      { label: "Partner – skilled assessment + competent English", value: "skilled", points: visaBase.partnerSkilled },
      { label: "Partner – competent English only", value: "english", points: visaBase.partnerWithEnglish },
      { label: "Neither", value: "none", points: 0 },
    ],
  },
];

const AU_SECTIONS = (visa: string, base: string) => [
  {
    h2: `What is the Australia ${visa} points calculator?`,
    body:
      `The Australia ${visa} points calculator is a free SkillSelect points tool that helps you estimate your eligibility for Australian permanent residency. ` +
      `Every Skilled Migration applicant must lodge an Expression of Interest (EOI) through SkillSelect, where the Department of Home Affairs ranks candidates by their points score. ` +
      `Only the highest-ranked candidates are invited to apply, so understanding your score is the very first step in the migration process. ` +
      `This calculator mirrors the official points test used by the Department, including age, English, education, overseas and Australian work experience, partner points, state nomination, professional year, STEM qualifications, community language credentials and regional study.`,
  },
  {
    h2: "How Australia PR points are calculated",
    body:
      "The Australian points test is made up of multiple categories. Each factor is scored independently and combined into a single total. The minimum score to be considered is 65 points, but in practice invitations are issued to candidates with much higher totals — particularly for popular occupations.",
    subsections: [
      { h3: "Age", body: "Maximum 30 points awarded to applicants aged 25–32. Points reduce sharply after 40." },
      { h3: "English language", body: "Competent (0), Proficient (10) or Superior (20). IELTS, PTE, TOEFL iBT, OET and CAE are all accepted." },
      { h3: "Overseas work experience", body: "Up to 15 points for skilled employment outside Australia in your nominated or closely related occupation." },
      { h3: "Australian work experience", body: "Up to 20 points for skilled employment in Australia — a major differentiator for onshore applicants." },
      { h3: "Educational qualifications", body: "20 points for a PhD, 15 for a Bachelor's or Master's, 10 for a diploma or recognised trade qualification." },
      { h3: "State or regional nomination", body: "+5 for Subclass 190 (state nominated), +15 for Subclass 491 (regional). 189 is independent and receives no nomination bonus." },
      { h3: "Partner points", body: "10 points for a single applicant, 10 for a partner with a positive skills assessment and competent English, 5 for a partner with competent English only." },
      { h3: "Professional Year", body: "+5 points for completing a Professional Year Program in Australia (IT, Engineering, Accounting)." },
      { h3: "Community language (NAATI)", body: "+5 points for a NAATI-accredited credential in a community language." },
      { h3: "Specialist STEM qualification", body: "+10 points for a Masters by Research or PhD in a STEM field from an Australian institution." },
      { h3: "Regional study", body: "+5 points for completing eligible study in regional Australia." },
    ],
  },
  {
    h2: `How to improve your Australia ${visa} score`,
    bullets: [
      "Sit a higher-band English test — moving from IELTS 6 to 7 adds 10 points instantly.",
      "Pursue state or regional nomination to unlock a 5 or 15 point bonus.",
      "Gain additional skilled work experience — overseas and Australian experience both count.",
      "Complete a Professional Year Program in Australia for +5 points.",
      "Obtain a NAATI community language credential for +5 points.",
      "Have your partner's qualifications assessed — partner points can add up to 10 points.",
      "Consider regional study for +5 points and a 491 nomination pathway.",
    ],
  },
  { h2: `Starting points for ${visa}`, body: base },
];

const AU_COMPARISON = {
  title: "Subclass 189 vs 190 vs 491 — at a glance",
  table: {
    headers: ["Feature", "Subclass 189", "Subclass 190", "Subclass 491"],
    rows: [
      ["Visa type", "Independent PR", "State nominated PR", "Regional provisional (5 yr)"],
      ["Nomination required", "No", "Yes – state/territory", "Yes – state or family"],
      ["Bonus points", "0", "+5", "+15"],
      ["Live & work", "Anywhere in Australia", "Sponsoring state for 2 years", "Designated regional area"],
      ["PR pathway", "PR on grant", "PR on grant", "PR via Subclass 191 after 3 yrs"],
      ["Family inclusion", "Yes", "Yes", "Yes"],
      ["Best for", "Top-ranked applicants", "Targeted occupations", "Regional workers"],
    ],
  },
};

const AU_FAQS_COMMON = [
  { q: "What is the minimum score for Australia PR?", a: "The minimum pass mark is 65 points. However, most invitations in 2024–2026 are issued to candidates with 75–95 points." },
  { q: "Can I apply with 65 points?", a: "You can submit an Expression of Interest with 65 points, but invitations are rare at that score for most occupations. Aim for 80+ points to be competitive." },
  { q: "How many points does the 190 visa add?", a: "Subclass 190 state nomination adds 5 points to your total." },
  { q: "How many points does the 491 visa add?", a: "Subclass 491 regional nomination adds 15 points — the highest nomination bonus available." },
  { q: "Can partner points increase my score?", a: "Yes. A skilled partner adds up to 10 points, a partner with competent English adds 5 points, and single applicants automatically receive 10 points." },
  { q: "What English score is required?", a: "Minimum is Competent English (IELTS 6 in each band). Proficient (IELTS 7) adds 10 points and Superior (IELTS 8) adds 20." },
  { q: "How often are invitations issued?", a: "SkillSelect invitation rounds are typically held monthly, with results published on the Department of Home Affairs website." },
  { q: "Do I need a positive skills assessment?", a: "Yes. Every Skilled Migration applicant must hold a positive skills assessment from the relevant assessing authority for their nominated occupation before an invitation can be issued." },
  { q: "Does my occupation need to be on a skilled list?", a: "Yes. Your occupation must appear on the relevant Skilled Occupation List (MLTSSL, STSOL or ROL) at the time of invitation." },
  { q: "Can I claim points for both overseas and Australian work experience?", a: "Yes — they are scored separately, and you can claim up to 35 combined points from both categories." },
  { q: "What is a Professional Year Program?", a: "A 44-week training program for international graduates in IT, Engineering or Accounting. It is worth +5 points on the points test." },
  { q: "How long does the migration process take?", a: "From skills assessment to visa grant, the process typically takes 9–18 months depending on occupation, nomination type and Home Affairs processing times." },
  { q: "Is the points calculator result official?", a: "No. This calculator provides an estimate based on publicly published criteria. Final eligibility is determined by the Department of Home Affairs." },
  { q: "Can my partner be the primary applicant?", a: "Yes. If your partner has stronger points, they can be the primary applicant and you become a secondary applicant." },
  { q: "What happens after I am invited?", a: "You have 60 days from invitation to lodge a complete visa application with all supporting documents — medicals, character checks, evidence of claims, and the visa fee." },
];

function makeAU(opts: {
  subclass: "189" | "190" | "491";
  url: string;
  title: string;
  description: string;
  h1: string;
  badge: string;
  base: number;
  baseLabel: string;
  partnerSkilled: number;
  partnerWithEnglish: number;
  description2: string;
}): CalculatorConfig {
  return {
    url: opts.url,
    country: "Australia",
    countryFlag: "🇦🇺",
    badge: opts.badge,
    seoTitle: opts.title,
    metaDescription: opts.description,
    h1: opts.h1,
    subheading:
      `Check your eligibility for Australian Permanent Residency under Subclass ${opts.subclass} and calculate your SkillSelect points instantly using our advanced migration assessment platform.`,
    trustChips: [
      "Skilled Migration Experts",
      "Australia PR Specialists",
      "Real-Time Points Calculation",
      "Secure Assessment Platform",
    ],
    basePoints: opts.base,
    basePointsLabel: opts.baseLabel,
    maxPoints: 130,
    passingThreshold: 65,
    competitiveThreshold: 80,
    highlyCompetitiveThreshold: 95,
    scoreUnit: "Points",
    fields: AU_FIELDS_BASE({ partnerSkilled: opts.partnerSkilled, partnerWithEnglish: opts.partnerWithEnglish }),
    recommendations: {
      ifBelow: 80,
      tips: [
        "Re-sit IELTS / PTE to reach Proficient (IELTS 7) — instant +10 points.",
        "Pursue state nomination through the 190 or 491 pathway.",
        "Complete a Professional Year in Australia (+5 points).",
        "Have your partner's skills and English assessed (+5 to +10).",
        "Apply for NAATI Community Language credential (+5 points).",
        "Consider regional study or work for +15 nomination bonus.",
      ],
    },
    sections: AU_SECTIONS(`Subclass ${opts.subclass}`, opts.description2),
    comparison: AU_COMPARISON,
    faqs: AU_FAQS_COMMON,
    relatedCalculators: AU_RELATED.filter((r) => !r.href.includes(`${opts.subclass}-points`)),
  };
}

export const au189: CalculatorConfig = makeAU({
  subclass: "189",
  url: "/eligibility/australia/189-points-calculator",
  title: "Australia 189 Visa Points Calculator 2026 | Free SkillSelect Calculator",
  description:
    "Calculate your Australia Subclass 189 visa points instantly with our free Australia PR points calculator. Check your eligibility, age points, English score points, work experience points and migration score online.",
  h1: "Free Australia Subclass 189 Visa Points Calculator",
  badge: "Australia Immigration Assessment",
  base: 0,
  baseLabel: "Subclass 189 — Independent Skilled Visa",
  partnerSkilled: 10,
  partnerWithEnglish: 5,
  description2:
    "Subclass 189 is an independent visa with no nomination requirement, so the starting score is 0. Every point you earn from age, English, education, work experience and partner contribution is added directly to your total.",
});

export const au190: CalculatorConfig = makeAU({
  subclass: "190",
  url: "/eligibility/australia/190-points-calculator",
  title: "Australia 190 Visa Points Calculator 2026 | Free PR Eligibility Check",
  description:
    "Calculate your Australia Subclass 190 visa points online. Check state nomination points, eligibility score, work experience points, education points and migration eligibility instantly.",
  h1: "Free Australia Subclass 190 Visa Points Calculator",
  badge: "Australia State Nomination Assessment",
  base: 5,
  baseLabel: "Subclass 190 — State Nomination Bonus (+5)",
  partnerSkilled: 10,
  partnerWithEnglish: 5,
  description2:
    "Subclass 190 applicants automatically receive +5 points from state or territory nomination. Your starting score is 5 before any other category is calculated.",
});

export const au491: CalculatorConfig = makeAU({
  subclass: "491",
  url: "/eligibility/australia/491-points-calculator",
  title: "Australia 491 Visa Points Calculator 2026 | Regional Visa Eligibility",
  description:
    "Check your Australia Subclass 491 visa points using our free calculator. Calculate regional nomination points and determine your migration eligibility instantly.",
  h1: "Free Australia Subclass 491 Visa Points Calculator",
  badge: "Australia Regional Visa Assessment",
  base: 15,
  baseLabel: "Subclass 491 — Regional Nomination Bonus (+15)",
  partnerSkilled: 10,
  partnerWithEnglish: 5,
  description2:
    "Subclass 491 carries the largest nomination bonus on the points test — +15 points for regional state or family sponsorship. Your starting score is 15.",
});
