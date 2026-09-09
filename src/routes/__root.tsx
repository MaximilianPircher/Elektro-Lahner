import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { SiteShell } from "../site-shell";

// Structured data for local search. Every value here is the company's own
// published NAP data. The url points at the domain this site is meant to
// replace; if it ships anywhere else, that field has to move with it.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Elektro Lahner GmbH",
  alternateName: "Elektro Lahner S.r.l.",
  url: "https://www.elektro-lahner.com/",
  telephone: "+39 0474 773636",
  email: "info@elektro-lahner.com",
  vatID: "IT02697740211",
  foundingDate: "2001",
  founder: { "@type": "Person", name: "Andreas Lahner" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Johann-Georg-Mahl-Straße 40/A",
    postalCode: "39031",
    addressLocality: "Bruneck",
    addressRegion: "BZ",
    addressCountry: "IT",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Südtirol" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:00",
      closes: "17:00",
    },
  ],
  knowsAbout: [
    "Elektroinstallation",
    "KNX-Gebäudeautomation",
    "Photovoltaik",
    "Sicherheitstechnik",
    "Infrarot-Thermografie",
    "Beleuchtung",
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elektro Lahner | Elektrotechnik & Gebäudeautomation in Südtirol" },
      {
        name: "description",
        content:
          "Elektro Lahner in Bruneck: Elektroinstallationen, KNX-Gebäudeautomation, Photovoltaik, Sicherheitstechnik, Wartung und Energieoptimierung.",
      },
      { property: "og:title", content: "Elektro Lahner. Technik, die vorausdenkt." },
      {
        property: "og:description",
        content: "Elektrotechnik, Gebäudeautomation und Energielösungen aus Bruneck.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#101210" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Structured data renders in the body: React 19 drops an inline script
            written into the shell head, and the router's head `scripts` entries
            do not carry `children` through in this version. Search engines read
            JSON-LD anywhere in the document. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  ),
  component: () => (
    <QueryClientProvider client={Route.useRouteContext().queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  ),
  notFoundComponent: () => (
    <main className="error-page">
      <p className="mono">404</p>
      <h1>Diese Seite wurde nicht gefunden.</h1>
      <Link className="text-link" to="/">
        Zur Startseite
      </Link>
    </main>
  ),
});
