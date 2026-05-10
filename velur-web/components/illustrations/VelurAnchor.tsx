"use client";

import React, { useRef, useEffect } from "react";
import VelurCube from "./primitives/VelurCube";
import IsoGrid   from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface VelurAnchorProps {
  className?: string;
}

// Chapter 1: Velur exists. Alone. Alive. Certain.
// Single large Velur cube — establishes the protagonist before the story.
export default function VelurAnchor({ className }: VelurAnchorProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const cubeRef  = useRef<SVGGElement>(null);

  const W = 400;
  const H = 400;
  const cx = W / 2;
  // Cube size + placement: visual height = 2*s, target ~200px tall
  const s  = 90;
  const cy = H / 2 - s - 16; // center the cube body vertically

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    if (!svg || !cube) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const left  = cube.querySelector(".velur-face-left");
      const right = cube.querySelector(".velur-face-right");
      const top   = cube.querySelector(".velur-face-top");
      const label = svg.querySelector(".anchor-label");

      if (prefersReduced) {
        [left, right, top, label].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([left, right, top, label], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      // Face-by-face assembly: left → right → top
      tl.to(left,  { opacity: 1, duration: 0.22, ease: "power2.out" })
        .to(right, { opacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.06")
        .to(top,   { opacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.06")
        .to(label, { opacity: 1, duration: 0.3,  ease: "power2.out" }, "-=0.05");
    };

    run();
  }, []);

  const labelY = cy + s * 2 + 30;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <IsoGrid width={W} height={H} spacing={96} opacity={0.16} />

      <VelurCube ref={cubeRef} size={s} cx={cx} cy={cy} breathe interactive />

      <g className="anchor-label" style={{ opacity: 0 }}>
        <MonoLabel x={cx} y={labelY} text="velur · revenue intelligence" />
      </g>
    </svg>
  );
}
