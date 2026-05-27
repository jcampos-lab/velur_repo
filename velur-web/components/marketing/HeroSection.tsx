"use client";

import Link from "next/link";

type Persona = {
  name: string;
  attrs: string[];
  active?: boolean;
};

const PERSONAS: Persona[] = [
  {
    name: "DTC SKINCARE BRAND",
    attrs: ["$50K/MO META + TIKTOK", "SHOPIFY + KLAVIYO", "HIGGSFIELD REELS ACTIVE"],
    active: true,
  },
  { name: "SUBSCRIPTION COFFEE", attrs: ["MRR > $200K", "RETENTION DROP > 14 DAYS"] },
  { name: "LOCAL SPA STUDIO",    attrs: ["1 LOCATION", "INSTAGRAM-LED BOOKINGS"] },
];

export default function HeroSection() {
  return (
    <section className="relative bg-cream overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Top: personas on left, flow on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 mb-16 md:mb-24">

          {/* Persona list */}
          <div className="relative pt-2">
            <div className="flex flex-col gap-7">
              {PERSONAS.map((p, i) => (
                <div key={p.name} className={`relative ${p.active ? "" : "opacity-40"}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`inline-block w-[14px] h-[14px] rounded-full ${
                        p.active ? "bg-amber" : "bg-line"
                      }`}
                    />
                    <p className={`font-mono text-[11px] tracking-[0.12em] ${p.active ? "text-amber" : "text-ink"}`}>
                      {p.name}
                    </p>
                  </div>
                  <div className="pl-[22px] space-y-0.5">
                    {p.attrs.map(a => (
                      <p key={a} className="font-mono text-[11px] tracking-[0.10em] text-ink/70">
                        {a}
                      </p>
                    ))}
                  </div>
                  {/* Connector dot to right */}
                  {p.active && (
                    <div className="hidden lg:block absolute left-[18px] top-[18px]">
                      <div className="absolute left-0 top-0 w-px h-12 bg-amber" />
                    </div>
                  )}
                  {i < PERSONAS.length - 1 && (
                    <div className="hidden lg:block absolute left-[6.5px] top-[18px] w-px h-[calc(100%+24px)] bg-line opacity-50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flow on right */}
          <div className="relative">

            {/* Stage labels */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
              <StageLabel>CREATIVE READ</StageLabel>
              <StageLabel>AI BRIEF</StageLabel>
              <StageLabel>REVENUE LIFT</StageLabel>
            </div>

            {/* The three cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <NotificationCard />
              <CreativeCard />
              <CheckoutCard />
            </div>
          </div>
        </div>

        {/* Giant headline */}
        <div className="max-w-[1100px]">
          <h1
            className="font-sans font-bold text-ink leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(56px, 9.5vw, 168px)" }}
          >
            Creative that
            <br />
            actually sold.
          </h1>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="font-sans text-ink/80 leading-snug max-w-[640px] text-lg md:text-xl">
              You spent $40K on creative last month. Your dashboard says engagement is up. Cool. Did any of it sell something? Velur pulls Shopify, Klaviyo, Meta, TikTok and your AI stack — Claude, Higgsfield, MidJourney, ChatGPT — into one feed that tells you which post drove margin. Not views. Margin.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-3.5 rounded-md hover:bg-ink transition-colors"
              >
                Request access →
              </Link>
              <Link
                href="/services"
                className="font-sans text-[15px] text-ink hover:text-amber underline underline-offset-4 decoration-line"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone border border-line">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink/80">{children}</span>
    </span>
  );
}

function NotificationCard() {
  return (
    <div className="rounded-[18px] bg-ink text-white p-4 md:p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 17l5-7 4 5 3-3 6 7H3z" fill="#fff" />
            <circle cx="17" cy="6" r="2" fill="#fff" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-sans font-semibold text-[13px]">Velur · brief</p>
            <p className="font-mono text-[10px] text-white/50">8:02am</p>
          </div>
          <p className="font-sans text-[12.5px] text-white/85 leading-snug mt-1.5">
            Higgsfield reel #4 — &quot;why your serum stopped working&quot; — drove 4.2× CVR vs the last 30 days. Boost it. Cut creative #2; it&apos;s burning $180/day.
          </p>
        </div>
      </div>
    </div>
  );
}

function CreativeCard() {
  return (
    <div className="relative rounded-[18px] overflow-hidden bg-gradient-to-br from-amber via-[#FF7A3D] to-[#FFB088] aspect-[4/5] md:aspect-auto md:min-h-[280px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* Decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-12 -left-8 w-32 h-32 rounded-full bg-ink/15 blur-xl" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 300" fill="none" preserveAspectRatio="none">
          <path d="M0,200 Q60,140 120,180 T240,160 L240,300 L0,300 Z" fill="rgba(0,0,0,0.18)" />
          <path d="M0,230 Q70,180 140,210 T240,200 L240,300 L0,300 Z" fill="rgba(0,0,0,0.12)" />
        </svg>
      </div>

      <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
        <p className="font-mono text-[10px] tracking-[0.14em] text-white/90 uppercase mb-2">
          Higgsfield · Reel draft
        </p>
        <p className="font-sans font-bold text-white text-[20px] md:text-[22px] leading-[1.05] mb-3">
          Why your serum stopped working
        </p>
        <button className="self-start inline-flex items-center bg-white/95 text-ink font-sans font-semibold text-[12.5px] px-3 py-1.5 rounded-md hover:bg-white">
          Ship to TikTok
        </button>
      </div>
    </div>
  );
}

function CheckoutCard() {
  return (
    <div className="rounded-[18px] bg-paper border border-line p-4 md:p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-sans font-semibold text-ink text-[14px]">This week</p>
        <span className="font-mono text-[10px] text-positive">+18.4%</span>
      </div>
      <div className="space-y-2.5">
        <Row label="TikTok organic" value="$24,512" />
        <Row label="Meta paid" value="$11,338" />
        <Row label="Klaviyo flows" value="$8,907" />
      </div>
      <div className="border-t border-line mt-3 pt-3 flex items-center justify-between">
        <p className="font-sans text-ink text-[14px]">Margin from new creative</p>
        <p className="font-sans font-bold text-amber text-[18px]">$44,757</p>
      </div>
      <div className="mt-3 flex items-center justify-center bg-ink text-paper rounded-md py-2 font-sans font-semibold text-[13px]">
        View today&apos;s brief
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-sans text-ink/75 text-[13px]">{label}</p>
      <p className="font-sans font-medium text-ink text-[13px]">{value}</p>
    </div>
  );
}
