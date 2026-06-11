"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ButtonLink } from "@/components/velur/Button";
import { ArtBackdrop } from "@/components/velur/ArtBackdrop";

/**
 * Velur — Closing CTA band
 * Midnight (#0a1a2f) full-width band over the abstract gradient brand
 * art (green pill composition — the brand's Signal Green family). A
 * midnight scrim keeps the centered copy at AA contrast. Monumental
 * display heading + primary onDark pill.
 */
export default function CtaSection() {
  const { t } = useLanguage();
  const c = t.ctaBand;

  return (
    <section
      className="relative bg-midnight text-on-dark"
      style={{ padding: "var(--section-y) var(--gutter)" }}
    >
      <ArtBackdrop
        still="/art/abstract-green.png"
        overlay="linear-gradient(180deg, rgba(10,26,47,0.80) 0%, rgba(10,26,47,0.64) 50%, rgba(10,26,47,0.82) 100%)"
      />
      <div
        className="relative text-center"
        style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}
      >
        <div className="mb-5">
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-action-blue">
            {c.eyebrow}
          </span>
        </div>
        <h2 className="velur-section-display text-white mb-5">{c.heading}</h2>
        <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[44ch] mx-auto mb-9">
          {c.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <ButtonLink href="/contact" variant="primary" tone="onDark" size="lg">
            {c.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" tone="onDark" size="md">
            {c.ctaSecondary}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
