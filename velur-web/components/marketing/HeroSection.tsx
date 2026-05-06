"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

export default function HeroSection() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef   = useRef<HTMLDivElement>(null);

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
      className="relative bg-paper overflow-hidden"
      style={{ minHeight: "calc(100vh - 80px)", padding: "96px 40px 80px" }}
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

      <div className="relative z-10" style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Status pill */}
        <Pill>
          <span className="pulse-dot w-2 h-2 rounded-full bg-positive inline-block shrink-0" />
          <span className="text-ink">Available — taking 2 new clients this quarter</span>
        </Pill>

        {/* Giant headline — overflows past the right grid edge */}
        <div className="overflow-visible mt-12 mb-16">
          <h1
            className="font-sans font-bold text-ink"
            style={{
              fontSize: "clamp(64px, 11vw, 168px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              marginRight: "-6vw",
            }}
          >
            <span ref={line1Ref} className="block" style={{ clipPath: "inset(0 0% 0 0)" }}>
              Your data already&nbsp;knows.
            </span>
            <span
              ref={line2Ref}
              className="block text-amber"
              style={{ clipPath: "inset(0 0% 0 0)", fontWeight: 700 }}
            >
              We help you act on it.
            </span>
          </h1>
        </div>

        {/* Sub-row — 7/5 grid */}
        <div
          ref={subRef}
          className="grid gap-16 items-end opacity-100"
          style={{ gridTemplateColumns: "7fr 5fr" }}
        >
          {/* Left: body + buttons */}
          <div>
            <p className="font-sans text-ink leading-relaxed mb-8" style={{ fontSize: 20, maxWidth: 540, margin: "0 0 32px" }}>
              Velur turns your Shopify, Klaviyo, and Meta data into the three
              numbers that decide your next quarter. No new dashboard. No new SaaS
              bill. Built by analysts, owned by you.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button href="/contact" variant="primary" size="lg">
                Book a 30-min call →
              </Button>
              <Button href="#pain" variant="secondary" size="lg">
                See what we do ↓
              </Button>
            </div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase" style={{ margin: 0 }}>
              velur.io
            </p>
          </div>

          {/* Right: editorial thesis note */}
          <div
            className="pb-2"
            style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: 32, maxWidth: 420 }}
          >
            <p className="font-mono uppercase text-muted mb-4" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
              The thesis
            </p>
            <p
              className="font-serif italic text-ink"
              style={{ fontSize: 22, lineHeight: 1.4, margin: 0, fontWeight: 400 }}
            >
              Most brands don't have a data problem. They have an action problem.
              The number that decides your quarter is already in your warehouse —
              quietly waiting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
