"use client";

import React, { useRef, useEffect } from "react";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface AttributionGridProps {
  className?: string;
}

const R = Math.sqrt(3) / 2;

// 4×4 isometric bar chart — Attribution visual
// Each bar is a stack of IsoCube-like geometry, varying heights
const BARS: { col: number; row: number; height: number; accent: boolean }[] = [
  { col: 0, row: 0, height: 3, accent: false },
  { col: 0, row: 1, height: 5, accent: false },
  { col: 0, row: 2, height: 2, accent: false },
  { col: 0, row: 3, height: 4, accent: false },
  { col: 1, row: 0, height: 6, accent: true  },
  { col: 1, row: 1, height: 4, accent: false },
  { col: 1, row: 2, height: 7, accent: true  },
  { col: 1, row: 3, height: 3, accent: false },
  { col: 2, row: 0, height: 5, accent: false },
  { col: 2, row: 1, height: 8, accent: true  },
  { col: 2, row: 2, height: 4, accent: false },
  { col: 2, row: 3, height: 6, accent: false },
  { col: 3, row: 0, height: 3, accent: false },
  { col: 3, row: 1, height: 5, accent: false },
  { col: 3, row: 2, height: 2, accent: false },
  { col: 3, row: 3, height: 7, accent: true  },
];

const UNIT  = 30;   // cube edge size
const GAP   = 6;    // gap between bars
const STEP  = UNIT * R * 2 + GAP;

function barPaths(bx: number, by: number, h: number, accent: boolean) {
  // bx, by = iso top-back apex of the base
  // h = number of units tall
  const s  = UNIT;
  const th = s * h; // total height in iso coords

  const A = [bx,         by          ];
  const B = [bx + s * R, by + s * 0.5];
  const C = [bx,         by + s      ];
  const D = [bx - s * R, by + s * 0.5];

  // Extend bot row down by th (iso-projection: just shift y by th)
  const E = [bx + s * R, by + s * 0.5 + th];
  const F = [bx,         by + s       + th];
  const G = [bx - s * R, by + s * 0.5 + th];

  const p = (verts: number[][]) => verts.map(v => v.join(",")).join(" ");

  const topFill   = accent ? "var(--color-amber)"  : "var(--color-paper)";
  const rightFill = accent ? "#CC4A14"              : "var(--color-cream)";
  const leftFill  = accent ? "#994013"              : "#E8E4DC";
  const stroke    = "var(--color-ink)";
  const sw        = 0.8;

  return { A, B, C, D, E, F, G, topFill, rightFill, leftFill, stroke, sw, p };
}

export default function AttributionGrid({ className }: AttributionGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 700;
  const H = 500;

  // Grid origin (top-left bar apex)
  const originX = W / 2 - 40;
  const originY = H / 2 + 40;

  // Isometric position for each bar
  function isoPos(col: number, row: number) {
    const x = originX + col * STEP * R     + row * STEP * R;
    const y = originY - col * STEP * 0.5  + row * STEP * 0.5;
    return { x, y };
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const barEls  = svg.querySelectorAll(".attr-bar");
      const labelEl = svg.querySelector(".attr-label");

      if (prefersReduced) {
        [...barEls, labelEl].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([...barEls, labelEl], { opacity: 0 });

      gsap.to([...barEls], {
        opacity: 1,
        duration: 0.35,
        stagger: { each: 0.04, from: "start" },
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      if (labelEl) {
        gsap.to(labelEl, {
          opacity: 1,
          duration: 0.4,
          delay: 0.8,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        });
      }
    };

    run();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <IsoGrid width={W} height={H} spacing={30} opacity={0.12} />

      {/* Render bars back-to-front (painter's algorithm: high col first, low row first) */}
      {[...BARS]
        .sort((a, b) => (b.col - a.col) || (a.row - b.row))
        .map(bar => {
          const { x, y } = isoPos(bar.col, bar.row);
          const { A, B, C, D, E, F, G, topFill, rightFill, leftFill, stroke, sw, p } =
            barPaths(x, y, bar.height, bar.accent);

          return (
            <g key={`${bar.col}-${bar.row}`} className="attr-bar" style={{ opacity: 0 }}>
              <polygon points={p([B, E, F, C])} fill={rightFill} stroke={stroke} strokeWidth={sw} />
              <polygon points={p([D, C, F, G])} fill={leftFill}  stroke={stroke} strokeWidth={sw} />
              <polygon points={p([A, B, C, D])} fill={topFill}   stroke={stroke} strokeWidth={sw} />
            </g>
          );
        })}

      {/* Label */}
      <g className="attr-label" style={{ opacity: 0 }}>
        <MonoLabel
          x={originX}
          y={originY + UNIT * 1.5 + 24}
          text="revenue by channel"
          number="04"
          align="center"
        />
      </g>
    </svg>
  );
}
