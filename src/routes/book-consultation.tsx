import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ConsultationForm } from "@/components/forms/Forms";

export const Route = createFileRoute("/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book a Free Immigration Consultation in Hyderabad | 7 Wings" },
      { name: "description", content: "Book a free 30-minute immigration consultation with Hyderabad's top-rated visa consultants. Profile scoring for Germany, Australia, Canada PR, UK & JSS — no obligation." },
      { property: "og:title", content: "Book a Free Immigration Consultation | 7 Wings Hyderabad" },
      { property: "og:description", content: "Pick a slot. Score your profile. Plan your move — with Hyderabad's senior immigration consultants." },
      { property: "og:url", content: "https://home.7wingsimmigration.com/book-consultation" },
      { name: "twitter:title", content: "Book Free Immigration Consultation | 7 Wings Hyderabad" },
      { name: "twitter:description", content: "Free 30-minute consultation with a senior immigration counsellor in Hyderabad." },
    ],
    links: [{ rel: "canonical", href: "https://home.7wingsimmigration.com/book-consultation" }],
  }),
  component: Book,
});

function Book() {
  return (
    <PageShell>
      <PageHero eyebrow="Book a Consultation" title="Free. 30 minutes. Senior counsellor." subtitle="We'll score your profile against every available pathway in one sitting — no obligation." />
      <section className="py-12 md:py-10">
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
