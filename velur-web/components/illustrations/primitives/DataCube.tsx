"use client";

import React from "react";

const R = Math.sqrt(3) / 2;

export interface DataCubeProps {
  size?: number;
  cx?: number;
  cy?: number;
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

// Passive grayscale cube — represents data sources, tools, cohorts.
// No animation by default. Parent controls opacity for entrance.
export default function DataCube({ size = 60, cx = 0, cy = 0, className }: DataCubeProps) {
  const v = computeVerts(size, cx, cy);

  return (
    <g className={className}>
      {/* Fills — no strokes to prevent double-drawn shared edges */}
      <polygon className="data-face data-face-right" points={p([v.B, v.E, v.F, v.C])} fill="var(--color-paper)" />
      <polygon className="data-face data-face-left"  points={p([v.D, v.C, v.F, v.G])} fill="#ECE9E1" />
      <polygon className="data-face data-face-top"   points={p([v.A, v.B, v.C, v.D])} fill="var(--color-cream)" />

      {/* Outer silhouette — drawn once, round joins for clean corners */}
      <polygon
        points={p([v.A, v.B, v.E, v.F, v.G, v.D])}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Interior ridges — each drawn once, round caps blend into contour */}
      <line x1={v.B[0]} y1={v.B[1]} x2={v.C[0]} y2={v.C[1]} stroke="var(--color-ink)" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={v.D[0]} y1={v.D[1]} x2={v.C[0]} y2={v.C[1]} stroke="var(--color-ink)" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={v.C[0]} y1={v.C[1]} x2={v.F[0]} y2={v.F[1]} stroke="var(--color-ink)" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

// The "front apex" of the cube, useful for anchoring connection lines
export function dataCubeAnchor(size: number, cx: number, cy: number) {
  return { x: cx, y: cy + size }; // C vertex — top-front
}
