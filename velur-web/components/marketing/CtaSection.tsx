"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import UnderlineDoodle from "@/components/illustrations/UnderlineDoodle";
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
    <section className="bg-cream py-16 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-6 md:gap-8"
        >
          <h2
            className="font-sans font-medium text-muted leading-[1.15] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
          >
            {copy.h1}
          </h2>

          <div className="relative inline-block">
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
            >
              {copy.h2}
            </h2>
            <UnderlineDoodle className="absolute -bottom-2 left-0 w-full h-3" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Button href={buttonHref} variant="amber" size="md">
              {copy.btn}
            </Button>
            <p className="font-mono text-xs text-muted tracking-wide leading-relaxed">
              {copy.meta}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
