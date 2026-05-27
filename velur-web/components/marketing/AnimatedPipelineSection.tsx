"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AnimatedBeam from "@/components/motion/AnimatedBeam";
import SectionLabel from "@/components/ui/SectionLabel";

const SOURCES = [
  { name: "Shopify",    role: "orders + margin",      color: "#95BF47" },
  { name: "Klaviyo",    role: "email + LTV",          color: "#1E1F23" },
  { name: "Meta Ads",   role: "spend + creative",     color: "#0866FF" },
  { name: "TikTok Ads", role: "spend + saves",        color: "#000000" },
  { name: "GA4",        role: "sessions + funnel",    color: "#F9AB00" },
];

const OUTPUTS = [
  { name: "Daily brief",    role: "what moved, why" },
  { name: "Cohort report",  role: "who's coming back" },
  { name: "Creative score", role: "which post sold" },
];

export default function AnimatedPipelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef       = useRef<HTMLDivElement>(null);
  const s0 = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const o0 = useRef<HTMLDivElement>(null);
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);
  const sourceRefs = [s0, s1, s2, s3, s4];
  const outputRefs = [o0, o1, o2];
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-paper py-16 md:py-24 border-y border-line overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <SectionLabel left="LIVE FLOW" right="DATA IN · BRIEF OUT" className="mb-10 md:mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 mb-10 md:mb-14 items-end">
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] max-w-3xl"
            style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
          >
            Five sources. One brief. Every morning at eight.
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed max-w-[280px]">
            Read-only connections. Your data stays in your accounts — we just listen for what changes.
          </p>
        </div>

        {/* Pipeline diagram */}
        <div
          ref={containerRef}
          className="relative bg-cream border border-line rounded-3xl p-4 sm:p-6 md:p-10 overflow-hidden"
          style={{ minHeight: 480 }}
        >
          {/* Soft amber glow behind hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[260px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,91,26,0.10), transparent 70%)",
            }}
            aria-hidden
          />

          {/* Grid background dots */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Three columns: sources / hub / outputs */}
          <div className="relative grid grid-cols-3 gap-3 md:gap-10 items-center min-h-[420px]">

            {/* Sources */}
            <div className="flex flex-col gap-3 md:gap-4">
              {SOURCES.map((s, i) => (
                <motion.div
                  key={s.name}
                  ref={sourceRefs[i]}
                  initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReduced ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={prefersReduced ? undefined : { x: 4 }}
                  className="bg-paper border border-line rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2.5 md:gap-3"
                >
                  <span
                    className="block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans font-semibold text-ink text-[12px] md:text-[14px] leading-none mb-0.5 truncate">
                      {s.name}
                    </p>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.06em] text-muted truncate">
                      {s.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Hub */}
            <div className="flex items-center justify-center">
              <motion.div
                ref={hubRef}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-ink text-paper rounded-2xl px-4 md:px-6 py-4 md:py-5 shadow-[0_25px_60px_-20px_rgba(255,91,26,0.45)]"
              >
                {!prefersReduced && (
                  <span className="absolute inset-0 rounded-2xl pointer-events-none">
                    <span className="absolute inset-0 rounded-2xl animate-[pulse-dot_2.4s_ease-in-out_infinite]" style={{ boxShadow: "0 0 0 2px rgba(255,91,26,0.25)" }} />
                  </span>
                )}
                <p className="font-mono text-[9px] md:text-[10px] tracking-[0.18em] text-amber uppercase mb-1">
                  · Velur
                </p>
                <p className="font-sans font-bold text-[15px] md:text-[18px] leading-tight">
                  Intelligence
                  <br />
                  layer
                </p>
              </motion.div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col gap-3 md:gap-4">
              {OUTPUTS.map((o, i) => (
                <motion.div
                  key={o.name}
                  ref={outputRefs[i]}
                  initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReduced ? 0 : 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={prefersReduced ? undefined : { x: -4 }}
                  className="bg-paper border border-line rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2.5 md:gap-3"
                >
                  <span className="block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans font-semibold text-ink text-[12px] md:text-[14px] leading-none mb-0.5 truncate">
                      {o.name}
                    </p>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.06em] text-muted truncate">
                      {o.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Beams */}
          {sourceRefs.map((srcRef, i) => (
            <AnimatedBeam
              key={`s-${i}`}
              containerRef={containerRef}
              fromRef={srcRef}
              toRef={hubRef}
              curvature={(i - (SOURCES.length - 1) / 2) * 12}
              duration={3 + i * 0.25}
              delay={i * 0.4}
            />
          ))}
          {outputRefs.map((outRef, i) => (
            <AnimatedBeam
              key={`o-${i}`}
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={outRef}
              curvature={(i - (OUTPUTS.length - 1) / 2) * 18}
              duration={3 + i * 0.3}
              delay={1.2 + i * 0.4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
