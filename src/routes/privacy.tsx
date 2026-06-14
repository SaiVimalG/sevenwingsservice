import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect the information you voluntarily share through our contact and consultation forms — name, phone, email, country of interest and any details you choose to add about your profile.",
  },
  {
    title: "How We Use Your Information",
    body: "Solely to respond to your enquiry, prepare an eligibility assessment, and (with your consent) keep you informed about programmes relevant to your goals.",
  },
  {
    title: "Sharing",
    body: "We never sell your data. We share information only with sub-processors strictly required to deliver our service (e.g. document translators, visa application platforms) and only when you instruct us to proceed.",
  },
  {
    title: "Data Retention",
    body: "Active client data is retained for the duration of our engagement plus 7 years for record-keeping. You may request deletion at any time by writing to our office.",
  },
  {
    title: "Your Rights",
    body: "You may request access, correction or deletion of your personal data. Please write to hello@7wingsimmigration.com.",
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
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  ),
});
