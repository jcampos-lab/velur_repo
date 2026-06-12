"use client";

import { curveMonotoneX } from "@visx/curve";
import {
  AreaChart,
  Area,
  Grid,
  XAxis,
  ChartTooltip,
} from "@/components/ui/area-chart";

/**
 * Velur — RevenueAreaCard
 * Light product-style card with an interactive net-revenue area chart
 * (hover crosshair + tooltip + animated date pill). Sits on the dark
 * Signal Green solution band on the homepage. Data is an illustrative
 * deterministic series — same on server and client, no hydration drift.
 */

const SERIES = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 4, i + 1),
  revenue: Math.floor(38200 + Math.sin(i / 3.2) * 6400 + i * 410 + ((i * 37) % 900)),
}));

export function RevenueAreaCard({
  label,
  metric,
  delta,
  seriesLabel,
}: {
  /** Mono eyebrow, e.g. "Net revenue · last 30 days". */
  label: string;
  /** Headline figure shown above the chart. */
  metric: string;
  /** Period-over-period delta chip, e.g. "+12.4% vs prior 30d". */
  delta: string;
  /** Tooltip row label, e.g. "Net revenue". */
  seriesLabel: string;
}) {
  return (
    <div
      className="rounded-[22px] bg-canvas border border-line p-6 md:p-8 pb-2 md:pb-3"
      style={{ boxShadow: "var(--elevation-overlay)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.06em] text-slate mb-2">
            {label}
          </p>
          <p className="font-display font-normal text-ink-strong text-[28px] md:text-[34px] leading-none tracking-[-0.02em] tabular-nums">
            {metric}
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center rounded-full bg-success-wash text-success font-mono text-[11px] px-3 py-1.5">
          {delta}
        </span>
      </div>

      <AreaChart
        data={SERIES}
        aspectRatio="16 / 9"
        margin={{ top: 28, right: 8, bottom: 40, left: 8 }}
      >
        <Grid horizontal />
        <Area
          dataKey="revenue"
          curve={curveMonotoneX}
          fill="var(--chart-line-primary)"
          fillOpacity={0.22}
          strokeWidth={2}
        />
        <XAxis numTicks={4} />
        <ChartTooltip
          rows={(point) => [
            {
              color: "var(--chart-line-secondary)",
              label: seriesLabel,
              value: `€${(point.revenue as number).toLocaleString("en-IE")}`,
            },
          ]}
        />
      </AreaChart>
    </div>
  );
}
