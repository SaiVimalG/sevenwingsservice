// Keep the admin hostname's entry point separate from the public homepage.
export function adminEntryRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (
    url.hostname.toLowerCase() !== "admin.7wingsimmigration.com" ||
    url.pathname !== "/" ||
    !["GET", "HEAD"].includes(request.method)
  ) {
    return null;
  }
  url.pathname = "/admin/blog";
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}