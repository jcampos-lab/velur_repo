"use client";

import React, { useRef, useEffect, useMemo } from "react";

export type LineState = "static" | "active" | "pulse";

interface ConnectionLineProps {
  from: { x: number; y: number };
  to:   { x: number; y: number };
  /** 'static' = slow dot (2.5s), 'active'/'pulse' = fast dot (1s) */
  state?: LineState;
  curveAmount?: number;
  dotDelay?: number;
}

function bezierAt(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

export default function ConnectionLine({
  from,
  to,
  state = "static",
  curveAmount = 0.18,
  dotDelay = 0,
}: ConnectionLineProps) {
  const dotRef   = useRef<SVGCircleElement>(null);
  const tweenRef = useRef<{ kill: () => void } | null>(null);

  // Quadratic bezier control point
  const ctrl = useMemo(() => {
    const dx  = to.x - from.x;
    const dy  = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const mx  = (from.x + to.x) / 2;
    const my  = (from.y + to.y) / 2;
    const nx  = -dy / len;
    const ny  =  dx / len;
    return { x: mx + nx * len * curveAmount, y: my + ny * len * curveAmount };
  }, [from.x, from.y, to.x, to.y, curveAmount]);

  const d = `M ${from.x},${from.y} Q ${ctrl.x},${ctrl.y} ${to.x},${to.y}`;

  // Lines always render amber after entrance (no static-dashed state)
  const isAccelerated = state === "active" || state === "pulse";
  const dotDuration   = isAccelerated ? 1.0 : 2.5;

  // Continuous traveling dot — always active
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    tweenRef.current?.kill();
    tweenRef.current = null;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      dot.style.opacity = "0";
      return;
    }

    dot.style.opacity = "1";

    // Place dot at start position immediately
    const pos0 = bezierAt(0, from, ctrl, to);
    dot.setAttribute("cx", String(pos0.x));
    dot.setAttribute("cy", String(pos0.y));

    const run = async () => {
      const { gsap } = await import("gsap");
      const obj = { t: 0 };

      tweenRef.current = gsap.to(obj, {
        t: 1,
        duration: dotDuration,
        ease: "none",
        delay: dotDelay,
        repeat: -1,
        repeatDelay: 0.4,
        onUpdate() {
          const pos = bezierAt(obj.t, from, ctrl, to);
          dot.setAttribute("cx", String(pos.x));
          dot.setAttribute("cy", String(pos.y));
        },
        onRepeat() {
          obj.t = 0;
        },
      });
    };

    run();
    return () => tweenRef.current?.kill();
  }, [dotDuration, dotDelay, from.x, from.y, ctrl.x, ctrl.y, to.x, to.y]);

  return (
    <g>
      {/* Always-on amber connection line */}
      <path
        d={d}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth={1.5}
        opacity={0.8}
      />
      {/* Traveling transfer dot */}
      <circle
        ref={dotRef}
        r={3.5}
        fill="#FF7A40"
        style={{ opacity: 0 }}
      />
    </g>
  );
}
