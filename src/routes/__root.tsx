import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-hero text-center text-white">
      <div className="px-6">
        <p className="font-display text-[9rem] leading-none text-gradient-gold">404</p>
        <h1 className="mt-2 font-display text-3xl">Looks like you've flown off course.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/90">
          The page you're looking for has migrated. Let's get you back on a clear pathway.
        </p>
        <a href="/" className="mt-8 inline-flex btn-gold btn-gold-hover">Back home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root" }); }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-2xl text-navy-deep">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or head back home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold btn-gold-hover">Try again</button>
          <a href="/" className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://home.7wingsimmigration.com";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE.name,
  alternateName: "7 Wings Immigration Hyderabad",
  url: SITE_URL,
  logo: SITE.logoUrl,
  image: SITE.logoUrl,
  description:
    "Best immigration consultancy in Hyderabad for Germany Opportunity Card, Australia PR, Canada PR, UK Skilled Worker visa and JSS career programs. Senior-led, transparent fees.",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hitec City",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 17.4435, longitude: 78.3772 },
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: ["Hyderabad", "Telangana", "India"],
  knowsAbout: [
    "Germany Opportunity Card",
    "Australia PR",
    "Canada PR",
    "UK Skilled Worker Visa",
    "JSS Career Program",
    "Study Abroad",
    "Work Visa Consultancy",
  ],
  sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.facebook, SITE.social.youtube],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE.name,
  alternateName: ["7 Wings Immigration Hyderabad", "Seven Wings Immigration", "7Wings Immigration"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const sitelinksJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "7 Wings Immigration Services",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Germany Opportunity Card", url: `${SITE_URL}/services/germany-opportunity-card`, description: "Germany Opportunity Card (Chancenkarte) consultancy from Hyderabad." },
    { "@type": "SiteNavigationElement", position: 2, name: "Australia PR", url: `${SITE_URL}/services/australia-pr`, description: "Australia Permanent Residency visa consultants in Hyderabad." },
    { "@type": "SiteNavigationElement", position: 3, name: "Canada PR", url: `${SITE_URL}/services/canada-pr`, description: "Canada Express Entry & PR consultancy in Hyderabad." },
    { "@type": "SiteNavigationElement", position: 4, name: "JSS Program", url: `${SITE_URL}/services/jss-program`, description: "JSS global career & overseas placement program." },
    { "@type": "SiteNavigationElement", position: 5, name: "All Services", url: `${SITE_URL}/services`, description: "All immigration services offered by 7 Wings, Hyderabad." },
    { "@type": "SiteNavigationElement", position: 6, name: "Eligibility Calculator", url: `${SITE_URL}/eligibility`, description: "Free PR & visa points calculators for Canada, Australia, Germany, UK." },
    { "@type": "SiteNavigationElement", position: 7, name: "Book Consultation", url: `${SITE_URL}/book-consultation`, description: "Book a free immigration consultation in Hyderabad." },
    { "@type": "SiteNavigationElement", position: 8, name: "About Us", url: `${SITE_URL}/about`, description: "About 7 Wings Immigration, Hitec City Hyderabad." },
    { "@type": "SiteNavigationElement", position: 9, name: "Contact", url: `${SITE_URL}/contact`, description: "Contact 7 Wings Immigration Hyderabad." },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0D2E7D" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { name: "googlebot", content: "index,follow" },
      { name: "author", content: SITE.name },
      { name: "geo.region", content: "IN-TG" },
      { name: "geo.placename", content: "Hyderabad" },
      { name: "geo.position", content: "17.4435;78.3772" },
      { name: "ICBM", content: "17.4435, 78.3772" },
      { title: "7 Wings Immigration — Hyderabad Visa Consultancy" },
      { name: "description", content: "Senior-led visa & PR consultancy in Hyderabad. Germany, Australia, Canada, UK and JSS pathways. Transparent fees." },
      { name: "keywords", content: "immigration consultancy Hyderabad, Germany Opportunity Card, Australia PR, Canada PR, UK Skilled Worker visa, JSS program" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@7wingsimmig" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/__l5e/assets-v1/aaf1cf8d-74fc-4380-866c-1b94db8e449e/7wings-logo-dark.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/__l5e/assets-v1/aaf1cf8d-74fc-4380-866c-1b94db8e449e/7wings-logo-dark.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(sitelinksJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" theme="light" richColors closeButton />
    </QueryClientProvider>
  );
}
