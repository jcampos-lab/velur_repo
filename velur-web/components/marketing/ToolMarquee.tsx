"use client";

import { motion, useReducedMotion } from "framer-motion";

const ROW_A = [
  "Shopify", "Klaviyo", "Meta Ads", "TikTok Ads", "Google Ads",
  "GA4", "Postgres", "BigQuery", "Snowflake", "Stripe",
];

const ROW_B = [
  "Claude", "ChatGPT", "MidJourney", "Higgsfield", "Flux",
  "Leonardo AI", "Runway", "Pika", "Suno", "ElevenLabs",
];

function Row({
  items,
  reverse = false,
  highlight = false,
}: {
  items: string[];
  reverse?: boolean;
  highlight?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  // Duplicate the array twice so the loop is seamless
  const looped = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={
          prefersReduced
            ? undefined
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{
          duration: 38,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {looped.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans font-medium text-[13.5px] ${
              highlight
                ? "border-amber/40 bg-amber/[0.06] text-ink"
                : "border-line bg-paper text-ink/80"
            }`}
          >
            <span
              className={`block w-1.5 h-1.5 rounded-full ${
                highlight ? "bg-amber" : "bg-ink/35"
              }`}
            />
            {name}
          </span>
        ))}
      </motion.div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

export default function ToolMarquee() {
  return (
    <section className="bg-cream py-10 md:py-14 border-y border-line overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8 mb-7 md:mb-9">
          <div className="max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              The stack we plug into
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
            >
              Twenty tools. One read-only layer. No new dashboards.
            </h2>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Row items={ROW_A} />
          <Row items={ROW_B} reverse highlight />
        </div>
      </div>
    </section>
  );
}
