# Project Memory

## Core
Performance is a hard requirement. Every change must keep Lighthouse mobile Performance ≥ 90 and never reintroduce these regressions:
- No render-blocking external stylesheets in `__root.tsx`. Google Fonts must load via `media="print"` + JS media-swap, with a `<noscript>` fallback.
- LCP image must keep `fetchPriority="high"` + explicit `width`/`height`; homepage hero and navbar logo stay preloaded in route/root head.
- Navbar / hero images must be WebP or AVIF and ≤ 40 KB. Never use the 162 KB SVG logo again; use `7wings-navbar-logo-160.webp.asset.json`.
- Do not hotlink Unsplash or external flag SVGs on the homepage; use local optimized WebP variants and emoji/text flags.
- Below-the-fold UI (popup form, phone-input lib, carousels) must be `React.lazy` — never imported at module scope from `PageShell`.
- `framer-motion` stays out of the shared shell chunk; import it dynamically per component that needs it.
- GTM stays idle-deferred (`requestIdleCallback` + 4 s timeout). Do not move it back to `<head>`.
- Every `<img>` needs `alt`, `width`, `height`, and `loading="lazy"` unless it is the LCP image.
- Every icon-only button needs `aria-label`. Use design tokens (`text-foreground`, `text-muted-foreground`) — no `text-gray-*` or arbitrary low-contrast colors.

## Memories
- [Performance plan](.lovable/plan.md) — Full audit + A/B/C fix buckets (logo, lazy popup, framer-motion trim, self-host fonts).
