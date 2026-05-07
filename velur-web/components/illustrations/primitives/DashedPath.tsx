"use client";

import React, { useRef, useEffect } from "react";

interface DashedPathProps {
  d: string;
  animate?: boolean;
  dashLength?: number;
  gapLength?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
}

// Animated dashed path — draws itself on scroll via stroke-dashoffset
// Wraps a raw <path> and optionally animates it via GSAP
export default function DashedPath({
  d,
  animate = true,
  dashLength = 6,
  gapLength = 4,
  color = "var(--color-line)",
  strokeWidth = 1,
  duration = 1.2,
  delay = 0,
}: DashedPathProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!animate || !pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(path, { strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path,
          start: "top 85%",
          once: true,
        },
      });
    };

    run();
  }, [animate, duration, delay]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={`${dashLength} ${gapLength}`}
    />
  );
}
