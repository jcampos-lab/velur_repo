"use client";

import Link from "next/link";

const MODULES = [
  {
    label: "Daily Brief",
    title: "An 8am note you can actually act on.",
    body:
      "Every morning Velur writes you one paragraph: what moved last night, why it moved, what to ship today. Net revenue, MRR, blended ROAS, margin from new creative. No tabs to reconcile.",
    bullets: [
      "Net revenue and MRR by channel",
      "Margin from new creative, not just clicks",
      "Plain-English note on what changed",
      "Comparison to last week and last month",
    ],
  },
  {
    label: "Creative Intelligence",
    title: "Which post actually sold something.",
    body:
      "Velur reads what Higgsfield, MidJourney and your editor are producing, scores it against Shopify revenue and Klaviyo behavior, and tells you the three creatives worth boosting — and the two quietly draining your day budget.",
    bullets: [
      "TikTok, Instagram, Meta and YouTube creative tracked together",
      "Higgsfield reel drafts ranked by predicted CVR",
      "Hook-by-hook revenue, not just engagement",
      "Cut list — what to pause this week",
    ],
  },
  {
    label: "Attribution",
    title: "iOS14 broke this. We rebuilt it.",
    body:
      "First-party events, server-side signals, and modeled conversions feeding one CAC and one ROAS per channel, per campaign, per creative. No more arguing with Meta's number versus Shopify's number.",
    bullets: [
      "Server-side Meta and TikTok events",
      "Modeled CAC by channel and creative",
      "Margin-adjusted ROAS, not gross",
      "Honest delta vs platform-reported numbers",
    ],
  },
  {
    label: "Cohorts & LTV",
    title: "Retention curves, by acquisition channel.",
    body:
      "Every cohort, every month, by first product and first channel. Find the customer you're worth acquiring twice. Find the channel that's selling you discount hunters who never come back.",
    bullets: [
      "12-month LTV by acquisition channel",
      "First-product cohort retention",
      "Subscription churn by lifecycle day",
      "Loyalty tier behavior over time",
    ],
  },
];

const GOOD_FIT = [
  "You're doing $3M–$50M and your reporting is still Google Sheets glued to a Triple Whale tab.",
  "You spend on Meta, TikTok or Klaviyo and you can't tell which creative actually paid for itself.",
  "You use Higgsfield, MidJourney, Claude or ChatGPT for marketing — but nothing tells you which output drove revenue.",
  "You'd rather own your dashboards and SQL than rent another SaaS that locks them up.",
];

const NOT_FIT = [
  "You want an agency to run your ads. We won't.",
  "You expect a strategy deck. We hand you decisions, not slides.",
  "You're pre-revenue and need a brand. Come back when you have data worth reading.",
  "You want every metric the industry has ever invented on one screen. We pick the three that matter.",
];

const STEPS = [
  {
    label: "Day 1",
    title: "Plug in your stack.",
    body: "Shopify, Klaviyo, Meta, TikTok, plus whichever AI tools you actually use. OAuth or read-only keys. No engineering team needed on your side.",
  },
  {
    label: "Day 3",
    title: "We backfill 18 months.",
    body: "Orders, sessions, ad spend, creative metadata, email events. So your first brief isn't reading off a week of noise.",
  },
  {
    label: "Day 7",
    title: "First brief lands at 8am.",
    body: "One paragraph, three numbers, two recommendations. If it's wrong, you reply to the email and we recalibrate the next day.",
  },
  {
    label: "Day 14",
    title: "You own the keys.",
    body: "Every SQL model, every dashboard, every score function — in your repo, under your name. Cancel tomorrow, nothing breaks.",
  },
];

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-14 md:pt-20 pb-16 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-8">
            · Platform
          </span>
          <h1
            className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
          >
            Read your stack. Ship the next decision.
          </h1>
          <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed max-w-[680px] mt-7">
            Velur connects Shopify, Klaviyo, Meta, TikTok and your AI tools — Claude, Higgsfield, MidJourney, ChatGPT — into one read-only intelligence layer. No new dashboard to learn. Just a daily note that tells you what to do.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-3.5 rounded-md hover:bg-ink transition-colors"
            >
              Request access →
            </Link>
            <Link
              href="/faq"
              className="font-sans text-[15px] text-ink hover:text-amber underline underline-offset-4 decoration-line"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-paper">
        {MODULES.map((m, i) => (
          <div key={m.label} className={`${i % 2 === 1 ? "bg-cream" : "bg-paper"} border-b border-line`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-16">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
                    · {m.label}
                  </p>
                  <h2
                    className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-5"
                    style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
                  >
                    {m.title}
                  </h2>
                  <p className="font-sans text-ink/75 text-lg leading-relaxed max-w-[600px]">
                    {m.body}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-stone p-6 md:p-7">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink/55 uppercase mb-4">
                    What's in it
                  </p>
                  <ul className="space-y-3">
                    {m.bullets.map(b => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                        <span className="font-sans text-ink text-[15px] leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Good fit / not fit */}
      <section className="bg-paper py-20 md:py-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-12 md:mb-14 max-w-[820px]"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
          >
            Honest about who we're for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-line rounded-2xl overflow-hidden">
            <div className="p-7 md:p-10 border-b md:border-b-0 md:border-r border-line bg-cream">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-positive" />
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink/65 uppercase">Good fit</p>
              </div>
              <ul className="space-y-4">
                {GOOD_FIT.map((g, i) => (
                  <li key={i} className="font-sans text-ink text-[15.5px] leading-relaxed">{g}</li>
                ))}
              </ul>
            </div>
            <div className="p-7 md:p-10 bg-stone">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-ink/40" />
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink/65 uppercase">Not us</p>
              </div>
              <ul className="space-y-4">
                {NOT_FIT.map((n, i) => (
                  <li key={i} className="font-sans text-ink/70 text-[15.5px] leading-relaxed">{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream py-20 md:py-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
            · How onboarding works
          </p>
          <h2
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] mb-12 max-w-[820px]"
            style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
          >
            Live in 14 days. Owned by you on day 15.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.label} className="rounded-2xl border border-line bg-paper p-5 md:p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-amber uppercase">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-ink text-[19px] leading-tight">{s.title}</h3>
                <p className="font-sans text-ink/70 text-[14.5px] leading-snug">{s.body}</p>
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
                · Ready when you are
              </p>
              <h2
                className="font-sans font-bold leading-[1.0] tracking-[-0.03em] max-w-[700px]"
                style={{ fontSize: "clamp(28px, 3.6vw, 56px)" }}
              >
                You spent $40K on creative last month. Find out which $4K paid for itself.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-4 rounded-md hover:bg-paper hover:text-ink transition-colors self-start md:self-end"
            >
              Request access →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
