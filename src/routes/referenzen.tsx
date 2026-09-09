import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Buildings, Factory, House, Storefront } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { projects, type Sector } from "../projects";
import { useSite } from "../site-shell";
import { DrawRule, Item, Reveal, Stagger } from "../motion";

export const Route = createFileRoute("/referenzen")({ component: References });

const sectorIcons = {
  residential: House,
  hospitality: Storefront,
  commercial: Buildings,
  industry: Factory,
};

function References() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const [sector, setSector] = useState<Sector | "all">("all");

  const sectorLabels: Record<Sector, string> = {
    residential: local("Wohnbau", "Residenziale", "Residential"),
    hospitality: local("Hotellerie & Gastronomie", "Hotel e gastronomia", "Hospitality"),
    commercial: local("Gewerbe", "Commercio", "Commercial"),
    industry: local("Industrie", "Industria", "Industrial"),
  };
  const tagLabels = {
    install: local("Elektroinstallation", "Impianto elettrico", "Electrical installation"),
    light: local("Beleuchtung", "Illuminazione", "Lighting"),
    knx: "KNX",
    pv: local("Photovoltaik", "Fotovoltaico", "Photovoltaics"),
    fire: local("Brandmeldeanlage", "Rilevazione incendi", "Fire detection"),
    security: local("Alarm & Video", "Allarme e video", "Alarm & video"),
  };

  const counts = useMemo(() => {
    const c = { residential: 0, hospitality: 0, commercial: 0, industry: 0 } as Record<
      Sector,
      number
    >;
    for (const project of projects) c[project.sector] += 1;
    return c;
  }, []);

  const shown =
    sector === "all" ? projects : projects.filter((project) => project.sector === sector);
  const filters: (Sector | "all")[] = [
    "all",
    "residential",
    "hospitality",
    "commercial",
    "industry",
  ];

  return (
    <main className="inner-page">
      <section className="page-hero page-pad">
        <div className="page-watermark" aria-hidden="true">
          <Buildings weight="thin" />
        </div>
        <Reveal>
          <span className="kicker">{t.references.kicker}</span>
          <h1>{t.references.title}</h1>
          <p className="lead">{t.references.text}</p>
        </Reveal>
      </section>

      <div className="page-pad">
        <DrawRule />
      </div>

      <section className="section-pad page-pad">
        {/* Filters sit in one row above the list, and every count is real. */}
        <div
          className="filter-row"
          role="group"
          aria-label={local("Nach Branche filtern", "Filtra per settore", "Filter by sector")}
        >
          {filters.map((key) => {
            const Icon = key === "all" ? null : sectorIcons[key];
            return (
              <button
                key={key}
                className={`filter ${sector === key ? "filter--on" : ""}`}
                onClick={() => setSector(key)}
                aria-pressed={sector === key}
              >
                {Icon ? <Icon size={17} weight="light" /> : null}
                {key === "all" ? local("Alle", "Tutti", "All") : sectorLabels[key]}
                <em className="mono">{key === "all" ? projects.length : counts[key]}</em>
              </button>
            );
          })}
        </div>

        <Stagger className="project-list" step={0.015} key={sector}>
          {shown.map((project) => (
            <Item className="project-row" key={`${project.name}-${project.place}`} y={12}>
              <div className="project-main">
                <h3>{project.name}</h3>
                <span className="project-place mono">{project.place}</span>
              </div>
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tagLabels[tag]}</li>
                ))}
              </ul>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="section-pad page-pad reference-note" style={{ paddingTop: 0 }}>
        <Reveal>
          <p>
            {local(
              "Die Auswahl steht für unterschiedliche Projektgrößen und Branchen. Gerne besprechen wir passende Erfahrungen persönlich.",
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
