import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Factory, Hotel, House } from "lucide-react";
import { referenceNames } from "../content";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/referenzen")({ component: References });

function References() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const sectors = [[House, local("Wohnbau", "Residenziale", "Residential")], [Hotel, local("Hotellerie & Gastronomie", "Hotel e gastronomia", "Hospitality")], [Building2, local("Gewerbe & Öffentlichkeit", "Commercio e settore pubblico", "Commercial & public")], [Factory, local("Industrie", "Industria", "Industrial")]] as const;

  return <main className="inner-page references-page">
    <section className="page-hero page-hero--references"><div className="page-hero-index">03</div><div><span className="kicker kicker--dark">{t.references.kicker}</span><h1>{t.references.title}</h1></div><p>{t.references.text}</p></section>

    <section className="sector-strip">{sectors.map(([Icon, label]) => <div key={label}><Icon /><span>{label}</span></div>)}</section>

    <section className="reference-projects page-pad"><Reveal className="reference-intro"><span className="kicker">{local("Auswahl", "Selezione", "Selection")}</span><h2>{local("Langjährige Partnerschaften und vielfältige Aufgaben.", "Partnership durature e progetti diversi.", "Long-standing partnerships and varied projects.")}</h2></Reveal><div className="project-list">{referenceNames.map((name, index) => <Reveal className="project-row" key={name}><span>0{index + 1}</span><h3>{name}</h3><ArrowRight /></Reveal>)}</div></section>

    <section className="reference-note page-pad"><p>{local("Die gezeigte Auswahl steht für unterschiedliche Projektgrößen und Branchen. Gerne besprechen wir passende Erfahrungen persönlich.", "La selezione rappresenta diverse dimensioni e settori. Saremo lieti di approfondire personalmente le esperienze pertinenti.", "This selection represents different project sizes and sectors. We would be happy to discuss relevant experience personally.")}</p><Link to="/kontakt">{t.nav.contact}<ArrowRight /></Link></section>
  </main>;
}
