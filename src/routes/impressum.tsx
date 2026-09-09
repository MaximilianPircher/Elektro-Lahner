import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Reveal } from "../motion";

export const Route = createFileRoute("/impressum")({ component: Imprint });

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
          <h2>{l.controller}</h2>
          <p>
            <strong>{l.companyName}</strong>
            <br />
            {l.registeredOffice}
            <br />
            {l.contacts}
            <br />
            {l.register}
            <br />
            {l.vat}
            <br />
            {l.pec}
            <br />
            {l.sdi}
            <br />
            {l.managingDirector}
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
