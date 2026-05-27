"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* ─── Tool palette ─────────────────────────────────────────────────────── */

const TOOLS = [
  {
    name: "Higgsfield",
    role: "video + reels",
    blurb: "Short-form vertical video, motion clips, and reel drafts that you can ship to TikTok and Instagram the same day.",
    swatch: "from-[#7C3AED] via-[#A855F7] to-[#C084FC]",
  },
  {
    name: "MidJourney",
    role: "static creative",
    blurb: "Brand-consistent stills for ads, landing pages, packaging mocks, and IG grid posts. We supply the prompt library.",
    swatch: "from-[#FF5B1A] via-[#FF7A3D] to-[#FFB088]",
  },
  {
    name: "Claude",
    role: "copy + briefs",
    blurb: "Email copy, brand voice, ad headlines, and product descriptions. Tuned on your existing best-performing posts.",
    swatch: "from-[#D97757] via-[#E08A6D] to-[#F2B898]",
  },
  {
    name: "ChatGPT",
    role: "image + video iterations",
    blurb: "Fast iteration on visuals and short clips when you need a second opinion or a quick variant before a launch.",
    swatch: "from-[#10A37F] via-[#1FB48F] to-[#5DC6AC]",
  },
];

/* ─── Services we provide ─────────────────────────────────────────────── */

const SERVICES = [
  {
    title: "Web creation",
    body: "Landing pages, booking sites, and small-business storefronts. Same playbook we used on Cami Lab Studio.",
    accent: "#FF5B1A",
  },
  {
    title: "Asset creation",
    body: "Static ads, reels, packshots, social posts. Built with Higgsfield and MidJourney, scored against revenue.",
    accent: "#7C3AED",
  },
  {
    title: "Campaign optimization",
    body: "We watch which creative is paying off and rotate the rest. Weekly briefs, monthly rebuilds.",
    accent: "#0866FF",
  },
  {
    title: "Social media content",
    body: "TikTok and Instagram. We help you script, shoot, and post on a rhythm your audience can feel.",
    accent: "#1A1A1A",
  },
  {
    title: "Branding",
    body: "Voice, palette, type, a usable brand kit, plus the AI prompts to keep new creative on-brand.",
    accent: "#F9AB00",
  },
];

/* ─── Free templates ──────────────────────────────────────────────────── */

const TEMPLATES = [
  {
    tag: "Strategy",
    title: "Small-business growth plan",
    body: "A one-page weekly plan: what you posted, what sold, what to ship next. Doc + spreadsheet.",
    accent: "from-[#FFE8DC] to-[#FFD2B5]",
    swatchHue: "#FF5B1A",
  },
  {
    tag: "Creative",
    title: "Higgsfield reel script library",
    body: "Twelve script templates for short-form video that have been tested on local-service clients.",
    accent: "from-[#EFE3FF] to-[#D6BFFF]",
    swatchHue: "#7C3AED",
  },
  {
    tag: "Email",
    title: "Klaviyo win-back flow",
    body: "Five-email sequence with subject lines, copy, and timing. Edit the brand voice and ship.",
    accent: "from-[#E2EBFF] to-[#BFD3FF]",
    swatchHue: "#0866FF",
  },
  {
    tag: "Ops",
    title: "Booking funnel checklist",
    body: "Twenty-three things to check on a service-business booking flow before you run paid traffic to it.",
    accent: "from-[#E6F7EE] to-[#BFE9D2]",
    swatchHue: "#1F7A4D",
  },
  {
    tag: "Brand",
    title: "AI prompt pack",
    body: "Starter prompts for MidJourney + Higgsfield, tuned for spa, food, and DTC product categories.",
    accent: "from-[#FFF5E0] to-[#FFE3A1]",
    swatchHue: "#F9AB00",
  },
  {
    tag: "Reporting",
    title: "Lightweight weekly brief",
    body: "Templated weekly recap, no dashboards required. Numbers in, paragraph out.",
    accent: "from-[#F0EBE3] to-[#D9CFB9]",
    swatchHue: "#6E6E6E",
  },
];

