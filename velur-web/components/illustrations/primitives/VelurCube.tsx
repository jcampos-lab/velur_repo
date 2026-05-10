"use client";

import React, { useRef, useEffect, useState, forwardRef, useId } from "react";

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

// Face centroid of the right face parallelogram
function faceCentroid(s: number, cx: number, cy: number) {
  return { x: cx + (s * R) / 2, y: cy + (5 * s) / 4 };
}

const VelurCube = forwardRef<SVGGElement, VelurCubeProps>(function VelurCube(
  { size: s = 80, cx = 0, cy = 0, breathe = true, interactive = true, className },
  ref
) {
  const rawId      = useId();
  const uid        = rawId.replace(/:/g, "");
  const clipId     = `vcl-${uid}`;

  const topRef      = useRef<SVGPolygonElement>(null);
  const internalRef = useRef<SVGGElement>(null);
  const groupRef    = (ref as React.RefObject<SVGGElement>) ?? internalRef;

  const [hovered, setHovered] = useState(false);

  const v = computeVerts(s, cx, cy);

  // Velur Quartet mark — flat stamp at right-face centroid.
  // u = half-spacing between circle centers (proportional to cube size).
  // Ratio u:r matches the original logo geometry (65:55).
  const fc  = faceCentroid(s, cx, cy);
  const u   = s * 0.12;           // half-spacing
  const cr  = u * (55 / 65);      // circle radius
  const sqH = u * (15 / 65);      // center square half-size

  // Breathing: top face fill-opacity oscillates 1.0 ↔ 0.82
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
      <defs>
        {/* Clip logo to the right face boundary */}
        <clipPath id={clipId}>
          <polygon points={p([v.B, v.E, v.F, v.C])} />
        </clipPath>
      </defs>

      {/* Fills — no strokes, prevents double-drawn shared edges */}
      <polygon
        className="velur-face velur-face-right"
        points={p([v.B, v.E, v.F, v.C])}
        fill="var(--color-paper)"
        style={faceStyle}
      />

      {/* Velur Quartet mark — flat stamp, circles stay circular */}
      <g
        transform={`translate(${fc.x}, ${fc.y})`}
        clipPath={`url(#${clipId})`}
        opacity={0.52}
        aria-hidden
      >
        <circle cx={-u} cy={-u} r={cr} fill="var(--color-ink)" />
        <circle cx={ u} cy={-u} r={cr} fill="var(--color-ink)" />
        <circle cx={-u} cy={ u} r={cr} fill="var(--color-ink)" />
        <circle cx={ u} cy={ u} r={cr} fill="var(--color-ink)" />
        <rect
          x={-sqH} y={-sqH}
          width={sqH * 2} height={sqH * 2}
          rx={sqH * 0.53}
          fill="var(--color-ink)"
        />
      </g>

      <polygon
        className="velur-face velur-face-left"
        points={p([v.D, v.C, v.F, v.G])}
        fill="var(--color-cream)"
        style={faceStyle}
      />

      <polygon
        ref={topRef}
        className="velur-face velur-face-top"
        points={p([v.A, v.B, v.C, v.D])}
        fill="var(--color-amber)"
        style={faceStyle}
      />

      {/* Outer silhouette — single closed path, round joins for seamless corners */}
      <polygon
        points={p([v.A, v.B, v.E, v.F, v.G, v.D])}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Interior ridges — each drawn once, round caps blend into the contour */}
      <line x1={v.B[0]} y1={v.B[1]} x2={v.C[0]} y2={v.C[1]} stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" />
      <line x1={v.D[0]} y1={v.D[1]} x2={v.C[0]} y2={v.C[1]} stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" />
      <line x1={v.C[0]} y1={v.C[1]} x2={v.F[0]} y2={v.F[1]} stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
});

export default VelurCube;

export function velurCubeCenter(size: number, cx: number, cy: number) {
  return { x: cx, y: cy + size }; // C vertex — top-front anchor
}
