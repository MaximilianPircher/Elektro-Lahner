import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Buildings, Factory, House, Storefront } from "@phosphor-icons/react";
import { referenceNames } from "../content";
import { useSite } from "../site-shell";
import { DrawRule, Item, Reveal, Stagger } from "../motion";

export const Route = createFileRoute("/referenzen")({ component: References });

function References() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const sectors = [
    [House, local("Wohnbau", "Residenziale", "Residential")],
    [Storefront, local("Hotellerie & Gastronomie", "Hotel e gastronomia", "Hospitality")],
    [
      Buildings,
      local("Gewerbe & Öffentlichkeit", "Commercio e settore pubblico", "Commercial & public"),
    ],
    [Factory, local("Industrie", "Industria", "Industrial")],
  ] as const;

  return (
    <main className="inner-page">
      <section className="page-hero page-pad">
        <Reveal>
          <span className="kicker">{t.references.kicker}</span>
          <h1>{t.references.title}</h1>
          <p className="lead">{t.references.text}</p>
        </Reveal>
      </section>

      <Stagger className="sector-strip" step={0.06}>
        {sectors.map(([Icon, label]) => (
          <Item key={label} y={12}>
            <Icon size={22} weight="light" />
            <span>{label}</span>
          </Item>
        ))}
      </Stagger>

      <section className="section-pad page-pad">
        <Reveal className="reference-intro">
          <h2>
            {local(
              "Langjährige Partnerschaften und vielfältige Aufgaben.",
              "Partnership durature e progetti diversi.",
              "Long-standing partnerships and varied projects.",
            )}
          </h2>
        </Reveal>
        <Stagger className="project-list" step={0.05}>
          {referenceNames.map((name) => (
            <Item className="project-row" key={name} y={16}>
              <h3>{name}</h3>
              <ArrowRight size={20} />
            </Item>
          ))}
        </Stagger>
      </section>

      <div className="page-pad">
        <DrawRule />
      </div>

      <section className="section-pad page-pad reference-note">
        <Reveal>
          <p>
            {local(
              "Die gezeigte Auswahl steht für unterschiedliche Projektgrößen und Branchen. Gerne besprechen wir passende Erfahrungen persönlich.",
              "La selezione rappresenta diverse dimensioni e settori. Saremo lieti di approfondire personalmente le esperienze pertinenti.",
              "This selection represents different project sizes and sectors. We would be happy to discuss relevant experience personally.",
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link className="button button--dark" to="/kontakt">
            {t.nav.contact} <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
