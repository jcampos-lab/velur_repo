"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function CompanyContent() {
  const { t } = useLanguage();
  const c = t.company;

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            {c.label}
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8 max-w-5xl"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            {c.h1a}
            <br />{c.h1b}
          </h1>
          <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
            {c.subhead}
          </p>
        </div>
      </section>

      {/* Why it works */}
      <section className="bg-paper py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={c.whyLabel} right="" className="mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line rounded-[16px] overflow-hidden">
            {c.cards.map((item) => (
              <div key={item.num} className="bg-paper p-10 flex flex-col gap-5">
                <span className="font-mono text-xs text-muted">{item.num}</span>
                <h3
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.025em]"
                  style={{ fontSize: "clamp(20px, 2vw, 30px)" }}
                >
                  {item.heading}
                </h3>
                <p className="font-sans text-base text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background — dark section */}
      <section className="bg-ink dark:bg-paper py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-10">
                {c.bgLabel}
              </p>
              <p
                className="font-serif italic font-normal text-white dark:text-ink leading-[1.45]"
                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              >
                &ldquo;{c.quote}&rdquo;
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="divide-y divide-white/10 dark:divide-ink/20 border-t border-white/10 dark:border-ink/20">
                {c.stackRows.map((row) => (
                  <div key={row.label} className="py-6 grid grid-cols-3 gap-4 items-start">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {row.label}
                    </span>
                    <span className="font-mono text-xs text-white/60 dark:text-muted col-span-2 leading-relaxed">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={c.beliefsLabel} right="" className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[16px] overflow-hidden">
            {c.beliefs.map((belief, i) => (
              <div key={i} className="bg-paper p-8 flex items-start gap-4">
                <span className="font-mono text-xs text-muted shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")} ·
                </span>
                <span className="font-sans text-base text-ink leading-relaxed">{belief}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we're going */}
      <section className="bg-cream py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={c.roadmapLabel} right="" className="mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.04em] mb-12"
                style={{ fontSize: "clamp(26px, 3.5vw, 52px)" }}
              >
                {c.roadmapHeading}
              </h2>
              <div className="space-y-8">
                {c.roadmap.map((item) => (
                  <div key={item.year} className="grid grid-cols-12 gap-6 items-start">
                    <span className="col-span-2 font-mono text-xs text-muted pt-1">{item.year}</span>
                    <p className="col-span-10 font-sans text-lg text-ink leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection variant="company" />
    </>
  );
}
