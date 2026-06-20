import logo from "@/assets/7wings-navbar-logo.svg.asset.json";


export const SITE = {
  name: "7 Wings Immigration",
  short: "7 Wings",
  tagline: "Soar Beyond Borders. Land With Confidence.",
  city: "Hyderabad",
  email: "hello@7wingsimmigration.com",
  phone: "+91 80621 80254",
  whatsapp: "+91 80621 80254",
  address: "Hi-Tech City, Madhapur, Hyderabad, Telangana, INDIA",
  logoUrl: logo.url,
  logoUrlDark: logo.url,
  social: {
    instagram: "https://www.instagram.com/7wingsimmigration/",
    facebook: "https://www.facebook.com/7wingsimmigration/",
    linkedin: "https://linkedin.com/",
    youtube: "https://www.youtube.com/@7WingsImmigration",
  },
};

export type ServiceSlug = "germany-opportunity-card" | "australia-pr" | "canada-pr" | "jss-program";

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  blurb: string;
  intro: string;
  features: { title: string; description: string }[];
  process: string[];
  faqs: { q: string; a: string }[];
  image: string;
  flag: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
}

import germany from "@/assets/germany.jpg";
import australia from "@/assets/australia.jpg";
import canada from "@/assets/canada.jpg";
import jss from "@/assets/jss.jpg";

export const SERVICES: Service[] = [
  {
    slug: "germany-opportunity-card",
    title: "Germany Opportunity Card (Chancenkarte) – Job Seeker Visa",
    short: "Chancenkarte for skilled professionals seeking work in Germany.",
    blurb: "A points-based residence permit that lets qualified professionals enter Germany to look for a job — even before securing one.",
    intro:
      "Looking to move to Germany to search for work? The Opportunity Card (Chancenkarte) is a new German visa (Section 20a of the Residence Act) that lets qualified foreign workers enter Germany for up to 12 months to find employment or complete recognition training. Introduced in June 2024, this visa is designed for non-EU professionals (such as Indian nationals) without a job offer. During your stay, you can attend interviews, work trials or part-time work (up to 20 hours/week) while searching for a job. Hyderabad-based 7 Wings Immigration helps Indian applicants navigate the Opportunity Card visa process from start to finish.",
    features: [
      { title: "Job-Search Stay (up to 12 months)", description: "Live in Germany for up to a year while you hunt for skilled employment." },
      { title: "Flexible Work Trials", description: "Attend unpaid job trials or do part-time work (max 20 hrs/week) while you search." },
      { title: "Training for Qualification", description: "Start training to get your foreign degree or qualification recognised in Germany." },
      { title: "Pathway to Work Visa", description: "Once you find a job or get qualified, switch to a German Skilled Worker Visa or EU Blue Card." },
    ],
    process: [
      "Free profile review and points scoring against the official BAMF Chancenkarte matrix",
      "ZAB Zeugnisbewertung / ANABIN recognition assistance for your Indian degree",
      "Document pack — notarised translations, blocked account (€1,091/month in 2026), health insurance",
      "Visa appointment booking via the Federal Foreign Office Visa Portal and mock VFS interview",
      "Post-arrival switch support — Skilled Worker Visa or EU Blue Card once you secure an offer",
    ],
    faqs: [
      { q: "What is the Opportunity Card (Chancenkarte)?", a: "A German visa (AufenthG §20a) for eligible non-EU nationals to come to Germany for up to 12 months to search for a job or start qualification training. It requires either a fully recognised degree or at least 6 points in the points system." },
      { q: "Do I need a job offer to apply?", a: "No. The Opportunity Card is specifically for those without a job offer. It lets you enter Germany first, then look for work." },
      { q: "How do I get the required 6 points?", a: "Points come from qualification recognition (4), shortage occupation (1), work experience (2–3), German language A2–B2+ (1–3), English C1+ (1), age (1–2), prior Germany stay (1) and a qualifying spouse (1). We score you on the first call." },
      { q: "What if I already studied in Germany?", a: "If you completed a degree or training in Germany, you can apply for a job seeker permit (18 months) immediately, with part-time work allowed." },
      { q: "How long is the Opportunity Card valid?", a: "Up to 12 months. If you find qualified work, you can switch to another visa before it expires. If not, you must leave when the visa ends." },
      { q: "Can my spouse come with me?", a: "Yes — usually through family reunification. If your partner qualifies independently, it earns you +1 point in the matrix." },
      { q: "How long does visa processing take?", a: "Typically 4–6 weeks at the German Embassy/Consulate in India after submission. Do not book flights until the visa is stamped." },
      { q: "How can 7 Wings Immigration help?", a: "We offer end-to-end support — free eligibility scoring, ZAB recognition, document prep, blocked account and health insurance setup, and interview preparation." },
    ],
    image: germany,
    flag: "🇩🇪",
    country: "Germany",
    metaTitle: "Best Immigration Consultancy in Hyderabad for Germany Opportunity Card | 7 Wings",
    metaDescription: "Best immigration consultancy in Hyderabad for Germany Opportunity Card (Chancenkarte) — eligibility, points system and full application support by 7 Wings Immigration.",
  },
  {
    slug: "australia-pr",
    title: "Australia PR",
    short: "Skilled migration and permanent residency for Australia.",
    blurb: "Subclass 189, 190 and 491 — engineered around your occupation, score and state nomination.",
    intro:
      "Australia rewards skilled professionals with one of the world's strongest permanent-residency programs. 7 Wings Immigration helps Hyderabad professionals decode the SkillSelect points test, secure the right state nomination, and lodge a clean Expression of Interest that converts to an invitation.",
    features: [
      { title: "Skills assessment strategy", description: "ACS, EA, VETASSESS, ANMAC — we pick the assessing authority and prepare the dossier." },
      { title: "Points optimisation", description: "PTE/IELTS uplift, partner skills, NAATI and study credits — every legitimate point counted." },
      { title: "State nomination roadmap", description: "Track real-time occupation ceilings for NSW, VIC, QLD, SA and WA and match you to the right list." },
      { title: "Lifetime PR benefits", description: "Medicare, free schooling, citizenship pathway after 4 years — for you and your family." },
    ],
    process: [
      "Eligibility & occupation assessment",
      "Skills assessment lodgement (ACS / EA / VETASSESS)",
      "English test coaching and points uplift plan",
      "EOI submission via SkillSelect with state nomination",
      "Visa lodgement, medicals, PCC and grant follow-up",
    ],
    faqs: [
      { q: "Which visa subclass is best for me?", a: "We map your occupation and points to 189 (independent), 190 (state nominated) or 491 (regional) in a free consultation." },
      { q: "How long does the full process take?", a: "Typically 9 to 16 months from skills assessment to PR grant, depending on occupation ceiling and state nomination cycle." },
      { q: "Can I include my partner?", a: "Yes. Including your partner's skills can add 5–10 points and they receive the same PR rights." },
    ],
    image: australia,
    flag: "🇦🇺",
    country: "Australia",
    metaTitle: "Best Immigration Consultancy in Hyderabad for Australia PR | 7 Wings",
    metaDescription: "Best immigration consultancy in Hyderabad for Australia PR — skills assessment, points uplift, state nomination and Subclass 189/190/491 by 7 Wings.",
  },
  {
    slug: "canada-pr",
    title: "Canada PR",
    short: "Express Entry, PNP and family sponsorship for Canada.",
    blurb: "From CRS scoring to ITA — a clear, evidence-based pathway to Canadian permanent residency.",
    intro:
      "Canada continues to be the world's most welcoming PR destination for Indian professionals. 7 Wings Immigration helps you choose between Express Entry, a Provincial Nominee Program (PNP) or category-based draws, then engineers your profile to maximise CRS and convert an invitation into a landing.",
    features: [
      { title: "CRS score audit", description: "We benchmark your age, education, language, experience and adaptability — then plug every gap." },
      { title: "Express Entry strategy", description: "FSW, CEC and FST streams matched to your profile with category-based draw timing." },
      { title: "PNP shortlisting", description: "Active tracking of Ontario, BC, Alberta, Saskatchewan, Manitoba and Nova Scotia nomination cycles." },
      { title: "Family sponsorship support", description: "Spouse, parents, grandparents and dependent children — sponsorship done by the book." },
    ],
    process: [
      "Free CRS audit and profile gap analysis",
      "ECA (WES/IQAS) and IELTS/CELPIP coaching",
      "Express Entry profile creation and pool entry",
      "PNP application where eligible — parallel pathway",
      "PR application, biometrics, medicals and landing prep",
    ],
    faqs: [
      { q: "What CRS score do I need?", a: "Recent draws have hovered between 470 and 540 for general rounds and lower for category-based draws. We target your highest reachable score." },
      { q: "Should I apply for PNP or Express Entry?", a: "Both, in parallel where eligible. A PNP nomination adds 600 CRS points — almost a guaranteed ITA." },
      { q: "Can my family come with me?", a: "Yes. Spouses receive an open work permit and children get free schooling from day one." },
    ],
    image: canada,
    flag: "🇨🇦",
    country: "Canada",
    metaTitle: "Best Immigration Consultancy in Hyderabad for Canada PR | 7 Wings",
    metaDescription: "Best immigration consultancy in Hyderabad for Canada PR — Express Entry, PNP, ECA, IELTS/CELPIP and family sponsorship with transparent fees.",
  },
  {
    slug: "jss-program",
    title: "JSS Program",
    short: "Job-search support program for global skilled placement.",
    blurb: "A career-led migration pathway: assessment, matching, employer outreach and end-to-end relocation.",
    intro:
      "Our JSS (Job-Search Support) Program is built for professionals who want a job offer first and migration second. We assess your CV, position you for international recruiters, and walk you through interviews, offers and the right work-permit pathway — Germany, Australia, Canada, UAE and beyond.",
    features: [
      { title: "Career assessment", description: "Role mapping, salary benchmarking, gap analysis and a 90-day positioning plan." },
      { title: "Global CV & LinkedIn rebuild", description: "ATS-tuned CV in the format recruiters in each country actually screen with." },
      { title: "Employer outreach", description: "Curated shortlists, recruiter introductions and targeted application waves." },
      { title: "Interview & offer support", description: "Mock interviews, negotiation guidance and offer-letter review before you sign." },
    ],
    process: [
      "Discovery call and career fit assessment",
      "CV, LinkedIn and portfolio overhaul",
      "Country and role shortlist with salary benchmark",
      "Recruiter outreach + application campaign",
      "Interview prep, offer negotiation and relocation",
    ],
    faqs: [
      { q: "Is a job offer guaranteed?", a: "No ethical consultancy guarantees offers. We guarantee a focused, measurable process — most clients see active interview pipelines within 60–90 days." },
      { q: "Which countries do you cover?", a: "Primary focus on Germany, Australia, Canada and the UAE, with selective placement support for the UK and Singapore." },
      { q: "Do you charge upfront?", a: "Our JSS engagement is split into a small enrolment fee and milestone-linked success fees — fully disclosed before you sign." },
    ],
    image: jss,
    flag: "🌍",
    country: "Global",
    metaTitle: "Best Immigration Consultancy in Hyderabad for JSS Program | 7 Wings",
    metaDescription: "Best immigration consultancy in Hyderabad for the JSS Program — CV rebuild, recruiter outreach, interview prep and relocation by 7 Wings.",
  },
];

export const SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s])) as Record<ServiceSlug, Service>;

export const WHY_CHOOSE_US = [
  { title: "Personalised Guidance", description: "Every profile is unique. We score, plan, and execute around your goals — not a generic checklist." },
  { title: "Transparent Process", description: "Fixed-fee engagements, written timelines, zero hidden charges. You see every step." },
  { title: "Experienced Consultants", description: "A senior-led team with hands-on experience across Germany, Australia, Canada and the UAE." },
  { title: "Fast Response", description: "Replies inside 4 working hours and a dedicated case manager for every client." },
  { title: "Document Assistance", description: "Attestation, translation, ZAB/ECA, proof of funds — we handle the paperwork end-to-end." },
  { title: "Long-Term Planning", description: "PR, citizenship and family settlement — we plan five steps ahead from day one." },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Profile Assessment", description: "Free, no-obligation 30-minute consultation at our Hyderabad office or on video — we map your goals to the right country and visa." },
  { step: "02", title: "Eligibility Evaluation", description: "Points scoring, occupation matching, score gap analysis and a written engagement plan with timelines and fees." },
  { step: "03", title: "Documentation Support", description: "Education, work, finance and identity documents — collected, attested, translated and quality-checked before any submission." },
  { step: "04", title: "Application & Migration", description: "Application lodgement, interview prep, visa stamping, pre-departure briefing and on-ground arrival support." },
];

export const TESTIMONIALS = [
  { name: "Rohit S.", role: "Software Engineer · Hyderabad → Berlin", text: "7 Wings made my Germany Opportunity Card feel inevitable. Every email was answered the same day and my paperwork was airtight." },
  { name: "Anika P.", role: "Data Analyst · Hyderabad → Toronto", text: "I came in with a 462 CRS. Six months later I had my Canada PR. The score audit alone was worth the engagement." },
  { name: "Karthik M.", role: "Civil Engineer · Hyderabad → Melbourne", text: "Skills assessment via Engineers Australia was a maze. The 7 Wings team simplified it and got my 190 grant on the first attempt." },
  { name: "Sushma & family", role: "Family of four · Hyderabad → Hamburg", text: "We landed in Hamburg with our kids' school admissions sorted. That is the kind of detail you only get from a serious consultancy." },
  { name: "Rahul J.", role: "Product Manager · Hyderabad → Dubai", text: "The JSS Program rebuilt my CV and got me a Director-level offer in 11 weeks. Transparent, ethical, professional." },
];

