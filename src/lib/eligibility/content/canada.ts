import type { CalculatorConfig } from "../types";

const CA_RELATED = [
  { label: "Federal Skilled Worker (FSWP)", href: "/eligibility/canada/federal-skilled-worker-program" },
  { label: "Express Entry CRS", href: "/eligibility/canada/crs-calculator" },
  { label: "Saskatchewan SINP", href: "/eligibility/canada/saskatchewan-sinp-calculator" },
  { label: "Quebec Skilled Worker (QSWP)", href: "/eligibility/canada/quebec-skilled-worker-program" },
];

const COMMON_CA_FAQS = (program: string): { q: string; a: string }[] => [
  { q: `What is the minimum score for ${program}?`, a: `The minimum threshold for ${program} varies. This calculator estimates based on the latest published criteria — your final eligibility is determined by IRCC.` },
  { q: "Are my IELTS or CELPIP scores accepted?", a: "Yes. IRCC accepts IELTS General, CELPIP-G, TEF Canada and TCF Canada. Scores are mapped to CLB (Canadian Language Benchmark) levels." },
  { q: "Do I need an Educational Credential Assessment (ECA)?", a: "Yes — for any qualification earned outside Canada. WES, ICAS, IQAS and ICES are all designated organisations." },
  { q: "Can my spouse claim points?", a: "Yes, spousal points are awarded for spouse's education, language and Canadian work experience." },
  { q: "Does a job offer help my application?", a: "Yes. A valid arranged employment offer adds significant points and can fast-track invitations." },
  { q: "How long does Express Entry take?", a: "From profile creation to permanent residence, processing typically takes 6–12 months." },
  { q: "Do I need to take a French test?", a: "French is optional for most federal streams but adds bonus points and is mandatory for Quebec programs." },
  { q: "Can I include my dependents?", a: "Yes — spouse and dependent children can be included in the same application." },
  { q: "What is a provincial nomination worth?", a: "A Provincial Nominee Program (PNP) nomination adds 600 CRS points and effectively guarantees an ITA in the next round." },
  { q: "Is the calculator accurate?", a: "It provides an indicative estimate based on publicly available criteria. Always confirm with an authorised immigration consultant or IRCC." },
  { q: "How recent is the data used?", a: "Scoring tiers reflect 2025–2026 IRCC guidance. We update the calculator whenever IRCC publishes changes." },
  { q: "Do I need work experience in Canada?", a: "It is not always mandatory but significantly improves your score in every Canadian program." },
  { q: "Can I improve my score after submitting?", a: "Yes — profiles in the Express Entry pool can be updated at any time with new test results, education credentials or work experience." },
  { q: "What happens after I receive an ITA?", a: "You have 60 days to submit a complete electronic Application for Permanent Residence (eAPR) with all supporting documents." },
  { q: "What occupations are in demand?", a: "Healthcare, STEM, trades, transport and agriculture occupations are prioritised under IRCC's category-based draws." },
];

