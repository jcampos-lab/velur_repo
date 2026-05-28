"use client";

import { motion, useReducedMotion } from "framer-motion";

type Row = {
  label: string;
  heading: string;
  body: string;
  bg: string;
  /** "dark" = white text on dark card. "light" = ink text on light card. */
  tone: "dark" | "light";
};

const ROWS: Row[] = [
  {
    label: "Ownership",
    heading: "You'll own everything we build.",
    body: "Every SQL model, every dashboard config, every score function lives in your repository, under your name, from day one. Cancel any month and the work stays with you.",
    bg: "bg-paper",
    tone: "light",
  },
  {
    label: "Clarity",
    heading: "You'll understand every number.",
    body: "No black boxes. Every metric ships with a plain-English explanation of what moved and why. The goal is to leave you feeling like a data native, not dependent on us.",
    bg: "bg-stone",
    tone: "light",
  },
  {
    label: "Speed",
    heading: "You'll be live in fourteen days.",
    body: "From first call to first daily brief. We handle the integrations and the backfill, your team just needs an OAuth approval and twenty minutes on a Wednesday.",
    bg: "bg-brand-brown",
    tone: "dark",
  },
];

export default function ThreeThingsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">

        <div className="mb-8 md:mb-12 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">
            How we work
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            Three things you can count on.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {ROWS.map((row, i) => {
            const dark = row.tone === "dark";
            const bodyClass = dark ? "text-paper" : "text-ink";
            const labelOpacity = dark ? "text-paper/45" : "text-ink/45";
            const bodyOpacity = dark ? "text-paper/75" : "text-ink/70";
            return (
              <motion.div
                key={i}
                initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={prefersReduced ? undefined : { y: -3 }}
                className={`rounded-2xl border ${dark ? "border-transparent" : "border-line"} p-6 md:p-8 flex flex-col gap-4 ${row.bg} ${bodyClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-amber">
                    {row.label}
                  </span>
                  <span className={`font-mono text-[11px] ${labelOpacity}`}>
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="font-sans font-bold leading-[1.15] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(17px, 1.6vw, 22px)" }}
                >
                  {row.heading}
                </h3>
                <p className={`font-sans text-[14.5px] leading-relaxed ${bodyOpacity}`}>
                  {row.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
