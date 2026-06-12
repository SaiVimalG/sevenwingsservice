import type { CalculatorConfig } from "../types";

export const deOpportunityCard: CalculatorConfig = {
  url: "/eligibility/germany/opportunity-card-calculator",
  country: "Germany",
  countryFlag: "🇩🇪",
  badge: "Germany Opportunity Card (Chancenkarte)",
  seoTitle: "Germany Opportunity Card Points Calculator 2026 | Chancenkarte Eligibility",
  metaDescription:
    "Free Germany Opportunity Card (Chancenkarte) points calculator. Check your 6-point eligibility for the German job-seeker visa — qualification, work experience, German language, English, age and connection to Germany.",
  h1: "Free Germany Opportunity Card (Chancenkarte) Points Calculator",
  subheading:
    "Estimate your eligibility for Germany's points-based job-seeker visa — the Chancenkarte. Minimum 6 points required.",
  trustChips: ["BAMF-aligned criteria", "Chancenkarte experts", "Live scoring", "Confidential"],
  basePoints: 0,
  maxPoints: 14,
  passingThreshold: 6,
  competitiveThreshold: 8,
  highlyCompetitiveThreshold: 10,
  scoreUnit: "Points",
  fields: [
    {
      key: "qual", label: "Recognised qualification or experience", category: "Qualification",
      tooltip: "Required entry condition. You must hold either a recognised foreign degree, partially recognised qualification, or 2+ years of qualified vocational experience.",
      options: [
        { label: "Fully recognised qualification (Anerkennung)", value: "full", points: 4 },
        { label: "Partially recognised qualification", value: "part", points: 0 },
        { label: "Vocational training (2+ yrs) — recognised abroad", value: "voc", points: 0 },
      ],
    },
    {
      key: "german", label: "German language proficiency", category: "Language",
      options: [
        { label: "C1 or higher", value: "c1", points: 3 },
        { label: "B2", value: "b2", points: 2 },
        { label: "B1", value: "b1", points: 1 },
        { label: "A1 / A2", value: "a", points: 0 },
      ],
    },
    {
      key: "english", label: "English language proficiency", category: "Language",
      options: [
        { label: "C1 or higher (IELTS 7+)", value: "c1", points: 1 },
        { label: "B2", value: "b2", points: 0 },
        { label: "Below B2", value: "low", points: 0 },
      ],
    },
    {
      key: "age", label: "Age", category: "Age",
      options: [
        { label: "Under 35", value: "<35", points: 2 },
        { label: "35 – 39", value: "35-39", points: 1 },
        { label: "40+", value: "40+", points: 0 },
      ],
    },
    {
      key: "exp", label: "Qualified work experience (last 7 yrs)", category: "Work Experience",
      options: [
        { label: "5+ years", value: "5+", points: 3 },
        { label: "2 years", value: "2", points: 2 },
        { label: "<2", value: "<2", points: 0 },
      ],
    },
    {
      key: "connect", label: "Previous stay or connection to Germany", category: "Adaptability",
      options: [
        { label: "Yes – previous study/work (6+ months)", value: "yes", points: 1 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "spouse", label: "Spouse meets requirements", category: "Spouse",
      options: [
        { label: "Yes", value: "yes", points: 1 },
        { label: "No / single applicant", value: "no", points: 0 },
      ],
    },
    {
      key: "shortage", label: "Profession on shortage occupation list", category: "Occupation",
      options: [
        { label: "Yes (IT, healthcare, engineering, trades)", value: "yes", points: 1 },
        { label: "No", value: "no", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 8,
    tips: [
      "Reach German B2 or C1 for the highest language points.",
      "Submit your degree for full Anerkennung recognition through ZAB.",
      "Provide IELTS / TOEFL C1 proof for the English bonus.",
      "Demonstrate prior visits, study or internships in Germany.",
      "Document work experience on your CV with reference letters.",
      "Apply while under 35 to claim full age points.",
    ],
  },
  sections: [
    {
      h2: "What is the Opportunity Card calculator?",
      body:
        "Germany's Chancenkarte (Opportunity Card) is a points-based job-seeker visa launched in 2024 under the new Skilled Immigration Act. It allows qualified professionals to live in Germany for up to 12 months while searching for skilled employment. To qualify you need a recognised qualification or 2 years of qualified vocational experience plus 6 points across the language, age, experience, connection and spouse categories.",
    },
    {
      h2: "How Opportunity Card points are scored",
      subsections: [
        { h3: "Qualification", body: "Full Anerkennung = +4 points. Without full recognition you can still qualify through the vocational training route — but you must score 6 points from other categories." },
        { h3: "Language", body: "German B1 (+1), B2 (+2), C1 (+3). English C1 adds +1." },
        { h3: "Age", body: "Under 35 (+2), 35–39 (+1), 40+ (0)." },
        { h3: "Experience", body: "2 years (+2), 5+ years (+3) of qualified employment in the last 7 years." },
        { h3: "Connection to Germany", body: "+1 for previous study or work stay of 6 months or more." },
        { h3: "Spouse", body: "+1 if your spouse also meets the Chancenkarte requirements." },
        { h3: "Shortage occupations", body: "+1 for profession on Germany's official shortage list — IT, healthcare, engineering, skilled trades." },
      ],
    },
    {
      h2: "How to improve your Chancenkarte score",
      bullets: [
        "Take a Goethe / TestDaF examination — aim for B2 or higher.",
        "Apply for full Anerkennung through anerkennung-in-deutschland.de.",
        "Build documented work experience with reference letters.",
        "Apply before turning 35 to lock in maximum age points.",
        "Plan a short language or research visit to Germany.",
      ],
    },
  ],
  faqs: [
    { q: "How long is the Chancenkarte valid?", a: "The Opportunity Card is initially valid for up to 12 months and can be converted to a work permit once you secure qualified employment." },
    { q: "Can I work in Germany on the Chancenkarte?", a: "Yes — you can take up part-time work (up to 20 hours/week) and 2-week probationary employment while searching." },
    { q: "Do I need German language skills?", a: "Minimum A1 German or B2 English is required. Higher German levels significantly boost your points." },
    { q: "Is Anerkennung mandatory?", a: "No — applicants without full recognition can qualify through 2+ years of vocational training and 6 points across other categories." },
    { q: "Can my family join me?", a: "Family reunification is possible once you transition to a skilled worker residence permit." },
    { q: "What jobs are in shortage in Germany?", a: "IT specialists, engineers, healthcare professionals, skilled trades, and STEM teachers are in highest demand." },
    { q: "How long does the application take?", a: "Most embassies process Opportunity Card applications within 1–3 months." },
    { q: "What is the application fee?", a: "Currently €75 for the visa application at a German embassy or consulate." },
    { q: "Can I extend the Chancenkarte?", a: "It can be extended for up to 2 additional years if you have a contractually-agreed offer for qualified work." },
    { q: "Do I need proof of funds?", a: "Yes — approximately €1,027/month for the entire stay, either via blocked account or sponsor declaration." },
    { q: "Is health insurance mandatory?", a: "Yes — German-recognised health insurance is required for the visa." },
    { q: "Can I switch to a Blue Card?", a: "Yes — once you secure a qualified job offer with a qualifying salary, you can convert directly to an EU Blue Card or skilled worker residence permit." },
    { q: "What documents do I need?", a: "Passport, qualification documents, ZAB recognition statement, language certificates, CV, proof of funds and health insurance." },
    { q: "Will I get points for IELTS?", a: "Yes — IELTS 7+ counts as C1 English and earns the +1 bonus point." },
    { q: "Is this calculator official?", a: "No — it is an indicative estimate based on the German Skilled Immigration Act. Final eligibility is determined by the German embassy and BAMF." },
  ],
};

export const ukSkilledWorker: CalculatorConfig = {
  url: "/eligibility/uk/skilled-worker-calculator",
  country: "United Kingdom",
  countryFlag: "🇬🇧",
  badge: "UK Skilled Worker Visa Assessment",
  seoTitle: "UK Skilled Worker Visa Points Calculator 2026 | Free Eligibility Check",
  metaDescription:
    "Free UK Skilled Worker visa points calculator. Check your 70-point eligibility — sponsorship, skill level, salary, English language and tradeable points instantly.",
  h1: "Free UK Skilled Worker Visa Points Calculator",
  subheading:
    "Estimate your eligibility for the UK Skilled Worker visa under the 70-point Home Office system.",
  trustChips: ["UKVI-aligned criteria", "Sponsorship & salary checks", "Tradeable points logic", "Confidential"],
  maxPoints: 90,
  passingThreshold: 70,
  competitiveThreshold: 80,
  highlyCompetitiveThreshold: 90,
  scoreUnit: "Points",
  fields: [
    {
      key: "sponsor", label: "Sponsorship from approved UK employer", category: "Sponsorship (mandatory 20)",
      options: [
        { label: "Yes – Certificate of Sponsorship (CoS)", value: "yes", points: 20 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "skill", label: "Job at required skill level (RQF 3+)", category: "Skill Level (mandatory 20)",
      options: [
        { label: "Yes – eligible occupation code (SOC)", value: "yes", points: 20 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "english", label: "English language (B1 or higher)", category: "Language (mandatory 10)",
      options: [
        { label: "Yes – B1 / IELTS 4.0 in each band", value: "yes", points: 10 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "salary", label: "Salary level", category: "Tradeable",
      options: [
        { label: "≥ £38,700 (general threshold)", value: "full", points: 20 },
        { label: "£30,960 – £38,700 (PhD STEM / new entrant)", value: "mid", points: 10 },
        { label: "£23,200 – £30,960 (shortage / health-care)", value: "low", points: 0 },
        { label: "Below threshold", value: "below", points: 0 },
      ],
    },
    {
      key: "shortage", label: "Job on Immigration Salary List", category: "Tradeable",
      options: [
        { label: "Yes", value: "yes", points: 20 },
        { label: "No", value: "no", points: 0 },
      ],
    },
    {
      key: "phd", label: "Relevant PhD qualification", category: "Tradeable",
      options: [
        { label: "PhD in a STEM field relevant to job", value: "stem", points: 20 },
        { label: "PhD in another relevant field", value: "other", points: 10 },
        { label: "No", value: "no", points: 0 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 70,
    tips: [
      "Secure a Certificate of Sponsorship from a UK Home Office-licensed sponsor.",
      "Negotiate salary up to the £38,700 general threshold.",
      "Target occupations on the Immigration Salary List.",
      "Provide a PhD certificate — especially in STEM fields.",
      "Confirm IELTS 4.0 in all four bands or equivalent.",
      "Verify the SOC code of the offered role meets RQF 3+.",
    ],
  },
  sections: [
    {
      h2: "What is the UK Skilled Worker calculator?",
      body:
        "The UK Skilled Worker visa replaced Tier 2 (General) in December 2020. It uses a 70-point points-based system covering mandatory criteria (sponsorship, skill level, English) and tradeable points (salary, shortage occupations, PhD).",
    },
    {
      h2: "How Skilled Worker points are calculated",
      subsections: [
        { h3: "Mandatory (50 points)", body: "Sponsorship (20) + skill level (20) + English B1 (10) — required for every applicant." },
        { h3: "Tradeable salary (20)", body: "Reach the general threshold of £38,700 or trade lower salaries against PhD or shortage occupation points." },
        { h3: "Tradeable shortage / PhD (20)", body: "Immigration Salary List job (+20) or relevant PhD (+10 to +20)." },
      ],
    },
    {
      h2: "How to improve your Skilled Worker score",
      bullets: [
        "Confirm your employer is on the Home Office sponsor register.",
        "Negotiate salary above the £38,700 general threshold.",
        "Verify the SOC code is RQF 3 or above.",
        "Take IELTS / PTE to confirm B1 English.",
        "Provide PhD certificates where applicable.",
      ],
    },
  ],
  faqs: [
    { q: "What is the minimum salary for a Skilled Worker visa?", a: "The general threshold is £38,700, with lower thresholds (£30,960 / £23,200) for new entrants, PhD holders, shortage occupations and health-care workers." },
    { q: "Do I need a job offer?", a: "Yes — you must have a Certificate of Sponsorship from a UK Home Office-licensed sponsor." },
    { q: "How long is the Skilled Worker visa valid?", a: "Up to 5 years and renewable. After 5 years you can apply for Indefinite Leave to Remain (ILR)." },
    { q: "Does my employer need to be licensed?", a: "Yes — only employers on the Home Office sponsor register can issue a Certificate of Sponsorship." },
    { q: "Can I bring my family?", a: "Yes — dependants can join, subject to a minimum income threshold (currently £29,000 for spouse visas)." },
    { q: "What English level do I need?", a: "CEFR B1 in all four skills (IELTS 4.0)." },
    { q: "What is the Immigration Salary List?", a: "The current list of shortage occupations eligible for reduced salary thresholds and additional points." },
    { q: "Can I switch to ILR?", a: "Yes — after 5 years of continuous lawful residence on a Skilled Worker visa." },
    { q: "How long does processing take?", a: "Standard processing is 3 weeks from overseas, 8 weeks from inside the UK. Priority and Super Priority services are available." },
    { q: "What is the application fee?", a: "Between £719 and £1,500 depending on duration and shortage status, plus £1,035/year Immigration Health Surcharge." },
    { q: "What are tradeable points?", a: "Salary, shortage occupation and PhD points can be traded against each other to make up 20 points." },
    { q: "Do PhDs in arts count?", a: "Yes — a relevant non-STEM PhD earns 10 points; STEM PhDs earn 20." },
    { q: "Can I change employer on this visa?", a: "Yes, but you must apply to update your sponsor and certificate before starting the new role." },
    { q: "What happens after 5 years?", a: "You become eligible for ILR (settlement) and after 12 months of ILR for British citizenship." },
    { q: "Is this calculator official?", a: "No — it is an indicative estimate based on UKVI's published criteria. Final decisions are made by the Home Office." },
  ],
};
