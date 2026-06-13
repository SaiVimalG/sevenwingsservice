import logo from "@/assets/7wings-logo-transparent.png.asset.json";
import logoDark from "@/assets/7wings-logo-transparent.png.asset.json";


export const SITE = {
  name: "7 Wings Immigration",
  short: "7 Wings",
  tagline: "Soar Beyond Borders. Land With Confidence.",
  city: "Hyderabad",
  email: "hello@7wingsimmigration.com",
  phone: "+91 90000 70000",
  whatsapp: "+91 90000 70000",
  address: "Hitec City, Hyderabad, Telangana 500081, India",
  logoUrl: logo.url,
  logoUrlDark: logoDark.url,
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
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
    metaTitle: "Germany Opportunity Card (Chancenkarte) – Job Seeker Visa 2026 | 7 Wings Immigration Hyderabad",
    metaDescription: "Check your eligibility for the Germany Opportunity Card (Chancenkarte) job seeker visa. 7 Wings Immigration in Hyderabad explains the requirements, points system, and application process based on official guidelines.",
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
    metaTitle: "Australia PR Consultants in Hyderabad | Skilled Migration | 7 Wings",
    metaDescription: "Australia PR done right. 7 Wings Immigration in Hyderabad guides professionals through skills assessment, points uplift, state nomination and Subclass 189/190/491 visa grants.",
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
    metaTitle: "Canada PR Consultants in Hyderabad | Express Entry & PNP | 7 Wings",
    metaDescription: "Hyderabad's premium Canada PR consultancy. 7 Wings Immigration handles Express Entry, PNP, ECA, IELTS/CELPIP and family sponsorship with transparent, fixed-fee guidance.",
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
    metaTitle: "JSS Job-Search Support Program | Global Career Migration | 7 Wings Hyderabad",
    metaDescription: "7 Wings Immigration's JSS Program connects Hyderabad professionals to global employers — CV rebuild, recruiter outreach, interview prep and relocation, end-to-end.",
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
    description: "Sit with a senior counsellor at our Hitec City office or on video. Walk away with a written eligibility summary, country fit and next steps.",
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
      { slug: "germany-skilled-worker-visa", title: "Skilled Worker Visa", short: "Long-term work visa for qualified professionals with a German job offer." },
      { slug: "germany-eu-blue-card", title: "EU Blue Card", short: "Fast-track residence for high-earning specialists across the EU." },
      { slug: "germany-job-seeker-visa", title: "Job Seeker Visa", short: "Six-month visa to search for a qualifying role on the ground." },
      { slug: "germany-work-permit", title: "Germany Work Permit", short: "Employer-sponsored work authorisation under German labour rules." },
      { slug: "germany-student-visa", title: "Germany Student Visa", short: "Visa for full-time studies at recognised German universities." },
      { slug: "germany-family-reunion-visa", title: "Family Reunion Visa", short: "Bring your spouse and children to Germany with full work and school rights." },
      { slug: "germany-ausbildung-program", title: "Ausbildung Program", short: "Earn-and-learn vocational training pathway with sponsored employment." },
      { slug: "germany-permanent-residency", title: "Permanent Residency Pathway", short: "Niederlassungserlaubnis — settle in Germany after qualifying years." },
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
