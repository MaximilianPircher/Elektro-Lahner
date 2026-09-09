import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Lightning,
  ShieldCheck,
  SolarPanel,
  SpeakerHigh,
  Thermometer,
  TreeStructure,
  Wrench,
} from "@phosphor-icons/react";
import { useSite } from "../site-shell";
import { Item, Reveal, Stagger } from "../motion";

export const Route = createFileRoute("/leistungen/$service")({ component: ServiceDetail });

const icons = [
  Lightning,
  TreeStructure,
  SolarPanel,
  ShieldCheck,
  Thermometer,
  Wrench,
  Lightbulb,
  SpeakerHigh,
];

function ServiceDetail() {
  const { service: slug } = Route.useParams();
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const index = t.services.items.findIndex((item) => item.slug === slug);
  const service = t.services.items[index];

  if (!service) {
    return (
      <main className="error-page">
        <p className="mono">404</p>
        <h1>{local("Leistung nicht gefunden", "Servizio non trovato", "Service not found")}</h1>
        <Link className="text-link" to="/leistungen">
          {local("Zur Übersicht", "Torna ai servizi", "Back to services")} <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  const Icon = icons[index] ?? Lightning;
  const previous =
    t.services.items[(index - 1 + t.services.items.length) % t.services.items.length]!;
  const next = t.services.items[(index + 1) % t.services.items.length]!;

  return (
    <main className="inner-page">
      <section className="service-page-hero page-pad">
        <nav className="service-page-nav">
          <Link to="/leistungen">
            <ArrowLeft size={15} /> {local("Alle Leistungen", "Tutti i servizi", "All services")}
          </Link>
        </nav>
        <Reveal className="service-page-heading">
          <div className="service-page-icon">
            <Icon size={28} weight="light" />
          </div>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
        </Reveal>
      </section>

      <section className="section-pad page-pad service-page-body">
        <Reveal className="service-intro">
          <span className="kicker">{t.services.detailKicker}</span>
          <h2>
            {local(
              "Was wir für Sie umsetzen",
              "Cosa realizziamo per voi",
              "What we deliver for you",
            )}
          </h2>
        </Reveal>

        <div className="service-content">
          <Reveal>
            <p className="service-lead">{service.intro}</p>
          </Reveal>
          <Stagger as="ul" step={0.07}>
            {service.bullets.map((bullet) => (
              <Item as="li" key={bullet} y={14}>
                <Check size={17} weight="bold" />
                <span>{bullet}</span>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <Link className="button button--dark" to="/kontakt">
              {t.nav.request} <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      <nav
        className="service-pagination"
        aria-label={local("Weitere Leistungen", "Altri servizi", "More services")}
      >
        <Link to="/leistungen/$service" params={{ service: previous.slug }}>
          <ArrowLeft size={18} />
          <span>
            <small>{local("Zurück", "Precedente", "Previous")}</small>
            <strong>{previous.title}</strong>
          </span>
        </Link>
        <Link to="/leistungen/$service" params={{ service: next.slug }}>
          <span>
            <small>{local("Weiter", "Successivo", "Next")}</small>
            <strong>{next.title}</strong>
          </span>
          <ArrowRight size={18} />
        </Link>
      </nav>
    </main>
  );
}
