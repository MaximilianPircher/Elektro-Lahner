import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Reveal } from "../motion";

export const Route = createFileRoute("/datenschutz")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Datenschutz | Elektro Lahner" },
      {
        name: "description",
        content:
          "Wie die Elektro Lahner GmbH personenbezogene Daten beim Besuch dieser Website verarbeitet, gemäß DSGVO und italienischem Datenschutzrecht.",
      },
      { property: "og:title", content: "Datenschutz | Elektro Lahner" },
      {
        property: "og:description",
        content:
          "Wie die Elektro Lahner GmbH personenbezogene Daten beim Besuch dieser Website verarbeitet, gemäß DSGVO und italienischem Datenschutzrecht.",
      },
    ],
  }),
});

function Privacy() {
  const { t } = useSite();
  const l = t.legal;
  return (
    <main className="inner-page legal-page page-pad">
      <section className="page-hero" style={{ paddingInline: 0 }}>
        <Reveal as="header">
          <span className="kicker">{l.kicker}</span>
          <h1>{l.privacy}</h1>
        </Reveal>
      </section>

      <Reveal className="legal-content">
        <section>
          <h2>{l.privacyTitle}</h2>
          <p>{l.privacyP1}</p>
          <p>{l.privacyP2}</p>
          <p>
            <a href={`mailto:${l.privacyEmail}`}>{l.privacyEmail}</a>
          </p>
        </section>
        <section>
          <h2>{l.siteTitle}</h2>
          <p>{l.siteText}</p>
        </section>
        <small>{l.updated}</small>
        <Link className="text-link" to="/impressum">
          <ArrowLeft size={16} /> {l.imprint}
        </Link>
      </Reveal>
    </main>
  );
}
