import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { contacts, type RoleKey } from "../team";
import { useSite } from "../site-shell";
import { Item, Reveal, Stagger } from "../motion";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/kontakt")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Kontakt | Elektro Lahner" },
      {
        name: "description",
        content:
          "Elektro Lahner GmbH, Johann-Georg-Mahl-Straße 40/A, 39031 Bruneck. Telefon +39 0474 77 36 36, info@elektro-lahner.com, Mo-Fr 08:30-12:00 und 13:00-17:00.",
      },
      { property: "og:title", content: "Kontakt | Elektro Lahner" },
      {
        property: "og:description",
        content:
          "Elektro Lahner GmbH, Johann-Georg-Mahl-Straße 40/A, 39031 Bruneck. Telefon +39 0474 77 36 36, info@elektro-lahner.com, Mo-Fr 08:30-12:00 und 13:00-17:00.",
      },
    ],
  }),
});

function Contact() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const subject = encodeURIComponent(
    local(
      "Projektanfrage über die Website",
      "Richiesta progetto dal sito web",
      "Project enquiry via website",
    ),
  );
  const mailto = `mailto:info@elektro-lahner.com?subject=${subject}`;

  const roleLabels: Record<RoleKey, string> = {
    management: local(
      "Geschäftsführung und Vertrieb",
      "Direzione e vendite",
      "Management and sales",
    ),
    planning: local("Planung", "Progettazione", "Planning"),
    service: local(
      "Wartung, Service, Thermografie, Energieoptimierung",
      "Manutenzione, assistenza, termografia, ottimizzazione energetica",
      "Maintenance, service, thermography, energy optimisation",
    ),
    admin: local("Verwaltung", "Amministrazione", "Administration"),
    foreman: local("Vorarbeiter", "Caposquadra", "Foreman"),
    electrician: local("Elektriker", "Elettricista", "Electrician"),
    apprentice: local("Lehrling", "Apprendista", "Apprentice"),
  };

  return (
    <main className="inner-page">
      <section className="page-hero page-pad contact-hero">
        <div className="page-watermark" aria-hidden="true">
          <MapPin weight="thin" />
        </div>
        <Reveal>
          <span className="kicker">{t.contact.kicker}</span>
          <h1>
            {t.contact.title} <em>{t.contact.accent}</em>
          </h1>
          <p className="lead">{t.contact.text}</p>
        </Reveal>
        <Reveal className="contact-direct-block" delay={0.1}>
          <span>{local("Direkt erreichbar", "Contatto diretto", "Direct contact")}</span>
          <a href="tel:+390474773636">+39 0474 77 36 36</a>
          <a href={mailto}>info@elektro-lahner.com</a>
        </Reveal>
      </section>

      <section className="section-pad page-pad">
        <Stagger className="contact-grid" step={0.07}>
          <Item as="a" className="contact-tile" key="phone" href="tel:+390474773636">
            <Phone size={24} weight="light" />
            <span>{t.contact.phone}</span>
            <strong>+39 0474 77 36 36</strong>
          </Item>
          <Item as="a" className="contact-tile" key="mail" href={mailto}>
            <EnvelopeSimple size={24} weight="light" />
            <span>{t.contact.email}</span>
            <strong>info@elektro-lahner.com</strong>
          </Item>
          <Item
            as="a"
            className="contact-tile"
            key="address"
            href="https://maps.google.com/?q=Johann-Georg-Mahl-Stra%C3%9Fe+40A+39031+Bruneck"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={24} weight="light" />
            <span>{t.contact.address}</span>
            <strong>
              Johann-Georg-Mahl-Straße 40/A
              <br />
              39031 Bruneck (BZ), Italien
            </strong>
          </Item>
          <Item key="hours">
            <Clock size={24} weight="light" />
            <span>{t.contact.hours}</span>
            <strong>{t.contact.weekdays}</strong>
          </Item>
        </Stagger>
      </section>
      {/* Who to write to, so an enquiry does not have to start at reception. */}
      <section className="section-pad page-pad" style={{ paddingTop: 0 }}>
        <Reveal className="reference-intro">
          <span className="kicker">
            {local("Direkte Ansprechpartner", "Referenti diretti", "Direct contacts")}
          </span>
          <h2>
            {local("Wer sich bei Ihnen meldet.", "Chi vi risponde.", "Who gets back to you.")}
          </h2>
        </Reveal>
        <Stagger className="team-grid" step={0.07}>
          {contacts.map((person) => (
            <Item className="team-card" key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.roles.map((role) => roleLabels[role]).join(" · ")}</p>
              {person.email ? (
                <a href={`mailto:${person.email}`}>
                  <EnvelopeSimple size={15} /> {person.email}
                </a>
              ) : (
                <a href="tel:+390474773636">
                  <Phone size={15} /> +39 0474 77 36 36
                </a>
              )}
            </Item>
          ))}
        </Stagger>
        <Reveal>
          <Link
            className="text-link"
            style={{ marginTop: "clamp(24px, 3vw, 36px)" }}
            to="/unternehmen"
          >
            {local("Das ganze Team", "Tutto il team", "The whole team")} <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
