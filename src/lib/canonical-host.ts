// Hosts that must never be indexed: every page permanently moves to the
// canonical www.7wingsimmigration.com address. Preview hosts are not listed.
const REDIRECT_HOSTS = new Set([
  "home.7wingsimmigration.com",
  "7wingsimmigration.com",
  "sevenwingsservice.lovable.app",
]);

export const CANONICAL_HOST = "www.7wingsimmigration.com";

export function canonicalHostRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/lovable/") || url.pathname === "/email/unsubscribe") return null;
  if (!REDIRECT_HOSTS.has(url.hostname.toLowerCase())) return null;
  url.hostname = CANONICAL_HOST;
  url.protocol = "https:";
  url.port = "";
  return new Response(null, {
    status: 301,
    headers: {
      Location: url.toString(),
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
