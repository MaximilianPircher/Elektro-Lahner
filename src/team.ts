/**
 * The team, carried over from elektro-lahner.com/de/mitarbeiter.
 *
 * The old page grouped by role, which listed some people twice: Armin
 * Oberstolz appears under both Planung and Vorarbeiter. Here each person
 * appears once and carries their roles, which is both shorter and truer.
 *
 * Names and addresses are the ones the company publishes about itself.
 */

export type RoleKey =
  "management" | "planning" | "service" | "admin" | "foreman" | "electrician" | "apprentice";

export type Person = {
  name: string;
  roles: RoleKey[];
  email?: string;
};

/** Named contacts: the people a customer actually reaches out to. */
export const contacts: Person[] = [
  { name: "Andreas Lahner", roles: ["management"], email: "info@elektro-lahner.com" },
  { name: "Armin Oberstolz", roles: ["planning", "foreman"], email: "armin@elektro-lahner.com" },
  { name: "Hubert Oberhauser", roles: ["service", "foreman"] },
  { name: "Claudia Knapp", roles: ["admin"], email: "claudia@elektro-lahner.com" },
];

/** The rest of the crew, grouped the way the company groups them. */
export const crew: { role: RoleKey; names: string[] }[] = [
  { role: "foreman", names: ["Werner Pramstaller", "Fabian Lahner", "Philipp Agstner"] },
  { role: "electrician", names: ["Felix Pflug"] },
  {
    role: "apprentice",
    names: ["Alexander Wierer", "Matthias Gaspari", "Leon Rossi", "Robin Stolzlechner"],
  },
];

export const headcount = contacts.length + crew.reduce((sum, group) => sum + group.names.length, 0);
