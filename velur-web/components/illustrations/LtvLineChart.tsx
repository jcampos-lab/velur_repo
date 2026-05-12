"use client";

// SVG viewBox: 0 0 500 260
// Chart area: x [48, 464], y [20, 220] → width 416, height 200
// X: 6 evenly-spaced points, step ≈ 83px
// Y: 0–25% LTV range, scale = 200/25 = 8px per %
// y = 220 − value × 8

const X = [48, 131, 214, 297, 380, 464] as const;

const rfmY    = [220, 199, 175, 151, 127, 106]; // 0, 2.6, 5.6, 8.6, 11.6, 14%
const cohortY = [220, 187, 147,  98,  61,  32]; // 0, 4.1, 9.1, 15.2, 19.9, 23.5%

function cubicPath(xs: readonly number[], ys: number[]) {
  const cp = (xs[1] - xs[0]) / 3;
  let d = `M ${xs[0]},${ys[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    d += ` C ${xs[i] + cp},${ys[i]} ${xs[i + 1] - cp},${ys[i + 1]} ${xs[i + 1]},${ys[i + 1]}`;
  }
  return d;
}

const rfmPath    = cubicPath(X, rfmY);
const cohortPath = cubicPath(X, cohortY);

const GRID_Y = [
  { y: 220 - 5  * 8, label: "5%"  },
  { y: 220 - 10 * 8, label: "10%" },
  { y: 220 - 15 * 8, label: "15%" },
  { y: 220 - 20 * 8, label: "20%" },
];

const X_LABELS = ["M1", "M3", "M5", "M7", "M9", "M12"];

export default function LtvLineChart() {
  return (
    <div
      className="border border-line bg-stone rounded-2xl p-5 md:p-6 select-none"
      style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          12-Month LTV Growth
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="block w-5 h-[2px] rounded-full bg-amber" />
            <span className="font-mono text-[9px] text-muted">Behavioral cohorts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="block w-5 h-px opacity-60"
              style={{ borderTop: "1px dashed var(--color-muted)", background: "none" }}
            />
            <span className="font-mono text-[9px] text-muted">Basic RFM</span>
          </div>
        </div>
      </div>

      {/* Chart SVG */}
      <svg viewBox="0 0 500 250" className="w-full overflow-visible" aria-hidden>

        {/* Horizontal grid lines */}
        {GRID_Y.map(({ y, label }) => (
          <g key={label}>
            <line x1={48} y1={y} x2={464} y2={y} strokeWidth="0.6"
              style={{ stroke: "var(--color-line)" }} />
            <text x={40} y={y + 3.5} textAnchor="end" fontSize="8.5"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}>
              {label}
            </text>
          </g>
        ))}

        {/* X axis baseline */}
        <line x1={48} y1={220} x2={464} y2={220} strokeWidth="0.6"
          style={{ stroke: "var(--color-line)" }} />

        {/* 0% label */}
        <text x={40} y={223.5} textAnchor="end" fontSize="8.5"
          fontFamily="var(--font-jetbrains)"
          style={{ fill: "var(--color-muted)" }}>
          0%
        </text>

        {/* X-axis labels */}
        {X_LABELS.map((label, i) => (
          <text key={label} x={X[i]} y={236} textAnchor="middle" fontSize="8.5"
            fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-muted)" }}>
            {label}
          </text>
        ))}

        {/* RFM dashed line — fades in */}
        <path
          d={rfmPath}
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          style={{
            stroke: "var(--color-muted)",
            animation: "fadeSlideUp 1s ease 0.6s both",
          }}
        />

        {/* Cohorts line — draws in */}
        <path
          d={cohortPath}
          fill="none"
          stroke="#FF5B1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 900,
            strokeDashoffset: 900,
            animation: "drawChartLine 1.6s cubic-bezier(0.16,1,0.3,1) 0.25s forwards",
          }}
        />

        {/* Cohorts endpoint dot */}
        <circle cx={464} cy={32} r="4" fill="#FF5B1A"
          style={{
            transformOrigin: "464px 32px",
            animation: "dotPop 0.4s cubic-bezier(0.16,1,0.3,1) 1.7s both",
          }}
        />

        {/* +23% label */}
        <text x={472} y={36} fontSize="10" fontWeight="700" fill="#FF5B1A"
          fontFamily="var(--font-jetbrains)"
          style={{ animation: "fadeSlideUp 0.4s ease 1.9s both" }}>
          +23%
        </text>

        {/* RFM endpoint dot — uses paper color so it's hollow in both modes */}
        <circle
          cx={464} cy={106} r="3.5"
          strokeWidth="1.5"
          style={{
            fill: "var(--color-stone)",
            stroke: "var(--color-muted)",
            transformOrigin: "464px 106px",
            animation: "dotPop 0.4s cubic-bezier(0.16,1,0.3,1) 1.5s both",
          }}
        />

        {/* Area fill under cohorts line */}
        <defs>
          <linearGradient id="cohortFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5B1A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF5B1A" stopOpacity="0" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect x={48} y={0} width={416} height={250} />
          </clipPath>
        </defs>
        <path
          d={`${cohortPath} L 464,220 L 48,220 Z`}
          fill="url(#cohortFill)"
          clipPath="url(#chartClip)"
          style={{ animation: "fadeSlideUp 0.8s ease 0.8s both" }}
        />

      </svg>
    </div>
  );
}
