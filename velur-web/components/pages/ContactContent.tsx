"use client";

import WaitlistForm from "@/components/ui/WaitlistForm";

const TIMELINE = [
  { time: "DAY 0",  text: "You send us the email. We reply same day with a 15-minute call slot." },
  { time: "DAY 1",  text: "We look at your Shopify and ad accounts (read-only) and tell you, honestly, if we can help." },
  { time: "DAY 7",  text: "If yes, the first daily brief lands in your inbox at 8am." },
  { time: "DAY 14", text: "You own the keys — every model, every query, in your repo." },
];

export default function ContactContent() {
  return (
    <>
      <section className="bg-cream pt-14 md:pt-20 pb-12 md:pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-8">
            · Request access
          </span>
          <h1
            className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
          >
            Skip the demo deck. Send us your email.
          </h1>
          <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed max-w-[680px] mt-7">
            We're onboarding three brands this quarter. If you spend on Meta or TikTok and use Higgsfield, MidJourney or Claude in your creative process, we want to talk. No 30-minute &quot;discovery&quot; call. A human reads your reply.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

            <div className="max-w-[640px]">
              <WaitlistForm />
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-5">
                · What happens next
              </p>
              <div className="space-y-5">
                {TIMELINE.map(t => (
                  <div key={t.time} className="grid grid-cols-[72px_1fr] gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ink/65 uppercase pt-0.5">
                      {t.time}
                    </span>
                    <p className="font-sans text-ink text-[15px] leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-line mt-10 pt-6">
                <p className="font-mono text-[11px] tracking-[0.10em] text-ink/65 mb-2 uppercase">
                  Prefer email?
                </p>
                <a href="mailto:hello@velur.io" className="font-sans text-amber hover:underline text-[15px]">
                  hello@velur.io
                </a>
                <p className="font-mono text-[11px] text-ink/55 mt-4 leading-relaxed">
                  Replies within 24 hours, usually faster. We&apos;re in Eastern Time. Slack works too — ask for an invite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
