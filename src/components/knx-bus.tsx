import { motion, useReducedMotion } from "motion/react";
import { useArmed } from "../motion";

/**
 * KNX signal-flow schematic.
 *
 * This is a mechanism drawing, not decoration: it shows the thing that makes
 * KNX different from conventional wiring. Sensors do not switch loads. They
 * put a telegram on a shared bus, and the actuators on that bus decide what
 * to do with it. The travelling pulses are the telegrams, and each one is
 * routed from a real sensor to a real actuator, which is why the paths cross
 * the bus instead of running straight down.
 */

const NODE_W = 130;
const NODE_H = 40;
const SENSOR_Y = 42;
const BUS_Y = 215;
const ACTOR_Y = 348;
const COLS = [70, 233, 396, 559];
const CENTERS = COLS.map((x) => x + NODE_W / 2);

// sensor index -> actuator index. Deliberately crossed: a presence detector
// drives the light, the weather station drives the blinds, and so on.
const TELEGRAMS: [number, number][] = [
  [1, 0],
  [2, 1],
  [3, 2],
  [0, 3],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function KnxBus({
  sensors,
  actuators,
  busLabel,
}: {
  sensors: string[];
  actuators: string[];
  busLabel: string;
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  const wire = (from: number, to: number) =>
    `M ${CENTERS[from]} ${BUS_Y} L ${CENTERS[to]} ${BUS_Y}`;

  const draw = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 1.1, delay, ease: EASE },
        };

  const pop = (delay: number) =>
    still
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <svg viewBox="0 0 760 430" role="img" aria-label={busLabel}>
      {/* the bus itself */}
      <motion.path d="M 70 215 L 690 215" className="bus-line" {...draw(0)} />
      <text x="70" y="200" className="bus-tag">
        {busLabel}
      </text>

      {/* drops from every sensor and to every actuator */}
      {CENTERS.map((cx, index) => (
        <motion.path
          key={`drop-s-${cx}`}
          d={`M ${cx} ${SENSOR_Y + NODE_H} L ${cx} ${BUS_Y}`}
          className="bus-wire"
          {...draw(0.25 + index * 0.05)}
        />
      ))}
      {CENTERS.map((cx, index) => (
        <motion.path
          key={`drop-a-${cx}`}
          d={`M ${cx} ${BUS_Y} L ${cx} ${ACTOR_Y}`}
          className="bus-wire"
          {...draw(0.4 + index * 0.05)}
        />
      ))}

      {/* junctions */}
      {CENTERS.map((cx, index) => (
        <motion.circle
          key={`j-${cx}`}
          cx={cx}
          cy={BUS_Y}
          r="3.5"
          className="bus-junction"
          {...pop(0.6 + index * 0.05)}
        />
      ))}

      {/* travelling telegrams: sensor -> bus -> actuator */}
      <g className="bus-telegrams" aria-hidden="true">
        {TELEGRAMS.map(([from, to], index) => (
          <path
            key={`t-${from}-${to}`}
            d={`M ${CENTERS[from]} ${SENSOR_Y + NODE_H} L ${CENTERS[from]} ${BUS_Y} ${wire(from, to).replace("M", "L")} L ${CENTERS[to]} ${ACTOR_Y}`}
            pathLength={100}
            className="bus-telegram"
            style={{ animationDelay: `${index * 1.1}s` }}
          />
        ))}
      </g>

      {/* nodes */}
      {sensors.slice(0, 4).map((label, index) => (
        <motion.g key={`s-${label}`} {...pop(0.15 + index * 0.06)}>
          <rect
            x={COLS[index]}
            y={SENSOR_Y}
            width={NODE_W}
            height={NODE_H}
            rx="4"
            className="bus-node"
          />
          <text x={CENTERS[index]} y={SENSOR_Y + 24} className="bus-label">
            {label}
          </text>
        </motion.g>
      ))}
      {actuators.slice(0, 4).map((label, index) => (
        <motion.g key={`a-${label}`} {...pop(0.45 + index * 0.06)}>
          <rect
            x={COLS[index]}
            y={ACTOR_Y}
            width={NODE_W}
            height={NODE_H}
            rx="4"
            className="bus-node bus-node--actor"
          />
          <text x={CENTERS[index]} y={ACTOR_Y + 24} className="bus-label">
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
