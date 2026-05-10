"use client";

import React, { useRef, useEffect } from "react";
import VelurCube  from "./primitives/VelurCube";
import DataCube   from "./primitives/DataCube";
import IsoGrid    from "./primitives/IsoGrid";
import MonoLabel  from "./primitives/MonoLabel";

interface VelurInsideProps {
  className?: string;
}

const R = Math.sqrt(3) / 2;

// Chapter 4: This is what's inside Velur. Layers you own.
// Wireframe outer prism → warehouse → data model → Velur on top.
// Used in Services → Build section.
export default function VelurInside({ className }: VelurInsideProps) {
  const svgRef      = useRef<SVGSVGElement>(null);
  const cubeRef     = useRef<SVGGElement>(null);

  const W  = 800;
  const H  = 580;
  const cx = W / 2;

  // Outer wireframe shell
  const outerS  = 175;
  const outerCy = 55;

  // Inner stacked cubes (larger = lower = earlier drawn)
  const warehouseS  = 100;
  const warehouseCy = 230;
  const modelS      = 68;
  const modelCy     = 185;
  const velurS      = 48;
  const velurCy     = 145;

  // "you own it" callout: right of the Velur cube
  const calloutX = cx + velurS * R + 80;
  const calloutY = velurCy + velurS * 0.5 + 10;

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    if (!svg || !cube) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const shell     = svg.querySelector(".outer-shell");
      const warehouse = svg.querySelector(".warehouse-cube");
      const model     = svg.querySelector(".model-cube");
      const callout   = svg.querySelector(".callout-group");
      const left      = cube.querySelector(".velur-face-left");
      const right     = cube.querySelector(".velur-face-right");
      const top       = cube.querySelector(".velur-face-top");

      if (prefersReduced) {
        [shell, warehouse, model, callout, left, right, top].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        return;
      }

      gsap.set([shell, warehouse, model, callout, left, right, top], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 78%", once: true },
      });

      // 1. Outer wireframe draws in
      tl.to(shell,     { opacity: 1, duration: 0.7, ease: "power2.out" })
        // 2. Layers appear bottom → top
        .to(warehouse, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.1")
        .to(model,     { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.05")
        // 3. Velur assembles
        .to(left,      { opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.05")
        .to(right,     { opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.06")
        .to(top,       { opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.06")
        // 4. Callout slides in
        .fromTo(callout,
          { opacity: 0, x: 12 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );
    };

    run();
  }, []);

  // Wireframe outer cube — draw edges only (no face fills)
  function WireframeShell({ s, cx, cy }: { s: number; cx: number; cy: number }) {
    const A = [cx,         cy           ];
    const B = [cx + s * R, cy + s * 0.5 ];
    const C = [cx,         cy + s       ];
    const D = [cx - s * R, cy + s * 0.5 ];
    const E = [cx + s * R, cy + s * 1.5 ];
    const F = [cx,         cy + s * 2   ];
    const G = [cx - s * R, cy + s * 1.5 ];

    const edge = (p1: number[], p2: number[], i: number) => (
      <line
        key={i}
        x1={p1[0]} y1={p1[1]}
        x2={p2[0]} y2={p2[1]}
        stroke="var(--color-ink)"
        strokeWidth={1.5}
        opacity={0.3}
      />
    );

    const edges = [
      [A, B], [A, D], [B, C], [C, D],   // top face
      [B, E], [E, F], [F, C],             // right face verticals
      [D, G], [G, F],                      // left face verticals
    ];

    return <g className="outer-shell" style={{ opacity: 0 }}>{edges.map((e, i) => edge(e[0], e[1], i))}</g>;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <IsoGrid width={W} height={H} spacing={96} opacity={0.16} />

      <WireframeShell s={outerS} cx={cx} cy={outerCy} />

      {/* Warehouse tier (bottom/largest) */}
      <g className="warehouse-cube" style={{ opacity: 0 }}>
        <DataCube size={warehouseS} cx={cx} cy={warehouseCy} />
        <MonoLabel x={cx - warehouseS * R - 8} y={warehouseCy + warehouseS * 0.9} text="warehouse" />
      </g>

      {/* Data model tier */}
      <g className="model-cube" style={{ opacity: 0 }}>
        <DataCube size={modelS} cx={cx} cy={modelCy} />
        <MonoLabel x={cx - modelS * R - 8} y={modelCy + modelS * 0.9} text="data model" />
      </g>

      {/* Velur cube — top of the stack */}
      <VelurCube ref={cubeRef} size={velurS} cx={cx} cy={velurCy} breathe interactive={false} />

      {/* "you own it" callout */}
      <g className="callout-group" style={{ opacity: 0 }}>
        <line
          x1={cx + velurS * R}
          y1={velurCy + velurS * 0.5}
          x2={calloutX - 4}
          y2={calloutY}
          stroke="var(--color-amber)"
          strokeWidth={1}
          opacity={0.7}
        />
        <MonoLabel x={calloutX + 36} y={calloutY} text="you own it" />
      </g>
    </svg>
  );
}
