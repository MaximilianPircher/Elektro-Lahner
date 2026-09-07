import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, BatteryCharging, Bolt, Building2, ChevronRight,
  Flame, Lightbulb, Mail, MapPin, Menu, Network, Phone, Radio, ShieldCheck,
  SunMedium, ThermometerSun, Volume2, Wrench, X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const services = [
  { icon: Bolt, title: "Elektroinstallationen", text: "Durchdachte Planung und fachgerechte Ausführung für Privatbauten, Gewerbe, Industrie und öffentliche Projekte." },
  { icon: Network, title: "KNX & Gebäudeautomation", text: "Licht, Beschattung, Heizung, Klima, Lüftung und Sicherheit intelligent in einem System verbunden." },
  { icon: SunMedium, title: "Photovoltaik", text: "Professionelle Montage, Kontrolle und Wartung von PV-Anlagen – inklusive Lösungen für netzautarke Systeme." },
  { icon: ShieldCheck, title: "Sicherheitstechnik", text: "Brandmelde-, Alarm- und Videoanlagen für frühzeitige Erkennung und zuverlässigen Schutz." },
  { icon: ThermometerSun, title: "IR-Messungen", text: "Thermografische Prüfung von PV-Modulen, elektrischen Bauteilen und Gebäudehüllen." },
  { icon: Wrench, title: "Wartung & Service", text: "Schnelle Reparaturen und regelmäßige Kontrollen für sichere, dauerhaft verfügbare Anlagen." },
  { icon: Lightbulb, title: "Beleuchtung", text: "Effiziente Beleuchtungsanlagen und öffentliche Straßenbeleuchtung, abgestimmt auf Nutzung und Umgebung." },
  { icon: Radio, title: "SAT & Medien", text: "Antennen- und SAT-Anlagen sowie Soundsysteme für klaren Empfang und ausgezeichnete Wiedergabe." },
];

