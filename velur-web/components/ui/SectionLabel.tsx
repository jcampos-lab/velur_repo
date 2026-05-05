"use client";

import { useEffect, useRef } from "react";

type SectionLabelProps = {
  left: string;
  right: string;
  className?: string;
  animate?: boolean;
};

export default function SectionLabel({
  left,
  right,
  className = "",
  animate = true,
}: SectionLabelProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const import_ = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const line = lineRef.current;
      const right = rightRef.current;
      if (!line || !right) return;

      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(right, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: line, start: "top 88%", once: true },
      });
      tl.to(line, { scaleX: 1, duration: 0.8, ease: "cubic-bezier(0.16, 1, 0.3, 1)" })
        .to(right, { opacity: 1, duration: 0.4 }, "-=0.2");
    };

    import_();
  }, [animate]);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted whitespace-nowrap">
        {left}
      </span>
      <span
        ref={lineRef}
        className="flex-1 h-px bg-line block"
        style={{ transformOrigin: "left" }}
      />
      <span
        ref={rightRef}
        className="font-mono text-xs uppercase tracking-widest text-muted whitespace-nowrap"
      >
        {right}
      </span>
    </div>
  );
}
