"use client";

import Link from "next/link";

const PRINCIPLES = [
  {
    title: "We are not an agency.",
    body:
      "We will not run your ads. We will not write your brand strategy. We hand you the next decision, then leave you alone to ship it.",
  },
  {
    title: "You own everything.",
    body:
      "Every SQL model, every score function, every dashboard sits in your repo, under your name, from day one. Cancel any month and nothing disappears.",
  },
  {
    title: "Pick three numbers.",
    body:
      "Most dashboards drown founders in 80 metrics. We surface the three that decide your quarter and explain — in plain English — why they moved.",
  },
];

const STACK = [
  { label: "BUILT WITH",        value: "Postgres · dbt · Next.js · Claude API · Higgsfield API" },
  { label: "PIPES INTO",        value: "Shopify · Klaviyo · Meta Ads · TikTok Ads · GA4" },
  { label: "DELIVERED VIA",     value: "Email at 8am · Slack at 8:01 · One read-only dashboard" },
  { label: "HOSTED ON",         value: "Your AWS, your Vercel, or ours" },
];

const ROADMAP = [
  { when: "NOW",       text: "Onboarding three founder-led brands in early access. One DTC skincare line, one coffee subscription, and Cami Lab Studio — a spa in Florida testing Higgsfield reels weekly." },
  { when: "Q3 2026",   text: "Open beta. Pricing locked at the founder rate for anyone who joined in early access." },
  { when: "Q4 2026",   text: "Native creative scoring for Instagram + TikTok using the same model Velur runs on Higgsfield drafts." },
  { when: "2027",      text: "Open the SQL and the scoring models. If you want to fork it, fork it. We'd rather be useful than proprietary." },
];

export default function CompanyContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-14 md:pt-20 pb-16 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-8">
            · Company
          </span>
          <h1
            className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
          >
            Built by founders who got tired of guessing.
          </h1>
          <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed max-w-[680px] mt-7">
            Velur was started after one too many Tuesdays of staring at three dashboards that all disagreed about the same week. We're a small team — operators, not consultants — building the daily brief we wished we'd had when we were running ads ourselves.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-paper py-20 md:py-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
            · How we operate
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-12 max-w-[820px]"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
          >
            Three things we're done apologizing for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-line bg-cream p-6 md:p-7 flex flex-col gap-4 min-h-[260px]">
                <span className="font-mono text-[10px] tracking-[0.14em] text-amber uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans font-bold text-ink text-[22px] md:text-[24px] leading-[1.15]">
                  {p.title}
                </h3>
                <p className="font-sans text-ink/75 text-[15px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="bg-[#0E0E0E] text-paper py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
                · The build
              </p>
              <h2
                className="font-sans font-bold leading-[1.05] tracking-[-0.03em] max-w-[600px]"
                style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
              >
                Boring tech where it matters. New tech where it pays.
              </h2>
              <p className="font-sans text-paper/75 text-[16px] leading-relaxed mt-6 max-w-[520px]">
                Postgres and dbt for the math — proven, debuggable, fast. Claude and Higgsfield for the parts that change weekly. We will not be the team that breaks your reporting because we wanted to ship a Rust rewrite.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="divide-y divide-paper/10 border-t border-paper/10">
                {STACK.map(row => (
                  <div key={row.label} className="py-5 grid grid-cols-[140px_1fr] gap-6">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-amber uppercase">
                      {row.label}
                    </span>
                    <span className="font-sans text-paper/85 text-[15px] leading-snug">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-cream py-20 md:py-24 border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
            · Where we're going
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-12 max-w-[820px]"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
          >
            Boring plan. Loud results.
          </h2>
          <div className="space-y-6 max-w-[820px]">
            {ROADMAP.map(r => (
              <div key={r.when} className="grid grid-cols-[100px_1fr] gap-4 md:gap-6 border-b border-line pb-5">
                <span className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase pt-1">
                  {r.when}
                </span>
                <p className="font-sans text-ink text-[16px] md:text-[17px] leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="rounded-2xl bg-ink text-paper p-8 md:p-12 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <div className="flex-1">
              <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-3">
                · Talk to us
              </p>
              <h2
                className="font-sans font-bold leading-[1.0] tracking-[-0.03em] max-w-[680px]"
                style={{ fontSize: "clamp(28px, 3.6vw, 56px)" }}
              >
                We pick up the phone. That part hasn't changed.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-4 rounded-md hover:bg-paper hover:text-ink transition-colors self-start md:self-end"
            >
              Start the conversation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
