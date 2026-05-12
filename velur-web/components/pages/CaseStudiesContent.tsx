"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";
import LtvLineChart from "@/components/illustrations/LtvLineChart";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const CATEGORY_COLORS: Record<string, string> = {
  Retention:   "text-positive",
  Attribution: "text-amber",
  Revenue:     "text-ink",
  Analytics:   "text-muted",
};

export default function CaseStudiesContent() {
  const { t } = useLanguage();
  const cs = t.caseStudies;

  const featured = cs.results.find((r) => r.featured)!;
  const rest = cs.results.filter((r) => !r.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            {cs.label}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 5.5vw, 80px)" }}
              >
                {cs.h1a}
                <br />{cs.h1b}
              </h1>
              <p className="font-sans text-lg text-muted leading-relaxed max-w-md">
                {cs.subhead}
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-7">
              <LtvLineChart />
            </div>
          </div>
        </div>
      </section>

      {/* Featured result */}
      <section className="bg-cream py-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 border border-line bg-paper rounded-[16px] p-12 flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-positive">
                {featured.category}
              </span>
              <span
                className="font-mono font-bold text-ink leading-none"
                style={{ fontSize: "clamp(72px, 10vw, 128px)", letterSpacing: "-0.03em" }}
              >
                {featured.metric}
              </span>
              <span className="font-mono text-sm text-muted uppercase tracking-widest">
                {featured.metricLabel}
              </span>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.03em]"
                style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
              >
                {featured.headline}
              </h2>
              <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
                {featured.body}
              </p>
              <p className="font-mono text-xs text-muted border-t border-line pt-5">
                {cs.sourceLabel} {featured.source}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Result card grid */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={cs.sectionBenchmarks} right={cs.sectionBenchmarksRight} className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((r, i) => (
              <div
                key={i}
                className="border border-line bg-paper rounded-[16px] p-8 flex flex-col gap-5 hover:border-ink transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs uppercase tracking-widest ${CATEGORY_COLORS[r.categoryKey] ?? "text-muted"}`}>
                    {r.category}
                  </span>
                  <span className="font-mono text-xs text-muted">{r.metricLabel}</span>
                </div>
                <span
                  className="font-mono font-bold text-ink leading-none"
                  style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.03em" }}
                >
                  {r.metric}
                </span>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-sans font-semibold text-ink text-lg leading-snug">{r.headline}</h3>
                  <p className="font-sans text-base text-muted leading-relaxed">{r.body}</p>
                </div>
                <div className="border-t border-line pt-4">
                  <p className="font-mono text-xs text-muted">{cs.sourceLabel} {r.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="bg-cream py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={cs.sectionVoices} right={cs.sectionVoicesRight} className="mb-16" />
          <div className="divide-y divide-line border-t border-b border-line">
            {cs.voices.map((v, i) => (
              <div key={i} className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted leading-relaxed">
                    {v.attribution}
                  </p>
                </div>
                <div className="lg:col-span-9 flex flex-col gap-5">
                  <blockquote
                    className="font-serif italic font-normal text-ink leading-[1.4]"
                    style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                  >
                    &ldquo;{v.quote}&rdquo;
                  </blockquote>
                  <p className="font-mono text-xs text-muted">{v.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact bar */}
      <section className="bg-ink dark:bg-paper py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 dark:divide-ink/20">
            {cs.impactBar.map((s, i) => (
              <div key={i} className="px-0 md:px-12 first:pl-0 last:pr-0 py-10 md:py-0 flex flex-col gap-3">
                <span
                  className="font-mono font-bold text-white dark:text-ink leading-none"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
                >
                  {s.num}
                </span>
                <p className="font-sans text-base text-white/60 dark:text-muted leading-snug max-w-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={cs.sectionImplication} right="" className="mb-14" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.04em]"
                style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
              >
                {cs.implicationHeading}
              </h2>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="font-sans text-lg text-muted leading-relaxed">{cs.implicationBody1}</p>
              <p className="font-sans text-lg text-muted leading-relaxed">{cs.implicationBody2}</p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-sm bg-ink text-paper px-6 py-3 rounded-pill hover:bg-amber transition-colors duration-200"
                >
                  {cs.implicationCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection variant="caseStudies" />
    </>
  );
}
