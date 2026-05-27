"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import NumberTicker from "@/components/motion/NumberTicker";

type Metric = {
  key: string;
  label: string;
  format: "currency" | "percent" | "ratio";
  series: number[];
};

function gen(seed: number, len: number, base: number, vol: number, trend: number): number[] {
  let s = seed;
  const out: number[] = [];
  for (let i = 0; i < len; i++) {
    s = (s * 9301 + 49297) % 233280;
    const noise = (s / 233280 - 0.5) * vol;
    out.push(Math.max(0, base + i * trend + noise));
  }
  return out;
}

const DAYS = 28;
const METRICS: Metric[] = [
  { key: "revenue", label: "Net revenue",         format: "currency", series: gen(11, DAYS, 18000, 4800, 240) },
  { key: "roas",    label: "Blended ROAS",        format: "ratio",    series: gen(31, DAYS, 2.6,   0.45, 0.012) },
  { key: "margin",  label: "Contribution margin", format: "percent",  series: gen(47, DAYS, 38,    4.5,  0.08)  },
];

const W = 320;
const H = 70;
const PADX = 6;

function formatValue(v: number, m: Metric): string {
  if (m.format === "currency") return `$${Math.round(v).toLocaleString()}`;
  if (m.format === "percent")  return `${v.toFixed(1)}%`;
  return `${v.toFixed(2)}×`;
}

function deltaPct(series: number[]): number {
  const first = series[0];
  const last  = series[series.length - 1];
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

function Sparkline({
  series,
  hoverIdx,
  setHoverIdx,
  color,
  id,
}: {
  series: number[];
  hoverIdx: number | null;
  setHoverIdx: (i: number | null) => void;
  color: string;
  id: string;
}) {
  const prefersReduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  const { d, areaD, points } = useMemo(() => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;
    const pts = series.map((v, i) => {
      const x = PADX + (i / (series.length - 1)) * (W - PADX * 2);
      const y = 8 + (1 - (v - min) / range) * (H - 16);
      return [x, y] as const;
    });
    let path = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[i + 1];
      const cp = (x2 - x1) / 2;
      path += ` C ${x1 + cp},${y1} ${x2 - cp},${y2} ${x2},${y2}`;
    }
    const area = `${path} L ${pts[pts.length - 1][0]},${H} L ${pts[0][0]},${H} Z`;
    return { d: path, areaD: area, points: pts };
  }, [series]);

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const xInVb = ((e.clientX - rect.left) / rect.width) * W;
    const ratio = (xInVb - PADX) / (W - PADX * 2);
    const idx = Math.round(ratio * (series.length - 1));
    setHoverIdx(Math.max(0, Math.min(series.length - 1, idx)));
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full block"
      onMouseMove={onMove}
      onMouseLeave={() => setHoverIdx(null)}
      style={{ cursor: "crosshair" }}
      role="img"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={areaD}
        fill={`url(#${id}-fill)`}
        initial={prefersReduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReduced ? {} : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {hoverIdx != null && (
        <>
          <line
            x1={points[hoverIdx][0]}
            y1={4}
            x2={points[hoverIdx][0]}
            y2={H - 4}
            stroke="var(--color-ink)"
            strokeWidth="0.7"
            strokeDasharray="2 2"
            opacity="0.4"
          />
          <circle
            cx={points[hoverIdx][0]}
            cy={points[hoverIdx][1]}
            r="4"
            fill={color}
            stroke="var(--color-paper)"
            strokeWidth="1.6"
          />
        </>
      )}
    </svg>
  );
}

function KpiCard({
  metric,
  color,
  hoverIdx,
  setHoverIdx,
  index,
}: {
  metric: Metric;
  color: string;
  hoverIdx: number | null;
  setHoverIdx: (i: number | null) => void;
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  const series = metric.series;
  const last = series[series.length - 1];
  const shown = hoverIdx != null ? series[hoverIdx] : last;
  const delta = deltaPct(series);
  const positive = delta >= 0;

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: prefersReduced ? 0 : 0.1 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-paper border border-line rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-1.5">
            {metric.label}
          </p>
          <p className="font-sans font-bold text-ink text-[22px] tracking-tight leading-none">
            {hoverIdx != null ? (
              formatValue(shown, metric)
            ) : metric.format === "currency" ? (
              <NumberTicker value={Math.round(last)} prefix="$" duration={1.4} delay={0.3} />
            ) : metric.format === "percent" ? (
              <NumberTicker value={Number(last.toFixed(1))} suffix="%" decimals={1} duration={1.4} delay={0.3} />
            ) : (
              <NumberTicker value={Number(last.toFixed(2))} suffix="×" decimals={2} duration={1.4} delay={0.3} />
            )}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
            positive ? "bg-amber/10 text-amber" : "bg-muted/10 text-muted"
          }`}
        >
          {positive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
        </span>
      </div>

      <Sparkline
        series={series}
        hoverIdx={hoverIdx}
        setHoverIdx={setHoverIdx}
        color={color}
        id={metric.key}
      />

      <div className="flex items-center justify-between font-mono text-[9.5px] tracking-wide text-muted">
        <span>Day 1</span>
        <span className="text-ink/70">{hoverIdx != null ? `Day ${hoverIdx + 1}` : "Today"}</span>
        <span>Day {DAYS}</span>
      </div>
    </motion.div>
  );
}

export default function KpiDashboardChart() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div className="bg-stone border border-line rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
            Live brief preview
          </p>
          <p className="font-sans text-[12.5px] text-ink/55">
            Last 28 days. Hover to scrub the date.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-positive/10 text-positive font-mono text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-positive pulse-dot" /> live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <KpiCard metric={METRICS[0]} color="#DD6E42" hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} index={0} />
        <KpiCard metric={METRICS[1]} color="#1A1A1A" hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} index={1} />
        <KpiCard metric={METRICS[2]} color="#1F7A4D" hoverIdx={hoverIdx} setHoverIdx={setHoverIdx} index={2} />
      </div>
    </div>
  );
}
