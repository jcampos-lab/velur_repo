"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Velur — Trust strip
 * Six brand names set in mono, +0.08em tracking, muted-slate.
 * Mirror of ui_kits/marketing/Home.jsx trust strip.
 */
export default function TrustStrip() {
  const { t } = useLanguage();
  const trust = t.trustStrip?.brands ?? ["NORTHWIND", "ATLAS", "BRIAR & CO", "CEDAR", "MERIDIAN", "OAKLINE"];
  const caption = t.trustStrip?.caption ?? "Trusted by revenue teams at fast-growing companies";

  return (
    <section
      className="text-center"
      style={{
        padding: "0 var(--gutter) var(--section-y)",
        maxWidth: "var(--container-max)",
        margin: "0 auto",
      }}
    >
      <p className="font-sans text-[15px] text-slate mb-9">{caption}</p>
      <div className="flex flex-wrap justify-between items-center gap-8">
        {trust.map((b) => (
          <span
            key={b}
            className="font-mono text-[16px] tracking-[0.08em] text-muted-slate"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
