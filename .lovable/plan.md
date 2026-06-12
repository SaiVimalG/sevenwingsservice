
## Goal
Restructure `/eligibility` into individual SEO landing pages (one per calculator) and build a full Australia SkillSelect calculator with live points logic. Apply the same SEO scaffold to every Canada calculator and stub Germany + UK.

## New URL structure
```
/eligibility                                              (hub - links to all calculators)
/eligibility/australia/189-points-calculator
/eligibility/australia/190-points-calculator
/eligibility/australia/491-points-calculator
/eligibility/canada/federal-skilled-worker-program        (FSWP - 67 pt grid)
/eligibility/canada/crs-calculator                        (Express Entry CRS, 1200 pt)
/eligibility/canada/saskatchewan-sinp-calculator          (SINP 100 pt)
/eligibility/canada/quebec-skilled-worker-program         (QSWP)
/eligibility/germany/opportunity-card-calculator          (Chancenkarte 6+ pt)
/eligibility/uk/skilled-worker-calculator                 (UK 70 pt)
```

All under a TanStack layout route `eligibility.tsx` rendering `<Outlet />`, with a `eligibility.index.tsx` hub page.

## Shared building blocks (new in `src/components/eligibility/`)

- `CalculatorShell.tsx` — page chrome: hero (badge + H1 + sub + trust strip), 2‑col layout (form + sticky score sidebar), eligibility meter, recommendations, lead form, breadcrumb.
- `ScoreSidebar.tsx` — animated big number, status (Eligible / Competitive / Needs Improvement), per‑category breakdown bars, threshold meter.
- `QuestionCard.tsx` — uniform expandable card with tooltip + options (radio/select).
- `LeadForm.tsx` — name/email/phone/occupation/experience → posts to existing `forms.functions.ts`.
- `SeoContent.tsx` — renders the long‑form 1500‑2500 word block from structured data (sections, comparison table, FAQ accordion).
- `SeoHead.ts` helper — builds `meta` + `links` + JSON‑LD scripts (FAQPage, BreadcrumbList, SoftwareApplication for the calculator) for `head()`.
- `calculators/` data files — one per calculator: title, description, H1, intro, sections, factor explanations, comparison rows, FAQs, scoring config.

## Australia engine (`src/lib/eligibility/australia.ts`)
Pure function `score(visa, answers) → { total, breakdown[], status }` covering: visa base (189=0, 190=+5, 491=+15), age, English (Competent 0 / Proficient 10 / Superior 20), overseas exp tiers, AU exp tiers, education tiers, AU study, STEM Masters/PhD, NAATI, partner (0/5/10), Professional Year, regional study, state nom (auto from visa).

Same shape engines for Canada FSWP (67‑pt), CRS (simplified 1200), SINP (100), QSWP, Germany OC, UK SW.

## Per‑page SEO (each calculator route)
`head()` returns:
- `<title>` and `<meta name="description">` exactly as specified per calc
- canonical + og:title/description/url/type=website + twitter card
- JSON‑LD: `BreadcrumbList`, `FAQPage` from page FAQs, `SoftwareApplication` (applicationCategory=BusinessApplication) for the calculator widget.

## SEO content section (under calculator on every page)
Rendered from data file:
1. What is this calculator (SkillSelect / Express Entry / etc.)
2. How points are calculated (per factor)
3. How to improve your score
4. Comparison table (189 vs 190 vs 491, or FSWP vs CRS vs SINP, etc.)
5. 15+ FAQs in accordion (same items feed FAQPage JSON‑LD)
6. Lead capture CTA strip (Book consultation / WhatsApp / Talk to expert)

## Navbar
"Free Eligibility Check" stays, links to `/eligibility` hub.

## Files
**New routes**
- `src/routes/eligibility.tsx` → layout `<Outlet />`
- `src/routes/eligibility.index.tsx` → hub grid of all calculators (replaces current page)
- `src/routes/eligibility.australia.189-points-calculator.tsx`
- `src/routes/eligibility.australia.190-points-calculator.tsx`
- `src/routes/eligibility.australia.491-points-calculator.tsx`
- `src/routes/eligibility.canada.federal-skilled-worker-program.tsx`
- `src/routes/eligibility.canada.crs-calculator.tsx`
- `src/routes/eligibility.canada.saskatchewan-sinp-calculator.tsx`
- `src/routes/eligibility.canada.quebec-skilled-worker-program.tsx`
- `src/routes/eligibility.germany.opportunity-card-calculator.tsx`
- `src/routes/eligibility.uk.skilled-worker-calculator.tsx`

**New components/lib**
- `src/components/eligibility/{CalculatorShell,ScoreSidebar,QuestionCard,LeadForm,SeoContent,EligibilityMeter,RecommendationList,ComparisonTable,FaqAccordion}.tsx`
- `src/lib/eligibility/{australia,canada-fswp,canada-crs,canada-sinp,canada-qswp,germany-oc,uk-sw,types,seo}.ts`
- `src/lib/eligibility/content/*.ts` — per‑calc SEO copy + FAQs + sections

**Edits**
- `src/routes/eligibility.tsx` (current monolith) → converted to layout
- `public/robots.txt` / `src/routes/sitemap[.]xml.ts` → add new URLs

## Technical notes
- Theme tokens added: `--au-navy: #071D5A`, `--au-gold: #D4AF37` in `src/styles.css` (used only on Australia pages via a wrapper class to keep brand consistent elsewhere).
- Live scoring via `useMemo` over a `Record<string, string>` answer state.
- Sticky sidebar on `lg:` and up; on mobile the score floats as a bottom bar.
- Lead form submits via existing `submitLead` server fn (will reuse `forms.functions.ts`; if a matching fn doesn't exist I'll add one).

## Scope question
This is ~10 new SEO pages + 7 scoring engines + shared UI + content (~1500 words each). That is a large build. Two options:

**A. Full build now** — all 9 calculator pages with complete long‑form SEO copy, FAQs, schema, and working scoring engines in one go (large diff, longer turn).

**B. Phased** — Phase 1: layout + hub + 3 Australia pages fully built (calc + SEO + schema). Phase 2: 4 Canada pages. Phase 3: Germany + UK. Each phase shippable.

I recommend **B (phased)** so you can review the Australia pages as the template before I replicate to Canada/UK/Germany. Tell me A or B and I'll proceed.
