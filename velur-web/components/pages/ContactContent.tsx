"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <>
      <section className="bg-paper pt-20 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            {c.label}
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8"
            style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
          >
            {c.h1a}
            <br />
            {c.h1b}
          </h1>
          <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
            {c.subhead}
          </p>
        </div>
      </section>

      {/* Cal + sidebar */}
      <section className="bg-cream py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cal embed */}
            <div className="lg:col-span-8">
              <iframe
                src="https://cal.com/velur/30min"
                width="100%"
                height="700"
                frameBorder="0"
                className="rounded-2xl border border-line w-full"
                title={c.iframeTitle}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                {c.whatToExpect}
              </p>
              <div className="space-y-6">
                {c.timeline.map((item) => (
                  <div key={item.time} className="flex gap-5">
                    <span className="font-mono text-sm text-muted shrink-0 w-10">{item.time}</span>
                    <span className="font-sans text-base text-ink leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-line mt-12 pt-10 space-y-3">
                <p className="font-mono text-xs text-muted">
                  {c.noTime}{" "}
                  <a href="mailto:hello@velur.io" className="text-amber hover:underline">
                    hello@velur.io
                  </a>
                </p>
                <p className="font-mono text-xs text-muted">{c.async}</p>
                <p className="font-mono text-xs text-muted">{c.response}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
