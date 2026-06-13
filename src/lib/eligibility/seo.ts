import type { CalculatorConfig } from "./types";

const BASE = "https://home.7wingsimmigration.com";

export function buildHead(cfg: CalculatorConfig) {
  const absUrl = `${BASE}${cfg.url}`;
  const breadcrumbs = breadcrumbsFromUrl(cfg.url, cfg.h1);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cfg.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${BASE}${b.url}`,
    })),
  };

  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: cfg.h1,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: absUrl,
    description: cfg.metaDescription,
  };

  return {
    meta: [
      { title: cfg.seoTitle },
      { name: "description", content: cfg.metaDescription },
      { property: "og:title", content: cfg.seoTitle },
      { property: "og:description", content: cfg.metaDescription },
      { property: "og:url", content: absUrl },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "7 Wings Immigration" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: cfg.seoTitle },
      { name: "twitter:description", content: cfg.metaDescription },
    ],
    links: [{ rel: "canonical", href: absUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      { type: "application/ld+json", children: JSON.stringify(faqLd) },
      { type: "application/ld+json", children: JSON.stringify(appLd) },
    ],
  };
}

function breadcrumbsFromUrl(url: string, leafName: string) {
  const parts = url.split("/").filter(Boolean);
  const crumbs: { name: string; url: string }[] = [{ name: "Home", url: "/" }];
  let acc = "";
  parts.forEach((p, i) => {
    acc += "/" + p;
    const isLeaf = i === parts.length - 1;
    crumbs.push({ name: isLeaf ? leafName : titleize(p), url: acc });
  });
  return crumbs;
}

function titleize(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
