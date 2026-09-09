import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * SSR gate. The server renders the finished state, so content is never
 * invisible if hydration is slow or fails. Animations arm on mount, which
 * still covers everything the viewer has not scrolled to yet.
 */
export function useArmed() {
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(true), []);
  return armed;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Scroll reveal. Motivated: sequences a section's content as it arrives. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "header";
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const Tag = motion[as];
  const still = reduce || !armed;

  const anim = still
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15, margin: "0px 0px -60px" },
        transition: { duration: 0.7, delay, ease: EASE },
      };

  return (
    <Tag className={className} {...anim}>
      {children}
    </Tag>
  );
}

/** Staggered group. Children must be <Item>. */
export function Stagger({
  children,
  className,
  step = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const Tag = motion[as];
  const still = reduce || !armed;

  const anim = still
    ? { initial: false as const }
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.1, margin: "0px 0px -60px" },
        variants: { hidden: {}, shown: { transition: { staggerChildren: step } } },
      };

  return (
    <Tag className={className} {...anim}>
      {children}
    </Tag>
  );
}

export function Item({
  children,
  className,
  as = "div",
  y = 22,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "a";
  y?: number;
} & Record<string, unknown>) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Hairline that draws itself. Motivated: marks where a section begins. */
export function DrawRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;
  const anim = still
    ? { initial: false as const }
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.9, ease: EASE },
      };

  return <motion.div className={`rule ${className}`} {...anim} />;
}

/**
 * Counts up when the number scrolls into view. Motivated: the figures are the
 * credibility of the page, so they get the eye before the label does.
 */
export function Counter({
  value,
  locale,
  decimals = 0,
}: {
  value: number;
  locale: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const format = (n: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!inView) return;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
      onComplete: () => {
        node.textContent = format(value);
      },
    });
    // The count writes straight to the DOM, so React will not repair it: its
    // own virtual text never changed and it skips the update. Anything that
    // interrupts the animation therefore has to leave the final figure behind,
    // or the page ships a half-counted number.
    return () => {
      controls.stop();
      node.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce, locale, decimals]);

  return <span ref={ref}>{format(value)}</span>;
}

/**
 * Pointer spotlight. Writes CSS custom properties directly so tracking the
 * cursor never re-renders the React tree.
 */
export function useSpotlight() {
  return {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
  };
}

/** Magnetic pull on the primary action. Motivated: tactile feedback on the one CTA that matters. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that lifts in line by line behind a mask. Motivated: the arrival moment. */
export function MaskLines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const still = reduce || !armed;

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span className="hero-line" key={index}>
          <motion.span
            style={{ display: "block" }}
            {...(still
              ? { initial: false as const }
              : {
                  initial: { y: "108%" },
                  animate: { y: "0%" },
                  transition: { duration: 1, delay: 0.1 + index * 0.11, ease: EASE },
                })}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Scroll-linked parallax for the hero media. Motivated: depth as the page leaves the hero. */
export function useHeroParallax(target: React.RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  return reduce ? null : { y, scale, fade };
}

export type { MotionValue };
