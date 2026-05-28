"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

/* GitHub-style calendar heatmap. Each square is a day, color intensity
   reflects daily orders. Floating tooltip card on hover. */

const WEEKS = 26;        // last six months
const DAYS = 7;
const MONTH_LABELS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const DAY_LABELS = ["Mon", "Wed", "Fri"];

type Cell = { week: number; day: number; orders: number; date: string };

function generate(): Cell[] {
  const cells: Cell[] = [];
  let seed = 13;
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - WEEKS * 7);

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      seed = (seed * 9301 + 49297) % 233280;
      const base = 10 + Math.round((w / WEEKS) * 35);
      const noise = Math.round((seed / 233280) * 28);
      // Dampen weekends slightly
      const weekend = d === 5 || d === 6 ? 0.65 : 1;
      const orders = Math.max(0, Math.round((base + noise - 12) * weekend));
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      cells.push({
        week: w,
        day: d,
        orders,
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    }
  }
  return cells;
}

/* Klein Blue ramp, lightest at #DDE4FB → Klein Blue */
function shade(v: number, max: number): string {
  if (v === 0) return "#E8E8E8";
  const t = Math.max(0.1, Math.min(1, v / max));
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${lerp(221, 24)},${lerp(228, 49)},${lerp(251, 176)})`;
}

const CELL = 12;
const GAP = 3;

export default function ActivityCalendar() {
  const prefersReduced = useReducedMotion();
  const cells = useMemo(generate, []);
  const max = useMemo(() => Math.max(...cells.map(c => c.orders)), [cells]);
  const [hover, setHover] = useState<Cell | null>(null);

  const W = WEEKS * (CELL + GAP) + 30;
  const H = DAYS * (CELL + GAP) + 26;

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="font-sans font-semibold text-ink text-[15px] leading-tight">
            Orders per day, last six months
          </p>
          <p className="font-sans text-[12.5px] text-ink/55 mt-0.5">
            Each square is a day. Hover any cell for the exact number.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9.5px] tracking-wide text-muted uppercase">
            Less
          </span>
          {[0.15, 0.35, 0.55, 0.8, 1].map(t => (
            <span
              key={t}
              className="block w-3 h-3 rounded-sm"
              style={{ background: shade(t * max, max) }}
            />
          ))}
          <span className="font-mono text-[9.5px] tracking-wide text-muted uppercase">
            More
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-full" role="img">
          {/* Month labels along the top */}
          {MONTH_LABELS.map((m, i) => (
            <text
              key={m}
              x={30 + i * ((WEEKS / MONTH_LABELS.length) * (CELL + GAP))}
              y={10}
              fontSize="9"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}
            >
              {m}
            </text>
          ))}

          {/* Day labels down the left */}
          {DAY_LABELS.map((d, i) => (
            <text
              key={d}
              x={0}
              y={18 + (i * 2 + 1) * (CELL + GAP) + 8}
              fontSize="9"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}
            >
              {d}
            </text>
          ))}

          {/* Cells */}
          {cells.map((c, i) => {
            const cx = 30 + c.week * (CELL + GAP);
            const cy = 18 + c.day * (CELL + GAP);
            const isHover = hover === c;
            const dim = hover && !isHover;
            const delay = prefersReduced ? 0 : 0.2 + (i % 50) * 0.006;

            return (
              <motion.rect
                key={i}
                x={cx}
                y={cy}
                width={CELL}
                height={CELL}
                rx={2.5}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: dim ? 0.4 : 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
                fill={shade(c.orders, max)}
                stroke={isHover ? "var(--color-ink)" : "transparent"}
                strokeWidth="1.4"
                style={{ cursor: "pointer", transition: "opacity 180ms ease, stroke 120ms ease" }}
                onMouseEnter={() => setHover(c)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </svg>

        {/* Floating tooltip */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key={`${hover.week}-${hover.day}`}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none rounded-xl bg-ink text-paper shadow-2xl border border-line/20 px-3.5 py-2.5 z-10"
              style={{
                left:  `calc(${((30 + hover.week * (CELL + GAP) + CELL / 2) / W) * 100}% - 70px)`,
                top:   `calc(${((18 + hover.day  * (CELL + GAP) + CELL / 2) / H) * 100}% - 64px)`,
              }}
            >
              <p className="font-mono text-[9.5px] tracking-[0.14em] text-paper/55 uppercase mb-0.5">
                {hover.date}
              </p>
              <p className="font-sans font-bold text-paper text-[15px] leading-none tabular-nums">
                {hover.orders} {hover.orders === 1 ? "order" : "orders"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
