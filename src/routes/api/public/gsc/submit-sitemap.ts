import { createFileRoute } from "@tanstack/react-router";

const SITE_PROPERTY = "sc-domain:7wingsimmigration.com";
const SITEMAP_URL = "https://www.7wingsimmigration.com/sitemap.xml";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

async function submitSitemap() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lovableKey || !gscKey) {
    return { ok: false, status: 500, error: "Missing LOVABLE_API_KEY or GOOGLE_SEARCH_CONSOLE_API_KEY" };
  }
  const siteEnc = encodeURIComponent(SITE_PROPERTY);
  const smEnc = encodeURIComponent(SITEMAP_URL);
  const url = `${GATEWAY}/webmasters/v3/sites/${siteEnc}/sitemaps/${smEnc}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
    },
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body: body || null, submitted: { site: SITE_PROPERTY, sitemap: SITEMAP_URL } };
}

function authorized(request: Request): boolean {
  const expected = process.env.GSC_WEBHOOK_SECRET;
  if (!expected) return false;
  const provided =
    request.headers.get("x-webhook-secret") ??
    (request.headers.get("authorization")?.startsWith("Bearer ")
      ? request.headers.get("authorization")!.slice(7)
      : null);
  if (!provided) return false;
  // Constant-time-ish compare to avoid trivial length/early-exit leaks.
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return mismatch === 0;
}


export const Route = createFileRoute("/api/public/gsc/submit-sitemap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authorized(request)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        const result = await submitSitemap();
        return new Response(JSON.stringify(result), {
          status: result.ok ? 200 : 502,
          headers: { "Content-Type": "application/json" },
        });
      },
      GET: async ({ request }) => {
        if (!authorized(request)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        const result = await submitSitemap();
        return new Response(JSON.stringify(result), {
          status: result.ok ? 200 : 502,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
