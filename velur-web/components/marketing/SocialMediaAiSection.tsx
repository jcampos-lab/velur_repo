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

          {/* Revenue Intelligence card */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReduced ? undefined : { y: -3 }}
            className="rounded-2xl border border-line bg-cream overflow-hidden flex flex-col"
          >
            <div className="h-28 md:h-32 bg-gradient-to-br from-[#57627C] via-[#7884A0] to-[#D0FFB0] relative flex items-end p-4">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-white/90 uppercase">
                {copy.riLabel}
              </p>
            </div>
            <div className="p-5 md:p-7 flex flex-col gap-3 flex-1">
              <h3 className="font-sans font-bold text-ink text-[19px] md:text-[22px] leading-tight tracking-[-0.02em]">
                {copy.riHeading}
              </h3>
              <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed flex-1">
                {copy.riBody}
              </p>
              <Link
                href="/services"
                className="font-sans font-medium text-[14px] text-amber hover:underline underline-offset-4 mt-2"
              >
                {copy.riCta}
              </Link>
            </div>
          </motion.div>

          {/* AI Studio card */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReduced ? undefined : { y: -3 }}
            className="rounded-2xl border border-line bg-cream overflow-hidden flex flex-col"
          >
            <div className="h-28 md:h-32 bg-gradient-to-br from-[#1A1A1A] via-[#2B2B2B] to-[#4A4A4A] relative flex items-end p-4">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-white/90 uppercase">
                {copy.studioLabel}
              </p>
            </div>
            <div className="p-5 md:p-7 flex flex-col gap-3 flex-1">
              <h3 className="font-sans font-bold text-ink text-[19px] md:text-[22px] leading-tight tracking-[-0.02em]">
                {copy.studioHeading}
              </h3>
              <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed flex-1">
                {copy.studioBody}
              </p>
              <Link
                href="/studio"
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
