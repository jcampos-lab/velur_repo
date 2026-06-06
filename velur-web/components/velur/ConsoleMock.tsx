import Image from "next/image";
import { MetricDelta } from "./MetricDelta";

/**
 * Velur — Revenue console mock.
 * The brand's signature product panel: near-black field, status chips,
 * account rows with status + delta. Used on home + product hero.
 *
 * Port of ui_kits/marketing/ConsoleMock.jsx.
 */
type Row = { name: string; status: "healthy" | "at-risk" | "pending"; delta: number; arr: string };

const rows: Row[] = [
  { name: "Northwind Trading", status: "at-risk", delta: -8.3, arr: "$420k" },
  { name: "Atlas Logistics",   status: "healthy", delta: 14.2, arr: "$1.1M" },
  { name: "Briar & Co.",       status: "healthy", delta: 6.7,  arr: "$280k" },
  { name: "Cedar Health",      status: "pending", delta: 0,    arr: "$540k" },
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
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.06em] text-on-dark-muted">
          Live
        </span>
        <span className="w-[7px] h-[7px] rounded-full bg-signal-green-300" />
      </div>

      {/* KPI row */}
      <div
        className="flex gap-2.5 py-4"
        style={{ borderBottom: "1px solid var(--border-dark)" }}
      >
        <div className="flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">ARR</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">$4.21M</div>
          <MetricDelta value={12.4} size="sm" />
        </div>
        <div className="flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">Net retention</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">112%</div>
          <MetricDelta value={3.2} size="sm" />
        </div>
        <div className={`flex-1 ${compact ? "hidden" : "block"}`}>
          <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-on-dark-muted">At risk</div>
          <div className="font-display text-[26px] tracking-[-0.02em] mt-1 text-white">3</div>
          <MetricDelta value={-1} suffix="" format={() => "1 new"} size="sm" />
        </div>
      </div>

      {/* Account rows */}
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
