"use client";

import React, { useId } from "react";

interface IsoGridProps {
  width: number;
  height: number;
  spacing?: number; // horizontal distance between vertices
  opacity?: number;
  bleed?: number;   // how far the pattern extends beyond the viewBox on each side
}

// Proper isometric grid — lines at 30°/60°/90° angles
// bleed extends the pattern rect beyond the SVG viewBox so it merges with the page edge
export default function IsoGrid({ width, height, spacing = 60, opacity = 0.06, bleed = 2000 }: IsoGridProps) {
  const rawId    = useId();
  const uid      = rawId.replace(/:/g, "");
  const patId    = `iso-${uid}`;

  const half = spacing / 2;
  const h    = half / Math.sqrt(3);
  const patH = h * 2;

  return (
    <g opacity={opacity} aria-hidden>
      <defs>
        <pattern
          id={patId}
          x="0"
          y="0"
          width={spacing}
          height={patH}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0}    y1={0}    x2={half}    y2={h}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={half} y1={h}    x2={spacing} y2={0}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={0}    y1={patH} x2={half}    y2={h}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={half} y1={h}    x2={spacing} y2={patH} stroke="var(--color-ink)" strokeWidth={0.7} />
        </pattern>
      </defs>
      <rect x={-bleed} y={0} width={width + bleed * 2} height={height} fill={`url(#${patId})`} />
    </g>
  );
}
