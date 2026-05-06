"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const STATS = [
  {
    number: 5,
    suffix: "+",
    label: "Years analyzing DTC and subscription data",
    caption: "Across teams at brands you've heard of",
  },
  {
    number: 1,
    prefix: "$",
    suffix: "B+",
    label: "In combined revenue at the brands our team has worked with",
    caption: "Apparel, consumables, marketplace, subscription",
  },
  {
    number: 14,
    suffix: " days",
    label: "Average time from kickoff to your first dashboard live",
    caption: "Live data, in your warehouse, in your domain",
  },
];

function StatColumn({ stat, index, isLast }: { stat: (typeof STATS)[number]; index: number; isLast: boolean }) {
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
        val: stat.number,
        duration: prefersReduced ? 0 : 1.4,
        ease: "power3.out",
        onUpdate: () => {
          const prefix = stat.prefix ?? "";
          const suffix = stat.suffix ?? "";
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
        scrollTrigger: { trigger: colEl, start: "top 80%", once: true },
      });
    };

    animate();
  }, [stat, index]);

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
        {(stat.prefix ?? "") + "0" + (stat.suffix ?? "")}
      </span>
      <p className="font-sans font-medium text-lg text-white leading-snug max-w-xs">{stat.label}</p>
      <p className="font-mono text-[13px] text-muted leading-relaxed">{stat.caption}</p>
    </div>
  );
}

export default function ReceiptsSection() {
  return (
    <section className="bg-ink dark:bg-neutral-950 py-32 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
        <div className="mb-16 border-b border-white/10 pb-8">
          <SectionLabel
            left="03 / THE RECEIPTS"
            right=""
            className="[&_span]:text-muted [&_.flex-1]:bg-white/10"
            animate={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STATS.map((stat, i) => (
            <StatColumn key={i} stat={stat} index={i} isLast={i === STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
