import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Bolt, Network, ShieldCheck, SunMedium } from "lucide-react";
import { referenceNames } from "../content";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/")({ component: Home });

const icons = [Bolt, Network, SunMedium, ShieldCheck];

function Home() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const divisions = t.services.items.slice(0, 4);

  return <main>
    <section className="home-hero">
      <img className="hero-image" src="/hero-elektro-lahner.webp" alt="Modern alpine building powered by intelligent electrical technology" />
      <div className="home-hero-shade" /><div className="hero-grid" />
      <div className="home-hero-center"><span>{t.hero.eyebrow}</span><h1>{t.hero.title}<br /><em>{t.hero.accent}</em></h1></div>
      <div className="home-hero-bottom"><p>{t.hero.text}</p><Link to="/leistungen">{t.hero.secondary} <ArrowRight /></Link></div>
      <div className="scroll-cue"><ArrowDown /><span>Scroll</span></div>
    </section>

    <section className="home-statement page-pad">
      <Reveal><span className="kicker">{local("Elektrotechnik aus Südtirol", "Elettrotecnica dall’Alto Adige", "Electrical engineering from South Tyrol")}</span><h2>{local("Wir bringen Energie, Komfort und Sicherheit in ein System.", "Portiamo energia, comfort e sicurezza in un unico sistema.", "We bring energy, comfort and safety into one system.")}</h2></Reveal>
      <Reveal className="statement-side"><p>{t.services.text}</p><Link className="text-link" to="/unternehmen">{t.nav.company} <ArrowRight size={17} /></Link></Reveal>
    </section>

    <section className="division-section">
      <div className="division-intro page-pad"><span>01</span><h2>{t.services.kicker}</h2><p>{local("Vier Kompetenzfelder, ein verlässlicher Ansprechpartner.", "Quattro aree di competenza, un unico referente affidabile.", "Four fields of expertise, one dependable partner.")}</p></div>
      <div className="division-grid">{divisions.map((service, index) => { const Icon = icons[index] ?? Bolt; return <Link to="/leistungen/$service" params={{ service: service.slug }} className="division-card" key={service.slug}><span>0{index + 1}</span><Icon /><div><h3>{service.title}</h3><p>{service.short}</p></div><ArrowRight className="division-arrow" /></Link>; })}</div>
      <div className="division-all"><Link to="/leistungen">{local("Alle Leistungen ansehen", "Vedi tutti i servizi", "View all services")} <ArrowRight /></Link></div>
    </section>

    <section className="home-proof page-pad">
      <Reveal className="proof-copy"><span className="kicker">{t.company.kicker}</span><blockquote>{t.company.quote}</blockquote><p>— Aristoteles</p></Reveal>
      <div className="proof-numbers">{t.hero.facts.map(([number, label]) => <Reveal className="proof-number" key={label}><strong>{number}</strong><span>{label}</span></Reveal>)}</div>
    </section>

    <section className="reference-band"><div className="reference-track">{[...referenceNames, ...referenceNames].map((name, i) => <span key={`${name}-${i}`}>{name}<i>×</i></span>)}</div></section>

    <section className="home-contact page-pad"><Reveal><span className="kicker kicker--dark">{t.contact.kicker}</span><h2>{t.contact.title}<br /><em>{t.contact.accent}</em></h2></Reveal><Reveal><p>{t.contact.text}</p><Link className="round-link" to="/kontakt"><ArrowRight /></Link></Reveal></section>
  </main>;
}
