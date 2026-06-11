
# 7 Wings — Homepage Upgrade & Service Pages

This is a large build (one tabbed section + ~55 detail pages with infographics + long-form content). I'll split it into phases so you can review as we go.

## Phase 1 — Homepage (this round)

1. **Remove video play icon** from the hero banner. Keep image, headline, CTAs, animations untouched.
2. **New "Immigration Services for Indians" section** on the home page, placed below About.
   - Country tabs: 🇩🇪 Germany · 🇦🇺 Australia · 🇨🇦 Canada · 🇬🇧 UK · 🇳🇿 New Zealand · 🇺🇸 USA · 🇪🇺 Schengen
   - Each tab renders the premium "Visaway-style" card: country badge, headline, paragraph, two-column services list with gold arrows, "Get Started" CTA, large featured image with floating sub-card.
   - Dark navy bg `#071D5A` blend with our existing tokens, gold accent, glassmorphism hover, scroll reveal.
   - Mobile: tabs become horizontally scrollable chips; image stacks above content.
3. **Data model**: add a `COUNTRY_PROGRAMS` list in `src/lib/site.ts` with all the services you listed. Each item has slug, title, short description.
4. **Routing**: every service gets a route at `/programs/$slug` rendered by a single dynamic page (`src/routes/programs.$slug.tsx`) reading from the data file. Featured-section service links will navigate there. Existing `/services/...` pages stay as-is.

Phase 1 ships a working tabbed section + every service link resolves to a real page (overview + CTA + FAQ stub). Visual polish, infographics and long-form content come in Phase 2.

## Phase 2 — Detail content (next round, after Phase 1 approval)

For each of the ~55 services, the detail page gets:
- Hero (name, country, image, CTA)
- Overview · Eligibility · Documents · Process timeline · Cost breakdown · Processing time · Benefits · Common mistakes · 10 FAQs · CTA + WhatsApp + lead form
- Infographic blocks: eligibility meter, process timeline, cost chart, success pathway, benefits comparison (reusable React components, no external libs)
- 1500–2500 words of SEO content per service, written for Indian applicants, with internal links + JSON-LD FAQ schema

55 long pages is a lot of content generation. I'd recommend doing it in batches of ~8 services per round (Germany first, then Australia, then Canada, etc.) so you can review tone/accuracy and request edits before we generate the rest. Tell me if you'd rather I generate all of it in one go (will take many turns and the content will be more templated).

## Technical notes

- New file `src/components/home/FeaturedServices.tsx` for the tabbed section.
- Extend `src/lib/site.ts` with `COUNTRIES_PROGRAMS` (country → programs[]).
- New route `src/routes/programs.$slug.tsx` (Phase 1: short overview from data; Phase 2: rich content + infographics).
- Sitemap updated to include every `/programs/<slug>`.
- No backend/schema changes.

## Confirm before I start

1. Approve Phase 1 scope above?
2. For Phase 2, batch-by-country (recommended) or all at once?
3. Should service links in the Featured Services section point to new `/programs/<slug>` pages, or replace the existing `/services/<slug>` ones?
