import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bolt, Cable, Camera, Check, Headphones, Lightbulb, ScanLine, SunMedium, Wrench } from "lucide-react";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/leistungen/$service")({ component: ServiceDetail });

const icons = [Cable, Bolt, SunMedium, Camera, ScanLine, Wrench, Lightbulb, Headphones];

function ServiceDetail() {
  const { service: slug } = Route.useParams();
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const index = t.services.items.findIndex((item) => item.slug === slug);
  const service = t.services.items[index];

  if (!service) return <main className="error-page"><p>404</p><h1>{local("Leistung nicht gefunden", "Servizio non trovato", "Service not found")}</h1><Link to="/leistungen">{local("Zur Übersicht", "Torna ai servizi", "Back to services")}</Link></main>;

  const Icon = icons[index] ?? Bolt;
  const previous = t.services.items[(index - 1 + t.services.items.length) % t.services.items.length]!;
  const next = t.services.items[(index + 1) % t.services.items.length]!;

  return <main className="inner-page service-page">
    <section className="service-page-hero">
      <div className="service-page-nav"><Link to="/leistungen"><ArrowLeft /> {local("Alle Leistungen", "Tutti i servizi", "All services")}</Link><span>0{index + 1} / 0{t.services.items.length}</span></div>
      <div className="service-page-heading"><div className="service-page-icon"><Icon /></div><span className="kicker kicker--dark">{t.services.detailKicker}</span><h1>{service.title}</h1><p>{service.short}</p></div>
    </section>

    <section className="service-page-body page-pad">
      <Reveal className="service-intro"><span className="section-index">0{index + 1}</span><h2>{local("Was wir für Sie umsetzen", "Cosa realizziamo per voi", "What we deliver for you")}</h2></Reveal>
      <Reveal className="service-content"><p className="service-lead">{service.intro}</p><ul>{service.bullets.map((bullet) => <li key={bullet}><Check /><span>{bullet}</span></li>)}</ul><Link className="button button--dark" to="/kontakt">{t.nav.request}<ArrowRight /></Link></Reveal>
    </section>

    <nav className="service-pagination" aria-label={local("Weitere Leistungen", "Altri servizi", "More services")}><Link to="/leistungen/$service" params={{ service: previous.slug }}><ArrowLeft /><span><small>{local("Zurück", "Precedente", "Previous")}</small>{previous.title}</span></Link><Link to="/leistungen/$service" params={{ service: next.slug }}><span><small>{local("Weiter", "Successivo", "Next")}</small>{next.title}</span><ArrowRight /></Link></nav>
  </main>;
}
