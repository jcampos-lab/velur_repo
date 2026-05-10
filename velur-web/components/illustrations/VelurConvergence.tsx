"use client";

import React, { useRef, useEffect, useState } from "react";
import VelurCube, { velurCubeCenter }  from "./primitives/VelurCube";
import DataCube,  { dataCubeAnchor  }  from "./primitives/DataCube";
import ConnectionLine, { LineState  }  from "./primitives/ConnectionLine";
import IsoGrid                          from "./primitives/IsoGrid";
import MonoLabel                        from "./primitives/MonoLabel";

interface VelurConvergenceProps {
  className?: string;
}

// Chapter 3: Velur arrives. The data is pulled together.
// Three source data cubes flow into the Velur protagonist below.
export default function VelurConvergence({ className }: VelurConvergenceProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const cubeRef  = useRef<SVGGElement>(null);
  const [lineState, setLineState] = useState<LineState>("static");

  const W = 800;
  const H = 560;

  // Source data cubes (top row)
  const srcSize = 60;
  const sources = [
    { cx: 180, cy: 70,  label: "shopify" },
    { cx: 400, cy: 38,  label: "klaviyo" },
    { cx: 618, cy: 70,  label: "meta"    },
  ];

  // Velur cube (lower center)
  const velurS  = 110;
  const velurCx = 400;
  const velurCy = 320;

  const velurAnchor = velurCubeCenter(velurS, velurCx, velurCy);

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    if (!svg || !cube) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const srcGroups = svg.querySelectorAll(".src-group");
      const left      = cube.querySelector(".velur-face-left");
      const right     = cube.querySelector(".velur-face-right");
      const top       = cube.querySelector(".velur-face-top");
      const label     = svg.querySelector(".conv-label");

      if (prefersReduced) {
        [...srcGroups, left, right, top, label].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        return;
      }

      gsap.set([...srcGroups, left, right, top, label], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 78%", once: true },
      });

      // 1. Source cubes appear
      tl.to([...srcGroups], { opacity: 1, duration: 0.4, stagger: 0.12, ease: "power2.out" })
        // 2. Velur assembles face-by-face
        .to(left,  { opacity: 1, duration: 0.22 }, "-=0.05")
        .to(right, { opacity: 1, duration: 0.22 }, "-=0.06")
        .to(top,   { opacity: 1, duration: 0.22 }, "-=0.06")
        // 3. Label
        .to(label, { opacity: 1, duration: 0.3  }, "-=0.1");
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

      {/* Connection lines — static by default, pulse on Velur hover */}
      {sources.map((src, i) => {
        const from = dataCubeAnchor(srcSize, src.cx, src.cy);
        return (
          <ConnectionLine
            key={i}
            from={from}
            to={velurAnchor}
            state={lineState}
            curveAmount={0.15}
          />
        );
      })}

      {/* Source data cubes */}
      {sources.map((src, i) => (
        <g key={src.label} className="src-group" style={{ opacity: 0 }}>
          <DataCube size={srcSize} cx={src.cx} cy={src.cy} />
          <MonoLabel x={src.cx} y={src.cy - 14} text={src.label} />
        </g>
      ))}

      {/* Velur cube — hover triggers line pulse */}
      <g
        onMouseEnter={() => setLineState("pulse")}
        onMouseLeave={() => setLineState("static")}
      >
        <VelurCube
          ref={cubeRef}
          size={velurS}
          cx={velurCx}
          cy={velurCy}
          breathe
          interactive
        />
      </g>

      {/* Label */}
      <g className="conv-label" style={{ opacity: 0 }}>
        <MonoLabel
          x={velurCx}
          y={velurCy + velurS * 2 + 26}
          text="your revenue signal"
          accentNumber="01"
        />
      </g>
    </svg>
  );
}
