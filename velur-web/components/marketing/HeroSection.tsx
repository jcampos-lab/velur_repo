"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ButtonLink } from "@/components/velur/Button";
import { MonoLabel } from "@/components/velur/MonoLabel";
import { ConsoleMock } from "@/components/velur/ConsoleMock";

/**
 * Velur — Marketing Hero
 * Two-column split: copy left (mono category, monumental display claim,
 * 18px lead, primary pill CTA + secondary underlined link) and the
 * signature ConsoleMock on the right. Mirror of ui_kits/marketing/Home.jsx.
 */
export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;
  const prefersReduced = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section
      className="relative"
      style={{
        padding: "var(--section-y-tight) var(--gutter) var(--section-y)",
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <div className="max-w-[640px]">
          <motion.div {...fade(0)} className="mb-5">
            <MonoLabel tone="green">{h.pill}</MonoLabel>
          </motion.div>

          <motion.h1
            {...fade(0.05)}
            className="velur-hero text-ink-strong mb-6"
            style={{ textWrap: "pretty" }}
          >
            <span className="block">{h.line1}</span>
            <span className="block text-signal-green">{h.line2}</span>
          </motion.h1>

          <motion.p
            {...fade(0.1)}
            className="font-sans text-[18px] leading-[1.5] text-ink max-w-[44ch] mb-8"
          >
            {h.subhead}
          </motion.p>

          <motion.div {...fade(0.15)} className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact" variant="primary" size="lg">
              {h.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="md">
              {h.ctaSecondary}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div {...fade(0.2)} className="w-full">
          <ConsoleMock />
        </motion.div>
      </div>
    </section>
  );
}
