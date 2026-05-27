"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef:      RefObject<HTMLElement | null>;
  toRef:        RefObject<HTMLElement | null>;
  /** Curve depth, in pixels. Positive curves downward, negative upward. */
  curvature?: number;
  /** Color of the beam line. */
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  /** Color of the moving gradient pulse. */
  gradientStartColor?: string;
  gradientStopColor?: string;
  /** Animation duration of one pulse pass, in seconds. */
  duration?: number;
  /** Stagger this beam's pulse start, in seconds. */
  delay?: number;
  /** Reverse the pulse direction. */
  reverse?: boolean;
};

/**
 * Draws a curved SVG path between two referenced elements inside a shared
 * containerRef, then animates a gradient dot along it. Recalculates on
 * resize and on container scroll. Inspired by the magicui animated-beam
 * pattern. MIT-style implementation; not copied verbatim.
 */
export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  pathColor = "var(--color-line)",
  pathWidth = 1.5,
  pathOpacity = 0.6,
  gradientStartColor = "#FF5B1A",
  gradientStopColor = "#FFB088",
  duration = 3.5,
  delay = 0,
  reverse = false,
}: AnimatedBeamProps) {
  const prefersReduced = useReducedMotion();
  const [pathD, setPathD] = useState("");
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0 });
  const gradId = `velur-beam-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    function update() {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const from      = fromRef.current.getBoundingClientRect();
      const to        = toRef.current.getBoundingClientRect();

      setSvgDims({ width: container.width, height: container.height });

      const startX = from.left + from.width  / 2 - container.left;
      const startY = from.top  + from.height / 2 - container.top;
      const endX   = to.left   + to.width    / 2 - container.left;
      const endY   = to.top    + to.height   / 2 - container.top;

      // Mid-point with curvature offset
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2 + curvature;

      setPathD(`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`);
    }

    update();

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    if (fromRef.current)      ro.observe(fromRef.current);
    if (toRef.current)        ro.observe(toRef.current);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pathD) return null;

  return (
    <svg
      width={svgDims.width}
      height={svgDims.height}
      viewBox={`0 0 ${svgDims.width} ${svgDims.height}`}
      className="pointer-events-none absolute inset-0"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={gradientStartColor} stopOpacity={0} />
          <stop offset="50%"  stopColor={gradientStartColor} stopOpacity={1} />
          <stop offset="100%" stopColor={gradientStopColor}  stopOpacity={0} />
          {!prefersReduced && (
            <animate
              attributeName="x1"
              values={reverse ? "100%;0%" : "0%;100%"}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          )}
          {!prefersReduced && (
            <animate
              attributeName="x2"
              values={reverse ? "200%;100%" : "-100%;0%"}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>
      <motion.path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        initial={prefersReduced ? {} : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <path
        d={pathD}
        stroke={`url(#${gradId})`}
        strokeWidth={pathWidth + 0.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
