"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

type Series = {
  key: string;
  label: string;
  color: string;
  /** LTV in dollars per acquired customer, indexed by month since acquisition. */
  values: number[];
};

const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];

const SERIES: Series[] = [
  {
    key: "behavioral",
    label: "Behavioral cohorts",
    color: "#1831B0",                                // Klein Blue, the hero series
    values: [42, 58, 71, 89, 104, 121, 135, 148, 160, 171, 180, 188],
  },
  {
    key: "rfm",
    label: "RFM segmentation",
    color: "#57627C",                                // Blue Slate
    values: [38, 48, 56, 62, 68, 73, 78, 82, 86, 90, 93, 96],
  },
  {
    key: "broadcast",
    label: "Broadcast (control)",
    color: "#B7B6B7",                                // Silver
    values: [35, 42, 47, 51, 55, 58, 61, 63, 65, 67, 68, 69],
  },
];

/* ─── Layout ───────────────────────────────────────────────────────────── */

const VBW = 720;
const VBH = 320;
const PAD = { top: 24, right: 56, bottom: 36, left: 48 };
const W = VBW - PAD.left - PAD.right;
const H = VBH - PAD.top - PAD.bottom;

const Y_MAX = 200;
const Y_TICKS = [0, 50, 100, 150, 200];

const xFor = (i: number) => PAD.left + (i / (MONTHS.length - 1)) * W;
const yFor = (v: number) => PAD.top + (1 - v / Y_MAX) * H;

function cubicPath(values: number[]): string {
  const pts = values.map((v, i) => [xFor(i), yFor(v)] as const);
  const cpStep = (pts[1][0] - pts[0][0]) / 3;
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    d += ` C ${x1 + cpStep},${y1} ${x2 - cpStep},${y2} ${x2},${y2}`;
  }
  return d;
}

/* ─── Component ────────────────────────────────────────────────────────── */

