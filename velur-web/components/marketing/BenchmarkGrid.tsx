"use client";

import { motion, useReducedMotion } from "framer-motion";

const SIGNALS = [
  {
    label: "Revenue",
    title: "What moved overnight.",
    body: "Net revenue, MRR, contribution margin, broken down by Shopify channel, subscription tier, and acquisition source, with a plain-English note explaining the why.",
  },
  {
    label: "Attribution",
    title: "Where the money actually came from.",
    body: "First-party events, server-side signals, and modeled conversions from Meta, TikTok, Google and Klaviyo, reconciled with what Shopify actually booked.",
  },
  {
    label: "Cohorts",
    title: "Who's worth bringing back.",
    body: "Retention by acquisition channel, first product, and price point. Find the customers you should pay more to keep, and the ones you shouldn't.",
  },
  {
    label: "Creative",
    title: "Which post actually sold.",
    body: "Tag every TikTok, Instagram, and Meta creative with metadata when it ships. We tie views, saves, and clicks back to orders and margin, not just engagement.",
  },
];

export default function BenchmarkGrid() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">
            What we read
          </p>
          <h2
            className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            Four signals, one brief.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: prefersReduced ? 0 : i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={prefersReduced ? undefined : { y: -3 }}
              className="bg-paper border border-line rounded-2xl p-6 md:p-7 flex flex-col gap-3 transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
                <p className="font-display text-[10.5px] tracking-[0.16em] text-amber uppercase">
                  {s.label}
                </p>
              </div>
              <h3
                className="font-display font-normal text-ink leading-[1.15] tracking-[-0.02em]"
                style={{ fontSize: "clamp(18px, 1.7vw, 24px)" }}
              >
                {s.title}
              </h3>
              <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
