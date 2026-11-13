import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { adminEntryRedirect } from "@/lib/admin-domain";
import { canonicalHostRedirect } from "@/lib/canonical-host";

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

// Permanently move non-canonical hosts (apex, legacy home subdomain and the
// test Lovable address) to www.7wingsimmigration.com so only it is indexed.
const canonicalHostMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const adminRedirect = adminEntryRedirect(request);
    if (adminRedirect) return adminRedirect;
    const hostRedirect = canonicalHostRedirect(request);
    if (hostRedirect) return hostRedirect;
  } catch {
    // fall through to normal handling on any URL parsing issue
  }
  return next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalHostMiddleware, errorMiddleware],
}));
