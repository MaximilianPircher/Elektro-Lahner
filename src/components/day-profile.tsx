import { motion, useReducedMotion } from "motion/react";
import { useArmed } from "../motion";

/**
 * Schematic 24 hour profile of a building: what it draws against what its roof
 * makes, and the overlap that never has to be bought. This is the argument for
 * pairing photovoltaics with automation, so it is drawn rather than asserted.
 *
 * The shapes are illustrative, not measured, and the axis is deliberately
 * relative so no reading can be mistaken for a figure from a real site.
 *
 * Palette: brand yellow for generation, blue for draw. Validated against the
 * #101210 surface - CVD separation dE 28.4 (protan) / 24.4 (tritan), normal
 * vision 32.1, both above the 3:1 contrast floor. Both series are also direct
 * labelled, so identity never rests on colour alone.
 */

const W = 760;
const H = 330;
const PAD = { top: 34, right: 26, bottom: 46, left: 30 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const bell = (h: number, centre: number, width: number) =>
  Math.exp(-((h - centre) ** 2) / (2 * width ** 2));

/** Building draw: a low night base with a morning and a larger evening peak. */
const draw = (h: number) => 0.2 + 0.38 * bell(h, 7.2, 1.9) + 0.66 * bell(h, 19.6, 2.3);

/** Roof generation: nothing before dawn, a midday crest, nothing after dusk. */
const generation = (h: number) =>
  h <= 6 || h >= 20 ? 0 : Math.sin((Math.PI * (h - 6)) / 14) ** 1.45 * 0.95;

const SAMPLES = Array.from({ length: 97 }, (_, i) => (i * 24) / 96);
const x = (h: number) => PAD.left + (h / 24) * PLOT_W;
const y = (v: number) => PAD.top + PLOT_H - v * PLOT_H;

const line = (fn: (h: number) => number) =>
  SAMPLES.map((h, i) => `${i ? "L" : "M"} ${x(h).toFixed(1)} ${y(fn(h)).toFixed(1)}`).join(" ");

/** The overlap is what the building uses straight off its own roof. */
const overlap = () => {
  const top = SAMPLES.map(
    (h, i) =>
      `${i ? "L" : "M"} ${x(h).toFixed(1)} ${y(Math.min(draw(h), generation(h))).toFixed(1)}`,
  ).join(" ");
  return `${top} L ${x(24).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const TICKS = [0, 6, 12, 18, 24];

export function DayProfile({
  labels,
}: {
  labels: { draw: string; generation: string; selfUse: string; axis: string; note: string };
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  const drawIn = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 1.4, delay, ease: EASE },
        };

  const fadeIn = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <figure className="profile">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${labels.draw}, ${labels.generation}, ${labels.selfUse}. ${labels.note}`}
      >
        {/* graticule */}
        <g className="profile-grid" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <line key={v} x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} />
          ))}
          {TICKS.map((h) => (
            <line key={h} y1={PAD.top} y2={PAD.top + PLOT_H} x1={x(h)} x2={x(h)} />
          ))}
        </g>

        <motion.path className="profile-selfuse" d={overlap()} {...fadeIn(1.1)} />

        <motion.path
          className="profile-line profile-line--gen"
          d={line(generation)}
          {...drawIn(0.15)}
        />
        <motion.path className="profile-line profile-line--draw" d={line(draw)} {...drawIn(0.35)} />

        {/* sweep: a cursor running the day, so the plot reads as a live trace */}
        {!still && (
          <g className="profile-sweep" aria-hidden="true">
            <line x1={PAD.left} x2={PAD.left} y1={PAD.top - 6} y2={PAD.top + PLOT_H} />
          </g>
        )}

        <g className="profile-axis" aria-hidden="true">
          {TICKS.map((h) => (
            <text key={h} x={x(h)} y={PAD.top + PLOT_H + 22}>
              {String(h).padStart(2, "0")}:00
            </text>
          ))}
          <text className="profile-axis-title" x={PAD.left} y={PAD.top - 14}>
            {labels.axis}
          </text>
        </g>

        {/* direct labels: identity never rests on colour alone */}
        <motion.g className="profile-tags" {...fadeIn(1.35)}>
          <text className="profile-tag profile-tag--gen" x={x(13)} y={y(generation(13)) - 14}>
            {labels.generation}
          </text>
          <text className="profile-tag profile-tag--draw" x={x(19.6)} y={y(draw(19.6)) - 14}>
            {labels.draw}
          </text>
          <text className="profile-tag profile-tag--self" x={x(13)} y={y(0) - 16}>
            {labels.selfUse}
          </text>
        </motion.g>
      </svg>
      <figcaption>{labels.note}</figcaption>
    </figure>
  );
}
