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
      {/* Right face */}
      <polygon
        className="data-face data-face-right"
        points={p([v.B, v.E, v.F, v.C])}
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      {/* Left face */}
      <polygon
        className="data-face data-face-left"
        points={p([v.D, v.C, v.F, v.G])}
        fill="#ECE9E1"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      {/* Top face */}
      <polygon
        className="data-face data-face-top"
        points={p([v.A, v.B, v.C, v.D])}
        fill="var(--color-cream)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
    </g>
  );
}

// The "front apex" of the cube, useful for anchoring connection lines
export function dataCubeAnchor(size: number, cx: number, cy: number) {
  return { x: cx, y: cy + size }; // C vertex — top-front
}
