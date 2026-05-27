"use client";

import Link from "next/link";

const TOOLS = [
  { name: "Shopify",   role: "orders + margin" },
  { name: "Klaviyo",   role: "flows + LTV" },
  { name: "Meta Ads",  role: "spend + CPM" },
  { name: "TikTok",    role: "creative + saves" },
  { name: "Higgsfield",role: "reel drafts" },
  { name: "MidJourney",role: "static creative" },
  { name: "Claude",    role: "email + brand copy" },
  { name: "ChatGPT",   role: "ad angle tests" },
];

const PROMISE = "You'll know which creative made money before lunch. If you don't, we refund the month — no calls.";

export default function IntelligenceSection() {
  return (
    <section className="relative bg-[#0E0E0E] text-paper overflow-hidden">
      {/* Dot grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #888 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Decorative connector */}
      <svg
        aria-hidden
        className="absolute top-0 right-[8%] h-full pointer-events-none opacity-60"
        viewBox="0 0 200 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M100,0 L100,260 Q100,300 60,300 L20,300"
          stroke="#FF5B1A"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">

        <p className="font-mono text-[11px] tracking-[0.18em] text-amber mb-10 uppercase">
          · The platform
        </p>

        <h2
          className="font-sans font-bold leading-[0.94] tracking-[-0.04em] max-w-[1100px]"
          style={{ fontSize: "clamp(48px, 7.5vw, 124px)" }}
        >
          The intelligence
          <br />
          behind every dollar
          <br />
          you spend on creative.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 mt-16 md:mt-24 items-start">

          {/* Left: explainer + tools */}
          <div>
            <p className="font-sans text-paper/85 text-lg md:text-xl leading-relaxed max-w-[640px] mb-10">
              Data tells you what happened. Creative — MidJourney, Higgsfield, Claude — changes what happens next. Velur connects both. Reads your stack, scores every asset against revenue and margin, and pushes a daily brief that a human can actually act on. We are not an agency. We will not run your ads. We will tell you, every morning, what your numbers are quietly trying to say.
            </p>

            <p className="font-mono text-[11px] tracking-[0.16em] text-paper/50 mb-5 uppercase">
              What we read
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-[640px]">
              {TOOLS.map(t => (
                <div
                  key={t.name}
                  className="rounded-md border border-paper/15 bg-paper/[0.04] px-3.5 py-2.5 hover:border-amber transition-colors"
                >
                  <p className="font-sans font-semibold text-paper text-[13px]">{t.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.06em] text-paper/55 mt-0.5">
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the one promise card */}
          <div className="rounded-2xl border border-amber/40 bg-amber/[0.06] p-6 md:p-7 backdrop-blur-sm">
            <p className="font-mono text-[10px] tracking-[0.16em] text-amber uppercase mb-3">
              The one promise
            </p>
            <p className="font-sans font-semibold text-paper text-[22px] md:text-[24px] leading-[1.2] mb-5">
              {PROMISE}
            </p>
            <p className="font-sans text-paper/70 text-[14px] leading-snug mb-6">
              One real guarantee. Not three safe ones. We won&apos;t fix your brand. We won&apos;t hand you a strategy deck. We will hand you the next decision.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[14px] px-5 py-3 rounded-md hover:bg-paper hover:text-ink transition-colors"
            >
              Request access →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
