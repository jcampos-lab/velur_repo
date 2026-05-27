"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

/* ───────── Featured course ─────────────────────────────────────────── */

function FeaturedCourse() {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-[#2A1206] text-paper overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[400px]">
        <div className="p-7 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-4">
              Flagship course
            </p>
            <h3
              className="font-sans font-bold leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}
            >
              Branded AI Editing Course
            </h3>
            <p className="font-sans text-paper/75 leading-relaxed text-[15px] md:text-[16px] max-w-md">
              The exact workflow we use to ship video and image creative for Cami Lab Studio. Higgsfield prompt structure, MidJourney recipes, Claude voice prompts, and the brief that holds them all together.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors"
          >
            Learn more →
          </Link>
        </div>

        {/* Preview area: stacked abstract panels */}
        <div className="relative bg-gradient-to-br from-[#3D1E10] via-[#2A1206] to-[#1A0A03] overflow-hidden hidden md:block">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,91,26,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,176,136,0.3), transparent 50%)",
          }} />
          <div className="absolute top-12 left-8 right-12 bottom-8 rounded-xl bg-gradient-to-br from-[#5B3522] to-[#3D1E10] border border-amber/20 p-5 flex flex-col justify-between shadow-2xl">
            <p className="font-mono text-[10px] tracking-[0.18em] text-amber/80 uppercase">
              Chapter 04
            </p>
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-paper/55 uppercase mb-1">
                Lesson
              </p>
              <p className="font-sans font-bold text-paper text-[20px] leading-tight">
                AI Content Creation
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-28 rounded-xl bg-gradient-to-br from-paper/95 to-paper/85 backdrop-blur-sm border border-line/30 p-3 rotate-[6deg] shadow-2xl">
            <p className="font-mono text-[9px] tracking-[0.18em] text-ink/55 uppercase">
              Reel Prompt
            </p>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 bg-ink/15 rounded-full w-full" />
              <div className="h-1 bg-ink/15 rounded-full w-3/4" />
              <div className="h-1 bg-amber/60 rounded-full w-5/6" />
              <div className="h-1 bg-ink/15 rounded-full w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────── Two cards: Guide + Prompt Packs ─────────────────────────── */

