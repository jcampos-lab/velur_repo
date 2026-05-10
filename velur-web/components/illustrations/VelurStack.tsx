"use client";

import React, { useRef, useEffect, useState } from "react";
import VelurCube, { velurCubeCenter }  from "./primitives/VelurCube";
import DataCube,  { dataCubeAnchor  }  from "./primitives/DataCube";
import ConnectionLine, { LineState  }  from "./primitives/ConnectionLine";
import IsoGrid                          from "./primitives/IsoGrid";
import MonoLabel                        from "./primitives/MonoLabel";

interface VelurStackProps {
  className?: string;
}

// Chapter 5: Velur connects to the modern data stack.
// Pipeline layout — five tool cubes flow left-to-right into Velur.
export default function VelurStack({ className }: VelurStackProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const cubeRef = useRef<SVGGElement>(null);
  const [lineState, setLineState] = useState<LineState>("static");

  const W = 900;
  const H = 210;

  const toolS  = 40;
  const velurS = 82;

  // Align all cubes so their C vertex (front equator) sits at y=140
  const baseline = 140;
  const cy_tool  = baseline - toolS;   // 100
  const cy_velur = baseline - velurS;  // 58

  // Velur at the right end — the destination
  const velurCx     = 800;
  const velurAnchor = velurCubeCenter(velurS, velurCx, cy_velur);

  const TOOLS = [
    { label: "bigquery", cx: 70  },
    { label: "dbt",      cx: 205 },
    { label: "fivetran", cx: 340 },
    { label: "metabase", cx: 475 },
    { label: "looker",   cx: 610 },
  ];

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    if (!svg || !cube) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const left       = cube.querySelector(".velur-face-left");
      const right      = cube.querySelector(".velur-face-right");
      const top        = cube.querySelector(".velur-face-top");
      const toolGroups = svg.querySelectorAll(".tool-group");

      if (prefersReduced) {
        [left, right, top, ...toolGroups].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        return;
      }

      gsap.set([left, right, top, ...toolGroups], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 78%", once: true },
      });

      tl.to([...toolGroups], {
          opacity: 1, duration: 0.3,
          stagger: { each: 0.1, from: "start" },
          ease: "power2.out",
        })
        .to(left,  { opacity: 1, duration: 0.22 }, "-=0.05")
        .to(right, { opacity: 1, duration: 0.22 }, "-=0.06")
        .to(top,   { opacity: 1, duration: 0.22 }, "-=0.06");
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

      {/* Connection lines from each tool to Velur */}
      {TOOLS.map((tool, i) => {
        const from = dataCubeAnchor(toolS, tool.cx, cy_tool);
        return (
          <ConnectionLine
            key={i}
            from={from}
            to={velurAnchor}
            state={lineState}
            curveAmount={0.06}
            dotDelay={i * 0.35}
          />
        );
      })}

      {/* Tool data cubes */}
      {TOOLS.map(tool => (
        <g key={tool.label} className="tool-group" style={{ opacity: 0 }}>
          <DataCube size={toolS} cx={tool.cx} cy={cy_tool} />
          <MonoLabel x={tool.cx} y={cy_tool - 16} text={tool.label} />
        </g>
      ))}

      {/* Velur cube — hover activates line pulse */}
      <g
        onMouseEnter={() => setLineState("pulse")}
        onMouseLeave={() => setLineState("static")}
      >
        <VelurCube
          ref={cubeRef}
          size={velurS}
          cx={velurCx}
          cy={cy_velur}
          breathe
          interactive
        />
      </g>
    </svg>
  );
}
