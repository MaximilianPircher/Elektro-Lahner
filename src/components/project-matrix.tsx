import { motion, useReducedMotion } from "motion/react";
import { projects, type Capability, type Sector } from "../projects";
import { useArmed } from "../motion";

/**
 * Every column is one real project from the reference list, every row one
 * trade. A cell is filled when that project's own scope text names that trade.
 *
 * Nothing here is modelled or smoothed: the counts down the right-hand side
 * can be checked against /referenzen, which is the point. It shows breadth and
 * how rarely a trade turns up on its own, using only what the client already
 * published.
 */

const ROWS: Capability[] = ["install", "light", "knx", "pv", "fire", "security"];
const SECTOR_ORDER: Sector[] = ["residential", "hospitality", "commercial", "industry"];

export function ProjectMatrix({
  rowLabels,
  sectorLabels,
}: {
  rowLabels: Record<Capability, string>;
  sectorLabels: Record<Sector, string>;
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  const ordered = SECTOR_ORDER.flatMap((sector) => projects.filter((p) => p.sector === sector));
  const bands = SECTOR_ORDER.map((sector) => ({
    sector,
    count: projects.filter((p) => p.sector === sector).length,
  }));

  return (
    <figure className="matrix">
      <div className="matrix-bands" aria-hidden="true">
        <div className="matrix-bands-inner">
          {bands.map((band) => (
            <span key={band.sector} style={{ flexGrow: band.count, flexBasis: 0 }}>
              <i />
              {sectorLabels[band.sector]}
            </span>
          ))}
        </div>
      </div>

      <div className="matrix-rows">
        {ROWS.map((row, rowIndex) => {
          const total = projects.filter((p) => p.tags.includes(row)).length;
          return (
            <div className="matrix-row" key={row}>
              <span className="matrix-label mono">{rowLabels[row]}</span>
              <div className="matrix-cells">
                {ordered.map((project, columnIndex) => {
                  const on = project.tags.includes(row);
                  return (
                    <motion.i
                      key={`${project.name}-${project.place}`}
                      className={on ? "on" : ""}
                      title={`${project.name} · ${rowLabels[row]}`}
                      {...(still
                        ? { initial: false as const }
                        : {
                            initial: { opacity: 0, scale: 0.4 },
                            whileInView: { opacity: 1, scale: 1 },
                            viewport: { once: true, amount: 0.3 },
                            transition: {
                              duration: 0.3,
                              delay: rowIndex * 0.06 + columnIndex * 0.008,
                              ease: [0.16, 1, 0.3, 1] as const,
                            },
                          })}
                    />
                  );
                })}
              </div>
              <span className="matrix-total mono">{total}</span>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
