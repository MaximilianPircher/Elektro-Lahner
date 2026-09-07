import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSite } from "../site-shell";

export const Route = createFileRoute("/impressum")({ component: Imprint });

function Imprint() {
  const { t } = useSite();
  const l = t.legal;
  return <main className="inner-page legal-page page-pad"><header><span className="kicker">{l.kicker}</span><h1>{l.imprint}</h1></header><div className="legal-content"><section><span>01</span><h2>{l.controller}</h2><p><strong>{l.companyName}</strong><br />{l.registeredOffice}<br />{l.contacts}<br />{l.register}<br />{l.vat}<br />{l.pec}<br />{l.sdi}<br />{l.managingDirector}</p></section><section><span>02</span><h2>{l.liabilityTitle}</h2><p>{l.liabilityText}</p></section><small>{l.updated}</small><Link to="/datenschutz">{l.privacy}<ArrowRight /></Link></div></main>;
}
