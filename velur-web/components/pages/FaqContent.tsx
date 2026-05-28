"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function AccordionItem({
  q,
  a,
  open,
  onToggle,
  isLast,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div className={isLast ? "" : "border-b border-line"}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left"
      >
        <span className="font-sans font-semibold text-ink leading-snug tracking-[-0.01em] text-[15px] md:text-[16.5px]">
          {q}
        </span>
        <span className="shrink-0 mt-1 w-7 h-7 flex items-center justify-center rounded-full border border-line text-ink/60">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            {open ? (
              <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <>
                <line x1="5.5" y1="2" x2="5.5" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 md:px-8 pb-5 md:pb-6">
          <p className="font-sans text-[14.5px] text-ink/75 leading-relaxed max-w-3xl">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqContent() {
  const { t } = useLanguage();
  const f = t.faq;
  const [openId, setOpenId] = useState<string | null>("0-0");
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));
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
            className="rounded-3xl bg-brand-brown text-paper p-7 md:p-12 lg:p-16"
          >
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-5">
              {f.label}
            </p>
            <h1
              className="font-sans font-bold leading-[1.05] tracking-[-0.025em] mb-5 max-w-3xl"
              style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
            >
              {f.h1a} {f.h1b}
            </h1>
            <p className="font-sans text-paper/75 text-base md:text-lg leading-relaxed max-w-2xl">
              {f.subhead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 md:gap-10">

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-2">
                {f.categories.map((cat, ci) => (
                  <a
                    key={ci}
                    href={`#cat-${ci}`}
                    className="block font-sans text-[14px] text-ink/65 hover:text-amber transition-colors duration-150 py-1"
                  >
                    {cat.title}
                  </a>
                ))}
              </div>
            </aside>

            <div className="space-y-6">
              {f.categories.map((cat, ci) => (
                <motion.div
                  key={ci}
                  id={`cat-${ci}`}
                  initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: ci * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-paper border border-line overflow-hidden"
                >
                  <div className="px-6 md:px-8 pt-6 md:pt-7 pb-2">
                    <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase">
                      {cat.title}
                    </p>
                  </div>
                  {cat.items.map((item, ii) => {
                    const id = `${ci}-${ii}`;
                    return (
                      <AccordionItem
                        key={id}
                        q={item.q}
                        a={item.a}
                        open={openId === id}
                        onToggle={() => toggle(id)}
                        isLast={ii === cat.items.length - 1}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-3xl bg-brand-beige border border-line p-7 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
              <div className="max-w-2xl">
                <h2
                  className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                  style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
                >
                  {f.stillHaveQuestions}
                </h2>
                <p className="font-sans text-base text-ink/70 leading-relaxed">
                  {f.stillHaveQuestionsBody}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper font-sans font-semibold text-[14.5px] px-5 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors"
              >
                {f.contactBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
