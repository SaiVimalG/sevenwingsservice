## Goal

Build **7 Wings Immigration** — a premium, motion-rich immigration consultancy website for a Hyderabad-based firm. **Layout, section composition and hover/motion vocabulary are drawn directly from the uploaded Visaway template** (immigration/visa HTML theme), then re-skinned with the 7 Wings eagle brand (royal blue + premium gold) and rewritten with original, SEO-targeted copy for *"best immigration consultancy in Hyderabad"*. Backed by Lovable Cloud for contact + consultation forms.

## Reference: Visaway template

Used as **structural + interaction reference only** (not copied verbatim). What we lift from it:

- **Section order & rhythm** (Home): sticky topbar → hero with floating plane/globe shapes → about (image collage + checklist) → services grid → "why choose us" with image background → process timeline → countries strip → counters/stats → testimonial carousel → brand marquee → news/blog teaser → CTA banner → mega footer.
- **Hover & motion vocabulary** observed in the template:
  - Image hover zoom + clip-path mask reveal on service cards
  - Tilted/rotated decorative shapes that parallax on scroll
  - Animated SVG arrows + dotted path lines between process steps
  - Icon swap-on-hover (filled → gold outline) with circular gold ring expand
  - Marquee brand strip that pauses on hover
  - Odometer-style number counters on viewport entry
  - Button: gold fill sweeps in from left on hover, arrow nudges right
  - Card lift with soft gold-tinted shadow
  - Magnific-style image lightbox for testimonials
  - Mega menu with image previews
- **Other pages' layouts:** About, Service detail, Country detail (sidebar + content), Pricing tiers, News list/detail, Contact (map + form), Appointment (multi-field form), 404 — all mirror Visaway's compositional structure.

What we do NOT copy: copy text, colors, fonts, imagery, brand marks, CSS classes. Everything is rebuilt in React + Tailwind v4 + Framer Motion with the 7 Wings design system.

## Brand & design system

- **Name:** 7 Wings Immigration · **Tagline:** *Soar Beyond Borders. Land With Confidence.*
- **Logo:** uploaded eagle / "7 WINGS" mark — pushed to Lovable Assets CDN, rendered with `object-contain`, padded so wordmark baseline aligns with nav items (`h-12` desktop / `h-10` mobile). White-bg variant for dark sections via background removal.
- **Palette:** Royal Blue `#0D2E7D`, Premium Gold `#D4AF37`, Sky Blue `#3D7EFF`, Light `#F8FAFC`, Dark `#081229`, Ink `#1A1A1A`, Success `#1DB954`. Gold gradient `linear-gradient(135deg,#F2D27A,#D4AF37,#A37E1F)`.
- **Typography:** **Playfair Display** (display, gold-accent) + **Inter** (UI) — loaded via `<link>` in `__root.tsx`, wired through `@theme` in `src/styles.css`.
- **Tokens:** soft elegant shadow, gold-glow shadow, navy hero gradient, dotted gold divider — all in `@theme` so they're usable as Tailwind utilities.

## Pages (routes)

```
/                                Home
/about                           Story, mission, eagle metaphor, team
/services                        All services overview
/services/germany-opportunity-card
/services/australia-pr
/services/canada-pr
/services/jss-program
/countries                       Country directory (DE, AU, CA + future)
/countries/$slug                 Country detail (Visaway country-details layout)
/process                         Detailed 4-step journey
/success-stories                 Testimonial wall + case studies
/pricing                         Consultation packages
/news                            Blog list (seeded articles)
/news/$slug                      Article detail
/faq                             Accordion FAQ
/contact                         Hyderabad office + map + inquiry form
/book-consultation               Multi-field consultation booking
/privacy /terms /refund          Legal
/*                               Branded 404
```

Each route gets its own `head()` (title, meta, og:*, canonical on leaves only, og:image only where a real hero exists).

## SEO strategy (Hyderabad intent)

- **Primary:** *best immigration consultancy in Hyderabad*, *immigration consultants Hyderabad*, *visa consultants Hyderabad*.
- **Service:** *Germany Opportunity Card consultants Hyderabad*, *Australia PR consultants Hyderabad*, *Canada PR consultancy Hyderabad*, *JSS program Hyderabad*.
- **Home `<title>`:** `Best Immigration Consultancy in Hyderabad | 7 Wings Immigration`
- **Meta description:** `Hyderabad's trusted immigration consultancy for Germany Opportunity Card, Australia PR, Canada PR and JSS programs. Personalised guidance, transparent process, proven results.`
- Single H1 per page, semantic landmarks, descriptive alt text, lazy-loaded media, sitemap.xml (server route), robots.txt.
- **JSON-LD:** `Organization` + `LocalBusiness` (Hyderabad address) in `__root.tsx`; `Service` per service page; `FAQPage` on `/faq`; `BreadcrumbList` on deep routes; `Article` on news posts.
- Hyderabad/Hitec City/Telangana woven naturally into copy — no stuffing.

## Content

All original, written in 7 Wings voice (confident, premium, eagle imagery — vision, freedom, leadership). Sample:

- **Hero:** *Your Global Future Starts Here.* / *Hyderabad's premium immigration partner for Germany, Australia, Canada and JSS pathways — guiding professionals, students and families to confident landings worldwide.*
- **CTAs:** `Apply Now` (gold fill) · `Book Free Consultation` (outline)
- **Stats:** 1000+ Consultations · 95% Client Satisfaction · 4 Countries · 24/7 Support
- Service blurbs, why-choose-us, process, FAQ, testimonials all freshly written — no duplication from prior drafts or the template.

## Motion stack

Framer Motion + Lenis smooth scroll + small custom utilities:

- Hero: kinetic word-reveal headline, parallax eagle silhouette + drifting passport/stamp/plane shapes (re-creating Visaway's floating ornaments).
- Scroll-triggered fade-up, clip-path image reveals, animated SVG dotted path between process steps.
- `<MagneticButton>` for gold CTAs, `<TiltCard>` for service cards, `<CountUp>` for stats, `<Marquee>` for partner/country strip.
- Page transitions (fade + slide).
- Subtle blend-mode cursor follower (desktop only).
- `prefers-reduced-motion` fully respected — all non-essential motion disabled.

## Backend (Lovable Cloud)

Tables with RLS + grants, anon insert only:

- `contact_submissions` — id, name, phone, email, country_interest, message, created_at
- `consultation_requests` — id, name, phone, email, preferred_country, preferred_date, preferred_time, current_status, notes, status (default 'pending'), created_at

Server functions (`createServerFn`) with Zod validation, length caps, simple throttle. Sonner toasts for feedback.

## Build order

1. Enable Lovable Cloud + migration (tables, RLS, grants).
2. Upload eagle logo via Lovable Assets CLI. Set design tokens, fonts, smooth scroll, root layout (navbar with aligned logo + mega menu, footer).
3. Generate brand imagery (hero, country thumbs, process icons, testimonial avatars).
4. Reusable motion primitives.
5. Home page — full Visaway-rhythm composition, re-skinned + re-written.
6. About, Services overview + 4 detail pages, Countries overview + detail.
7. Process, Success Stories, Pricing, News list + detail, FAQ.
8. Contact + Book Consultation wired to Cloud.
9. Legal, 404, sitemap.xml, robots.txt.
10. SEO metadata + JSON-LD pass, reduced-motion + mobile responsive QA.

## Out of scope

- Admin dashboard for viewing submissions (data lands in DB; can add later).
- Real payment processing on pricing page (CTA routes to consultation form).
- News CMS — articles are static seed content.
- Auth / client portal / multi-language.
