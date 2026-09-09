import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Reveal } from "../motion";

export const Route = createFileRoute("/impressum")({
  component: Imprint,
  head: () => ({
    meta: [
      { title: "Impressum | Elektro Lahner" },
      {
        name: "description",
        content: "Anbieterangaben der Elektro Lahner GmbH / S.r.l., Bruneck (BZ), Südtirol.",
      },
      { property: "og:title", content: "Impressum | Elektro Lahner" },
      {
        property: "og:description",
        content: "Anbieterangaben der Elektro Lahner GmbH / S.r.l., Bruneck (BZ), Südtirol.",
      },
    ],
  }),
});

function Imprint() {
  const { t } = useSite();
  const l = t.legal;

  return (
    <main className="inner-page legal-page page-pad">
      <section className="page-hero" style={{ paddingInline: 0 }}>
        <Reveal as="header">
          <span className="kicker">{l.kicker}</span>
          <h1>{l.imprint}</h1>
        </Reveal>
      </section>

      <Reveal className="legal-content">
        <section>
          <h2>{l.owner}</h2>
          <p>
            <strong>{l.companyName}</strong>
            <br />
            {l.address.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            {l.phone}
            <br />
            <a href={`mailto:${l.email}`}>{l.email}</a>
            <br />
            {l.pec}
            <br />
            {l.vat}
            <br />
            {l.sdi}
          </p>
        </section>
        <section>
          <h2>{l.webTitle}</h2>
          <p>
            {l.webName}
            <br />
            {l.webAddress.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <a href={`https://${l.webUrl}`} target="_blank" rel="noreferrer">
              {l.webUrl}
            </a>
          </p>
        </section>
        <section>
          <h2>{l.liabilityTitle}</h2>
          <p>{l.liabilityText}</p>
        </section>
        <small>{l.updated}</small>
        <Link className="text-link" to="/datenschutz">
          {l.privacy} <ArrowRight size={16} />
        </Link>
      </Reveal>
    </main>
  );
}
