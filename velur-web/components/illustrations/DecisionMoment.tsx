"use client";

import React, { useRef, useEffect } from "react";
import IsoCube from "./primitives/IsoCube";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface DecisionMomentProps {
  className?: string;
}

// Outer wireframe cube + inner amber solid cube — used in all CTA sections
// Represents the decisive moment: the answer is already inside the data.
export default function DecisionMoment({ className }: DecisionMomentProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 600;
  const H = 600;
  const cx = W / 2;
  const cy = H / 2 - 60;

  // Outer wireframe cube apex
  const outerSize = 160;
  // Inner amber cube apex offset inside outer top face center
  const innerSize = 72;
  const innerCx   = cx;
  const innerCy   = cy + outerSize * 0.2;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const outer = svg.querySelector(".outer-cube");
      const inner = svg.querySelector(".inner-cube");
      const label = svg.querySelector(".decision-label");

      if (prefersReduced) {
        [outer, inner, label].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([outer, inner, label], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to(outer, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(inner,  { opacity: 0, duration: 0 }, "<")
        .to(inner,  {
            opacity: 1,
            scale: 1,
            transformOrigin: "50% 50%",
            duration: 0.5,
            ease: "back.out(1.4)",
          }, "-=0.1")
        .to(label, { opacity: 1, duration: 0.4 }, "-=0.2");
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
      <IsoGrid width={W} height={H} spacing={36} opacity={0.12} />

      {/* Outer wireframe cube */}
      <g className="outer-cube" style={{ opacity: 0 }}>
        <IsoCube
          size={outerSize}
          cx={cx}
          cy={cy}
          accent="none"
          wireframe={true}
        />
      </g>

      {/* Inner amber accent cube */}
      <g className="inner-cube" style={{ opacity: 0 }}>
        <IsoCube
          size={innerSize}
          cx={innerCx}
          cy={innerCy}
          accent="top"
          wireframe={false}
        />
      </g>

      {/* Label */}
      <g className="decision-label" style={{ opacity: 0 }}>
        <MonoLabel
          x={cx}
          y={cy + outerSize * 2 + 28}
          text="the answer is in the data"
          align="center"
        />
      </g>
    </svg>
  );
}
