import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SERVICES, STATS, TESTIMONIALS, FAQS, AWARDS, COUNTRIES, SITE, type BlogPost } from "@/lib/site";
import { listDbPosts } from "@/lib/blog.functions";
import { mergePosts } from "@/lib/blog-merge";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import realStoriesVideo from "@/assets/happy-client.mp4.asset.json";
import realStoriesPoster from "@/assets/happy-client-poster.jpg.asset.json";
import germanyImg from "@/assets/germany.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const db = await listDbPosts();
      return { posts: mergePosts(db) };
    } catch {
      return { posts: mergePosts([]) };
    }
  },
  head: () => ({
    meta: [
      { title: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { name: "description", content: "Hyderabad's trusted immigration consultancy for Germany Opportunity Card, Australia PR, Canada PR and JSS Program. 1000+ successful consultations, transparent fees, senior-led guidance." },
      { property: "og:title", content: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { property: "og:description", content: "Soar beyond borders. Land with confidence. Premium immigration consultancy in Hyderabad for Germany, Australia, Canada and JSS pathways." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { posts } = Route.useLoaderData() as { posts: BlogPost[] };
  return (
    <PageShell>
      <Hero />
      <About />
      <FeaturedServices />
      <NumberedServices />
      <Testimonials />
      <VideoBanner />
      <FAQ />
      <Counter />
      <Awards />
      <BrandMarquee />
      <NewsTeaser posts={posts} />
      <CTABanner />
    </PageShell>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pb-10 pt-24 text-white sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-48">
      {/* floating shapes */}
      <motion.div aria-hidden animate={{ y: [0, -14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <motion.div aria-hidden animate={{ y: [0, 16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl" />
      <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute right-1/3 top-24 h-32 w-32 rounded-full border border-gold/20" />

      {/* pagi numbers (visaway style) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 font-display text-xs text-white/40 lg:flex">
        <span className="text-gold">03</span>
        <span className="h-12 w-px bg-white/15" />
        <span>05</span>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-0.5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="px-2 sm:px-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Global Migration Simplified
            </p>
          </Reveal>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.04] sm:text-5xl md:text-7xl">
            <RevealWords text="From Eligibility" />
            <br />
            <span className="text-gradient-gold"><RevealWords text="to Landing —" /></span>
            <br />
            <RevealWords text="We've Got You." />
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-base text-white/75 md:text-lg">
              7 Wings Immigration guides ambitious professionals, students and families from Hyderabad to confident landings in
              <span className="text-gold"> Germany, Australia, Canada </span> and beyond — through trusted, transparent immigration pathways.
            </p>
          </Reveal>
          <Reveal delay={0.7}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/book-consultation"><MagneticButton className="btn-gold btn-gold-hover">Apply Now <ArrowRight className="h-4 w-4" /></MagneticButton></Link>
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold">
                Book Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-sky/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
              <img src={heroImg} alt="Indian professional couple looking out toward a Lufthansa jet at sunset" width={1600} height={1100} className="aspect-[5/4] w-full object-cover" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold-soft">Soar Beyond Borders</p>
                  <p className="mt-1 font-display text-lg text-white">Land With Confidence.</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-navy-deep"><Sparkles className="h-4 w-4" /></div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  return (
    <section className="relative overflow-hidden py-14 md:py-10">
      <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full border border-gold/20" />
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-sky/10 blur-2xl" />
            <img src={aboutImg} alt="7 Wings Immigration consultants at the Hyderabad office" width={1024} height={1024} loading="lazy" className="rounded-3xl border border-black/5 shadow-elegant" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-8 -right-6 hidden rounded-2xl border border-black/5 bg-white p-5 shadow-elegant md:block">
              <p className="text-xs uppercase tracking-widest text-gold-deep">Since 2018</p>
              <p className="mt-1 font-display text-xl text-navy-deep">Hyderabad's senior-led<br />immigration team.</p>
            </motion.div>
          </div>
        </Reveal>
        <div>
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">About Our Consultancy</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-navy-deep md:text-5xl">
              Turning Migration <span className="text-gradient-gold">Dreams</span> Into Documented Reality
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At <strong className="text-navy-deep">7 Wings Immigration</strong>, we believe talent should never be limited by geography. From our Hitec City office, senior counsellors guide professionals, students and families through every step — from eligibility scoring to final landing.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Global Reach", text: "Expanding opportunities across four continents" },
                { label: "Senior Counsel", text: "Hands-on partners on every file, every time" },
              ].map((b) => (
                <div key={b.label} className="rounded-2xl border border-black/5 bg-cream p-5">
                  <p className="flex items-center gap-2 font-semibold text-navy-deep"><span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-navy-deep"><Check className="h-3.5 w-3.5" /></span> {b.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-6 space-y-2.5">
              {["Fastest visa form processing with skilled consultants", "Partnerships with verified international employers & universities", "Family-first planning — spouse and children handled together"].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm font-medium text-navy-deep">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.5}>
            <Link to="/about" className="mt-9 inline-flex items-center gap-2 btn-gold btn-gold-hover">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── Numbered Service rail (Visaway hallmark) ───────── */
function NumberedServices() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                <Sparkles className="h-3.5 w-3.5" /> Our Expert Programmes
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-navy-deep md:text-6xl lg:text-7xl">
                Comprehensive{" "}
                <span className="relative inline-block">
                  <span className="text-gradient-gold">Visa</span>
                  <span aria-hidden className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-gold via-gold-soft to-transparent" />
                </span>{" "}
                Solutions.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
              End-to-end pathways — curated, scored and delivered by specialists from our Hyderabad office.
            </p>
          </Reveal>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-black/15 to-transparent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-deep">{SERVICES.length} Signature Programmes</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-black/15 to-transparent" />
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1400px] divide-y divide-black/10 border-y border-black/10 px-6">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.slug} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({ s, index }: { s: (typeof SERVICES)[number]; index: number }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="group relative grid grid-cols-1 items-center gap-6 overflow-hidden py-10 transition-all md:grid-cols-[120px_1.3fr_1fr_140px]"
    >
      {/* hover image */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(8,18,41,0.92), rgba(8,18,41,0.55)), url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="relative">
        <p className="font-display text-5xl font-bold text-gold/40 transition-colors group-hover:text-gold md:text-6xl">{String(index + 1).padStart(2, "0")}</p>
      </div>
      <div className="relative">
        <h3 className="font-display text-2xl font-bold text-navy-deep transition-colors group-hover:text-white md:text-3xl">{s.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">{s.flag} {s.country}</p>
      </div>
      <div className="relative">
        <p className="text-sm text-muted-foreground transition-colors group-hover:text-white/80">{s.short}</p>
      </div>
      <div className="relative flex md:justify-end">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy-deep transition-all group-hover:gap-3 group-hover:text-gold">
          Service Details <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ───────── Destination Feature (Visaway country spotlight) ───────── */
function DestinationFeature() {
  return (
    <section className="relative overflow-hidden bg-navy-mesh py-14 md:py-10 text-white">
      <div className="absolute inset-0 [background:radial-gradient(800px_400px_at_80%_20%,color-mix(in_oklab,var(--gold)_20%,transparent),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              🇩🇪 Featured · Germany
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              Visa & Migration Services <span className="text-gradient-gold">to Germany.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base text-white/75">
              The Chancenkarte (Opportunity Card) is engineered for skilled professionals who want to enter Germany on their own terms — even before securing an offer. Our scoring, ZAB recognition and document team make every point count.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 grid gap-y-3 text-sm sm:grid-cols-2">
              {["Opportunity Card · Chancenkarte", "Job Seeker Visa", "Skilled Worker Visa", "EU Blue Card", "Family Reunion Visa", "Study Pathway · DAAD"].map((b) => (
                <div key={b} className="flex items-center gap-2 text-white/85">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold" /> {b}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/services/$slug" params={{ slug: "germany-opportunity-card" }} className="mt-10 inline-flex btn-gold btn-gold-hover">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={40}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/30 via-transparent to-sky/30 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
              <img src={germanyImg} alt="Brandenburg Gate at blue hour" width={1400} height={1000} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 text-navy-deep shadow-elegant">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">GERMANY</p>
              <p className="mt-1 font-display text-xl">Opportunity Card</p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VideoStory() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);
  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play());
  };
  return (
    <div className="group relative mx-auto h-[550px] w-full max-w-[430px] overflow-hidden rounded-3xl border border-black/5 bg-navy-deep shadow-elegant lg:mx-0 lg:h-full lg:min-h-[500px] lg:max-w-none">
      <video
        ref={ref}
        src={realStoriesVideo.url}
        poster={realStoriesPoster.url}
        controls={playing}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 z-10 flex items-center justify-center bg-navy-deep/20 transition-colors duration-300 hover:bg-navy-deep/40"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-navy-deep shadow-elegant transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-white">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
        </button>
      )}
      <h5 className="pointer-events-none absolute bottom-6 left-6 z-10 rounded-full bg-navy-deep/70 px-4 py-1.5 font-display text-lg font-bold text-white backdrop-blur">Real Stories</h5>
    </div>
  );
}

/* ───────── Testimonials (image-left, slider-right) ───────── */

function Testimonials() {
  return (
    <section className="bg-cream py-14 md:py-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">What Our Clients Say</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">Stories of <span className="text-gradient-gold">Successful Landings.</span></h2></Reveal>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <VideoStory />
          </Reveal>
          <div className="hidden gap-5 sm:grid sm:grid-cols-2">
            {TESTIMONIALS.slice(0, 4).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.2)] transition-all hover:-translate-y-1 hover:shadow-gold">
                  <div className="mb-4 flex gap-0.5 text-gold">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                  <blockquote className="text-sm leading-relaxed text-navy-deep">"{t.text}"</blockquote>
                  <figcaption className="mt-5 border-t border-black/5 pt-4">
                    <p className="font-semibold text-navy-deep">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="sm:hidden">
            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.slice(0, 4).map((t) => (
                  <CarouselItem key={t.name}>
                    <figure className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_15px_40px_-25px_rgba(13,46,125,0.2)]">
                      <div className="mb-4 flex gap-0.5 text-gold">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                      <blockquote className="text-sm leading-relaxed text-navy-deep">"{t.text}"</blockquote>
                      <figcaption className="mt-5 border-t border-black/5 pt-4">
                        <p className="font-semibold text-navy-deep">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex items-center justify-center gap-3">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Video Banner (text marquee + play) ───────── */
function VideoBanner() {
  return (
    <section className="relative overflow-hidden bg-hero py-14 md:py-10 text-white">
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_50%,color-mix(in_oklab,var(--gold)_40%,transparent),transparent_50%)]" />
      <motion.div aria-hidden animate={{ x: [-100, 0, -100] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute left-0 top-10 whitespace-nowrap font-display text-[8rem] font-black text-white/[0.04] md:text-[12rem]">
        GLOBAL · GERMANY · CANADA · AUSTRALIA · GLOBAL · GERMANY ·
      </motion.div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" target="_blank" rel="noreferrer" className="group inline-grid h-24 w-24 place-items-center rounded-full bg-white/10 backdrop-blur transition-all hover:bg-gold">
            <span className="absolute h-24 w-24 animate-ping rounded-full bg-gold/30" />
            <Play className="relative h-7 w-7 fill-current text-white transition-colors group-hover:text-navy-deep" />
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="mt-8 font-display text-5xl font-bold md:text-7xl">
            VIDEO <br /> <span className="text-gradient-gold">PLAY GALLERY</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-white/75">
            Watch real client landings, behind-the-scenes from our Hyderabad office and inside looks at every visa pathway we run.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
function FAQ() {
  return (
    <section className="py-14 md:py-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Visa FAQs</p></Reveal>
          <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">Got Questions? <span className="text-gradient-gold">We've Got Answers.</span></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-5 text-muted-foreground">Hyderabad professionals ask us these the most. Still wondering? Drop us a line — replies within 4 working hours.</p></Reveal>
          <Reveal delay={0.3}><Link to="/contact" className="mt-7 inline-flex btn-gold btn-gold-hover">Contact us <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="space-y-3">
          {FAQS.slice(0, 5).map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <AccordionItem q={f.q} a={f.a} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-2xl border bg-white p-6 transition-all ${open ? "border-gold/40 shadow-gold" : "border-black/5 shadow-[0_10px_30px_-20px_rgba(13,46,125,0.12)]"}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 text-left font-display text-lg font-semibold text-navy-deep">
        <span>{q}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
        <p className="pt-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
}

/* ───────── Counter ───────── */
function Counter() {
  return (
    <section className="relative overflow-hidden bg-hero py-12 md:py-10 text-white">
      <div className="absolute inset-0 [background:radial-gradient(600px_300px_at_20%_80%,color-mix(in_oklab,var(--gold)_25%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center">
        <Reveal><p className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">Did You Know</p></Reveal>
        <Reveal delay={0.1}><h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Our Achievements in <span className="text-gradient-gold">Numbers</span></h2></Reveal>
      </div>
      <div className="relative mx-auto mt-16 grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="bg-navy-deep/70 p-8 text-center">
              <p className="font-display text-5xl font-bold text-gradient-gold md:text-6xl"><CountUp end={s.value} suffix={s.suffix} /></p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/65">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── Awards (visa-consultancy grid) ───────── */
function Awards() {
  return (
    <section className="py-12 md:py-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-black/5 bg-white p-7 text-center shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-gold-deep text-navy-deep shadow-gold transition-transform group-hover:scale-110">
                  <span className="font-display text-2xl">🏆</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-deep">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.body}</p>
                <p className="mt-3 font-display text-gold-deep">{a.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Brand marquee ───────── */
function BrandMarquee() {
  return (
    <section className="border-y border-black/5 bg-cream py-10">
      <Marquee>
        {COUNTRIES.map((c) => (
          <span key={c.slug} className="flex items-center gap-3 font-display text-xl font-semibold tracking-wide text-navy/40 transition-colors hover:text-gold-deep md:text-2xl">
            <span className="text-3xl">{c.flag}</span> {c.name}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ───────── News teaser ───────── */
function NewsTeaser({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-cream py-12 md:py-10">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Latest Insights</p></Reveal>
            <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl font-bold text-navy-deep md:text-5xl">News & <span className="text-gradient-gold">Migration Updates</span></h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/blog" className="hidden items-center gap-2 text-sm font-semibold text-navy-deep transition-all hover:gap-3 hover:text-gold-deep md:inline-flex">
              View all news <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08}>
              <Link to="/blog/$slug" params={{ slug: n.slug }} className="group block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_15px_40px_-25px_rgba(13,46,125,0.15)] transition-all hover:-translate-y-1 hover:shadow-gold">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={n.image} alt={n.title} width={800} height={500} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-deep">{n.category}</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{n.date}</span>
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    <span>{n.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy-deep transition-colors group-hover:text-gold-deep line-clamp-2">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CTA Banner ───────── */
function CTABanner() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-hero p-14 text-white shadow-elegant">
          <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold/20" />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <Reveal><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">Ready to take flight?</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
                  Book a free 30-minute consultation at our <span className="text-gradient-gold">Hyderabad office.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 max-w-xl text-white/75">Walk in for a senior-led eligibility scoring across Germany, Australia, Canada and JSS — written summary at the end of every call.</p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/book-consultation" className="inline-flex justify-center btn-gold btn-gold-hover">Book Consultation <ArrowRight className="h-4 w-4" /></Link>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold">
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
