"use client";

import { motion, useReducedMotion } from "framer-motion";
import Pill from "@/components/ui/Pill";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import MagneticButton from "@/components/motion/MagneticButton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative bg-paper overflow-hidden px-5 sm:px-10 pt-12 pb-14 md:pt-16 md:pb-20">

      {/* Aurora glow, dialed back so text stays legible */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {!prefersReduced && (
          <>
            <motion.div
              className="absolute"
              style={{
                top: "30%",
                left: "55%",
                width: "60vw",
                height: "60vw",
                maxWidth: 760,
                maxHeight: 760,
                background:
                  "radial-gradient(circle, rgba(122,63,199,0.20), rgba(122,63,199,0) 65%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 25, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute"
              style={{
                top: "5%",
                right: "-10%",
                width: "45vw",
                height: "45vw",
                maxWidth: 580,
                maxHeight: 580,
                background:
                  "radial-gradient(circle, rgba(199,63,160,0.16), rgba(199,63,160,0) 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, -40, 25, 0], y: [0, 30, -15, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* 12-column dashed grid */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="h-full mx-auto grid grid-cols-12 opacity-[0.22]"
          style={{ maxWidth: 1280, padding: "0 0px", gap: 24 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                borderLeft:  i === 0 ? "1px dashed var(--color-line)" : "none",
                borderRight: "1px dashed var(--color-line)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full" style={{ maxWidth: 1280, margin: "0 auto" }}>

        <Pill>
          <span className="pulse-dot w-2 h-2 rounded-full bg-positive inline-block shrink-0" />
          <span className="text-ink">{t.hero.pill}</span>
        </Pill>

        {/* Headline, shrunk so it doesn't read editorial */}
        <motion.h1
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-bold text-ink mt-8 md:mt-10 mb-6"
          style={{
            fontSize: "clamp(34px, 5.4vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          <span className="block">{t.hero.line1}</span>
          <span className="block text-amber">{t.hero.line2}</span>
        </motion.h1>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-10"
        >
          <p className="font-sans text-base md:text-xl text-ink/80 leading-snug flex flex-col md:flex-row md:flex-wrap md:items-baseline md:gap-x-3 gap-y-1">
            <span>{t.hero.cyclePre}</span>
            <AnimatedTextCycle
              words={t.hero.cycleWords}
              interval={2800}
              className="text-amber font-bold"
            />
            <span>{t.hero.cyclePost}</span>
          </p>
        </motion.div>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-sans text-ink/80 leading-relaxed mb-8 text-base md:text-lg">
            Velur connects Shopify, Klaviyo, Meta and TikTok to one daily brief that explains what&apos;s working, what isn&apos;t, and where to focus next. Built for founders who want clarity, not another dashboard to babysit.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <MagneticButton
              href="/contact"
              className="bg-ink text-paper rounded-lg px-6 py-3.5 font-sans font-medium text-base hover:bg-amber hover:text-paper transition-colors duration-200"
              strength={0.35}
            >
              {t.hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton
              href="/services"
              className="bg-paper text-ink border border-ink rounded-lg px-6 py-3.5 font-sans font-medium text-base hover:bg-ink hover:text-paper transition-colors duration-200"
              strength={0.25}
            >
              {t.hero.ctaSecondary}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
