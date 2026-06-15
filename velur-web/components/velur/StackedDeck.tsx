"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Velur, StackedDeck
 * Cohere-style stacked timeline: each card pins under the nav while the
 * next slides over it. Refined neutral palette, ivory, carbon-black,
 * cool gray and deep Signal Green, every theme pairs its surface with
 * a legible text colour. The giant index sits as a full-bleed watermark
 * on the right so the content fills the card width (no dead right gutter).
 *
 * Reused by /services ("How Velur works") and /company (the journey).
 * Reduced motion / mobile → plain stacked cards, no scroll scaling.
 */
export type DeckCard = {
  /** Giant faded watermark, a number ("01"). */
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

/* ivory → carbon → gray cycle, with a deep-green finale. */
const THEMES: Theme[] = [
  {
    bg: "bg-[#F4F1E8]",
    title: "text-velur-ink",
    body: "text-ink/75",
    eyebrow: "text-signal-green",
    ghost: "text-velur-ink/[0.06]",
    chipBg: "bg-velur-ink/[0.05] border-velur-ink/10",
    chipText: "text-ink/80",
  },
  {
    bg: "bg-[#0F1115]",
    title: "text-white",
    body: "text-white/70",
    eyebrow: "text-signal-green-300",
    ghost: "text-white/[0.07]",
    chipBg: "bg-white/[0.06] border-white/[0.12]",
    chipText: "text-white/85",
  },
  {
    bg: "bg-[#E4E5E8]",
    title: "text-velur-ink",
    body: "text-ink/75",
    eyebrow: "text-signal-green",
    ghost: "text-velur-ink/[0.07]",
    chipBg: "bg-velur-ink/[0.05] border-velur-ink/10",
    chipText: "text-ink/80",
  },
];

const GREEN: Theme = {
  bg: "bg-signal-green",
  title: "text-white",
  body: "text-white/75",
  eyebrow: "text-signal-green-300",
  ghost: "text-white/[0.10]",
  chipBg: "bg-white/[0.07] border-white/15",
  chipText: "text-white/90",
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
            key={card.title}
            className="md:sticky md:pb-10"
            style={{ top: `calc(96px + ${i * 14}px)` }}
          >
            <article
              className={`sd-card relative rounded-[24px] overflow-hidden p-9 md:p-14 flex flex-col justify-center ${t.bg}`}
              style={{ boxShadow: "0 -14px 48px rgba(16,19,22,0.16)" }}
            >
              <div className="relative max-w-[820px]">
                {card.eyebrow && (
                  <p className={`font-display text-[12px] uppercase tracking-[0.08em] mb-4 ${t.eyebrow}`}>
                    {card.eyebrow}
                  </p>
                )}
                <h3 className={`font-display font-normal text-[28px] md:text-[42px] leading-[1.08] tracking-[-0.02em] mb-4 max-w-[22ch] ${t.title}`}>
                  {card.title}
                </h3>
                <p className={`font-sans text-[16px] md:text-[17.5px] leading-[1.6] max-w-[66ch] ${card.bullets ? "mb-7" : ""} ${t.body}`}>
                  {card.body}
                </p>
                {card.bullets && (
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-[760px]">
                    {card.bullets.map((b) => (
                      <li key={b} className={`rounded-[12px] border px-4 py-3 ${t.chipBg}`}>
                        <span className={`font-sans text-[13.5px] leading-snug ${t.chipText}`}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
