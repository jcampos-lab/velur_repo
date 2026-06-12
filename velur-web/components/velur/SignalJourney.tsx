"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

/**
 * Velur — SignalJourney
 * The "how it works" steps as a signal travelling through the system:
 * a curved line weaves across the full width, alternating up and down,
 * with a step station at each bend. As you scroll, the line draws
 * itself and a green signal pulse rides it from Connect to Decide.
 *
 * Desktop only (md+) — the parent should render a plain stacked list
 * below md. Reduced motion gets the fully drawn line, no pulse.
 */
export type JourneyStep = {
  title: string;
  body: string;
  icon?: ReactNode;
};

/* Fixed stage geometry. preserveAspectRatio="none" stretches x to the
   container while the y values stay honest against the fixed height. */
const W = 1200;
const H = 520;
const TOP_Y = 170;
const BOT_Y = 350;

function pointsFor(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    x: (W / n) * i + W / n / 2,
    y: i % 2 === 0 ? TOP_Y : BOT_Y,
  }));
}

/* Smooth S-curves between alternating stations. */
function pathFor(pts: { x: number; y: number }[]) {
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const mx = (prev.x + p.x) / 2;
      return `C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");
}

export function SignalJourney({ steps }: { steps: JourneyStep[] }) {
  const root = useRef<HTMLDivElement>(null);
  const pts = pointsFor(steps.length);
  const d = pathFor(pts);

  useGSAP(
    () => {
      const path = root.current?.querySelector<SVGPathElement>(".sj-path");
      if (!path) return;
      const len = path.getTotalLength();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Line draws itself across the section as you scroll. */
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          },
        );

        /* The signal pulse rides the same path on the same scrub. */
        gsap.to(".sj-pulse", {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });

        /* Stations pop, cards rise, staggered with the journey. */
        gsap.from(".sj-node", {
          scale: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(2)",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from(".sj-card", {
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });

        /* Idle glow on the stations once revealed. */
        gsap.to(".sj-node-halo", {
          scale: 1.8,
          opacity: 0,
          duration: 1.8,
          repeat: -1,
          stagger: 0.35,
          ease: "sine.out",
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative w-full" style={{ height: H }}>
      {/* Faint full track + drawn signal line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
        <path
          className="sj-path"
          d={d}
          fill="none"
          stroke="var(--color-signal-green)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Signal pulse that rides the line */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <circle className="sj-pulse" r="7" fill="var(--color-signal-green)">
          <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Stations + cards */}
      {steps.map((s, i) => {
        const p = pts[i];
        const onTop = i % 2 === 0;
        return (
          <div key={s.title}>
            {/* Station node, positioned in percentage space so it
                tracks the stretched path. */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(p.x / W) * 100}%`, top: p.y }}
            >
              <span aria-hidden className="sj-node-halo absolute inset-0 rounded-full bg-signal-green/30" />
              <span className="sj-node relative flex w-5 h-5 rounded-full bg-canvas border-2 border-signal-green items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
              </span>
            </div>

            {/* Step card — above the line for even stations, below
                for odd ones. */}
            <div
              className="sj-card absolute w-[19%] -translate-x-1/2"
              style={{
                left: `${(p.x / W) * 100}%`,
                ...(onTop ? { bottom: H - p.y + 26 } : { top: p.y + 26 }),
              }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                {s.icon && <span className="inline-flex text-signal-green">{s.icon}</span>}
                <span className="font-display text-[12px] uppercase tracking-[0.08em] text-slate">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display font-normal text-ink-strong text-[20px] leading-snug tracking-[-0.01em] mb-2">
                {s.title}
              </h3>
              <p className="font-sans text-[13.5px] text-ink/75 leading-[1.55]">{s.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
