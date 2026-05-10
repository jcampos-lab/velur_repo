"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const CARD_NUMBERS = [
  { number: 47000, prefix: "€", suffix: "",     highlight: true  },
  { number: 23,    prefix: "",  suffix: "%",    highlight: false },
  { number: 8,     prefix: "",  suffix: " hrs", highlight: false },
  { number: 42,    prefix: "",  suffix: "%",    highlight: false },
  { number: 3.4,   prefix: "",  suffix: "×",    highlight: false },
  { number: 67,    prefix: "",  suffix: "%",    highlight: false },
];

function formatNumber(n: number, prefix: string, suffix: string): string {
  if (prefix === "€" && n >= 1000) return `${prefix}${Math.round(n).toLocaleString("de-DE")}${suffix}`;
  if (Number.isInteger(n)) return `${prefix}${Math.round(n)}${suffix}`;
  return `${prefix}${n.toFixed(1)}${suffix}`;
}

function BenchmarkCard({
  num,
  text,
  index,
}: {
  num: (typeof CARD_NUMBERS)[number];
  text: { label: string; body: string; source: string };
  index: number;
}) {
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
        val: num.number,
        duration: prefersReduced ? 0 : 1.2,
        ease: "power3.out",
        onUpdate: () => { el.textContent = formatNumber(obj.val, num.prefix, num.suffix); },
        scrollTrigger: { trigger: cardEl, start: "top 85%", once: true },
      });
    };

    animate();
  }, [num, index]);

  return (
    <div
      ref={cardRef}
      className={`border border-line bg-paper rounded-[16px] p-10 flex flex-col gap-4 opacity-0 ${
        num.highlight ? "ring-1 ring-amber/25" : ""
      }`}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          ref={numberRef}
          className="font-mono font-semibold text-ink leading-none"
          style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
        >
          {formatNumber(0, num.prefix, num.suffix)}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{text.label}</span>
      </div>
      <p className="font-sans text-[17px] text-ink leading-[1.5] flex-1">{text.body}</p>
      <div className="border-t border-line" />
      <p className="font-mono text-xs text-muted">Source · {text.source}</p>
    </div>
  );
}

export default function BenchmarkGrid() {
  const { t } = useLanguage();
  const [line1, line2] = t.benchmarkGrid.heading.split("\n");

  return (
    <section id="pain" className="bg-cream py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <SectionLabel left={t.benchmarkGrid.sectionLeft} right={t.benchmarkGrid.sectionRight} className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <h2
                className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
              >
                {line1}
                <br />{line2}
              </h2>
            </div>
            <div className="lg:col-span-4 flex items-start lg:justify-end">
              <p className="font-sans text-lg text-muted leading-relaxed max-w-sm">
                {t.benchmarkGrid.desc}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARD_NUMBERS.map((num, i) => (
            <BenchmarkCard key={i} num={num} text={t.benchmarkGrid.cards[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
