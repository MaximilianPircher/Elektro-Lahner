import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Cookie, Menu, Phone, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content, type Lang } from "./content";

type SiteContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: (typeof content)[Lang] };
const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside SiteShell");
  return value;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState<Lang>("de");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const t = content[lang];

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
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.1, rootMargin: "0px 0px -50px" },
    );
    const frame = requestAnimationFrame(() => document.querySelectorAll(".reveal").forEach((el) => observer.observe(el)));
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname, lang]);

  const setLang = (next: Lang) => { setLanguage(next); setMenuOpen(false); };
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

  return <SiteContext.Provider value={contextValue}>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <header className={`topbar multipage-nav ${scrolled || pathname !== "/" ? "topbar--scrolled" : ""}`}>
      <Link className="brand" to="/" aria-label="Elektro Lahner"><img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" /></Link>
      <nav className="desktop-nav" aria-label="Navigation">{nav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "active" }}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <div className="language-switch" aria-label="Language selection">{(["de", "it", "en"] as Lang[]).map((code) => <button key={code} onClick={() => setLang(code)} className={lang === code ? "active" : ""} aria-pressed={lang === code}>{code.toUpperCase()}</button>)}</div>
        <Link className="nav-cta" to="/kontakt">{t.nav.request} <ArrowRight size={16} /></Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>{nav.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}<div className="mobile-languages">{(["de", "it", "en"] as Lang[]).map((code) => <button key={code} onClick={() => setLang(code)} className={lang === code ? "active" : ""}>{code.toUpperCase()}</button>)}</div></div>
    </header>

    <div key={`${pathname}-${lang}`} className="page-enter">{children}</div>

    <footer>
      <div className="footer-brand"><img src="https://www.elektro-lahner.com/images/logo.png" alt="Elektro Lahner" /><p>{t.footer.claim}</p></div>
      <div><span>{t.footer.direct}</span><a href="tel:+393423596326"><Phone size={14} /> +39 342 359 6326</a><a href="mailto:info@elektro-lahner.com">info@elektro-lahner.com</a></div>
      <div><span>{t.footer.company}</span><p>Elektro Lahner GmbH / S.r.l.<br />REA BZ-198182<br />P. IVA IT02697740211</p></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Elektro Lahner GmbH / S.r.l.</span><Link to="/impressum">{t.legal.imprint}</Link><Link to="/datenschutz">{t.legal.privacy}</Link><button onClick={() => setCookieOpen(true)}>{t.cookie.settings}</button><Link to="/">Home ↑</Link></div>
    </footer>

    {cookieOpen && <aside className="cookie-banner" role="dialog" aria-labelledby="cookie-title"><div className="cookie-icon"><Cookie /></div><div><h2 id="cookie-title">{t.cookie.title}</h2><p>{t.cookie.text}</p><Link to="/datenschutz" onClick={() => setCookieOpen(false)}>{t.cookie.details} <ArrowRight size={15} /></Link></div><div className="cookie-actions"><button className="cookie-secondary" onClick={() => saveConsent("necessary")}>{t.cookie.necessary}</button><button className="cookie-primary" onClick={() => saveConsent("all")}>{t.cookie.accept}</button></div></aside>}
  </SiteContext.Provider>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
