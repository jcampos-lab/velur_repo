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
      className="relative bg-paper overflow-hidden px-5 sm:px-10 pt-16 pb-16 md:pt-24 md:pb-20"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* 12-column dashed grid overlay — matches design prototype */}
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

        {/* Giant headline — overflows past the right grid edge */}
        <div className="overflow-visible mt-12 mb-8">
          <h1
            className="font-sans font-bold text-ink"
            style={{
              fontSize: "clamp(44px, 11vw, 168px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              marginRight: "0",
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

        {/* Animated specialty cycle — sits between headline and subhead */}
        <div className="mb-10 overflow-hidden">
          <p className="font-sans text-2xl md:text-3xl text-muted flex flex-wrap items-baseline gap-x-3 leading-snug">
            <span>We turn your</span>
            <AnimatedTextCycle
              words={[
                "Shopify data",
                "Klaviyo flows",
                "Meta spend",
                "customer cohorts",
                "ad attribution",
                "revenue mix",
              ]}
              interval={2600}
              className="text-ink"
            />
            <span>into your next quarter&apos;s decision.</span>
          </p>
        </div>

        {/* Sub-row — stacks on mobile, 7/5 on large screens */}
        <div
          ref={subRef}
          className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-end opacity-100"
        >
          {/* Left: body + buttons */}
          <div>
            <p className="font-sans text-ink leading-relaxed mb-8 text-lg md:text-xl max-w-xl">
              {t.hero.subhead}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
              <Button href="/contact" variant="primary" size="md">
                {t.hero.ctaPrimary}
              </Button>
              <Button href="/services" variant="secondary" size="md">
                {t.hero.ctaSecondary}
              </Button>
            </div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
              velur.io
            </p>
          </div>

          {/* Right: editorial thesis note — hidden on mobile */}
          <div
            className="hidden lg:block pb-2 pl-8 max-w-md"
            style={{ borderLeft: "1px solid var(--color-line)" }}
          >
            <p className="font-mono uppercase text-muted mb-4" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
              {t.hero.thesisLabel}
            </p>
            <p
              className="font-serif italic text-ink"
              style={{ fontSize: 22, lineHeight: 1.4, margin: 0, fontWeight: 400 }}
            >
              {t.hero.thesis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
