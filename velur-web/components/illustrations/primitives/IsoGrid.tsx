"use client";

import React from "react";

interface IsoGridProps {
  width: number;
  height: number;
  spacing?: number;
  opacity?: number;
}

// Isometric grid background — infinite tiling pattern via SVG <pattern>
export default function IsoGrid({ width, height, spacing = 32, opacity = 0.18 }: IsoGridProps) {
  const s = spacing;
  const R = Math.sqrt(3) / 2;
  // Pattern tile: rhombus width = 2*s*R, height = s
  const tW = s * R * 2;
  const tH = s;

  // Isometric grid lines in one tile
  // Two sets of parallel lines at ±30°
  const lines: string[] = [
    // \ diagonal
    `M 0,0 L ${tW},${tH}`,
    // / diagonal
    `M ${tW},0 L 0,${tH}`,
    // horizontal midpoint connector
    `M 0,${tH / 2} L ${tW},${tH / 2}`,
  ];

  const patternId = `iso-grid-${Math.round(spacing * 100)}`;

  return (
    <g opacity={opacity} aria-hidden>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={tW}
          height={tH}
          patternUnits="userSpaceOnUse"
        >
          {lines.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="var(--color-line)"
              strokeWidth={0.5}
              fill="none"
            />
          ))}
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </g>
  );
}
