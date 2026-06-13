import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";

const sections = [
  { title: "Scope of Service", body: "7 Wings Immigration provides advisory and procedural assistance for immigration applications. Final decisions rest exclusively with the relevant government authority — we do not guarantee visa grants." },
  { title: "Engagement", body: "All work begins with a signed engagement letter that lists scope, fees, timelines, and refund terms. No work is undertaken without it." },
  { title: "Fees", body: "Professional fees are fixed and disclosed in advance. Government fees, translation, attestation and third-party charges are passed through at cost." },
  { title: "Client Obligations", body: "You are responsible for the accuracy of documents and information you provide. Withholding material facts may delay or invalidate your application." },
  { title: "Limitation of Liability", body: "Our liability is limited to the professional fees paid for the specific engagement. We are not liable for changes in government policy, processing delays or third-party errors." },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | 7 Wings Immigration Hyderabad" },
      { name: "description", content: "Terms governing engagement with 7 Wings Immigration — Hyderabad's senior-led visa and PR consultancy." },
      { property: "og:title", content: "Terms & Conditions | 7 Wings Immigration Hyderabad" },
      { property: "og:description", content: "Engagement terms for 7 Wings Immigration consultancy services." },
      { property: "og:url", content: "https://home.7wingsimmigration.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://home.7wingsimmigration.com/terms" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
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
