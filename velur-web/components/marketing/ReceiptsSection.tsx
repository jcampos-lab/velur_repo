"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STAT_NUMBERS = [
  { number: 5,  prefix: "",  suffix: "+"    },
  { number: 15, prefix: "",  suffix: "+"    },
  { number: 48, prefix: "",  suffix: " hrs" },
];

function StatColumn({
  num,
  text,
  index,
  isLast,
}: {
  num: (typeof STAT_NUMBERS)[number];
  text: { label: string; caption: string };
  index: number;
  isLast: boolean;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const colRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el    = numberRef.current;
    const colEl = colRef.current;
    if (!el || !colEl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(colEl,
        { opacity: 0, y: prefersReduced ? 0 : 24 },
        {
          opacity: 1, y: 0,
          duration: prefersReduced ? 0 : 0.6,
          delay:    prefersReduced ? 0 : index * 0.12,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          scrollTrigger: { trigger: colEl, start: "top 80%", once: true },
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: num.number,
        duration: prefersReduced ? 0 : 1.4,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${num.prefix}${Math.round(obj.val)}${num.suffix}`;
        },
        scrollTrigger: { trigger: colEl, start: "top 80%", once: true },
      });
    };

    animate();
  }, [num, index]);

  return (
    <div
      ref={colRef}
      className={`flex flex-col gap-4 py-10 md:py-0 opacity-0 ${
        !isLast ? "border-b md:border-b-0 md:border-r border-white/10" : ""
      } md:px-12 first:pl-0 last:pr-0`}
    >
      <span
        ref={numberRef}
        className="font-mono font-bold text-white leading-none"
        style={{ fontSize: "clamp(64px, 10vw, 144px)", letterSpacing: "-0.03em" }}
      >
        {num.prefix}0{num.suffix}
      </span>
      <p className="font-sans font-medium text-lg text-white leading-snug max-w-xs">{text.label}</p>
      <p className="font-mono text-[13px] text-muted leading-relaxed">{text.caption}</p>
    </div>
  );
}

export default function ReceiptsSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-ink dark:bg-paper py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
        <div className="mb-16 border-b border-white/10 pb-8">
          <SectionLabel
            left={t.receipts.sectionLeft}
            right={t.receipts.sectionRight}
            className="[&_span]:text-muted [&_.flex-1]:bg-white/10"
            animate={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STAT_NUMBERS.map((num, i) => (
            <StatColumn
              key={i}
              num={num}
              text={t.receipts.stats[i]}
              index={i}
              isLast={i === STAT_NUMBERS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