export const FAQS = [
  { q: "How long does the immigration process take?", a: "It depends on the country and visa class — Germany Opportunity Card typically lands in 8–14 weeks, Canada PR in 9–14 months, and Australia PR in 9–16 months. We commit to a written timeline before you engage." },
  { q: "Am I eligible for PR in Germany, Australia or Canada?", a: "Eligibility comes down to your age, education, work experience and language scores. Book a free 30-minute consultation at our Hyderabad office and we will score you against every available pathway in one sitting." },
  { q: "What documents are required?", a: "Identity, educational, work-experience, financial and (where applicable) language proficiency documents. We share a country-specific checklist on day one and manage attestation and translation for you." },
  { q: "How much do your services cost?", a: "We operate on transparent, fixed-fee engagements — no hidden charges and no surprise government-fee mark-ups. The exact figure depends on the program and is shared in writing before you sign." },
  { q: "Can my family members apply with me?", a: "Yes. Spouses and dependent children are included in nearly every program we handle, with work and study rights from day one in most destinations." },
  { q: "Do you provide job assistance after migration?", a: "Yes. Our JSS Program continues for up to 90 days after landing — CV positioning, recruiter introductions and interview prep tailored to the local market." },
  { q: "Are you a registered immigration consultancy?", a: "Yes. 7 Wings Immigration is a Hyderabad-registered consultancy with senior counsellors trained in the latest IRCC, BAMF and Home Affairs frameworks." },
  { q: "Do you offer refunds?", a: "We offer a written refund policy that protects you against eligibility errors on our part. Full details are in our engagement letter and on the Refund Policy page." },
];

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const STATS = [
  { value: 1000, suffix: "+", label: "Successful Consultations" },
  { value: 95, suffix: "%", label: "Visa Success Rate" },
  { value: 4, suffix: "", label: "Countries Served" },
  { value: 24, suffix: "/7", label: "Guidance Support" },
];

export const COUNTRIES = [
  { slug: "germany", name: "Germany", flag: "🇩🇪", tagline: "Opportunity Card · Job Seeker Visa", image: germany, blurb: "Europe's largest economy, now open to skilled Indian professionals through the points-based Chancenkarte." },
  { slug: "australia", name: "Australia", flag: "🇦🇺", tagline: "Skilled Migration · 189 / 190 / 491", image: australia, blurb: "World-class healthcare, lifestyle and salaries — engineered around your SkillSelect points." },
  { slug: "canada", name: "Canada", flag: "🇨🇦", tagline: "Express Entry · PNP · Family", image: canada, blurb: "The most welcoming PR program on earth. CRS optimisation and PNP shortlisting from day one." },
  { slug: "uae", name: "United Arab Emirates", flag: "🇦🇪", tagline: "Golden Visa · Skilled Employment", image: jss, blurb: "Tax-free salaries, world-class infrastructure and a 10-year Golden Visa for in-demand professionals." },
  { slug: "uk", name: "United Kingdom", flag: "🇬🇧", tagline: "Skilled Worker · Global Talent", image: germany, blurb: "Career-defining roles across London, Manchester and Edinburgh via Skilled Worker and Global Talent routes." },
  { slug: "singapore", name: "Singapore", flag: "🇸🇬", tagline: "Employment Pass · ONE Pass", image: australia, blurb: "Asia's premier finance and tech hub — Employment Pass and ONE Pass strategy for senior professionals." },
];

export const AWARDS = [
  { title: "Best Immigration Consultancy", year: "2025", body: "Hyderabad Business Council" },
  { title: "Visa Success Award", year: "2025", body: "Telangana Trade Forum" },
  { title: "Innovation in Migration", year: "2024", body: "South India Excellence Awards" },
  { title: "Global Education Partner", year: "2024", body: "AIRC Recognised Member" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  contentHtml?: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  why7Wings: string[];
  faqs?: { q: string; a: string }[];
  cta: { label: string; to: string; slug?: string };
}

export const BLOG: BlogPost[] = [
  {
    slug: "germany-opportunity-card-2026-changes",
    title: "Germany Opportunity Card (Chancenkarte) – Job Seeker Visa",
    excerpt: "A complete guide to the Germany Opportunity Card (Chancenkarte) — eligibility, points system, and application process for Indian applicants.",
    date: "May 12, 2026",
    readTime: "8 min read",
    category: "Germany",
    author: "7 Wings Editorial",
    image: germany,
    intro:
      "Looking to move to Germany to search for work? The Opportunity Card (Chancenkarte) is a new German visa (Section 20a of the Residence Act) that lets qualified foreign workers enter Germany for up to 12 months to find employment or complete recognition training. Introduced in June 2024, it is designed for non-EU professionals (such as Indian nationals) without a job offer. During your stay, you can attend interviews, work trials, or part-time work (up to 20 hours/week) while searching for a job. Hyderabad-based 7 Wings Immigration helps Indian applicants navigate the Opportunity Card visa process from start to finish.",
    sections: [
      {
        heading: "Opportunity Card Visa Benefits",
        paragraphs: [
          "**Job-Search Stay:** Live in Germany for up to 12 months to hunt for skilled employment.",
          "**Flexible Work Trials:** Attend unpaid job trials or do part-time work (max 20 hrs/week) while you search.",
          "**Training for Qualification:** You may also start training to get your foreign degree or qualification recognized in Germany.",
          "**Pathway to Work Visa:** Once you find a job or get qualified, you can switch to a German work visa or EU Blue Card.",
        ],
      },
      {
        heading: "Who is Eligible? (Key Requirements)",
        paragraphs: [
          "To qualify for the Opportunity Card, you must be a non-EU/EEA/Swiss national (e.g. an Indian citizen) and meet one of two main routes:",
          "**Option 1 – Recognised Qualification:** You have a foreign vocational or academic degree fully recognised in Germany, or you earned your qualification in Germany. If so, you are considered a \"skilled worker\" under German law and do not need points. (German language skills are not mandatory for this route, though they help job hunting.)",
          "**Option 2 – Points System (6+ points):** You do not have a recognised German qualification. Instead, you must score at least 6 points in the Opportunity Card points table and meet all following conditions:",
          "**Valid Qualification:** You hold a completed vocational or academic training recognized in your country of origin. For university degrees, a positive Zeugnisbewertung (Statement of Comparability) or ANABIN entry is needed; for vocational certificates, a positive Digital Statement of Professional Qualification helps support your application.",
          "**Language:** You have at least German A1 or English B2 skills. Higher language skills score extra points. Having German is recommended to improve job prospects.",
          "**Funds:** You must prove you can support yourself. Typically this means a blocked account with €1,091 net per month (in 2026) or a formal commitment of funds.",
        ],
      },
      {
        heading: "Opportunity Card Points System (Option 2)",
        paragraphs: [
          "If you apply via the points route, you need ≥6 points in total. Points are awarded for:",
          "**Qualification Recognition (4 points):** Your foreign qualification is partially recognized in Germany. (Fully recognized degrees use Option 1.)",
          "**Shortage Occupation (1 point):** Your qualification is in a German shortage occupation (e.g. IT, engineering, healthcare).",
          "**Work Experience (2–3 points):** Relevant experience after graduation — 2 points for ≥2 years (within last 5 years), 3 points for ≥5 years (within last 7 years).",
          "**German Language (1–3 points):** 1 point for A2, 2 points for B1, 3 points for B2 or higher.",
          "**English Language (1 point):** +1 point if English is at least C1 (or you're a native speaker).",
          "**Age (1–2 points):** 2 points if you are ≤35 years old, 1 point if aged 36–40.",
          "**Previous Germany Stay (1 point):** 1 point if you resided legally in Germany for at least 6 continuous months in the last 5 years.",
          "**Spouse's Qualification (1 point):** 1 point if your spouse/partner also qualifies for the Opportunity Card under these rules.",
          "**Important:** All claimed points must be backed by documents or certificates in your visa application.",
        ],
      },
      {
        heading: "How to Apply",
        paragraphs: [
          "**Visa Application:** Apply for the Opportunity Card visa at the German Embassy/Consulate in India (or your country) using the Federal Foreign Office's Visa Portal. You need to submit proof of your qualifications, points, funds, etc. Non-English/German documents must be certified translated.",
          "**Processing Time:** It usually takes about 4–6 weeks for visa processing. Do not book flights until you have the visa.",
          "**After Arrival:** Once granted, you receive a German residence permit (job seeker) for up to one year. You can then freely move to any region in Germany and search for jobs. If you find qualified employment, you may apply for a German work visa (Skilled Worker visa) or EU Blue Card. If not, the permit expires after one year.",
          "Need help? 7 Wings Immigration in Hyderabad provides end-to-end support. Contact us or WhatsApp us for a free assessment of your Germany Opportunity Card eligibility.",
        ],
      },
    ],
    why7Wings: [
      "We score your profile against the official BAMF matrix in the very first call - no guesswork.",
      "Full ZAB recognition support so your Indian degree is accepted in Germany.",
      "Notarised translation, blocked-account setup and health-insurance - handled in-house.",
      "Mock VFS interview before your appointment so nothing surprises you on the day.",
    ],
    faqs: [
      { q: "What is the Opportunity Card (Chancenkarte)?", a: "A German visa (AufenthG §20a) for eligible non-EU nationals to come to Germany for up to 12 months to search for a job or start qualification training. It requires either a fully recognized degree or at least 6 points in the points system." },
      { q: "Do I need a job offer to apply?", a: "No. The Opportunity Card is specifically for those without a job offer. It lets you enter Germany first, then look for work." },
      { q: "How do I get the required points?", a: "You accumulate points for qualifications, work experience, age, language, etc. For example, 4 points for a partially recognized degree, 3 points for 5+ years' experience, and so on." },
      { q: "What if I already studied in Germany?", a: "If you completed a degree or training in Germany, you can apply for a job seeker permit (18 months) immediately. This permit has more benefits (18 months stay, part-time work allowed). Contact us for details." },
      { q: "How long is the Opportunity Card valid?", a: "It is issued up to 12 months. If you find qualified work, you can switch to another visa before it expires. If you don't, you must leave when the visa ends." },
      { q: "Can my spouse come with me?", a: "You can bring your spouse or partner, but they also need their own visa (usually family reunification). If your partner qualifies independently, it can earn you +1 point." },
      { q: "What happens after I find a job in Germany?", a: "You can apply to the local Foreigners Authority for a Skilled Worker Visa or Blue Card once you have a valid job offer and the required salary." },
      { q: "How can 7 Wings Immigration help?", a: "7 Wings Immigration (Hyderabad) offers free guidance and end-to-end support for your Germany visa application, including document review and interview preparation. We ensure your application meets official requirements." },
    ],
    cta: { label: "Check my Germany eligibility", to: "/services/$slug", slug: "germany-opportunity-card" },
  },
  {
    slug: "canada-pr-category-draws-2026",
    title: "Canada PR in 2026: Why category-based draws are the easiest route now",
    excerpt: "If your CRS score is between 450 and 480, category-based Express Entry draws are now your best path to an ITA.",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    category: "Canada",
    author: "Counsel Desk",
    image: canada,
    intro:
      "Canada continues to be the most welcoming PR country for Indian families. In 2026, almost 40% of all Express Entry invitations come from category-based draws - and the cut-off is often below 470 CRS for the right occupation.",
    sections: [
      {
        heading: "Which categories are hottest",
        paragraphs: [
          "Healthcare (nurses, physiotherapists, pharmacists), STEM (software engineers, data analysts, civil engineers), trades and French-speaking candidates are being invited at lower scores.",
          "If your NOC code falls in one of these categories, you can land an ITA with a CRS as low as 445.",
        ],
      },
      {
        heading: "What you need to lodge a profile",
        paragraphs: [
          "Valid IELTS General or CELPIP-G (we recommend re-testing if your score is 4+ years old).",
          "ECA (Educational Credential Assessment) from WES or IQAS - usually 4-6 weeks.",
          "Proof of funds equivalent to CAD ~14,000 for a single applicant (more for family).",
        ],
      },
      {
        heading: "Realistic timelines",
        paragraphs: [
          "Profile creation: 1 week. Pool wait: 1-6 months depending on category. PR application after ITA: 5-8 months. Total: 6-14 months to landing.",
        ],
      },
    ],
    why7Wings: [
      "Free CRS audit - we plug every legitimate point before you enter the pool.",
      "We track every category-based round in real time and time your profile entry around it.",
      "Parallel PNP applications where you qualify - a nomination adds 600 points and almost guarantees an ITA.",
      "Spouse-skill addition, NAATI and study credits - all the small wins that add up.",
    ],
    cta: { label: "Start my Canada PR", to: "/services/$slug", slug: "canada-pr" },
  },
  {
    slug: "australia-pr-state-nomination-cycle-fy26",
    title: "Australia PR FY26: Picking the right state can save you 12 months",
    excerpt: "NSW, Victoria, Queensland or South Australia - your choice of state nomination decides how fast your 190 or 491 visa lands.",
    date: "Apr 09, 2026",
    readTime: "7 min read",
    category: "Australia",
    author: "7 Wings Editorial",
    image: australia,
    intro:
      "Australia rewards skilled professionals with one of the strongest PR programs in the world - Medicare, free schooling for kids and a citizenship pathway after 4 years. The trick is choosing the right visa subclass and the right state.",
    sections: [
      {
        heading: "Which subclass fits you",
        paragraphs: [
          "Subclass 189 (Independent) - no state needed, but needs high points. Best for 90+ scorers.",
          "Subclass 190 (State Nominated) - adds 5 points and ties you to one state for 2 years.",
          "Subclass 491 (Regional) - adds 15 points and leads to permanent residency after 3 years in a regional area.",
        ],
      },
      {
        heading: "Which state to target in FY26",
        paragraphs: [
          "Victoria is fastest for tech (software, data, cyber). NSW is strongest for finance, accounting and consulting.",
          "South Australia and Tasmania are the easiest entry points for engineers via 491.",
          "Queensland is currently the most open for nurses and healthcare workers.",
        ],
      },
      {
        heading: "How long the whole process takes",
        paragraphs: [
          "Skills assessment (ACS / Engineers Australia / VETASSESS): 6-10 weeks. EOI to invitation: 1-6 months. Visa grant: 6-9 months. Total: 9-16 months.",
        ],
      },
    ],
    why7Wings: [
      "Free occupation and points audit - we tell you the exact subclass and state in one sitting.",
      "Skills assessment dossiers prepared in-house - ACS, Engineers Australia and VETASSESS.",
      "PTE / IELTS coaching partners to push your language score from 7 to 8 bands.",
      "End-to-end EOI, nomination, medicals, PCC and grant follow-up.",
    ],
    cta: { label: "Apply for Australia PR", to: "/services/$slug", slug: "australia-pr" },
  },
  {
    slug: "jss-program-relocation-checklist",
    title: "The JSS Program: How we get Hyderabad professionals job offers abroad",
    excerpt: "Job-Search Support is for ambitious professionals who want a real overseas offer first - and the migration paperwork second.",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    category: "JSS Program",
    author: "Relocation Desk",
    image: jss,
    intro:
      "Our JSS (Job-Search Support) Program is built for professionals who do not want to migrate blind. We rebuild your CV for international recruiters, run a targeted outreach campaign and walk you through interviews, offers and the right work permit - Germany, Australia, Canada, UAE and beyond.",
    sections: [
      {
        heading: "What is included",
        paragraphs: [
          "An ATS-friendly CV in the exact format recruiters in your target country actually screen with.",
          "LinkedIn rebuild plus a curated outreach campaign to verified recruiters and hiring managers.",
          "Mock interviews, salary benchmarking and offer-letter review before you sign anything.",
        ],
      },
      {
        heading: "Typical timeline",
        paragraphs: [
          "Week 1-2: discovery, CV and LinkedIn rebuild. Week 3-6: recruiter outreach and first interviews. Week 6-12: offers, negotiation and work-permit lodgement.",
          "Most clients see active interview pipelines within 60-90 days of joining.",
        ],
      },
      {
        heading: "Best-fit countries right now",
        paragraphs: [
          "Germany (IT, engineering, healthcare), UAE (finance, sales, hospitality), Australia and Canada for licensed professionals, Singapore and the UK for senior leadership roles.",
        ],
      },
    ],
    why7Wings: [
      "Senior-led process - you work with consultants who have actually placed people abroad.",
      "Milestone-linked fees - most of what you pay is tied to interviews and offers, not promises.",
      "We negotiate the offer on your behalf so you do not leave salary or relocation cost on the table.",
      "Post-arrival 90-day relocation support - banking, housing, schooling, taxes.",
    ],
    cta: { label: "Enrol in the JSS Program", to: "/services/$slug", slug: "jss-program" },
  },
];

// Backwards-compatible aliases
export const NEWS = BLOG;
export const BLOG_MAP = Object.fromEntries(BLOG.map((b) => [b.slug, b])) as Record<string, BlogPost>;
export const NEWS_MAP = BLOG_MAP;
export const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.slug, c])) as Record<string, (typeof COUNTRIES)[number]>;

