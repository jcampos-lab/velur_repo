"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const CARDS = [
  {
    number: 47000,
    prefix: "€",
    suffix: "",
    label: "PER YEAR",
    body: "What the average DTC brand wastes on duplicate SaaS analytics tools they only use 30% of.",
    source: "Gartner SaaS Spend Report, 2025",
    highlight: true,
  },
  {
    number: 23,
    prefix: "",
    suffix: "%",
    label: "HIGHER LTV",
    body: "DTC brands using proper cohort analysis see meaningfully higher 12-month lifetime value vs those who don't.",
    source: "Klaviyo State of Email Marketing, 2025",
    highlight: false,
  },
  {
    number: 8,
    prefix: "",
    suffix: " hrs",
    label: "EVERY WEEK",
    body: "Time the average e-commerce founder spends in spreadsheets reconciling numbers that should be automated.",
    source: "Shopify SMB Report, 2024",
    highlight: false,
  },
  {
    number: 42,
    prefix: "",
    suffix: "%",
    label: "OF MID-MARKET BRANDS",
    body: "Cannot accurately attribute revenue post-iOS14, leading to 20-40% misallocated ad spend.",
    source: "AppsFlyer Performance Index, 2025",
    highlight: false,
  },
  {
    number: 3.4,
    prefix: "",
    suffix: "×",
    label: "CONVERSION LIFT",
    body: "For brands segmenting customers beyond RFM into behavioral cohorts.",
    source: "Bloomreach Personalization Index, 2025",
    highlight: false,
  },
  {
    number: 2400,
    prefix: "€",
    suffix: "",
    label: "PER MONTH",
    body: "What brands save by replacing Triple Whale, Northbeam, or Daasity with a custom-owned analytics layer.",
    source: "Velur engagement data, projected",
    highlight: false,
  },
];

function formatNumber(n: number, prefix: string, suffix: string): string {
  if (prefix === "€" && n >= 1000) return `${prefix}${Math.round(n).toLocaleString("de-DE")}${suffix}`;
  if (Number.isInteger(n)) return `${prefix}${Math.round(n)}${suffix}`;
  return `${prefix}${n.toFixed(1)}${suffix}`;
}

function BenchmarkCard({ card, index }: { card: (typeof CARDS)[number]; index: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el     = numberRef.current;
    const cardEl = cardRef.current;
    if (!el || !cardEl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(cardEl,
        { opacity: 0, y: prefersReduced ? 0 : 24 },
        {
          opacity: 1, y: 0,
          duration: prefersReduced ? 0 : 0.5,
          delay:    prefersReduced ? 0 : (index % 3) * 0.08,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          scrollTrigger: { trigger: cardEl, start: "top 85%", once: true },
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: card.number,
        duration: prefersReduced ? 0 : 1.2,
        ease: "power3.out",
        onUpdate: () => { el.textContent = formatNumber(obj.val, card.prefix, card.suffix); },
        scrollTrigger: { trigger: cardEl, start: "top 85%", once: true },
      });
    };

    animate();
  }, [card, index]);

  return (
    <div
      ref={cardRef}
      className={`border border-line bg-paper rounded-[16px] p-10 flex flex-col gap-4 opacity-0 ${
        card.highlight ? "ring-1 ring-amber/25" : ""
      }`}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          ref={numberRef}
          className="font-mono font-semibold text-ink leading-none"
          style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
        >
          {formatNumber(0, card.prefix, card.suffix)}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{card.label}</span>
      </div>
      <p className="font-sans text-[17px] text-ink leading-[1.5] flex-1">{card.body}</p>
      <div className="border-t border-line" />
      <p className="font-mono text-xs text-muted">Source · {card.source}</p>
    </div>
  );
}

export default function BenchmarkGrid() {
  return (
    <section id="pain" className="bg-cream py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <SectionLabel left="01 / THE PAIN" right="IN NUMBERS" className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <h2
                className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
              >
                What's actually happening
                <br />in your business right now.
              </h2>
            </div>
            <div className="lg:col-span-4 flex items-start lg:justify-end">
              <p className="font-sans text-lg text-muted leading-relaxed max-w-sm">
                Six numbers we keep finding inside the brands we audit. None of
                them are about your product. All of them are leaking margin.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <BenchmarkCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
