"use client";

import React, { useRef, useEffect, useState } from "react";
import VelurCube from "./primitives/VelurCube";
import IsoGrid   from "./primitives/IsoGrid";

interface VelurFinalProps {
  className?: string;
}

// Chapter 7: Closing signature — Velur alone, same as the opener.
// Bookends the entire illustration experience. No label needed.
export default function VelurFinal({ className }: VelurFinalProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const cubeRef = useRef<SVGGElement>(null);
  const [hovered, setHovered] = useState(false);

  const W = 500;
  const H = 500;
  const cx = W / 2;
  const s  = 110;
  const cy = H / 2 - s - 10;

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

      if (prefersReduced) {
        [left, right, top].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([left, right, top], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to(left,  { opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(right, { opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.08")
        .to(top,   { opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.08");
    };

    run();
  }, []);

  // Hover: amber glow ring pulse
  useEffect(() => {
    const ring = svgRef.current?.querySelector(".glow-ring");
    if (!ring || !hovered) return;

    const run = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        ring,
        { attr: { r: 30, "stroke-opacity": 0.5 }, opacity: 0.6 },
        { attr: { r: s * 2.2, "stroke-opacity": 0 }, opacity: 0, duration: 0.8, ease: "power2.out" }
      );
    };
    run();
  }, [hovered, s]);

  const ringCx = cx;
  const ringCy = cy + s; // front-top apex (C vertex)

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IsoGrid width={W} height={H} spacing={96} opacity={0.16} />

      {/* Hover glow ring */}
      <circle
        className="glow-ring"
        cx={ringCx}
        cy={ringCy}
        r={30}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth={1.5}
        opacity={0}
        style={{ pointerEvents: "none" }}
      />

      <VelurCube ref={cubeRef} size={s} cx={cx} cy={cy} breathe interactive={false} />
    </svg>
  );
}
