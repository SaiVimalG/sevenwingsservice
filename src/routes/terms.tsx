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
    title: "Acceptance of Terms",
    body: "By accessing our website or using our services, you agree to the following terms and conditions.",
  },
  {
    title: "Nature of Services",
    listIntro: "7 Wings Immigration provides:",
    list: [
      "Immigration consultation",
      "Visa guidance",
      "Documentation assistance",
      "Eligibility assessments",
      "Application support services",
    ],
    body: "We are not a recruitment agency and do not provide guaranteed employment opportunities abroad.",
  },
  {
    title: "No Guarantee of Approval",
    body: "Visa approvals, permanent residency approvals, work permits, study permits, and immigration outcomes are solely determined by the relevant government authorities. 7 Wings Immigration does not guarantee visa approval, PR approval, job placement, immigration success, or processing timelines.",
  },
  {
    title: "Client Responsibilities",
    listIntro: "The client agrees to:",
    list: [
      "Provide accurate and truthful information",
      "Submit genuine supporting documents",
      "Respond promptly to document requests",
      "Follow government and immigration requirements",
    ],
  },
  {
    title: "Fraudulent Documentation",
    body: "Submission of false, misleading, forged, or fraudulent information may result in immediate termination of services without refund.",
  },
  {
    title: "Payment Terms",
    body: "All fees must be paid according to the agreed service package. Additional government fees, assessment fees, translation fees, courier charges, and third-party charges are the responsibility of the client unless explicitly stated otherwise.",
  },
  {
    title: "Intellectual Property",
    body: "All content on the website, including text, graphics, logos, designs, and materials, is the property of 7 Wings Immigration and may not be copied or reproduced without written permission.",
  },
  {
    title: "Limitation of Liability",
    listIntro: "7 Wings Immigration shall not be liable for:",
    list: [
      "Government policy changes",
      "Visa refusals",
      "Delays caused by authorities",
      "Third-party service interruptions",
      "Client-provided incorrect information",
    ],
  },
  {
    title: "Privacy",
    body: "Use of our services is also governed by our Privacy Policy.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of courts located in Hyderabad, Telangana.",
  },
  {
    title: "Contact Information",
    body: "7 Wings Immigration — Hyderabad, Telangana, India. Email: info@7wingsimmigration.com. Phone: +91 80621 80254.",
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | 7 Wings Immigration Hyderabad" },
      { name: "description", content: "Terms governing engagement with 7 Wings Immigration — Hyderabad's senior-led visa and PR consultancy." },
      { property: "og:title", content: "Terms & Conditions | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Engagement terms for 7 Wings Immigration consultancy services." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/terms" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
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
