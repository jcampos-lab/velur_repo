"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import WaitlistForm from "@/components/ui/WaitlistForm";
import { ArtBackdrop } from "@/components/velur/ArtBackdrop";

export default function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Hero card */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl bg-brand-brown text-paper p-7 md:p-12 lg:p-16"
          >
            <ArtBackdrop
              still="/art/abstract-tiles.png"
              overlay="linear-gradient(90deg, rgba(16,19,22,0.72) 0%, rgba(16,19,22,0.45) 60%, rgba(16,19,22,0.25) 100%)"
              objectPosition="center 70%"
            />
            <div className="relative">
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-5">
              {c.label}
            </p>
            <h1
              className="font-display font-normal leading-[1.05] tracking-[-0.025em] mb-5 max-w-3xl"
              style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
            >
              {c.h1a} {c.h1b}
            </h1>
            <p className="font-sans text-paper/75 text-base md:text-lg leading-relaxed max-w-2xl">
              {c.subhead}
            </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form + expectations, two-card layout */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 rounded-2xl bg-paper border border-line p-6 md:p-8"
            >
              <WaitlistForm />
            </motion.div>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-2xl bg-brand-beige border border-line p-6 md:p-8 flex flex-col gap-6"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase mb-3 font-semibold">
                  {c.whatToExpect}
                </p>
                <div className="space-y-4">
                  {c.timeline.map((item) => (
                    <div key={item.time} className="flex gap-4">
                      <span className="font-mono text-[11.5px] text-ink/65 shrink-0 w-12 tracking-[0.06em] pt-0.5">
                        {item.time}
                      </span>
                      <span className="font-sans text-[14.5px] text-ink/85 leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-ink/10 pt-5 space-y-2.5">
                <p className="font-sans text-[13px] text-ink/65">
                  {c.noTime}{" "}
                  <a href="mailto:hello@velur.io" className="text-amber hover:underline font-medium">
                    hello@velur.io
                  </a>
                </p>
                <p className="font-sans text-[13px] text-ink/65">{c.async}</p>
                <p className="font-sans text-[13px] text-ink/65">{c.response}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