function GuideAndPacks() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

      {/* Guide */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-[#3F5772] text-paper overflow-hidden flex flex-col"
      >
        <div className="p-7 md:p-9 flex flex-col gap-5">
          <h3
            className="font-sans font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            Velur AI Starter Guide
          </h3>
          <p className="font-sans text-paper/80 leading-relaxed text-[14.5px] md:text-[15.5px]">
            How to generate aesthetic, brand-consistent images and short clips using AI. Written for small-business owners who want to skip the trial-and-error and ship usable assets on day one.
          </p>
          <Link
            href="/contact"
            className="self-start inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors"
          >
            Learn more →
          </Link>
        </div>

        {/* Book mock */}
        <div className="relative flex-1 min-h-[180px] md:min-h-[220px] mt-2">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[140px] md:w-[170px] aspect-[3/4] bg-paper rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-stone p-3 flex flex-col gap-1.5 h-full">
              <p className="font-sans font-bold text-ink text-[14px] leading-tight">
                Branded AI<br />Guide
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1 flex-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      background: i % 4 === 0 ? "#FF5B1A" : i % 3 === 0 ? "#1A1A1A" : "#D9D6CF",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
              <p className="font-mono text-[7px] text-ink/45 tracking-wider uppercase mt-1">
                Mobile editing playbook
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prompt Packs */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-[#EFE9DE] text-ink overflow-hidden flex flex-col"
      >
        <div className="p-7 md:p-9 flex flex-col gap-5">
          <h3
            className="font-sans font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            Prompt Packs
          </h3>
          <p className="font-sans text-ink/70 leading-relaxed text-[14.5px] md:text-[15.5px]">
            Field-tested prompts for the categories we actually work in. Spa, beauty, hospitality, DTC products. Drop them straight into MidJourney or Higgsfield and edit from there.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[13.5px] px-4 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors"
            >
              Spa pack
            </Link>
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[13.5px] px-4 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors"
            >
              DTC pack
            </Link>
          </div>
        </div>

        {/* Pack stack mock */}
        <div className="relative flex-1 min-h-[180px] md:min-h-[220px]">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-end gap-[-20px]">
            <div className="w-[130px] aspect-[3/4] bg-[#2A1206] text-paper rounded-lg shadow-2xl p-3 -rotate-6 -mr-6">
              <p className="font-sans font-bold text-[12px] leading-tight">100+ Beauty Shots</p>
              <p className="font-serif italic text-[10px] text-paper/70 mt-0.5">Prompt Pack</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-gradient-to-br from-[#FFB088] to-[#FF5B1A] opacity-90" />
                ))}
              </div>
            </div>
            <div className="w-[130px] aspect-[3/4] bg-[#2A1206] text-paper rounded-lg shadow-2xl p-3 rotate-3 relative z-10">
              <p className="font-sans font-bold text-[12px] leading-tight">100+ Spa & Studio</p>
              <p className="font-serif italic text-[10px] text-paper/70 mt-0.5">Prompt Pack</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-gradient-to-br from-[#D9CFB9] to-[#6E6E6E] opacity-90" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── Prompt pack grid ────────────────────────────────────────── */

const PACKS = [
  { title: "Spa & Studio",       count: "100+ prompts", tone: "from-[#D9CFB9] to-[#8B7E66]", textOnDark: false },
  { title: "Beauty Shots",       count: "100+ prompts", tone: "from-[#FFB088] to-[#FF5B1A]", textOnDark: true  },
  { title: "DTC Products",       count: "100+ prompts", tone: "from-[#2A2A2A] to-[#0A0A0A]", textOnDark: true  },
  { title: "Hospitality",        count:  "80+ prompts", tone: "from-[#3F5772] to-[#1F2B3A]", textOnDark: true  },
  { title: "Reel Hooks",         count: "50+ scripts",  tone: "from-[#7C3AED] to-[#3F1F8A]", textOnDark: true  },
  { title: "Email Voice",        count: "50+ prompts",  tone: "from-[#10A37F] to-[#0A6B53]", textOnDark: true  },
];

function PackGrid() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {PACKS.map((p, i) => (
        <motion.div
          key={p.title}
          initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: prefersReduced ? 0 : i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={prefersReduced ? undefined : { y: -3 }}
          className="rounded-2xl bg-paper border border-line overflow-hidden flex flex-col"
        >
          <div className={`aspect-[5/4] bg-gradient-to-br ${p.tone} relative p-5 flex items-end`}>
            <div className="grid grid-cols-3 gap-1.5 absolute top-5 right-5 left-5 opacity-30">
              {Array.from({ length: 9 }).map((_, j) => (
                <div key={j} className={`aspect-square rounded-sm ${p.textOnDark ? "bg-white/40" : "bg-ink/30"}`} />
              ))}
            </div>
            <div className="relative">
              <p className={`font-mono text-[10px] tracking-[0.18em] uppercase ${p.textOnDark ? "text-white/80" : "text-ink/60"}`}>
                {p.count}
              </p>
              <p className={`font-sans font-bold text-[22px] leading-tight mt-1 ${p.textOnDark ? "text-white" : "text-ink"}`}>
                {p.title}
              </p>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <p className="font-sans text-[14px] text-ink/70 leading-relaxed">
              Tested on real clients. Edit the brand notes at the top, paste into your AI tool of choice, ship the asset.
            </p>
            <Link
              href="/contact"
              className="self-start font-sans font-semibold text-[13.5px] text-amber hover:underline underline-offset-4"
            >
              Request access →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Testimonials ────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    quote: "We finally post on a rhythm without burning out. The AI workflow gives us three week's worth of usable creative in an afternoon.",
    name: "Camila",
    role: "Spa owner, Cami Lab Studio",
    initial: "C",
    bg: "#FFB088",
  },
  {
    quote: "Replaced our product shoot for two collections. The MidJourney recipes alone paid for the whole engagement in week one.",
    name: "Marc R.",
    role: "DTC apparel owner",
    initial: "M",
    bg: "#3F5772",
  },
  {
    quote: "I went from staring at Higgsfield wondering what to type to publishing reels that actually book appointments.",
    name: "Sara V.",
    role: "Clinic owner",
    initial: "S",
    bg: "#FF5B1A",
  },
  {
    quote: "Alex actually picks up the phone. That alone made him different from every other agency we talked to.",
    name: "Diego T.",
    role: "Coffee subscription founder",
    initial: "D",
    bg: "#2A1206",
  },
  {
    quote: "The prompt packs cut our brief-to-asset time by 70%. Our designer finally has time to actually design.",
    name: "Nora P.",
    role: "Brand lead, beauty startup",
    initial: "N",
    bg: "#10A37F",
  },
  {
    quote: "We had no business in-house creative team. Now we ship better content than agencies five times our size.",
    name: "Lars F.",
    role: "E-commerce founder",
    initial: "L",
    bg: "#7C3AED",
  },
];

function Testimonials() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: prefersReduced ? 0 : i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="rounded-2xl bg-paper border border-line p-5 md:p-6 flex flex-col gap-4"
        >
          <p className="font-sans text-[14.5px] text-ink leading-relaxed flex-1">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex w-9 h-9 rounded-full items-center justify-center text-white font-sans font-bold text-[13px]"
              style={{ background: t.bg }}
            >
              {t.initial}
            </span>
            <div>
              <p className="font-sans font-semibold text-ink text-[14px] leading-tight">{t.name}</p>
              <p className="font-sans text-[12.5px] text-ink/55">{t.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Fit comparison ──────────────────────────────────────────── */

const GOOD_FIT = [
  "You run a small business or DTC brand and you do most of the marketing yourself",
  "You already use AI tools but want a system that produces consistent, on-brand output",
  "You need creative that books appointments or sells products, not awards",
  "You want a real human to talk to, not a Slack bot",
];

const NOT_FOR = [
  "You are looking for a generic AI consultant with no industry focus",
  "You expect 10,000 follower growth in a week without paying for ads",
  "You want to outsource your brand identity to a model with zero input",
  "You need a 100-person agency relationship for enterprise work",
];

function FitSection() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-paper border border-line p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-block w-2 h-2 rounded-full bg-positive" />
          <p className="font-mono text-[11px] tracking-[0.16em] text-positive uppercase font-semibold">
            This is for you if
          </p>
        </div>
        <ul className="space-y-3">
          {GOOD_FIT.map((g, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                <circle cx="8" cy="8" r="8" fill="#1F7A4D" opacity="0.12" />
                <path d="M4.5 8.2 L7 10.5 L11.5 5.5" stroke="#1F7A4D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="font-sans text-[14.5px] text-ink/85 leading-relaxed">{g}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-stone border border-line p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-block w-2 h-2 rounded-full bg-muted" />
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase font-semibold">
            This is not for you if
          </p>
        </div>
        <ul className="space-y-3">
          {NOT_FOR.map((n, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                <circle cx="8" cy="8" r="8" fill="#6E6E6E" opacity="0.12" />
                <path d="M5 5 L11 11 M11 5 L5 11" stroke="#6E6E6E" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="font-sans text-[14.5px] text-ink/65 leading-relaxed">{n}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ───────── FAQ ─────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "Does this actually look professional or like obvious AI?",
    a: "Both have happened. The packs and the course teach you how to control output so it looks like real photography, with brand-consistent props, lighting, and composition. The first attempts will look AI. By week two they shouldn't.",
  },
  {
    q: "Can I use this material to train AI?",
    a: "No. The prompts and templates are licensed for your direct use, not as training data for other models. We are a small team and we ask that you respect this.",
  },
  {
    q: "What if I do not match the categories you cover?",
    a: "Reach out. We have shipped work for spa, beauty, jewelry, hospitality, DTC apparel, food and drink, and coffee subscriptions. If your niche is close to one of those, we can adapt the prompt structure on a call.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most clients ship their first usable asset on day one with the starter guide. Real revenue impact, defined as a campaign that pays for itself, typically lands within four to six weeks.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. If you can copy and paste, and if you have credit on Higgsfield or MidJourney, you have everything you need.",
  },
  {
    q: "What if I do not like the first assets?",
    a: "We iterate together on the first batch. The Discovery Call exists exactly so we can both decide if the fit is right before any money changes hands.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-3xl bg-paper border border-line overflow-hidden">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i < FAQS.length - 1 ? "border-b border-line" : ""}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-sans font-semibold text-ink text-[15px] md:text-[16.5px] leading-snug">
                {f.q}
              </span>
              <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-line text-ink/60">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  {isOpen ? (
                    <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  ) : (
                    <>
                      <line x1="5.5" y1="2" x2="5.5" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 md:px-8 pb-5 md:pb-6">
                <p className="font-sans text-[14.5px] text-ink/75 leading-relaxed max-w-3xl">
                  {f.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Page ────────────────────────────────────────────────────── */

export default function StudioContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-amber uppercase mb-6">
            Velur AI Studio
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[1.02] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(30px, 5vw, 64px)" }}
          >
            Learn to use AI to grow your{" "}
            <span className="font-serif italic font-normal text-ink/60">small business</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            Hands-on systems that turn Higgsfield, Claude, ChatGPT and MidJourney into real revenue, not novelty posts. Built by a founder who runs a real small business on the same playbook.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-sans font-medium text-[14.5px] px-5 py-3 rounded-full hover:bg-amber transition-colors"
            >
              Book a discovery call
            </Link>
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink border border-line font-sans font-medium text-[14.5px] px-5 py-3 rounded-full hover:bg-ink hover:text-paper hover:border-ink transition-colors"
            >
              See the prompt packs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured course card */}
      <section className="bg-cream pb-12 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <FeaturedCourse />
        </div>
      </section>

      {/* Guide + Prompt Packs cards */}
      <section className="bg-cream pb-12 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <GuideAndPacks />
        </div>
      </section>

      {/* Prompt Pack grid */}
      <section id="packs" className="bg-paper py-14 md:py-20 border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              Prompt packs
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              Field-tested prompts for the categories we actually work in.
            </h2>
            <p className="font-sans text-base text-ink/70 leading-relaxed mt-3">
              Drop them into MidJourney, Higgsfield or Claude. Edit the brand notes at the top. Ship the asset.
            </p>
          </div>
          <PackGrid />
        </div>
      </section>

      {/* What's in the system */}
      <section className="bg-cream py-14 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-3xl bg-[#2A1206] text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-4">
                  The AI Creative System
                </p>
                <h2
                  className="font-sans font-bold leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
                >
                  A creative system built to find your winning angles and scale them.
                </h2>
                <p className="font-sans text-paper/75 leading-relaxed mt-5 text-[15px] md:text-[16px]">
                  Three weeks of structured work, then ongoing support. Designed for small teams who need to ship faster than their competitors can.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors"
                >
                  Book a discovery call
                </Link>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Week 01", title: "Customer Research", body: "We map your customer, your competitors, and the angles winning in your category right now." },
                  { label: "Week 02", title: "Creative Strategy", body: "We map your content needs across organic, paid and email, then write the briefs that drive each one." },
                  { label: "Week 03", title: "AI Production", body: "We help you produce, edit and ship the first batch using your stack: Higgsfield, MidJourney, Claude, ChatGPT." },
                ].map(step => (
                  <div key={step.label} className="rounded-2xl bg-paper/[0.06] border border-paper/15 p-5">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-amber uppercase mb-3">
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

      {/* Testimonials */}
      <section className="bg-paper py-14 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              From clients
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              What it looks like in real businesses.
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Fit */}
      <section className="bg-cream py-14 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              Who this is for
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              Honest about the fit.
            </h2>
          </div>
          <FitSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-14 md:py-20 border-b border-line">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              Frequently asked
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              Curious? Let&apos;s clear things up.
            </h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-3xl bg-[#2A1206] text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
              <div className="max-w-2xl">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-3">
                  Ready when you are
                </p>
                <h3
                  className="font-sans font-bold leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  Tell us about the business. We will reply with a plan.
                </h3>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors self-start md:self-auto"
              >
                Book a discovery call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
