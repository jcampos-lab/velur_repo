"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import UnderlineDoodle from "@/components/illustrations/UnderlineDoodle";
import VelurFinal from "@/components/illustrations/VelurFinal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type CtaVariant = "default" | "platform" | "company" | "caseStudies";

type CtaSectionProps = {
  variant?: CtaVariant;
  buttonHref?: string;
};

export default function CtaSection({
  variant = "default",
  buttonHref = "/contact",
}: CtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const copy = t.cta[variant];

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
    <section className="bg-cream py-20 md:py-32 lg:py-48">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex justify-center mb-4 select-none" aria-hidden>
          <div className="w-64 md:w-96">
            <VelurFinal />
          </div>
        </div>

        <div ref={containerRef} className="flex flex-col items-center text-center gap-10">
          <h2
            className="font-serif italic font-normal text-ink leading-[1.05] tracking-[-0.03em] max-w-4xl"
            style={{ fontSize: "clamp(32px, 5.5vw, 88px)" }}
          >
            {copy.h1}
          </h2>

          <div className="relative inline-block">
            <h2
              className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: "clamp(32px, 5.5vw, 88px)" }}
            >
              {copy.h2}
            </h2>
            <UnderlineDoodle className="absolute -bottom-3 left-0 w-full h-4" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 mt-4">
            <Button href={buttonHref} variant="amber" size="lg">
              {copy.btn}
            </Button>
            <p className="font-mono text-xs text-muted tracking-wide leading-relaxed">
              {copy.meta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
