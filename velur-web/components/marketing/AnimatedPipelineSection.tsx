"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AnimatedBeam from "@/components/motion/AnimatedBeam";

const SOURCES = [
  { name: "Shopify",    role: "orders, margin",      color: "#95BF47" },
  { name: "Klaviyo",    role: "email, LTV",          color: "#000000" },
  { name: "Meta Ads",   role: "spend, creative",     color: "#0866FF" },
  { name: "TikTok Ads", role: "spend, saves",        color: "#1A1A1A" },
  { name: "GA4",        role: "sessions, funnel",    color: "#F9AB00" },
];

const OUTPUTS = [
  { name: "Daily brief",     role: "what moved, why" },
  { name: "Cohort report",   role: "who is coming back" },
  { name: "Creative score",  role: "which post sold" },
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
    <section className="bg-paper py-14 md:py-20 border-b border-line overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-16 items-end mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              Live flow
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
            >
              Five sources in. One brief out.
            </h2>
          </div>
          <p className="font-sans text-base text-ink/65 leading-relaxed max-w-[300px]">
            Read-only connections. Your data stays in your accounts, we listen for what changes.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative bg-cream border border-line rounded-3xl px-4 sm:px-8 md:px-14 py-10 md:py-14 overflow-hidden"
          style={{ minHeight: 520 }}
        >
          {/* Soft amber halo behind the hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,91,26,0.13), transparent 70%)",
            }}
            aria-hidden
          />

          {/* Dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 sm:gap-8 md:gap-16 items-center">

            {/* Sources column */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase mb-1">
                Sources
              </p>
              {SOURCES.map((s, i) => (
                <motion.div
                  key={s.name}
                  ref={sourceRefs[i]}
                  initial={prefersReduced ? {} : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReduced ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={prefersReduced ? undefined : { x: 4, borderColor: "var(--color-ink)" }}
                  className="bg-paper border border-line rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3 transition-shadow hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.18)]"
                >
                  <span
                    className="block w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: s.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans font-semibold text-ink text-[13px] sm:text-[14.5px] leading-none mb-0.5 truncate">
                      {s.name}
                    </p>
                    <p className="font-sans text-[11px] sm:text-[12px] text-ink/55 truncate">
                      {s.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Hub */}
            <div className="flex items-center justify-center px-2 sm:px-4">
              <motion.div
                ref={hubRef}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-ink text-paper rounded-2xl px-5 md:px-7 py-5 md:py-6 shadow-[0_30px_80px_-25px_rgba(255,91,26,0.45)] min-w-[140px] md:min-w-[180px] text-center"
              >
                {!prefersReduced && (
                  <span className="absolute inset-0 rounded-2xl pointer-events-none">
                    <span
                      className="absolute inset-0 rounded-2xl animate-[pulse-dot_2.6s_ease-in-out_infinite]"
                      style={{ boxShadow: "0 0 0 2px rgba(255,91,26,0.25)" }}
                    />
                  </span>
                )}
                <p className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-amber uppercase mb-2">
                  Velur
                </p>
                <p className="font-sans font-bold text-[16px] md:text-[19px] leading-[1.1]">
                  Intelligence
                  <br />
                  layer
                </p>
              </motion.div>
            </div>

            {/* Outputs column */}
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase mb-1 text-right">
                Outputs
              </p>
              {OUTPUTS.map((o, i) => (
                <motion.div
                  key={o.name}
                  ref={outputRefs[i]}
                  initial={prefersReduced ? {} : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReduced ? 0 : 0.45 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={prefersReduced ? undefined : { x: -4, borderColor: "var(--color-amber)" }}
                  className="bg-paper border border-line rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3 transition-shadow hover:shadow-[0_10px_24px_-14px_rgba(255,91,26,0.4)]"
                >
                  <span className="block w-2.5 h-2.5 rounded-full bg-amber shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans font-semibold text-ink text-[13px] sm:text-[14.5px] leading-none mb-0.5 truncate">
                      {o.name}
                    </p>
                    <p className="font-sans text-[11px] sm:text-[12px] text-ink/55 truncate">
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
              curvature={(i - (SOURCES.length - 1) / 2) * 14}
              duration={3.2 + i * 0.18}
              delay={i * 0.4}
              pathOpacity={0.35}
            />
          ))}
          {outputRefs.map((outRef, i) => (
            <AnimatedBeam
              key={`o-${i}`}
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={outRef}
              curvature={(i - (OUTPUTS.length - 1) / 2) * 22}
              duration={3.4 + i * 0.22}
              delay={1.4 + i * 0.4}
              pathOpacity={0.35}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
