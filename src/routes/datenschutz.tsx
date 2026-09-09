import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Reveal } from "../motion";

export const Route = createFileRoute("/datenschutz")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung | Elektro Lahner" },
      {
        name: "description",
        content:
          "Wie die Elektro Lahner GmbH personenbezogene Daten beim Besuch dieser Website verarbeitet, gemäß DSGVO und italienischem Datenschutzrecht.",
      },
      { property: "og:title", content: "Datenschutzerklärung | Elektro Lahner" },
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
  const sections: [string, string][] = [
    [l.dataTitle, l.dataText],
    [l.basisTitle, l.basisText],
    [l.recipientsTitle, l.recipientsText],
    [l.retentionTitle, l.retentionText],
    [l.rightsTitle, `${l.rightsText} ${l.authority}`],
    [l.cookiesTitle, l.cookiesText],
  ];

  return (
    <main className="inner-page legal-page page-pad">
      <section className="page-hero" style={{ paddingInline: 0 }}>
        <Reveal as="header">
          <span className="kicker">{l.kicker}</span>
          <h1>{l.privacy}</h1>
          <p>{l.privacyIntro}</p>
        </Reveal>
      </section>

      <Reveal className="legal-content">
        <section>
          <h2>{l.controller}</h2>
          <p>
            <strong>{l.companyName}</strong>
            <br />
            {l.registeredOffice}
            <br />
            {l.contacts}
            <br />
            {l.pec}
          </p>
        </section>
        {sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <small>{l.updated}</small>
        <Link className="text-link" to="/impressum">
          <ArrowLeft size={16} /> {l.imprint}
        </Link>
      </Reveal>
    </main>
  );
}
