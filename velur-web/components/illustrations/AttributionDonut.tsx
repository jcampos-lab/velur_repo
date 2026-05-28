"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type Slice = {
  key: string;
  label: string;
  share: number;        // 0–100
  color: string;
};

const SLICES: Slice[] = [
  { key: "tiktok",   label: "TikTok organic",  share: 28, color: "#1E1B18" },
  { key: "klaviyo",  label: "Klaviyo flows",   share: 22, color: "#1831B0" },
  { key: "meta",     label: "Meta paid",       share: 18, color: "#57627C" },
  { key: "google",   label: "Google PMax",     share: 14, color: "#B7B6B7" },
  { key: "shopify",  label: "Direct (Shopify)", share: 11, color: "#1F7A4D" },
  { key: "other",    label: "Other channels",  share:  7, color: "#6E6E6E" },
];

/* Geometry */
const SIZE = 240;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 110;
const R_INNER = 72;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(startAngle: number, endAngle: number, rOuter: number, rInner: number) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const o1 = polar(CX, CY, rOuter, startAngle);
  const o2 = polar(CX, CY, rOuter, endAngle);
  const i1 = polar(CX, CY, rInner, endAngle);
  const i2 = polar(CX, CY, rInner, startAngle);
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ");
}

export default function AttributionDonut() {
  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState<Slice | null>(null);

  const segments = useMemo(() => {
    const total = SLICES.reduce((s, x) => s + x.share, 0);
    let acc = 0;
    return SLICES.map(s => {
      const start = (acc / total) * 360;
      acc += s.share;
      const end = (acc / total) * 360;
      const isHover = hover?.key === s.key;
      // Expand slice on hover
      const rOuter = isHover ? R_OUTER + 6 : R_OUTER;
      return {
        ...s,
        path: arcPath(start, end, rOuter, R_INNER),
        midAngle: (start + end) / 2,
        rOuter,
      };
    });
  }, [hover]);

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none"
    >
      <div className="mb-4">
        <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
          Revenue attribution
        </p>
        <p className="font-sans text-[12.5px] text-ink/55 mt-0.5">
          Last 30 days. Hover a segment to inspect a channel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
        {/* Donut */}
        <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full overflow-visible" role="img">
            {segments.map((seg, i) => {
              const dim = hover && hover.key !== seg.key;
              return (
                <motion.path
                  key={seg.key}
                  d={seg.path}
                  fill={seg.color}
                  style={{
                    cursor: "pointer",
                    opacity: dim ? 0.35 : 1,
                    transition: "opacity 200ms ease, d 200ms ease",
                  }}
                  initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: dim ? 0.35 : 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReduced ? 0 : 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHover(seg)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </svg>

          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {hover ? (
                <motion.div
                  key={hover.key}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-center"
                >
                  <p className="font-sans font-bold text-ink text-[26px] leading-none tabular-nums">
                    {hover.share}%
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mt-1.5">
                    {hover.label}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-center"
                >
                  <p className="font-sans font-bold text-ink text-[26px] leading-none tabular-nums">
                    $186K
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mt-1.5">
                    last 30 days
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend / breakdown */}
        <div className="flex flex-col gap-2">
          {SLICES.map(s => {
            const isHover = hover?.key === s.key;
            const dim = hover && !isHover;
            return (
              <button
                key={s.key}
                type="button"
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                className="flex items-center gap-2.5 py-1 text-left transition-opacity"
                style={{ opacity: dim ? 0.45 : 1 }}
              >
                <span
                  className="block w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                <span className="font-sans text-[12.5px] text-ink/75 flex-1 truncate">
                  {s.label}
                </span>
                <span className="font-sans font-semibold text-ink text-[12.5px] tabular-nums">
                  {s.share}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
