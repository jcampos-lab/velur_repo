"use client";

import React, { useRef, useEffect, useId } from "react";
import VelurCube, { velurCubeCenter } from "./primitives/VelurCube";

interface PlatformMapProps {
  className?: string;
}

// ── Bezier helper ────────────────────────────────────────────────────

function bezierAt(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

// ── Large isometric grid with radial vignette ────────────────────────

function BigGrid({ width, height }: { width: number; height: number }) {
  const rawId = useId();
  const uid   = rawId.replace(/:/g, "");
  const spacing = 116;
  const half    = spacing / 2;
  const h       = half / Math.sqrt(3);
  const patH    = h * 2;
  const bleed   = 900;

  return (
    <g aria-hidden>
      <defs>
        <pattern
          id={`bgp-${uid}`}
          x="0" y="0"
          width={spacing} height={patH}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0}    y1={0}    x2={half}    y2={h}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={half} y1={h}    x2={spacing} y2={0}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={0}    y1={patH} x2={half}    y2={h}    stroke="var(--color-ink)" strokeWidth={0.7} />
          <line x1={half} y1={h}    x2={spacing} y2={patH} stroke="var(--color-ink)" strokeWidth={0.7} />
        </pattern>
        {/* Radial mask: full opacity center → transparent edges */}
        <radialGradient id={`vigm-${uid}`} cx="50%" cy="50%" r="52%" fx="50%" fy="50%">
          <stop offset="20%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`vigmask-${uid}`}>
          <rect
            x={-bleed} y={-bleed}
            width={width + bleed * 2} height={height + bleed * 2}
            fill={`url(#vigm-${uid})`}
          />
        </mask>
      </defs>
      <rect
        x={-bleed} y={-bleed}
        width={width + bleed * 2} height={height + bleed * 2}
        fill={`url(#bgp-${uid})`}
        opacity={0.22}
        mask={`url(#vigmask-${uid})`}
      />
    </g>
  );
}

// ── Brand icon tile ──────────────────────────────────────────────────

function BrandTile({
  x, y, label, logoSrc,
}: {
  x: number; y: number; label: string; logoSrc: string;
}) {
  const S = 54;
  return (
    <g>
      {/* Tile shadow / depth */}
      <rect
        x={x - S / 2 + 2} y={y - S / 2 + 3}
        width={S} height={S} rx={12}
        fill="var(--color-ink)"
        opacity={0.06}
      />
      {/* Tile face */}
      <rect
        x={x - S / 2} y={y - S / 2}
        width={S} height={S} rx={12}
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeOpacity={0.14}
        strokeWidth={1.2}
      />
      {/* Brand logo */}
      <image
        href={logoSrc}
        x={x - S / 2 + 8}
        y={y - S / 2 + 8}
        width={S - 16}
        height={S - 16}
        preserveAspectRatio="xMidYMid meet"
      />
      {/* Label */}
      <text
        x={x}
        y={y + S / 2 + 15}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fill: "var(--color-muted)",
          letterSpacing: "0.09em",
        }}
      >
        {label.toLowerCase()}
      </text>
    </g>
  );
}

// ── Animated amber connection line ───────────────────────────────────

function AnimLine({
  from,
  to,
  delay = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
}) {
  const dotRef = useRef<SVGCircleElement>(null);

  const dx   = to.x - from.x;
  const dy   = to.y - from.y;
  const ctrl = {
    x: from.x + dx * 0.55 + dy * 0.07,
    y: from.y + dy * 0.45 - Math.abs(dx) * 0.07,
  };

  const d = `M ${from.x},${from.y} Q ${ctrl.x},${ctrl.y} ${to.x},${to.y}`;

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { dot.style.opacity = "0"; return; }

    dot.style.opacity = "1";
    const pos0 = bezierAt(0, from, ctrl, to);
    dot.setAttribute("cx", String(pos0.x));
    dot.setAttribute("cy", String(pos0.y));

    const run = async () => {
      const { gsap } = await import("gsap");
      const obj = { t: 0 };
      gsap.to(obj, {
        t: 1,
        duration: 2.6,
        ease: "none",
        delay,
        repeat: -1,
        repeatDelay: 0.9,
        onUpdate() {
          const pos = bezierAt(obj.t, from, ctrl, to);
          dot.setAttribute("cx", String(pos.x));
          dot.setAttribute("cy", String(pos.y));
        },
        onRepeat() { obj.t = 0; },
      });
    };
    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth={1.5}
        strokeDasharray="none"
        opacity={0.5}
      />
      <circle ref={dotRef} r={3.5} fill="var(--color-amber)" style={{ opacity: 0 }} />
    </g>
  );
}

// ── Output line (right side) ─────────────────────────────────────────

