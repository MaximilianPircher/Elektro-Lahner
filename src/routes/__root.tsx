import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elektro Lahner | Elektrotechnik & Gebäudeautomation in Südtirol" },
      { name: "description", content: "Elektro Lahner in Bruneck: Elektroinstallationen, KNX-Gebäudeautomation, Photovoltaik, Sicherheitstechnik, Wartung und Energieoptimierung." },
      { property: "og:title", content: "Elektro Lahner – Technik, die vorausdenkt." },
      { property: "og:description", content: "Elektrotechnik, Gebäudeautomation und Energielösungen aus Bruneck." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => (
    <html lang="de"><head><HeadContent /></head><body>{children}<Scripts /></body></html>
  ),
  component: () => <QueryClientProvider client={Route.useRouteContext().queryClient}><Outlet /></QueryClientProvider>,
  notFoundComponent: () => <main className="error-page"><p>404</p><h1>Diese Seite wurde nicht gefunden.</h1><Link to="/">Zur Startseite</Link></main>,
});
