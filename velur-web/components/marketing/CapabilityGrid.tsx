"use client";

import Link from "next/link";
import { Activity, TrendingUp, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Velur — Capability grid
 * Three columns joined by 1px hairlines inside a bordered rounded-md container.
 * Each cell: Lucide icon (1.4 stroke) tinted Signal Green, h3 24px, body, blue link.
 * Mirror of ui_kits/marketing/Home.jsx capability cards.
 */
const iconMap = { signals: Activity, forecast: TrendingUp, risk: ShieldAlert };

export default function CapabilityGrid() {
  const { t } = useLanguage();
  const cells = t.capabilities ?? [
    { key: "signals",  h: "Signals",  b: "Pipeline, billing, product usage and CRM — reconciled into one revenue truth." },
    { key: "forecast", h: "Forecast", b: "Roll-ups you can trust, with the assumptions and movements made explicit." },
    { key: "risk",     h: "Risk",     b: "Surface the accounts that need attention before a renewal quietly slips." },
  ];
  const learnMore = t.capabilitiesLearnMore ?? "Learn more";

  return (
    <section
      style={{
        padding: "0 var(--gutter) var(--section-y)",
        maxWidth: "var(--container-max)",
        margin: "0 auto",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 bg-hairline border border-hairline rounded-[16px] overflow-hidden gap-px"
      >
        {cells.map((c) => {
          const Icon = iconMap[c.key as keyof typeof iconMap] ?? Activity;
          return (
            <div key={c.key} className="bg-canvas p-8">
              <Icon size={26} strokeWidth={1.4} className="text-signal-green" />
              <h3 className="font-sans text-[24px] leading-[1.3] text-ink-strong mt-5 mb-2.5">
                {c.h}
              </h3>
              <p className="font-sans text-base leading-[1.5] text-ink mb-4">{c.b}</p>
              <Link
                href="/services"
                className="font-sans text-[15px] text-action-blue underline underline-offset-2 decoration-[1px] hover:decoration-2"
              >
                {learnMore}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
