"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type NumberTickerProps = {
  value: number;
  /** Number of decimal places to render. */
  decimals?: number;
  /** Prefix string, e.g. "$" or "+". */
  prefix?: string;
  /** Suffix string, e.g. "%", "K", "×". */
  suffix?: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  className?: string;
  /** Group digits with commas. */
  group?: boolean;
};

export default function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  delay = 0,
  className = "",
  group = true,
}: NumberTickerProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(prefersReduced ? value : 0);
  const [display, setDisplay] = useState(prefersReduced ? format(value) : format(0));

  function format(n: number): string {
    const fixed = n.toFixed(decimals);
    if (!group) return `${prefix}${fixed}${suffix}`;
    const [int, dec] = fixed.split(".");
    const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${prefix}${withCommas}${dec ? `.${dec}` : ""}${suffix}`;
  }

  useEffect(() => {
    if (!isInView || prefersReduced) return;
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: latest => setDisplay(format(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value, duration, delay]);

  return (
    <motion.span ref={ref} className={className} aria-label={format(value)}>
      {display}
    </motion.span>
  );
}
