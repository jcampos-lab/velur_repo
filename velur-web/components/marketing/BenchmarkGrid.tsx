"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function BenchmarkGrid() {
  const { t } = useLanguage();
  const b = t.benchmarkGrid;
  const featuredRef = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLQuoteElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      [featuredRef.current, quoteRef.current, statsRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: prefersReduced ? 0 : 28 },
          {
            opacity: 1, y: 0,
            duration: prefersReduced ? 0 : 0.6,
            delay:    prefersReduced ? 0 : i * 0.12,
            ease: "cubic-bezier(0.16,1,0.3,1)",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    };
    animate();
  }, []);

  return (
    <section id="pain" className="bg-cream py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <SectionLabel left={b.sectionLeft} right={b.sectionRight} className="mb-14" />

        {/* Featured stat — editorial asymmetric layout */}
        <div
          ref={featuredRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 opacity-0"
        >
          {/* Left: giant number */}
          <div className="lg:col-span-7">
            <p
              className="font-mono font-semibold text-ink leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(88px, 14vw, 200px)" }}
            >
              {b.featuredNum}
            </p>
            <p className="font-mono text-sm uppercase tracking-widest text-muted mt-3">
              {b.featuredLabel}
            </p>
          </div>

          {/* Right: explanation */}
          <div className="lg:col-span-5 pb-2">
            <p className="font-sans text-lg text-ink leading-relaxed mb-5">
              {b.featuredBody}
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Source · {b.featuredSource}
            </p>
          </div>
        </div>

        {/* Editorial pull quote — full width */}
        <blockquote
          ref={quoteRef}
          className="border-t border-line pt-10 mb-14 opacity-0"
        >
          <p
            className="font-serif italic text-ink leading-[1.2] tracking-[-0.01em]"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            &ldquo;{b.editorialQuote}&rdquo;
          </p>
        </blockquote>

        {/* Supporting mini-stats — borderless horizontal strip */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 opacity-0"
        >
          {b.supportStats.map((stat, i) => (
            <div
              key={i}
              className={`py-8 ${i > 0 ? "md:border-l md:border-line md:pl-12" : ""}`}
            >
              <p
                className="font-mono font-semibold text-ink leading-none mb-2"
                style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {stat.num}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-amber mb-3">
                {stat.label}
              </p>
              <p className="font-sans text-base text-muted leading-relaxed max-w-sm">
                {stat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
