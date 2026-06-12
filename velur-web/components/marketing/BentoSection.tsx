"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import KpiDashboardChart from "@/components/illustrations/KpiDashboardChart";
import NumberTicker from "@/components/motion/NumberTicker";

/* ─── Scatter mini-chart: spend vs margin correlation ─────────────────── */

type Dot = { x: number; y: number; label: string; channel: string };

const DOTS: Dot[] = [
  { x: 12, y: 38, label: "TikTok organic",      channel: "tiktok" },
  { x: 30, y: 52, label: "Klaviyo flows",       channel: "klaviyo" },
  { x: 48, y: 41, label: "Meta retargeting",    channel: "meta" },
  { x: 65, y: 28, label: "Meta prospecting",    channel: "meta" },
  { x: 78, y: 14, label: "Google PMax",         channel: "google" },
  { x: 85, y: 8,  label: "Affiliate",           channel: "affiliate" },
  { x: 22, y: 60, label: "TikTok creators",     channel: "tiktok" },
  { x: 40, y: 47, label: "Email broadcasts",    channel: "klaviyo" },
];

const CHANNEL_COLOR: Record<string, string> = {
  tiktok:    "#1E1B18",
  klaviyo:   "#1831B0",
  meta:      "#57627C",
  google:    "#B7B6B7",
  affiliate: "#6E6E6E",
};

