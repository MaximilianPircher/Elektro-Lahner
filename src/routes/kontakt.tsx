import { createFileRoute } from "@tanstack/react-router";
import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Item, Reveal, Stagger } from "../motion";

export const Route = createFileRoute("/kontakt")({ component: Contact });

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

  return (
    <main className="inner-page">
      <section className="page-hero page-pad contact-hero">
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
    </main>
  );
}
