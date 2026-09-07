import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, useSite } from "../site-shell";

export const Route = createFileRoute("/kontakt")({ component: Contact });

function Contact() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const subject = encodeURIComponent(local("Projektanfrage über die Website", "Richiesta progetto dal sito web", "Project enquiry via website"));

  return <main className="inner-page contact-page">
    <section className="contact-hero page-pad"><Reveal><span className="kicker kicker--dark">{t.contact.kicker}</span><h1>{t.contact.title}<br /><em>{t.contact.accent}</em></h1><p>{t.contact.text}</p></Reveal><Reveal className="contact-direct"><span>{local("Direkt erreichbar", "Contatto diretto", "Direct contact")}</span><a href="tel:+390474773636">+39 0474 77 36 36</a><a href={`mailto:info@elektro-lahner.com?subject=${subject}`}>info@elektro-lahner.com</a></Reveal></section>

    <section className="contact-grid page-pad">
      <a href="tel:+390474773636"><Phone /><span>{t.contact.phone}</span><strong>+39 0474 77 36 36</strong></a>
      <a href={`mailto:info@elektro-lahner.com?subject=${subject}`}><Mail /><span>{t.contact.email}</span><strong>info@elektro-lahner.com</strong></a>
      <a href="https://maps.google.com/?q=Johann-Georg-Mahl-Straße+40A+39031+Bruneck" target="_blank" rel="noreferrer"><MapPin /><span>{t.contact.address}</span><strong>Johann-Georg-Mahl-Straße 40/A<br />39031 Bruneck (BZ), Italien</strong></a>
      <div><Clock3 /><span>{t.contact.hours}</span><strong>{t.contact.weekdays}</strong></div>
    </section>
  </main>;
}
