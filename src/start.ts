import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Redirect the legacy `home.7wingsimmigration.com` subdomain (and the bare apex)
// to the canonical `www.7wingsimmigration.com` so Google drops the duplicate
// subdomain from its index.
const canonicalHostMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    if (host === "home.7wingsimmigration.com" || host === "7wingsimmigration.com") {
      url.hostname = "www.7wingsimmigration.com";
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
  } catch {
    // fall through to normal handling on any URL parsing issue
  }
  return next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalHostMiddleware, errorMiddleware],
}));
