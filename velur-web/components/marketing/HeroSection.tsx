"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function HeroSection() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef   = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = async () => {
      const { gsap } = await import("gsap");

      const lines = [line1Ref.current, line2Ref.current].filter(Boolean) as Element[];
      const sub   = subRef.current!;

      if (prefersReduced) {
        lines.forEach(el => { (el as HTMLElement).style.clipPath = "inset(0 0% 0 0)"; });
        sub.style.opacity   = "1";
        sub.style.transform = "none";
        return;
      }

      gsap.set(lines, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(sub,   { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(lines, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.7,
        stagger: 0.12,
        ease: "cubic-bezier(0.16,1,0.3,1)",
      }).to(sub, {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: "cubic-bezier(0.16,1,0.3,1)",
      }, "-=0.25");
    };

    animate();
  }, []);

  return (
    <section
      className="relative bg-paper overflow-hidden px-5 sm:px-10 pt-14 pb-14 md:pt-20 md:pb-20"
    >
      {/* 12-column dashed grid overlay */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="h-full mx-auto grid grid-cols-12 opacity-[0.32]"
          style={{ maxWidth: 1280, padding: "0 0px", gap: 24 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{
                borderLeft:  i === 0 ? "1px dashed var(--color-line)" : "none",
                borderRight: "1px dashed var(--color-line)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full" style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Status pill */}
        <Pill>
          <span className="pulse-dot w-2 h-2 rounded-full bg-positive inline-block shrink-0" />
          <span className="text-ink">{t.hero.pill}</span>
        </Pill>

        {/* Headline — meaningfully smaller, SaaS-scale not editorial */}
        <div className="overflow-visible mt-8 md:mt-10 mb-6 md:mb-8">
          <h1
            className="font-sans font-bold text-ink"
            style={{
              fontSize: "clamp(36px, 6.5vw, 88px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            <span ref={line1Ref} className="block" style={{ clipPath: "inset(0 0% 0 0)" }}>
              {t.hero.line1}
            </span>
            <span
              ref={line2Ref}
              className="block text-amber"
              style={{ clipPath: "inset(0 0% 0 0)", fontWeight: 700 }}
            >
              {t.hero.line2}
            </span>
          </h1>
        </div>

        {/* Animated specialty cycle — smaller, lighter */}
        <div className="mb-8 md:mb-10">
          <p className="font-sans text-lg md:text-2xl text-muted leading-snug flex flex-col md:flex-row md:flex-wrap md:items-baseline md:gap-x-3 gap-y-1">
            <span>{t.hero.cyclePre}</span>
            <AnimatedTextCycle
              words={t.hero.cycleWords}
              interval={2600}
              className="text-ink font-medium"
            />
            <span>{t.hero.cyclePost}</span>
          </p>
        </div>

        {/* Sub-row — body + buttons, no editorial thesis */}
        <div
          ref={subRef}
          className="max-w-2xl opacity-100"
        >
          <p className="font-sans text-ink leading-relaxed mb-8 text-base md:text-lg">
            Velur connects Shopify, Klaviyo, Meta and TikTok to one daily brief that explains what&apos;s working, what isn&apos;t, and where to focus next. Built for founders who want clarity — not another dashboard to babysit.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="md">
              {t.hero.ctaPrimary}
            </Button>
            <Button href="/services" variant="secondary" size="md">
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
