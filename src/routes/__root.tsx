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
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: SITE.name,
  url: "/",
  logo: SITE.logoUrl,
  image: SITE.logoUrl,
  description: "Best immigration consultancy in Hyderabad for Germany Opportunity Card, Australia PR, Canada PR and JSS programs.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hitec City",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: ["Hyderabad", "Telangana", "India"],
  sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.facebook, SITE.social.youtube],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0D2E7D" },
      { title: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { name: "description", content: "Hyderabad's trusted immigration consultancy for Germany Opportunity Card, Australia PR, Canada PR and JSS programs. Personalised guidance, transparent process, proven results." },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Best Immigration Consultancy in Hyderabad | 7 Wings Immigration" },
      { property: "og:description", content: "Soar beyond borders. Land with confidence. 7 Wings Immigration helps Hyderabad professionals migrate to Germany, Australia and Canada." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index,follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: SITE.logoUrl, type: "image/jpeg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
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
