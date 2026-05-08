"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";

const R = Math.sqrt(3) / 2;

export interface VelurCubeProps {
  size?: number;
  cx?: number;
  cy?: number;
  breathe?: boolean;
  interactive?: boolean;
  className?: string;
}

function computeVerts(s: number, cx: number, cy: number) {
  return {
    A: [cx,         cy           ],
    B: [cx + s * R, cy + s * 0.5 ],
    C: [cx,         cy + s       ],
    D: [cx - s * R, cy + s * 0.5 ],
    E: [cx + s * R, cy + s * 1.5 ],
    F: [cx,         cy + s * 2   ],
    G: [cx - s * R, cy + s * 1.5 ],
  };
}

function p(verts: number[][]): string {
  return verts.map(v => v.join(",")).join(" ");
}

const VelurCube = forwardRef<SVGGElement, VelurCubeProps>(function VelurCube(
  { size = 80, cx = 0, cy = 0, breathe = true, interactive = true, className },
  ref
) {
  const topRef     = useRef<SVGPolygonElement>(null);
  const internalRef = useRef<SVGGElement>(null);
  const groupRef   = (ref as React.RefObject<SVGGElement>) ?? internalRef;

  const [hovered, setHovered] = useState(false);

  const v = computeVerts(size, cx, cy);

  useEffect(() => {
    if (!breathe || !topRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let tween: { kill: () => void } | undefined;
    const run = async () => {
      const { gsap } = await import("gsap");
      tween = gsap.fromTo(
        topRef.current,
        { attr: { "fill-opacity": 1 } },
        { attr: { "fill-opacity": 0.82 }, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 }
      );
    };
    run();
    return () => tween?.kill();
  }, [breathe]);

  const faceStyle = interactive && hovered
    ? { filter: "brightness(1.08)", transition: "filter 0.2s" }
    : { transition: "filter 0.2s" };

  return (
    <g
      ref={groupRef}
      className={className}
      onMouseEnter={interactive ? () => setHovered(true)  : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
    >
      {/* Right face — paper white */}
      <polygon
        className="velur-face velur-face-right"
        points={p([v.B, v.E, v.F, v.C])}
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        style={faceStyle}
      />
      {/* Left face — cream */}
      <polygon
        className="velur-face velur-face-left"
        points={p([v.D, v.C, v.F, v.G])}
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        style={faceStyle}
      />
      {/* Top face — amber (breathing target) */}
      <polygon
        ref={topRef}
        className="velur-face velur-face-top"
        points={p([v.A, v.B, v.C, v.D])}
        fill="var(--color-amber)"
        stroke="var(--color-ink)"
        strokeWidth={2}
        style={faceStyle}
      />
    </g>
  );
});

export default VelurCube;

// Convenience: cube center (top-front apex) for connection line anchoring
export function velurCubeCenter(size: number, cx: number, cy: number) {
  return { x: cx, y: cy + size }; // front-top corner (C vertex)
}
