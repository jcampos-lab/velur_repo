"use client";

// Cohort retention heatmap: rows = monthly cohorts, cols = months since acquisition
// All SVG colors use CSS custom properties so they adapt to dark mode automatically

const COHORTS = [
  { label: "Jan", values: [100, 68, 52, 41, 35, 31] as (number | null)[] },
  { label: "Feb", values: [100, 71, 55, 44, 37, 33] as (number | null)[] },
  { label: "Mar", values: [100, 74, 58, 47, 39, null] as (number | null)[] },
  { label: "Apr", values: [100, 76, 60, 49, null, null] as (number | null)[] },
  { label: "May", values: [100, 78, 63, null, null, null] as (number | null)[] },
  { label: "Jun", values: [100, 81, null, null, null, null] as (number | null)[] },
];

const PERIODS = ["M1", "M2", "M3", "M4", "M5", "M6"];

const CW = 68; // cell width
const CH = 44; // cell height
const CG = 5;  // gap
const LX = 44; // left margin for row labels
const TY = 30; // top margin for column labels

function amberAt(v: number): string {
  const t = v / 100;
  const g = Math.round(232 - 141 * t); // 232 → 91
  const b = Math.round(220 - 194 * t); // 220 → 26
  return `rgb(255,${g},${b})`;
}

const VBW = LX + PERIODS.length * (CW + CG) - CG + 12;
const VBH = TY + COHORTS.length * (CH + CG) - CG + 20;

export default function CohortHeatmap() {
  return (
    <div
      className="border border-line bg-stone rounded-2xl p-5 md:p-6 select-none"
      style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
    >
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Cohort Retention — 6-Month View
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

      <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full overflow-visible" aria-hidden>
        {/* Period column labels */}
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

        {/* Rows */}
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
              const delay = `${0.25 + (i * 6 + j) * 0.028}s`;

              if (val === null) {
                return (
                  <rect
                    key={j}
                    x={cx} y={cy} width={CW} height={CH} rx={4}
                    style={{
                      fill: "var(--color-line)",
                      opacity: 0.4,
                      animation: `fadeSlideUp 0.3s ease ${delay} both`,
                    }}
                  />
                );
              }

              // Amber cells: white text above 55%, ink-colored text below
              // The amber fill is always warm-toned, readable in both modes
              return (
                <g key={j} style={{ animation: `fadeSlideUp 0.3s ease ${delay} both` }}>
                  <rect x={cx} y={cy} width={CW} height={CH} rx={4} fill={amberAt(val)} />
                  <text
                    x={cx + CW / 2}
                    y={cy + CH / 2 + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="var(--font-jetbrains)"
                    fill={val > 55 ? "#FFFFFF" : "#1A1A1A"}
                  >
                    {val}%
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
