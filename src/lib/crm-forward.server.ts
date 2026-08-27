/**
 * Server-only helper that forwards qualified website leads to the global CRM webhook.
 * The webhook secret is read from process.env.CRM_WEBHOOK_SECRET and never exposed to the client.
 */

const CRM_WEBHOOK_URL = "https://global-crm.lovable.app/api/public/hooks/website-lead";

export interface CRMLeadPayload {
  name: string;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  country?: string | null;
  city?: string | null;
  source: string;
  subsource: string;
  message?: string | null;
  website?: string | null;
}

export async function forwardLeadToCRM(payload: CRMLeadPayload) {
  const secret = process.env["CRM_WEBHOOK_SECRET"];
  if (!secret) {
    console.warn("[crm-forward] CRM_WEBHOOK_SECRET not configured; skipping CRM forward");
    return { skipped: true };
  }

  const body = {
    name: payload.name,
    email: payload.email || undefined,
    phone: payload.phone || undefined,
    service: payload.service || undefined,
    country: payload.country || undefined,
    city: payload.city || undefined,
    source: payload.source,
    subsource: payload.subsource,
    message: payload.message || undefined,
    website: payload.website || undefined,
  };

  const res = await fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-website-lead-secret": secret,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "unknown");
    console.error("[crm-forward] failed", res.status, text);
    throw new Error(`CRM webhook returned ${res.status}`);
  }

  return res.json().catch(() => ({ ok: true }));
}
