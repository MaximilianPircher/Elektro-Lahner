import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useSite } from "../site-shell";

export const Route = createFileRoute("/datenschutz")({ component: Privacy });

function Privacy() {
  const { t } = useSite();
  const l = t.legal;
  const sections = [[l.dataTitle, l.dataText], [l.basisTitle, l.basisText], [l.recipientsTitle, l.recipientsText], [l.retentionTitle, l.retentionText], [l.rightsTitle, `${l.rightsText} ${l.authority}`], [l.cookiesTitle, l.cookiesText]];
  return <main className="inner-page legal-page page-pad"><header><span className="kicker">{l.kicker}</span><h1>{l.privacy}</h1><p>{l.privacyIntro}</p></header><div className="legal-content"><section><span>01</span><h2>{l.controller}</h2><p><strong>{l.companyName}</strong><br />{l.registeredOffice}<br />{l.contacts}<br />{l.pec}</p></section>{sections.map(([title, text], index) => <section key={title}><span>0{index + 2}</span><h2>{title}</h2><p>{text}</p></section>)}<small>{l.updated}</small><Link to="/impressum"><ArrowLeft />{l.imprint}</Link></div></main>;
}
