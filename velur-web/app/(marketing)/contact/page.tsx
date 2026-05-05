import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Velur",
  description: "Book a 30-minute discovery call with Velur. No deck. We'll look at your actual data together.",
};

const TIMELINE = [
  { time: "0:00", text: "Quick intro — what your business does" },
  { time: "0:05", text: "Tour of your current analytics setup (you share screen)" },
  { time: "0:15", text: "Where we'd start, what it would cost" },
  { time: "0:25", text: "Q&A — anything you want to ask" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-paper pt-20 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            CONTACT · LET&apos;S TALK
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8"
            style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
          >
            Let&apos;s look at your numbers
            <br />
            together.
          </h1>
          <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
            30 minutes. Your screen, your data. No deck. By the end of the call you&apos;ll know if
            Velur is right for you — or what to do next even if it isn&apos;t.
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
                title="Book a 30-min call with Velur"
              />
              <p className="font-mono text-xs text-muted mt-4 italic">
                [USER ACTION: replace the Cal.com URL above with your real booking link]
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                WHAT TO EXPECT
              </p>
              <div className="space-y-6">
                {TIMELINE.map((item) => (
                  <div key={item.time} className="flex gap-5">
                    <span className="font-mono text-sm text-muted shrink-0 w-10">{item.time}</span>
                    <span className="font-sans text-base text-ink leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-line mt-12 pt-10 space-y-3">
                <p className="font-mono text-xs text-muted">
                  Don&apos;t have time for a call? Email{" "}
                  <a href="mailto:hello@velur.io" className="text-amber hover:underline">
                    hello@velur.io
                  </a>
                </p>
                <p className="font-mono text-xs text-muted">
                  Based in Barcelona. We work async with clients across timezones.
                </p>
                <p className="font-mono text-xs text-muted">
                  We respond within 24 hours, weekdays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
