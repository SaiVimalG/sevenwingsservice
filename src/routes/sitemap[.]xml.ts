import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, BLOG, COUNTRY_PROGRAMS } from "@/lib/site";

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/about", "/services", "/blog", "/success-stories", "/faq",
          "/contact", "/book-consultation", "/privacy", "/terms", "/refund",
          "/eligibility",
          "/eligibility/australia/189-points-calculator",
          "/eligibility/australia/190-points-calculator",
          "/eligibility/australia/491-points-calculator",
          "/eligibility/canada/federal-skilled-worker-program",
          "/eligibility/canada/crs-calculator",
          "/eligibility/canada/saskatchewan-sinp-calculator",
          "/eligibility/canada/quebec-skilled-worker-program",
          "/eligibility/germany/opportunity-card-calculator",
          "/eligibility/uk/skilled-worker-calculator",
          "/eligibility/uk/skilled-worker-visa-calculator",
          ...SERVICES.map((s) => `/services/${s.slug}`),
          ...COUNTRY_PROGRAMS.flatMap((c) => c.programs.map((p) => `/programs/${p.slug}`)),
          ...BLOG.map((b) => `/blog/${b.slug}`),
        ];
        const urls = paths.map((p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
