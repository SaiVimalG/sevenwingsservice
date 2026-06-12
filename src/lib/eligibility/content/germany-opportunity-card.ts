import type { CalculatorConfig } from "../types";

export const germanyOpportunityCard: CalculatorConfig = {
  url: "/eligibility/germany/opportunity-card-calculator",
  country: "Germany",
  countryFlag: "🇩🇪",
  badge: "🇩🇪 Free Germany Immigration Assessment",
  seoTitle:
    "Germany Opportunity Card Calculator 2026 | Chancenkarte Eligibility Check | 7 Wings Immigration",
  metaDescription:
    "Check your Germany Opportunity Card eligibility instantly using the free Chancenkarte Calculator by 7 Wings Immigration. Calculate your points based on age, education, work experience, language skills, qualification recognition, and more.",
  h1: "Germany Opportunity Card (Chancenkarte) Eligibility Calculator",
  subheading:
    "Find out whether you qualify for Germany's Opportunity Card (Chancenkarte) using our free eligibility calculator and personalised assessment system.",
  trustChips: [
    "Germany Immigration Experts",
    "Real-Time Eligibility Assessment",
    "Secure & Confidential",
    "Personalised Immigration Guidance",
  ],
  basePoints: 0,
  maxPoints: 14,
  passingThreshold: 6,
  competitiveThreshold: 8,
  highlyCompetitiveThreshold: 10,
  scoreUnit: "Points",
  fields: [
    {
      key: "age",
      label: "What is your age?",
      category: "Age",
      tooltip: "Age plays an important role in Germany Opportunity Card scoring.",
      options: [
        { label: "Under 35", value: "<35", points: 2 },
        { label: "35 – 39", value: "35-39", points: 1 },
        { label: "40 and above", value: "40+", points: 0 },
      ],
    },
    {
      key: "education",
      label: "What are your educational qualifications?",
      category: "Education",
      tooltip: "Higher qualifications may increase eligibility points.",
      options: [
        { label: "Diploma (Minimum 2 Years)", value: "diploma", points: 1 },
        { label: "Bachelor's Degree", value: "bachelor", points: 2 },
        { label: "Master's Degree", value: "master", points: 3 },
        { label: "PhD", value: "phd", points: 4 },
      ],
    },
    {
      key: "recognition",
      label: "Qualification Recognition (ANABIN / ZAB)",
      category: "Qualification Recognition",
      tooltip:
        "Recognition of qualifications through ANABIN or ZAB is an important requirement for Germany Opportunity Card applications.",
      options: [
        { label: "Not Recognised", value: "none", points: 0 },
        { label: "Partially Recognised (ZAB Positive)", value: "partial", points: 1 },
        { label: "Fully Recognised in Germany", value: "full", points: 4 },
      ],
    },
    {
      key: "experience",
      label: "Professional Work Experience",
      category: "Work Experience",
      tooltip: "Recent relevant work experience contributes to Opportunity Card eligibility.",
      options: [
        { label: "Less Than 2 Years", value: "<2", points: 0 },
        { label: "2 – 5 Years (Within Last 5 Years)", value: "2-5", points: 2 },
        { label: "5+ Years (Within Last 7 Years)", value: "5+", points: 3 },
      ],
    },
    {
      key: "shortage",
      label: "Qualification in a Shortage Occupation (IT, Engineering, Healthcare, STEM, Skilled Trades)?",
      category: "Shortage Occupation",
      tooltip:
        "Germany's official shortage occupation list includes IT, engineering, healthcare, skilled trades and STEM roles.",
      options: [
        { label: "No", value: "no", points: 0 },
        { label: "Yes (+1 Point)", value: "yes", points: 1 },
      ],
    },
    {
      key: "german",
      label: "German Language Level (CEFR)",
      category: "German Language",
      tooltip: "CEFR A1 (beginner) → C1 (advanced). Higher German levels earn more points.",
      options: [
        { label: "None", value: "none", points: 0 },
        { label: "A1", value: "a1", points: 0 },
        { label: "A2", value: "a2", points: 1 },
        { label: "B1", value: "b1", points: 1 },
        { label: "B2", value: "b2", points: 2 },
        { label: "C1 or higher", value: "c1", points: 3 },
      ],
    },
    {
      key: "english",
      label: "English Language Level",
      category: "English Language",
      tooltip: "English proficiency may contribute to eligibility.",
      options: [
        { label: "None", value: "none", points: 0 },
        { label: "B1", value: "b1", points: 0 },
        { label: "B2", value: "b2", points: 1 },
        { label: "C1 or Above", value: "c1", points: 1 },
      ],
    },
    {
      key: "germanyStay",
      label: "Previous Stay in Germany (6+ Months — Study, Work, Training)?",
      category: "Germany Connection",
      options: [
        { label: "No", value: "no", points: 0 },
        { label: "Yes", value: "yes", points: 1 },
      ],
    },
    {
      key: "spouse",
      label: "Spouse Also Eligible for Opportunity Card?",
      category: "Spouse",
      tooltip: "Additional points may be available if the accompanying spouse also qualifies.",
      options: [
        { label: "No / Single Applicant", value: "no", points: 0 },
        { label: "Yes", value: "yes", points: 1 },
      ],
    },
  ],
  recommendations: {
    ifBelow: 8,
    tips: [
      "Reach German B2 or C1 with a Goethe / TestDaF certificate for maximum language points.",
      "Submit your foreign degree for ZAB / ANABIN recognition before applying.",
      "Provide IELTS / TOEFL evidence of B2 or C1 English for the bonus point.",
      "Target shortage roles in IT, engineering, healthcare or skilled trades.",
      "Document 2+ years of recent qualified work experience with reference letters.",
      "Apply while under 35 to lock in full age points.",
      "Highlight any prior study, internship or employment in Germany.",
    ],
  },
  sections: [
    {
      h2: "What Is Germany's Opportunity Card (Chancenkarte)?",
      body:
        "Germany's Opportunity Card (Chancenkarte) is a points-based job-seeker visa launched in 2024 under the new Skilled Immigration Act. It allows qualified professionals from outside the EU — including India — to live in Germany for up to 12 months while searching for skilled employment, without needing a prior job offer. The Chancenkarte was created to address Germany's acute skilled-worker shortage in IT, engineering, healthcare, skilled trades and STEM occupations. To qualify, applicants need a recognised qualification or 2+ years of qualified vocational experience, plus a minimum of 6 points across age, language, experience, Germany connection and spouse categories. The free Germany Opportunity Card Calculator by 7 Wings Immigration mirrors the official BAMF criteria so you can see your eligibility in seconds.",
    },
    {
      h2: "Germany Opportunity Card Eligibility Requirements",
      subsections: [
        { h3: "Educational Qualification", body: "You must hold a recognised foreign higher-education degree or a vocational qualification with at least 2 years of training. Diploma, Bachelor's, Master's and PhD qualifications all count, with higher degrees earning more points." },
        { h3: "Recognition Requirements", body: "Your qualification must be assessed via ANABIN or ZAB. Full recognition (Anerkennung) earns the maximum points, while partial recognition still qualifies you for the Chancenkarte if you score enough total points." },
        { h3: "Language Skills", body: "Minimum A1 German OR B2 English is required. Higher German levels (B1, B2, C1) significantly increase your points." },
        { h3: "Work Experience", body: "2 years of qualified experience in the last 5 years (+2), or 5+ years in the last 7 years (+3) contributes directly to your score." },
        { h3: "Shortage Occupations", body: "Roles on Germany's official shortage list — IT specialists, engineers, healthcare professionals, skilled trades, STEM teachers — earn a +1 bonus point." },
      ],
    },
    {
      h2: "Understanding ANABIN and ZAB Recognition",
      subsections: [
        { h3: "ANABIN Database", body: "ANABIN is the official German database that classifies foreign universities (H+, H- or H+/-) and qualifications. If your university and degree are both listed as H+, your qualification is considered equivalent to a German degree." },
        { h3: "ZAB Evaluation Process", body: "If your qualification is not auto-equivalent through ANABIN, you can apply to the Zentralstelle für ausländisches Bildungswesen (ZAB) for an official Statement of Comparability (Zeugnisbewertung)." },
        { h3: "Recognition Benefits", body: "Full or partial recognition dramatically improves your Chancenkarte score and is the gateway to converting the Opportunity Card into a long-term skilled worker visa once you secure employment." },
        { h3: "Common Mistakes", body: "Skipping ANABIN verification, submitting unattested translations, and missing transcripts of marks are the top reasons recognition applications stall." },
      ],
    },
    {
      h2: "How the Germany Opportunity Card Calculator Works",
      body:
        "Our calculator scores you exactly the way BAMF and the German embassy assess Chancenkarte applications. Each answer awards points across nine categories: age (up to 2), education (up to 4), qualification recognition (up to 4), work experience (up to 3), shortage occupation (+1), German language (up to 3), English language (+1), previous Germany stay (+1) and spouse eligibility (+1). The system updates your eligibility status in real-time so you can experiment with how improving your German level, completing ZAB recognition, or claiming a shortage occupation changes your outcome.",
    },
    {
      h2: "Germany Opportunity Card Points System Explained",
      subsections: [
        { h3: "Qualification Points", body: "Full Anerkennung = +4. Partial recognition = +1. Education level adds another 1–4 based on Diploma → PhD." },
        { h3: "Experience Points", body: "2–5 years of qualified experience = +2; 5+ years = +3." },
        { h3: "Language Points", body: "German A2/B1 = +1, B2 = +2, C1 = +3. English B2+ = +1." },
        { h3: "Additional Points", body: "Shortage occupation = +1. Previous 6-month stay in Germany = +1. Spouse also eligible = +1. Age under 35 = +2; 35–39 = +1." },
      ],
    },
    {
      h2: "Benefits of the Germany Opportunity Card",
      bullets: [
        "Enter Germany without a confirmed job offer.",
        "Stay up to 12 months while searching for skilled employment.",
        "Take part-time work (up to 20 hours/week) and 2-week trial employment.",
        "Convert to an EU Blue Card or skilled worker residence permit once employed.",
        "Pathway to long-term residence and German citizenship.",
        "Bring family once you transition to a skilled worker permit.",
      ],
    },
    {
      h2: "Germany Opportunity Card for Indian Professionals",
      body:
        "India is one of the top source countries for the Chancenkarte. Indian IT specialists, engineers, nurses, doctors, data scientists and skilled tradespeople are in extremely high demand. Most Indian Bachelor's and Master's degrees from recognised universities qualify for ANABIN/ZAB recognition. With B1–B2 German and 2+ years of experience, the majority of Indian applicants comfortably cross the 6-point Chancenkarte threshold. Average starting salaries range from €45,000 (entry IT, healthcare) to €75,000+ (senior engineering, specialised medicine). 7 Wings Immigration's Germany specialists handle ANABIN/ZAB recognition, document attestation, German language coaching partnerships and Chancenkarte filing end-to-end.",
    },
    {
      h2: "Common Reasons for Rejection",
      bullets: [
        "Unrecognised qualification — no ANABIN match and no ZAB Zeugnisbewertung.",
        "Insufficient total points (less than 6).",
        "Missing or unattested educational documents and translations.",
        "Inadequate proof of financial means (€1,027/month for 12 months).",
        "No recognised German or English language certificate.",
        "Health insurance not meeting German requirements.",
      ],
    },
  ],
  faqs: [
    { q: "What is the Germany Opportunity Card?", a: "It is Germany's points-based job-seeker visa (Chancenkarte) that lets qualified non-EU professionals live in Germany for up to 12 months while searching for skilled employment." },
    { q: "How many points are required?", a: "A minimum of 6 points across age, language, experience, Germany connection and spouse categories, plus a recognised qualification or 2+ years vocational training." },
    { q: "Can I apply without German language skills?", a: "Yes — minimum A1 German OR B2 English is acceptable. However, higher German levels significantly improve your score and job prospects." },
    { q: "Is English enough?", a: "B2 English meets the minimum language requirement and earns +1 bonus point, but combining English with German B1+ dramatically improves outcomes." },
    { q: "What is ZAB?", a: "ZAB (Zentralstelle für ausländisches Bildungswesen) is the central German office that evaluates foreign qualifications and issues the official Statement of Comparability." },
    { q: "What is ANABIN?", a: "ANABIN is the German database that classifies foreign universities and qualifications. Degrees from H+ universities are considered equivalent to German degrees." },
    { q: "Can I bring my spouse?", a: "Family reunification is possible once you secure qualified employment and convert the Chancenkarte into a skilled worker residence permit. A spouse who independently qualifies can apply for their own Chancenkarte and earn you +1 point." },
    { q: "Can I work while searching for jobs?", a: "Yes — you can take part-time work (up to 20 hours per week) and 2-week trial employment in your field while on the Opportunity Card." },
    { q: "How long is the Opportunity Card valid?", a: "Initially up to 12 months, extendable for up to 2 additional years if you have a contractually-agreed offer for qualified employment." },
    { q: "Can it lead to permanent residency?", a: "Yes — once you transition to a Blue Card or skilled worker permit, you can apply for permanent residence (Niederlassungserlaubnis) after 21–33 months, and citizenship after 5–8 years." },
    { q: "Do I need proof of funds?", a: "Yes — approximately €1,027 per month for the entire stay, typically via a blocked account (Sperrkonto) or an obligation declaration from a German sponsor." },
    { q: "Is health insurance mandatory?", a: "Yes — German-recognised health insurance covering the entire stay is required for the visa." },
    { q: "Can I switch to a Blue Card?", a: "Yes — once you secure a qualifying job offer with the required salary, you can switch directly from the Chancenkarte to an EU Blue Card or skilled worker residence permit." },
    { q: "What documents do I need?", a: "Passport, recognised qualification certificates, ANABIN/ZAB statement, language certificates, CV, proof of funds, health insurance, and a points self-assessment." },
    { q: "How long does processing take?", a: "Most German embassies process Chancenkarte applications within 1–3 months from biometrics submission." },
    { q: "What is the application fee?", a: "Currently €75 for the Chancenkarte visa application at a German embassy or consulate." },
    { q: "What jobs are in shortage in Germany?", a: "IT specialists, software engineers, electrical & mechanical engineers, doctors, nurses, skilled trades (electricians, plumbers, welders) and STEM teachers are in highest demand." },
    { q: "Will IELTS be accepted for English?", a: "Yes — IELTS 5.5+ counts as B2 and 7.0+ counts as C1 for the English language bonus." },
    { q: "Do I need a job offer to apply?", a: "No — the entire purpose of the Chancenkarte is to allow entry without a confirmed job offer so you can search on the ground in Germany." },
    { q: "Is this calculator official?", a: "No — it is an indicative tool based on the German Skilled Immigration Act and BAMF criteria. Final eligibility is determined by the German embassy and BAMF. Book a free consultation with 7 Wings Immigration for a full assessment." },
  ],
  relatedCalculators: [
    { label: "Canada CRS Calculator", href: "/eligibility/canada/crs-calculator" },
    { label: "Canada FSWP Calculator", href: "/eligibility/canada/federal-skilled-worker-program" },
    { label: "Australia 189 PR Calculator", href: "/eligibility/australia/189-points-calculator" },
    { label: "UK Skilled Worker Visa Calculator", href: "/eligibility/uk/skilled-worker-visa-calculator" },
  ],
};
