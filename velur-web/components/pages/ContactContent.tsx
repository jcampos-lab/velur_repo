"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import WaitlistForm from "@/components/ui/WaitlistForm";

export default function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <>
      <section className="bg-paper pt-16 md:pt-20 pb-12 md:pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-sans text-ink/55 text-[13px] mb-3">
            {c.label}
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}
          >
            {c.h1a} {c.h1b}
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            {c.subhead}
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">

            <div className="lg:col-span-7">
              <WaitlistForm />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-sans text-ink/55 text-[13px] mb-5">
                {c.whatToExpect}
              </p>
              <div className="space-y-5">
                {c.timeline.map((item) => (
                  <div key={item.time} className="flex gap-5">
                    <span className="font-mono text-[12px] text-amber shrink-0 w-12 tracking-[0.06em]">{item.time}</span>
                    <span className="font-sans text-[15px] text-ink/85 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-line mt-10 pt-8 space-y-3">
                <p className="font-sans text-[13px] text-ink/65">
                  {c.noTime}{" "}
                  <a href="mailto:hello@velur.io" className="text-amber hover:underline">
                    hello@velur.io
                  </a>
                </p>
                <p className="font-sans text-[13px] text-ink/65">{c.async}</p>
                <p className="font-sans text-[13px] text-ink/65">{c.response}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
