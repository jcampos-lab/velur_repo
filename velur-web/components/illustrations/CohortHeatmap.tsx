"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

function amberAt(v: number): string {
  const t = v / 100;
  const g = Math.round(232 - 141 * t);
  const b = Math.round(220 - 194 * t);
  return `rgb(255,${g},${b})`;
}

const VBW = LX + PERIODS.length * (CW + CG) - CG + 12;
const VBH = TY + COHORTS.length * (CH + CG) - CG + 20;

type Hover = { cohort: string; period: string; value: number } | null;

export default function CohortHeatmap() {
  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState<Hover>(null);

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-stone rounded-2xl p-5 md:p-6 select-none"
    >
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
          Cohort retention. Hover any cell.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="block w-6 h-3 rounded-sm" style={{ background: "rgb(255,232,220)" }} />
            <span className="font-mono text-[9px] text-muted">30%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="block w-6 h-3 rounded-sm bg-amber" />
            <span className="font-mono text-[9px] text-muted">100%</span>
          </div>
        </div>
      </div>

      <div className="relative">
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
                      rx={4}
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
                      setHover({ cohort: cohort.label, period: PERIODS[j], value: val })
                    }
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={cx}
                      y={cy}
                      width={CW}
                      height={CH}
                      rx={4}
                      fill={amberAt(val)}
                      style={{
                        filter: hover && !isHovered ? "saturate(0.55) opacity(0.55)" : undefined,
                        transition: "filter 200ms ease",
                      }}
                    />
                    {isHovered && (
                      <rect
                        x={cx - 1}
                        y={cy - 1}
                        width={CW + 2}
                        height={CH + 2}
                        rx={5}
                        fill="none"
                        stroke="var(--color-ink)"
                        strokeWidth="1.4"
                      />
                    )}
                    <text
                      x={cx + CW / 2}
                      y={cy + CH / 2 + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="var(--font-jetbrains)"
                      fill={val > 55 ? "#FFFFFF" : "#1A1A1A"}
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

        {/* Hover detail panel */}
        <div className="mt-4 h-[44px] flex items-center">
          {hover ? (
            <motion.p
              key={`${hover.cohort}-${hover.period}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="font-sans text-[12px] tracking-wide text-ink"
            >
              <span className="text-ink/55">{hover.cohort} cohort, {hover.period}.</span>{" "}
              <span className="font-semibold">{hover.value}% still active.</span> That is the share of customers acquired that month who came back to buy {hover.period === "M1" ? "the next month" : `${hover.period.replace("M", "")} months later`}.
            </motion.p>
          ) : (
            <p className="font-sans text-[12px] tracking-wide text-ink/55">
              Hover a cell to see what it means in plain English.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
