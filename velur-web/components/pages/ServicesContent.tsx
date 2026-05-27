"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* ─── Hero card ────────────────────────────────────────────────────────── */

function HeroCard() {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-brand-brown text-paper overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[420px]">
        <div className="p-7 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-5">
              Revenue Intelligence
            </p>
            <h1
              className="font-sans font-bold leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              The platform that ties your stack to revenue.
            </h1>
            <p className="font-sans text-paper/75 leading-relaxed text-[15px] md:text-[16px] max-w-md">
              Shopify, Klaviyo, Meta, TikTok and Google Ads connected to one daily brief. We tell you what actually moved money last night, in plain English, before your team is even online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-ink transition-colors"
            >
              Book a call
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center bg-transparent text-paper border border-paper/30 font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-paper/10 transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Right preview */}
        <div className="relative bg-gradient-to-br from-[#3D1E10] via-[#2A1206] to-[#150701] overflow-hidden hidden md:block">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(208,255,176,0.35), transparent 50%), radial-gradient(circle at 75% 75%, rgba(208,255,176,0.25), transparent 50%)",
            }}
          />
          <div className="absolute top-10 left-8 right-12 rounded-xl bg-paper/95 backdrop-blur-sm border border-line/20 p-5 shadow-2xl">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-amber uppercase">
              Today&apos;s brief · 08:02
            </p>
            <p className="font-sans font-bold text-ink text-[16px] leading-tight mt-2">
              Net revenue up 12% week-over-week.
            </p>
            <p className="font-sans text-[12px] text-ink/70 leading-snug mt-2">
              TikTok creator drove 38% of the lift. Klaviyo win-back flow underperformed — pause variant B.
            </p>
          </div>
          <div className="absolute bottom-10 right-10 left-20 rounded-xl bg-[#1A1A1A] border border-amber/20 p-4 shadow-2xl">
            <p className="font-mono text-[9px] tracking-[0.18em] text-amber uppercase mb-2">
              ROAS, blended
            </p>
            <div className="flex items-baseline justify-between">
              <p className="font-sans font-bold text-paper text-[24px] leading-none">3.14×</p>
              <p className="font-mono text-[10px] text-positive">▲ 21.9%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Module cards ─────────────────────────────────────────────────────── */

type Module = {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  bg: string;
  accent: string;
  textTone: "dark" | "light";
};

const MODULES: Module[] = [
  {
    label: "Daily brief",
    title: "An 8am note you can actually act on.",
    body: "Every morning Velur writes you one paragraph: what moved last night, why it moved, what to ship today. Net revenue, MRR, blended ROAS, margin from new creative.",
    bullets: [
      "Net revenue and MRR by channel",
      "Margin from new creative, not clicks",
      "Plain-English note on what changed",
      "Comparison to last week and last month",
    ],
    bg: "bg-paper",
    accent: "text-amber",
    textTone: "dark",
  },
  {
    label: "Attribution",
    title: "iOS14 broke this. We rebuilt it.",
    body: "First-party events, server-side signals, and modeled conversions feeding one CAC and one ROAS per channel, per campaign, per creative. No more arguing with Meta&apos;s number versus Shopify&apos;s number.",
    bullets: [
      "Server-side Meta and TikTok events",
      "Modeled CAC by channel and creative",
      "Margin-adjusted ROAS, not gross",
      "Honest delta vs platform numbers",
    ],
    bg: "bg-brand-beige",
    accent: "text-ink",
    textTone: "dark",
  },
  {
    label: "Cohorts + LTV",
    title: "Retention curves by acquisition channel.",
    body: "Every cohort, every month, by first product and first channel. Find the customer you should pay more to acquire, and the channel that&apos;s selling discount hunters who never come back.",
    bullets: [
      "12-month LTV by acquisition channel",
      "First-product cohort retention",
      "Subscription churn by lifecycle day",
      "Loyalty tier behavior over time",
    ],
    bg: "bg-brand-slate",
    accent: "text-amber",
    textTone: "light",
  },
  {
    label: "Creative intelligence",
    title: "Which post actually sold something.",
    body: "Tag every TikTok, Instagram, and Meta creative with metadata when it ships. We tie views, saves, and clicks back to orders and margin, not just engagement.",
    bullets: [
      "TikTok, Instagram, Meta tracked together",
      "Hook-by-hook revenue, not engagement",
      "Cut list for what to pause this week",
      "Boost list for what is over-performing",
    ],
    bg: "bg-brand-brown",
    accent: "text-amber",
    textTone: "light",
  },
];

