"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/* Three weekly snapshots of creative performance. The bars animate
   from one snapshot to the next on a 3.5s loop, with a faux progress
   header swapping the active week. Margin column ticks via tabular
   figures so the layout never shifts. */

type Creative = {
  key: string;
  label: string;
  tool: string;
};

const CREATIVES: Creative[] = [
  { key: "a", label: "Why your serum stopped working", tool: "Higgsfield reel" },
  { key: "b", label: "30 seconds of unboxing, lit like film", tool: "MidJourney still" },
  { key: "c", label: "Founder pov, no script, one take",     tool: "TikTok organic" },
  { key: "d", label: "Win-back email, day 23",                tool: "Claude copy" },
  { key: "e", label: "Carousel, four product hero shots",     tool: "MidJourney still" },
  { key: "f", label: "Black Friday teaser, vertical",         tool: "Higgsfield reel" },
];

const WEEKS = [
  { label: "Week of Aug 26",
    values: { a: 12420, b:  8930, c: 14210, d:  5210, e:  3870, f:  1840 },
    delta:  { a:    18, b:    -4, c:    32, d:    11, e:    -8, f:     2 } },
  { label: "Week of Sep 2",
    values: { a: 18650, b:  6740, c: 12120, d:  6890, e:  4250, f:  3110 },
    delta:  { a:    50, b:   -24, c:   -15, d:    32, e:    10, f:    68 } },
  { label: "Week of Sep 9",
    values: { a: 22480, b:  5210, c:  9870, d:  9210, e:  6810, f:  7340 },
    delta:  { a:    20, b:   -23, c:   -19, d:    34, e:    60, f:   136 } },
];

const COLOR_BY_TOOL: Record<string, string> = {
  "Higgsfield reel":    "#1831B0",   // Klein Blue
  "MidJourney still":   "#57627C",   // Blue Slate
  "TikTok organic":     "#1E1B18",   // Carbon Black
  "Claude copy":        "#B7B6B7",   // Silver
};

export default function CreativeBarRace() {
  const prefersReduced = useReducedMotion();
  const [weekIdx, setWeekIdx] = useState(0);
  const week = WEEKS[weekIdx];

  // Auto-cycle the snapshots
  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => setWeekIdx(i => (i + 1) % WEEKS.length), 3500);
    return () => clearInterval(t);
  }, [prefersReduced]);

  const ordered = [...CREATIVES].sort(
    (a, b) =>
      (week.values[b.key as keyof typeof week.values] as number) -
      (week.values[a.key as keyof typeof week.values] as number),
  );
  const max = Math.max(...Object.values(week.values));

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
            Creative performance, weekly
          </p>
          <p className="font-sans text-[12.5px] text-ink/55 mt-0.5">
            Margin attributed to each creative, ranked by week.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Week pager */}
          <div className="flex items-center gap-1.5">
            {WEEKS.map((w, i) => (
              <button
                key={w.label}
                type="button"
                onClick={() => setWeekIdx(i)}
                className="group flex items-center"
                aria-label={`Show ${w.label}`}
              >
                <span
                  className={`block h-1 rounded-full transition-all ${
                    i === weekIdx
                      ? "w-8 bg-amber"
                      : "w-4 bg-ink/15 group-hover:bg-ink/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animated week label */}
      <div className="flex items-center justify-between mb-4 min-h-[20px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={week.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-amber"
          >
            {week.label}
          </motion.p>
        </AnimatePresence>
        <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
          Margin attributed
        </p>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-2.5">
        {ordered.map((c, rank) => {
          const v = week.values[c.key as keyof typeof week.values] as number;
          const d = week.delta[c.key as keyof typeof week.delta] as number;
          const positive = d >= 0;
          const widthPct = (v / max) * 100;
          const color = COLOR_BY_TOOL[c.tool] ?? "#1E1B18";

          return (
            <motion.div
              key={c.key}
              layout
              layoutId={c.key}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[20px_1fr_90px_60px] gap-3 items-center"
            >
              {/* Rank */}
              <span className="font-mono text-[11px] text-muted tabular-nums text-right">
                {rank + 1}
              </span>

              {/* Label + bar */}
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="font-sans font-semibold text-ink text-[13px] truncate">
                    {c.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-muted shrink-0">
                    {c.tool}
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-stone overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: color }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {/* Value */}
              <span className="font-sans font-bold text-ink text-[14px] tabular-nums text-right">
                ${v.toLocaleString()}
              </span>

              {/* Delta */}
              <span
                className={`font-mono text-[10.5px] tracking-wide tabular-nums text-right ${
                  positive ? "text-positive" : "text-muted"
                }`}
              >
                {positive ? "▲" : "▼"} {Math.abs(d)}%
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer key */}
      <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {Object.entries(COLOR_BY_TOOL).map(([tool, color]) => (
          <span key={tool} className="inline-flex items-center gap-1.5">
            <span className="block w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="font-mono text-[10px] tracking-[0.06em] text-ink/65">{tool}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
