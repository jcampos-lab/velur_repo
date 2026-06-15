"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Velur — StackedDeck
 * Cohere-style stacked timeline: each card pins under the nav while the
 * next slides over it; the card beneath settles back a touch. Readable
 * by construction — soft on-brand tints with dark ink text, plus a
 * single Signal Green finale card with white text. No dark-on-dark.
 *
 * Reused by /services ("How Velur works") and /company (the evolution
 * timeline). Reduced motion → plain stacked cards, no scroll scaling.
 */
export type DeckCard = {
  /** Giant faded label behind the card — a number ("01") or a year ("2025"). */
  ghost: string;
  /** Small mono-style label above the title. */
  eyebrow?: string;
  title: string;
  body: string;
  /** Optional chip list (e.g. detail bullets). */
  bullets?: string[];
};

/* Soft, readable light tints for the stack; the final card is the
   Signal Green payoff. Every light surface keeps dark ink text. */
const LIGHT_SURFACES = ["bg-canvas", "bg-wash-green", "bg-stone", "bg-wash-blue"];

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
          /* As the next card reaches the pinned top, the one beneath
             scales back slightly — gentle depth, no brightness/dimming
             so text never becomes unreadable mid-transition. */
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
        const isLast = i === cards.length - 1;
        const green = isLast;
        const surface = green
          ? "bg-signal-green border-signal-green"
          : `${LIGHT_SURFACES[i % LIGHT_SURFACES.length]} border-line`;
        return (
          <div
            key={card.ghost + card.title}
            className="md:sticky md:pb-8"
            style={{ top: `calc(96px + ${i * 14}px)` }}
          >
            <article
              className={`sd-card rounded-[22px] border overflow-hidden p-7 md:p-12 ${surface}`}
              style={{ boxShadow: "0 -10px 36px rgba(16,19,22,0.07)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-12 items-start">
                <span
                  aria-hidden
                  className={`font-display leading-[0.85] tracking-[-0.04em] select-none ${green ? "text-white/[0.14]" : "text-ink/[0.07]"}`}
                  style={{ fontSize: "clamp(64px, 9vw, 140px)" }}
                >
                  {card.ghost}
                </span>
                <div>
                  {card.eyebrow && (
                    <p className={`font-display text-[12px] uppercase tracking-[0.08em] mb-3 ${green ? "text-signal-green-300" : "text-signal-green"}`}>
                      {card.eyebrow}
                    </p>
                  )}
                  <h3 className={`font-display font-normal text-[24px] md:text-[30px] leading-[1.1] tracking-[-0.015em] mb-3 ${green ? "text-white" : "text-ink-strong"}`}>
                    {card.title}
                  </h3>
                  <p className={`font-sans text-[15.5px] md:text-[16px] leading-[1.6] max-w-[62ch] ${card.bullets ? "mb-6" : ""} ${green ? "text-on-dark-muted" : "text-ink/85"}`}>
                    {card.body}
                  </p>
                  {card.bullets && (
                    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
                      {card.bullets.map((b) => (
                        <li
                          key={b}
                          className={`rounded-[12px] border px-4 py-3 ${green ? "bg-white/[0.08] border-white/15" : "bg-stone-200/70 border-card-border"}`}
                        >
                          <span className={`font-sans text-[13.5px] leading-snug ${green ? "text-on-dark" : "text-ink/80"}`}>
                            {b}
                          </span>
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

/** Convenience export so pages can pass arbitrary node lists if needed. */
export type { ReactNode };
