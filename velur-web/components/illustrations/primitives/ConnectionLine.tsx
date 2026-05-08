"use client";

import React, { useRef, useEffect, useMemo } from "react";

export type LineState = "static" | "active" | "pulse";

interface ConnectionLineProps {
  from: { x: number; y: number };
  to:   { x: number; y: number };
  state?: LineState;
  curveAmount?: number;
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
}: ConnectionLineProps) {
  const dotRef  = useRef<SVGCircleElement>(null);
  const tweenRef = useRef<{ kill: () => void } | null>(null);

  // Quadratic bezier control point — perpendicular offset from midpoint
  const ctrl = useMemo(() => {
    const dx  = to.x - from.x;
    const dy  = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const mx  = (from.x + to.x) / 2;
    const my  = (from.y + to.y) / 2;
    // Perpendicular unit vector (90° ccw)
    const nx = -dy / len;
    const ny =  dx / len;
    return { x: mx + nx * len * curveAmount, y: my + ny * len * curveAmount };
  }, [from.x, from.y, to.x, to.y, curveAmount]);

  const d = `M ${from.x},${from.y} Q ${ctrl.x},${ctrl.y} ${to.x},${to.y}`;

  // Line visual per state
  const isStatic = state === "static";
  const isPulse  = state === "pulse";

  const stroke        = isStatic ? "var(--color-ink)"   : "var(--color-amber)";
  const strokeWidth   = isStatic ? 1   : 1.5;
  const opacity       = isStatic ? 0.35 : 1;
  const strokeDash    = isStatic ? "4 4" : "none";

  // Pulse dot animation
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    tweenRef.current?.kill();
    tweenRef.current = null;

    if (!isPulse) {
      dot.style.display = "none";
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      dot.style.display = "none";
      return;
    }

    dot.style.display = "";
    const pos0 = bezierAt(0, from, ctrl, to);
    dot.setAttribute("cx", String(pos0.x));
    dot.setAttribute("cy", String(pos0.y));

    const run = async () => {
      const { gsap } = await import("gsap");
      const obj = { t: 0 };
      tweenRef.current = gsap.to(obj, {
        t: 1,
        duration: 1,
        ease: "none",
        repeat: -1,
        onUpdate() {
          const pos = bezierAt(obj.t, from, ctrl, to);
          dot.setAttribute("cx", String(pos.x));
          dot.setAttribute("cy", String(pos.y));
        },
      });
    };
    run();

    return () => { tweenRef.current?.kill(); };
  }, [isPulse, from.x, from.y, ctrl.x, ctrl.y, to.x, to.y]);

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDash}
        opacity={opacity}
        style={{ transition: "stroke 0.4s, stroke-width 0.4s, opacity 0.4s" }}
      />
      {/* Pulse dot — hidden unless state=pulse */}
      <circle
        ref={dotRef}
        r={3.5}
        fill="var(--color-amber)"
        style={{ display: "none" }}
      />
    </g>
  );
}