function ToolCard({
  tool,
  index,
  prefersReduced,
}: { tool: typeof TOOLS[number]; index: number; prefersReduced: boolean | null }) {
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -3 }}
      className="rounded-2xl border border-line bg-paper overflow-hidden flex flex-col"
    >
      <div className={`h-28 md:h-32 bg-gradient-to-br ${tool.swatch} flex items-end p-4`}>
        <p className="font-mono text-[10.5px] tracking-[0.18em] text-white/90 uppercase">
          {tool.role}
        </p>
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <h3 className="font-sans font-bold text-ink text-[18px] leading-tight tracking-[-0.015em]">
          {tool.name}
        </h3>
        <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed">
          {tool.blurb}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  prefersReduced,
}: { service: typeof SERVICES[number]; index: number; prefersReduced: boolean | null }) {
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? 0 : index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -2 }}
      className="rounded-2xl border border-line bg-paper p-5 md:p-6 flex flex-col gap-3"
    >
      <span
        className="inline-block w-2 h-2 rounded-full shrink-0"
        style={{ background: service.accent }}
      />
      <h3 className="font-sans font-bold text-ink text-[16px] md:text-[17px] leading-tight tracking-[-0.015em]">
        {service.title}
      </h3>
      <p className="font-sans text-[14px] text-ink/65 leading-relaxed">
        {service.body}
      </p>
    </motion.div>
  );
}

function TemplateCard({
  tpl,
  index,
  prefersReduced,
}: { tpl: typeof TEMPLATES[number]; index: number; prefersReduced: boolean | null }) {
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReduced ? undefined : { y: -3 }}
      className="rounded-2xl border border-line bg-paper overflow-hidden flex flex-col"
    >
      <div className={`h-36 md:h-40 bg-gradient-to-br ${tpl.accent} relative`}>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <span
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: tpl.swatchHue }}
          />
          <span className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
            {tpl.tag}
          </span>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
        <h3 className="font-sans font-bold text-ink text-[17px] leading-snug tracking-[-0.015em]">
          {tpl.title}
        </h3>
        <p className="font-sans text-[14px] text-ink/70 leading-relaxed flex-1">
          {tpl.body}
        </p>
        <Link
          href="/contact"
          className="mt-3 font-sans text-[13.5px] text-amber font-medium hover:underline underline-offset-4"
        >
          Request the file →
        </Link>
      </div>
    </motion.div>
  );
}

export default function StudioContent() {
  const { t } = useLanguage();
  const s = t.studio;
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-12 md:pt-16 pb-12 md:pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <p className="font-sans text-ink/55 text-[13px] mb-3">
            {s.label}
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[1.05] tracking-[-0.025em] mb-5 max-w-3xl"
            style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
          >
            {s.h1}
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl">
            {s.subhead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-sans font-medium text-[14.5px] px-5 py-3 rounded-full hover:bg-amber transition-colors"
            >
              {s.ctaPrimary}
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center bg-paper text-ink border border-ink font-sans font-medium text-[14.5px] px-5 py-3 rounded-full hover:bg-ink hover:text-paper transition-colors"
            >
              {s.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Tools we work with */}
      <section className="bg-cream py-12 md:py-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {s.toolsLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {s.toolsHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {TOOLS.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="bg-paper py-12 md:py-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {s.servicesLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {s.servicesHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        </div>
      </section>

      {/* Free templates */}
      <section id="templates" className="bg-cream py-12 md:py-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {s.templatesLabel}
            </p>
            <h2
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {s.templatesHeading}
            </h2>
            <p className="font-sans text-base text-ink/70 leading-relaxed">
              {s.templatesSubhead}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {TEMPLATES.map((tpl, i) => (
              <TemplateCard key={tpl.title} tpl={tpl} index={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl border border-line bg-cream p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="font-sans text-ink/55 text-[13px] mb-2">
                {s.ctaLabel}
              </p>
              <h3
                className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: "clamp(20px, 2.6vw, 32px)" }}
              >
                {s.ctaHeading}
              </h3>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-sans font-medium text-[14.5px] px-5 py-3 rounded-full hover:bg-amber transition-colors self-start md:self-auto"
            >
              {s.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
