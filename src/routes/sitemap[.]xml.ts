import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES } from "@/lib/site";

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/about", "/services", "/success-stories", "/faq",
          "/contact", "/book-consultation", "/privacy", "/terms", "/refund",
          ...SERVICES.map((s) => `/services/${s.slug}`),
        ];
        const urls = paths.map((p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
