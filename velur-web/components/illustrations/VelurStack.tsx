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
// Five tool cubes arc above the Velur protagonist, lines flow down.
export default function VelurStack({ className }: VelurStackProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const cubeRef = useRef<SVGGElement>(null);
  const [lineState, setLineState] = useState<LineState>("static");

  const W = 700;
  const H = 560;
  const cx = W / 2;

  // Velur cube (lower center)
  const velurS  = 95;
  const velurCx = cx;
  const velurCy = 340;
  const velurAnchor = velurCubeCenter(velurS, velurCx, velurCy);

  // Five tool cubes in an arc above
  const toolS   = 44;
  const arcR    = 190;
  const arcCy   = velurCy + velurS * 0.5; // arc center (near Velur's mid-height)

  const TOOLS = [
    { label: "bigquery",  angle: -108 },
    { label: "dbt",       angle:  -54 },
    { label: "fivetran",  angle:    0 - 90 }, // top
    { label: "metabase",  angle:   54 - 90 },
    { label: "looker",    angle:  108 - 90 },
  ].map(t => {
    const rad = (t.angle * Math.PI) / 180;
    return {
      label: t.label,
      cx:    cx  + arcR * Math.cos(rad),
      cy:    arcCy + arcR * Math.sin(rad) * 0.52, // flatten for iso feel
    };
  });

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    if (!svg || !cube) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const header    = svg.querySelector(".stack-header");
      const left      = cube.querySelector(".velur-face-left");
      const right     = cube.querySelector(".velur-face-right");
      const top       = cube.querySelector(".velur-face-top");
      const toolGroups = svg.querySelectorAll(".tool-group");

      if (prefersReduced) {
        [header, left, right, top, ...toolGroups].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        return;
      }

      gsap.set([header, left, right, top, ...toolGroups], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 78%", once: true },
      });

      tl.to(header, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(left,   { opacity: 1, duration: 0.22 }, "-=0.05")
        .to(right,  { opacity: 1, duration: 0.22 }, "-=0.06")
        .to(top,    { opacity: 1, duration: 0.22 }, "-=0.06")
        .to([...toolGroups], {
            opacity: 1, duration: 0.3,
            stagger: { each: 0.1, from: "center" },
            ease: "power2.out",
          }, "-=0.1");
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
      <IsoGrid width={W} height={H} spacing={32} opacity={0.1} />

      {/* Section header */}
      <g className="stack-header" style={{ opacity: 0 }}>
        <MonoLabel
          x={cx}
          y={20}
          text="your data stack"
          accentNumber="02"
        />
      </g>

      {/* Connection lines */}
      {TOOLS.map((tool, i) => {
        const from = dataCubeAnchor(toolS, tool.cx, tool.cy);
        return (
          <ConnectionLine
            key={i}
            from={from}
            to={velurAnchor}
            state={lineState}
            curveAmount={0.1}
          />
        );
      })}

      {/* Tool data cubes */}
      {TOOLS.map(tool => (
        <g key={tool.label} className="tool-group" style={{ opacity: 0 }}>
          <DataCube size={toolS} cx={tool.cx} cy={tool.cy} />
          <MonoLabel x={tool.cx} y={tool.cy - 12} text={tool.label} />
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
          cy={velurCy}
          breathe
          interactive
        />
      </g>
    </svg>
  );
}
