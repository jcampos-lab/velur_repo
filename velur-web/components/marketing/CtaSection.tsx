"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import UnderlineDoodle from "@/components/illustrations/UnderlineDoodle";
import VelurFinal from "@/components/illustrations/VelurFinal";

type CtaSectionProps = {
  headline1?: string;
  headline2?: string;
  meta?: string;
  buttonText?: string;
  buttonHref?: string;
};

export default function CtaSection({
  headline1 = "“Are you numbers unlocking your growth potential?”",
  headline2 = "Let's find it together.",
  meta = "30 minutes · Free · No deck · We'll look at your actual data together",
  buttonText = "Book a 30-min call →",
  buttonHref = "/contact",
}: CtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const children = containerRef.current!.children;
      gsap.fromTo(
        Array.from(children),
        { opacity: 0, y: prefersReduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReduced ? 0 : 0.6,
          stagger: prefersReduced ? 0 : 0.1,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
        }
      );
    };

    animate();
  }, []);

  return (
    <section className="bg-cream py-40 md:py-48">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Closing illustration — calls back to VelurAnchor at the top of the page */}
        <div className="flex justify-center mb-4 select-none" aria-hidden>
          <div className="w-48 md:w-72">
            <VelurFinal />
          </div>
        </div>

        <div ref={containerRef} className="flex flex-col items-center text-center gap-10">
          {/* Headline line 1 — Fraunces italic */}
          <h2
            className="font-serif italic font-normal text-ink leading-[1.05] tracking-[-0.03em] max-w-4xl"
            style={{ fontSize: "clamp(32px, 5.5vw, 88px)" }}
          >
            {headline1}
          </h2>

          {/* Headline line 2 — Bricolage */}
          <div className="relative inline-block">
            <h2
              className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: "clamp(32px, 5.5vw, 88px)" }}
            >
              {headline2}
            </h2>
            <UnderlineDoodle className="absolute -bottom-3 left-0 w-full h-4" />
          </div>

          {/* Button + meta */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mt-4">
            <Button href={buttonHref} variant="amber" size="lg">
              {buttonText}
            </Button>
            <p className="font-mono text-xs text-muted tracking-wide leading-relaxed">
              {meta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
