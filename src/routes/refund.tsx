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
    title: "Overview",
    body: "Effective Date: June 2026. At 7 Wings Immigration, we strive to maintain transparency regarding cancellations and refunds.",
  },
  {
    title: "Service Fee Policy",
    body: "The fees paid to 7 Wings Immigration are professional consultancy charges for guidance, assessment, documentation assistance, and immigration support services.",
  },
  {
    title: "Cancellation Requests",
    body: "Clients may request cancellation of services by submitting a written request to our support team.",
  },
  {
    title: "Refund Eligibility",
    listIntro: "Refund requests may be considered under the following circumstances:",
    list: [
      "Duplicate payment made by mistake",
      "Service could not be initiated by 7 Wings Immigration",
      "Eligibility assessment completed and found unsuitable before processing begins",
    ],
  },
  {
    title: "Non-Refundable Situations",
    listIntro: "No refund shall be provided in the following cases:",
    list: [
      "Change of personal decision or plans",
      "Failure to provide required documents",
      "Failure to meet eligibility requirements",
      "Visa or immigration refusal by government authorities",
      "Failure in language tests (IELTS, PTE, TOEFL, etc.)",
      "Medical inadmissibility",
      "Criminal background issues",
      "Submission of fraudulent information",
      "Withdrawal after work has commenced",
    ],
  },
  {
    title: "Government & Third-Party Fees",
    listIntro: "Any fees paid to:",
    list: [
      "Government authorities",
      "Visa offices",
      "Educational institutions",
      "Language testing agencies",
      "Credential assessment bodies",
    ],
    body: "are strictly non-refundable and are not covered under this policy.",
  },
  {
    title: "Refund Processing Time",
    body: "Approved refunds will be processed within 30 to 45 business days after all required documentation has been received and verified.",
  },
  {
    title: "Refund Method",
    body: "Refunds will be issued through the original payment method wherever possible.",
  },
  {
    title: "Dispute Resolution",
    body: "Any disputes regarding refunds shall be handled in accordance with applicable Indian laws and jurisdiction.",
  },
  {
    title: "Contact Us",
    body: "7 Wings Immigration — Hyderabad, Telangana, India. Email: info@7wingsimmigration.com. Phone: +91 80621 80254.",
  },
];

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy | 7 Wings Immigration Hyderabad" },
      { name: "description", content: "Cancellation and refund policy for 7 Wings Immigration consultancy engagements — Hyderabad's senior-led visa and PR consultancy." },
      { property: "og:title", content: "Cancellation & Refund Policy | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Transparent cancellation and refund terms for immigration consultancy engagements." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/refund" },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/refund" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Cancellation & Refund Policy" />
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
