"use client";

import React, { useRef, useEffect } from "react";
import IsoCube from "./primitives/IsoCube";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";
import DashedPath from "./primitives/DashedPath";

interface DataWarehouseProps {
  className?: string;
}

const R = Math.sqrt(3) / 2;

// Wireframe prism with labeled internal blocks
// Used in Services → The Build section
export default function DataWarehouse({ className }: DataWarehouseProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 800;
  const H = 520;
  const cx = W / 2;
  const cy = 80;

  // Outer wireframe prism
  const prismSize = 180;

  // Internal labeled blocks (smaller cubes inside the prism footprint)
  const innerBlocks = [
    { size: 44, cx: cx - 60, cy: cy + prismSize * 0.8,  label: "bigquery",    accent: "none" as const },
    { size: 44, cx: cx + 60, cy: cy + prismSize * 0.8,  label: "dbt",         accent: "none" as const },
    { size: 44, cx: cx,      cy: cy + prismSize * 1.2,  label: "looker",      accent: "top"  as const },
    { size: 36, cx: cx - 90, cy: cy + prismSize * 1.35, label: "metabase",    accent: "none" as const },
    { size: 36, cx: cx + 90, cy: cy + prismSize * 1.35, label: "fivetran",    accent: "none" as const },
  ];

  // Dashed lines from prism walls to inner blocks
  const prismFrontX = cx;
  const prismFrontY = cy + prismSize;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const prismEl  = svg.querySelector(".prism-outer");
      const blockEls = svg.querySelectorAll(".inner-block");
      const labelEls = svg.querySelectorAll(".wh-label");

      if (prefersReduced) {
        [prismEl, ...blockEls, ...labelEls].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([prismEl, ...blockEls, ...labelEls], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to(prismEl, { opacity: 1, duration: 0.7, ease: "power2.out" })
        .to([...blockEls], {
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          }, "-=0.2")
        .to([...labelEls], { opacity: 1, duration: 0.3, stagger: 0.06 }, "-=0.15");
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
      <IsoGrid width={W} height={H} spacing={34} opacity={0.13} />

      {/* Outer wireframe prism */}
      <g className="prism-outer" style={{ opacity: 0 }}>
        <IsoCube size={prismSize} cx={cx} cy={cy} accent="none" wireframe={true} />
      </g>

      {/* Dashed connector lines */}
      {innerBlocks.map((block, i) => (
        <DashedPath
          key={`line-${i}`}
          d={`M ${prismFrontX},${prismFrontY} L ${block.cx},${block.cy}`}
          animate
          dashLength={4}
          gapLength={4}
          color="var(--color-line)"
          strokeWidth={0.8}
          delay={0.4 + i * 0.08}
          duration={0.6}
        />
      ))}

      {/* Inner labeled blocks */}
      {innerBlocks.map((block, i) => (
        <g key={block.label} className="inner-block" style={{ opacity: 0 }}>
          <IsoCube
            size={block.size}
            cx={block.cx}
            cy={block.cy}
            accent={block.accent}
          />
          <g className="wh-label" style={{ opacity: 0 }}>
            <MonoLabel
              x={block.cx}
              y={block.cy - 10}
              text={block.label}
              align="center"
            />
          </g>
        </g>
      ))}

      {/* Header label */}
      <g className="wh-label" style={{ opacity: 0 }}>
        <MonoLabel
          x={cx}
          y={cy - 18}
          text="your data warehouse"
          number="03"
          align="center"
        />
      </g>
    </svg>
  );
}
