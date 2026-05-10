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
      <section className="bg-paper pt-20 pb-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            {f.label}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em]"
                style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
              >
                {f.h1a}
                <br />{f.h1b}
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="font-sans text-xl text-muted leading-relaxed">
                {f.subhead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sticky category nav — desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-2">
                {f.categories.map((cat, ci) => (
                  <a
                    key={ci}
                    href={`#cat-${ci}`}
                    className="block font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors duration-150 py-1"
                  >
                    <span className="mr-2 opacity-50">{String(ci + 1).padStart(2, "0")}</span>
                    {cat.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Accordion */}
            <div className="lg:col-span-9 space-y-16">
              {f.categories.map((cat, ci) => (
                <div key={ci} id={`cat-${ci}`}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-xs text-muted">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="font-sans font-bold text-ink tracking-[-0.025em]"
                      style={{ fontSize: "clamp(18px, 2vw, 28px)" }}
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
      <section className="bg-cream py-24 border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.03em] mb-4"
                style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
              >
                {f.stillHaveQuestions}
              </h2>
              <p className="font-sans text-lg text-muted leading-relaxed">
                {f.stillHaveQuestionsBody}
              </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper font-sans font-medium text-base px-8 py-4 rounded-full hover:bg-amber transition-colors duration-200"
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
