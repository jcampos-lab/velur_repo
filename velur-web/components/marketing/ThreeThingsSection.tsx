"use client";

import { motion, useReducedMotion } from "framer-motion";

const ROWS = [
  {
    label: "Ownership",
    heading: "You'll own everything we build.",
    body: "Every SQL model, every dashboard config, every score function lives in your repository, under your name, from day one. Cancel any month and the work stays with you.",
    bg: "bg-paper",
    tone: "text-ink",
  },
  {
    label: "Clarity",
    heading: "You'll understand every number.",
    body: "No black boxes. Every metric ships with a plain-English explanation of what moved and why. The goal is to leave you feeling like a data native, not dependent on us.",
    bg: "bg-cream",
    tone: "text-ink",
  },
  {
    label: "Speed",
    heading: "You'll be live in fourteen days.",
    body: "From first call to first daily brief. We handle the integrations and the backfill, your team just needs an OAuth approval and twenty minutes on a Wednesday.",
    bg: "bg-[#2A1206]",
    tone: "text-paper",
  },
];

export default function ThreeThingsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-paper py-14 md:py-20">
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
          {ROWS.map((row, i) => (
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
              className={`rounded-2xl border border-line p-6 md:p-8 flex flex-col gap-4 ${row.bg} ${row.tone}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[10.5px] tracking-[0.16em] uppercase ${
                    row.tone === "text-paper" ? "text-amber" : "text-amber"
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`font-mono text-[11px] ${
                    row.tone === "text-paper" ? "text-paper/45" : "text-ink/40"
                  }`}
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="font-sans font-bold leading-[1.15] tracking-[-0.02em]"
                style={{ fontSize: "clamp(17px, 1.6vw, 22px)" }}
              >
                {row.heading}
              </h3>
              <p
                className={`font-sans text-[14.5px] leading-relaxed ${
                  row.tone === "text-paper" ? "text-paper/75" : "text-ink/70"
                }`}
              >
                {row.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
