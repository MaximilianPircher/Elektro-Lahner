import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Handshake, Zap } from "lucide-react";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/unternehmen")({ component: Company });

function Company() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const values = [
    [Compass, local("Durchdacht", "Ben progettato", "Well considered"), local("Planung mit Blick auf Nutzung, Effizienz und spätere Erweiterungen.", "Progettazione attenta all’uso, all’efficienza e agli ampliamenti futuri.", "Planning with an eye on use, efficiency and future expansion.")],
    [Zap, local("Präzise", "Preciso", "Precise"), local("Saubere Umsetzung und sorgfältig abgestimmte Systeme.", "Realizzazione accurata e sistemi perfettamente coordinati.", "Clean execution and carefully coordinated systems.")],
    [Handshake, local("Verlässlich", "Affidabile", "Dependable"), local("Ein direkter Ansprechpartner vom ersten Gespräch bis zum Service.", "Un referente diretto dal primo colloquio all’assistenza.", "A direct contact from the first conversation through service.")],
  ] as const;

  return <main className="inner-page">
    <section className="page-hero page-hero--company"><div className="page-hero-index">02</div><div><span className="kicker kicker--dark">{t.company.kicker}</span><h1>{local("Erfahrung, die weiterdenkt.", "Esperienza che guarda avanti.", "Experience that thinks ahead.")}</h1></div><p>{local("Seit 2001 verbinden wir klassisches Elektrohandwerk mit intelligenter Gebäudetechnik und nachhaltiger Energie.", "Dal 2001 uniamo l’elettrotecnica tradizionale all’automazione intelligente e all’energia sostenibile.", "Since 2001, we have combined traditional electrical craftsmanship with intelligent building technology and sustainable energy.")}</p></section>

    <section className="company-quote page-pad"><Reveal><blockquote>{t.company.quote}</blockquote><p>— Aristoteles</p></Reveal><Reveal className="company-facts"><strong>2001</strong><span>{local("in Bruneck gegründet", "fondata a Brunico", "founded in Bruneck")}</span><strong>360°</strong><span>{local("Planung bis Wartung", "dalla progettazione alla manutenzione", "planning through maintenance")}</span></Reveal></section>

    <section className="value-grid page-pad">{values.map(([Icon, title, text], index) => <Reveal className="value-card" key={title}><span>0{index + 1}</span><Icon /><h2>{title}</h2><p>{text}</p></Reveal>)}</section>

    <section className="company-history page-pad"><Reveal className="history-heading"><span className="kicker">{local("Meilensteine", "Tappe", "Milestones")}</span><h2>{local("Gewachsen mit den Aufgaben.", "Cresciuti con le sfide.", "Growing with every challenge.")}</h2></Reveal><div className="timeline">{t.company.timeline.map((item, index) => <Reveal className={`timeline-item ${index === t.company.timeline.length - 1 ? "timeline-item--now" : ""}`} key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}</div></section>

    <section className="company-cta page-pad"><h2>{local("Lernen wir Ihr Projekt kennen.", "Conosciamo il vostro progetto.", "Let’s get to know your project.")}</h2><Link to="/kontakt">{t.nav.request}<ArrowRight /></Link></section>
  </main>;
}
