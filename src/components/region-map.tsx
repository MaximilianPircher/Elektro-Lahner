import { motion, useReducedMotion } from "motion/react";
import { places, regionOutline, regionViewBox } from "../region";
import { useArmed } from "../motion";

/**
 * Where the documented projects are.
 *
 * The outline is the real boundary of the province of Bolzano and the dots sit
 * at coordinates looked up from OpenStreetMap, so the picture is checkable
 * rather than drawn to look good. Dot area follows the number of projects in
 * that locality, which is why the Pustertal and the Ahrntal carry the weight:
 * that is simply where the work is.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const radius = (count: number) => 5 + Math.sqrt(count) * 3.6;

// Labels share one right-aligned column left of the Pustertal cluster.
const LABEL_X = 585;

export function RegionMap({ caption, title }: { caption: string; title: string }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  return (
    <figure className="region">
      <svg viewBox={regionViewBox} role="img" aria-label={title}>
        <motion.path
          className="region-outline"
          d={regionOutline}
          {...(still
            ? { initial: false as const }
            : {
                initial: { pathLength: 0, opacity: 0 },
                whileInView: { pathLength: 1, opacity: 1 },
                viewport: { once: true, amount: 0.4 },
                transition: { duration: 1.6, ease: EASE },
              })}
        />

        {/* The cluster is dense, so labels sit in a column clear of it and
            reach their dot with a leader rather than overprinting a neighbour. */}
        {places
          .filter((place) => place.count >= 5)
          .map((place, index) => (
            <motion.g
              key={`label-${place.label}`}
              {...(still
                ? { initial: false as const }
                : {
                    initial: { opacity: 0 },
                    whileInView: { opacity: 1 },
                    viewport: { once: true, amount: 0.4 },
                    transition: { duration: 0.6, delay: 1.1 + index * 0.1, ease: EASE },
                  })}
            >
              <line
                className="region-leader"
                x1={LABEL_X + 12}
                y1={place.y}
                x2={place.x - radius(place.count) - 4}
                y2={place.y}
              />
              <text className="region-label" x={LABEL_X} y={place.y + 6}>
                {place.label}
              </text>
            </motion.g>
          ))}
        {places.map((place, index) => (
          <motion.circle
            key={place.label}
            className="region-dot"
            cx={place.x}
            cy={place.y}
            r={radius(place.count)}
            {...(still
              ? { initial: false as const }
              : {
                  initial: { opacity: 0, scale: 0 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true, amount: 0.4 },
                  transition: { duration: 0.5, delay: 0.5 + index * 0.05, ease: EASE },
                })}
            style={{ transformOrigin: `${place.x}px ${place.y}px` }}
          >
            <title>{`${place.label}: ${place.count}`}</title>
          </motion.circle>
        ))}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
