import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, COUNTRY_PROGRAMS, BLOG } from "@/lib/site";
import { listSitemapPosts } from "@/lib/blog.functions";

const BASE_URL = "https://www.7wingsimmigration.com";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Only the canonical /blog/:country/:slug URL; /blog/:slug just redirects.
        const blogSet = new Set<string>(["/blog"]);
        for (const p of BLOG) blogSet.add(`/blog/${slugify(p.category)}/${p.slug}`);
        try {
          const posts = await listSitemapPosts();
          for (const p of posts) blogSet.add(`/blog/${slugify(p.category)}/${p.slug}`);
        } catch {
          // If the DB is unreachable, ship the static sitemap rather than 500.
        }

        const paths = [
          "/", "/about", "/services", "/success-stories", "/faq",
          "/contact", "/book-consultation", "/privacy", "/terms", "/refund",
          "/eligibility",
          "/germany-opportunity-card-hyderabad",
          "/canada/noc-finder",
          "/germany/shortage-occupations",
          "/eligibility/australia/189-points-calculator",
          "/eligibility/australia/190-points-calculator",
          "/eligibility/australia/491-points-calculator",
          "/eligibility/canada/federal-skilled-worker-program",
          "/eligibility/canada/crs-calculator",
          "/eligibility/canada/saskatchewan-sinp-calculator",
          "/eligibility/canada/quebec-skilled-worker-program",
          "/eligibility/germany/opportunity-card-calculator",
          "/eligibility/uk/skilled-worker-visa-calculator",
          ...SERVICES.map((s) => `/services/${s.slug}`),
          ...COUNTRY_PROGRAMS.flatMap((c) => c.programs.map((p) => `/programs/${p.slug}`)),
          ...blogSet,
        ];
        const urls = paths.map((p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