function OutputLine({ from, toX }: { from: { x: number; y: number }; toX: number }) {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { dot.style.opacity = "0"; return; }
    dot.style.opacity = "1";

    const run = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        dot,
        { attr: { cx: from.x } },
        {
          attr: { cx: toX },
          duration: 2.2,
          ease: "none",
          repeat: -1,
          repeatDelay: 0.5,
        }
      );
    };
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g>
      <line
        x1={from.x} y1={from.y}
        x2={toX}    y2={from.y}
        stroke="var(--color-amber)"
        strokeWidth={1.5}
        opacity={0.6}
      />
      <circle
        ref={dotRef}
        cx={from.x} cy={from.y}
        r={3.5}
        fill="var(--color-amber)"
        style={{ opacity: 0 }}
      />
    </g>
  );
}

// ── Brand data ───────────────────────────────────────────────────────

const BRANDS = [
  { id: "shopify",  label: "Shopify",  logo: "/brands/shopify.svg",  x: 138, y: 108 },
  { id: "klaviyo",  label: "Klaviyo",  logo: "/brands/klaviyo.svg",  x:  88, y: 240 },
  { id: "meta",     label: "Meta",     logo: "/brands/meta.svg",     x: 150, y: 372 },
  { id: "tiktok",   label: "TikTok",   logo: "/brands/tiktok.svg",   x: 284, y:  65 },
  { id: "google",   label: "Google",   logo: "/brands/google.svg",   x: 296, y: 398 },
  { id: "recharge", label: "Recharge", logo: "/brands/recharge.svg", x: 440, y: 175 },
  { id: "stripe",   label: "Stripe",   logo: "/brands/stripe.svg",   x: 448, y: 338 },
];

// ── Canvas constants ─────────────────────────────────────────────────

const W        = 1100;
const H        = 480;
const R_iso    = Math.sqrt(3) / 2;
const VELUR_CX = 700;
const VELUR_CY = 118;
const VELUR_S  = 112;

// velurCubeCenter returns the C vertex = { x: cx, y: cy + size }
// which is the front-bottom apex of the top face — good line target.

// ── Main component ───────────────────────────────────────────────────

export default function PlatformMap({ className }: PlatformMapProps) {
  const cubeRef    = useRef<SVGGElement>(null);
  const velurAnchor = velurCubeCenter(VELUR_S, VELUR_CX, VELUR_CY);

  // Right-face midpoint — good for the output line origin
  const outputFrom = {
    x: VELUR_CX + VELUR_S * R_iso,
    y: VELUR_CY + VELUR_S * 1.5,
  };

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const left  = cube.querySelector(".velur-face-left");
      const right = cube.querySelector(".velur-face-right");
      const top   = cube.querySelector(".velur-face-top");
      if (!left || !right || !top) return;

      gsap.set([left, right, top], { opacity: 0 });

      gsap.timeline({ scrollTrigger: { trigger: cube, start: "top 82%", once: true } })
        .to(left,  { opacity: 1, duration: 0.26 })
        .to(right, { opacity: 1, duration: 0.26 }, "-=0.1")
        .to(top,   { opacity: 1, duration: 0.26 }, "-=0.1");
    };
    run();
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      {/* Layer 0: grid */}
      <BigGrid width={W} height={H} />

      {/* Layer 1: connection lines (behind tiles) */}
      {BRANDS.map((b, i) => (
        <AnimLine
          key={b.id}
          from={{ x: b.x, y: b.y }}
          to={velurAnchor}
          delay={i * 0.38}
        />
      ))}

      {/* Layer 2: brand icon tiles */}
      {BRANDS.map(b => (
        <BrandTile key={b.id} x={b.x} y={b.y} label={b.label} logoSrc={b.logo} />
      ))}

      {/* Layer 3: Velur cube (protagonist) */}
      <VelurCube
        ref={cubeRef}
        size={VELUR_S}
        cx={VELUR_CX}
        cy={VELUR_CY}
        breathe
        interactive
      />

      {/* Output line to the right */}
      <OutputLine from={outputFrom} toX={W - 48} />

      {/* Output label */}
      <text
        x={W - 44}
        y={outputFrom.y - 12}
        textAnchor="end"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fill: "var(--color-ink)",
          letterSpacing: "0.07em",
        }}
      >
        the number
      </text>
      <text
        x={W - 44}
        y={outputFrom.y + 4}
        textAnchor="end"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fill: "var(--color-amber)",
          fontWeight: 600,
          letterSpacing: "0.07em",
        }}
      >
        that decides
      </text>

      {/* Velur identity label */}
      <text
        x={VELUR_CX}
        y={VELUR_CY + VELUR_S * 2 + 24}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          fill: "var(--color-muted)",
          letterSpacing: "0.12em",
        }}
      >
        VELUR · REVENUE INTELLIGENCE
      </text>
    </svg>
  );
}
