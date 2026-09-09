import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Cookie, List, X } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content, type Lang } from "./content";

type SiteContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: (typeof content)[Lang] };
const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside SiteShell");
  return value;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState<Lang>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const reduce = useReducedMotion();
  const t = content[lang];

  // Scroll state comes from Motion, never from a scroll event listener: the
  // progress bar is driven by a motion value and the header only re-renders
  // when it actually crosses the threshold.
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.0005 });
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    setScrolled((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const saved = window.localStorage.getItem("elektro-lahner-language");
    if (saved === "de" || saved === "it" || saved === "en") setLanguage(saved);
    if (!document.cookie.includes("elektro_lahner_consent=")) setCookieOpen(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    const routeTitles: Record<string, string> = {
      "/leistungen": t.nav.services,
      "/unternehmen": t.nav.company,
      "/referenzen": t.nav.references,
      "/kontakt": t.nav.contact,
      "/impressum": t.legal.imprint,
      "/datenschutz": t.legal.privacy,
    };
    const serviceSlug = pathname.startsWith("/leistungen/") ? pathname.split("/").pop() : undefined;
    const serviceTitle = t.services.items.find((item) => item.slug === serviceSlug)?.title;
    const pageTitle = serviceTitle ?? routeTitles[pathname];
    document.title = pageTitle ? `${pageTitle} | Elektro Lahner` : t.metaTitle;
    window.localStorage.setItem("elektro-lahner-language", lang);
  }, [lang, pathname, t]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, lang]);

  const setLang = (next: Lang) => {
    setLanguage(next);
    setMenuOpen(false);
  };
  const contextValue = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  const saveConsent = (choice: "necessary" | "all") => {
    document.cookie = `elektro_lahner_consent=${choice}; Max-Age=15552000; Path=/; SameSite=Lax`;
    setCookieOpen(false);
  };

  const nav = [
    { to: "/leistungen", label: t.nav.services },
    { to: "/unternehmen", label: t.nav.company },
    { to: "/referenzen", label: t.nav.references },
    { to: "/kontakt", label: t.nav.contact },
  ] as const;

  const onHome = pathname === "/";
  const languages: Lang[] = ["de", "it", "en"];

  return (
    <SiteContext.Provider value={contextValue}>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className={`topbar ${scrolled || !onHome ? "topbar--scrolled" : ""}`}>
        <Link className="brand" to="/" aria-label="Elektro Lahner">
          <img
            className="logo-on-dark"
            src="/logo-lahner-white.png"
            alt="Elektro Lahner"
            width={112}
            height={57}
          />
          <img
            className="logo-ink"
            src="/logo-lahner.png"
            alt=""
            aria-hidden="true"
            width={112}
            height={57}
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navigation">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ className: "active" }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" role="group" aria-label="Sprache">
            {languages.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={lang === code ? "active" : ""}
                aria-pressed={lang === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <Link className="nav-cta" to="/kontakt">
            {t.nav.request}
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {nav.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <div className="mobile-languages">
              {languages.map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={lang === code ? "active" : ""}
                  aria-pressed={lang === code}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route transition. Motivated: makes navigation read as one continuous
          surface rather than a hard document swap. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${pathname}-${lang}`}
          {...(reduce
            ? { initial: false as const }
            : {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.4, ease: EASE },
              })}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <footer>
        <div className="page-pad">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/logo-lahner-white.png" alt="Elektro Lahner" width={124} height={63} />
              <p>{t.footer.claim}</p>
            </div>
            <div className="footer-col">
              <h4>{t.footer.direct}</h4>
              <a href="tel:+390474773636">+39 0474 77 36 36</a>
              <a href="mailto:info@elektro-lahner.com">info@elektro-lahner.com</a>
              <a
                href="https://maps.google.com/?q=Johann-Georg-Mahl-Stra%C3%9Fe+40A+39031+Bruneck"
                target="_blank"
                rel="noreferrer"
              >
                Johann-Georg-Mahl-Straße 40/A
                <br />
                39031 Bruneck (BZ)
              </a>
            </div>
            <div className="footer-col">
              <h4>{t.footer.company}</h4>
              <p>
                Elektro Lahner GmbH / S.r.l.
                <br />
                P. IVA IT02697740211
                <br />
                SDI SUBM70N
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="spacer">
              © {new Date().getFullYear()} Elektro Lahner GmbH / S.r.l.
            </span>
            <Link to="/impressum">{t.legal.imprint}</Link>
            <Link to="/datenschutz">{t.legal.privacy}</Link>
            <button onClick={() => setCookieOpen(true)}>{t.cookie.settings}</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
              aria-label={t.footer.up}
            >
              <ArrowUp size={14} weight="bold" />
            </button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {cookieOpen && (
          <motion.aside
            className="cookie-banner"
            role="dialog"
            aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Cookie size={22} weight="light" />
            <h2 id="cookie-title">{t.cookie.title}</h2>
            <p>{t.cookie.text}</p>
            <Link className="text-link" to="/datenschutz" onClick={() => setCookieOpen(false)}>
              {t.cookie.details} <ArrowRight size={15} />
            </Link>
            <div className="cookie-actions">
              <button className="button button--ghost" onClick={() => saveConsent("necessary")}>
                {t.cookie.necessary}
              </button>
              <button className="button button--primary" onClick={() => saveConsent("all")}>
                {t.cookie.accept}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </SiteContext.Provider>
  );
}
