## Goal

Create a `/leads` admin CRM page (noindex) that shows every enquiry submitted through the website in one searchable, filterable list with a detail drawer and a status workflow. Since the pasted JSX came through stripped, I'll build a clean equivalent matching the structure and behavior you described.

## What I'll build

### 1. Database migration
Add a `status` column to both submission tables:
- `public.contact_submissions.status` — text, default `'new'`, NOT NULL.
- `public.consultation_requests.status` — text, default `'new'`, NOT NULL.
- CHECK allows: `new | contacted | qualified | converted | closed`.

### 2. New runtime secret
- `LEADS_ADMIN_TOKEN` — separate password from the blog admin. I'll prompt you to enter the value.

### 3. Server functions — `src/lib/leads.functions.ts`
Three `createServerFn`s, each verifying the token against `process.env.LEADS_ADMIN_TOKEN` (timing-safe compare). `supabaseAdmin` is dynamically imported inside handlers.

- `verifyLeadsToken({ token })` → `{ ok }` / `{ ok:false, error }`.
- `listLeads({ token })` → merges both tables into a unified `Lead[]` sorted newest first:
  ```ts
  type LeadSource = "contact" | "blog" | "eligibility" | "consultation";
  type Lead = {
    id: string;            // "contact:<uuid>" | "consultation:<uuid>"
    source: LeadSource;
    sourceLabel: string;
    name: string;
    email: string;
    phone: string;
    country: string | null;
    pageUrl: string | null;   // null today
    summary: string;          // short preview
    status: "new"|"contacted"|"qualified"|"converted"|"closed";
    createdAt: string;        // ISO
    fields: { label: string; value: string }[]; // full submission for drawer
  };
  ```
- `updateLeadStatus({ token, id, status })` — parses the prefixed id, updates the right table.

### 4. Frontend — `src/routes/leads.tsx`
Single self-contained route, reconstructed faithfully:

- **Route**: `/leads`, `head()` sets title `Leads | 7 Wings CRM` and `robots: noindex, nofollow`.
- **`LeadsPage`** (auth gate): token persisted in `localStorage` under `admin_blog_token` (matches your code). On mount, calls `verifyLeadsToken`; if invalid, clears storage. Renders a centered login card (cream bg, navy heading, gold submit) when unauthenticated.
- **`LeadsDashboard`**:
  - Navy header bar with title, subtitle, inline search (mobile + desktop), Refresh + Sign-out buttons.
  - Filter row: search input, `FilterSelect` for Source / Status / Country, `DateRangeFilter` (popover using existing `@/components/ui/calendar` + `popover`).
  - Responsive table (horizontal scroll on mobile) with rows: index, Name, Source badge, Email, Phone, Country, URL (truncated + copy), Date, Status badge. Name / Email / Phone are click-to-copy. Row click opens drawer.
  - "Showing X of Y leads." footer.
- **`LeadDrawer`**: right slide-over with backdrop. Header shows source pill + name + close. Body: ContactRow list (Mail / Phone / Globe / Link) with copy buttons; status pill selector; full submission fields with per-field copy; WhatsApp + Email quick-action buttons; "Copy all" via `buildLeadText`.
- **Helpers in same file**: `StatCard`, `StatusBadge`, `LeadRow`, `FilterSelect`, `DateRangeFilter`, `ContactRow`, `CopyButton`, `buildLeadText`, `fmtDate`, `truncateUrl`.
- Toasts via `sonner`. Uses existing theme tokens (`cream`, `navy-deep`, `gold`, `gold-deep`).

### 5. Discoverability
**Not** linked from public navbar/footer — admin-only. Access by typing `/leads`.

## Out of scope
- No `page_url` column added to submission tables (drawer's URL row simply hides when null). Easy follow-up if you want per-submission page tracking.
- Existing contact / consultation form submit paths are untouched (new rows just default to `status='new'`).
- Blog admin (`ADMIN_BLOG_TOKEN`) is untouched.

## Execution order
1. Run the migration (status columns).
2. Prompt for `LEADS_ADMIN_TOKEN` secret.
3. Write `src/lib/leads.functions.ts`.
4. Write `src/routes/leads.tsx`.

Approve and I'll execute in that order.