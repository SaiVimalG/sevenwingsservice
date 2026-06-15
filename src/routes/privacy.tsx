import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";

type Section = {
  title: string;
  body?: string;
  list?: string[];
  listIntro?: string;
};

const sections: Section[] = [
  {
    title: "Introduction",
    body: "At 7 Wings Immigration, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect the information you provide while using our website and immigration consultancy services.",
  },
  {
    title: "Information We Collect",
    listIntro: "We may collect:",
    list: [
      "Full Name",
      "Email Address",
      "Phone Number",
      "Residential Address",
      "Passport Information (when required)",
      "Educational Qualifications",
      "Employment Details",
      "Immigration Preferences",
      "Documents submitted for assessment purposes",
    ],
  },
  {
    title: "How We Use Your Information",
    listIntro: "Your information may be used to:",
    list: [
      "Assess your immigration eligibility",
      "Provide immigration consultation services",
      "Contact you regarding your application",
      "Improve our services and website experience",
      "Send important updates and service notifications",
      "Comply with legal and regulatory obligations",
    ],
  },
  {
    title: "Data Protection",
    body: "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
  },
  {
    title: "Information Sharing",
    listIntro:
      "7 Wings Immigration does not sell, rent, or trade personal information. Information may be shared only with:",
    list: [
      "Government authorities",
      "Immigration departments",
      "Visa processing agencies",
      "Educational institutions",
      "Authorized service partners",
    ],
    body: "Such sharing occurs only when necessary for processing your application.",
  },
  {
    title: "Cookies",
    body: "Our website may use cookies to improve user experience, analyze website traffic, and optimize marketing campaigns.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may contain links to external websites. We are not responsible for the privacy practices of third-party websites.",
  },
  {
    title: "Data Retention",
    body: "We retain personal information only as long as necessary to provide services and meet legal obligations.",
  },
  {
    title: "Your Rights",
    listIntro: "You may request:",
    list: [
      "Access to your personal information",
      "Correction of inaccurate information",
      "Deletion of personal information where legally permissible",
    ],
  },
  {
    title: "Disclaimer",
    body: "7 Wings Immigration is an immigration consultancy firm. We do not guarantee visa approval, permanent residency approval, job placement, or immigration success. Final decisions are made solely by the respective government authorities.",
  },
  {
    title: "Contact Us",
    body: "7 Wings Immigration — Hyderabad, Telangana, India. Email: info@7wingsimmigration.com. Phone: +91 80621 80254.",
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | 7 Wings Immigration Hyderabad" },
      { name: "description", content: "How 7 Wings Immigration (Hyderabad) collects, uses and protects the personal information of visa and PR applicants." },
      { property: "og:title", content: "Privacy Policy | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Our written privacy policy for immigration consultancy clients in Hyderabad." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/privacy" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl space-y-8 px-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-2xl font-semibold text-navy-deep">{s.title}</h2>
              {s.listIntro && <p className="mt-2 text-muted-foreground">{s.listIntro}</p>}
              {s.list && (
                <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.body && <p className="mt-2 text-muted-foreground">{s.body}</p>}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  ),
});
