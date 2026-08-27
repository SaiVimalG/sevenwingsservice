/**
 * One-time backfill script: pushes existing website leads into the CRM.
 * Run: bun scripts/backfill-crm.ts
 */

import { createClient } from "@supabase/supabase-js";

const CRM_BULK_URL = "https://crm.7wingsimmigration.com/api/public/hooks/website-lead-bulk";
const SECRET = process.env["CRM_WEBHOOK_SECRET"];

const SUPABASE_URL = process.env["SUPABASE_URL"];
const SUPABASE_SERVICE_ROLE_KEY = process.env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SECRET) {
  console.error("Missing CRM_WEBHOOK_SECRET");
  process.exit(1);
}
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

interface CRMLead {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  country?: string;
  city?: string;
  source: string;
  subsource: string;
  message?: string;
  created_at?: string;
}

async function fetchLeads(): Promise<CRMLead[]> {
  const [contacts, consults] = await Promise.all([
    supabaseAdmin.from("contact_submissions").select("*").order("created_at", { ascending: true }),
    supabaseAdmin.from("consultation_requests").select("*").order("created_at", { ascending: true }),
  ]);

  if (contacts.error) throw new Error(`contact_submissions: ${contacts.error.message}`);
  if (consults.error) throw new Error(`consultation_requests: ${consults.error.message}`);

  const out: CRMLead[] = [];

  for (const r of contacts.data ?? []) {
    const row = r as Record<string, unknown>;
    const country = String(row.country_interest ?? "").trim();
    out.push({
      name: String(row.name ?? "").trim() || "Unknown",
      email: String(row.email ?? "").trim(),
      phone: String(row.phone ?? "").trim(),
      service: country,
      country,
      source: "Website",
      subsource: "Contact Form",
      message: String(row.message ?? "").trim(),
      created_at: row.created_at ? String(row.created_at) : undefined,
    });
  }

  for (const r of consults.data ?? []) {
    const row = r as Record<string, unknown>;
    const country = String(row.preferred_country ?? "").trim();
    const notes = String(row.notes ?? "").trim();
    const currentStatus = String(row.current_status ?? "").trim();
    const message = [notes, currentStatus ? `Current status: ${currentStatus}` : ""]
      .filter(Boolean)
      .join("\n");
    out.push({
      name: String(row.name ?? "").trim() || "Unknown",
      email: String(row.email ?? "").trim(),
      phone: String(row.phone ?? "").trim(),
      service: country,
      country,
      source: "Website",
      subsource: "Consultation Form",
      message: message || undefined,
      created_at: row.created_at ? String(row.created_at) : undefined,
    });
  }

  return out;
}

async function sendBatch(batch: CRMLead[], index: number) {
  const res = await fetch(CRM_BULK_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-website-lead-secret": SECRET,
    },
    body: JSON.stringify({ leads: batch }),
  });

  const text = await res.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = JSON.parse(text);
  } catch {
    // leave json null
  }

  if (!res.ok) {
    throw new Error(`Batch ${index + 1} failed: HTTP ${res.status} ${text}`);
  }

  console.log(`Batch ${index + 1}:`, json ?? text);
  return json as { ok?: boolean; received?: number; inserted?: number; skipped?: number } | null;
}

async function main() {
  const all = await fetchLeads();
  console.log(`Found ${all.length} website leads to backfill.`);

  if (all.length === 0) {
    console.log("Nothing to send.");
    return;
  }

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < all.length; i += 500) {
    const batch = all.slice(i, i + 500);
    const out = await sendBatch(batch, i / 500);
    inserted += out?.inserted ?? 0;
    skipped += out?.skipped ?? 0;
  }

  console.log("\nBackfill complete:");
  console.log({ total: all.length, inserted, skipped });
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
