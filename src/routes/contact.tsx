import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/Forms";
import { SITE, BRANCHES } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact 7 Wings Immigration Hyderabad | Call, Visit or Enquire" },
      { name: "description", content: "Talk to Hyderabad's best immigration consultants. Visit our Hi-Tech City, Madhapur office, call us, or send an enquiry — free 30-min consultation with a senior counsellor." },
      { property: "og:title", content: "Contact 7 Wings Immigration | Hyderabad Office" },
      { property: "og:description", content: "Hi-Tech City, Madhapur, Hyderabad office, phone, email and online enquiry form for Germany, Australia, Canada and UK visa support." },
      { property: "og:url", content: "https://www.7wingsimmigration.com/contact" },
      { name: "twitter:title", content: "Contact 7 Wings Immigration Hyderabad" },
      { name: "twitter:description", content: "Visit, call or enquire — free 30-min consultation in Hi-Tech City, Madhapur, Hyderabad." },
    ],
    links: [{ rel: "canonical", href: "https://www.7wingsimmigration.com/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [branch, setBranch] = useState<(typeof BRANCHES)[number]["id"]>("hyderabad");
  const active = BRANCHES.find((b) => b.id === branch) ?? BRANCHES[0];
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Let's plan your next chapter." subtitle="Drop us a line, give us a call, or walk into our Hyderabad office — every enquiry gets a senior counsellor's attention." />
      <section className="py-12 md:py-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-6">
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranch(b.id)}
                  className={`w-full rounded-2xl border bg-white p-7 text-left shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-colors ${
                    branch === b.id ? "border-gold" : "border-black/5"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><MapPin className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{b.name}</p>
                      <p className="mt-1 font-display text-lg text-navy-deep">{b.address}</p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)]">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><Phone className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Call</p>
                    <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="mt-1 block font-display text-lg text-navy-deep hover:text-gold-deep">{SITE.phone}</a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)]">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold-deep"><Mail className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
                    <a href={`mailto:${SITE.email}`} className="mt-1 block font-display text-lg text-navy-deep hover:text-gold-deep">{SITE.email}</a>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <iframe key={active.id} title={`7 Wings Immigration ${active.name} map`} width="100%" height="280" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={active.embed} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-elegant">
              <h2 className="font-display text-2xl font-bold text-navy-deep">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">A senior counsellor replies within 4 working hours.</p>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
