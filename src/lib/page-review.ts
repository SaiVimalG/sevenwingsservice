import { z } from "zod";

export function customPageUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !["www.7wingsimmigration.com", "7wingsimmigration.com"].includes(url.hostname) || url.port || url.username || url.password) {
    throw new Error("Enter an HTTPS page on www.7wingsimmigration.com or 7wingsimmigration.com.");
  }
  if (/^\/(admin|api|email|unsubscribe)(\/|$)/i.test(decodeURIComponent(url.pathname)) || url.search) {
    throw new Error("Enter a public page URL without query parameters.");
  }
  url.hash = "";
  return url.href;
}

export const reviewInput = z.object({ url: z.string().trim().max(2000).transform((value, context) => {
  try { return customPageUrl(value); } catch {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a public HTTPS page on your production custom domain." });
    return z.NEVER;
  }
}) });

export type ReviewEvidence = {
  requestedUrl: string;
  finalUrl: string;
  checkedAt: string;
  status: number;
  title: string;
  description: string;
  canonical: string;
  robotsMeta: string;
  xRobotsTag: string;
  headings: string[];
  wordCount: number;
  internalLinks: string[];
  imagesWithoutAlt: number;
  robotsStatus: number | null;
  googlebotAllowed: boolean | null;
  sitemapStatus: number | null;
  inSitemap: boolean | null;
  warnings: string[];
  googleIndexStatus: "Not checked — requires Google Search Console URL inspection";
};