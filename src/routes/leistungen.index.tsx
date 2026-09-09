import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
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
import { DrawRule, Item, Reveal, Stagger, useSpotlight } from "../motion";

export const Route = createFileRoute("/leistungen/")({ component: Services });

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

function Services() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const spotlight = useSpotlight();

  return (
    <main className="inner-page">
      <section className="page-hero page-pad">
        <Reveal>
          <span className="kicker">{t.services.kicker}</span>
          <h1>{t.services.title}</h1>
          <p className="lead">{t.services.text}</p>
        </Reveal>
      </section>

      <div className="page-pad">
        <DrawRule />
      </div>

      <section className="section-pad page-pad">
        <Stagger className="service-overview-grid" step={0.06}>
          {t.services.items.map((service, index) => {
            const Icon = icons[index] ?? Lightning;
            return (
              <Item as="div" key={service.slug}>
                <Link
                  className="service-overview-card"
                  to="/leistungen/$service"
                  params={{ service: service.slug }}
                  {...spotlight}
                >
                  <Icon size={30} weight="light" />
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span className="service-card-action">
                    {t.services.more} <ArrowRight size={15} />
                  </span>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </section>

      <section className="section-pad page-pad" style={{ paddingTop: 0 }}>
        <Reveal className="service-principle">
          <span className="mono">360°</span>
          <div>
            <h2>
              {local(
                "Von der Planung bis zum Service.",
                "Dalla progettazione all'assistenza.",
                "From planning to service.",
              )}
            </h2>
            <p>
              {local(
                "Ein Ansprechpartner koordiniert Systeme, Schnittstellen und Umsetzung.",
                "Un unico referente coordina sistemi, interfacce e realizzazione.",
                "One partner coordinates systems, interfaces and delivery.",
              )}
            </p>
          </div>
          <Link className="round-link" to="/kontakt" aria-label={t.nav.request}>
            <ArrowRight size={22} weight="bold" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
