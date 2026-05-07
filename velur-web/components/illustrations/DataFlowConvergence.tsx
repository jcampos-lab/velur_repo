"use client";

import React, { useRef, useEffect } from "react";
import IsoCube from "./primitives/IsoCube";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";
import DashedPath from "./primitives/DashedPath";

interface DataFlowConvergenceProps {
  className?: string;
}

// 3 source cubes (Shopify, Klaviyo, Meta) flow into 1 amber bottom cube
// Placed between hero and pain section on the homepage
export default function DataFlowConvergence({ className }: DataFlowConvergenceProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const W = 800;
  const H = 480;

  // Source cubes (top row)
  const srcSize = 52;
  const sources = [
    { cx: 180, cy: 80,  label: "shopify"  },
    { cx: 400, cy: 48,  label: "klaviyo"  },
    { cx: 618, cy: 80,  label: "meta"     },
  ];

  // Destination cube (bottom center)
  const dstSize = 76;
  const dstCx   = 400;
  const dstCy   = 290;

  // Path endpoints: from bottom-front of each source to top-back of dst
  const R = Math.sqrt(3) / 2;

  function frontOf(cx: number, cy: number, s: number): [number, number] {
    return [cx, cy + s];
  }
  function topOf(cx: number, cy: number): [number, number] {
    return [cx, cy];
  }

  const pathData = sources.map(src => {
    const [fx, fy] = frontOf(src.cx, src.cy, srcSize);
    const [tx, ty] = topOf(dstCx, dstCy);
    // Quadratic bezier with control point in the middle
    const mid = [(fx + tx) / 2, (fy + ty) / 2 + 40];
    return `M ${fx},${fy} Q ${mid[0]},${mid[1]} ${tx},${ty}`;
  });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const srcCubes = svg.querySelectorAll(".src-cube");
      const dstCube  = svg.querySelector(".dst-cube");
      const labels   = svg.querySelectorAll(".flow-label");

      if (prefersReduced) {
        [srcCubes, [dstCube], labels].forEach(list =>
          list && (list as NodeListOf<Element> | Element[]).forEach(el => el && ((el as SVGElement).style.opacity = "1"))
        );
        return;
      }

      gsap.set([...srcCubes, dstCube, ...labels], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      tl.to([...srcCubes], {
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        })
        .to(dstCube, { opacity: 1, duration: 0.6, ease: "back.out(1.2)" }, "-=0.1")
        .to([...labels], { opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.2");
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
      <IsoGrid width={W} height={H} spacing={32} opacity={0.15} />

      {/* Flow paths — drawn by DashedPath */}
      {pathData.map((d, i) => (
        <DashedPath
          key={i}
          d={d}
          animate
          dashLength={5}
          gapLength={4}
          color="var(--color-line)"
          strokeWidth={1.2}
          delay={i * 0.15}
          duration={0.9}
        />
      ))}

      {/* Source cubes */}
      {sources.map((src, i) => (
        <g key={src.label} className="src-cube" style={{ opacity: 0 }}>
          <IsoCube size={srcSize} cx={src.cx} cy={src.cy} accent="none" />
          <g className="flow-label" style={{ opacity: 0 }}>
            <MonoLabel
              x={src.cx}
              y={src.cy - 14}
              text={src.label}
              align="center"
            />
          </g>
        </g>
      ))}

      {/* Destination amber cube */}
      <g className="dst-cube" style={{ opacity: 0 }}>
        <IsoCube size={dstSize} cx={dstCx} cy={dstCy} accent="top" />
      </g>

      {/* Bottom label */}
      <g className="flow-label" style={{ opacity: 0 }}>
        <MonoLabel
          x={dstCx}
          y={dstCy + dstSize * 2 + 24}
          text="your revenue signal"
          number="01"
          align="center"
        />
      </g>
    </svg>
  );
}