export const PRICING = [
  {
    name: "Profile Assessment",
    price: "Free",
    cadence: "30-minute consultation",
    description: "Sit with a senior counsellor at our Hi-Tech City, Madhapur office or on video. Walk away with a written eligibility summary, country fit and next steps.",
    features: ["1:1 senior-led call", "Points and occupation scoring", "Written eligibility note", "Recommended pathway"],
    cta: "Book now",
    href: "/book-consultation",
    highlight: false,
  },
  {
    name: "Full Service Engagement",
    price: "Fixed-fee",
    cadence: "End-to-end immigration",
    description: "Full ownership of your file from documentation to visa grant. Includes attestation, translation, application lodgement and interview prep.",
    features: ["Dedicated case manager", "Document attestation & translation", "Application lodgement", "Visa interview coaching", "Pre-departure briefing"],
    cta: "Get a quote",
    href: "/contact",
    highlight: true,
  },
  {
    name: "JSS Program",
    price: "Milestone-linked",
    cadence: "Career-led migration",
    description: "Job-search support with CV rebuild, recruiter outreach, interview prep and offer negotiation — culminating in employer-sponsored relocation.",
    features: ["Global CV & LinkedIn rebuild", "Curated recruiter outreach", "Interview & negotiation prep", "Offer letter review", "Post-arrival 90-day support"],
    cta: "Apply for JSS",
    href: "/book-consultation",
    highlight: false,
  },
];

/* ───────── Country Programs (Featured Services tabs) ───────── */
export interface Program {
  slug: string;
  title: string;
  short: string;
  details?: {
    intro: string;
    sections: { heading: string; paragraphs: string[] }[];
    why7Wings: string[];
    faqs: { q: string; a: string }[];
  };
}

export interface CountryGroup {
  key: string;
  country: string;
  flag: string;
  headline: string;
  description: string;
  image: string;
  badge: string;
  programs: Program[];
}

