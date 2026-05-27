"use client";

import { useState } from "react";
import Link from "next/link";
import CtaSection from "@/components/marketing/CtaSection";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function AccordionItem({
  q,
  a,
  id,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 md:gap-8 py-5 md:py-7 text-left group"
      >
        <span
          className="font-sans font-semibold text-ink leading-snug tracking-[-0.015em] group-hover:text-amber transition-colors duration-150"
          style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
        >
          {q}
        </span>
        <span className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border border-line text-muted group-hover:border-ink group-hover:text-ink transition-colors duration-150">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            {open ? (
              <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </span>
      </button>

      {open && (
        <div className="pb-5 md:pb-7 pr-6 md:pr-12">
          <p className="font-sans text-base text-muted leading-[1.75]">{a}</p>
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

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-16 md:pt-20 pb-14 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-sans text-ink/55 text-[13px] mb-3">
            {f.label}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
              >
                {f.h1a} {f.h1b}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed">
                {f.subhead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="bg-paper py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sticky category nav */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-2">
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

            {/* Accordion */}
            <div className="lg:col-span-9 space-y-12 md:space-y-14">
              {f.categories.map((cat, ci) => (
                <div key={ci} id={`cat-${ci}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2
                      className="font-sans font-bold text-ink tracking-[-0.02em]"
                      style={{ fontSize: "clamp(17px, 1.8vw, 22px)" }}
                    >
                      {cat.title}
                    </h2>
                    <div className="flex-1 h-px bg-line" />
                  </div>

                  <div className="border-t border-line">
                    {cat.items.map((item, ii) => {
                      const id = `${ci}-${ii}`;
                      return (
                        <AccordionItem
                          key={id}
                          id={id}
                          q={item.q}
                          a={item.a}
                          open={openId === id}
                          onToggle={() => toggle(id)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-cream py-14 md:py-20 border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-7">
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
            <div className="lg:col-span-5 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper font-sans font-medium text-base px-7 py-3.5 rounded-full hover:bg-amber transition-colors duration-200"
              >
                {f.contactBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection variant="default" />
    </>
  );
}
