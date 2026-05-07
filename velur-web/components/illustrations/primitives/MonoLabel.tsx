"use client";

import React from "react";

interface MonoLabelProps {
  x: number;
  y: number;
  text: string;
  number?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
}

// Floating mono caption pill — sits above illustrated elements
export default function MonoLabel({ x, y, text, number, align = "left", dark = false }: MonoLabelProps) {
  const anchor = align === "center" ? "middle" : align === "right" ? "end" : "start";
  const fill       = dark ? "var(--color-ink)"  : "var(--color-cream)";
  const textColor  = dark ? "var(--color-paper)" : "var(--color-ink)";
  const mutedColor = dark ? "rgba(255,255,255,0.5)" : "var(--color-muted)";
  const border     = dark ? "rgba(255,255,255,0.12)" : "var(--color-line)";

  const label = number ? `${number} · ${text}` : text;
  const charW = 6.4;
  const padX  = 10;
  const padY  = 5;
  const fs    = 10.5;
  const w     = label.length * charW * 0.72 + padX * 2;
  const h     = fs + padY * 2;

  const rx = align === "right" ? x - w : align === "center" ? x - w / 2 : x;

  return (
    <g>
      <rect
        x={rx}
        y={y - h / 2}
        width={w}
        height={h}
        rx={3}
        fill={fill}
        stroke={border}
        strokeWidth={0.75}
      />
      {number ? (
        <>
          <text
            x={rx + padX}
            y={y}
            dominantBaseline="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: fs,
              fill: "var(--color-amber)",
              fontWeight: 600,
            }}
          >
            {number} ·{" "}
          </text>
          <text
            x={rx + padX + (number.length + 3) * charW * 0.72}
            y={y}
            dominantBaseline="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: fs,
              fill: textColor,
              fontWeight: 400,
            }}
          >
            {text}
          </text>
        </>
      ) : (
        <text
          x={align === "center" ? x : align === "right" ? x - padX : rx + padX}
          y={y}
          textAnchor={anchor}
          dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: fs,
            fill: textColor,
            fontWeight: 400,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
