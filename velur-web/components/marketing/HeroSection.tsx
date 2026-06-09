"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ButtonLink } from "@/components/velur/Button";
import { MonoLabel } from "@/components/velur/MonoLabel";
import { ConsoleMock } from "@/components/velur/ConsoleMock";
import { ArtBackdrop } from "@/components/velur/ArtBackdrop";

/**
 * Velur — Marketing Hero
 * Two-column split over the river-merge brand art (public/art/):
 * copy left (mono category, monumental display claim, lead, CTAs) and the
 * signature ConsoleMock right. The artwork's left third was composed as
 * negative space, so the headline sits on calm dark water; a left-weighted
 * scrim guarantees AA contrast at every breakpoint. Mobile gets the still,
 * desktop gets the 8s loop (see ArtBackdrop).
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
    <section className="relative bg-midnight">
      <ArtBackdrop
        base="/art/hero-river-wide"
        objectPosition="62% center"
        overlay="linear-gradient(90deg, rgba(10,26,47,0.82) 0%, rgba(10,26,47,0.55) 48%, rgba(10,26,47,0.30) 100%)"
      />

      <div
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
              <MonoLabel tone="onDark">{h.pill}</MonoLabel>
            </motion.div>

            <motion.h1
              {...fade(0.05)}
              className="velur-hero text-white mb-6"
              style={{ textWrap: "pretty" }}
            >
              <span className="block">{h.line1}</span>
              <span className="block text-signal-green-300">{h.line2}</span>
            </motion.h1>

            <motion.p
              {...fade(0.1)}
              className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[44ch] mb-8"
            >
              {h.subhead}
            </motion.p>

            <motion.div {...fade(0.15)} className="flex flex-wrap items-center gap-6">
              <ButtonLink href="/contact" variant="primary" tone="onDark" size="lg">
                {h.ctaPrimary}
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" tone="onDark" size="md">
                {h.ctaSecondary}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div {...fade(0.2)} className="w-full">
            <ConsoleMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
