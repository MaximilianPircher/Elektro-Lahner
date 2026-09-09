/**
 * The reference list, carried over verbatim from elektro-lahner.com/de/referenzen.
 * Names and places are the client's own published data. `sector` and `tags` are
 * derived from the scope text each project page carries ("Elektroinstallation
 * Hotel, Beleuchtung, Brandmeldeanlage"), which is what makes the list
 * filterable without inventing anything that was not already stated.
 */

export type Sector = "residential" | "hospitality" | "commercial" | "industry";
export type Capability = "install" | "light" | "knx" | "pv" | "fire" | "security";

export type Project = {
  name: string;
  place: string;
  sector: Sector;
  tags: Capability[];
};

export const projects: Project[] = [
  {
    name: "Ahrner Wirt GmbH",
    place: "St. Johann/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light", "fire"],
  },
  {
    name: "Arch. Wolfgang Martin Miess",
    place: "Innsbruck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Asper Dietmar",
    place: "Pfalzen",
    sector: "residential",
    tags: ["install", "light", "pv"],
  },
  {
    name: "Auer Edgar",
    place: "Mühlen in Taufers",
    sector: "residential",
    tags: ["install", "light", "knx"],
  },
  {
    name: "Auto Engl",
    place: "Gais und Bruneck",
    sector: "commercial",
    tags: ["install", "light", "fire", "security"],
  },
  {
    name: "Autoagentur Nocker",
    place: "Bruneck",
    sector: "commercial",
    tags: ["install", "light", "security"],
  },
  {
    name: "Bar Tamoil",
    place: "Percha",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Cafe Domino",
    place: "Sand in Taufers",
    sector: "hospitality",
    tags: ["install", "light", "knx"],
  },
  {
    name: "Dorfcafe",
    place: "St. Johann/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Erlhof, Appartement, Hotel Deluxe",
    place: "Luttach/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Ertl Alexander",
    place: "St. Lorenzen",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Euroclima AG",
    place: "Bruneck",
    sector: "industry",
    tags: ["install", "knx"],
  },
  {
    name: "Euroform K. Winkler GmbH",
    place: "Sand in Taufers",
    sector: "industry",
    tags: ["light", "pv"],
  },
  {
    name: "Feldmilla Designhotel",
    place: "Sand in Taufers",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Garoscio Maurizio",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Gruberhof",
    place: "St. Jakob/Ahrntal",
    sector: "hospitality",
    tags: ["install"],
  },
  {
    name: "Handlung Hofer",
    place: "Steinhaus/Ahrntal",
    sector: "commercial",
    tags: ["install", "light"],
  },
  {
    name: "Hotel Dolomiti",
    place: "La Villa/Corvara",
    sector: "hospitality",
    tags: ["install", "light", "fire", "security"],
  },
  {
    name: "Hotel Steinpent Aktiv Hotel",
    place: "St. Johann/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light", "fire"],
  },
  {
    name: "hotel@stifter.net",
    place: "Luttach/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Hutstübele",
    place: "Bruneck-Brixen-Meran-Sterzing",
    sector: "commercial",
    tags: ["install", "light"],
  },
  {
    name: "Ingenieurbüro Mayer & Partner GmbH - Percha",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Ingenieurbüro Mayer & Partner GmbH, Dietenheim",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light", "knx", "security"],
  },
  {
    name: "Ingenieurbüro Mayer & Partner GmbH, St. Georgen",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Interpark GmbH",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Kosmetikstudio Kristin",
    place: "Bruneck",
    sector: "commercial",
    tags: ["install", "light", "security"],
  },
  {
    name: "Mayer Helmut",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light", "knx", "security"],
  },
  {
    name: "Naturhotel Edelweiss",
    place: "Terenten",
    sector: "hospitality",
    tags: ["install", "light", "knx"],
  },
  {
    name: "Oberleiter Stefan",
    place: "Platten",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Oberstaller Armin",
    place: "Ehrenburg",
    sector: "residential",
    tags: ["install", "light", "knx"],
  },
  {
    name: "Oberwiesen Hotel",
    place: "Reischach",
    sector: "hospitality",
    tags: ["install", "light", "fire", "security"],
  },
  {
    name: "Pension Neuhaushof",
    place: "St. Jakob/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light", "fire"],
  },
  {
    name: "Pension Obermair",
    place: "St. Johann/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Pizzeria Restaurant Rosmarin",
    place: "Sand in Taufers",
    sector: "hospitality",
    tags: ["install", "light", "fire", "security"],
  },
  {
    name: "Restaurant Daimer",
    place: "Sand in Taufers",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Rier Siegfried",
    place: "Mühlen in Taufers",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Schornweg GmbH",
    place: "Bruneck",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Seeber GmbH Holzböden",
    place: "Gais",
    sector: "industry",
    tags: ["install", "light", "pv"],
  },
  {
    name: "Sportalm",
    place: "Luttach/Ahrntal",
    sector: "hospitality",
    tags: ["install", "light"],
  },
  {
    name: "Steger Walter",
    place: "St. Jakob/Ahrntal",
    sector: "residential",
    tags: ["install", "light", "pv"],
  },
  {
    name: "Weger Kurt",
    place: "St. Johann/Ahrntal",
    sector: "residential",
    tags: ["install", "light"],
  },
  {
    name: "Weger Martin",
    place: "St. Sigmund/Kiens",
    sector: "residential",
    tags: ["install", "knx"],
  },
  {
    name: "Wörndle Interservice GmbH",
    place: "Percha",
    sector: "industry",
    tags: ["install", "light", "security"],
  },
  {
    name: "XL-Appartements",
    place: "Sand in Taufers",
    sector: "residential",
    tags: ["install", "light"],
  },
];

/**
 * Names for the home page band. Private clients are left out on purpose: a
 * family name scrolling across a landing page is a different thing from an
 * entry in a reference list, even though the client publishes both.
 */
export const marqueeNames: string[] = projects
  .filter((project) => project.sector !== "residential")
  .map((project) => project.name)
  .filter(
    (name) =>
      !/^(Mayer|Weger|Steger|Asper|Auer|Ertl|Rier|Garoscio|Oberleiter|Oberstaller) /.test(name),
  );
