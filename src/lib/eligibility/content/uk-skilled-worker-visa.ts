import type { CalculatorConfig } from "../types";

export const ukSkilledWorkerVisa: CalculatorConfig = {
  url: "/eligibility/uk/skilled-worker-visa-calculator",
  country: "United Kingdom",
  countryFlag: "🇬🇧",
  badge: "🇬🇧 Free UK Immigration Assessment",
  seoTitle:
    "UK Skilled Worker Visa Eligibility Calculator 2026 | Free Points Assessment | 7 Wings Immigration",
  metaDescription:
    "Check your eligibility for the UK Skilled Worker Visa with the free calculator from 7 Wings Immigration. Instantly assess sponsorship requirements, English language eligibility, tradeable points, and Skilled Worker Visa qualification.",
  h1: "United Kingdom Skilled Worker Visa Eligibility Calculator",
  subheading:
    "Find out whether you qualify for a UK Skilled Worker Visa using our free online assessment tool based on the latest UK immigration requirements.",
  trustChips: [
    "UK Immigration Specialists",
    "Free Instant Assessment",
    "Secure & Confidential",
    "Expert Immigration Support",
  ],
  maxPoints: 70,
  passingThreshold: 50,
  competitiveThreshold: 60,
  highlyCompetitiveThreshold: 70,
  scoreUnit: "Points",
  fields: [
    {
      key: "skill",
      label: "Is your job qualification at RQF Level 6 (Graduate) or Above?",
      category: "Skill Level (Mandatory 20)",
      tooltip:
        "RQF Level 6 generally corresponds to a bachelor's degree-level occupation.",
      options: [
        { label: "No", value: "no", points: 0 },
        { label: "Yes", value: "yes", points: 20 },
      ],
    },
    {
      key: "sponsor",
      label:
        "Do you have a job offer from a licensed sponsor in an eligible occupation?",
      category: "Sponsorship (Mandatory 20)",
      tooltip:
        "You must have a valid job offer from a UK employer licensed by the Home Office.",
      options: [
        { label: "No", value: "no", points: 0 },
        { label: "Yes – Mandatory", value: "yes", points: 20 },
      ],
    },
    {
      key: "english",
      label: "English at B2 Level or Above?",
      category: "Language (Mandatory 10)",
      tooltip:
        "Applicants generally need to demonstrate English language proficiency equivalent to CEFR B2.",
      options: [
        { label: "No", value: "no", points: 0 },
        { label: "Yes – Mandatory", value: "yes", points: 10 },
      ],
    },
    {
      key: "tradeable",
      label: "Tradeable Points (Select One)",
      category: "Tradeable Points (20)",
      tooltip:
        "Tradeable points allow applicants to meet eligibility through salary levels, qualifications, shortage occupations, and other approved criteria.",
      options: [
        { label: "None of the Below", value: "none", points: 0 },
        { label: "Salary at Least £41,700", value: "salary", points: 20 },
        { label: "PhD Relevant to Job", value: "phd", points: 10 },
        { label: "PhD in STEM Subject", value: "phd_stem", points: 20 },
        { label: "Job on Shortage Occupation List", value: "shortage", points: 20 },
        { label: "New Entrant to Labour Market", value: "new_entrant", points: 20 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 70,
    tips: [
      "Obtain a job offer from a UK Home Office licensed sponsor.",
      "Improve your English to CEFR B2 (IELTS 5.5+ in each band).",
      "Target eligible occupations at RQF Level 6 or above.",
      "Negotiate a salary at or above £41,700 for full tradeable points.",
      "Apply for roles on the UK Shortage Occupation List.",
      "If recently graduated, claim New Entrant status to qualify at lower salary.",
      "Provide PhD certificates — STEM PhDs earn maximum tradeable points.",
    ],
  },
  sections: [
    {
      h2: "What Is the UK Skilled Worker Visa?",
      body:
        "The UK Skilled Worker Visa replaced the Tier 2 (General) work visa in December 2020 and is the primary route for qualified professionals to live and work in the United Kingdom. It allows skilled workers from anywhere in the world — including India — to take up an eligible job offer with a Home Office licensed sponsor, bring dependants, access NHS services, and build a five-year pathway to Indefinite Leave to Remain (ILR) and eventual British citizenship.\n\nThe Skilled Worker route is points-based. You must reach 70 points by meeting three mandatory requirements (sponsorship, skill level and English language) plus tradeable points from salary, qualifications, shortage occupations or new entrant status. Our free UK Eligibility Calculator by 7 Wings Immigration mirrors the official Home Office criteria so you can see your result in seconds.",
    },
    {
      h2: "Skilled Worker Visa Eligibility Requirements",
      subsections: [
        { h3: "Licensed Sponsorship (20 pts)", body: "Your employer must hold a valid sponsor licence from the UK Home Office and issue you a Certificate of Sponsorship (CoS) for the specific role." },
        { h3: "Eligible Occupation – RQF Level 6 (20 pts)", body: "The job must sit on the UK eligible occupations list at RQF Level 6 (graduate level) or above. Check the SOC code on your CoS." },
        { h3: "English Language B2 (10 pts)", body: "Prove CEFR B2 English in reading, writing, speaking and listening — usually via IELTS UKVI, PTE Academic UKVI, or a degree taught in English." },
        { h3: "Salary £41,700+ (Tradeable 20 pts)", body: "The general salary threshold is £41,700 per year. Lower thresholds apply for shortage occupations, new entrants and PhD holders." },
        { h3: "Tradeable Points (20 pts)", body: "Trade lower salary against a relevant PhD (+10), STEM PhD (+20), shortage occupation (+20) or new-entrant status (+20)." },
      ],
    },
    {
      h2: "Understanding Tradeable Points",
      subsections: [
        { h3: "Salary £41,700+", body: "Meeting the general salary threshold automatically earns full tradeable points — the simplest route for experienced professionals." },
        { h3: "Relevant PhD (+10)", body: "A PhD relevant to your sponsored role earns 10 tradeable points and lowers the salary threshold to roughly £37,500." },
        { h3: "STEM PhD (+20)", body: "A PhD in a Science, Technology, Engineering or Mathematics field earns the maximum 20 tradeable points and reduces the salary floor further." },
        { h3: "Shortage Occupation List", body: "Roles on the Immigration Salary List (formerly Shortage Occupation List) — including many healthcare, engineering and tech roles — earn 20 tradeable points." },
        { h3: "New Entrant Route", body: "Applicants under 26, recent graduates, or those moving from a Student / Graduate visa qualify as new entrants and access reduced salary thresholds with full tradeable points." },
      ],
    },
    {
      h2: "How the UK Skilled Worker Visa Calculator Works",
      body:
        "Our calculator awards points exactly as the Home Office does. Question 1 confirms skill level (20 pts). Question 2 confirms sponsorship (20 pts). Question 3 confirms English (10 pts). Question 4 lets you select the strongest tradeable category you qualify for (up to 20 pts). A total of 70 means you meet the published eligibility floor. If you score below 70, the calculator highlights exactly which mandatory criterion or tradeable category is missing.",
    },
    {
      h2: "Benefits of the UK Skilled Worker Visa",
      bullets: [
        "Live and work in the United Kingdom for up to 5 years per CoS, renewable.",
        "Bring your spouse / partner and children under 18 as dependants.",
        "Access the NHS via the Immigration Health Surcharge.",
        "Qualify for Indefinite Leave to Remain (ILR) after 5 continuous years.",
        "Apply for British citizenship 12 months after ILR.",
        "Switch employers and roles within the Skilled Worker route.",
      ],
    },
    {
      h2: "Common Reasons for Refusal",
      bullets: [
        "Job offer not from a Home Office licensed sponsor.",
        "Occupation below RQF Level 6 or not on the eligible list.",
        "English language evidence missing or below CEFR B2.",
        "Salary below the threshold without qualifying tradeable points.",
        "Inconsistent or incomplete documentation on the CoS.",
      ],
    },
  ],
  faqs: [
    { q: "What is a UK Skilled Worker Visa?", a: "It is the UK's main work visa route for qualified professionals with a job offer from a Home Office licensed sponsor at RQF Level 6 or above." },
    { q: "How many points do I need?", a: "You need 70 points — 50 from mandatory criteria (sponsorship 20, skill level 20, English 10) plus 20 tradeable points." },
    { q: "Do I need a sponsor?", a: "Yes — a Certificate of Sponsorship from a UK Home Office licensed sponsor is mandatory." },
    { q: "What salary is required?", a: "The general threshold is £41,700 per year, with reductions for shortage occupations, new entrants and PhD holders." },
    { q: "Can I bring my family?", a: "Yes — your spouse / partner and children under 18 can join you as dependants with full work and study rights." },
    { q: "Can I apply from outside the UK?", a: "Yes — applications can be made from India or from inside the UK as a switch from another eligible visa." },
    { q: "Is IELTS mandatory?", a: "You must prove CEFR B2 English. IELTS UKVI is the most common route; PTE Academic UKVI, TOEFL alternatives, or an English-taught degree also qualify." },
    { q: "Can I switch visas inside the UK?", a: "Yes — Student, Graduate, Health and Care Worker, and many other in-country visa holders can switch to a Skilled Worker visa." },
    { q: "How long is the visa valid?", a: "Up to 5 years per Certificate of Sponsorship, and it is renewable as long as your sponsorship continues." },
    { q: "What is the Immigration Salary List?", a: "It is the official list of shortage roles eligible for reduced salary thresholds and additional tradeable points." },
    { q: "Does a PhD really lower the salary threshold?", a: "Yes — a relevant PhD reduces the threshold and earns 10 tradeable points; a STEM PhD earns the full 20." },
    { q: "Who qualifies as a new entrant?", a: "Applicants under 26, recent graduates, those switching from a Student / Graduate visa, or those working towards professional registration usually qualify." },
    { q: "Can I change employer on this visa?", a: "Yes, but your new employer must also be a licensed sponsor and issue a fresh CoS before you start." },
    { q: "When can I apply for settlement?", a: "You become eligible for Indefinite Leave to Remain (ILR) after 5 continuous years on the Skilled Worker route." },
    { q: "Is this calculator official?", a: "No — it is an indicative tool aligned with published UKVI criteria. Final decisions rest with the UK Home Office. Book a free consultation with 7 Wings Immigration for a full assessment." },
  ],
  relatedCalculators: [
    { label: "Canada CRS Calculator", href: "/eligibility/canada/crs-calculator" },
    { label: "Canada FSWP Calculator", href: "/eligibility/canada/federal-skilled-worker-program" },
    { label: "Australia 189 PR Calculator", href: "/eligibility/australia/189-points-calculator" },
    { label: "Germany Opportunity Card", href: "/eligibility/germany/opportunity-card-calculator" },
  ],
};
