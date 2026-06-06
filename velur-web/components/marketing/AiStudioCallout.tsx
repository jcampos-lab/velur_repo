"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Card } from "@/components/velur/Card";
import { MonoLabel } from "@/components/velur/MonoLabel";
import { ButtonLink } from "@/components/velur/Button";
import { Sparkles } from "lucide-react";

/**
 * Velur — AI Studio secondary callout
 * Per hybrid scope: Revenue Intelligence is the lead product (everything
 * above this section), but Velur still ships AI Studio for the same
 * small-business customers. This is the bridge: warm stone Card, mono
 * label, monumental heading, secondary underline link.
 */
export default function AiStudioCallout() {
  const { t } = useLanguage();
  const a = t.aiStudio ?? {
    eyebrow: "Also from Velur",
    heading: "AI Studio — creative work, shipped.",
    body: "While Revenue Intelligence is in private beta, our team puts Higgsfield, MidJourney, Claude and ChatGPT to work for small businesses. Hands-on creative production, paired with the analytics platform we're quietly building behind it.",
    cta: "See AI Studio",
    tools: ["Higgsfield", "MidJourney", "Claude", "ChatGPT", "Klaviyo", "Meta"],
  };

  return (
    <section
      className="bg-canvas"
      style={{ padding: "var(--section-y) var(--gutter)" }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <Card surface="warm" radius="lg" padding={56} className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex w-9 h-9 rounded-full bg-coral-wash text-coral items-center justify-center">
                  <Sparkles size={18} strokeWidth={1.5} />
                </span>
                <MonoLabel tone="coral">{a.eyebrow}</MonoLabel>
              </div>
              <h2 className="velur-section text-ink-strong mb-5 max-w-[16ch]">{a.heading}</h2>
              <p className="font-sans text-[17px] leading-[1.55] text-ink max-w-[52ch] mb-8">
                {a.body}
              </p>
              <ButtonLink href="/studio" variant="secondary" size="md">
                {a.cta}
              </ButtonLink>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {a.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-canvas border border-card-border rounded-[30px] font-sans text-[14px] text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
