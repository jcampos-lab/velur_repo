"use client";

import React, { useRef, useState, useEffect } from "react";

interface MonoLabelProps {
  x: number;
  y: number;
  text: string;
  accentNumber?: string;
  dark?: boolean;
}

// Auto-sizing mono label — uses getBBox() to measure text and fit the rect.
// x, y = center of the label pill.
export default function MonoLabel({ x, y, text, accentNumber, dark = false }: MonoLabelProps) {
  const textRef = useRef<SVGTextElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!textRef.current) return;
    const b = textRef.current.getBBox();
    setDims({ width: b.width + 16, height: b.height + 8 });
  }, [text, accentNumber]);

  const bg     = dark ? "var(--color-ink)"   : "var(--color-cream)";
  const border = dark ? "rgba(255,255,255,0.15)" : "var(--color-ink)";
  const fill   = dark ? "var(--color-paper)" : "var(--color-ink)";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {dims.width > 0 && (
        <rect
          x={-dims.width / 2}
          y={-dims.height / 2}
          width={dims.width}
          height={dims.height}
          rx={4}
          fill={bg}
          stroke={border}
          strokeWidth={0.75}
        />
      )}
      <text
        ref={textRef}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.02em",
        }}
      >
        {accentNumber && (
          <tspan fill="var(--color-amber)" fontWeight={600}>
            {accentNumber}{" "}
          </tspan>
        )}
        <tspan fill={fill}>{text}</tspan>
      </text>
    </g>
  );
}
