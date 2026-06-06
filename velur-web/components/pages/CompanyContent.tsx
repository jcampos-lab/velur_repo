"use client";

import CtaSection from "@/components/marketing/CtaSection";
import FounderSection from "@/components/marketing/FounderSection";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function CompanyContent() {
  const { t } = useLanguage();
  const c = t.company;

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-16 md:pt-20 pb-14 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-sans text-ink/55 text-[13px] mb-3">
            {c.label}
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em] mb-6 max-w-4xl"
            style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
          >
            {c.h1a} {c.h1b}
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            {c.subhead}
          </p>
        </div>
      </section>

      {/* Founder */}
      <FounderSection />

      {/* Why it works */}
      <section className="bg-paper py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {c.whyLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              Built on a small set of opinions.
            </h2>
          </div>
          <div className="card-group grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
            {c.cards.map((item) => (
              <div key={item.num} className="marketing-card bg-paper border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase">{item.num}</span>
                <h3
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.02em]"
                  style={{ fontSize: "clamp(17px, 1.5vw, 22px)" }}
                >
                  {item.heading}
                </h3>
                <p className="font-sans text-[15px] text-ink/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background, dark section */}
      <section className="bg-ink py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase mb-6">
                {c.bgLabel}
              </p>
              <p
                className="font-sans font-medium text-white leading-[1.35] tracking-[-0.015em]"
                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              >
                &ldquo;{c.quote}&rdquo;
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="divide-y divide-white/10 border-t border-white/10">
                {c.stackRows.map((row) => (
                  <div key={row.label} className="py-4 grid grid-cols-[auto_1fr] gap-5 items-start">
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
                      {row.label}
                    </span>
                    <span className="font-mono text-[11.5px] text-white/65 leading-relaxed">
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
      <section className="bg-paper py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {c.beliefsLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              What we believe.
            </h2>
          </div>
          <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {c.beliefs.map((belief, i) => (
              <div key={i} className="marketing-card bg-paper border border-line rounded-2xl p-6 flex items-start gap-3">
                <span className="font-mono text-[11px] text-amber shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[15px] text-ink/80 leading-relaxed">{belief}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {c.roadmapLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.roadmapHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-9">
              <div className="space-y-6">
                {c.roadmap.map((item) => (
                  <div key={item.year} className="grid grid-cols-12 gap-4 md:gap-6 items-start border-b border-line pb-5">
                    <span className="col-span-3 md:col-span-2 font-mono text-[11px] tracking-[0.16em] text-amber uppercase pt-1">
                      {item.year}
                    </span>
                    <p className="col-span-9 md:col-span-10 font-sans text-base text-ink/80 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
