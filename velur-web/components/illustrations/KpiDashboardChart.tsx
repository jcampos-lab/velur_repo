"use client";

// KPI dashboard card — shown in Services hero right column
// Uses Tailwind semantic classes so dark mode is automatic

const KPIS = [
  {
    label: "12-Month LTV",
    value: "+23.4%",
    sub: "vs. basic RFM cohorts",
    spark: [42, 45, 44, 49, 53, 58, 62, 66],
  },
  {
    label: "Customer CAC",
    value: "−31.8%",
    sub: "Meta + Google blended",
    spark: [98, 95, 91, 87, 83, 78, 73, 68],
  },
  {
    label: "M3 Retention",
    value: "58%",
    sub: "+20pp cohort improvement",
    spark: [38, 42, 45, 48, 51, 54, 57, 58],
  },
  {
    label: "Revenue (30d)",
    value: "+41.2%",
    sub: "Shopify + subscriptions",
    spark: [55, 58, 60, 64, 70, 75, 81, 89],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 100;
  const H = 30;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`)
    .join(" L ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-7" aria-hidden>
      <path
        d={`M ${pts}`}
        fill="none"
        stroke="#FF5B1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function KpiDashboardChart() {
  return (
    <div
      className="border border-line bg-stone rounded-2xl overflow-hidden select-none"
      style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Revenue Intelligence
        </p>
        <span className="font-mono text-[9px] text-muted">Q2 2025 · Live</span>
      </div>

      {/* 2×2 KPI grid */}
      <div className="grid grid-cols-2 divide-x divide-y divide-line">
        {KPIS.map((kpi, i) => (
          <div
            key={i}
            className="p-4 md:p-5 flex flex-col gap-2"
            style={{ animation: `fadeSlideUp 0.35s ease ${0.3 + i * 0.08}s both` }}
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted leading-none">
              {kpi.label}
            </p>
            <p
              className="font-mono font-bold text-ink leading-none"
              style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}
            >
              {kpi.value}
            </p>
            <div className="flex-1 pt-1">
              <Sparkline data={kpi.spark} />
            </div>
            <p className="font-mono text-[8px] text-muted leading-tight">{kpi.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
