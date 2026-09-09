import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Handshake, Lightning } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { useSite } from "../site-shell";
import { Counter, DrawRule, Item, Reveal, Stagger } from "../motion";

export const Route = createFileRoute("/unternehmen")({ component: Company });

function Company() {
  const { lang, t } = useSite();
  const local = <T,>(de: T, it: T, en: T) => ({ de, it, en })[lang];
  const reduce = useReducedMotion();

  // The timeline rule fills as the milestones scroll past. Motivated: it tells
  // the reader how far through the company history they are.
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.001 });

  const values = [
    [
      Compass,
      local("Durchdacht", "Ben progettato", "Well considered"),
      local(
        "Planung mit Blick auf Nutzung, Effizienz und spätere Erweiterungen.",
        "Progettazione attenta all'uso, all'efficienza e agli ampliamenti futuri.",
        "Planning with an eye on use, efficiency and future expansion.",
      ),
    ],
    [
      Lightning,
      local("Präzise", "Preciso", "Precise"),
      local(
        "Saubere Umsetzung und sorgfältig abgestimmte Systeme.",
        "Realizzazione accurata e sistemi perfettamente coordinati.",
        "Clean execution and carefully coordinated systems.",
      ),
    ],
    [
      Handshake,
      local("Verlässlich", "Affidabile", "Dependable"),
      local(
        "Ein direkter Ansprechpartner vom ersten Gespräch bis zum Service.",
        "Un referente diretto dal primo colloquio all'assistenza.",
        "A direct contact from the first conversation through service.",
      ),
    ],
  ] as const;

  return (
    <main className="inner-page">
      <section className="page-hero page-pad">
        <Reveal>
          <span className="kicker">{t.company.kicker}</span>
          <h1>
            {local(
              "Erfahrung, die weiterdenkt.",
              "Esperienza che guarda avanti.",
              "Experience that thinks ahead.",
            )}
          </h1>
          <p className="lead">
            {local(
              "Seit 2001 verbinden wir klassisches Elektrohandwerk mit intelligenter Gebäudetechnik und nachhaltiger Energie.",
              "Dal 2001 uniamo l'elettrotecnica tradizionale all'automazione intelligente e all'energia sostenibile.",
              "Since 2001, we have combined traditional electrical craftsmanship with intelligent building technology and sustainable energy.",
            )}
          </p>
        </Reveal>
      </section>

      <div className="page-pad">
        <DrawRule />
      </div>

      <section className="section-pad page-pad company-quote">
        <Reveal>
          <blockquote>{t.company.quote}</blockquote>
          <cite>Aristoteles</cite>
        </Reveal>
        <Reveal className="company-facts" delay={0.1}>
          <div>
            <strong className="mono">2001</strong>
            <span>{local("in Bruneck gegründet", "fondata a Brunico", "founded in Bruneck")}</span>
          </div>
          <div>
            <strong className="mono">
              <Counter value={new Date().getFullYear() - 2001} locale={t.htmlLang} />+
            </strong>
            <span>{local("Jahre im Einsatz", "anni di attività", "years in operation")}</span>
          </div>
          <div>
            <strong className="mono">360°</strong>
            <span>
              {local(
                "Planung bis Wartung",
                "dalla progettazione alla manutenzione",
                "planning through maintenance",
              )}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="page-pad" style={{ paddingBottom: "var(--sect)" }}>
        <Stagger className="value-grid" step={0.08}>
          {values.map(([Icon, title, text]) => (
            <Item className="value-card" key={title}>
              <Icon size={30} weight="light" />
              <h2>{title}</h2>
              <p>{text}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="section-pad page-pad" style={{ paddingTop: 0 }}>
        <Reveal className="history-heading">
          <span className="kicker">{local("Meilensteine", "Tappe", "Milestones")}</span>
          <h2>
            {local(
              "Gewachsen mit den Aufgaben.",
              "Cresciuti con le sfide.",
              "Growing with every challenge.",
            )}
          </h2>
        </Reveal>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track" aria-hidden="true">
            <motion.i {...(reduce ? { style: { scaleY: 1 } } : { style: { scaleY: fill } })} />
          </div>
          <Stagger step={0.06}>
            {t.company.timeline.map((milestone, index) => (
              <Item
                className={`timeline-item ${index === t.company.timeline.length - 1 ? "timeline-item--now" : ""}`}
                key={milestone.year}
              >
                <span className="mono">{milestone.year}</span>
                <div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.text}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad page-pad company-cta" style={{ paddingTop: 0 }}>
        <Reveal>
          <h2>
            {local(
              "Lernen wir Ihr Projekt kennen.",
              "Conosciamo il vostro progetto.",
              "Let's get to know your project.",
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Link className="button button--dark" to="/kontakt">
            {t.nav.request} <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
