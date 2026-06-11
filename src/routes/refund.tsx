import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";

const sections = [
  { title: "Eligibility Errors on Our Part", body: "If your application is rejected because of an eligibility-assessment error attributable to 7 Wings Immigration, we refund 100% of professional fees within 30 days." },
  { title: "Withdrawal Before Lodgement", body: "If you choose to withdraw before any application is lodged, the unspent portion of your professional fee is refunded after deducting work completed to date." },
  { title: "Government & Third-Party Fees", body: "Government fees, visa fees, translation, attestation, courier and similar third-party charges are non-refundable once paid." },
  { title: "How to Request a Refund", body: "Write to hello@7wingsimmigration.com with your engagement reference. Refunds are processed within 30 working days of approval." },
];

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy | 7 Wings Immigration" },
      { name: "description", content: "Our written refund policy for immigration consultancy engagements." },
      { property: "og:url", content: "/refund" },
    ],
    links: [{ rel: "canonical", href: "/refund" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Refund Policy" />
      <section className="py-20">
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
