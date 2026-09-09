export type Lang = "de" | "it" | "en";

export type ServiceCopy = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  bullets: string[];
};

type Copy = {
  htmlLang: string;
  metaTitle: string;
  nav: {
    services: string;
    knx: string;
    company: string;
    references: string;
    contact: string;
    request: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    primary: string;
    secondary: string;
    facts: [string, string][];
  };
  services: {
    kicker: string;
    title: string;
    text: string;
    more: string;
    detailKicker: string;
    detailTitle: string;
    detailText: string;
    items: ServiceCopy[];
  };
  knx: {
    kicker: string;
    title: string;
    text: string;
    labels: string[];
    points: { title: string; text: string }[];
    note: string;
    bus: { label: string; sensors: string[]; actuators: string[]; caption: [string, string][] };
  };
  company: {
    kicker: string;
    quote: string;
    timeline: { year: string; title: string; text: string }[];
  };
  references: { kicker: string; title: string; text: string };
  contact: {
    kicker: string;
    title: string;
    accent: string;
    text: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    weekdays: string;
  };
  legal: {
    kicker: string;
    imprint: string;
    privacy: string;
    owner: string;
    companyName: string;
    address: string;
    phone: string;
    email: string;
    pec: string;
    vat: string;
    sdi: string;
    webTitle: string;
    webName: string;
    webAddress: string;
    webUrl: string;
    liabilityTitle: string;
    liabilityText: string;
    privacyTitle: string;
    privacyP1: string;
    privacyP2: string;
    privacyEmail: string;
    siteTitle: string;
    siteText: string;
    updated: string;
  };
  matrix: {
    title: string;
    text: string;
    note: string;
  };
  profile: {
    title: string;
    text: string;
    axis: string;
    draw: string;
    generation: string;
    selfUse: string;
    note: string;
  };
  cookie: {
    title: string;
    text: string;
    necessary: string;
    accept: string;
    details: string;
    settings: string;
  };
  footer: { claim: string; direct: string; company: string; up: string };
};

const sharedSlugs = [
  "elektroinstallationen",
  "knx-gebaeudeautomation",
  "photovoltaik",
  "sicherheitstechnik",
  "ir-messungen",
  "wartung-service",
  "beleuchtung",
  "sat-medien",
] as const;

