import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ConsultationForm } from "@/components/forms/Forms";

export const Route = createFileRoute("/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book a Free Immigration Consultation in Hyderabad | 7 Wings" },
      { name: "description", content: "Book a free 30-minute immigration consultation with 7 Wings Immigration in Hyderabad — Germany Opportunity Card, Australia PR, Canada PR and JSS programme." },
      { property: "og:title", content: "Book a Free Consultation | 7 Wings Immigration" },
      { property: "og:description", content: "Pick a slot. Score your profile. Plan your move." },
      { property: "og:url", content: "/book-consultation" },
    ],
    links: [{ rel: "canonical", href: "/book-consultation" }],
  }),
  component: Book,
});

function Book() {
  return (
    <PageShell>
      <PageHero eyebrow="Book a Consultation" title="Free. 30 minutes. Senior counsellor." subtitle="We'll score your profile against every available pathway in one sitting — no obligation." />
      <section className="py-12 md:py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-elegant">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
