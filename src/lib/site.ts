import logo from "@/assets/7wings-logo.asset.json";

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
    title: "Germany Opportunity Card",
    short: "Chancenkarte for skilled professionals seeking work in Germany.",
    blurb: "A points-based residence permit that lets qualified professionals enter Germany to look for a job — even before securing one.",
    intro:
      "Germany's Opportunity Card (Chancenkarte) opens the door to Europe's largest economy for skilled professionals from Hyderabad and across India. Our team at 7 Wings Immigration translates the points-based eligibility into a clear, document-ready strategy so you arrive in Germany prepared, compliant, and confident.",
    features: [
      { title: "Points-based eligibility check", description: "We map your degree, work experience, German/English proficiency and age against the official points matrix." },
      { title: "End-to-end documentation", description: "Notarised translations, ZAB recognition, proof of funds, health insurance and Visa appointment — handled together." },
      { title: "Job-search runway", description: "12-month residence permit with part-time work rights while you secure a long-term offer." },
      { title: "Family pathway", description: "Bring your spouse and children on dependent visas with full work and school access." },
    ],
    process: [
      "Free 30-minute profile review at our Hyderabad office (or online)",
      "Points scoring + gap analysis report",
      "Document collection, attestation & translation roadmap",
      "ZAB recognition assistance and proof-of-funds setup",
      "VFS appointment booking, mock interview and submission",
    ],
    faqs: [
      { q: "Do I need to know German?", a: "No. A1/A2 German or B2 English alone earns you points; both is even better. We connect you with vetted language partners." },
      { q: "How many points do I need?", a: "A minimum of 6 points across qualifications, experience, language, age, and Germany connection. We score you in the first call." },
      { q: "Can I bring my family from day one?", a: "Yes. Spouses and minor children join you on dependent permits with work and school rights." },
    ],
    image: germany,
    flag: "🇩🇪",
    country: "Germany",
    metaTitle: "Germany Opportunity Card Consultants in Hyderabad | 7 Wings Immigration",
    metaDescription: "Get Hyderabad's most trusted Germany Opportunity Card (Chancenkarte) guidance. Points scoring, ZAB recognition, document support and Visa appointment — handled end-to-end by 7 Wings Immigration.",
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
  cta: { label: string; to: string; slug?: string };
}

export const BLOG: BlogPost[] = [
  {
    slug: "germany-opportunity-card-2026-changes",
    title: "Germany Opportunity Card 2026: What Hyderabad applicants need to know",
    excerpt: "The new Chancenkarte rules favour skilled Indian professionals more than ever. Here is the simple, points-by-points breakdown.",
    date: "May 12, 2026",
    readTime: "6 min read",
    category: "Germany",
    author: "7 Wings Editorial",
    image: germany,
    intro:
      "Germany's Opportunity Card (Chancenkarte) is a points-based residence permit that lets you fly to Germany and look for a job — even before you have an offer. The 2026 update makes it easier for Indian engineers, IT professionals, nurses and graduates to qualify.",
    sections: [
      {
        heading: "What changed in 2026",
        paragraphs: [
          "The minimum German requirement is now A1 (basic) instead of A2, and B2 English alone earns you points. You can mix and match languages.",
          "IT professionals with 2+ years of hands-on experience can now claim a dedicated experience point — even without a formal degree match.",
          "You can switch from a Schengen tourist visa to an Opportunity Card from inside Germany in many cases.",
        ],
      },
      {
        heading: "Who should apply",
        paragraphs: [
          "Engineers, IT and software professionals, nurses, electricians, chefs, accountants and recent graduates with a recognised degree.",
          "You need a minimum of 6 points across qualification, experience, language, age and Germany connection. Most working professionals from Hyderabad score 6-10 points easily.",
        ],
      },
      {
        heading: "How long it takes",
        paragraphs: [
          "Document preparation: 3-5 weeks. ZAB recognition: 4-8 weeks. Visa appointment to stamping: 4-6 weeks. Total: roughly 3 months from start to flight.",
        ],
      },
    ],
    why7Wings: [
      "We score your profile against the official BAMF matrix in the very first call - no guesswork.",
      "Full ZAB recognition support so your Indian degree is accepted in Germany.",
      "Notarised translation, blocked-account setup and health-insurance - handled in-house.",
      "Mock VFS interview before your appointment so nothing surprises you on the day.",
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
