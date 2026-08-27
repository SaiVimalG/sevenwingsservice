/**
 * Server-only helper that forwards qualified website leads to the global CRM webhook.
 * The webhook secret is read from process.env.CRM_WEBHOOK_SECRET and never exposed to the client.
 */

const CRM_URL = "https://crm.7wingsimmigration.com/api/public/hooks/website-lead";

export type CrmLead = {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  country?: string;
  city?: string;
  subsource?: string; // which form/page it came from
  message?: string;
};

export async function forwardLeadToCrm(lead: CrmLead) {
  const secret = process.env["CRM_WEBHOOK_SECRET"];
  if (!secret) {
    console.error("[crm] CRM_WEBHOOK_SECRET missing");
    return { ok: false };
  }

  try {
    const res = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-website-lead-secret": secret,
      },
      body: JSON.stringify({ ...lead, source: "Website" }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) console.error("[crm] forward failed", res.status, body);
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    console.error("[crm] forward error", e);
    return { ok: false };
  }
}
