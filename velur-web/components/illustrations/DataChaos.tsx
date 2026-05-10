"use client";

import React, { useRef, useEffect } from "react";
import DataCube  from "./primitives/DataCube";
import IsoGrid   from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface DataChaosProps {
  className?: string;
}

// Chapter 2: Without Velur, your data is chaos.
// Scattered grayscale cubes in a horizontal band — no order, no protagonist.

const CUBES = [
  { cx:  70, cy: 52, size: 52, label: "shopify"   },
  { cx: 190, cy: 70, size: 40, label: "klaviyo"   },
  { cx: 305, cy: 42, size: 56, label: "meta"      },
  { cx: 430, cy: 75, size: 34, label: "tiktok"    },
  { cx: 535, cy: 58, size: 46, label: "google"    },
  { cx: 645, cy: 80, size: 30, label: "email"     },
  { cx: 745, cy: 62, size: 42, label: "direct"    },
  { cx: 855, cy: 85, size: 26, label: "affiliate" },
  { cx: 950, cy: 70, size: 38, label: null        },
];

// Each cube drifts in a distinct direction — chaos, not oscillation
const DRIFTS = [
  { dx: -18, dy: -10, dur: 8.5 },
  { dx:  14, dy: -14, dur: 9.2 },
  { dx: -12, dy:  12, dur: 7.8 },
  { dx:  20, dy:   8, dur: 10.1 },
  { dx: -16, dy:   6, dur: 8.9 },
  { dx:  12, dy: -16, dur: 9.6 },
  { dx: -14, dy: -10, dur: 7.4 },
  { dx:  18, dy:  12, dur: 11.0 },
  { dx: -10, dy:  18, dur: 8.1 },
];

export default function DataChaos({ className }: DataChaosProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 1000;
  const H = 210;

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

      gsap.set(cubeGroups, { opacity: 0 });

      gsap.to(cubeGroups, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      cubeGroups.forEach((el, i) => {
        const drift = DRIFTS[i] ?? DRIFTS[0];
        gsap.to(el, {
          x: drift.dx,
          y: drift.dy,
          duration: drift.dur,
          ease: "power1.inOut",
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
      <IsoGrid width={W} height={H} spacing={96} opacity={0.16} />

      {CUBES.map((cube, i) => (
        <g key={i} className="chaos-cube" style={{ opacity: 0 }}>
          <DataCube size={cube.size} cx={cube.cx} cy={cube.cy} />
          {cube.label && (
            <MonoLabel
              x={cube.cx}
              y={cube.cy - 10}
              text={cube.label}
            />
          )}
        </g>
      ))}

      {/* Caption */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={11}
        fill="var(--color-muted)"
        opacity={0.6}
        letterSpacing="0.08em"
      >
        the data is there. but it&apos;s not yours yet.
      </text>
    </svg>
  );
}