export const content: Record<Lang, Copy> = {
  de: {
    htmlLang: "de",
    metaTitle: "Elektro Lahner | Elektrotechnik & Gebäudeautomation in Südtirol",
    nav: {
      services: "Leistungen",
      knx: "KNX",
      company: "Unternehmen",
      references: "Referenzen",
      contact: "Kontakt",
      request: "Projekt anfragen",
    },
    hero: {
      eyebrow: "Elektrotechnik aus Bruneck · Seit 2001",
      title: "Technik, die",
      accent: "vorausdenkt.",
      text: "Elektroinstallationen, intelligente Gebäudeautomation und nachhaltige Energielösungen, präzise geplant und zuverlässig umgesetzt.",
      primary: "Projekt besprechen",
      secondary: "Leistungen entdecken",
      facts: [
        ["25+", "Jahre Erfahrung"],
        ["KNX", "Intelligent vernetzt"],
        ["360°", "Planung bis Service"],
      ],
    },
    services: {
      kicker: "Unser Leistungsspektrum",
      title: "Eine Lösung. Alle Systeme.",
      text: "Vom ersten Entwurf bis zur laufenden Wartung verbinden wir solide Elektroinstallation mit intelligenter Steuerung, erneuerbarer Energie und moderner Sicherheitstechnik.",
      more: "Mehr erfahren",
      detailKicker: "Leistungen im Detail",
      detailTitle: "Kompetenz, die weitergeht.",
      detailText:
        "Wählen Sie oben einen Bereich oder entdecken Sie hier alle Leistungen, mit den wichtigsten Anwendungen und Vorteilen auf einen Blick.",
      items: [
        {
          slug: sharedSlugs[0],
          title: "Elektroinstallationen",
          short:
            "Planung und Ausführung für Privatbauten, Gewerbe, Industrie und öffentliche Projekte.",
          intro:
            "Eine zuverlässige Elektroanlage beginnt mit eingehender Beratung und fachmännischer Planung. Wir entwickeln Lösungen für Alt- und Neubauten und setzen sie mit modernen Hilfsmitteln fachgerecht um.",
          bullets: [
            "Installationen für Wohnbau, Gewerbe, Industrie und öffentliche Bauvorhaben",
            "Schaltkastenbau, Stromverteilung und Beleuchtungsanlagen",
            "Planung, Ausführung und koordinierte Inbetriebnahme",
            "Energieoptimierung und zukunftsfähige Erweiterbarkeit",
          ],
        },
        {
          slug: sharedSlugs[1],
          title: "KNX & Gebäudeautomation",
          short: "Licht, Beschattung, Heizung, Klima und Sicherheit intelligent vernetzt.",
          intro:
            "KNX trennt Stromversorgung und Gerätesteuerung. Sensoren liefern Informationen, Aktoren setzen Befehle um. Dadurch können viele Gebäudefunktionen zentral, automatisch oder aus der Ferne gesteuert werden.",
          bullets: [
            "Beleuchtung, Beschattung, Heizung, Klima und Lüftung",
            "Alarm, Statusinformationen und zentraler Fernzugriff",
            "Anschlüsse und Funktionen durch Programmierung neu definierbar",
            "Automatische Reaktionen auf Wetter-, Temperatur-, Helligkeits- oder CO₂-Werte",
          ],
        },
        {
          slug: sharedSlugs[2],
          title: "Photovoltaik & Inselanlagen",
          short: "Montage, Kontrolle und netzautarke Stromversorgung aus einer Hand.",
          intro:
            "Unser qualifiziertes Team übernimmt die fachgerechte Montage von Photovoltaikanlagen und unterstützt bei Wartung und Kontrolle. Für entlegene Standorte planen wir außerdem netzautarke Inselsysteme.",
          bullets: [
            "Professionelle Montage und sichere elektrische Einbindung",
            "Wartung und Kontrolle bestehender PV-Anlagen",
            "Kleinstanlagen für Licht und Kommunikation",
            "Größere Inselsysteme für Almhütten, Schutz- und Forschungsstationen",
          ],
        },
        {
          slug: sharedSlugs[3],
          title: "Sicherheitstechnik",
          short: "Brandmelde-, Alarm- und Videoanlagen für Gebäude mit erhöhtem Schutzbedarf.",
          intro:
            "Elektronische Sicherheit ergänzt mechanischen Schutz. Wir realisieren Systeme, die Gefahren früh erkennen, intern alarmieren und, abhängig von der Planung, weitere technische Einrichtungen ansteuern.",
          bullets: [
            "Brandmeldeanlagen mit Alarmierung und technischer Ansteuerung",
            "Raumüberwachung durch Bewegungsmelder",
            "Außenschutz für Türen, Fenster und Glasflächen",
            "Bedienteile, Sirenen, Signalleuchten und definierte Alarmweiterleitung",
          ],
        },
        {
          slug: sharedSlugs[4],
          title: "Infrarot-Messungen",
          short: "Thermografische Prüfung von PV-Modulen, Bauteilen und Gebäudehüllen.",
          intro:
            "Wärmebilder machen Temperaturunterschiede sichtbar, die mit bloßem Auge verborgen bleiben. So lassen sich Auffälligkeiten gezielt lokalisieren und weitere Prüfungen fundiert planen.",
          bullets: [
            "Erkennen überhitzter oder möglicherweise defekter PV-Module",
            "Sichtbarmachen thermischer Auffälligkeiten an elektrischen Bauteilen",
            "Lokalisieren von Wärme- und Kältebrücken an Gebäuden",
            "Dokumentierte Grundlage für Wartung und Fehleranalyse",
          ],
        },
        {
          slug: sharedSlugs[5],
          title: "Wartung & Service",
          short: "Schnelle Reparaturen und regelmäßige Kontrollen für dauerhaft sichere Anlagen.",
          intro:
            "Ausfälle stören Abläufe und können ein Sicherheitsrisiko darstellen. Unser Service kümmert sich um die Prüfung, Fehlersuche und Reparatur elektrischer Anlagen in Haushalt, Büro und Produktion.",
          bullets: [
            "Wartungs- und Reparaturservice durch qualifizierte Elektriker",
            "Systematische Fehlersuche und nachvollziehbare Maßnahmen",
            "Kontrollen von Elektro- und PV-Anlagen",
            "Service für private, gewerbliche und industrielle Anlagen",
          ],
        },
        {
          slug: sharedSlugs[6],
          title: "Beleuchtung",
          short: "Effiziente Lichtlösungen für Innenräume, Außenbereiche und öffentliche Straßen.",
          intro:
            "Gute Beleuchtung verbindet Sehkomfort, Sicherheit und Effizienz. Wir planen und installieren Beleuchtungsanlagen passend zur Nutzung und zu den örtlichen Anforderungen.",
          bullets: [
            "Innen- und Außenbeleuchtung für Wohnen und Gewerbe",
            "Beleuchtungskonzepte für Hotellerie und Gastronomie",
            "Öffentliche Straßenbeleuchtung zur Verbesserung der Verkehrssicherheit",
            "Einbindung in KNX-Steuerungen und automatisierte Szenen",
          ],
        },
        {
          slug: sharedSlugs[7],
          title: "SAT, TV & Beschallung",
          short: "Klarer Empfang und hochwertige Wiedergabe für private und gewerbliche Räume.",
          intro:
            "Von Antennen- und Satellitenanlagen bis zur professionellen Beschallung planen wir Medientechnik zuverlässig und bedienerfreundlich, abgestimmt auf Raum, Nutzung und Qualitätsanspruch.",
          bullets: [
            "Antennen- und SAT-Anlagen",
            "Receiver, Decoder, Smartcards und Zubehör",
            "Soundsysteme für Sprache, Musik und Hintergrundbeschallung",
            "Lautsprecher-, Mischpult- und Verstärkerlösungen nach Anforderung",
          ],
        },
      ],
    },
    knx: {
      kicker: "Intelligente Gebäudetechnik",
      title: "Ihr Gebäude. Ein System.",
      text: "KNX verbindet die wichtigsten Funktionen eines Gebäudes in einem kompatiblen, flexibel programmierbaren Netzwerk.",
      labels: ["Licht", "Beschattung", "Klima", "Sicherheit"],
      points: [
        { title: "Zentral & intuitiv", text: "Viele Funktionen gemeinsam steuern." },
        { title: "Flexibel programmierbar", text: "Abläufe an neue Anforderungen anpassen." },
        {
          title: "Effizient & vorausschauend",
          text: "Sensordaten für automatische Abläufe nutzen.",
        },
      ],
      note: "Eine KNX-Anlage erfordert eine höhere Anfangsinvestition, schafft dafür langfristige Flexibilität und Komfort.",
      bus: {
        label: "KNX Bus",
        sensors: ["Taster", "Präsenzmelder", "Wetterstation", "Temperatur"],
        actuators: ["Licht", "Beschattung", "Heizung", "Lüftung"],
        caption: [
          ["Sensor", "meldet ein Ereignis"],
          ["Bus", "verteilt das Telegramm"],
          ["Aktor", "schaltet die Last"],
        ],
      },
    },
    company: {
      kicker: "Elektro Lahner GmbH",
      quote: "„Freude an der Arbeit lässt das Werk trefflich geraten.“",
      timeline: [
        {
          year: "2001",
          title: "Der Anfang",
          text: "Andreas Lahner gründet das Unternehmen mit Fokus auf Elektroinstallation, Beleuchtung und Wartung.",
        },
        {
          year: "2005",
          title: "Wachstum",
          text: "Sechs Mitarbeiter ermöglichen größere öffentliche und industrielle Projekte.",
        },
        {
          year: "2006-07",
          title: "Fokus Photovoltaik",
          text: "Gezielte Weiterbildung schafft fundiertes Know-how für PV-Anlagen.",
        },
        {
          year: "2008",
          title: "1.000 kWp am Netz",
          text: "Ein wichtiger Meilenstein dank des Vertrauens der Kunden.",
        },
        {
          year: "Heute",
          title: "Kompetenz aus einer Hand",
          text: "Planung, Installation, Automation, Energieoptimierung, Prüfung und Service.",
        },
      ],
    },
    references: {
      kicker: "Ausgewählte Referenzen",
      title: "Vertrauen entsteht durch gute Arbeit.",
      text: "Projekte für Wohnbau, Hotellerie, Gastronomie, Gewerbe und Industrie in Südtirol und darüber hinaus.",
    },
    contact: {
      kicker: "Ihr Projekt beginnt hier",
      title: "Was können wir für Sie",
      accent: "einschalten?",
      text: "Ob Neubau, Sanierung, smarte Gebäudetechnik oder Photovoltaik: Sprechen wir über Ihre Anforderungen.",
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      hours: "Bürozeiten",
      weekdays: "Mo-Fr · 08:30-12:00 und 13:00-17:00",
    },
    legal: {
      kicker: "Rechtliche Informationen",
      imprint: "Impressum",
      privacy: "Datenschutz",
      owner: "Inhaber der Internetseite",
      companyName: "Elektro Lahner GmbH",
      address: "J.-G.-Mahl Str. 40/A\n39031 Bruneck (BZ)",
      phone: "Tel. +39 0474 77 36 36",
      email: "info@elektro-lahner.com",
      pec: "PEC: elektro.lahner@legalmail.it",
      vat: "MwSt.Nr./UID.Nr.: IT02697740211",
      sdi: "Empfängerkodex für elektronische Rechnungen: SUBM70N",
      webTitle: "Web",
      webName: "Contech",
      webAddress: "Mühlen Gewerbegebiet 3\nI-39032 Sand in Taufers (BZ)",
      webUrl: "www.contech.it",
      liabilityTitle: "Haftungshinweis",
      liabilityText:
        "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
      privacyTitle: "Informationsnote laut Art. 13 DS-GVO 2016/679",
      privacyP1:
        "Gemäß Artikel 13 DS-GVO 2016/679, den Datenschutz betreffend, möchten wir Ihnen mitteilen, dass Elektro Lahner GmbH als Datenverarbeiter Ihre persönlichen Daten in seinem Archiv aufbewahrt. Die Verwendung Ihrer Daten unterliegt den Prinzipien der Korrektheit, Rechtmäßigkeit und Transparenz, wobei Ihre Privatsphäre und Ihre Rechte gewahrt werden.",
      privacyP2:
        "Diese Daten können von Elektro Lahner GmbH für die Erhebung von (ausschließlich anonymen) Statistiken verwendet werden, und um Ihnen Werbematerial, Kataloge und Preislisten zuzusenden, sowie um Sie über unsere Initiativen und Angebote auf dem Laufenden zu halten. Sie können jederzeit die von Art. 7 des Ges. Dekr. Nr. 196/2003 vorgesehenen Rechte ausüben, unter ihnen den Zugang, die Berichtigung, die Aktualisierung, die Integration und die Umwandlung in eine anonyme Form Ihrer Daten, aber auch deren Löschung, sowie die Widersetzung gegen ihren Gebrauch, indem sie sich an den zuständigen Sachbearbeiter wenden, der von uns gemäß Artikel 13, Buchstabe f) Ges. Dekr. 196/2003 ernannt wird in der Person des Datenverarbeiters, der unter der folgenden elektronischen Postadresse erreichbar ist:",
      privacyEmail: "info@elektro-lahner.com",
      siteTitle: "Diese Website",
      siteText:
        "Diese Website verwendet keine Analyse- oder Marketing-Cookies. Gespeichert werden ausschließlich Ihre Sprachauswahl im lokalen Speicher des Browsers und Ihre Cookie-Entscheidung in einem technisch notwendigen Cookie. Die Auswahl können Sie jederzeit über „Cookie-Einstellungen“ im Seitenfuß ändern.",
      updated: "Stand: September 2026",
    },
    matrix: {
      title: "Wir arbeiten dort, wo wir herkommen.",
      text: "44 dokumentierte Projekte, vom Bauernhof über Hotellerie und Gewerbe bis zur Industriehalle. Die meisten liegen im Pustertal und im Ahrntal, viele davon in Sichtweite voneinander.",
      note: "Orte aus unserer Referenzliste, Punktgröße nach Anzahl der Projekte. 43 davon liegen in Südtirol, eines in Innsbruck.",
    },
    profile: {
      title: "Ein Gebäude verbraucht nicht dann, wenn die Sonne scheint.",
      text: "Der Ertrag vom Dach hat mittags seine Spitze, der Verbrauch morgens und abends. Gebäudeautomation verschiebt Lasten in die Deckungsfläche, und genau dieser Anteil muss nicht eingekauft werden.",
      axis: "Leistung (relativ)",
      draw: "Verbrauch",
      generation: "PV-Ertrag",
      selfUse: "Eigenverbrauch",
      note: "Schematischer Tagesverlauf zur Veranschaulichung, keine Messwerte einer konkreten Anlage.",
    },
    cookie: {
      title: "Ihre Privatsphäre",
      text: "Wir verwenden nur technisch notwendige Einstellungen, um Ihre Sprachauswahl und Cookie-Entscheidung zu speichern. Analyse- oder Marketing-Cookies sind derzeit nicht aktiv.",
      necessary: "Nur notwendige",
      accept: "Alle akzeptieren",
      details: "Datenschutz lesen",
      settings: "Cookie-Einstellungen",
    },
    footer: {
      claim: "Elektrotechnik. Gebäudeautomation. Energie.",
      direct: "Direktkontakt",
      company: "Unternehmen",
      up: "Nach oben",
    },
  },
  it: {
    htmlLang: "it",
    metaTitle: "Elektro Lahner | Elettrotecnica e automazione degli edifici in Alto Adige",
    nav: {
      services: "Servizi",
      knx: "KNX",
      company: "Azienda",
      references: "Referenze",
      contact: "Contatti",
      request: "Richiedi progetto",
    },
    hero: {
      eyebrow: "Elettrotecnica da Brunico · Dal 2001",
      title: "Tecnologia che",
      accent: "guarda avanti.",
      text: "Impianti elettrici, automazione intelligente e soluzioni energetiche sostenibili, progettati con precisione e realizzati con affidabilità.",
      primary: "Parliamo del progetto",
      secondary: "Scopri i servizi",
      facts: [
        ["25+", "Anni di esperienza"],
        ["KNX", "Connessione intelligente"],
        ["360°", "Dal progetto al servizio"],
      ],
    },
    services: {
      kicker: "I nostri servizi",
      title: "Una soluzione. Tutti i sistemi.",
      text: "Dalla prima idea alla manutenzione continua, uniamo impianti elettrici, controllo intelligente, energie rinnovabili e sicurezza moderna.",
      more: "Scopri di più",
      detailKicker: "Servizi in dettaglio",
      detailTitle: "Competenza che va oltre.",
      detailText:
        "Seleziona un settore oppure scopri qui tutte le prestazioni, con applicazioni e vantaggi essenziali.",
      items: [
        {
          slug: sharedSlugs[0],
          title: "Impianti elettrici",
          short:
            "Progettazione e realizzazione per abitazioni, imprese, industria e opere pubbliche.",
          intro:
            "Un impianto affidabile nasce da una consulenza accurata e da una progettazione professionale. Sviluppiamo soluzioni per edifici nuovi e ristrutturazioni, realizzandole a regola d’arte.",
          bullets: [
            "Impianti residenziali, commerciali, industriali e pubblici",
            "Quadri elettrici, distribuzione e sistemi di illuminazione",
            "Progettazione, esecuzione e messa in servizio coordinata",
            "Ottimizzazione energetica e ampliabilità futura",
          ],
        },
        {
          slug: sharedSlugs[1],
          title: "KNX e automazione",
          short:
            "Luce, schermature, riscaldamento, clima e sicurezza collegati in modo intelligente.",
          intro:
            "KNX separa l’alimentazione dal comando dei dispositivi. I sensori forniscono dati e gli attuatori eseguono i comandi, consentendo un controllo centralizzato, automatico o remoto.",
          bullets: [
            "Illuminazione, schermature, riscaldamento, climatizzazione e ventilazione",
            "Allarme, informazioni di stato e accesso remoto centralizzato",
            "Funzioni ridefinibili tramite programmazione",
            "Reazioni automatiche a meteo, temperatura, luminosità o CO₂",
          ],
        },
        {
          slug: sharedSlugs[2],
          title: "Fotovoltaico e sistemi ad isola",
          short: "Montaggio, controllo e alimentazione autonoma da un unico partner.",
          intro:
            "Il nostro team qualificato esegue il montaggio professionale di impianti fotovoltaici e ne cura controllo e manutenzione. Per luoghi remoti progettiamo sistemi autonomi.",
          bullets: [
            "Montaggio professionale e collegamento elettrico sicuro",
            "Manutenzione e controllo di impianti esistenti",
            "Piccoli sistemi per luce e comunicazione",
            "Sistemi autonomi per baite, rifugi e stazioni di ricerca",
          ],
        },
        {
          slug: sharedSlugs[3],
          title: "Sistemi di sicurezza",
          short:
            "Rivelazione incendi, allarme e video per edifici con esigenze di protezione elevate.",
          intro:
            "La sicurezza elettronica completa le protezioni meccaniche. Realizziamo sistemi che riconoscono tempestivamente i pericoli, segnalano l’allarme e comandano dispositivi tecnici definiti nel progetto.",
          bullets: [
            "Impianti antincendio con segnalazione e comandi tecnici",
            "Controllo degli ambienti con rilevatori di movimento",
            "Protezione perimetrale di porte, finestre e vetri",
            "Comandi, sirene, segnalatori e inoltro definito degli allarmi",
          ],
        },
        {
          slug: sharedSlugs[4],
          title: "Misurazioni a infrarossi",
          short: "Controllo termografico di moduli FV, componenti e involucro edilizio.",
          intro:
            "Le immagini termiche rendono visibili differenze di temperatura nascoste. Le anomalie possono così essere localizzate e analizzate in modo mirato.",
          bullets: [
            "Individuazione di moduli FV surriscaldati o difettosi",
            "Anomalie termiche nei componenti elettrici",
            "Ponti termici e zone fredde negli edifici",
            "Base documentata per manutenzione e diagnosi",
          ],
        },
        {
          slug: sharedSlugs[5],
          title: "Manutenzione e assistenza",
          short: "Riparazioni rapide e controlli periodici per impianti sicuri e disponibili.",
          intro:
            "I guasti interrompono l’attività e possono diventare un rischio. Il nostro servizio si occupa di controllo, ricerca guasti e riparazione in abitazioni, uffici e produzione.",
          bullets: [
            "Manutenzione e riparazione con elettricisti qualificati",
            "Ricerca sistematica dei guasti",
            "Controlli di impianti elettrici e fotovoltaici",
            "Assistenza per privati, aziende e industria",
          ],
        },
        {
          slug: sharedSlugs[6],
          title: "Illuminazione",
          short: "Soluzioni efficienti per interni, esterni e illuminazione pubblica.",
          intro:
            "Una buona illuminazione combina comfort visivo, sicurezza ed efficienza. Progettiamo gli impianti in base all’uso e alle condizioni locali.",
          bullets: [
            "Illuminazione interna ed esterna per casa e impresa",
            "Concept luminosi per hotel e ristorazione",
            "Illuminazione stradale per una maggiore sicurezza",
            "Integrazione in KNX e scenari automatizzati",
          ],
        },
        {
          slug: sharedSlugs[7],
          title: "SAT, TV e diffusione sonora",
          short: "Ricezione nitida e riproduzione di qualità per ambienti privati e professionali.",
          intro:
            "Dalle antenne e impianti satellitari alla diffusione sonora professionale, progettiamo sistemi affidabili, semplici da usare e adatti agli spazi.",
          bullets: [
            "Impianti d’antenna e satellitari",
            "Ricevitori, decoder, smart card e accessori",
            "Sistemi audio per voce, musica e sottofondo",
            "Altoparlanti, mixer e amplificatori secondo le esigenze",
          ],
        },
      ],
    },
    knx: {
      kicker: "Tecnologia intelligente",
      title: "Il vostro edificio. Un sistema.",
      text: "KNX integra le funzioni principali in una rete compatibile e programmabile con flessibilità.",
      labels: ["Luce", "Schermature", "Clima", "Sicurezza"],
      points: [
        { title: "Centrale e intuitivo", text: "Controllare insieme molte funzioni." },
        { title: "Programmabile", text: "Adattare i processi a nuove esigenze." },
        { title: "Efficiente e previdente", text: "Utilizzare i sensori per automatizzare." },
      ],
      note: "KNX richiede un investimento iniziale maggiore, ma offre flessibilità e comfort nel lungo periodo.",
      bus: {
        label: "Bus KNX",
        sensors: ["Pulsante", "Sensore presenza", "Stazione meteo", "Temperatura"],
        actuators: ["Luce", "Schermature", "Riscaldamento", "Ventilazione"],
        caption: [
          ["Sensore", "segnala un evento"],
          ["Bus", "distribuisce il telegramma"],
          ["Attuatore", "comanda il carico"],
        ],
      },
    },
    company: {
      kicker: "Elektro Lahner S.r.l.",
      quote: "«La gioia nel lavoro rende l'opera eccellente.»",
      timeline: [
        {
          year: "2001",
          title: "Gli inizi",
          text: "Andreas Lahner fonda l’azienda, dedicata a impianti elettrici, illuminazione e manutenzione.",
        },
        {
          year: "2005",
          title: "Crescita",
          text: "Sei collaboratori rendono possibili progetti pubblici e industriali più grandi.",
        },
        {
          year: "2006-07",
          title: "Focus fotovoltaico",
          text: "La formazione mirata crea competenze solide nel settore FV.",
        },
        {
          year: "2008",
          title: "1.000 kWp in rete",
          text: "Un traguardo importante grazie alla fiducia dei clienti.",
        },
        {
          year: "Oggi",
          title: "Competenza completa",
          text: "Progettazione, installazione, automazione, ottimizzazione, controllo e assistenza.",
        },
      ],
    },
    references: {
      kicker: "Referenze selezionate",
      title: "La fiducia nasce dal buon lavoro.",
      text: "Progetti residenziali, alberghieri, gastronomici, commerciali e industriali in Alto Adige e oltre.",
    },
    contact: {
      kicker: "Il progetto inizia qui",
      title: "Cosa possiamo",
      accent: "accendere per voi?",
      text: "Nuova costruzione, ristrutturazione, automazione o fotovoltaico: parliamo delle vostre esigenze.",
      phone: "Telefono",
      email: "E-mail",
      address: "Indirizzo",
      hours: "Orari ufficio",
      weekdays: "Lun-Ven · 08:30-12:00 e 13:00-17:00",
    },
    legal: {
      kicker: "Informazioni legali",
      imprint: "Impressum",
      privacy: "Privacy",
      owner: "Proprietario del sito internet",
      companyName: "Elektro Lahner Srl",
      address: "Via J.-G.-Mahl, 40/A\n39031 Brunico (BZ)",
      phone: "Tel. +39 0474 77 36 36",
      email: "info@elektro-lahner.com",
      pec: "PEC: elektro.lahner@legalmail.it",
      vat: "P.IVA: 02697740211",
      sdi: "Codice destinatario per fatture elettroniche: SUBM70N",
      webTitle: "Web",
      webName: "Contech",
      webAddress: "Molini - Zona Industriale 3\nI-39032 Campo Tures (BZ)",
      webUrl: "www.contech.it",
      liabilityTitle: "Links",
      liabilityText:
        "Informazioni riguardanti la responsabilità: nonostante l'accurato controllo da parte nostra, non rispondiamo del contenuto di link esterni. Per i contenuti delle pagine collegate sono responsabili i rispettivi gestori.",
      privacyTitle: "Informativa ai sensi dell'art. 13 GDPR 2016/679",
      privacyP1:
        "Ai sensi dell'art. 13 del GDPR 2016/679 sulla privacy, La informiamo che, Elektro Lahner Srl in qualità di Titolare del trattamento, conserverà nel proprio archivio i dati a Lei relativi. Il trattamento delle informazioni che La riguardano, sarà improntato ai principi di correttezza, liceità e trasparenza e tutelando la Sua riservatezza e i Suoi diritti.",
      privacyP2:
        "Questi potranno essere usati da Elektro Lahner Srl per l'elaborazione di statistiche (esclusivamente anonime) e per inviarLe materiale pubblicitario, cataloghi e listini prezzo, nonché per tenerLa aggiornata sulle nostre iniziative e offerte promozionali. In qualsiasi momento, Lei potrà esercitare tutti i diritti previsti dall'art. 7 del D.Lgs. n. 196/2003 tra cui i diritti di accesso, rettifica, aggiornamento, integrazione, trasformazione in forma anonima dei dati o cancellazione degli stessi, nonché di opporsi al loro utilizzo rivolgendosi al responsabile, da noi all'uopo nominato ai sensi dell'articolo 13 lettera f) Dlgs 196/2003, nella persona del titolare dell'esercizio, reperibile al seguente indirizzo di posta elettronica:",
      privacyEmail: "info@elektro-lahner.com",
      siteTitle: "Questo sito",
      siteText:
        "Questo sito non utilizza cookie di analisi o di marketing. Vengono memorizzate soltanto la lingua scelta nella memoria locale del browser e la Sua decisione sui cookie in un cookie tecnicamente necessario. Può modificare la scelta in qualsiasi momento tramite „Impostazioni cookie“ nel piè di pagina.",
      updated: "Aggiornamento: settembre 2026",
    },
    matrix: {
      title: "Lavoriamo dove siamo di casa.",
      text: "44 progetti documentati, dal maso all'hotel, dal negozio al capannone industriale. La maggior parte si trova in Val Pusteria e in Valle Aurina, molti a poca distanza l'uno dall'altro.",
      note: "Località dal nostro elenco di referenze, dimensione del punto secondo il numero di progetti. 43 si trovano in Alto Adige, uno a Innsbruck.",
    },
    profile: {
      title: "Un edificio non consuma quando splende il sole.",
      text: "La resa del tetto ha il picco a mezzogiorno, i consumi la mattina e la sera. L'automazione sposta i carichi nell'area di sovrapposizione, ed è proprio quella quota che non va acquistata.",
      axis: "Potenza (relativa)",
      draw: "Consumo",
      generation: "Resa FV",
      selfUse: "Autoconsumo",
      note: "Andamento giornaliero schematico a scopo illustrativo, non sono misure di un impianto reale.",
    },
    cookie: {
      title: "La vostra privacy",
      text: "Utilizziamo soltanto impostazioni tecniche per memorizzare lingua e scelta cookie. Non sono attivi cookie di analisi o marketing.",
      necessary: "Solo necessari",
      accept: "Accetta tutti",
      details: "Leggi la privacy",
      settings: "Impostazioni cookie",
    },
    footer: {
      claim: "Elettrotecnica. Automazione. Energia.",
      direct: "Contatto diretto",
      company: "Azienda",
      up: "Torna su",
    },
  },
  en: {
    htmlLang: "en",
    metaTitle: "Elektro Lahner | Electrical engineering & building automation in South Tyrol",
    nav: {
      services: "Services",
      knx: "KNX",
      company: "Company",
      references: "References",
      contact: "Contact",
      request: "Discuss a project",
    },
    hero: {
      eyebrow: "Electrical engineering from Bruneck · Since 2001",
      title: "Technology that",
      accent: "thinks ahead.",
      text: "Electrical installations, intelligent building automation and sustainable energy solutionsplanned precisely and delivered reliably.",
      primary: "Discuss your project",
      secondary: "Explore services",
      facts: [
        ["25+", "Years of experience"],
        ["KNX", "Intelligently connected"],
        ["360°", "Planning to service"],
      ],
    },
    services: {
      kicker: "Our capabilities",
      title: "One partner. Every system.",
      text: "From the first plan to ongoing maintenance, we combine solid electrical work, intelligent control, renewable energy and modern security technology.",
      more: "Learn more",
      detailKicker: "Services in detail",
      detailTitle: "Expertise that goes further.",
      detailText:
        "Choose a field above or explore every service here, including its most important applications and benefits.",
      items: [
        {
          slug: sharedSlugs[0],
          title: "Electrical installations",
          short: "Planning and delivery for homes, businesses, industry and public projects.",
          intro:
            "A reliable electrical system starts with careful consultation and professional planning. We develop solutions for new builds and renovations and deliver them using modern tools and qualified workmanship.",
          bullets: [
            "Residential, commercial, industrial and public installations",
            "Control panels, power distribution and lighting systems",
            "Planning, implementation and coordinated commissioning",
            "Energy optimisation and future-ready expansion",
          ],
        },
        {
          slug: sharedSlugs[1],
          title: "KNX & building automation",
          short: "Lighting, shading, heating, climate and security connected intelligently.",
          intro:
            "KNX separates power supply from device control. Sensors provide information and actuators execute commands, allowing key functions to be controlled centrally, automatically or remotely.",
          bullets: [
            "Lighting, shading, heating, air conditioning and ventilation",
            "Alarm, status information and central remote access",
            "Functions can be redefined by programming",
            "Automatic responses to weather, temperature, brightness or CO₂ values",
          ],
        },
        {
          slug: sharedSlugs[2],
          title: "Solar & off-grid systems",
          short: "Installation, inspection and independent power from one experienced team.",
          intro:
            "Our qualified team installs photovoltaic systems professionally and supports their maintenance and inspection. We also design stand-alone systems for remote locations.",
          bullets: [
            "Professional installation and safe electrical integration",
            "Maintenance and inspection of existing PV systems",
            "Small systems for lighting and communications",
            "Larger off-grid systems for alpine huts and research stations",
          ],
        },
        {
          slug: sharedSlugs[3],
          title: "Security systems",
          short: "Fire detection, intrusion alarms and video systems for demanding environments.",
          intro:
            "Electronic security complements physical protection. We build systems that identify hazards early, issue internal alerts anddepending on the designcontrol other technical equipment.",
          bullets: [
            "Fire detection with alarms and technical controls",
            "Room monitoring with motion detectors",
            "Perimeter protection for doors, windows and glazing",
            "Controls, sirens, beacons and defined alarm forwarding",
          ],
        },
        {
          slug: sharedSlugs[4],
          title: "Infrared inspections",
          short: "Thermal imaging of solar modules, electrical components and building envelopes.",
          intro:
            "Thermal images reveal temperature differences that cannot be seen with the naked eye. This makes it possible to locate anomalies and plan further checks on a sound basis.",
          bullets: [
            "Detecting overheated or potentially faulty PV modules",
            "Thermal anomalies in electrical components",
            "Locating thermal bridges in buildings",
            "Documented basis for maintenance and diagnostics",
          ],
        },
        {
          slug: sharedSlugs[5],
          title: "Maintenance & service",
          short: "Fast repairs and regular checks for safe, dependable systems.",
          intro:
            "Failures interrupt operations and may become a safety risk. Our service team handles inspection, fault finding and repairs in homes, offices and production facilities.",
          bullets: [
            "Maintenance and repairs by qualified electricians",
            "Systematic fault diagnosis and clear measures",
            "Electrical and solar system inspections",
            "Service for residential, commercial and industrial systems",
          ],
        },
        {
          slug: sharedSlugs[6],
          title: "Lighting",
          short: "Efficient lighting for interiors, outdoor spaces and public roads.",
          intro:
            "Good lighting brings together visual comfort, safety and efficiency. We design and install systems that suit their use and local conditions.",
          bullets: [
            "Interior and exterior lighting for homes and businesses",
            "Lighting concepts for hospitality and restaurants",
            "Public street lighting that improves road safety",
            "Integration with KNX controls and automated scenes",
          ],
        },
        {
          slug: sharedSlugs[7],
          title: "Satellite, TV & audio",
          short: "Clear reception and high-quality sound for private and professional spaces.",
          intro:
            "From antennas and satellite reception to professional sound systems, we design dependable, user-friendly media technology for each room and purpose.",
          bullets: [
            "Antenna and satellite systems",
            "Receivers, decoders, smart cards and accessories",
            "Sound systems for speech, music and ambience",
            "Speakers, mixers and amplifiers configured to requirements",
          ],
        },
      ],
    },
    knx: {
      kicker: "Intelligent building technology",
      title: "Your building. One system.",
      text: "KNX combines essential building functions in a compatible network that can be programmed flexibly.",
      labels: ["Lighting", "Shading", "Climate", "Security"],
      points: [
        { title: "Central & intuitive", text: "Control many functions together." },
        { title: "Flexible programming", text: "Adapt processes as needs change." },
        { title: "Efficient & responsive", text: "Use sensor data for automation." },
      ],
      note: "KNX involves a higher initial investment, while providing long-term flexibility and comfort.",
      bus: {
        label: "KNX bus",
        sensors: ["Wall switch", "Presence sensor", "Weather station", "Temperature"],
        actuators: ["Lighting", "Shading", "Heating", "Ventilation"],
        caption: [
          ["Sensor", "reports an event"],
          ["Bus", "carries the telegram"],
          ["Actuator", "switches the load"],
        ],
      },
    },
    company: {
      kicker: "Elektro Lahner S.r.l.",
      quote: "“Pleasure in the job puts perfection in the work.”",
      timeline: [
        {
          year: "2001",
          title: "The beginning",
          text: "Andreas Lahner establishes the company, focused on electrical work, lighting and maintenance.",
        },
        {
          year: "2005",
          title: "Growth",
          text: "A team of six enables larger public and industrial projects.",
        },
        {
          year: "2006-07",
          title: "Solar expertise",
          text: "Targeted training builds sound photovoltaic expertise.",
        },
        {
          year: "2008",
          title: "1,000 kWp connected",
          text: "An important milestone made possible by customer trust.",
        },
        {
          year: "Today",
          title: "One-source expertise",
          text: "Planning, installation, automation, optimisation, inspection and service.",
        },
      ],
    },
    references: {
      kicker: "Selected references",
      title: "Trust is built on good work.",
      text: "Residential, hospitality, restaurant, commercial and industrial projects in South Tyrol and beyond.",
    },
    contact: {
      kicker: "Your project starts here",
      title: "What can we",
      accent: "switch on for you?",
      text: "New construction, renovation, smart building technology or solar powerlet’s discuss your requirements.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Office hours",
      weekdays: "Mon-Fri · 08:30-12:00 and 13:00-17:00",
    },
    legal: {
      kicker: "Legal information",
      imprint: "Imprint",
      privacy: "Privacy",
      owner: "Owner of this website",
      companyName: "Elektro Lahner GmbH / Srl",
      address: "J.-G.-Mahl Str. 40/A\n39031 Bruneck (BZ), Italy",
      phone: "Tel. +39 0474 77 36 36",
      email: "info@elektro-lahner.com",
      pec: "PEC: elektro.lahner@legalmail.it",
      vat: "VAT no.: IT02697740211",
      sdi: "Recipient code for electronic invoices: SUBM70N",
      webTitle: "Web",
      webName: "Contech",
      webAddress: "Mühlen Gewerbegebiet 3\nI-39032 Sand in Taufers (BZ)",
      webUrl: "www.contech.it",
      liabilityTitle: "Liability for links",
      liabilityText:
        "Despite careful review of the content, we accept no liability for the contents of external links. The operators of the linked pages are solely responsible for their content.",
      privacyTitle: "Information notice under Art. 13 GDPR 2016/679",
      privacyP1:
        "Pursuant to Article 13 of GDPR 2016/679 on data protection, we inform you that Elektro Lahner GmbH, as data controller, keeps your personal data in its archive. Your data is handled according to the principles of correctness, lawfulness and transparency, while safeguarding your privacy and your rights.",
      privacyP2:
        "This data may be used by Elektro Lahner GmbH to compile (exclusively anonymous) statistics and to send you advertising material, catalogues and price lists, as well as to keep you informed about our initiatives and offers. You may at any time exercise the rights provided for by Art. 7 of Legislative Decree no. 196/2003, among them access, rectification, updating, integration and conversion of your data into anonymous form, as well as its deletion and objection to its use, by contacting the responsible person appointed by us under Article 13 letter f) of Legislative Decree 196/2003, in the person of the data controller, reachable at the following email address:",
      privacyEmail: "info@elektro-lahner.com",
      siteTitle: "This website",
      siteText:
        "This website uses no analytics or marketing cookies. Only your language choice in the browser's local storage and your cookie decision in a technically necessary cookie are stored. You can change that choice at any time via “Cookie settings” in the footer.",
      updated: "Last updated: September 2026",
    },
    matrix: {
      title: "We work where we are from.",
      text: "44 documented projects, from farmsteads through hospitality and retail to industrial halls. Most of them sit in the Pustertal and the Ahrntal, many within sight of one another.",
      note: "Localities from our reference list, dot size by number of projects. 43 are in South Tyrol, one in Innsbruck.",
    },
    profile: {
      title: "A building does not draw power when the sun is out.",
      text: "The roof peaks at midday while the building draws in the morning and the evening. Automation shifts loads into the overlap, and that share never has to be bought.",
      axis: "Power (relative)",
      draw: "Consumption",
      generation: "PV output",
      selfUse: "Self-consumption",
      note: "Schematic day profile for illustration, not measurements from a specific installation.",
    },
    cookie: {
      title: "Your privacy",
      text: "We use only technical settings to remember your language and cookie choice. No analytics or marketing cookies are currently active.",
      necessary: "Necessary only",
      accept: "Accept all",
      details: "Read privacy policy",
      settings: "Cookie settings",
    },
    footer: {
      claim: "Electrical engineering. Automation. Energy.",
      direct: "Direct contact",
      company: "Company",
      up: "Back to top",
    },
  },
};
