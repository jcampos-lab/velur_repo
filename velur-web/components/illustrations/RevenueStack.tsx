"use client";

import React, { useRef, useEffect } from "react";
import IsoCube from "./primitives/IsoCube";
import IsoGrid from "./primitives/IsoGrid";
import MonoLabel from "./primitives/MonoLabel";

interface RevenueStackProps {
  className?: string;
}

const R = Math.sqrt(3) / 2;

// 3-tier layered platform with a floating client amber cube on top
// Used in Services hero area
export default function RevenueStack({ className }: RevenueStackProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = 600;
  const H = 500;
  const cx = W / 2;

  // Three platform tiers — each wider than the one above
  const tiers = [
    { size: 56,  cy: 290, label: "dashboard" },
    { size: 80,  cy: 250, label: "data model" },
    { size: 110, cy: 200, label: "warehouse"  },
  ];

  // Floating client cube above tier 1
  const clientSize = 34;
  const clientCy   = 248;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tierEls  = svg.querySelectorAll(".tier-cube");
      const clientEl = svg.querySelector(".client-cube");
      const labelEls = svg.querySelectorAll(".stack-label");

      if (prefersReduced) {
        [...tierEls, clientEl, ...labelEls].forEach(el => el && ((el as SVGElement).style.opacity = "1"));
        return;
      }

      gsap.set([...tierEls, clientEl, ...labelEls], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
      });

      // Tiers rise from bottom to top
      tl.to([...tierEls].reverse(), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        })
        .to(clientEl, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.5)",
          }, "-=0.1")
        .to([...labelEls], { opacity: 1, duration: 0.3, stagger: 0.06 }, "-=0.15");

      // Continuous float on client cube
      if (clientEl) {
        gsap.to(clientEl, {
          y: -6,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
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
      <IsoGrid width={W} height={H} spacing={30} opacity={0.14} />

      {/* Platform tiers — largest first (drawn bottom of stack) */}
      {[...tiers].reverse().map((tier, i) => (
        <g key={tier.label} className="tier-cube" style={{ opacity: 0 }}>
          <IsoCube size={tier.size} cx={cx} cy={tier.cy} accent="none" />
          <g className="stack-label" style={{ opacity: 0 }}>
            <MonoLabel
              x={cx - tier.size * R - 8}
              y={tier.cy + tier.size * 1.0}
              text={tier.label}
              align="right"
            />
          </g>
        </g>
      ))}

      {/* Floating client cube */}
      <g className="client-cube" style={{ opacity: 0 }}>
        <IsoCube size={clientSize} cx={cx} cy={clientCy} accent="top" />
        <MonoLabel
          x={cx + clientSize * R + 8}
          y={clientCy + clientSize * 1.0}
          text="you own it"
          align="left"
        />
      </g>
    </svg>
  );
}
