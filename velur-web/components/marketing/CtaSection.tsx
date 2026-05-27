"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
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
  const { t } = useLanguage();
  const copy = t.cta[variant];
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#2A1206] text-paper p-8 md:p-12 lg:p-16 overflow-hidden relative"
        >
          {/* Soft amber glow */}
          <div
            aria-hidden
            className="absolute -top-32 -right-20 w-[420px] h-[420px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,91,26,0.25), transparent 65%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-3">
                Ready when you are
              </p>
              <p className="font-sans font-medium text-paper/65 leading-[1.2] tracking-[-0.01em] mb-3 text-[15px] md:text-[17px]">
                {copy.h1}
              </p>
              <h3
                className="font-sans font-bold leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(24px, 3.4vw, 44px)" }}
              >
                {copy.h2}
              </h3>
            </div>
            <Link
              href={buttonHref}
              className="inline-flex items-center bg-amber text-paper font-sans font-semibold text-[14.5px] px-5 py-3 rounded-full hover:bg-paper hover:text-ink transition-colors self-start md:self-auto"
            >
              {copy.btn}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
