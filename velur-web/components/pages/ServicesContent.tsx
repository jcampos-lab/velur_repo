"use client";

import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import MarqueeCarousel from "@/components/marketing/MarqueeCarousel";
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
      <section className="bg-paper pt-20 pb-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                {s.label}
              </p>
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8"
                style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
              >
                {s.h1a}
                <br />{s.h1b}
              </h1>
              <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
                {s.subhead}
              </p>
            </div>
            <div className="hidden lg:flex justify-end pointer-events-none select-none" aria-hidden>
              <div className="w-full max-w-[600px]">
                <KpiDashboardChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <div className="bg-cream divide-y divide-line border-t border-b border-line">
        {s.modules.map((m, idx) => (
          <div key={idx} className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">
                  {String(idx + 1).padStart(2, "0")} / {m.label}
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.03em] mb-6"
                  style={{ fontSize: "clamp(26px, 3vw, 48px)" }}
                >
                  {m.heading}
                </h2>
                <p className="font-sans text-lg text-ink leading-relaxed mb-8">{m.body}</p>
                <Button href="/contact" variant="light" size="md">
                  {s.demoBtn}
                </Button>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="border border-line bg-paper rounded-[16px] p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">
                    {s.includedLabel}
                  </p>
                  <ul className="space-y-3">
                    {m.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-muted mt-1 shrink-0">
                          {String(i + 1).padStart(2, "0")} ·
                        </span>
                        <span className="font-sans text-base text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data pipeline flow */}
      <section className="bg-cream py-16 border-y border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="pointer-events-none select-none" aria-hidden>
            <DataPipelineFlow />
          </div>
        </div>
      </section>

      <MarqueeCarousel />

      {/* How it works */}
      <section className="bg-paper py-14 md:py-24 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left={s.howLabel} right={s.howRight} className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {s.steps.map((step, i) => (
              <div key={i} className="border border-line bg-paper rounded-[16px] p-5 md:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {i < s.steps.length - 1 && <div className="flex-1 h-px bg-line hidden lg:block" />}
                </div>
                <h3 className="font-sans font-bold text-ink text-xl">{step.title}</h3>
                <p className="font-sans text-base text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection variant="platform" />
    </>
  );
}
