"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const COHORTS = [
  { label: "Jan", values: [100, 68, 52, 41, 35, 31] as (number | null)[] },
  { label: "Feb", values: [100, 71, 55, 44, 37, 33] as (number | null)[] },
  { label: "Mar", values: [100, 74, 58, 47, 39, null] as (number | null)[] },
  { label: "Apr", values: [100, 76, 60, 49, null, null] as (number | null)[] },
  { label: "May", values: [100, 78, 63, null, null, null] as (number | null)[] },
  { label: "Jun", values: [100, 81, null, null, null, null] as (number | null)[] },
];

const PERIODS = ["M1", "M2", "M3", "M4", "M5", "M6"];

const CW = 68;
const CH = 44;
const CG = 5;
const LX = 44;
const TY = 30;

/* Klein Blue ramp: lightest tint at 30%, full Klein at 100%. */
function kleinAt(v: number): string {
  const t = v / 100;
  // Interpolate from #DDE4FB (light tint) at t=0.3 to #1831B0 at t=1
  // Lerp R/G/B between (221,228,251) and (24,49,176)
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  const r = lerp(221, 24);
  const g = lerp(228, 49);
  const b = lerp(251, 176);
  return `rgb(${r},${g},${b})`;
}

const VBW = LX + PERIODS.length * (CW + CG) - CG + 12;
const VBH = TY + COHORTS.length * (CH + CG) - CG + 20;

type Hover = {
  cohort: string;
  period: string;
  value: number;
  cx: number;          // viewBox x
  cy: number;          // viewBox y
} | null;

export default function CohortHeatmap() {
  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState<Hover>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none relative"
    >
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
            Cohort retention
          </p>
          <p className="font-sans text-[12.5px] text-ink/55 mt-0.5">
            Six monthly cohorts, six months of retention. Hover any cell.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="block w-6 h-3 rounded-sm" style={{ background: "#DDE4FB" }} />
            <span className="font-mono text-[9.5px] text-muted">30%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="block w-6 h-3 rounded-sm bg-amber" />
            <span className="font-mono text-[9.5px] text-muted">100%</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          viewBox={`0 0 ${VBW} ${VBH}`}
          className="w-full overflow-visible"
          role="img"
          aria-label="Cohort retention heatmap"
        >
          {PERIODS.map((p, j) => (
            <text
              key={p}
              x={LX + j * (CW + CG) + CW / 2}
              y={TY - 12}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}
            >
              {p}
            </text>
          ))}

          {COHORTS.map((cohort, i) => (
            <g key={cohort.label}>
              <text
                x={LX - 8}
                y={TY + i * (CH + CG) + CH / 2 + 3.5}
                textAnchor="end"
                fontSize="8.5"
                fontFamily="var(--font-jetbrains)"
                style={{ fill: "var(--color-muted)" }}
              >
                {cohort.label}
              </text>

              {cohort.values.map((val, j) => {
                const cx = LX + j * (CW + CG);
                const cy = TY + i * (CH + CG);
                const delay = prefersReduced ? 0 : 0.2 + (i * 6 + j) * 0.028;

                if (val === null) {
                  return (
                    <motion.rect
                      key={j}
                      x={cx}
                      y={cy}
                      width={CW}
                      height={CH}
                      rx={5}
                      initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
                      whileInView={{ opacity: 0.4, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
                      style={{ fill: "var(--color-line)" }}
                    />
                  );
                }

                const isHovered =
                  hover?.cohort === cohort.label && hover?.period === PERIODS[j];

                return (
                  <motion.g
                    key={j}
                    initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() =>
                      setHover({
                        cohort: cohort.label,
                        period: PERIODS[j],
                        value: val,
                        cx: cx + CW / 2,
                        cy: cy + CH / 2,
                      })
                    }
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={cx}
                      y={cy}
                      width={CW}
                      height={CH}
                      rx={5}
                      fill={kleinAt(val)}
                      style={{
                        filter: hover && !isHovered ? "saturate(0.45) opacity(0.55)" : undefined,
                        transition: "filter 200ms ease",
                      }}
                    />
                    {isHovered && (
                      <rect
                        x={cx - 1}
                        y={cy - 1}
                        width={CW + 2}
                        height={CH + 2}
                        rx={6}
                        fill="none"
                        stroke="var(--color-ink)"
                        strokeWidth="1.6"
                      />
                    )}
                    <text
                      x={cx + CW / 2}
                      y={cy + CH / 2 + 4}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="700"
                      fontFamily="var(--font-jetbrains)"
                      fill={val > 55 ? "#FFFFFF" : "#1E1B18"}
                      style={{ pointerEvents: "none" }}
                    >
                      {val}%
                    </text>
                  </motion.g>
                );
              })}
            </g>
          ))}
        </svg>

        {/* Floating tooltip card positioned over the hovered cell */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key={`${hover.cohort}-${hover.period}`}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none rounded-xl bg-ink text-paper shadow-2xl border border-line/20 px-3.5 py-3 min-w-[220px] z-10"
              style={{
                left: `calc(${(hover.cx / VBW) * 100}% - 110px)`,
                top:  `calc(${(hover.cy / VBH) * 100}% - 110px)`,
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-mono text-[10px] tracking-[0.16em] text-paper/55 uppercase">
                  {hover.cohort} cohort
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-amber uppercase">
                  {hover.period}
                </span>
              </div>
              <p className="font-sans font-bold text-paper text-[18px] leading-none mb-1 tabular-nums">
                {hover.value}% active
              </p>
              <p className="font-sans text-[12px] text-paper/70 leading-snug">
                That is the share of customers acquired that month who came back to buy{" "}
                {hover.period === "M1"
                  ? "the next month"
                  : `${hover.period.replace("M", "")} months later`}
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