export default function LtvLineChart() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);

  const paths = useMemo(() => SERIES.map(s => ({ ...s, d: cubicPath(s.values) })), []);

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xInVb = ((e.clientX - rect.left) / rect.width) * VBW;
    if (xInVb < PAD.left || xInVb > PAD.left + W) {
      setHoverIdx(null);
      return;
    }
    const ratio = (xInVb - PAD.left) / W;
    const idx = Math.round(ratio * (MONTHS.length - 1));
    setHoverIdx(Math.max(0, Math.min(MONTHS.length - 1, idx)));
  }

  const crosshairX = hoverIdx != null ? xFor(hoverIdx) : null;

  const behavioral = SERIES[0].values;
  const rfm = SERIES[1].values;
  const liftPct = useMemo(() => {
    const lastB = behavioral[behavioral.length - 1];
    const lastR = rfm[rfm.length - 1];
    return Math.round(((lastB - lastR) / lastR) * 100);
  }, []);

  // Tooltip position in % of container (matches SVG viewBox %).
  const tooltipPct = hoverIdx != null ? (xFor(hoverIdx) / VBW) * 100 : null;

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
            12-month LTV by segmentation
          </p>
          <p className="font-sans text-[12.5px] text-ink/55 mt-0.5">
            Hover anywhere on the chart.
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Lift vs RFM at M12
          </span>
          <span className="font-sans font-bold text-amber text-[28px] leading-none tracking-tight tabular-nums">
            +{liftPct}%
          </span>
        </div>
      </div>

      {/* Series legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3">
        {SERIES.map(s => {
          const dim = hoveredSeries && hoveredSeries !== s.key;
          return (
            <button
              key={s.key}
              type="button"
              onMouseEnter={() => setHoveredSeries(s.key)}
              onMouseLeave={() => setHoveredSeries(null)}
              className="inline-flex items-center gap-2 group transition-opacity"
              style={{ opacity: dim ? 0.35 : 1 }}
            >
              <span
                className="block w-2.5 h-2.5 rounded-full"
                style={{ background: s.color }}
              />
              <span className="font-sans text-[12px] text-ink/70 group-hover:text-ink transition-colors">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chart wrapper for floating tooltip positioning */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VBW} ${VBH}`}
          className="w-full overflow-visible"
          onMouseMove={onMove}
          onMouseLeave={() => setHoverIdx(null)}
          style={{ cursor: hoverIdx != null ? "crosshair" : "default" }}
          role="img"
          aria-label="Interactive LTV line chart"
        >
          {/* Y gridlines + labels */}
          {Y_TICKS.map(v => (
            <g key={v}>
              <line
                x1={PAD.left}
                y1={yFor(v)}
                x2={PAD.left + W}
                y2={yFor(v)}
                strokeWidth="0.5"
                style={{ stroke: "var(--color-line)" }}
              />
              <text
                x={PAD.left - 8}
                y={yFor(v) + 3.5}
                textAnchor="end"
                fontSize="9"
                fontFamily="var(--font-jetbrains)"
                style={{ fill: "var(--color-muted)" }}
              >
                ${v}
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {MONTHS.map((m, i) => (
            <text
              key={m}
              x={xFor(i)}
              y={VBH - 12}
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}
            >
              {m}
            </text>
          ))}

          {/* Behavioral cohort gradient fill (the hero series) */}
          <defs>
            <linearGradient id="ltv-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1831B0" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1831B0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${paths[0].d} L ${xFor(MONTHS.length - 1)},${yFor(0)} L ${xFor(0)},${yFor(0)} Z`}
            fill="url(#ltv-area)"
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: hoveredSeries && hoveredSeries !== "behavioral" ? 0.2 : 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />

          {/* Series lines, animated draw-in */}
          {paths.map((p, i) => {
            const dim = hoveredSeries && hoveredSeries !== p.key;
            return (
              <motion.path
                key={p.key}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={p.key === "behavioral" ? 2.6 : 1.6}
                strokeDasharray={p.key === "rfm" ? "5 4" : p.key === "broadcast" ? "2 3" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={prefersReduced ? {} : { pathLength: 0 }}
                whileInView={{ pathLength: 1, opacity: dim ? 0.35 : 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  pathLength: { duration: 1.4, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25 },
                }}
              />
            );
          })}

          {/* Crosshair */}
          {crosshairX != null && (
            <line
              x1={crosshairX}
              y1={PAD.top}
              x2={crosshairX}
              y2={PAD.top + H}
              stroke="var(--color-ink)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.45"
            />
          )}

          {/* Crosshair dots, with pulsing ring on the hero series */}
          {hoverIdx != null &&
            SERIES.map(s => {
              const isHero = s.key === "behavioral";
              return (
                <g key={s.key}>
                  {isHero && (
                    <motion.circle
                      cx={xFor(hoverIdx)}
                      cy={yFor(s.values[hoverIdx])}
                      r="12"
                      fill={s.color}
                      fillOpacity="0.18"
                      animate={prefersReduced ? {} : { r: [10, 14, 10] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  <circle
                    cx={xFor(hoverIdx)}
                    cy={yFor(s.values[hoverIdx])}
                    r="4.5"
                    fill={s.color}
                    stroke="var(--color-paper)"
                    strokeWidth="2"
                  />
                </g>
              );
            })}

          {/* End-of-line labels */}
          {paths.map(p => {
            const last = p.values[p.values.length - 1];
            const x = xFor(MONTHS.length - 1) + 6;
            const y = yFor(last) + 3;
            return (
              <text
                key={p.key}
                x={x}
                y={y}
                fontSize="9.5"
                fontWeight="700"
                fontFamily="var(--font-jetbrains)"
                fill={p.color}
              >
                ${last}
              </text>
            );
          })}
        </svg>

        {/* Floating tooltip card */}
        <AnimatePresence>
          {hoverIdx != null && tooltipPct != null && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none top-2 z-10 rounded-xl bg-ink text-paper shadow-2xl border border-line/20 px-3.5 py-3 min-w-[180px]"
              style={{
                left:
                  tooltipPct > 65
                    ? `calc(${tooltipPct}% - 200px)`
                    : `calc(${tooltipPct}% + 16px)`,
              }}
            >
              <p className="font-mono text-[9.5px] tracking-[0.16em] text-paper/55 uppercase mb-1.5">
                Month
              </p>
              <p className="font-sans font-bold text-paper text-[15px] tracking-tight mb-2">
                {MONTHS[hoverIdx]} · acquired customers
              </p>
              <div className="flex flex-col gap-1.5">
                {SERIES.map(s => (
                  <div key={s.key} className="flex items-center gap-2.5">
                    <span
                      className="inline-block w-2 h-2 rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="font-sans text-[11.5px] text-paper/70 flex-1">
                      {s.label}
                    </span>
                    <span className="font-sans font-bold text-paper text-[12px] tabular-nums">
                      ${s.values[hoverIdx]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
