import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "closed";
export type LeadSource = "contact" | "consultation";

export interface Lead {
  id: string; // "contact:<uuid>" | "consultation:<uuid>"
  source: LeadSource;
  sourceLabel: string;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  pageUrl: string | null;
  summary: string;
  status: LeadStatus;
  createdAt: string; // ISO
  fields: { label: string; value: string }[];
}

const ALLOWED_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "converted", "closed"];

function checkToken(token: string) {
  const expected = process.env.LEADS_ADMIN_TOKEN;
  if (!expected) throw new Error("LEADS_ADMIN_TOKEN is not configured on the server.");
  if (!token || token.length < 4 || token !== expected) throw new Error("Invalid leads token.");
}

function normalizeStatus(raw: unknown): LeadStatus {
  const v = String(raw ?? "new").toLowerCase();
  if (v === "pending") return "new";
  if ((ALLOWED_STATUSES as string[]).includes(v)) return v as LeadStatus;
  return "new";
}

export const verifyLeadsToken = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    return { ok: true };
  });

export const listLeads = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => {
    checkToken(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [contacts, consults] = await Promise.all([
      supabaseAdmin
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (contacts.error) throw new Error(contacts.error.message);
    if (consults.error) throw new Error(consults.error.message);

    const leads: Lead[] = [];

    for (const r of contacts.data ?? []) {
      const row = r as Record<string, unknown>;
      leads.push({
        id: `contact:${row.id}`,
        source: "contact",
        sourceLabel: "Contact form",
        name: String(row.name ?? ""),
        email: String(row.email ?? ""),
        phone: String(row.phone ?? ""),
        country: (row.country_interest as string) || null,
        pageUrl: null,
        summary: String(row.message ?? "").slice(0, 140),
        status: normalizeStatus(row.status),
        createdAt: String(row.created_at),
        fields: [
          { label: "Name", value: String(row.name ?? "") },
          { label: "Email", value: String(row.email ?? "") },
          { label: "Phone", value: String(row.phone ?? "") },
          { label: "Country of interest", value: (row.country_interest as string) || "—" },
          { label: "Message", value: String(row.message ?? "") },
        ],
      });
    }

    for (const r of consults.data ?? []) {
      const row = r as Record<string, unknown>;
      leads.push({
        id: `consultation:${row.id}`,
        source: "consultation",
        sourceLabel: "Consultation",
        name: String(row.name ?? ""),
        email: String(row.email ?? ""),
        phone: String(row.phone ?? ""),
        country: (row.preferred_country as string) || null,
        pageUrl: null,
        summary: String(row.notes ?? row.current_status ?? "").slice(0, 140),
        status: normalizeStatus(row.status),
        createdAt: String(row.created_at),
        fields: [
          { label: "Name", value: String(row.name ?? "") },
          { label: "Email", value: String(row.email ?? "") },
          { label: "Phone", value: String(row.phone ?? "") },
          { label: "Preferred country", value: (row.preferred_country as string) || "—" },
          { label: "Preferred date", value: (row.preferred_date as string) || "—" },
          { label: "Preferred time", value: (row.preferred_time as string) || "—" },
          { label: "Current status", value: (row.current_status as string) || "—" },
          { label: "Notes", value: (row.notes as string) || "—" },
        ],
      });
    }

    leads.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return { leads };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string; id: string; status: string }) =>
    z
      .object({
        token: z.string().min(1).max(500),
        id: z.string().min(3).max(200),
        status: z.enum(["new", "contacted", "qualified", "converted", "closed"]),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    checkToken(data.token);
    const [prefix, uuid] = data.id.split(":");
    if (!uuid) throw new Error("Invalid lead id");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const table =
      prefix === "contact"
        ? "contact_submissions"
        : prefix === "consultation"
          ? "consultation_requests"
          : null;
    if (!table) throw new Error("Unknown lead source");
    const { error } = await supabaseAdmin.from(table).update({ status: data.status }).eq("id", uuid);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
