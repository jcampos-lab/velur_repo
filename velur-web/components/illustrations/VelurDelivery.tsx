"use client";

import React, { useRef, useEffect } from "react";
import VelurCube from "./primitives/VelurCube";
import IsoGrid   from "./primitives/IsoGrid";

interface VelurDeliveryProps {
  className?: string;
}

const R = Math.sqrt(3) / 2;

// Chapter 6: Velur outputs the decision.
// Velur cube on the left, output line travels rightward to the decisive label.
export default function VelurDelivery({ className }: VelurDeliveryProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const cubeRef  = useRef<SVGGElement>(null);
  const dotRef   = useRef<SVGCircleElement>(null);
  const lineRef  = useRef<SVGLineElement>(null);

  const W = 800;
  const H = 340;

  const velurS  = 90;
  const velurCx = 190;
  const velurCy = H / 2 - velurS - 10;

  // Output line: from right-face midpoint of Velur → right side
  const lineFromX = velurCx + velurS * R;
  const lineFromY = velurCy + velurS * 0.75;
  const lineToX   = W - 80;
  const lineToY   = lineFromY;

  useEffect(() => {
    const svg  = svgRef.current;
    const cube = cubeRef.current;
    const dot  = dotRef.current;
    const line = lineRef.current;
    if (!svg || !cube || !dot || !line) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const left  = cube.querySelector(".velur-face-left");
      const right = cube.querySelector(".velur-face-right");
      const top   = cube.querySelector(".velur-face-top");
      const label = svg.querySelector(".delivery-label");
      const tag   = svg.querySelector(".delivery-tag");

      if (prefersReduced) {
        [left, right, top, line, label, tag].forEach(
          el => el && ((el as SVGElement).style.opacity = "1")
        );
        dot.style.display = "none";
        return;
      }

      gsap.set([left, right, top, line, label, tag], { opacity: 0 });
      dot.style.display = "none";

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      // 1. Velur assembles
      tl.to(left,  { opacity: 1, duration: 0.22 })
        .to(right, { opacity: 1, duration: 0.22 }, "-=0.06")
        .to(top,   { opacity: 1, duration: 0.22 }, "-=0.06")
        // 2. Line draws from left to right
        .fromTo(line,
          { attr: { x2: lineFromX } },
          { attr: { x2: lineToX }, duration: 0.8, ease: "power2.inOut" },
          "-=0.05"
        )
        // 3. Label appears
        .to([label, tag], { opacity: 1, duration: 0.35, stagger: 0.1 }, "-=0.15")
        // 4. Pulse dot starts
        .call(() => {
          dot.style.display = "";
          const lineLen = lineToX - lineFromX;
          gsap.fromTo(dot,
            { attr: { cx: lineFromX } },
            {
              attr: { cx: lineToX },
              duration: 3.5,
              ease: "none",
              repeat: -1,
              onRepeat() {
                gsap.set(dot, { attr: { cx: lineFromX } });
              },
            }
          );
        });
    };

    run();
  }, [lineFromX, lineToX]);

  const labelCx = lineToX - 10;
  const labelCy = lineFromY;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      <IsoGrid width={W} height={H} spacing={96} opacity={0.16} />

      {/* Output line */}
      <line
        ref={lineRef}
        x1={lineFromX}
        y1={lineFromY}
        x2={lineFromX}
        y2={lineFromY}
        stroke="var(--color-amber)"
        strokeWidth={1.5}
        opacity={0}
      />

      {/* Pulsing dot along line */}
      <circle
        ref={dotRef}
        cx={lineFromX}
        cy={lineFromY}
        r={4}
        fill="var(--color-amber)"
        style={{ display: "none" }}
      />

      {/* Velur cube */}
      <VelurCube ref={cubeRef} size={velurS} cx={velurCx} cy={velurCy} breathe interactive={false} />

      {/* Output tag */}
      <g className="delivery-tag" style={{ opacity: 0 }}>
        <text
          x={(lineFromX + lineToX) / 2}
          y={lineFromY - 10}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fill: "var(--color-muted)",
            letterSpacing: "0.08em",
          }}
        >
          OUTPUT
        </text>
      </g>

      {/* Terminal label */}
      <g className="delivery-label" style={{ opacity: 0 }}>
        <text
          x={labelCx}
          y={labelCy - 22}
          textAnchor="end"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fill: "var(--color-ink)",
            letterSpacing: "0.01em",
          }}
        >
          the number that{" "}
          <tspan fill="var(--color-amber)" fontWeight={600}>
            decides
          </tspan>
        </text>
      </g>
    </svg>
  );
}
