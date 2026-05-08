"use client";

import React, { useRef, useEffect } from "react";
import DataCube  from "./primitives/DataCube";
import IsoGrid   from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface DataChaosProps {
  className?: string;
}

// Chapter 2: Without Velur, your data is chaos.
// Scattered grayscale cubes — no protagonist, no order.
// Deliberately asymmetric. No Velur cube present.

const CUBES = [
  { cx: 130, cy:  70, size: 52, label: "shopify",  showLabel: true  },
  { cx: 370, cy:  38, size: 40, label: "klaviyo",  showLabel: true  },
  { cx: 620, cy:  80, size: 56, label: "meta",     showLabel: true  },
  { cx: 210, cy: 250, size: 34, label: "tiktok",   showLabel: false },
  { cx: 490, cy: 190, size: 46, label: "google",   showLabel: true  },
  { cx: 680, cy: 280, size: 30, label: "email",    showLabel: false },
  { cx: 330, cy: 320, size: 42, label: "direct",   showLabel: true  },
  { cx:  80, cy: 360, size: 26, label: null,        showLabel: false },
  { cx: 720, cy: 150, size: 38, label: "social",   showLabel: false },
];

// Each cube drifts independently — offset values for GSAP float animation
const DRIFTS = [
  {  dy: -4, dx:  2, dur: 5.8 },
  {  dy:  3, dx: -3, dur: 6.4 },
  {  dy: -3, dx:  4, dur: 7.1 },
  {  dy:  5, dx: -2, dur: 5.3 },
  {  dy: -5, dx:  3, dur: 6.9 },
  {  dy:  4, dx: -4, dur: 7.5 },
  {  dy: -3, dx:  2, dur: 6.2 },
  {  dy:  3, dx: -5, dur: 5.7 },
  {  dy: -4, dx:  3, dur: 6.8 },
];

export default function DataChaos({ className }: DataChaosProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 800;
  const H = 460;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cubeGroups = svg.querySelectorAll(".chaos-cube");

      if (prefersReduced) {
        cubeGroups.forEach(el => ((el as SVGElement).style.opacity = "1"));
        return;
      }

      // Random entrance directions
      const directions = [
        [-60, -40], [30, -50], [70, -30],
        [-50, 20], [60, 10], [80, -20],
        [-40, 50], [-70, 30], [50, -40],
      ];

      gsap.set(cubeGroups, { opacity: 0 });

      gsap.to(cubeGroups, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      // Continuous drift — each cube has its own timeline
      cubeGroups.forEach((el, i) => {
        const drift = DRIFTS[i] ?? DRIFTS[0];
        gsap.to(el, {
          y: drift.dy,
          x: drift.dx,
          duration: drift.dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    };

    run();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <IsoGrid width={W} height={H} spacing={34} opacity={0.06} />

      {CUBES.map((cube, i) => (
        <g key={i} className="chaos-cube" style={{ opacity: 0 }}>
          <DataCube size={cube.size} cx={cube.cx} cy={cube.cy} />
          {cube.showLabel && cube.label && (
            <MonoLabel
              x={cube.cx}
              y={cube.cy - 12}
              text={cube.label}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