function CorrelationChart() {
  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState<Dot | null>(null);
  const W = 340;
  const H = 220;
  const PAD = { l: 36, r: 14, t: 14, b: 28 };
  const cw = W - PAD.l - PAD.r;
  const ch = H - PAD.t - PAD.b;

  const xFor = (x: number) => PAD.l + (x / 100) * cw;
  const yFor = (y: number) => PAD.t + (1 - y / 70) * ch;

  return (
    <div className="relative h-full flex flex-col">
      <div className="mb-3">
        <p className="font-sans font-semibold text-ink text-[15px] leading-tight mb-1">
          Spend vs margin, last 30 days
        </p>
        <p className="font-sans text-[12.5px] text-ink/60 leading-snug">
          Each dot is a campaign. The trend line shows the gradual margin drop as spend grows.
        </p>
      </div>

      <div className="relative flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full overflow-visible h-full"
          role="img"
          aria-label="Spend vs margin scatter plot"
        >
          {[0, 25, 50, 75, 100].map(t => (
            <line
              key={`vx-${t}`}
              x1={xFor(t)} y1={PAD.t} x2={xFor(t)} y2={H - PAD.b}
              strokeWidth="0.5" opacity="0.35"
              style={{ stroke: "var(--color-line)" }}
            />
          ))}
          {[0, 20, 40, 60].map(t => (
            <line
              key={`hy-${t}`}
              x1={PAD.l} y1={yFor(t)} x2={W - PAD.r} y2={yFor(t)}
              strokeWidth="0.5" opacity="0.35"
              style={{ stroke: "var(--color-line)" }}
            />
          ))}

          <motion.line
            x1={xFor(8)} y1={yFor(58)} x2={xFor(92)} y2={yFor(12)}
            stroke="#1831B0" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.5"
            initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          <text x={PAD.l - 6} y={yFor(0) + 4} textAnchor="end" fontSize="9"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            0%
          </text>
          <text x={PAD.l - 6} y={yFor(60) + 4} textAnchor="end" fontSize="9"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            60%
          </text>
          <text x={xFor(0)} y={H - PAD.b + 14} textAnchor="start" fontSize="9"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            $0 spend
          </text>
          <text x={xFor(100)} y={H - PAD.b + 14} textAnchor="end" fontSize="9"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            $20K spend
          </text>

          {DOTS.map((d, i) => {
            const isHover = hover === d;
            const dim = hover && hover !== d;
            return (
              <g key={d.label}>
                {isHover && (
                  <motion.circle
                    cx={xFor(d.x)} cy={yFor(d.y)}
                    r="14"
                    fill={CHANNEL_COLOR[d.channel]}
                    fillOpacity="0.18"
                    animate={prefersReduced ? {} : { r: [12, 16, 12] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.circle
                  cx={xFor(d.x)} cy={yFor(d.y)}
                  r={isHover ? 7 : 5}
                  fill={CHANNEL_COLOR[d.channel]}
                  stroke="var(--color-paper)"
                  strokeWidth="1.8"
                  style={{
                    cursor: "pointer",
                    opacity: dim ? 0.25 : 1,
                    transition: "opacity 200ms ease, r 200ms ease",
                  }}
                  initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: dim ? 0.25 : 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: prefersReduced ? 0 : 0.3 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHover(d)}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating tooltip card positioned over the hovered dot */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key={hover.label}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none rounded-xl bg-ink text-paper shadow-2xl border border-line/20 px-3.5 py-2.5 min-w-[180px] z-10"
              style={{
                left:
                  hover.x > 65
                    ? `calc(${(xFor(hover.x) / W) * 100}% - 200px)`
                    : `calc(${(xFor(hover.x) / W) * 100}% + 12px)`,
                top: `calc(${(yFor(hover.y) / H) * 100}% - 50px)`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: CHANNEL_COLOR[hover.channel] }}
                />
                <span className="font-sans font-semibold text-paper text-[12.5px]">
                  {hover.label}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <div>
                  <p className="font-display text-[9.5px] tracking-[0.14em] text-paper/55 uppercase">
                    Margin
                  </p>
                  <p className="font-display font-normal text-paper text-[14px] tabular-nums">
                    {hover.y}%
                  </p>
                </div>
                <div>
                  <p className="font-display text-[9.5px] tracking-[0.14em] text-paper/55 uppercase">
                    Spend
                  </p>
                  <p className="font-display font-normal text-paper text-[14px] tabular-nums">
                    ${Math.round(hover.x * 200).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="font-sans text-[11.5px] text-ink/55 mt-2 min-h-[20px]">
        {hover ? "" : "Hover any dot for campaign detail."}
      </p>
    </div>
  );
}

/* ─── Tool list ────────────────────────────────────────────────────────── */

const TOOLS = [
  { name: "Shopify",     role: "orders + margin",     color: "#95BF47" },
  { name: "Klaviyo",     role: "flows + LTV",         color: "#57627C" },
  { name: "Meta Ads",    role: "spend + creative",    color: "#0866FF" },
  { name: "TikTok Ads",  role: "spend + saves",       color: "#1A1A1A" },
  { name: "Higgsfield",  role: "reel drafts",         color: "#7C3AED" },
  { name: "Claude",      role: "email + brand copy",  color: "#D97757" },
];

function ToolsCard() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="h-full flex flex-col">
      <p className="font-sans font-semibold text-ink text-[15px] leading-tight mb-4">
        Six of the tools we read
      </p>
      <ul className="flex flex-col gap-2 flex-1">
        {TOOLS.map((t, i) => (
          <motion.li
            key={t.name}
            initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: prefersReduced ? 0 : 0.2 + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={prefersReduced ? undefined : { x: 4 }}
            className="flex items-center gap-3 py-1.5"
          >
            <span className="block w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
            <span className="font-sans font-semibold text-ink text-[14px] min-w-[90px]">{t.name}</span>
            <span className="font-sans text-[12px] text-ink/55">{t.role}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Mini brief card ──────────────────────────────────────────────────── */

function MiniBrief() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-positive pulse-dot" />
        <p className="font-display text-[10px] tracking-[0.14em] text-positive uppercase">
          Today&apos;s brief, 08:02
        </p>
      </div>
      <p className="font-display font-normal text-ink text-[17px] leading-snug tracking-[-0.015em] mb-3">
        Net revenue up 12% week-over-week.
      </p>
      <p className="font-sans text-[13.5px] text-ink/80 leading-relaxed mb-3">
        TikTok creator <span className="font-semibold text-ink">@mara.skincare</span> drove 38% of the lift. Klaviyo win-back flow underperformed, recommend pausing variant B.
      </p>
      <p className="font-sans text-[12px] text-ink/55 mt-auto">
        Reply to this email and the model recalibrates by tomorrow.
      </p>
    </div>
  );
}

/* ─── Highlight stat card ──────────────────────────────────────────────── */

function StatCard({ value, label, suffix = "", prefix = "" }: {
  value: number; label: string; suffix?: string; prefix?: string;
}) {
  return (
    <div className="h-full flex flex-col justify-between">
      <p className="font-sans text-paper/60 text-[13px] leading-tight">
        {label}
      </p>
      <p className="font-display font-normal text-paper leading-none tracking-tight"
        style={{ fontSize: "clamp(32px, 3vw, 44px)" }}>
        <NumberTicker value={value} prefix={prefix} suffix={suffix} duration={1.8} />
      </p>
    </div>
  );
}

/* ─── BentoSection ─────────────────────────────────────────────────────── */

export default function BentoSection() {
  return (
    <section className="bg-paper py-14 md:py-20 border-y border-line">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">
            How it feels
          </p>
          <h2
            className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            One screen. One decision. Every interaction is hover-live.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:auto-rows-[minmax(220px,auto)]">

          {/* Mini brief: shows first on mobile so users see the human-readable summary, then the chart */}
          <BentoCard className="md:col-span-4 md:order-2 p-5 md:p-6">
            <MiniBrief />
          </BentoCard>

          {/* KPI dashboard: desktop only — too cramped on mobile */}
          <BentoCard className="hidden md:flex md:col-span-8 md:row-span-2 md:order-1 p-5 md:p-6">
            <KpiDashboardChart />
          </BentoCard>

          <BentoCard className="md:col-span-4 md:order-3 p-5 md:p-6 bg-ink text-paper">
            <StatCard value={184} label="Average minutes saved per week" suffix="m" />
          </BentoCard>

          {/* Correlation scatter: desktop only — labels overlap on small screens */}
          <BentoCard className="hidden md:flex md:col-span-7 md:order-4 p-5 md:p-6">
            <CorrelationChart />
          </BentoCard>

          <BentoCard className="md:col-span-5 md:order-5 p-5 md:p-6">
            <ToolsCard />
          </BentoCard>
        </div>

        <div className="mt-8 md:mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <p className="font-sans text-base text-ink/65 leading-relaxed max-w-2xl">
            Not screenshots. The actual charts. Hover anything.
          </p>
          <Link
            href="/services"
            className="font-sans font-medium text-base text-ink hover:text-amber transition-colors"
          >
            See the full platform →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReduced ? undefined : { y: -2 }}
      className={`bg-cream border border-line rounded-2xl overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