export const COUNTRY_PROGRAMS: CountryGroup[] = [
  {
    key: "germany",
    country: "Germany",
    flag: "🇩🇪",
    badge: "Featured · Germany",
    headline: "Visa & Migration Services to Germany.",
    description:
      "The Chancenkarte (Opportunity Card) is engineered for skilled professionals who want to enter Germany on their own terms — even before securing an offer. Our scoring, ZAB recognition and document team make every point count.",
    image: "https://images.unsplash.com/photo-1554072675-66db59dba46f?auto=format&fit=crop&w=1600&q=80",
    programs: [
      {
        slug: "germany-opportunity-card",
        title: "Opportunity Card · Chancenkarte",
        short: "Points-based residence permit to enter Germany and seek work.",
        details: {
          intro:
            "Looking to move to Germany to search for work? The Opportunity Card (Chancenkarte) is a new German visa (Section 20a of the Residence Act) that lets qualified foreign workers enter Germany for up to 12 months to find employment or complete recognition training. Introduced in June 2024, it is designed for non-EU professionals (such as Indian nationals) without a job offer. During your stay you can attend interviews, work trials or part-time work (up to 20 hrs/week). Hyderabad-based 7 Wings Immigration helps Indian applicants navigate the Opportunity Card visa process from start to finish.",
          sections: [
            {
              heading: "Opportunity Card Visa Benefits",
              paragraphs: [
                "**Job-Search Stay:** Live in Germany for up to 12 months to hunt for skilled employment.",
                "**Flexible Work Trials:** Attend unpaid job trials or do part-time work (max 20 hrs/week) while you search.",
                "**Training for Qualification:** Start training to get your foreign degree or qualification recognised in Germany.",
                "**Pathway to Work Visa:** Once you find a job or get qualified, switch to a German Skilled Worker Visa or EU Blue Card.",
              ],
            },
            {
              heading: "Who is Eligible? (Key Requirements)",
              paragraphs: [
                "You must be a non-EU/EEA/Swiss national (e.g. an Indian citizen) and meet one of two routes:",
                "**Option 1 – Recognised Qualification:** Foreign vocational or academic degree fully recognised in Germany, or earned in Germany. You qualify as a \"skilled worker\" without needing points.",
                "**Option 2 – Points System (6+ points):** Without a fully recognised qualification, you must score at least 6 points and meet: a completed qualification recognised in your country of origin (with ANABIN / Zeugnisbewertung), German A1 or English B2 minimum, and proof of funds (blocked account ≈ €1,091/month in 2026).",
              ],
            },
            {
              heading: "Opportunity Card Points System (Option 2)",
              paragraphs: [
                "**Qualification Recognition (4 points):** Foreign qualification partially recognised in Germany.",
                "**Shortage Occupation (1 point):** Qualification on Germany's official shortage list (IT, engineering, healthcare).",
                "**Work Experience (2–3 points):** 2 pts for ≥2 yrs (last 5 yrs); 3 pts for ≥5 yrs (last 7 yrs).",
                "**German Language (1–3 points):** A2 = 1, B1 = 2, B2+ = 3.",
                "**English Language (1 point):** C1 or native.",
                "**Age (1–2 points):** 2 pts if ≤35, 1 pt if 36–40.",
                "**Previous Germany Stay (1 point):** 6+ continuous months legally in Germany in last 5 yrs.",
                "**Spouse's Qualification (1 point):** Partner also qualifies for the Opportunity Card.",
              ],
            },
            {
              heading: "How to Apply",
              paragraphs: [
                "**Visa Application:** Apply at the German Embassy/Consulate in India via the Federal Foreign Office Visa Portal with proof of qualifications, points, funds and certified translations.",
                "**Processing Time:** Approximately 4–6 weeks. Do not book flights until the visa is stamped.",
                "**After Arrival:** Receive a residence permit (job seeker) valid up to 12 months. Once you secure qualified employment, switch to a Skilled Worker Visa or EU Blue Card.",
              ],
            },
          ],
          why7Wings: [
            "We score your profile against the official BAMF matrix in the very first call - no guesswork.",
            "Full ZAB recognition support so your Indian degree is accepted in Germany.",
            "Notarised translation, blocked-account setup and health-insurance - handled in-house.",
            "Mock VFS interview before your appointment so nothing surprises you on the day.",
          ],
          faqs: [
            { q: "What is the Opportunity Card (Chancenkarte)?", a: "A German visa (AufenthG §20a) for eligible non-EU nationals to come to Germany for up to 12 months to search for a job or start qualification training. It requires either a fully recognised degree or at least 6 points in the points system." },
            { q: "Do I need a job offer to apply?", a: "No. The Opportunity Card is specifically for those without a job offer. It lets you enter Germany first, then look for work." },
            { q: "How do I get the required points?", a: "You accumulate points for qualifications, work experience, age, language, etc. For example, 4 points for a partially recognised degree, 3 points for 5+ years' experience." },
            { q: "What if I already studied in Germany?", a: "If you completed a degree or training in Germany, you can apply for a job seeker permit (18 months) immediately, with part-time work allowed." },
            { q: "How long is the Opportunity Card valid?", a: "Up to 12 months. If you find qualified work, switch to another visa before it expires. Otherwise, you must leave when the visa ends." },
            { q: "Can my spouse come with me?", a: "Yes, usually via family reunification. If your partner qualifies independently, it earns +1 point in the matrix." },
            { q: "What happens after I find a job in Germany?", a: "Apply to the local Foreigners Authority for a Skilled Worker Visa or Blue Card once you have a valid job offer and the required salary." },
            { q: "How can 7 Wings Immigration help?", a: "7 Wings Immigration (Hyderabad) offers free guidance and end-to-end support — document review, points scoring, recognition, and interview preparation." },
          ],
        },
      },
      {
        slug: "germany-skilled-worker-visa",
        title: "Skilled Worker Visa",
        short: "Long-term work visa for qualified professionals with a German job offer.",
        details: {
          intro:
            "The Germany Skilled Worker Visa (Fachkräfteeinwanderungsgesetz / §18a–18b AufenthG) is the primary long-stay residence permit for qualified non-EU professionals — including Indian engineers, IT specialists, nurses and skilled tradespeople — who already have a concrete job offer from a German employer. Modernised under the 2023–2024 Skilled Immigration Act, the visa now covers a much wider range of occupations, makes degree recognition simpler and allows three years of residence on first issue (or the length of your contract). As a leading Skilled Worker Visa consultant in Hyderabad, 7 Wings Immigration manages the full file — from ZAB Zeugnisbewertung and contract review to embassy submission and post-arrival registration — so your move to Germany is fast, compliant and stress-free.",
          sections: [
            {
              heading: "Why choose the Germany Skilled Worker Visa?",
              paragraphs: [
                "Germany is Europe's largest economy with a chronic shortage of more than 2 million skilled workers across IT, engineering, healthcare, construction and skilled trades. The Skilled Worker Visa is your direct, employer-backed route into that economy.",
                "**Three-year residence on first issue** — or the duration of your contract, whichever is shorter, with straightforward renewals.",
                "**Family included from day one** — spouses receive an open work permit and children are enrolled in free public schools.",
                "**Path to permanent residency in 21 months** if you reach German B1 (or 33 months at A1), and full citizenship in just 3–5 years under the 2024 nationality law.",
                "**No labour-market test for most regulated and shortage occupations**, so approvals are faster than employer-sponsored routes in many other countries.",
              ],
            },
            {
              heading: "Eligibility Requirements",
              paragraphs: [
                "**Recognised qualification** — either a German university degree, a foreign degree listed positively in the ANABIN database, or a vocational qualification of at least 2 years recognised by the relevant German authority.",
                "**Concrete job offer** from a German employer matching your qualification, with a signed employment contract or binding offer letter on file.",
                "**Minimum salary** of around €43,800 per year (2026 reference) for general skilled roles, with lower thresholds for shortage occupations and applicants under 45.",
                "**Health insurance** valid in Germany from the date of entry.",
                "**Adequate funds** to cover your initial weeks (proof of employment salary typically suffices).",
                "**Clean criminal record** and a valid passport with at least 12 months of remaining validity.",
                "Language: there is no fixed German level required for many roles, but A2–B1 is strongly recommended for regulated professions (nursing, teaching) and for daily life.",
              ],
            },
            {
              heading: "Documents Required (Checklist)",
              paragraphs: [
                "Valid Indian passport with at least 2 blank pages and ≥12 months validity.",
                "Two recent biometric photos (35 × 45 mm, EU standard).",
                "Completed long-stay national visa (D-visa) application form, signed in duplicate.",
                "Signed German employment contract or binding job offer mentioning salary, role and start date.",
                "Detailed CV (Lebenslauf) in reverse chronological order with no gaps.",
                "Degree certificates, mark-sheets and the positive ANABIN / ZAB Statement of Comparability.",
                "For regulated professions: official recognition decision (Anerkennungsbescheid).",
                "Experience letters, payslips and tax documents proving relevant work history.",
                "Proof of accommodation in Germany (employer letter, rental agreement or temporary hotel booking).",
                "Travel and expat health insurance covering at least the first 90 days.",
                "Visa fee payment receipt (currently €75 for adults, €37.50 for minors).",
                "Cover letter from the employer explaining the role and why you were selected.",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free eligibility & profile audit** with our Hyderabad senior counsellor — degree, occupation, salary band and timeline scored in writing.",
                "**2. Degree recognition** through ANABIN lookup and, where required, a ZAB Zeugnisbewertung application.",
                "**3. Job-search support** via our JSS program or contract review if you already have an offer.",
                "**4. Document compilation** — notarised translations into German, attestations and the full embassy file built to checklist.",
                "**5. VFS Germany appointment booking** in Hyderabad, Bengaluru or New Delhi, with a mock interview before the slot.",
                "**6. Visa decision in 4–12 weeks**, after which you collect your D-visa and travel to Germany.",
                "**7. Post-arrival registration** — Anmeldung (city registration), residence permit at the Ausländerbehörde, tax ID and bank account.",
              ],
            },
            {
              heading: "Benefits of the Skilled Worker Visa",
              paragraphs: [
                "**High salaries** — average €55,000–€85,000 for IT and engineering roles, with strong social benefits on top.",
                "**Universal healthcare** through statutory insurance for you and your family.",
                "**Free or low-cost public education** for children, including world-class universities.",
                "**Pension and unemployment cover** from your first contribution.",
                "**Schengen mobility** — visa-free travel across 29 European countries.",
                "**Clear long-term path** to permanent residency and EU citizenship.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**German embassy visa fee:** €75 (≈ ₹6,800).",
                "**ZAB Zeugnisbewertung:** €200 (one-time).",
                "**Notarised translations:** ₹15,000–₹25,000 depending on the document set.",
                "**Health insurance (first 90 days):** ₹6,000–₹12,000.",
                "**7 Wings full-service engagement:** disclosed in writing before you sign — fixed-fee, milestone based.",
                "**Total processing time:** 8–14 weeks from the VFS submission date in most cases.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Degree not listed on ANABIN or marked as not equivalent — fixable with a ZAB application before lodgement.",
                "Salary below the legal threshold for your age and occupation.",
                "Vague or non-binding employment contract missing role description, start date or salary.",
                "Insufficient or missing translations of education and experience documents.",
                "Gaps in CV not explained with supporting documentation.",
                "Health insurance that does not cover the full intended stay.",
                "Inconsistent dates between visa form, CV and degree certificates.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's trusted Skilled Worker Visa consultancy with senior-led case ownership.",
            "Free ANABIN check and ZAB recognition support before you spend on translations.",
            "Employer contract review against §18a/§18b compliance to avoid embassy queries.",
            "In-house notarised German translations and full document attestation.",
            "Mock VFS interview in Hyderabad before your appointment.",
            "Post-arrival Anmeldung, tax ID and bank account guidance during the first 30 days.",
            "Family applications (spouse + children) prepared in parallel, no extra coordination overhead.",
            "Transparent, fixed-fee engagement with a written refund policy.",
          ],
          faqs: [
            { q: "What is the Germany Skilled Worker Visa?", a: "It is a long-stay residence permit (§18a–18b AufenthG) that lets qualified non-EU nationals — including Indians — live and work in Germany under a concrete employment contract, with family rights and a clear path to permanent residency." },
            { q: "Do I need to speak German to apply?", a: "Not always. Many IT, engineering and English-language roles do not require German for the visa itself. However, A2–B1 German is recommended for daily life, mandatory for most regulated professions (e.g. nursing), and helps unlock higher-paying roles." },
            { q: "What is the minimum salary in 2026?", a: "Around €43,800 per year for general skilled roles, with reduced thresholds for shortage occupations and applicants under 45. We confirm the exact figure for your role and age band in your first call." },
            { q: "How long does the visa take to process?", a: "Typically 8–14 weeks from your VFS submission. Shortage occupations and pre-approved employers can land in as little as 4–6 weeks." },
            { q: "Can my spouse and children come with me?", a: "Yes. Your spouse receives an open work permit and children are enrolled in free public schools. We prepare the family file in parallel with your main application." },
            { q: "Is the Skilled Worker Visa a permanent residence?", a: "No — it is a 3-year residence permit (or the contract length). You can apply for permanent residency (Niederlassungserlaubnis) after 21 months with B1 German or 33 months with A1." },
            { q: "Do I need my degree recognised first?", a: "For most non-regulated jobs an ANABIN-listed degree is enough. Regulated professions (medicine, law, nursing, teaching, some engineering) require a formal recognition decision before the visa is granted." },
            { q: "What happens if my employer cancels the contract?", a: "You have up to 12 months to find a new qualifying job in Germany without losing your residence status. We support clients through this transition." },
            { q: "Can I switch from an Opportunity Card to a Skilled Worker Visa?", a: "Yes. Once you secure a qualifying job offer in Germany, you can switch directly at the local Ausländerbehörde without leaving the country." },
            { q: "Why apply through 7 Wings Immigration in Hyderabad?", a: "We are a senior-led Hyderabad consultancy with deep expertise in German immigration law, ZAB/ANABIN recognition, VFS workflows and post-arrival settlement. Fixed-fee, transparent and end-to-end — from your first call to your Anmeldung in Germany." },
          ],
        },
      },
      {
        slug: "germany-eu-blue-card",
        title: "EU Blue Card",
        short: "Fast-track residence for high-earning specialists across the EU.",
        details: {
          intro:
            "The EU Blue Card Germany is the EU's flagship residence permit for highly qualified non-EU professionals with a university degree and a well-paid German job offer. Issued under §18b(2) AufenthG, it offers the fastest route to permanent residency in Germany (21 months with B1, 27 months with A1), full family rights, and the ability to move and work across most EU countries after 12 months. Under the 2024 reforms, salary thresholds were significantly lowered, IT specialists without a degree can now qualify, and recent graduates get easier entry. 7 Wings Immigration in Hyderabad is one of India's most experienced EU Blue Card consultants — we score, position and lodge Blue Card applications with a near-perfect approval rate.",
          sections: [
            {
              heading: "Why choose the EU Blue Card?",
              paragraphs: [
                "**Fastest PR in Germany** — 21 months with B1 German (or 27 with A1).",
                "**EU mobility** — after 12 months you can relocate to other EU member states with a streamlined process.",
                "**Higher salaries** — Blue Card thresholds attract the top employers in IT, engineering, finance, life sciences and management.",
                "**Family advantages** — spouse gets an unrestricted work permit without German language requirements; children join free public schools.",
                "**Citizenship in 3–5 years** under the new 2024 nationality law.",
                "**Easier renewals and re-entry** compared to the standard Skilled Worker Visa.",
              ],
            },
            {
              heading: "Eligibility Requirements (2026)",
              paragraphs: [
                "**University degree** — German degree, foreign degree recognised in ANABIN as H+ equivalent, or a degree obtained after at least 3 years of study.",
                "**Concrete German employment contract** of at least 6 months matching your qualification.",
                "**Minimum gross annual salary (2026):** approximately €48,300 for general professions and €43,759 for shortage occupations (IT, STEM, medicine, mathematics, natural sciences, manufacturing engineers, architects, teachers, nurses).",
                "**IT specialists without a degree** can qualify with at least 3 years of relevant professional experience gained in the last 7 years.",
                "**Recent graduates (within 3 years of graduation)** benefit from the reduced shortage-occupation salary threshold across all roles.",
                "Valid passport, clean record and German-compatible health insurance from day one.",
              ],
            },
            {
              heading: "Documents Required",
              paragraphs: [
                "Valid Indian passport (≥12 months validity, 2 blank pages).",
                "Two biometric photos (EU standard).",
                "Completed national D-visa application form (in duplicate).",
                "Signed German employment contract or binding offer with salary breakdown.",
                "University degree certificate + transcripts + ANABIN H+ printout or ZAB Statement of Comparability.",
                "Detailed Lebenslauf (CV) with no unexplained gaps.",
                "Experience letters, payslips and tax records.",
                "Proof of health insurance valid from arrival.",
                "Proof of accommodation in Germany.",
                "Demand letter / cover letter from the German employer.",
                "Visa fee receipt (€75 adults).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free Blue Card eligibility scoring** at our Hyderabad office — salary, occupation, ANABIN status confirmed in writing.",
                "**2. ANABIN H+ verification or ZAB Zeugnisbewertung** if your degree is not already listed.",
                "**3. Contract review** to confirm §18b(2) compliance and salary threshold for your shortage / non-shortage category.",
                "**4. Document compilation** — German translations, attestations, employer demand letter prepared.",
                "**5. VFS appointment booking** in Hyderabad/Bengaluru/Delhi + mock interview.",
                "**6. Embassy decision in 4–8 weeks** (Blue Cards are prioritised over standard work visas).",
                "**7. Post-arrival registration** — Anmeldung, residence permit, blocked-account refund (if used), tax ID.",
              ],
            },
            {
              heading: "Benefits of the EU Blue Card",
              paragraphs: [
                "**21-month PR pathway** with B1 — the fastest in Europe.",
                "**Spouse open work permit** with zero German language requirement.",
                "**EU-wide mobility** after one year of residence in Germany.",
                "**Shorter absence rules** — you can spend up to 12 months outside Germany without losing the card.",
                "**Easier path to long-term EU residence** (Daueraufenthalt-EU) recognised in 24 EU countries.",
                "**Top-tier employer access** — Blue Card thresholds attract the biggest names in DAX-listed corporates and global tech.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75.",
                "**ZAB / ANABIN check:** €200 if a Statement of Comparability is needed.",
                "**Translations:** ₹15,000–₹25,000.",
                "**Health insurance:** ₹6,000–₹12,000 for the first 90 days.",
                "**7 Wings engagement:** fixed fee, disclosed before you sign.",
                "**Total processing time:** 4–8 weeks from VFS submission.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Salary below the relevant 2026 threshold (general or shortage category).",
                "Degree not recognised as H+ in ANABIN and no ZAB report submitted.",
                "Job role does not match the field of study (e.g. mechanical engineer applying for an unrelated finance role).",
                "Contract too short (under 6 months) or not signed by both parties.",
                "Missing or inadequate health insurance.",
                "Inconsistencies between CV, contract and degree dates.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's premier EU Blue Card consultancy with senior-led casework.",
            "Free ANABIN H+ check and shortage-occupation salary scoring in your first call.",
            "Contract redlining against §18b(2) before you sign — avoids costly rejections.",
            "In-house German translations, ZAB liaison and attestation.",
            "Mock VFS interview tailored to Blue Card-specific questions.",
            "Family file (spouse + kids) lodged in parallel — no waiting for reunification.",
            "Post-arrival Anmeldung, residence-permit appointment booking and tax-ID support.",
            "Strategic guidance on PR conversion at 21/27 months and EU mobility after year one.",
          ],
          faqs: [
            { q: "What is the EU Blue Card Germany?", a: "It is a fast-track residence and work permit under §18b(2) AufenthG for highly qualified non-EU professionals — designed to attract top talent in IT, engineering, science, medicine and management — with EU mobility and a 21-month PR pathway." },
            { q: "What is the minimum salary in 2026?", a: "Approximately €48,300 per year for general professions and €43,759 for shortage occupations (IT, STEM, medicine, engineering, teaching, nursing). Recent graduates and IT specialists get further concessions." },
            { q: "Do IT professionals need a degree?", a: "Not necessarily. From November 2023, IT specialists with at least 3 years of comparable professional experience in the last 7 years can qualify for the Blue Card without a formal degree." },
            { q: "How fast can I get permanent residency?", a: "21 months with B1 German, 27 months with A1 — the fastest PR path in Germany." },
            { q: "Can my spouse work in Germany on a Blue Card?", a: "Yes. Your spouse receives a residence permit with full, unrestricted work rights and is not required to demonstrate German language skills." },
            { q: "Can I move to another EU country with a German Blue Card?", a: "Yes. After 12 months of residence in Germany, you can apply for a Blue Card in another EU member state under a simplified procedure." },
            { q: "How long does the application take?", a: "Typically 4–8 weeks at the German embassy in India — faster than a standard Skilled Worker Visa." },
            { q: "What if my salary is below the threshold?", a: "We assess whether your role qualifies as a shortage occupation, whether you qualify as a recent graduate, or whether the Skilled Worker Visa is a better fit." },
            { q: "Can I switch from the Opportunity Card to a Blue Card?", a: "Yes, in-country. Once you secure a qualifying job offer in Germany, you apply for the Blue Card at your local Ausländerbehörde without returning to India." },
            { q: "Why apply through 7 Wings Immigration?", a: "We are one of India's most experienced EU Blue Card consultancies with near-perfect approval rates, senior-led handling and Hyderabad-based in-person support throughout the journey." },
          ],
        },
      },
      {
        slug: "germany-job-seeker-visa",
        title: "Job Seeker Visa",
        short: "Six-month visa to search for a qualifying role on the ground.",
        details: {
          intro:
            "The Germany Job Seeker Visa (§20 AufenthG) is a long-stay visa that allows qualified non-EU nationals — including Indians — to enter Germany for up to 6 months to search for skilled employment in person. Unlike the new Opportunity Card, the classic Job Seeker Visa does not require a points score: it requires a recognised qualification, proof of funds and a serious job-search plan. Once you secure a qualifying offer, you switch in-country to a Skilled Worker Visa or EU Blue Card without leaving Germany. 7 Wings Immigration in Hyderabad has guided hundreds of Indian professionals through the Job Seeker Visa — from ZAB recognition to a fully-prepared CV strategy on the ground in Germany.",
          sections: [
            {
              heading: "Why choose the Job Seeker Visa?",
              paragraphs: [
                "**6 months on the ground** to attend interviews, network and meet employers face to face — a huge advantage over remote job hunting.",
                "**No job offer required** before entering Germany.",
                "**In-country conversion** to a Skilled Worker Visa or EU Blue Card the moment you sign a contract.",
                "**Stay in any city** — Berlin, Munich, Frankfurt, Hamburg, Stuttgart — wherever your interviews are.",
                "**A serious signal to employers** that you are ready to relocate immediately, often beating remote candidates to the offer.",
              ],
            },
            {
              heading: "Eligibility Requirements",
              paragraphs: [
                "**University degree** (Bachelor's, Master's or PhD) recognised in Germany via ANABIN or a ZAB Statement of Comparability — OR a recognised German vocational qualification.",
                "**Minimum 5 years of relevant work experience** is strongly preferred, though not always mandatory.",
                "**Proof of funds** for the entire stay — typically a blocked account of around €6,546 (€1,091 × 6 months, 2026 reference) or formal sponsorship.",
                "**Travel and expat health insurance** valid in Germany for the full 6 months.",
                "**Accommodation proof** for the initial weeks (hotel, Airbnb, friend's address).",
                "**Motivation letter and job-search plan** showing how you will use the 6 months.",
                "**No specific German language level** is mandatory, but A2–B1 dramatically improves your job-search outcomes.",
              ],
            },
            {
              heading: "Documents Required (Checklist)",
              paragraphs: [
                "Valid Indian passport (≥12 months validity, 2 blank pages).",
                "Two biometric photos (EU standard).",
                "Completed national D-visa application form, signed in duplicate.",
                "Cover/motivation letter explaining your career plan in Germany.",
                "University degree + mark-sheets + ANABIN printout or ZAB Statement of Comparability.",
                "Detailed Lebenslauf (CV) in reverse-chronological order.",
                "Work experience letters, payslips and tax records.",
                "Blocked account confirmation (Sperrkonto) or formal sponsorship letter.",
                "Travel and health insurance valid for 6 months in Germany.",
                "Proof of accommodation for the initial stay.",
                "Job-search plan — companies you will target, sectors, recruiters.",
                "Visa fee receipt (€75).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free profile review** at our Hyderabad office — degree, occupation and funds checked against §20 AufenthG.",
                "**2. ZAB / ANABIN recognition** of your Indian degree.",
                "**3. Sperrkonto setup** (Fintiba, Expatrio or Deutsche Bank) of around €6,546.",
                "**4. CV & cover-letter rebuild** in the German format recruiters actually screen.",
                "**5. Document compilation, translation and attestation.**",
                "**6. VFS appointment in Hyderabad / Bengaluru / Delhi** with mock interview.",
                "**7. Visa decision in 4–8 weeks**, after which you fly to Germany.",
                "**8. On-the-ground support** — Anmeldung, recruiter outreach and in-country conversion to Skilled Worker Visa once you sign a contract.",
              ],
            },
            {
              heading: "Benefits of the Job Seeker Visa",
              paragraphs: [
                "**Face-to-face interviews** dramatically improve offer rates compared to remote applications.",
                "**Live in Germany legally** for 6 months while networking and exploring cities.",
                "**Direct switch to a long-term work visa** once you have an offer — no need to leave.",
                "**Builds local references** (recruiters, mentors, professional groups) that pay off long after the visa expires.",
                "**Lower risk than relocating after signing** — you assess salary, city and lifestyle before committing.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75.",
                "**Blocked account:** €6,546 refundable (you withdraw it after arrival).",
                "**Health insurance (6 months):** ₹20,000–₹35,000.",
                "**ZAB Zeugnisbewertung:** €200 (if needed).",
                "**Translations and attestation:** ₹15,000–₹25,000.",
                "**7 Wings engagement:** fixed fee disclosed in writing before signing.",
                "**Processing time:** 4–8 weeks at the German embassy.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Degree not recognised in ANABIN and no ZAB report attached.",
                "Insufficient funds in the blocked account or unclear source of funds.",
                "Vague or generic motivation letter that does not show a real job-search strategy.",
                "Health insurance that does not meet German embassy standards.",
                "Mismatch between work experience and the target occupation.",
                "No clear plan for what happens if a job is not found within 6 months.",
                "Previous Schengen visa rejections not disclosed.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's most experienced Job Seeker Visa team — hundreds of successful cases.",
            "Free ANABIN check and ZAB recognition handled in-house.",
            "Sperrkonto setup with all major providers (Fintiba, Expatrio, Deutsche Bank).",
            "German-style CV and cover-letter rebuild that recruiters in DACH actually respond to.",
            "Mock VFS interview before your appointment.",
            "On-the-ground introductions to recruiters in Berlin, Munich, Frankfurt and Hamburg.",
            "In-country support for converting to a Skilled Worker Visa or EU Blue Card once you sign.",
            "Transparent, fixed-fee engagement with a written refund policy.",
          ],
          faqs: [
            { q: "What is the Germany Job Seeker Visa?", a: "A long-stay visa (§20 AufenthG) that lets qualified non-EU professionals enter Germany for up to 6 months to search for skilled employment in person and switch to a work visa once they secure an offer." },
            { q: "How long is the visa valid?", a: "Up to 6 months. If you don't find a qualifying job, you must leave Germany. If you do, you switch to a Skilled Worker Visa or EU Blue Card from inside Germany." },
            { q: "Do I need German language skills?", a: "Not legally for the visa itself. But A2–B1 German dramatically improves your job-search outcomes and is required for many regulated professions." },
            { q: "How much money do I need to show?", a: "Approximately €6,546 in a German blocked account for 2026 (€1,091 × 6 months), or a formal sponsorship of equivalent value." },
            { q: "Can I work during the Job Seeker Visa?", a: "No paid employment is allowed on the classic Job Seeker Visa. You may attend unpaid trial days. If you need part-time work rights while job-hunting, consider the Opportunity Card instead." },
            { q: "Can my family come with me?", a: "Family reunification is not usually possible on the Job Seeker Visa. Once you switch to a Skilled Worker Visa or Blue Card, you can sponsor your spouse and children." },
            { q: "What happens after I get a job offer?", a: "You apply for a Skilled Worker Visa or EU Blue Card at the local Ausländerbehörde without leaving Germany — typically processed in 2–6 weeks." },
            { q: "Is the Job Seeker Visa better than the Opportunity Card?", a: "Both serve different profiles. The Job Seeker Visa is ideal if you have a strong degree and don't need part-time work; the Opportunity Card allows up to 20 hours of work per week while you job-hunt. We help you choose in your first consultation." },
            { q: "How long does processing take?", a: "Typically 4–8 weeks at the German embassy after your VFS submission in India." },
            { q: "Why apply through 7 Wings Immigration in Hyderabad?", a: "We've handled hundreds of Job Seeker Visa applications with senior-led counsel, in-house translations, recruiter introductions in Germany and full in-country conversion support." },
          ],
        },
      },
      {
        slug: "germany-work-permit",
        title: "Germany Work Permit",
        short: "Employer-sponsored work authorisation under German labour rules.",
        details: {
          intro:
            "A Germany Work Permit is the umbrella term for any employer-sponsored authorisation that allows a non-EU national — including Indian professionals and skilled workers — to legally work in Germany. The most common routes are the §18a/§18b Skilled Worker Visa, the EU Blue Card, the ICT Card for intra-company transferees, the Researcher Permit (§18d) and short-term work visas for specific sectors. Under the modernised Skilled Immigration Act, Germany's work-permit framework is now one of the most open and predictable in Europe. 7 Wings Immigration in Hyderabad helps you identify the exact work-permit route that fits your offer, salary and qualification — and runs the full file from contract review to embassy submission.",
          sections: [
            {
              heading: "Why work in Germany?",
              paragraphs: [
                "**Europe's largest economy** with chronic shortages across IT, engineering, healthcare, construction, logistics and skilled trades.",
                "**Strong worker protections** — paid leave (24+ days), parental leave, sick pay, statutory health insurance.",
                "**Average annual salary** for skilled workers €55,000–€85,000+ depending on sector and city.",
                "**Family rights** from day one — spouse work permit, free public schools.",
                "**Path to permanent residency** in 21–48 months depending on visa type and language level.",
                "**Citizenship in 3–5 years** under the 2024 nationality law.",
              ],
            },
            {
              heading: "Types of Germany Work Permits",
              paragraphs: [
                "**Skilled Worker Visa (§18a / §18b AufenthG)** — for non-EU professionals with a recognised qualification and a German job offer.",
                "**EU Blue Card (§18b(2))** — for highly qualified professionals meeting the salary threshold (approx. €48,300 general, €43,759 shortage occupations in 2026).",
                "**ICT Card** — for intra-company transferees from a multinational's overseas office to its German entity.",
                "**Researcher Permit (§18d)** — for researchers with a hosting agreement at a recognised German research institution.",
                "**Seasonal Work / Short-term Permits** — for hospitality, agriculture and event-based work up to 90 days.",
                "**Self-Employment Visa (§21)** — for entrepreneurs and freelancers with an approved business plan and proof of funds.",
              ],
            },
            {
              heading: "Eligibility Requirements",
              paragraphs: [
                "**Concrete job offer / employment contract** from a German employer.",
                "**Recognised qualification** matching the role — academic degree (ANABIN) or vocational qualification (BIBB).",
                "**Salary** at or above the legal minimum for your visa category and age.",
                "**Health insurance** valid in Germany from arrival.",
                "**Clean criminal record** and valid passport.",
                "For some roles, **approval from the Federal Employment Agency (BA)** is required — handled by your employer.",
              ],
            },
            {
              heading: "Documents Required",
              paragraphs: [
                "Valid Indian passport (≥12 months validity).",
                "Two biometric photos.",
                "Completed long-stay D-visa application form (in duplicate).",
                "Signed employment contract with role, salary and start date.",
                "Degree certificates + ANABIN printout or ZAB Statement of Comparability.",
                "Detailed CV (Lebenslauf).",
                "Experience letters, payslips and tax records.",
                "Pre-approval from the Federal Employment Agency (where applicable).",
                "Health insurance covering the first 90 days in Germany.",
                "Proof of accommodation in Germany.",
                "Cover letter from the employer.",
                "Visa fee receipt (€75).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free work-permit pathway assessment** at our Hyderabad office.",
                "**2. Degree recognition** via ANABIN or a formal ZAB Zeugnisbewertung.",
                "**3. Employer pre-checks** — contract review, salary banding, BA approval if applicable.",
                "**4. Document pack** — translations, attestations, health insurance.",
                "**5. VFS appointment** in Hyderabad, Bengaluru or Delhi with a mock interview.",
                "**6. Embassy decision in 4–12 weeks**.",
                "**7. Post-arrival registration** — Anmeldung, residence permit, tax ID, bank account.",
              ],
            },
            {
              heading: "Benefits of a Germany Work Permit",
              paragraphs: [
                "**High salaries with strong social security cover.**",
                "**Family inclusion** — spouse work permit, free public schools.",
                "**Universal healthcare** through statutory insurance.",
                "**Pension and unemployment contributions** from your first month.",
                "**EU travel freedom** under the Schengen agreement.",
                "**Clear PR and citizenship pathway** — 21–48 months to PR depending on visa type and language.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75.",
                "**ZAB recognition:** €200 (if needed).",
                "**Translations and attestation:** ₹15,000–₹25,000.",
                "**Health insurance:** ₹6,000–₹12,000 (first 90 days).",
                "**7 Wings fixed-fee engagement:** disclosed in writing before signing.",
                "**Total processing time:** typically 8–14 weeks from VFS submission.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Qualification not recognised for the offered role.",
                "Salary below the legal minimum for the visa category.",
                "Contract too vague — missing role, salary or start date.",
                "Missing BA approval for sectors requiring labour-market consent.",
                "Inadequate health insurance.",
                "Inconsistencies between visa form, CV and supporting documents.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's trusted Germany Work Permit consultancy with senior-led casework.",
            "Free pathway assessment — Skilled Worker, Blue Card, ICT, Researcher or Self-Employment.",
            "Employer contract redlining for §18a/§18b compliance.",
            "Full ZAB / ANABIN recognition support in-house.",
            "BA (Federal Employment Agency) coordination where needed.",
            "Notarised translations and complete document attestation.",
            "Mock VFS interviews in Hyderabad with role-specific Q&A.",
            "Post-arrival Anmeldung, residence-permit appointment and tax-ID support.",
          ],
          faqs: [
            { q: "What is a Germany Work Permit?", a: "It is any employer-sponsored authorisation — Skilled Worker Visa, EU Blue Card, ICT Card, Researcher Permit or short-term work visa — that lets a non-EU national legally work in Germany." },
            { q: "Which Germany work visa is right for me?", a: "It depends on your qualification, salary, role and employer. We map your profile against all available routes in a free consultation at our Hyderabad office." },
            { q: "Do I need a job offer first?", a: "Yes, for any work permit. If you do not have an offer yet, the Opportunity Card or Job Seeker Visa lets you enter Germany to find one." },
            { q: "How long does the work permit last?", a: "Typically 1–4 years on first issue, renewable, with a path to permanent residency after 21–48 months depending on visa type and German language level." },
            { q: "Do I need to speak German?", a: "Not always for the visa itself, but A2–B1 German is recommended for daily life and required for many regulated professions." },
            { q: "Can my family join me?", a: "Yes. Most German work permits allow your spouse to receive an open work permit and children to access free public schools." },
            { q: "What is the cost?", a: "The German visa fee is €75. Additional costs include ZAB recognition (€200), translations, insurance and our fixed-fee professional engagement, all disclosed before you sign." },
            { q: "How long does processing take?", a: "Typically 8–14 weeks from your VFS submission in India. Blue Card and shortage-occupation cases can be faster." },
            { q: "Can I switch jobs in Germany?", a: "Yes. After your first year, switching employers is straightforward; before that, you usually need approval from the Ausländerbehörde." },
            { q: "Why apply through 7 Wings Immigration?", a: "We are a senior-led Hyderabad consultancy with deep expertise across every German work-visa route, employer contract review and end-to-end documentation. Fixed-fee, transparent and high-success." },
          ],
        },
      },
      {
        slug: "germany-student-visa",
        title: "Germany Student Visa",
        short: "Visa for full-time studies at recognised German universities.",
        details: {
          intro:
            "The Germany Student Visa (§16b AufenthG) is the long-stay national visa for non-EU students — including Indians — admitted to full-time study at a recognised German university. With over 130 globally ranked universities, predominantly tuition-free public education, and a clear post-study work and PR pathway, Germany has become one of the top study destinations for Indian students. The visa typically grants up to 2 years of stay (renewable for the duration of your programme), includes 120 full or 240 half days of work per year, and converts smoothly into an 18-month post-study Job Seeker Permit or an EU Blue Card. 7 Wings Immigration in Hyderabad is a trusted Germany student-visa consultant — we shortlist universities, build APS-compliant files, set up blocked accounts and handle VFS submissions end-to-end.",
          sections: [
            {
              heading: "Why study in Germany?",
              paragraphs: [
                "**Tuition-free public universities** for most undergraduate and many postgraduate programmes — only a small semester contribution (€150–€350).",
                "**World-class education** — TU Munich, RWTH Aachen, Heidelberg, LMU Munich and 35+ universities in the global top 500.",
                "**English-taught Master's programmes** in engineering, IT, business and life sciences.",
                "**Work rights** — 120 full or 240 half days per year while studying.",
                "**18-month post-study Job Seeker Permit** to find graduate-level employment.",
                "**Direct path to PR** within 21–33 months after starting work.",
              ],
            },
            {
              heading: "Eligibility Requirements",
              paragraphs: [
                "**University admission letter** (Zulassungsbescheid) from a recognised German higher-education institution.",
                "**APS Certificate** (Akademische Prüfstelle) — mandatory for Indian applicants since November 2022, verifying your prior academic documents.",
                "**Academic qualifications** equivalent to a German Hochschulzugangsberechtigung (HZB) — typically a 4-year Bachelor's for Master's entry, or a 1-year Studienkolleg for Bachelor's entry after 12th.",
                "**Language proficiency** — IELTS 6.5+ or TOEFL iBT 88+ for English-taught programmes; TestDaF/DSH C1 or Goethe B2 for German-taught programmes.",
                "**Proof of funds** — blocked account of €11,904 (€992 × 12 months, 2026 reference) or formal scholarship/parental guarantee.",
                "**Health insurance** valid in Germany (public scheme for under-30s).",
                "**Valid passport, clean record and motivation letter.**",
              ],
            },
            {
              heading: "Documents Required (Checklist)",
              paragraphs: [
                "Valid Indian passport (≥12 months validity).",
                "Two biometric photos (EU standard).",
                "Completed long-stay D-visa application form (in duplicate).",
                "University admission letter (Zulassungsbescheid).",
                "APS Certificate from the German Embassy New Delhi.",
                "Academic transcripts, mark-sheets and degree certificates.",
                "IELTS / TOEFL / TestDaF / Goethe certificate.",
                "Blocked account confirmation (Sperrkonto) of €11,904.",
                "Health insurance valid in Germany.",
                "Detailed CV and motivation letter.",
                "Accommodation proof (dorm, rental or temporary).",
                "Visa fee receipt (€75).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free university and course shortlisting** at our Hyderabad office — based on your profile, budget and career goals.",
                "**2. APS application** and document verification through the German Embassy New Delhi.",
                "**3. University application** to up to 8 programmes via uni-assist or directly.",
                "**4. Admission letter (Zulassungsbescheid)** received from your chosen university.",
                "**5. Blocked account setup** (Fintiba, Expatrio, Coracle, Deutsche Bank).",
                "**6. Document pack** — translations, attestation, health insurance and motivation letter.",
                "**7. VFS appointment in Hyderabad/Bengaluru/Delhi** with mock interview.",
                "**8. Visa decision in 6–12 weeks**, after which you travel to Germany and complete Anmeldung and residence-permit registration.",
              ],
            },
            {
              heading: "Benefits of the Germany Student Visa",
              paragraphs: [
                "**No tuition fees** at public universities for most programmes.",
                "**Work rights** of 120 full / 240 half days per year (raised under the 2024 reforms).",
                "**18-month Job Seeker Permit** after graduation to find skilled employment.",
                "**Direct route to PR** through Skilled Worker Visa or Blue Card after employment.",
                "**Bring your dependents** under certain conditions.",
                "**Schengen travel** while you study.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75.",
                "**APS Certificate:** €260 (one-time).",
                "**Blocked account:** €11,904 refundable monthly after arrival.",
                "**Health insurance:** ₹65,000–₹85,000/year (public scheme for under-30s).",
                "**Translations & attestation:** ₹15,000–₹25,000.",
                "**7 Wings end-to-end engagement:** fixed fee disclosed in writing.",
                "**Processing time:** 6–12 weeks from VFS submission.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Missing or invalid APS Certificate (mandatory since Nov 2022).",
                "Insufficient blocked-account funds or unclear source of funds.",
                "Weak or generic motivation letter without genuine course-fit reasoning.",
                "Language scores below the programme's requirement.",
                "Health insurance not compliant with German standards.",
                "Gaps in academic history not properly explained.",
                "Inconsistencies between Zulassungsbescheid and visa application.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's trusted Germany student-visa consultancy with hundreds of admits.",
            "Free university and course shortlisting based on your profile and career goals.",
            "APS application support — done right the first time.",
            "uni-assist applications and direct university applications handled end-to-end.",
            "Blocked account setup with all major German providers.",
            "Motivation letter and CV rebuild in the German academic style.",
            "Mock VFS interview tailored to student-visa Q&A.",
            "Post-arrival Anmeldung, residence-permit appointment and student-insurance enrolment.",
          ],
          faqs: [
            { q: "What is the Germany Student Visa?", a: "It is a long-stay national visa (§16b AufenthG) for non-EU students admitted to full-time study at a recognised German university — granting up to 2 years of stay, renewable, with work rights and a 18-month post-study Job Seeker Permit." },
            { q: "Is the APS Certificate mandatory?", a: "Yes — since November 2022, Indian applicants must have a valid APS Certificate from the German Embassy New Delhi before submitting a student visa application." },
            { q: "How much money do I need in the blocked account?", a: "Approximately €11,904 for 2026 (€992 × 12 months). You withdraw it monthly after arrival in Germany." },
            { q: "Are German public universities free for Indians?", a: "Yes, most undergraduate and many postgraduate programmes at public universities have no tuition fees — only a small semester contribution (€150–€350) that covers transport and student services." },
            { q: "Can I work while studying?", a: "Yes. International students can work 120 full days or 240 half days per year. Working as a student research/teaching assistant is unlimited if approved by the university." },
            { q: "Do I need German language skills?", a: "For English-taught programmes, IELTS 6.5+ or TOEFL iBT 88+ is usually enough. For German-taught programmes, TestDaF or DSH at C1 (or Goethe B2 in some cases) is required." },
            { q: "What happens after I graduate?", a: "You receive an 18-month Job Seeker Permit to find graduate-level employment. Once you secure an offer, you switch to a Skilled Worker Visa or EU Blue Card." },
            { q: "How long does the visa process take?", a: "Typically 6–12 weeks at the German embassy after your VFS submission in India." },
            { q: "Can my spouse join me on a student visa?", a: "Yes, in many cases, through family reunification — provided you can demonstrate sufficient income, larger accommodation and (for the spouse) basic German language skills." },
            { q: "Why apply through 7 Wings Immigration in Hyderabad?", a: "We provide free university shortlisting, APS support, blocked-account setup, document attestation and mock VFS interviews — with senior-led ownership and post-arrival settlement support in Germany." },
          ],
        },
      },
      {
        slug: "germany-family-reunion-visa",
        title: "Family Reunion Visa",
        short: "Bring your spouse and children to Germany with full work and school rights.",
        details: {
          intro:
            "The Germany Family Reunion Visa (Familienzusammenführung, §27–36a AufenthG) lets the spouse, registered partner and minor children of a German resident or citizen relocate to Germany on a long-stay national visa. Once granted, family members typically receive a residence permit with full work rights (open work permit for the spouse), access to free public schools and statutory health insurance for children. The process favours holders of the EU Blue Card and Skilled Worker Visa — many of the usual language and waiting requirements are waived. 7 Wings Immigration in Hyderabad helps Indian families plan and lodge reunion-visa applications in parallel with the main applicant's visa, so the whole family lands in Germany together.",
          sections: [
            {
              heading: "Why apply for a Family Reunion Visa?",
              paragraphs: [
                "**Keep your family together** in Germany — spouse, registered partner and children under 18.",
                "**Spouse open work permit** — full, unrestricted right to work for any employer.",
                "**Free public schools** for children from the day of enrolment.",
                "**Statutory health insurance** for the whole family.",
                "**Path to PR** for family members alongside the main applicant.",
                "**No waiting period** for Blue Card and many Skilled Worker Visa holders — apply from day one.",
              ],
            },
            {
              heading: "Who Can Be Reunited?",
              paragraphs: [
                "**Spouse or registered partner** of a German resident or citizen.",
                "**Minor unmarried children** (under 18) of a German resident or citizen.",
                "**Parents** of a German citizen minor child (limited cases).",
                "**Other family members** only in cases of exceptional hardship.",
              ],
            },
            {
              heading: "Eligibility Requirements",
              paragraphs: [
                "**Valid German residence permit** of the main applicant — Skilled Worker Visa, Blue Card, Researcher, PR holder, or German citizen.",
                "**Marriage certificate** (apostilled) at least 12 months old in some cases — though many waivers apply for Blue Card/Skilled Worker visas.",
                "**Spouse German language A1** — waived for spouses of Blue Card holders, Skilled Workers (in many cases), highly qualified researchers and Germans returning from abroad.",
                "**Adequate housing** in Germany for the family (square-metre rules per family member).",
                "**Sufficient income** to support the family without recourse to public funds.",
                "**Statutory health insurance** for all family members from arrival.",
                "Children must be unmarried and under 18.",
              ],
            },
            {
              heading: "Documents Required (Checklist)",
              paragraphs: [
                "Valid Indian passports for each applicant (≥12 months validity).",
                "Two biometric photos per applicant.",
                "Completed long-stay D-visa application forms in duplicate.",
                "Apostilled marriage certificate (for spouse).",
                "Apostilled birth certificates (for children).",
                "Copy of the main applicant's German residence permit / passport.",
                "Main applicant's employment contract and recent payslips.",
                "Proof of accommodation in Germany (rental contract or owner declaration).",
                "Health insurance for all family members.",
                "Spouse's A1 German certificate (where required).",
                "School enrolment letters or planned schools for children.",
                "Visa fees (€75 per adult, €37.50 per minor).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free family-reunion eligibility check** at our Hyderabad office — based on the main applicant's visa type and family composition.",
                "**2. Document apostille** for marriage and birth certificates (MEA, India).",
                "**3. A1 German enrolment for spouse** if not exempt — we coordinate with Goethe-Institut or accredited online providers.",
                "**4. Accommodation and income proof** assembly with the main applicant's German employer.",
                "**5. VFS appointment in Hyderabad / Bengaluru / Delhi** for the whole family.",
                "**6. Embassy decision in 6–12 weeks**, often aligned with the main applicant's visa.",
                "**7. Post-arrival registration** — Anmeldung, residence permit, school enrolment, family health insurance.",
              ],
            },
            {
              heading: "Benefits of the Family Reunion Visa",
              paragraphs: [
                "**Spouse open work permit** — no occupation restriction.",
                "**Free public schools and child benefits** (Kindergeld).",
                "**Statutory health insurance** for the entire family.",
                "**Independent residence after 3 years** for the spouse.",
                "**PR and citizenship pathway** aligned with the main applicant.",
                "**Schengen mobility** for the whole family.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75 per adult, €37.50 per minor.",
                "**Apostille and translations:** ₹10,000–₹20,000 per applicant.",
                "**Spouse A1 German course (if required):** ₹25,000–₹40,000.",
                "**Health insurance:** as per family size.",
                "**7 Wings fixed-fee engagement:** disclosed in writing before signing.",
                "**Processing time:** 6–12 weeks; often expedited to match the main applicant's visa.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Marriage certificate not apostilled or registered in the home country.",
                "Spouse A1 certificate missing where required.",
                "Insufficient income to support the family without public funds.",
                "Accommodation too small per German square-metre rules.",
                "Missing or inconsistent identity / relationship documents.",
                "Health insurance not meeting German embassy standards.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's trusted Family Reunion Visa consultancy — Indian families brought to Germany together.",
            "Free eligibility check against the main applicant's visa type and the German income/housing rules.",
            "Apostille coordination (MEA) and notarised German translations in-house.",
            "Spouse A1 German course coordination with Goethe-Institut and accredited online providers.",
            "Family file lodged in parallel with the main applicant — no waiting periods where waivers apply.",
            "Post-arrival school enrolment, Kindergeld application and family health-insurance setup.",
            "Senior-led counsel with deep experience in German family-reunification law.",
            "Transparent, fixed-fee pricing for the whole family.",
          ],
          faqs: [
            { q: "Who can I bring on a Family Reunion Visa?", a: "Your spouse or registered partner, and unmarried minor children under 18. In limited cases, parents of a German citizen minor child also qualify." },
            { q: "Does my spouse need German language skills?", a: "Spouses of EU Blue Card holders, many Skilled Worker Visa holders, researchers and Germans returning from abroad are exempt. Otherwise, A1 German is required before applying." },
            { q: "Can my spouse work in Germany on a Family Reunion Visa?", a: "Yes. The reunion visa grants an open work permit — your spouse can work for any employer, full-time or part-time, in any field." },
            { q: "Can my children attend German schools?", a: "Yes. Public schools are free and your children can join from the day they are registered in your city of residence." },
            { q: "How long does the visa process take?", a: "Typically 6–12 weeks at the German embassy in India. It is often expedited when lodged in parallel with the main applicant's visa." },
            { q: "Do I need to show any minimum income?", a: "Yes. The main applicant must demonstrate income sufficient to support the family without recourse to public funds — typically the employment contract and recent payslips are enough." },
            { q: "Can my family apply at the same time as me?", a: "Yes. For Blue Card and most Skilled Worker Visa holders, family applications can be lodged in parallel — no waiting period." },
            { q: "Will my family also get PR with me?", a: "Yes. Once you qualify for PR (Niederlassungserlaubnis), your family members can also apply, usually after holding their residence permit for 3–5 years and meeting basic integration requirements." },
            { q: "What if our marriage certificate is not in German or English?", a: "We arrange certified German translations and MEA apostille for all family-related documents in-house." },
            { q: "Why apply through 7 Wings Immigration?", a: "We specialise in coordinated family reunification — apostille, A1 German, parallel filings, school enrolment and family health insurance — all senior-led from our Hyderabad office." },
          ],
        },
      },
      {
        slug: "germany-ausbildung-program",
        title: "Ausbildung Program",
        short: "Earn-and-learn vocational training pathway with sponsored employment.",
        details: {
          intro:
            "The Germany Ausbildung Program is a unique, world-renowned 2- to 3.5-year dual vocational training pathway that combines paid on-the-job training with classroom learning at a Berufsschule (vocational school). Over 320 recognised Ausbildung professions exist — nursing, IT, mechatronics, hotel management, logistics, automotive, electrical and many more — and Germany now openly recruits Indian apprentices to fill chronic shortages. Apprentices receive a monthly stipend of €1,000–€1,400, full health insurance, paid leave, and on completion a recognised German qualification with a direct path to a Skilled Worker Visa and permanent residency. 7 Wings Immigration in Hyderabad is one of the leading Ausbildung consultants for Indian students — we match candidates with German employers, run B1 language training and handle the visa end-to-end.",
          sections: [
            {
              heading: "Why choose the Ausbildung Program?",
              paragraphs: [
                "**Earn while you learn** — €1,000–€1,400/month tax-advantaged stipend during training.",
                "**No tuition fees** — your German employer covers training costs.",
                "**Globally recognised qualification** — the German Ausbildung is the gold standard in vocational education.",
                "**Direct PR pathway** — after 2 years of work post-Ausbildung you can apply for permanent residency.",
                "**No degree required** — completed 12th class is enough for most Ausbildung programmes.",
                "**Family rights** after you transition to a Skilled Worker Visa post-Ausbildung.",
              ],
            },
            {
              heading: "Who is eligible?",
              paragraphs: [
                "**Age 18–32** preferred (some programmes accept older candidates).",
                "**Minimum 12th class (Intermediate)** completed; some Ausbildungen require a Bachelor's.",
                "**German language B1** by the time of visa application (B2 for nursing).",
                "**Genuine commitment** to live and work in Germany for the long term.",
                "**Good health** and a clean criminal record.",
                "**Funds** to cover the initial 3 months in Germany before the stipend stabilises (or sponsor support).",
              ],
            },
            {
              heading: "Popular Ausbildung Fields",
              paragraphs: [
                "**Nursing (Pflegefachmann/-frau)** — 3 years, €1,200–€1,400/month stipend, huge shortage across Germany.",
                "**IT / Fachinformatiker** — 3 years, €1,000–€1,200/month.",
                "**Mechatronics, Electrical & Automotive** — 3.5 years, €1,000–€1,300/month.",
                "**Hotel and Restaurant Management** — 3 years, €900–€1,100/month.",
                "**Logistics and Warehouse Management** — 3 years, €900–€1,100/month.",
                "**Retail, Banking, Office Administration** — 2.5–3 years.",
              ],
            },
            {
              heading: "Documents Required",
              paragraphs: [
                "Valid Indian passport (≥12 months validity).",
                "Two biometric photos.",
                "Completed long-stay D-visa application form (in duplicate).",
                "Signed Ausbildungsvertrag (training contract) from a German employer.",
                "B1 German certificate (B2 for nursing) from Goethe, telc or ÖSD.",
                "10th, 12th and any further academic certificates (apostilled and translated).",
                "Detailed CV (Lebenslauf) in German.",
                "Motivation letter explaining your career plan.",
                "Health insurance valid from arrival.",
                "Proof of accommodation in Germany.",
                "Visa fee receipt (€75).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. Free profile assessment** at our Hyderabad office — age, education, fitness and career-fit checked.",
                "**2. German language training** to B1 (B2 for nursing) via Goethe-Institut or accredited online schools.",
                "**3. Employer matching** — we shortlist Ausbildung positions with verified German employers in your field.",
                "**4. Application & interview prep** — CV rebuild, mock interviews and visa-readiness check.",
                "**5. Signed training contract (Ausbildungsvertrag)** issued by the German employer.",
                "**6. Document compilation, translation and apostille** for visa submission.",
                "**7. VFS appointment** in Hyderabad/Bengaluru/Delhi + mock interview.",
                "**8. Visa decision in 6–12 weeks**, after which you travel to Germany, register, sign your stipend bank account and start your Ausbildung.",
              ],
            },
            {
              heading: "Benefits of the Ausbildung Program",
              paragraphs: [
                "**Paid training** with full health insurance and paid leave.",
                "**Global qualification** — the German Facharbeiter certificate is recognised worldwide.",
                "**Direct skilled-worker employment** with your training company after graduation.",
                "**PR after 2 years of post-Ausbildung work**.",
                "**Citizenship in 3–5 years** under the 2024 nationality law.",
                "**Family rights** once you transition to a Skilled Worker Visa post-Ausbildung.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Visa fee:** €75.",
                "**German language course (B1/B2):** ₹60,000–₹1,20,000 depending on provider.",
                "**Translations and apostille:** ₹15,000–₹25,000.",
                "**Health insurance (first 90 days):** ₹6,000–₹12,000.",
                "**7 Wings end-to-end engagement (employer matching + visa):** fixed fee disclosed in writing.",
                "**Total processing time:** 9–14 months from enrolment to landing in Germany.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "B1 German certificate missing, fake, or below the required level.",
                "No verified training contract from a German employer.",
                "Age outside the preferred range without compelling reasoning.",
                "Insufficient initial funds before the stipend stabilises.",
                "Vague motivation letter without genuine career planning.",
                "Health insurance not meeting German standards.",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's leading Ausbildung consultancy with verified German employer partners.",
            "In-house B1 German language coaching (B2 for nursing) with Goethe-aligned curriculum.",
            "Employer matching across nursing, IT, mechatronics, hospitality and logistics.",
            "CV rebuild in German format and mock interviews tailored to Ausbildung roles.",
            "Apostille and notarised translations handled in-house.",
            "Mock VFS interview before your appointment.",
            "Post-arrival Anmeldung, bank account, stipend setup and Berufsschule enrolment support.",
            "Strategic guidance on transitioning to a Skilled Worker Visa and PR after Ausbildung.",
          ],
          faqs: [
            { q: "What is the Germany Ausbildung Program?", a: "It is a 2- to 3.5-year dual vocational training programme combining paid on-the-job training (€1,000–€1,400/month) with classroom learning at a Berufsschule, leading to a globally recognised German qualification and a direct PR pathway." },
            { q: "Who is eligible for an Ausbildung?", a: "Candidates aged 18–32 with at least 12th class completed, German language at B1 (B2 for nursing) and a verified Ausbildungsvertrag (training contract) from a German employer." },
            { q: "How much does an Ausbildung pay?", a: "Monthly stipends range from €1,000 to €1,400 depending on the field, year of training and employer. Health insurance, paid leave and training costs are covered." },
            { q: "Is German language mandatory?", a: "Yes. B1 German is the standard minimum for most Ausbildungen, and B2 is required for nursing programmes." },
            { q: "How long does it take to start an Ausbildung in Germany?", a: "Typically 9–14 months from initial enrolment with us — including German language training, employer matching and visa processing." },
            { q: "What happens after I complete my Ausbildung?", a: "You receive a German Facharbeiter qualification and are usually offered a Skilled Worker job by your training company. You then switch to a Skilled Worker Visa, and after 2 years of work can apply for permanent residency." },
            { q: "Can my family come with me?", a: "Family reunification is generally not allowed during the Ausbildung itself. Once you transition to a Skilled Worker Visa post-training, your spouse and children can join you." },
            { q: "What is the cost of the Ausbildung route?", a: "Major costs are the German language course, translations, visa fee and our fixed-fee professional engagement — typically far lower than studying abroad, with the stipend covering living costs from month one." },
            { q: "How long does visa processing take?", a: "Typically 6–12 weeks at the German embassy after VFS submission in India." },
            { q: "Why apply through 7 Wings Immigration in Hyderabad?", a: "We provide verified employer matching, in-house B1/B2 German language coaching, full visa handling and post-arrival support — with senior-led ownership and transparent fixed fees." },
          ],
        },
      },
      {
        slug: "germany-permanent-residency",
        title: "Permanent Residency Pathway",
        short: "Niederlassungserlaubnis — settle in Germany after qualifying years.",
        details: {
          intro:
            "Germany's Permanent Residency (Niederlassungserlaubnis, §9 AufenthG) is an unlimited residence permit that lets you live, work and study in Germany indefinitely — with full social-security rights and the freedom to change jobs, start a business or sponsor family without further immigration approvals. Holders of the EU Blue Card can qualify in as little as 21 months with B1 German, Skilled Worker Visa holders in 33–48 months, and graduates of German universities in just 2 years of qualifying employment. The Niederlassungserlaubnis is also the gateway to German citizenship under the modernised 2024 nationality law (3–5 years total residence). 7 Wings Immigration in Hyderabad provides strategic PR planning from day one — we time your application, optimise your contributions and language path so you reach Niederlassungserlaubnis at the earliest legal date.",
          sections: [
            {
              heading: "Why apply for Permanent Residency in Germany?",
              paragraphs: [
                "**Unlimited residence** — never reapply, never renew.",
                "**Total job flexibility** — change employer, switch sectors, become self-employed.",
                "**Full social-security access** — unemployment cover, parental leave, pension.",
                "**Family reunification** without the income and language hurdles applied to temporary residents.",
                "**Direct path to citizenship** in 3–5 years under the new German nationality law.",
                "**EU long-term residence (Daueraufenthalt-EU)** recognised across 24 EU member states.",
              ],
            },
            {
              heading: "Who is Eligible?",
              paragraphs: [
                "**EU Blue Card holders:** 21 months with B1 German, or 27 months with A1 German.",
                "**Skilled Worker Visa holders:** 33 months with A1, or 21 months if you reach B1.",
                "**Graduates of German universities employed in a skilled job:** just 2 years of qualifying work.",
                "**Self-employed / freelancers:** typically after 3 years of successful business.",
                "**Spouses of German citizens:** 3 years of marriage and residence.",
                "**General residence holders:** typically after 5 years of legal residence.",
              ],
            },
            {
              heading: "General Requirements",
              paragraphs: [
                "**Valid German residence permit** at the time of application.",
                "**Minimum legal residence period** for your visa category (21–60 months).",
                "**German language B1** (A1 for some categories with longer residence).",
                "**Stable income** that supports you and your family without public funds.",
                "**Minimum 36–60 months of statutory pension contributions** (depending on category).",
                "**Health insurance** (statutory or equivalent private cover).",
                "**Adequate housing** for you and your family.",
                "**Basic knowledge of German legal and social order** (Leben in Deutschland test) for some categories.",
                "**Clean criminal record.**",
              ],
            },
            {
              heading: "Documents Required",
              paragraphs: [
                "Valid passport and current German residence permit.",
                "Anmeldung (city registration) certificate.",
                "Current employment contract and last 6 months of payslips.",
                "Tax assessment notice (Steuerbescheid) for recent years.",
                "Statutory pension insurance statement (Rentenversicherungsverlauf).",
                "Health insurance certificate.",
                "German language certificate (A1 or B1 depending on category).",
                "Leben in Deutschland / Einbürgerungstest certificate (where required).",
                "Rental contract or proof of ownership of housing.",
                "Two biometric photos and the completed PR application form.",
                "Application fee (typically €113–€147 depending on category).",
              ],
            },
            {
              heading: "Step-by-Step Application Process",
              paragraphs: [
                "**1. PR readiness audit** at our Hyderabad office — visa type, language, contributions and housing reviewed.",
                "**2. Language certificate planning** — A1 or B1 with Goethe/telc/ÖSD.",
                "**3. Pension and tax documentation** assembled with your German employer.",
                "**4. Leben in Deutschland test** booking (where required).",
                "**5. Ausländerbehörde appointment** in your German city of residence.",
                "**6. PR decision in 2–6 months**.",
                "**7. Niederlassungserlaubnis issued** — unlimited residence card valid for life (renewable as an ID document).",
                "**8. Citizenship planning** — we map the 3–5 year path under the 2024 nationality law.",
              ],
            },
            {
              heading: "Benefits of Niederlassungserlaubnis",
              paragraphs: [
                "**Unlimited stay** — no expiry, no renewals beyond the ID card.",
                "**Full work freedom** — any employer, any sector, self-employed or freelance.",
                "**Family sponsorship** without income/language hurdles.",
                "**Same social-security access as German citizens** (except voting).",
                "**Eligibility for German citizenship** within 3–5 years.",
                "**EU long-term residence option** recognised across the EU.",
              ],
            },
            {
              heading: "Cost & Processing Time",
              paragraphs: [
                "**Application fee:** €113–€147 depending on category.",
                "**Language certificate (B1):** ₹25,000–₹50,000.",
                "**Leben in Deutschland test:** €25.",
                "**7 Wings PR strategy + filing engagement:** fixed-fee, disclosed before signing.",
                "**Processing time:** 2–6 months at the Ausländerbehörde.",
              ],
            },
            {
              heading: "Common Reasons for Rejection",
              paragraphs: [
                "Insufficient pension contribution months for your category.",
                "Income too low to support family without public funds.",
                "Missing or invalid B1 / A1 language certificate.",
                "Housing not meeting the per-person square-metre rule for your family size.",
                "Tax irregularities or unfiled returns.",
                "Gaps in legal residence (long stays outside Germany).",
              ],
            },
          ],
          why7Wings: [
            "Hyderabad's senior-led PR strategy team — we plan your Niederlassungserlaubnis path from day one.",
            "PR readiness audit covering visa type, contributions, language and housing.",
            "Coordination with your German employer for tax and pension documents.",
            "Language certificate planning with Goethe/telc/ÖSD partners.",
            "Leben in Deutschland test prep and booking support.",
            "Ausländerbehörde appointment booking and full file preparation.",
            "Citizenship roadmap under the 2024 nationality law (3–5 years).",
            "Transparent, fixed-fee engagement with a written refund policy.",
          ],
          faqs: [
            { q: "What is the Niederlassungserlaubnis?", a: "It is the German Permanent Residence Permit (§9 AufenthG) — an unlimited residence permit that lets you live, work and study in Germany indefinitely with full social-security access and a direct path to citizenship." },
            { q: "How fast can I get PR in Germany?", a: "EU Blue Card holders with B1 German can apply after just 21 months. Skilled Worker Visa holders typically qualify in 33–48 months. Graduates of German universities employed in skilled jobs can apply after only 2 years." },
            { q: "Do I need German language for PR?", a: "Yes. Most categories require B1 German (CEFR); some longer-residence categories accept A1. We plan your language path from your first year in Germany." },
            { q: "How much pension contribution do I need?", a: "Typically 33–60 months of statutory pension contributions depending on your visa category. Voluntary top-up contributions are possible." },
            { q: "Can I lose my PR?", a: "PR can be lost if you spend more than 6 consecutive months outside Germany without a re-entry permit, or in cases of serious criminal conviction. Blue Card holders enjoy more flexible absence rules." },
            { q: "Can my family also get PR?", a: "Yes. Family members can apply for PR after meeting their own residence and integration requirements, typically 3–5 years." },
            { q: "Does PR mean citizenship?", a: "No — they are separate statuses. PR is unlimited residence; citizenship gives you a German passport and EU voting rights. PR is usually the prerequisite for citizenship 3–5 years later under the 2024 nationality law." },
            { q: "Can I work for any employer with PR?", a: "Yes. Niederlassungserlaubnis grants full work freedom — any employer, any sector, self-employed or freelance, anywhere in Germany." },
            { q: "What documents do I need?", a: "Passport, current residence permit, Anmeldung, employment and payslip records, pension statement, tax assessment, language certificate, housing proof and (where required) Leben in Deutschland test certificate." },
            { q: "Why apply through 7 Wings Immigration?", a: "We plan your PR roadmap from your first year in Germany — pension, tax, language, housing and Ausländerbehörde appointment — with senior-led ownership and transparent fixed fees from our Hyderabad office." },
          ],
        },
      },
    ],
  },
  {
    key: "australia",
    country: "Australia",
    flag: "🇦🇺",
    badge: "Featured · Australia",
    headline: "Visa & Migration Services to Australia.",
    description:
      "Australia's points-tested SkillSelect pathways reward strong English, age and experience. We profile, score, lodge EOIs and steer state-nomination strategy from day one.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "australia-pr-189", title: "Australia PR · 189 Visa", short: "Skilled Independent permanent residency, no sponsor required." },
      { slug: "australia-pr-190", title: "Australia PR · 190 Visa", short: "State-nominated permanent residency for in-demand occupations." },
      { slug: "australia-pr-491", title: "Australia PR · 491 Visa", short: "Regional skilled work visa with a PR pathway through 191." },
      { slug: "australia-skilled-independent", title: "Skilled Independent Visa", short: "Points-tested PR independent of any sponsorship." },
      { slug: "australia-skilled-nominated", title: "Skilled Nominated Visa", short: "PR through a state or territory nomination boost." },
      { slug: "australia-regional-skilled", title: "Regional Skilled Visa", short: "Live and work in designated regional Australia." },
      { slug: "australia-student-visa", title: "Australia Student Visa", short: "Subclass 500 for full-time study at registered institutions." },
      { slug: "australia-temporary-graduate-485", title: "Temporary Graduate Visa (485)", short: "Post-study work rights for international graduates." },
      { slug: "australia-employer-sponsored", title: "Employer Sponsored Visa", short: "TSS and ENS pathways through an Australian sponsor." },
      { slug: "australia-partner-visa", title: "Partner Visa", short: "Join your Australian partner with provisional-to-PR pathway." },
    ],
  },
  {
    key: "canada",
    country: "Canada",
    flag: "🇨🇦",
    badge: "Featured · Canada",
    headline: "Visa & Migration Services to Canada.",
    description:
      "From Express Entry CRS optimisation to PNP nominations and study-to-PR plans, we map the fastest route to Canadian permanent residency for Indian professionals and students.",
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "canada-express-entry", title: "Express Entry", short: "Federal CRS-ranked PR pool for skilled workers." },
      { slug: "canada-pnp", title: "Provincial Nominee Program (PNP)", short: "Province-driven PR streams matching local skills demand." },
      { slug: "canada-pr", title: "Canada PR", short: "Permanent residency strategy across federal and provincial routes." },
      { slug: "canada-fswp", title: "Federal Skilled Worker Program", short: "Points-based PR for qualified professionals abroad." },
      { slug: "canada-cec", title: "Canadian Experience Class", short: "PR for those with skilled Canadian work experience." },
      { slug: "canada-student-visa", title: "Canada Student Visa", short: "Study permit for DLI-approved Canadian institutions." },
      { slug: "canada-open-work-permit", title: "Open Work Permit", short: "Work for any Canadian employer — PGWP, spouse, IEC routes." },
      { slug: "canada-lmia-work-permit", title: "LMIA Work Permit", short: "Employer-driven work authorisation backed by a positive LMIA." },
      { slug: "canada-family-sponsorship", title: "Family Sponsorship", short: "Sponsor a spouse, partner, child or parent to join you in Canada." },
      { slug: "canada-visitor-visa", title: "Visitor Visa", short: "Temporary resident visa for tourism, family or business visits." },
    ],
  },
  {
    key: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    badge: "Featured · United Kingdom",
    headline: "Visa & Migration Services to the United Kingdom.",
    description:
      "Skilled Worker, Health & Care Worker, Graduate and Global Talent routes — we sponsor-check, prepare your CoS package and run the points-based application end-to-end.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "uk-skilled-worker-visa", title: "Skilled Worker Visa", short: "Sponsored UK work visa with a path to settlement." },
      { slug: "uk-health-care-worker-visa", title: "Health and Care Worker Visa", short: "Discounted route for eligible NHS and care professionals." },
      { slug: "uk-graduate-route", title: "Graduate Route Visa", short: "Two-year post-study work permit after a UK degree." },
      { slug: "uk-student-visa", title: "UK Student Visa", short: "Study at licensed UK universities and colleges." },
      { slug: "uk-innovator-founder-visa", title: "Innovator Founder Visa", short: "Build an endorsed innovative business in the UK." },
      { slug: "uk-global-talent-visa", title: "Global Talent Visa", short: "Fast-track for leaders in tech, science, arts and academia." },
      { slug: "uk-family-visa", title: "Family Visa", short: "Join a UK partner, parent or child under appendix FM rules." },
      { slug: "uk-visitor-visa", title: "UK Visitor Visa", short: "Short-stay visa for tourism, business and family visits." },
    ],
  },
  {
    key: "new-zealand",
    country: "New Zealand",
    flag: "🇳🇿",
    badge: "Featured · New Zealand",
    headline: "Visa & Migration Services to New Zealand.",
    description:
      "Skilled Migrant Category 6-point system, Accredited Employer Work Visa and Green List residence pathways — calibrated for Indian applicants with strong qualifications.",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "nz-skilled-migrant", title: "Skilled Migrant Category", short: "Points-based residence for skilled workers." },
      { slug: "nz-accredited-employer-work-visa", title: "Accredited Employer Work Visa", short: "Work for an NZ-accredited employer on a sponsored visa." },
      { slug: "nz-student-visa", title: "NZ Student Visa", short: "Study at NZQA-approved New Zealand institutions." },
      { slug: "nz-green-list", title: "Green List Pathway", short: "Fast-tracked residence for in-demand Green List roles." },
      { slug: "nz-partner-visa", title: "Partner Visa", short: "Join an NZ partner on a work or resident visa." },
      { slug: "nz-visitor-visa", title: "NZ Visitor Visa", short: "Short-term visa for tourism, family or business." },
      { slug: "nz-residence-pathway", title: "Residence Pathway", short: "Strategy to convert work or study visas to NZ residence." },
    ],
  },
  {
    key: "usa",
    country: "United States",
    flag: "🇺🇸",
    badge: "Featured · United States",
    headline: "Visa & Migration Services to the United States.",
    description:
      "From H1B sponsorship support to F1 admissions, OPT/CPT compliance and EB2/EB3 green-card filings — premium guidance built around USCIS realities.",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "usa-h1b-visa", title: "H1B Visa", short: "Specialty-occupation work visa for US employers." },
      { slug: "usa-f1-student-visa", title: "F1 Student Visa", short: "Full-time academic study at SEVP-certified schools." },
      { slug: "usa-opt", title: "OPT", short: "Optional Practical Training for F1 graduates." },
      { slug: "usa-cpt", title: "CPT", short: "Curricular Practical Training during your F1 program." },
      { slug: "usa-eb2-visa", title: "EB2 Visa", short: "Employment-based green card for advanced-degree professionals." },
      { slug: "usa-eb3-visa", title: "EB3 Visa", short: "Green card for skilled, professional and other workers." },
      { slug: "usa-visitor-visa", title: "Visitor Visa (B1/B2)", short: "Short-term business or tourist entry to the US." },
      { slug: "usa-family-sponsorship", title: "Family Sponsorship", short: "Sponsor relatives for US immigrant or non-immigrant visas." },
      { slug: "usa-green-card-pathway", title: "Green Card Pathway", short: "Strategy to obtain US lawful permanent residence." },
    ],
  },
  {
    key: "schengen",
    country: "Schengen Europe",
    flag: "🇪🇺",
    badge: "Featured · Schengen Europe",
    headline: "Visa & Immigration Services to Schengen Europe.",
    description:
      "Short-stay Schengen visas and long-stay European pathways — we handle the documentation, financial proofs and consulate appointments across all 27 Schengen states.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80",
    programs: [
      { slug: "schengen-tourist-visa", title: "Schengen Tourist Visa", short: "Short-stay leisure travel across the 27 Schengen states." },
      { slug: "schengen-business-visa", title: "Schengen Business Visa", short: "Short-stay visa for meetings, conferences and trade events." },
      { slug: "schengen-germany-opportunity-card", title: "Germany Opportunity Card", short: "Job-seeker residence permit for skilled Indians." },
      { slug: "schengen-germany-work-visa", title: "Germany Work Visa", short: "Long-stay German employment-based residence permit." },
      { slug: "schengen-germany-student-visa", title: "Germany Student Visa", short: "Long-stay D-visa for studies in Germany." },
      { slug: "schengen-ireland-student-visa", title: "Ireland Student Visa", short: "Study in Ireland with post-study work options." },
      { slug: "schengen-family-reunion-visa", title: "Family Reunion Visa", short: "Join a family member already resident in Europe." },
      { slug: "schengen-visitor-visa", title: "Schengen Visitor Visa", short: "Visit family and friends across Schengen Europe." },
    ],
  },
];

export const ALL_PROGRAMS: { country: CountryGroup; program: Program }[] = COUNTRY_PROGRAMS.flatMap((c) =>
  c.programs.map((p) => ({ country: c, program: p })),
);

export function findProgram(slug: string) {
  return ALL_PROGRAMS.find((x) => x.program.slug === slug);
}
