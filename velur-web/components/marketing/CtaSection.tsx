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
    <section className="bg-cream py-14 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-5 md:gap-7"
        >
          <h2
            className="font-sans font-medium text-ink/65 leading-[1.15] tracking-[-0.015em] max-w-2xl"
            style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
          >
            {copy.h1}
          </h2>

          <div className="relative inline-block">
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(24px, 3.4vw, 44px)" }}
            >
              {copy.h2}
            </h2>
            <UnderlineDoodle className="absolute -bottom-2 left-0 w-full h-3" />
          </div>

          <div className="mt-2">
            <Button href={buttonHref} variant="amber" size="md">
              {copy.btn}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
