import { motion, useReducedMotion } from "motion/react";
import { projects, type Capability } from "../projects";
import { useArmed } from "../motion";

/**
 * How many of the documented projects included each trade.
 *
 * Unlike the figures beside it, this one has a real maximum - the number of
 * projects - so a filled bar on a track states a genuine proportion and can be
 * read at a glance without decoding anything. Every count comes from the scope
 * text of the projects on the reference page and can be checked there.
 */

const ORDER: Capability[] = ["install", "light", "security", "knx", "fire", "pv"];

export function ProjectBars({
  labels,
  ofLabel,
}: {
  labels: Record<Capability, string>;
  ofLabel: (count: number, total: number) => string;
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;
  const total = projects.length;

  const rows = ORDER.map((key) => ({
    key,
    count: projects.filter((project) => project.tags.includes(key)).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <figure className="bars">
      {rows.map((row, index) => (
        <div className="bar" key={row.key}>
          <span className="bar-label">{labels[row.key]}</span>
          <div className="bar-track">
            <motion.i
              style={{ transformOrigin: "left" }}
              {...(still
                ? { initial: false as const, animate: { scaleX: row.count / total } }
                : {
                    initial: { scaleX: 0 },
                    whileInView: { scaleX: row.count / total },
                    viewport: { once: true, amount: 0.5 },
                    transition: {
                      duration: 0.9,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1] as const,
                    },
                  })}
            />
          </div>
          <span className="bar-count mono">{ofLabel(row.count, total)}</span>
        </div>
      ))}
    </figure>
  );
}
