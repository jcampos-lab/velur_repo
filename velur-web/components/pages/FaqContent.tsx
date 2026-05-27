"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "The basics",
    items: [
      {
        q: "What does Velur actually do?",
        a: "Velur reads your Shopify, Klaviyo, ad accounts and the creative coming out of your AI tools — Higgsfield, MidJourney, Claude, ChatGPT. Every morning at 8am we send you one paragraph: what moved, why, and what to ship. You get a small dashboard on the side, but the brief is the product.",
      },
      {
        q: "Are you an agency?",
        a: "No. We won't run your ads. We won't write your brand book. We tell you, in plain English, which creative paid for itself and which one is leaking margin — then we leave you alone to ship.",
      },
      {
        q: "How is this different from Triple Whale or Northbeam?",
        a: "Those are dashboards. Velur is a daily decision. We read the same data they do — and a lot of data they don't, like the creative coming out of Higgsfield — and turn it into one paragraph a human can act on. If you love opening tabs, stay with them.",
      },
    ],
  },
  {
    title: "Tools and data",
    items: [
      {
        q: "Which platforms do you connect to?",
        a: "Shopify, Klaviyo, Meta Ads, TikTok Ads, Google Ads, GA4. On the creative side: Higgsfield, MidJourney, Claude, ChatGPT — directly via API where the tools allow it, and via simple folder uploads where they don't.",
      },
      {
        q: "How long does setup take?",
        a: "Day 1 you plug in OAuth. Day 3 we finish backfilling 18 months. Day 7 the first brief lands. Day 14 every SQL model and dashboard config is in your repo, under your name.",
      },
      {
        q: "Do I need a data team?",
        a: "No. The whole point is that you don't. If you have one, even better — they get the SQL and can extend it. If you don't, the daily brief is enough.",
      },
    ],
  },
  {
    title: "Creative and AI",
    items: [
      {
        q: "How do you score creative from Higgsfield or MidJourney?",
        a: "We tag every asset with metadata when it ships, then watch how it performs on TikTok, Instagram and Meta — clicks, watch time, attributed revenue, margin. A Reel that gets 500K views but zero conversions ranks below a 12K-view one that drove 40 orders. Views are not the answer.",
      },
      {
        q: "Will Velur write my ad copy?",
        a: "We don't write copy for you. We do tell Claude, from your data, which angles worked in the last 60 days — so your copywriter (or Claude prompt) starts from the winners instead of a blank page.",
      },
      {
        q: "What if my creative is mostly TikTok organic, not paid?",
        a: "Good. We track organic the same way — saves, shares, comments, profile visits, and the bookings or orders that land in the 72 hours after. Cami Lab Studio (our spa client) runs almost entirely on organic Higgsfield reels and we score every one of them.",
      },
    ],
  },
  {
    title: "Pricing and trust",
    items: [
      {
        q: "How much does this cost?",
        a: "Early access pricing is locked when you join the waitlist. We don't publish a number on the site because the right one depends on how many data sources and how much creative volume you're producing. Email us — we'll quote you on the first call.",
      },
      {
        q: "What if I cancel?",
        a: "Cancel any month. Everything we built — SQL models, scoring functions, dashboard configs — sits in your repo, under your account. The brief stops. Your reporting doesn't.",
      },
      {
        q: "Will you use my data to train anything?",
        a: "No. Your data trains your scoring model, full stop. We don't pool it with other clients, we don't sell it, and we don't use it to make some industry benchmark deck we then sell back to you.",
      },
    ],
  },
];

function AccordionItem({
  q, a, open, onToggle,
}: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 md:py-6 text-left group"
      >
        <span className="font-sans font-semibold text-ink leading-snug text-[16px] md:text-[18px] group-hover:text-amber transition-colors">
          {q}
        </span>
        <span className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full border border-line group-hover:border-amber group-hover:text-amber text-ink/60 transition-colors">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {open ? (
              <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <>
                <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 md:pb-6 pr-6 md:pr-10">
          <p className="font-sans text-ink/75 text-[15px] leading-[1.7] max-w-[820px]">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqContent() {
  const [openId, setOpenId] = useState<string | null>("0-0");
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <>
      <section className="bg-cream pt-14 md:pt-20 pb-16 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-8">
            · FAQ
          </span>
          <h1
            className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
          >
            Honest answers, not boilerplate.
          </h1>
          <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed max-w-[680px] mt-7">
            If you can&apos;t find what you need here, email us at <a href="mailto:hello@velur.io" className="text-amber hover:underline">hello@velur.io</a>. A human reads it.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-2">
                {CATEGORIES.map((c, ci) => (
                  <a
                    key={c.title}
                    href={`#cat-${ci}`}
                    className="block font-mono text-[11px] tracking-[0.14em] text-ink/65 hover:text-amber uppercase py-1.5"
                  >
                    <span className="opacity-50 mr-2">{String(ci + 1).padStart(2, "0")}</span>
                    {c.title}
                  </a>
                ))}
              </div>
            </aside>

            <div className="space-y-12">
              {CATEGORIES.map((c, ci) => (
                <div key={c.title} id={`cat-${ci}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-sans font-bold text-ink text-[20px] md:text-[24px] tracking-[-0.02em]">
                      {c.title}
                    </h2>
                    <div className="flex-1 h-px bg-line" />
                  </div>
                  <div className="border-t border-line">
                    {c.items.map((item, ii) => {
                      const id = `${ci}-${ii}`;
                      return (
                        <AccordionItem
                          key={id}
                          q={item.q}
                          a={item.a}
                          open={openId === id}
                          onToggle={() => toggle(id)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24 border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h2
                className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.03em] max-w-[640px]"
                style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
              >
                Still have something to ask?
              </h2>
              <p className="font-sans text-ink/75 text-[16px] leading-relaxed mt-4 max-w-[560px]">
                We reply same day. No demo deck. No 30-minute &quot;discovery&quot; call unless you want one.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-4 rounded-md hover:bg-ink transition-colors"
            >
              Request access →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