// ------------------------------------------------------------------ FSWP 100pt
export const caFswp: CalculatorConfig = {
  url: "/eligibility/canada/federal-skilled-worker-program",
  country: "Canada",
  countryFlag: "🇨🇦",
  badge: "Canada Federal Skilled Worker Assessment",
  seoTitle: "Canada FSWP Points Calculator 2026 | Federal Skilled Worker Eligibility",
  metaDescription:
    "Free Canada Federal Skilled Worker Program (FSWP) points calculator. Check your eligibility under the 100-point grid for age, education, language, work experience, adaptability and arranged employment instantly.",
  h1: "Free Canada Federal Skilled Worker Program (FSWP) Calculator",
  subheading:
    "Check your eligibility under the FSWP 100-point grid — the first qualifying test for entering Canada's Express Entry pool.",
  trustChips: ["IRCC-aligned criteria", "Express Entry experts", "Real-time scoring", "Confidential & free"],
  maxPoints: 100,
  passingThreshold: 67,
  competitiveThreshold: 75,
  highlyCompetitiveThreshold: 85,
  scoreUnit: "Points",
  fields: [
    {
      key: "age", label: "Age", category: "Age",
      options: [
        { label: "18–35", value: "18-35", points: 12 },
        { label: "36–40", value: "36-40", points: 8 },
        { label: "41–45", value: "41-45", points: 4 },
        { label: "46+", value: "46+", points: 0 },
      ],
    },
    {
      key: "edu", label: "Education (ECA equivalent)", category: "Education",
      options: [
        { label: "Doctoral (PhD)", value: "phd", points: 25 },
        { label: "Master's / Professional", value: "ma", points: 23 },
        { label: "Two or more credentials, one 3+ yr", value: "two", points: 22 },
        { label: "Bachelor's (3+ yr)", value: "ba", points: 21 },
        { label: "2-year post-secondary", value: "2y", points: 19 },
        { label: "1-year post-secondary", value: "1y", points: 15 },
        { label: "Secondary school", value: "ss", points: 5 },
      ],
    },
    {
      key: "english", label: "First official language (CLB)", category: "Language",
      options: [
        { label: "CLB 9+ (IELTS 7+)", value: "9+", points: 24 },
        { label: "CLB 8 (IELTS 6.5)", value: "8", points: 20 },
        { label: "CLB 7 (IELTS 6)", value: "7", points: 16 },
        { label: "Below CLB 7", value: "low", points: 0 },
      ],
    },
    {
      key: "french", label: "Second language (French)", category: "Language",
      options: [
        { label: "CLB 5+", value: "5", points: 4 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "exp", label: "Skilled work experience", category: "Work Experience",
      options: [
        { label: "1 year", value: "1", points: 9 },
        { label: "2–3 years", value: "2-3", points: 11 },
        { label: "4–5 years", value: "4-5", points: 13 },
        { label: "6+ years", value: "6+", points: 15 },
      ],
    },
    {
      key: "arranged", label: "Arranged employment in Canada", category: "Employment",
      options: [
        { label: "Yes (valid job offer + LMIA)", value: "yes", points: 10 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "adapt", label: "Adaptability (spouse / past study / past work)", category: "Adaptability",
      options: [
        { label: "Multiple factors", value: "many", points: 10 },
        { label: "One factor", value: "one", points: 5 },
        { label: "None", value: "none", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 75,
    tips: [
      "Improve your English to CLB 9+ for maximum language points.",
      "Add basic French (CLB 5) for +4 adaptability and CRS bonus.",
      "Secure a valid Canadian job offer (+10 points).",
      "Pursue a higher credential or get a second qualification assessed.",
      "Have your spouse's education and language assessed.",
      "Document prior Canadian study or work experience.",
    ],
  },
  sections: [
    {
      h2: "What is the FSWP calculator?",
      body:
        "The Federal Skilled Worker Program (FSWP) is one of three federal streams managed by Immigration, Refugees and Citizenship Canada (IRCC) through the Express Entry system. To be eligible, applicants must score a minimum of 67 points on a 100-point grid covering age, education, language, work experience, arranged employment and adaptability.",
    },
    {
      h2: "How FSWP points are calculated",
      subsections: [
        { h3: "Age (max 12)", body: "Highest score 18–35, gradually reducing to 0 at age 47+." },
        { h3: "Education (max 25)", body: "Higher credentials score more — a PhD earns the maximum 25 points." },
        { h3: "Language (max 28)", body: "First language up to 24, second language up to 4." },
        { h3: "Work experience (max 15)", body: "Awarded for full-time skilled experience in the last 10 years." },
        { h3: "Arranged employment (max 10)", body: "Valid job offer from a Canadian employer with LMIA or LMIA-exempt." },
        { h3: "Adaptability (max 10)", body: "Spouse language/education, past Canadian study or work, and relatives in Canada." },
      ],
    },
    {
      h2: "How to improve your FSWP score",
      bullets: [
        "Re-take IELTS / CELPIP to reach CLB 9 in all four bands.",
        "Add French as a second language (TEF Canada / TCF Canada).",
        "Get a Canadian job offer supported by LMIA.",
        "Have your spouse's education and language evaluated for adaptability points.",
        "Document past Canadian work or study experience.",
      ],
    },
  ],
  comparison: {
    title: "FSWP vs CRS vs PNP",
    table: {
      headers: ["Feature", "FSWP (67 pt)", "CRS (1200 pt)", "PNP nomination"],
      rows: [
        ["Purpose", "Eligibility test", "Express Entry ranking", "Provincial fast-track"],
        ["Pass mark", "67 points", "Variable cut-off", "Provincial criteria"],
        ["Bonus available", "—", "PNP +600", "—"],
        ["Outcome", "Enter EE pool", "Receive ITA", "Near-guaranteed ITA"],
      ],
    },
  },
  faqs: COMMON_CA_FAQS("the Federal Skilled Worker Program"),
  relatedCalculators: CA_RELATED.filter((r) => !r.href.includes("federal-skilled-worker")),
};

// ------------------------------------------------------------------ CRS 1200pt (simplified)
export const caCrs: CalculatorConfig = {
  url: "/eligibility/canada/crs-calculator",
  country: "Canada",
  countryFlag: "🇨🇦",
  badge: "Canada Express Entry CRS Assessment",
  seoTitle: "Canada CRS Score Calculator 2026 | Express Entry Points Calculator",
  metaDescription:
    "Free Canada CRS Calculator. Estimate your Comprehensive Ranking System score for Express Entry — age, education, language, work experience, spouse and provincial nomination points.",
  h1: "Free Canada Express Entry CRS Score Calculator",
  subheading:
    "Estimate your Comprehensive Ranking System (CRS) score and find out how competitive your Express Entry profile is in the next IRCC draw.",
  trustChips: ["IRCC-aligned scoring", "Spouse factors included", "PNP bonus applied", "Confidential"],
  maxPoints: 1200,
  passingThreshold: 470,
  competitiveThreshold: 510,
  highlyCompetitiveThreshold: 550,
  scoreUnit: "CRS",
  fields: [
    {
      key: "age", label: "Age", category: "Core",
      options: [
        { label: "20–29", value: "20-29", points: 110 },
        { label: "30–34", value: "30-34", points: 95 },
        { label: "35–39", value: "35-39", points: 65 },
        { label: "40–44", value: "40-44", points: 35 },
        { label: "45+", value: "45+", points: 0 },
      ],
    },
    {
      key: "edu", label: "Education", category: "Core",
      options: [
        { label: "PhD", value: "phd", points: 150 },
        { label: "Master's / Professional", value: "ma", points: 135 },
        { label: "Two or more credentials", value: "two", points: 128 },
        { label: "Bachelor's (3+ yr)", value: "ba", points: 120 },
        { label: "2-year post-secondary", value: "2y", points: 98 },
        { label: "1-year post-secondary", value: "1y", points: 90 },
        { label: "Secondary school", value: "ss", points: 30 },
      ],
    },
    {
      key: "english", label: "First language (CLB)", category: "Language",
      options: [
        { label: "CLB 10+", value: "10", points: 136 },
        { label: "CLB 9", value: "9", points: 124 },
        { label: "CLB 8", value: "8", points: 92 },
        { label: "CLB 7", value: "7", points: 68 },
        { label: "Below CLB 7", value: "low", points: 0 },
      ],
    },
    {
      key: "french", label: "French (TEF / TCF Canada)", category: "Language",
      options: [
        { label: "CLB 7+", value: "7", points: 50 },
        { label: "CLB 5–6", value: "5", points: 25 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "canExp", label: "Canadian work experience", category: "Work",
      options: [
        { label: "5+ years", value: "5+", points: 80 },
        { label: "3–4 years", value: "3-4", points: 72 },
        { label: "1–2 years", value: "1-2", points: 53 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "forExp", label: "Foreign work experience", category: "Work",
      options: [
        { label: "3+ years", value: "3+", points: 50 },
        { label: "1–2 years", value: "1-2", points: 25 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "spouse", label: "Spouse contribution", category: "Spouse",
      options: [
        { label: "Spouse – high education + CLB 9", value: "high", points: 40 },
        { label: "Spouse – moderate factors", value: "mid", points: 20 },
        { label: "Single applicant", value: "single", points: 0 },
        { label: "Spouse, no qualifying factors", value: "none", points: 0 },
      ],
    },
    {
      key: "pnp", label: "Provincial nomination", category: "Bonus",
      options: [
        { label: "Yes – PNP nomination", value: "yes", points: 600 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "offer", label: "Valid Canadian job offer", category: "Bonus",
      options: [
        { label: "TEER 0 Major (CEO-level)", value: "major", points: 200 },
        { label: "TEER 0/1/2/3 standard offer", value: "std", points: 50 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "sibling", label: "Sibling in Canada (citizen/PR)", category: "Bonus",
      options: [
        { label: "Yes", value: "yes", points: 15 },
        { label: "No", value: "no", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 510,
    tips: [
      "Improve English to CLB 10+ for top language points.",
      "Add strong French to claim up to 50 bonus points.",
      "Pursue a Provincial Nomination for the +600 game-changer.",
      "Gain Canadian work experience through PGWP or LMIA pathways.",
      "Pursue further education or get a second credential ECA-assessed.",
      "Document spousal education, language and Canadian work experience.",
    ],
  },
  sections: [
    {
      h2: "What is the CRS calculator?",
      body:
        "The Comprehensive Ranking System (CRS) is the points-based system used by IRCC to rank Express Entry candidates. Scores go up to 1,200 and the cut-off in each draw determines who receives an Invitation to Apply (ITA) for permanent residence.",
    },
    {
      h2: "How CRS scores are calculated",
      subsections: [
        { h3: "Core / human capital (max 500)", body: "Age, education, language, Canadian work experience for single applicants." },
        { h3: "Spouse factors (max 40)", body: "Spouse education, language, and Canadian work experience." },
        { h3: "Skill transferability (max 100)", body: "Education + language combinations and foreign + Canadian experience combinations." },
        { h3: "Additional points (max 600)", body: "Provincial nomination, qualifying job offer, French ability, Canadian study, sibling in Canada." },
      ],
    },
    {
      h2: "How to improve your CRS score",
      bullets: [
        "Aim for CLB 10+ in all four English bands.",
        "Add French (TEF/TCF Canada) — up to +50 points.",
        "Apply to a Provincial Nominee Program (+600 points).",
        "Secure a qualifying Canadian job offer (+50 to +200).",
        "Pursue a second credential to qualify for transferability points.",
      ],
    },
  ],
  comparison: {
    title: "Common CRS cut-offs by draw type (recent rounds)",
    table: {
      headers: ["Draw type", "Typical cut-off", "Notes"],
      rows: [
        ["General", "490–540", "Open to all eligible candidates"],
        ["PNP-specific", "700+", "Includes +600 nomination bonus"],
        ["Healthcare category", "430–480", "Targeted occupations"],
        ["French language", "375–430", "Strong French speakers"],
        ["STEM category", "470–510", "Tech and engineering roles"],
      ],
    },
  },
  faqs: COMMON_CA_FAQS("Express Entry CRS"),
  relatedCalculators: CA_RELATED.filter((r) => !r.href.includes("crs-calculator")),
};

// ------------------------------------------------------------------ SINP 100pt
export const caSinp: CalculatorConfig = {
  url: "/eligibility/canada/saskatchewan-sinp-calculator",
  country: "Canada",
  countryFlag: "🇨🇦",
  badge: "Saskatchewan Immigrant Nominee Program",
  seoTitle: "SINP Points Calculator 2026 | Saskatchewan Immigration Eligibility",
  metaDescription:
    "Free Saskatchewan Immigrant Nominee Program (SINP) calculator. Check your 100-point eligibility for the International Skilled Worker stream — Education, English, Age, Work Experience and Adaptability.",
  h1: "Free Saskatchewan SINP Points Calculator",
  subheading:
    "Assess your eligibility for the Saskatchewan International Skilled Worker (ISW) stream under the SINP 100-point grid.",
  trustChips: ["SINP-aligned criteria", "ISW & EE sub-categories", "Real-time scoring", "Confidential"],
  maxPoints: 100,
  passingThreshold: 60,
  competitiveThreshold: 70,
  highlyCompetitiveThreshold: 80,
  scoreUnit: "Points",
  fields: [
    {
      key: "edu", label: "Education", category: "Education",
      options: [
        { label: "Master's / PhD", value: "ma", points: 23 },
        { label: "Bachelor's (3+ yr)", value: "ba", points: 20 },
        { label: "Trade certification", value: "trade", points: 20 },
        { label: "2-year diploma", value: "diploma", points: 15 },
        { label: "1-year certificate", value: "cert", points: 12 },
      ],
    },
    {
      key: "exp", label: "Skilled work experience (last 5 yrs)", category: "Work Experience",
      options: [
        { label: "5+ years", value: "5+", points: 10 },
        { label: "3–4 years", value: "3-4", points: 8 },
        { label: "1–2 years", value: "1-2", points: 2 },
        { label: "<1 year", value: "<1", points: 0 },
      ],
    },
    {
      key: "english", label: "English language ability (CLB)", category: "Language",
      options: [
        { label: "CLB 8+", value: "8+", points: 20 },
        { label: "CLB 7", value: "7", points: 18 },
        { label: "CLB 5–6", value: "5-6", points: 14 },
        { label: "CLB 4", value: "4", points: 8 },
      ],
    },
    {
      key: "age", label: "Age", category: "Age",
      options: [
        { label: "22–34", value: "22-34", points: 12 },
        { label: "35–45", value: "35-45", points: 10 },
        { label: "46–50", value: "46-50", points: 6 },
        { label: "51+", value: "51+", points: 0 },
      ],
    },
    {
      key: "sask", label: "Connection to Saskatchewan", category: "Adaptability",
      options: [
        { label: "Close relative in Saskatchewan", value: "rel", points: 20 },
        { label: "Past study in Saskatchewan", value: "study", points: 5 },
        { label: "Past work in Saskatchewan", value: "work", points: 5 },
        { label: "Job offer from Saskatchewan employer", value: "job", points: 30 },
        { label: "None", value: "none", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 70,
    tips: [
      "Secure a valid Saskatchewan job offer — worth up to 30 adaptability points.",
      "Improve English to CLB 8 for maximum language points.",
      "Document relatives, prior study or work in Saskatchewan.",
      "Pursue further education or trade certification.",
      "Consider entering through the Express Entry sub-category for faster processing.",
    ],
  },
  sections: [
    {
      h2: "What is the SINP calculator?",
      body:
        "The Saskatchewan Immigrant Nominee Program (SINP) is the province's flagship economic immigration program. The International Skilled Worker (ISW) stream uses a 100-point grid covering education, work experience, language, age and adaptability to Saskatchewan. A minimum score of 60 is required to be considered.",
    },
    {
      h2: "How SINP points are calculated",
      bullets: [
        "Education up to 23 points based on highest qualification.",
        "Skilled work experience in the last 5 years — up to 10 points.",
        "English (and optionally French) language up to 20 points.",
        "Age up to 12 points.",
        "Adaptability factors up to 30+ points for Saskatchewan connection and job offers.",
      ],
    },
    {
      h2: "How to improve your SINP score",
      bullets: [
        "Get a Saskatchewan-based job offer.",
        "Improve language scores to CLB 8.",
        "Establish a documented connection to the province.",
        "Use the Express Entry sub-category if you already have an EE profile.",
        "Strengthen your CRS so the +600 nomination instantly converts to an ITA.",
      ],
    },
  ],
  faqs: COMMON_CA_FAQS("Saskatchewan SINP"),
  relatedCalculators: CA_RELATED.filter((r) => !r.href.includes("saskatchewan-sinp")),
};

// ------------------------------------------------------------------ QSWP
export const caQswp: CalculatorConfig = {
  url: "/eligibility/canada/quebec-skilled-worker-program",
  country: "Canada (Quebec)",
  countryFlag: "🇨🇦",
  badge: "Quebec Skilled Worker Program",
  seoTitle: "Quebec QSWP Points Calculator 2026 | Quebec Immigration Eligibility",
  metaDescription:
    "Free Quebec Skilled Worker Program (QSWP) calculator. Calculate your selection grid points — training, work experience, age, French/English language, spouse and Quebec connection.",
  h1: "Free Quebec Skilled Worker Program (QSWP) Calculator",
  subheading:
    "Estimate your selection score under Quebec's Programme régulier des travailleurs qualifiés (PRTQ).",
  trustChips: ["Quebec-aligned criteria", "French-prioritised scoring", "Real-time results", "Confidential"],
  maxPoints: 117,
  passingThreshold: 50,
  competitiveThreshold: 60,
  highlyCompetitiveThreshold: 70,
  scoreUnit: "Points",
  fields: [
    {
      key: "edu", label: "Training / education", category: "Education",
      options: [
        { label: "PhD", value: "phd", points: 14 },
        { label: "Master's", value: "ma", points: 12 },
        { label: "Bachelor's", value: "ba", points: 10 },
        { label: "Quebec technical diploma", value: "dec", points: 8 },
        { label: "Diploma / equivalent", value: "diploma", points: 6 },
      ],
    },
    {
      key: "field", label: "Area of training (Quebec demand list)", category: "Education",
      options: [
        { label: "Section A – high demand", value: "A", points: 16 },
        { label: "Section B", value: "B", points: 12 },
        { label: "Section C", value: "C", points: 6 },
        { label: "Not on list", value: "none", points: 0 },
      ],
    },
    {
      key: "exp", label: "Work experience (years)", category: "Work Experience",
      options: [
        { label: "4+ years", value: "4+", points: 8 },
        { label: "2–3 years", value: "2-3", points: 6 },
        { label: "1 year", value: "1", points: 4 },
        { label: "<1", value: "<1", points: 0 },
      ],
    },
    {
      key: "age", label: "Age", category: "Age",
      options: [
        { label: "18–35", value: "18-35", points: 16 },
        { label: "36–43", value: "36-43", points: 10 },
        { label: "44+", value: "44+", points: 0 },
      ],
    },
    {
      key: "french", label: "French language ability", category: "Language",
      options: [
        { label: "Oral B2 / Advanced", value: "b2", points: 16 },
        { label: "Oral B1 / Intermediate", value: "b1", points: 10 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "english", label: "English language ability", category: "Language",
      options: [
        { label: "CLB 5+ all skills", value: "5", points: 6 },
        { label: "CLB 4", value: "4", points: 3 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "stay", label: "Stay or family in Quebec", category: "Adaptability",
      options: [
        { label: "Family + past stay", value: "both", points: 8 },
        { label: "Past stay (3+ months)", value: "stay", points: 5 },
        { label: "Family in Quebec", value: "family", points: 3 },
        { label: "None", value: "none", points: 0 },
      ],
    },
    {
      key: "offer", label: "Validated Quebec job offer", category: "Employment",
      options: [
        { label: "Greater Montréal job offer", value: "mtl", points: 8 },
        { label: "Outside Montréal", value: "out", points: 10 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "spouse", label: "Spouse / partner factors", category: "Spouse",
      options: [
        { label: "Strong (training + French + age)", value: "high", points: 17 },
        { label: "Moderate", value: "mid", points: 8 },
        { label: "Single", value: "single", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 60,
    tips: [
      "Prioritise French — Oral B2 unlocks 16 points and is essential for Arrima invitations.",
      "Have your training reviewed against the Quebec demand list.",
      "Secure a validated job offer — bonus for offers outside Greater Montréal.",
      "Strengthen spouse factors (French + education + age).",
      "Document any past stay or family ties to Quebec.",
    ],
  },
  sections: [
    {
      h2: "What is the QSWP calculator?",
      body:
        "Quebec runs its own skilled worker program — the Programme régulier des travailleurs qualifiés (PRTQ / QSWP) — through the Arrima portal. The selection grid awards points across education, work experience, age, language (French and English), Quebec connection, job offer and spouse factors.",
    },
    {
      h2: "How QSWP points are calculated",
      bullets: [
        "Training and area of training — up to 30 points.",
        "Work experience — up to 8 points.",
        "Age — up to 16 points (18–35).",
        "French language ability — up to 16 points (oral + written).",
        "English language ability — up to 6 points.",
        "Quebec connection, job offer and spouse — significant bonus points.",
      ],
    },
    {
      h2: "How to improve your QSWP score",
      bullets: [
        "Sit a TEF / TCF for French — aim for Oral B2.",
        "Get your training assessed against Quebec's in-demand list.",
        "Pursue a validated job offer outside Greater Montréal.",
        "Add English language (TEF Canada English not accepted — use IELTS).",
        "Strengthen spouse contribution.",
      ],
    },
  ],
  faqs: COMMON_CA_FAQS("the Quebec Skilled Worker Program"),
  relatedCalculators: CA_RELATED.filter((r) => !r.href.includes("quebec")),
};
