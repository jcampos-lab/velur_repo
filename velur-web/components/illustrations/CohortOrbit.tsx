"use client";

import React, { useRef, useEffect } from "react";
import IsoCube from "./primitives/IsoCube";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface CohortOrbitProps {
  className?: string;
}

// Central LTV cube + 5 orbiting cohort dots — Case Studies page
// Represents behavioral cohort segmentation
export default function CohortOrbit({ className }: CohortOrbitProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 700;
  const H = 500;
  const cx = W / 2;
  const cy = H / 2 - 20;

  const centralSize = 72;
  const orbitRadius = 160;

  // 5 cohort satellites
  const cohorts = [
    { label: "new",       angle: -90  },
    { label: "at-risk",   angle: -18  },
    { label: "loyal",     angle:  54  },
    { label: "lapsed",    angle: 126  },
    { label: "champion",  angle: 198  },
  ];

  const dots = cohorts.map(c => {
    const rad = (c.angle * Math.PI) / 180;
    return {
      label: c.label,
      x: cx + orbitRadius * Math.cos(rad),
      y: cy + orbitRadius * Math.sin(rad) * 0.55, // flatten for iso feel
    };
  });

  // Orbit ellipse approximation path
  const orbitPath = `M ${cx},${cy - orbitRadius * 0.55} a ${orbitRadius},${orbitRadius * 0.55} 0 1 1 0.01,0`;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const center    = svg.querySelector(".center-cube");
      const dotEls    = svg.querySelectorAll(".orbit-dot");
      const lineEls   = svg.querySelectorAll(".orbit-line");
      const labelEls  = svg.querySelectorAll(".orbit-label");
      const orbitEl   = svg.querySelector(".orbit-ellipse");

      if (prefersReduced) {
        [center, orbitEl, ...dotEls, ...lineEls, ...labelEls].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        return;
      }

      gsap.set([center, orbitEl, ...dotEls, ...lineEls, ...labelEls], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to(center,   { opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(orbitEl,  { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.1")
        .to([...dotEls, ...lineEls], {
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          }, "-=0.3")
        .to([...labelEls], { opacity: 1, duration: 0.3, stagger: 0.08 }, "-=0.2");
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
      <IsoGrid width={W} height={H} spacing={32} opacity={0.13} />

      {/* Orbit ellipse */}
      <ellipse
        className="orbit-ellipse"
        cx={cx}
        cy={cy}
        rx={orbitRadius}
        ry={orbitRadius * 0.55}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={1}
        strokeDasharray="4 5"
        style={{ opacity: 0 }}
      />

      {/* Lines from center to dots */}
      {dots.map(dot => (
        <line
          key={`line-${dot.label}`}
          className="orbit-line"
          x1={cx}
          y1={cy}
          x2={dot.x}
          y2={dot.y}
          stroke="var(--color-line)"
          strokeWidth={0.8}
          strokeDasharray="3 4"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Central LTV cube */}
      <g className="center-cube" style={{ opacity: 0 }}>
        <IsoCube size={centralSize} cx={cx} cy={cy - centralSize * 0.5} accent="top" />
        <MonoLabel x={cx} y={cy + centralSize * 1.6} text="LTV" align="center" />
      </g>

      {/* Satellite cohort dots */}
      {dots.map(dot => {
        const isTop = dot.y < cy;
        const labelY = isTop ? dot.y - 18 : dot.y + 18;
        const align  = dot.x < cx - 20 ? "right" : dot.x > cx + 20 ? "left" : "center";
        return (
          <g key={dot.label}>
            <circle
              className="orbit-dot"
              cx={dot.x}
              cy={dot.y}
              r={7}
              fill="var(--color-ink)"
              style={{ opacity: 0 }}
            />
            <g className="orbit-label" style={{ opacity: 0 }}>
              <MonoLabel x={dot.x} y={labelY} text={dot.label} align={align} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
