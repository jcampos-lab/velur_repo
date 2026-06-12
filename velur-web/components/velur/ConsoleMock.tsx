import Image from "next/image";
import { MetricDelta } from "./MetricDelta";

/**
 * Velur — Revenue console mock.
 * The brand's signature product panel: near-black field, status chips,
 * account rows with status + delta. Used on home + product hero.
 *
 * DTC e-commerce framing: net revenue / blended ROAS / churn signals
 * with brand-style account rows, instead of B2B SaaS ARR / NRR.
 */
type Row = { name: string; status: "healthy" | "at-risk" | "pending"; delta: number; arr: string };

const rows: Row[] = [
  { name: "Lune Studio",    status: "healthy", delta: 14.2, arr: "$38,200" },
  { name: "Marble & Co.",   status: "at-risk", delta: -8.3, arr: "$22,100" },
  { name: "Drift Apparel",  status: "healthy", delta: 6.7,  arr: "$19,600" },
  { name: "Cedar Ritual",   status: "pending", delta: 0,    arr: "$15,800" },
];

const dotColor: Record<Row["status"], string> = {
  healthy: "bg-success",
  "at-risk": "bg-warning",
  pending: "bg-action-blue",
};

export function ConsoleMock({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="bg-velur-ink rounded-[22px] p-5 border border-ink-700 text-on-dark font-sans"
      style={{ boxShadow: "var(--elevation-media)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 pb-4"
        style={{ borderBottom: "1px solid var(--border-dark)" }}
      >
        <Image
          src="/logos/velur-mark-white.png"
          alt=""
          width={18}
          height={18}
          className="opacity-95"
        />
        <span className="text-sm text-white">Revenue console</span>
        <span className="ml-auto font-display text-[11px] uppercase tracking-[0.06em] text-on-dark-muted">
          Live
        </span>
        <span className="w-[7px] h-[7px] rounded-full bg-signal-green-300" />
      </div>

      {/* KPI row — DTC: net revenue / blended ROAS / churn signals */}
      <div
        className="flex gap-2.5 py-4"
        style={{ borderBottom: "1px solid var(--border-dark)" }}
      >
        <div className="flex-1">
          <div className="font-display text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">Net Revenue</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">$128,400</div>
          <MetricDelta value={12.4} suffix="% vs last week" size="sm" />
        </div>
        <div className="flex-1">
          <div className="font-display text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">Blended ROAS</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">3.14×</div>
          <MetricDelta value={0.4} suffix=" vs last week" size="sm" />
        </div>
        <div className={`flex-1 ${compact ? "hidden" : "block"}`}>
          <div className="font-display text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">Churned customers</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">14</div>
          <MetricDelta value={3} suffix="" format={() => "3 new at-risk"} size="sm" />
        </div>
      </div>

      {/* Account rows — DTC brand-style names */}
      <div className="pt-2.5">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-3 py-[11px]"
            style={{ borderBottom: "1px solid var(--border-dark)" }}
          >
            <span className={`w-[7px] h-[7px] rounded-full flex-none ${dotColor[r.status]}`} />
            <span className="text-sm text-white flex-1">{r.name}</span>
            <span className="font-mono text-[12px] text-on-dark-muted">{r.arr}</span>
            <span className="w-16 text-right">
              <MetricDelta value={r.delta} size="sm" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
