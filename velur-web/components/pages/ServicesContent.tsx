"use client";

import Button from "@/components/ui/Button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import CtaSection from "@/components/marketing/CtaSection";
import KpiDashboardChart from "@/components/illustrations/KpiDashboardChart";
import DataPipelineFlow  from "@/components/illustrations/DataPipelineFlow";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ServicesContent() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-16 md:pt-20 pb-12 md:pb-16 overflow-hidden border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <p className="font-sans text-ink/55 text-[13px] mb-3">
                {s.label}
              </p>
              <h1
                className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em] mb-6"
                style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
              >
                {s.h1a} {s.h1b}
              </h1>
              <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
                {s.subhead}
              </p>
            </div>
            <div className="hidden lg:flex justify-end pointer-events-none select-none" aria-hidden>
              <div className="w-full max-w-[560px]">
                <KpiDashboardChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <div className="bg-cream divide-y divide-line border-b border-line">
        {s.modules.map((m, idx) => (
          <div key={idx} className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
              <div className="lg:col-span-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase mb-4">
                  {m.label}
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-4"
                  style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
                >
                  {m.heading}
                </h2>
                <p className="font-sans text-[15px] md:text-base text-ink/80 leading-relaxed mb-6">{m.body}</p>
                <Button href="/contact" variant="light" size="md">
                  {s.demoBtn}
                </Button>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="marketing-card border border-line bg-paper rounded-2xl p-6 md:p-7">
                  <p className="font-mono text-[10.5px] tracking-[0.16em] text-ink/55 uppercase mb-4">
                    {s.includedLabel}
                  </p>
                  <ul className="space-y-2.5">
                    {m.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                        <span className="font-sans text-[14.5px] text-ink/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Good fit / Not for you */}
      <section className="bg-paper py-14 md:py-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {s.rightForLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {s.rightForHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-line rounded-2xl overflow-hidden">
            <div className="p-7 md:p-10 border-b lg:border-b-0 lg:border-r border-line">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-positive shrink-0" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-ink/65 uppercase">Good fit</p>
              </div>
              <ul className="space-y-4">
                {s.rightForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[11px] text-ink/45 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-sans text-[15px] text-ink/85 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 md:p-10 bg-stone">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-muted shrink-0" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-ink/65 uppercase">{s.notRightForLabel}</p>
              </div>
              <ul className="space-y-4">
                {s.notRightForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[11px] text-ink/45 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-sans text-[15px] text-ink/65 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data pipeline flow visual */}
      <section className="bg-cream py-14 border-b border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="pointer-events-none select-none" aria-hidden>
            <DataPipelineFlow />
          </div>
        </div>
      </section>

      {/* Tool stack with cycling words */}
      <section className="bg-stone border-b border-line py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-sans text-ink/55 text-[13px] mb-3">
            {s.stackLabel}
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em] max-w-4xl"
            style={{ fontSize: "clamp(22px, 3.4vw, 40px)" }}
          >
            {s.stackHeading}
            <br />
            <span className="inline-flex flex-wrap items-baseline gap-x-3 text-ink/55">
              <span>{s.stackCyclePre}</span>
              <AnimatedTextCycle
                words={s.stackCycleWords}
                interval={2400}
                className="text-amber"
              />
            </span>
          </h2>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {s.howLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {s.howRight}
            </h2>
          </div>
          <div className="card-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {s.steps.map((step, i) => (
              <div key={i} className="marketing-card border border-line bg-paper rounded-2xl p-5 md:p-7 flex flex-col gap-3">
                <span className="font-mono text-[11px] text-amber">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-sans font-bold text-ink text-[17px] tracking-[-0.015em]">{step.title}</h3>
                <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection variant="platform" />
    </>
  );
}
