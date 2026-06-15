"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Velur — StackedDeck
 * Cohere-style stacked timeline: each card pins under the nav while the
 * next slides over it. Bold, saturated surfaces from the Velur palette
 * (midnight blue, coral, deeper blue, Signal Green finale) — every
 * theme pairs a dark surface with light text (or coral with ink text),
 * so contrast is guaranteed, never dark-on-dark.
 *
 * Reused by /services ("How Velur works") and /company (the journey).
 * Reduced motion / mobile → plain stacked cards, no scroll scaling.
 */
export type DeckCard = {
  /** Giant faded label behind the card — a number ("01"). */
  ghost: string;
  /** Small label above the title. */
  eyebrow?: string;
  title: string;
  body: string;
  /** Optional chip list (e.g. detail bullets). */
  bullets?: string[];
};

type Theme = {
  bg: string;
  title: string;
  body: string;
  eyebrow: string;
  ghost: string;
  chipBg: string;
  chipText: string;
};

/* Bold rotation. The final card is always the Signal Green payoff. */
const THEMES: Theme[] = [
  {
    bg: "bg-midnight border-midnight",
    title: "text-white",
    body: "text-on-dark-muted",
    eyebrow: "text-signal-green-300",
    ghost: "text-white/[0.12]",
    chipBg: "bg-white/[0.07] border-white/15",
    chipText: "text-on-dark",
  },
  {
    bg: "bg-coral border-coral",
    title: "text-velur-ink",
    body: "text-velur-ink/80",
    eyebrow: "text-velur-ink/70",
    ghost: "text-velur-ink/[0.13]",
    chipBg: "bg-velur-ink/[0.08] border-velur-ink/15",
    chipText: "text-velur-ink/85",
  },
  {
    bg: "bg-midnight-700 border-midnight-700",
    title: "text-white",
    body: "text-on-dark-muted",
    eyebrow: "text-signal-green-300",
    ghost: "text-white/[0.12]",
    chipBg: "bg-white/[0.07] border-white/15",
    chipText: "text-on-dark",
  },
];

const GREEN: Theme = {
  bg: "bg-signal-green border-signal-green",
  title: "text-white",
  body: "text-on-dark-muted",
  eyebrow: "text-signal-green-300",
  ghost: "text-white/[0.14]",
  chipBg: "bg-white/[0.08] border-white/15",
  chipText: "text-on-dark",
};

export function StackedDeck({
  cards,
  className = "",
}: {
  cards: DeckCard[];
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const els = gsap.utils.toArray<HTMLElement>(".sd-card");
        els.forEach((card, i) => {
          const next = els[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.965,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: `top ${96 + i * 14}px`,
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`space-y-5 md:space-y-0 ${className}`}>
      {cards.map((card, i) => {
        const t = i === cards.length - 1 ? GREEN : THEMES[i % THEMES.length];
        return (
          <div
            key={card.ghost + card.title}
            className="md:sticky md:pb-8"
            style={{ top: `calc(96px + ${i * 14}px)` }}
          >
            <article
              className={`sd-card rounded-[22px] border overflow-hidden p-7 md:p-12 ${t.bg}`}
              style={{ boxShadow: "0 -14px 48px rgba(10,26,47,0.18)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-12 items-start">
                <span
                  aria-hidden
                  className={`font-display leading-[0.85] tracking-[-0.04em] select-none ${t.ghost}`}
                  style={{ fontSize: "clamp(64px, 9vw, 140px)" }}
                >
                  {card.ghost}
                </span>
                <div>
                  {card.eyebrow && (
                    <p className={`font-display text-[12px] uppercase tracking-[0.08em] mb-3 ${t.eyebrow}`}>
                      {card.eyebrow}
                    </p>
                  )}
                  <h3 className={`font-display font-normal text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.015em] mb-3 ${t.title}`}>
                    {card.title}
                  </h3>
                  <p className={`font-sans text-[15.5px] md:text-[16px] leading-[1.6] max-w-[62ch] ${card.bullets ? "mb-6" : ""} ${t.body}`}>
                    {card.body}
                  </p>
                  {card.bullets && (
                    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
                      {card.bullets.map((b) => (
                        <li key={b} className={`rounded-[12px] border px-4 py-3 ${t.chipBg}`}>
                          <span className={`font-sans text-[13.5px] leading-snug ${t.chipText}`}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