function ModuleCard({ m, i, prefersReduced }: { m: Module; i: number; prefersReduced: boolean | null }) {
  const dark = m.textTone === "light";
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: prefersReduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReduced ? undefined : { y: -3 }}
      className={`rounded-3xl ${m.bg} ${dark ? "text-paper" : "text-ink"} border ${dark ? "border-transparent" : "border-line"} p-7 md:p-9 flex flex-col gap-5`}
    >
      <p className={`font-mono text-[10.5px] tracking-[0.18em] uppercase ${m.accent}`}>
        {m.label}
      </p>
      <h3
        className="font-sans font-bold leading-[1.1] tracking-[-0.02em]"
        style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
      >
        {m.title}
      </h3>
      <p className={`font-sans text-[14.5px] leading-relaxed ${dark ? "text-paper/75" : "text-ink/70"}`}>
        {m.body}
      </p>
      <ul className={`mt-2 space-y-2 ${dark ? "" : ""}`}>
        {m.bullets.map(b => (
          <li key={b} className="flex items-start gap-2.5">
            <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
            <span className={`font-sans text-[13.5px] ${dark ? "text-paper/85" : "text-ink/85"}`}>
              {b}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Onboarding strip ─────────────────────────────────────────────────── */

const STEPS = [
  { label: "Day 1",  title: "Plug in your stack.",      body: "Shopify, Klaviyo, Meta, TikTok, plus whichever AI tools you actually use. OAuth or read-only keys." },
  { label: "Day 3",  title: "We backfill 18 months.",   body: "Orders, sessions, ad spend, creative metadata, email events. So your first brief is not reading a week of noise." },
  { label: "Day 7",  title: "First brief lands.",       body: "One paragraph, three numbers, two recommendations. If it is wrong, you reply and we recalibrate the next day." },
  { label: "Day 14", title: "You own the keys.",        body: "Every SQL model, every dashboard, every score function in your repo, under your name. Cancel anytime." },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function ServicesContent() {
  const { t } = useLanguage();
  const s = t.services;
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Hero card */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <HeroCard />
        </div>
      </section>

      {/* Module grid */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              The platform
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
            >
              Four modules. One screen. One decision.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {MODULES.map((m, i) => (
              <ModuleCard key={m.label} m={m} i={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works strip, dark wrapper */}
      <section id="how" className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-3xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-4">
                  Onboarding
                </p>
                <h2
                  className="font-sans font-bold leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Live in fourteen days. Owned by you on day fifteen.
                </h2>
                <p className="font-sans text-paper/75 leading-relaxed mt-5 text-[15px] md:text-[16px] max-w-md">
                  We handle the integrations and the backfill. Your team needs an OAuth approval and twenty minutes on a Wednesday.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-ink transition-colors"
                >
                  Book a discovery call
                </Link>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STEPS.map(step => (
                  <div key={step.label} className="rounded-2xl bg-paper/[0.06] border border-paper/15 p-5">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-amber uppercase mb-3">
                      {step.label}
                    </p>
                    <p className="font-sans font-bold text-paper text-[16px] leading-tight mb-2">
                      {step.title}
                    </p>
                    <p className="font-sans text-[13.5px] text-paper/65 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Good fit / Not for you */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              Who this is for
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
            >
              Honest about the fit.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-paper border border-line p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-2 h-2 rounded-full bg-positive" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-positive uppercase font-semibold">
                  This is for you if
                </p>
              </div>
              <ul className="space-y-3">
                {s.rightForItems.map((g, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#1F7A4D" opacity="0.12" />
                      <path d="M4.5 8.2 L7 10.5 L11.5 5.5" stroke="#1F7A4D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className="font-sans text-[14.5px] text-ink/85 leading-relaxed">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-stone border border-line p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-2 h-2 rounded-full bg-muted" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase font-semibold">
                  This is not for you if
                </p>
              </div>
              <ul className="space-y-3">
                {s.notRightForItems.map((n, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#6E6E6E" opacity="0.12" />
                      <path d="M5 5 L11 11 M11 5 L5 11" stroke="#6E6E6E" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="font-sans text-[14.5px] text-ink/65 leading-relaxed">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-3xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-[420px] h-[420px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(208,255,176,0.22), transparent 65%)", filter: "blur(20px)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
              <div className="max-w-2xl">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-3">
                  Ready when you are
                </p>
                <h3
                  className="font-sans font-bold leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Plug in your stack. Get the first brief in seven days.
                </h3>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center bg-amber text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-paper hover:text-ink transition-colors self-start md:self-auto"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
