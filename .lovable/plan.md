## Why the score keeps dropping (root cause)

Live production profile of `https://www.7wingsimmigration.com/` shows:

- **Navbar logo SVG = 119 KB** (preloaded, render-critical). An SVG that large is acting like a heavy image.
- **Favicon PNG = 132 KB** (should be 5-15 KB).
- **Shared `PageShell` chunk = 96 KB** because `framer-motion` is imported by `Reveal`, `TiltCard`, `MagneticButton`, `CountUp`, the Navbar dropdown, the popup, and the home page directly. It loads on every route.
- **Hero JPG (132 KB) is still imported** in `src/routes/index.tsx` only to set `og:image`/`twitter:image`. We already ship a 38 KB WebP. The JPG re-enters the asset graph for nothing.
- **Google Fonts stylesheet is render-blocking** (~120 ms).
- **`react-phone-number-input` CSS + library** loads on every page because `PopupLeadForm` (mounted in `PageShell`) imports `PhoneField` at the top level. Pop-up only shows after 5 s — it should be lazy.
- Heavy admin-only libs are installed but not used at runtime by visitors (good — they're already route-split): `@tiptap/*`, `recharts`, `react-day-picker`, `react-markdown`. Only `react-markdown` actually ships on blog pages.

Lighthouse scores swing because LCP is dominated by the logo SVG + hero, and TBT is dominated by framer-motion. A small change anywhere (an extra image, a new section) pushes the score across the 50/70/90 thresholds.

## What to change (3 buckets)

### A. Delete safely (no visible/functional impact)

1. **Re-export the navbar logo** as a small optimized SVG or a 220×64 WebP and replace `7wings-navbar-logo.svg.asset.json` reference in `src/components/layout/Logo.tsx`. Target ≤ 8 KB.
   - Risk: none. Same image, smaller file.
2. **Replace `public/favicon.ico` (132 KB)** with a 16/32/48 multi-size ICO under 15 KB.
   - Risk: none.
3. **Drop the unused JPG imports** in `src/routes/index.tsx` (`heroImgJpg`, `aboutImgJpg`) and `src/routes/about.tsx`. Point `og:image`/`twitter:image` to the absolute `https://www.7wingsimmigration.com/...webp` URL instead. The `.jpg` files in `src/assets/` then stop being bundled.
   - Risk: none — social cards still work (WebP is supported by Facebook, X, LinkedIn).
4. **Remove unused npm packages** (zero call sites in `src/`):
   - `react-day-picker` (only inside unused `src/components/ui/calendar.tsx`)
   - `recharts` (only inside unused `src/components/ui/chart.tsx`)
   - `vaul` (only inside unused `src/components/ui/drawer.tsx`)
   - `input-otp` (only inside unused `src/components/ui/input-otp.tsx`)
   - `react-resizable-panels` (only inside unused `src/components/ui/resizable.tsx`)
   - `embla-carousel-react` — used only by mobile testimonials slider; we can replace with a CSS scroll-snap row and remove the package + `src/components/ui/carousel.tsx`.
   - The matching `src/components/ui/*.tsx` shadcn files for the above also get deleted.
   - Risk: none today. If you later need a date picker/chart/drawer/OTP/resizable, we re-add. Documenting this in the plan so you have the list.
5. **Delete the unused root carousel + tiltcard call sites** that aren't visible on screen (already not used outside services list).

### B. Lazy-load (keep features, defer cost)

6. **Lazy-load `PopupLeadForm`** in `PageShell` via `React.lazy` + `Suspense`, wrapped in an idle/timeout trigger. The form (and `react-phone-number-input`) stops loading on first paint.
7. **Lazy-load the `Carousel`** used only on mobile testimonials — or replace it with a CSS scroll-snap strip and delete embla entirely (preferred; covered in A.4).
8. **Self-host the two font weights** as `woff2` files imported from `src/styles.css` with `font-display: swap`, and drop the `fonts.googleapis.com` `<link>` from `__root.tsx`. Removes the render-blocking external stylesheet.

### C. Trim framer-motion footprint (biggest CPU/JS win)

9. Convert `Reveal` to a tiny CSS IntersectionObserver fade-in (no framer-motion). Used on almost every page.
10. Convert `MagneticButton` to a normal button (drop the magnet effect) OR keep but mark client-only.
11. Convert `CountUp` to use plain `requestAnimationFrame` + `IntersectionObserver` (already does — just drop the `useInView`/`useReducedMotion` imports from framer-motion and use the browser `prefers-reduced-motion` API).
12. Keep `framer-motion` ONLY for the Navbar dropdown + hero floating shapes + popup. Import it dynamically in those files so it's no longer in the shared `PageShell` chunk.

Expected outcome after A+B+C: shared chunk drops from ~96 KB → ~25 KB, total transfer on `/` drops by ~250 KB, render-blocking time drops by ~120 ms, mobile Lighthouse Performance ~88-95 consistently.

## Will deleting any of this hurt the future?

| Item | Future risk | Mitigation |
|---|---|---|
| `react-day-picker`, `recharts`, `vaul`, `input-otp`, `react-resizable-panels` | If you later add an analytics dashboard, date picker, drawer, OTP login, etc., we re-install. | One `bun add` per package; the shadcn UI file gets re-generated. |
| `embla-carousel-react` | Future carousels would use a CSS strip or be re-added. | Mobile testimonials become a horizontal scroll-snap row (looks identical, native feel). |
| `heroImgJpg`/`aboutImgJpg` JPGs | None — WebP is universally supported in 2026 for OG cards. | If a future tool flags it, we'll re-add a JPG fallback. |
| Reveal/MagneticButton/CountUp framer-motion | Animations stay; only the engine swaps to CSS. | If you want a complex animation later, re-introduce framer-motion locally on that one component. |
| Lazy popup | First open delayed by ~200 ms after 5 s timer — invisible to users. | None. |

## What stays untouched

- All routes, copy, SEO metadata, schema.org JSON-LD, sitemap, GTM, Supabase auth/admin pages, blog editor (`@tiptap/*` is route-split to `/admin/blog` only), forms, leads pipeline.

## Technical details

- Files edited: `src/components/layout/Logo.tsx`, `src/components/layout/PageShell.tsx`, `src/components/layout/Navbar.tsx`, `src/components/motion/Reveal.tsx`, `src/components/motion/CountUp.tsx`, `src/components/motion/MagneticButton.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/styles.css`, `package.json`.
- Files deleted: `src/assets/hero.jpg`, `src/assets/about.jpg`, `src/assets/germany.jpg`, `src/assets/australia.jpg`, `src/assets/canada.jpg`, `src/assets/jss.jpg`, `src/components/ui/{calendar,chart,drawer,input-otp,resizable,carousel}.tsx`, `src/components/motion/TiltCard.tsx` (replace with plain card on `services.index.tsx`).
- New: self-hosted `Inter` and `Playfair Display` woff2 in `src/assets/fonts/` with `@font-face`.
- Verification: run `browser--performance_profile` on the published URL after deploy; expect transfer ≤ 700 KB, render-blocking ≤ 30 KB, FCP ≤ 1.8 s on cable.

## Out of scope

- Removing GTM (it's required for Google Ads tracking — already deferred to `requestIdleCallback`).
- Server-side rendering changes; current TanStack Start SSR is fine.

Approve this plan and I'll apply A → B → C in that order in a single build pass.