const references = ["Euroclima AG", "Naturhotel Edelweiss", "Oberwiesen Hotel", "Auto Engl", "Hotel Dolomiti", "Feldmilla Designhotel"];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14, rootMargin: "0px 0px -60px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Elektro Lahner Startseite">
          <img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" />
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#leistungen">Leistungen</a><a href="#knx">KNX</a><a href="#unternehmen">Unternehmen</a><a href="#referenzen">Referenzen</a>
        </nav>
        <a className="nav-cta" href="#kontakt">Projekt anfragen <ArrowRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü öffnen" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
          <a onClick={closeMenu} href="#leistungen">Leistungen</a><a onClick={closeMenu} href="#knx">KNX</a><a onClick={closeMenu} href="#unternehmen">Unternehmen</a><a onClick={closeMenu} href="#referenzen">Referenzen</a><a onClick={closeMenu} href="#kontakt">Kontakt</a>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <img className="hero-image" src="/hero-elektro-lahner.webp" alt="Modernes energieeffizientes Haus in den Südtiroler Bergen bei Abendlicht" />
          <div className="hero-shade" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow"><span /> Elektrotechnik aus Bruneck · Seit 2001</div>
            <h1>Technik, die<br /><em>vorausdenkt.</em></h1>
            <p>Elektroinstallationen, intelligente Gebäudeautomation und nachhaltige Energielösungen – präzise geplant und zuverlässig umgesetzt.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#kontakt">Projekt besprechen <ArrowRight size={18} /></a>
              <a className="button button--ghost" href="#leistungen">Leistungen entdecken <ArrowDown size={18} /></a>
            </div>
          </div>
          <div className="hero-facts">
            <div><strong>25+</strong><span>Jahre Erfahrung</span></div>
            <div><strong>KNX</strong><span>Intelligent vernetzt</span></div>
            <div><strong>360°</strong><span>Planung bis Service</span></div>
          </div>
        </section>

        <section id="leistungen" className="section services-section">
          <Reveal className="section-heading">
            <div><span className="kicker">Unser Leistungsspektrum</span><h2>Eine Lösung.<br />Alle Systeme.</h2></div>
            <p>Vom ersten Entwurf bis zur laufenden Wartung: Wir verbinden solide Elektroinstallation mit intelligenter Steuerung, erneuerbarer Energie und moderner Sicherheitstechnik.</p>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal className="service-card" key={service.title}>
                <div className="service-number">0{index + 1}</div>
                <service.icon className="service-icon" strokeWidth={1.5} />
                <h3>{service.title}</h3><p>{service.text}</p>
                <span className="card-link">Mehr erfahren <ChevronRight size={16} /></span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="knx" className="knx-section">
          <div className="knx-visual">
            <div className="orbit orbit--one" /><div className="orbit orbit--two" />
            <div className="knx-core"><Network size={42} /><strong>KNX</strong><span>Smart Building</span></div>
            {[{ icon: Lightbulb, label: "Licht" }, { icon: SunMedium, label: "Beschattung" }, { icon: ThermometerSun, label: "Klima" }, { icon: ShieldCheck, label: "Sicherheit" }].map(({ icon: Icon, label }, i) => <div className={`knx-node node-${i + 1}`} key={label}><Icon size={20} /><span>{label}</span></div>)}
          </div>
          <Reveal className="knx-copy">
            <span className="kicker kicker--dark">Intelligente Gebäudetechnik</span>
            <h2>Ihr Gebäude.<br />Ein System.</h2>
            <p>KNX trennt Energieversorgung und Gerätesteuerung. Sensoren und Aktoren vernetzen alle wichtigen Funktionen – flexibel programmierbar, komfortabel bedienbar und jederzeit erweiterbar.</p>
            <ul>
              <li><span>01</span><div><strong>Zentral & intuitiv</strong><p>Licht, Beschattung, Heizung, Klima und Alarm gemeinsam steuern.</p></div></li>
              <li><span>02</span><div><strong>Flexibel programmierbar</strong><p>Funktionen lassen sich an neue Anforderungen anpassen – ohne die Installation neu zu verkabeln.</p></div></li>
              <li><span>03</span><div><strong>Effizient & vorausschauend</strong><p>Sensordaten ermöglichen automatische Abläufe und optimierten Energieeinsatz.</p></div></li>
            </ul>
          </Reveal>
        </section>

        <section id="unternehmen" className="section about-section">
          <Reveal className="about-intro">
            <span className="kicker">Elektro Lahner GmbH</span>
            <blockquote>„Freude an der Arbeit lässt das Werk trefflich geraten.“</blockquote>
            <span className="quote-author">— Aristoteles</span>
          </Reveal>
          <div className="timeline">
            <Reveal className="timeline-item"><span>2001</span><div><h3>Der Anfang</h3><p>Andreas Lahner gründet das Unternehmen. Im Mittelpunkt stehen Elektroinstallationen, Beleuchtung und Wartung für private Haushalte.</p></div></Reveal>
            <Reveal className="timeline-item"><span>2005</span><div><h3>Wachstum</h3><p>Mit sechs Mitarbeitern ist das Unternehmen bereit für öffentliche Arbeiten, Industrieanlagen und größere Projekte.</p></div></Reveal>
            <Reveal className="timeline-item"><span>2006–07</span><div><h3>Fokus Photovoltaik</h3><p>Gezielte Weiterbildung schafft früh fundiertes Know-how für die technisch korrekte Realisierung von PV-Anlagen.</p></div></Reveal>
            <Reveal className="timeline-item"><span>2008</span><div><h3>1.000 kWp am Netz</h3><p>Erfahrung mit Inselanlagen und netzgekoppelten Systemen führt zu einem wichtigen Meilenstein.</p></div></Reveal>
            <Reveal className="timeline-item timeline-item--now"><span>Heute</span><div><h3>Kompetenz aus einer Hand</h3><p>Planung, Installation, Automation, Energieoptimierung, Prüfung und Service für private, gewerbliche und öffentliche Kunden.</p></div></Reveal>
          </div>
        </section>

        <section id="referenzen" className="references-section">
          <Reveal className="references-copy"><span className="kicker kicker--dark">Ausgewählte Referenzen</span><h2>Vertrauen entsteht<br />durch gute Arbeit.</h2><p>Elektro Lahner realisiert Projekte für Wohnbau, Hotellerie, Gastronomie, Gewerbe und Industrie in Südtirol und darüber hinaus.</p></Reveal>
          <div className="reference-list">{references.map((name, i) => <Reveal className="reference-row" key={name}><span>0{i + 1}</span><strong>{name}</strong><ArrowRight size={20} /></Reveal>)}</div>
        </section>

        <section id="kontakt" className="contact-section">
          <div className="contact-glow" />
          <Reveal className="contact-lead"><span className="kicker kicker--dark">Ihr Projekt beginnt hier</span><h2>Was können wir<br />für Sie <em>einschalten?</em></h2><p>Ob Neubau, Sanierung, smarte Gebäudetechnik oder Photovoltaik: Sprechen wir über Ihre Anforderungen.</p></Reveal>
          <Reveal className="contact-card">
            <a href="tel:+390474773636"><Phone /><div><span>Telefon</span><strong>+39 0474 77 36 36</strong></div></a>
            <a href="mailto:info@elektro-lahner.com"><Mail /><div><span>E-Mail</span><strong>info@elektro-lahner.com</strong></div></a>
            <a href="https://maps.google.com/?q=Johann+Georg+Mahl+Str.+40%2FA+39031+Bruneck" target="_blank" rel="noreferrer"><MapPin /><div><span>Adresse</span><strong>J.-G.-Mahl-Str. 40/A<br />39031 Bruneck (BZ)</strong></div></a>
            <div className="office-hours"><Building2 /><div><span>Bürozeiten</span><strong>Mo–Fr · 08:30–12:00<br />und 13:00–17:00</strong></div></div>
          </Reveal>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" /><p>Elektrotechnik. Gebäudeautomation. Energie.</p></div>
        <div><span>Direktkontakt</span><a href="tel:+393423596326">Mobil +39 342 359 6326</a><a href="mailto:info@elektro-lahner.com">info@elektro-lahner.com</a></div>
        <div><span>Unternehmen</span><p>Elektro Lahner GmbH<br />UID IT02697740211<br />Empfängerkodex SUBM70N</p></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Elektro Lahner GmbH</span><a href="https://www.elektro-lahner.com/de/disclaimer/">Impressum</a><a href="https://www.elektro-lahner.com/de/privacy/">Datenschutz</a><a href="#top">Nach oben ↑</a></div>
      </footer>
    </div>
  );
}
