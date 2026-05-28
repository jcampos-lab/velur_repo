"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function SocialMediaAiSection() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const copy = t.twoProducts;

  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">

        <div className="mb-8 md:mb-12 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">
            {copy.label}
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            {copy.heading}
          </h2>
          <p className="font-sans text-base text-ink/70 leading-relaxed mt-3">
            {copy.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

          {/* AI Studio card — the active product, leads the row */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReduced ? undefined : { y: -3 }}
            className="rounded-2xl border border-line bg-paper overflow-hidden flex flex-col"
          >
            <div className="h-32 md:h-36 relative flex items-end p-4 overflow-hidden bg-brand-brown">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 25% 35%, rgba(24,49,176,0.55), transparent 55%), radial-gradient(circle at 80% 75%, rgba(199,63,160,0.30), transparent 55%)",
                }}
              />
              <div className="relative flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-positive/25 text-positive font-mono text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-positive pulse-dot" /> live
                </span>
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-white/85 uppercase">
                  {copy.riLabel}
                </p>
              </div>
            </div>
            <div className="p-5 md:p-7 flex flex-col gap-3 flex-1">
              <h3 className="font-sans font-bold text-ink text-[19px] md:text-[22px] leading-tight tracking-[-0.02em]">
                {copy.riHeading}
              </h3>
              <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed flex-1">
                {copy.riBody}
              </p>
              <Link
                href="/studio"
                className="font-sans font-medium text-[14px] text-amber hover:underline underline-offset-4 mt-2"
              >
                {copy.riCta}
              </Link>
            </div>
          </motion.div>

          {/* Revenue Intelligence card — quietly in build */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReduced ? undefined : { y: -3 }}
            className="rounded-2xl border border-line bg-paper overflow-hidden flex flex-col"
          >
            <div className="h-32 md:h-36 relative flex items-end p-4 overflow-hidden bg-brand-slate">
              <div
                aria-hidden
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 8px, transparent 8px, transparent 16px)",
                }}
              />
              <div className="relative flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                  In build
                </span>
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-white/85 uppercase">
                  {copy.studioLabel}
                </p>
              </div>
            </div>
            <div className="p-5 md:p-7 flex flex-col gap-3 flex-1">
              <h3 className="font-sans font-bold text-ink text-[19px] md:text-[22px] leading-tight tracking-[-0.02em]">
                {copy.studioHeading}
              </h3>
              <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed flex-1">
                {copy.studioBody}
              </p>
              <Link
                href="/services"
                className="font-sans font-medium text-[14px] text-amber hover:underline underline-offset-4 mt-2"
              >
                {copy.studioCta}
              </Link>
            </div>
          </motion.div>
        </div>

        <p className="font-sans text-sm md:text-base text-ink/65 leading-relaxed mt-6 md:mt-8 max-w-3xl">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
