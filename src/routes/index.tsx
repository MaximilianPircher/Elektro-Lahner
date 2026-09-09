import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Lightning,
  ShieldCheck,
  SolarPanel,
  TreeStructure,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { DayProfile } from "../components/day-profile";
import { KnxBus } from "../components/knx-bus";
import { referenceNames } from "../content";
import { useSite } from "../site-shell";
import {
  Counter,
  Item,
  Magnetic,
  MaskLines,
  Reveal,
  Stagger,
  useHeroParallax,
  useSpotlight,
} from "../motion";

export const Route = createFileRoute("/")({ component: Home });

const divisionIcons = [Lightning, TreeStructure, SolarPanel, ShieldCheck];
const cellVariants = ["division-card--media", "division-card--signal", "", ""];

function Home() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const heroRef = useRef<HTMLElement>(null);
  const parallax = useHeroParallax(heroRef);
  const reduce = useReducedMotion();
  const spotlight = useSpotlight();
  const divisions = t.services.items.slice(0, 4);

  const facts = [
    {
      value: new Date().getFullYear() - 2001,
      unit: "+",
      label: local("Jahre Erfahrung", "Anni di esperienza", "Years of experience"),
    },
    {
      value: 1000,
      unit: " kWp",
      label: local("Photovoltaik am Netz", "Fotovoltaico in rete", "Photovoltaics on the grid"),
    },
    {
      value: t.services.items.length,
      unit: "",
      label: local("Leistungsbereiche", "Aree di competenza", "Fields of expertise"),
    },
  ];

  return (
    <main>
      {/* Hero. Three text elements: headline, subtext, actions. */}
      <section className="home-hero on-ink" ref={heroRef}>
        <motion.div
          className="hero-media"
          {...(parallax
            ? { style: { y: parallax.y, scale: parallax.scale, opacity: parallax.fade } }
            : {})}
        >
          <img
            className="hero-image"
            src="/hero-elektro-lahner.webp"
            alt={local(
              "Modernes Wohnhaus in den Dolomiten bei Dämmerung mit Photovoltaik auf dem Dach und geplanter Außenbeleuchtung",
              "Casa moderna nelle Dolomiti al crepuscolo con fotovoltaico sul tetto e illuminazione esterna progettata",
              "Modern house in the Dolomites at dusk with rooftop photovoltaics and designed exterior lighting",
            )}
            width={1920}
            height={1081}
            fetchPriority="high"
          />
        </motion.div>
        <div className="home-hero-shade" />
        <div className="hero-grid" />

        <div className="hero-body page-pad">
          <h1>
            <MaskLines lines={[t.hero.title, <em key="accent">{t.hero.accent}</em>]} />
          </h1>
          <motion.p
            className="hero-sub"
            {...(reduce
              ? { initial: false as const }
              : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const },
                })}
          >
            {t.hero.text}
          </motion.p>
          <motion.div
            className="hero-actions"
            {...(reduce
              ? { initial: false as const }
              : {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] as const },
                })}
          >
            <Link className="button button--primary" to="/kontakt">
              {t.hero.primary} <ArrowRight size={17} />
            </Link>
            <Link className="button button--ghost" to="/leistungen">
              {t.hero.secondary}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The day profile carries the argument for pairing photovoltaics with
          automation, with the figures as readings beside it. Sitting directly
          under the hero keeps the dark surface continuous. */}
      <section className="telemetry on-ink">
        <div className="page-pad telemetry-grid">
          <Reveal className="telemetry-copy">
            <h2>{t.profile.title}</h2>
            <p className="lead">{t.profile.text}</p>
            <Stagger className="readouts" step={0.09}>
              {facts.map((fact) => (
                <Item className="readout" key={fact.label} y={14}>
                  <strong className="mono">
                    <Counter value={fact.value} locale={t.htmlLang} />
                    <i>{fact.unit}</i>
                  </strong>
                  <span>{fact.label}</span>
                </Item>
              ))}
            </Stagger>
          </Reveal>

          <Reveal delay={0.1}>
            <DayProfile
              labels={{
                draw: t.profile.draw,
                generation: t.profile.generation,
                selfUse: t.profile.selfUse,
                axis: t.profile.axis,
                note: t.profile.note,
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <Reveal className="home-statement page-pad">
          <span className="kicker">
            {local(
              "Elektrotechnik aus Südtirol",
              "Elettrotecnica dall'Alto Adige",
              "Electrical engineering from South Tyrol",
            )}
          </span>
          <h2>
            {local(
              "Wir bringen Energie, Komfort und Sicherheit in ",
              "Portiamo energia, comfort e sicurezza in ",
              "We bring energy, comfort and safety into ",
            )}
            <em>{local("ein System.", "un unico sistema.", "one system.")}</em>
          </h2>
          <div className="statement-side">
            <p className="lead">{t.services.text}</p>
            <Link className="text-link" to="/unternehmen">
              {t.nav.company} <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="page-pad">
          <Reveal className="division-intro">
            <h2>{t.services.title}</h2>
            <p className="lead">
              {local(
                "Vier Kompetenzfelder, ein verlässlicher Ansprechpartner.",
                "Quattro aree di competenza, un unico referente affidabile.",
                "Four fields of expertise, one dependable partner.",
              )}
            </p>
          </Reveal>

          <Stagger className="division-grid" step={0.08}>
            {divisions.map((service, index) => {
              const Icon = divisionIcons[index] ?? Lightning;
              return (
                <Item as="div" key={service.slug}>
                  <Link
                    className={`division-card ${cellVariants[index]}`}
                    to="/leistungen/$service"
                    params={{ service: service.slug }}
                    {...spotlight}
                  >
                    {index === 0 && (
                      <img src="/hero-elektro-lahner.webp" alt="" aria-hidden="true" />
                    )}
                    <Icon size={30} weight="light" />
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                    <ArrowRight className="division-arrow" size={18} />
                  </Link>
                </Item>
              );
            })}
          </Stagger>

          <Reveal className="division-all">
            <Link className="text-link" to="/leistungen">
              {local("Alle Leistungen ansehen", "Vedi tutti i servizi", "View all services")}{" "}
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The KNX schematic is the technical argument of the page: it shows why
          a bus system behaves differently from conventional wiring. */}
      <section className="knx on-ink section-pad">
        <div className="page-pad knx-grid">
          <Reveal className="knx-copy">
            <span className="kicker kicker--dark">{t.knx.kicker}</span>
            <h2>{t.knx.title}</h2>
            <p className="lead">{t.knx.text}</p>
            <ul className="knx-points">
              {t.knx.points.map((point) => (
                <li key={point.title}>
                  <Check size={17} weight="bold" />
                  <div>
                    <strong>{point.title}</strong>
                    <p>{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="knx-note">{t.knx.note}</p>
          </Reveal>

          <Reveal className="bus-figure" delay={0.1}>
            <KnxBus
              sensors={t.knx.bus.sensors}
              actuators={t.knx.bus.actuators}
              busLabel={t.knx.bus.label}
            />
            <div className="bus-caption">
              {t.knx.bus.caption.map(([term, meaning]) => (
                <span key={term}>
                  <b>{term}</b> {meaning}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-pad home-proof">
          <Reveal className="proof-copy">
            <blockquote>{t.company.quote}</blockquote>
            <cite>Aristoteles</cite>
          </Reveal>
          <Stagger className="proof-numbers" step={0.08}>
            {t.company.timeline.slice(0, 4).map((milestone) => (
              <Item className="proof-number" key={milestone.year}>
                <strong className="mono">{milestone.year}</strong>
                <span>{milestone.title}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="reference-band" aria-label={t.references.kicker}>
        <motion.div
          className="reference-track"
          {...(reduce
            ? {}
            : {
                animate: { x: ["0%", "-50%"] },
                transition: { duration: 34, ease: "linear" as const, repeat: Infinity },
              })}
        >
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {referenceNames.map((name) => (
                <span key={name}>
                  {name} <i />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="home-contact on-ink section-pad">
        <div className="page-pad contact-inner">
          <Reveal>
            <span className="kicker kicker--dark">{t.contact.kicker}</span>
            <h2>
              {t.contact.title} <em>{t.contact.accent}</em>
            </h2>
          </Reveal>
          <Reveal className="contact-aside" delay={0.08}>
            <p className="lead">{t.contact.text}</p>
            <div className="contact-direct">
              <a href="tel:+390474773636">+39 0474 77 36 36</a>
              <a href="mailto:info@elektro-lahner.com">info@elektro-lahner.com</a>
            </div>
            <Magnetic>
              <Link className="round-link" to="/kontakt" aria-label={t.nav.request}>
                <ArrowRight size={22} weight="bold" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
