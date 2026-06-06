"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { StatCard } from "@/components/velur/StatCard";
import { MetricDelta } from "@/components/velur/MetricDelta";
import { ButtonLink } from "@/components/velur/Button";

type Stat = { label: string; value: string; caption?: string; delta?: number };

/**
 * Velur — Dark Signal-Green proof band
 * Full-width green band (#0b3d2e). Copy left, 2×2 StatCards (navy surface) right.
 * Mirror of ui_kits/marketing/Home.jsx proof section.
 */
export default function DarkProofBand() {
  const { t } = useLanguage();
  const p = t.proofBand ?? {
    eyebrow: "Proof",
    heading: "The number you report should be the number you trust.",
    body: "Velur reconciles every source on a single timeline, so a board-ready forecast is one click — not one week.",
    cta: "See how it works",
    stats: [
      { label: "Faster close",       value: "8×",   caption: "vs. spreadsheets" },
      { label: "Forecast accuracy",  value: "96%",  delta: 9 },
      { label: "Sources unified",    value: "40+",  caption: "out of the box" },
      { label: "Time to value",      value: "2 wks",caption: "median" },
    ],
  };

  return (
    <section
      className="bg-signal-green text-on-dark"
      style={{ padding: "var(--section-y) var(--gutter)" }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
        style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
      >
        <div>
          <div className="mb-5">
            <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-signal-green-300">
              {p.eyebrow}
            </span>
          </div>
          <h2 className="velur-section text-white mb-5">{p.heading}</h2>
          <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[40ch] mb-7">
            {p.body}
          </p>
          <ButtonLink href="/services" variant="primary" tone="onDark" size="md">
            {p.cta}
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(p.stats as Stat[]).map((s, i) => (
            <StatCard
              key={i}
              surface="navy"
              label={s.label}
              value={s.value}
              delta={typeof s.delta === "number" ? <MetricDelta value={s.delta} suffix="pts" size="sm" /> : undefined}
              caption={s.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

