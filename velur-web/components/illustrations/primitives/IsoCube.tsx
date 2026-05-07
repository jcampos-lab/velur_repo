"use client";

import React from "react";

export type CubeAccent = "top" | "left" | "right" | "none";

interface IsoCubeProps {
  size?: number;
  cx?: number;
  cy?: number;
  accent?: CubeAccent;
  label?: string;
  wireframe?: boolean;
  className?: string;
}

// Isometric cube geometry — true 30° projection
// Vertex layout (s = size, apex at cx, cy):
//   A (top-back)   = (cx,         cy         )
//   B (top-right)  = (cx + s*R,   cy + s*0.5 )
//   C (top-front)  = (cx,         cy + s      )
//   D (top-left)   = (cx - s*R,   cy + s*0.5 )
//   E (bot-right)  = (cx + s*R,   cy + s*1.5 )
//   F (bot-front)  = (cx,         cy + s*2   )
//   G (bot-left)   = (cx - s*R,   cy + s*1.5 )
const R = Math.sqrt(3) / 2;

function pts(cx: number, cy: number, s: number) {
  return {
    A: [cx,         cy          ] as [number, number],
    B: [cx + s * R, cy + s * 0.5] as [number, number],
    C: [cx,         cy + s      ] as [number, number],
    D: [cx - s * R, cy + s * 0.5] as [number, number],
    E: [cx + s * R, cy + s * 1.5] as [number, number],
    F: [cx,         cy + s * 2  ] as [number, number],
    G: [cx - s * R, cy + s * 1.5] as [number, number],
  };
}

function poly(vertices: [number, number][]) {
  return vertices.map(([x, y]) => `${x},${y}`).join(" ");
}

export default function IsoCube({
  size = 40,
  cx = 0,
  cy = 0,
  accent = "none",
  label,
  wireframe = false,
  className,
}: IsoCubeProps) {
  const v = pts(cx, cy, size);

  const topFill    = accent === "top"   ? "var(--color-amber)"  : wireframe ? "none" : "var(--color-paper)";
  const rightFill  = accent === "right" ? "var(--color-amber)"  : wireframe ? "none" : "var(--color-cream)";
  const leftFill   = accent === "left"  ? "var(--color-amber)"  : wireframe ? "none" : "#E8E4DC";

  const stroke   = wireframe ? "var(--color-line)" : "var(--color-ink)";
  const sw       = wireframe ? 0.8 : 1;

  // Label anchor: center of front face
  const labelX = v.C[0];
  const labelY = (v.C[1] + v.F[1]) / 2;

  return (
    <g className={className}>
      {/* Right face */}
      <polygon
        points={poly([v.B, v.E, v.F, v.C])}
        fill={rightFill}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Left face */}
      <polygon
        points={poly([v.D, v.C, v.F, v.G])}
        fill={leftFill}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Top face */}
      <polygon
        points={poly([v.A, v.B, v.C, v.D])}
        fill={topFill}
        stroke={stroke}
        strokeWidth={sw}
      />
      {/* Label */}
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: size * 0.22,
            fill: accent !== "none" ? "var(--color-paper)" : "var(--color-muted)",
            fontWeight: 500,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
