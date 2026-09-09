import { motion, useReducedMotion } from "motion/react";
import { useArmed } from "../motion";

/**
 * A unit chart in the shape of a switchgear segment display.
 *
 * Three figures that are not the same kind of thing - a duration, an installed
 * capacity, a count of disciplines - should not be lined up as if they were
 * comparable. Each one gets segments instead, and every segment stands for one
 * real unit: one year, one hundred kWp, one field of work. The row length is
 * therefore the figure, and the segment width shows its granularity, so the
 * three rows read as three different resolutions rather than a table.
 *
 * Nothing here is a progress bar: none of these figures has a maximum, so no
 * segment is ever drawn empty.
 */
export function SegmentMeter({
  value,
  unit,
  label,
  segments,
  scaleNote,
  formatted,
  delay = 0,
}: {
  value: string;
  unit?: string;
  label: string;
  segments: number;
  scaleNote?: string;
  formatted?: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  return (
    <div className="meter">
      <div className="meter-head">
        <strong className="mono">
          {formatted ?? value}
          {unit ? <i>{unit}</i> : null}
        </strong>
        {scaleNote ? <em className="mono">{scaleNote}</em> : null}
      </div>

      <div className="meter-track" aria-hidden="true">
        {Array.from({ length: segments }, (_, i) => (
          <motion.span
            key={i}
            {...(still
              ? { initial: false as const }
              : {
                  initial: { scaleY: 0.28, opacity: 0.25 },
                  whileInView: { scaleY: 1, opacity: 1 },
                  viewport: { once: true, amount: 0.6 },
                  transition: {
                    duration: 0.42,
                    delay: delay + i * (0.9 / segments),
                    ease: [0.16, 1, 0.3, 1] as const,
                  },
                })}
          />
        ))}
      </div>

      <span className="meter-label mono">{label}</span>
    </div>
  );
}
