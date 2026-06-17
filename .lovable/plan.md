## 1. Sitemap check — already correct

`src/routes/sitemap.xml.ts` already uses:
```
BASE_URL = "https://www.7wingsimmigration.com"
```
Every entry resolves to `https://www.7wingsimmigration.com/...` (e.g. `/about`, `/services/germany-opportunity-card`). The home page is correctly listed as `https://www.7wingsimmigration.com/` (the trailing `/` IS the homepage — Google does not see "home"; that's just how a homepage URL looks).

No URL changes needed in the sitemap. Will only **remove** any entry that should not be indexed (none currently listed that need removal — `/leads` and `/admin/blog` are already absent, good).

## 2. Pages to exclude from indexing

These are internal/private and will be blocked in `robots.txt` and kept out of the sitemap:

| Page | Why excluded |
|---|---|
| `/leads` | Private internal lead viewer |
| `/admin/blog` | Admin-only blog editor |
| `/lovable/*` | Internal Lovable infra routes |
| `/api/*` | Backend endpoints, not pages |

Public pages **kept** in the sitemap (indexed): `/`, `/about`, `/services` + all service subpages, `/programs/*`, `/blog` + posts, `/success-stories`, `/faq`, `/contact`, `/book-consultation`, `/privacy`, `/terms`, `/refund`, `/eligibility` + all calculators.

## 3. Updated `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /leads
Disallow: /lovable/
Disallow: /api/

Sitemap: https://www.7wingsimmigration.com/sitemap.xml
```

## 4. Resubmit sitemap to Google

After the robots.txt change deploys, call the existing endpoint:
`POST https://www.7wingsimmigration.com/api/public/gsc/submit-sitemap`

This pings Google Search Console with `https://www.7wingsimmigration.com/sitemap.xml` using the already-configured GSC connector. I'll trigger it and report the response status.

## Files changed
- `public/robots.txt` — add Disallow lines for `/leads`, `/lovable/`, `/api/`
- Sitemap: no edits needed (already domain-correct, already excludes private pages)

Shall I proceed?
