import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, Bolt, Building2, Check, ChevronRight, Cookie,
  Lightbulb, Mail, MapPin, Menu, Network, Phone, Radio, ShieldCheck,
  SunMedium, ThermometerSun, Wrench, X, type LucideIcon,
} from "lucide-react";
import { content, referenceNames, type Lang } from "../content";

export const Route = createFileRoute("/")({ component: Index });

const serviceIcons: LucideIcon[] = [Bolt, Network, SunMedium, ShieldCheck, ThermometerSun, Wrench, Lightbulb, Radio];
const knxIcons: LucideIcon[] = [Lightbulb, SunMedium, ThermometerSun, ShieldCheck];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Index() {
  const [lang, setLang] = useState<Lang>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const t = content[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("elektro-lahner-language");
    if (saved === "de" || saved === "it" || saved === "en") setLang(saved);
    if (!document.cookie.includes("elektro_lahner_consent=")) setCookieOpen(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.metaTitle;
    window.localStorage.setItem("elektro-lahner-language", lang);
  }, [lang, t.htmlLang, t.metaTitle]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1, rootMargin: "0px 0px -50px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [lang]);

  const chooseLanguage = (next: Lang) => { setLang(next); setMenuOpen(false); };
  const saveConsent = (choice: "necessary" | "all") => {
    document.cookie = `elektro_lahner_consent=${choice}; Max-Age=15552000; Path=/; SameSite=Lax`;
    setCookieOpen(false);
  };

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Elektro Lahner"><img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" /></a>
        <nav className="desktop-nav" aria-label="Navigation"><a href="#leistungen">{t.nav.services}</a><a href="#knx">{t.nav.knx}</a><a href="#unternehmen">{t.nav.company}</a><a href="#referenzen">{t.nav.references}</a></nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language selection">{(["de", "it", "en"] as Lang[]).map((code) => <button key={code} onClick={() => chooseLanguage(code)} className={lang === code ? "active" : ""} aria-pressed={lang === code}>{code.toUpperCase()}</button>)}</div>
          <a className="nav-cta" href="#kontakt">{t.nav.request} <ArrowRight size={16} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
          <a onClick={() => setMenuOpen(false)} href="#leistungen">{t.nav.services}</a><a onClick={() => setMenuOpen(false)} href="#knx">{t.nav.knx}</a><a onClick={() => setMenuOpen(false)} href="#unternehmen">{t.nav.company}</a><a onClick={() => setMenuOpen(false)} href="#referenzen">{t.nav.references}</a><a onClick={() => setMenuOpen(false)} href="#kontakt">{t.nav.contact}</a>
          <div className="mobile-languages">{(["de", "it", "en"] as Lang[]).map((code) => <button key={code} onClick={() => chooseLanguage(code)} className={lang === code ? "active" : ""}>{code.toUpperCase()}</button>)}</div>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <img className="hero-image" src="/hero-elektro-lahner.webp" alt="Modern electrical engineering and energy-efficient alpine home" />
          <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
          <div className="hero-content"><div className="eyebrow"><span /> {t.hero.eyebrow}</div><h1>{t.hero.title}<br /><em>{t.hero.accent}</em></h1><p>{t.hero.text}</p><div className="hero-actions"><a className="button button--primary" href="#kontakt">{t.hero.primary} <ArrowRight size={18} /></a><a className="button button--ghost" href="#leistungen">{t.hero.secondary} <ArrowDown size={18} /></a></div></div>
          <div className="hero-facts">{t.hero.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </section>

        <section id="leistungen" className="section services-section">
          <Reveal className="section-heading"><div><span className="kicker">{t.services.kicker}</span><h2>{t.services.title}</h2></div><p>{t.services.text}</p></Reveal>
          <div className="service-grid">{t.services.items.map((service, index) => { const Icon = serviceIcons[index] ?? Bolt; return <Reveal className="service-card" key={service.slug}><a href={`#${service.slug}`} aria-label={`${t.services.more}: ${service.title}`}><div className="service-number">0{index + 1}</div><Icon className="service-icon" strokeWidth={1.5} /><h3>{service.title}</h3><p>{service.short}</p><span className="card-link">{t.services.more} <ChevronRight size={16} /></span></a></Reveal>; })}</div>
        </section>

        <section className="service-details" aria-labelledby="service-detail-title">
          <Reveal className="detail-heading"><span className="kicker">{t.services.detailKicker}</span><h2 id="service-detail-title">{t.services.detailTitle}</h2><p>{t.services.detailText}</p></Reveal>
          <div className="detail-list">{t.services.items.map((service, index) => { const Icon = serviceIcons[index] ?? Bolt; return <article id={service.slug} className="service-detail" key={service.slug}><Reveal className="detail-title"><span>0{index + 1}</span><Icon strokeWidth={1.4} /><h3>{service.title}</h3></Reveal><Reveal className="detail-body"><p>{service.intro}</p><ul>{service.bullets.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><a href="#kontakt">{t.nav.request} <ArrowRight size={16} /></a></Reveal></article>; })}</div>
        </section>

        <section id="knx" className="knx-section">
          <div className="knx-visual"><div className="orbit orbit--one" /><div className="orbit orbit--two" /><div className="knx-core"><Network size={42} /><strong>KNX</strong><span>Smart Building</span></div>{t.knx.labels.map((label, i) => { const Icon = knxIcons[i] ?? Network; return <div className={`knx-node node-${i + 1}`} key={label}><Icon size={20} /><span>{label}</span></div>; })}</div>
          <Reveal className="knx-copy"><span className="kicker kicker--dark">{t.knx.kicker}</span><h2>{t.knx.title}</h2><p>{t.knx.text}</p><ul>{t.knx.points.map((point, i) => <li key={point.title}><span>0{i + 1}</span><div><strong>{point.title}</strong><p>{point.text}</p></div></li>)}</ul><div className="knx-note">{t.knx.note}</div></Reveal>
        </section>

        <section id="unternehmen" className="section about-section"><Reveal className="about-intro"><span className="kicker">{t.company.kicker}</span><blockquote>{t.company.quote}</blockquote><span className="quote-author">— Aristoteles</span></Reveal><div className="timeline">{t.company.timeline.map((item, i) => <Reveal className={`timeline-item ${i === t.company.timeline.length - 1 ? "timeline-item--now" : ""}`} key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}</div></section>

        <section id="referenzen" className="references-section"><Reveal className="references-copy"><span className="kicker kicker--dark">{t.references.kicker}</span><h2>{t.references.title}</h2><p>{t.references.text}</p></Reveal><div className="reference-list">{referenceNames.map((name, i) => <Reveal className="reference-row" key={name}><span>0{i + 1}</span><strong>{name}</strong><ArrowRight size={20} /></Reveal>)}</div></section>

        <section id="kontakt" className="contact-section">
          <div className="contact-glow" /><Reveal className="contact-lead"><span className="kicker kicker--dark">{t.contact.kicker}</span><h2>{t.contact.title}<br /><em>{t.contact.accent}</em></h2><p>{t.contact.text}</p></Reveal>
          <Reveal className="contact-card"><a href="tel:+390474773636"><Phone /><div><span>{t.contact.phone}</span><strong>+39 0474 77 36 36</strong></div></a><a href="mailto:info@elektro-lahner.com"><Mail /><div><span>{t.contact.email}</span><strong>info@elektro-lahner.com</strong></div></a><a href="https://maps.google.com/?q=Johann+Georg+Mahl+Str.+40%2FA+39031+Bruneck" target="_blank" rel="noreferrer"><MapPin /><div><span>{t.contact.address}</span><strong>J.-G.-Mahl-Str. 40/A<br />39031 Bruneck / Brunico (BZ)</strong></div></a><div className="office-hours"><Building2 /><div><span>{t.contact.hours}</span><strong>{t.contact.weekdays}</strong></div></div></Reveal>
        </section>

        <section className="legal-section">
          <Reveal className="legal-heading"><span className="kicker">{t.legal.kicker}</span><h2>{t.legal.imprint} &<br />{t.legal.privacy}</h2></Reveal>
          <div className="legal-grid">
            <article id="impressum" className="legal-card"><span className="legal-index">01</span><h3>{t.legal.imprint}</h3><h4>{t.legal.controller}</h4><p><strong>{t.legal.companyName}</strong><br />{t.legal.registeredOffice}<br />{t.legal.contacts}</p><p>{t.legal.register}<br />{t.legal.vat}<br />{t.legal.pec}<br />{t.legal.sdi}<br />{t.legal.managingDirector}</p><h4>{t.legal.liabilityTitle}</h4><p>{t.legal.liabilityText}</p><small>{t.legal.updated}</small></article>
            <article id="datenschutz" className="legal-card"><span className="legal-index">02</span><h3>{t.legal.privacy}</h3><p>{t.legal.privacyIntro}</p><h4>{t.legal.dataTitle}</h4><p>{t.legal.dataText}</p><h4>{t.legal.basisTitle}</h4><p>{t.legal.basisText}</p><h4>{t.legal.recipientsTitle}</h4><p>{t.legal.recipientsText}</p><h4>{t.legal.retentionTitle}</h4><p>{t.legal.retentionText}</p><h4>{t.legal.rightsTitle}</h4><p>{t.legal.rightsText}</p><p><a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">{t.legal.authority}</a></p><h4>{t.legal.cookiesTitle}</h4><p>{t.legal.cookiesText}</p><small>{t.legal.updated}</small></article>
          </div>
        </section>
      </main>

      <footer><div className="footer-brand"><img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" /><p>{t.footer.claim}</p></div><div><span>{t.footer.direct}</span><a href="tel:+393423596326">+39 342 359 6326</a><a href="mailto:info@elektro-lahner.com">info@elektro-lahner.com</a></div><div><span>{t.footer.company}</span><p>Elektro Lahner GmbH / S.r.l.<br />REA BZ-198182<br />P. IVA IT02697740211</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Elektro Lahner GmbH / S.r.l.</span><a href="#impressum">{t.legal.imprint}</a><a href="#datenschutz">{t.legal.privacy}</a><button onClick={() => setCookieOpen(true)}>{t.cookie.settings}</button><a href="#top">{t.footer.up} ↑</a></div></footer>

      {cookieOpen && <aside className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><div className="cookie-icon"><Cookie /></div><div><h2 id="cookie-title">{t.cookie.title}</h2><p>{t.cookie.text}</p><a href="#datenschutz" onClick={() => setCookieOpen(false)}>{t.cookie.details} <ArrowRight size={15} /></a></div><div className="cookie-actions"><button className="cookie-secondary" onClick={() => saveConsent("necessary")}>{t.cookie.necessary}</button><button className="cookie-primary" onClick={() => saveConsent("all")}>{t.cookie.accept}</button></div></aside>}
    </div>
  );
}
