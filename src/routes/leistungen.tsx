import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bolt, Cable, Camera, Headphones, Lightbulb, ScanLine, SunMedium, Wrench } from "lucide-react";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/leistungen")({ component: Services });

const icons = [Cable, Bolt, SunMedium, Camera, ScanLine, Wrench, Lightbulb, Headphones];

function Services() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];

  return <main className="inner-page">
    <section className="page-hero page-hero--services">
      <div className="page-hero-index">01</div>
      <div><span className="kicker kicker--dark">{t.services.kicker}</span><h1>{t.services.title}</h1></div>
      <p>{t.services.text}</p>
    </section>

    <section className="service-overview page-pad">
      <Reveal className="overview-intro"><span className="kicker">{t.services.detailKicker}</span><h2>{t.services.detailTitle}</h2><p>{t.services.detailText}</p></Reveal>
      <div className="service-overview-grid">
        {t.services.items.map((service, index) => { const Icon = icons[index] ?? Bolt; return <Reveal className="service-overview-wrap" key={service.slug}><Link className="service-overview-card" to="/leistungen/$service" params={{ service: service.slug }}><div className="service-card-top"><span>0{index + 1}</span><Icon /></div><h3>{service.title}</h3><p>{service.short}</p><div className="service-card-action">{t.services.more}<ArrowRight /></div></Link></Reveal>; })}
      </div>
    </section>

    <section className="service-principle page-pad"><span>360°</span><div><h2>{local("Von der Planung bis zum Service.", "Dalla progettazione all’assistenza.", "From planning to service.")}</h2><p>{local("Ein Ansprechpartner koordiniert Systeme, Schnittstellen und Umsetzung.", "Un unico referente coordina sistemi, interfacce e realizzazione.", "One partner coordinates systems, interfaces and delivery.")}</p></div><Link className="round-link" to="/kontakt"><ArrowRight /></Link></section>
  </main>;
}
