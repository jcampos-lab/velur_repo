"use client";

import { motion, useReducedMotion } from "framer-motion";

const ROWS = [
  {
    heading: "You'll own everything we build.",
    body: "Every SQL model, every dashboard config, every score function lives in your repository, under your name, from day one. Cancel any month and the work stays with you.",
  },
  {
    heading: "You'll understand every number.",
    body: "No black boxes. Every metric ships with a plain-English explanation of what moved and why. The goal is to leave you feeling like a data native, not dependent on us.",
  },
  {
    heading: "You'll be live in fourteen days.",
    body: "From first call to first daily brief. We handle the integrations and the backfill, your team just needs an OAuth approval and twenty minutes on a Wednesday.",
  },
];

export default function ThreeThingsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">
            How we work
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            Three things you can count on.
          </h2>
        </div>

        <div className="divide-y divide-line border-t border-line">
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: prefersReduced ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-12 gap-4 md:gap-6 py-7 md:py-10"
            >
              <div className="col-span-1 flex items-start pt-1">
                <span className="font-mono text-[12px] font-medium text-muted tracking-wide">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-11 md:col-span-5">
                <h3
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.02em]"
                  style={{ fontSize: "clamp(16px, 1.5vw, 22px)" }}
                >
                  {row.heading}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <p className="font-sans text-base md:text-[17px] text-ink/75 leading-relaxed">
                  {row.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
