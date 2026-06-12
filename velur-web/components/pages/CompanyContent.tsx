"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";
import CtaSection from "@/components/marketing/CtaSection";
import { ArtBand } from "@/components/velur/ArtBand";
import {
  BarChart3,
  Cpu,
  Sparkles,
  Workflow,
} from "lucide-react";

/* ─── Per-page strings (Castilian Spanish for ES) ──────────────────────
   Team voice: professional, specific, no client name-drops. Velur is
   presented as a dedicated team working across Data Science, ML, AI
   and business operations, with Alexander's experience as the anchor
   — never as a solo project. */
const COPY = {
  en: {
    heroEyebrow: "Company",
    heroLineLead: "Years inside revenue data.",
    heroLineTail: "One layer that was always missing.",
    heroBody:
      "Velur is built by a dedicated team working at the intersection of data science, machine learning, AI and business operations. We've spent years inside the revenue stacks of consumer brands — and we're building the intelligence layer those stacks were always missing.",
    founderEyebrow: "Who we are",
    founderH1Lead: "Led by Alexander Campos.",
    founderH1Tail: "Built by a team that has done this work for years.",
    founderQuote:
      "Years inside DTC and small-business data stacks taught us one thing: brands don't lack data — they lack a layer that reads it as one business. Every team we've worked alongside ran the same six or seven tools, and none of those tools talked to each other.",
    founderP2:
      "Velur exists to be that layer. The underlying technology — pipelines, models, language interfaces — is mature. What's been missing is a team willing to assemble it rigorously for the brands that need it most. That is the work we do every day.",
    founderP3:
      "We work across data science, machine learning and applied AI, with one constraint we never trade away: every number we put in front of an operator must be traceable back to its source.",
    founderTags: [
      { icon: "chart",  label: "Data Science" },
      { icon: "cpu",    label: "Machine Learning" },
      { icon: "spark",  label: "Applied AI" },
    ],
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",

    /* How we work — three discipline cards. */
    chaseEyebrow: "How we work",
    chaseH1: "Data Science is the rigor. ML is the engine. AI is the multiplier.",
    chaseBody:
      "We care about all three — as means to an end. The end is a brand that reads its revenue clearly every morning and makes better decisions, faster.",
    chaseCards: [
      {
        icon: "chart",
        kicker: "01",
        title: "Data Science",
        body: "Fragmented data is the default in consumer business. Making it legible — modelled, reconciled, trustworthy — is most of the work, and it's the rigor underneath everything Velur ships.",
      },
      {
        icon: "cpu",
        kicker: "02",
        title: "Machine Learning",
        body: "Applied where it earns its place — LTV projection, churn signals, attribution modelling. Never decoration. The model is the engine, not the marketing.",
      },
      {
        icon: "spark",
        kicker: "03",
        title: "Applied AI",
        body: "AI is how a focused team delivers analyst-grade context at the speed an operator needs. Every brief is AI-assisted; every number is validated against source data. That's the contract.",
      },
    ],

    /* The promise — one large statement instead of a five-card list. */
    promiseEyebrow: "The promise",
    promise: "Be useful. Add value. Don't ship dashboards no one reads.",
    promiseBody:
      "It's the standard we hold every release to. If a feature doesn't survive that test, it doesn't ship.",
  },

  es: {
    heroEyebrow: "Empresa",
    heroLineLead: "Años dentro de los datos de ingresos.",
    heroLineTail: "Una capa que siempre faltó.",
    heroBody:
      "Velur lo construye un equipo dedicado que trabaja en la intersección de data science, machine learning, IA y operaciones de negocio. Hemos pasado años dentro de los stacks de ingresos de marcas de consumo — y estamos construyendo la capa de inteligencia que a esos stacks siempre les faltó.",
    founderEyebrow: "Quiénes somos",
    founderH1Lead: "Liderados por Alexander Campos.",
    founderH1Tail: "Construido por un equipo que lleva años haciendo este trabajo.",
    founderQuote:
      "Años dentro de stacks de datos DTC y de pequeño negocio nos enseñaron una cosa: a las marcas no les faltan datos — les falta una capa que los lea como un solo negocio. Cada equipo junto al que trabajamos corría con las mismas seis o siete herramientas, y ninguna se hablaba con la siguiente.",
    founderP2:
      "Velur existe para ser esa capa. La tecnología de base — pipelines, modelos, interfaces de lenguaje — está madura. Lo que faltaba era un equipo dispuesto a ensamblarla con rigor para las marcas que más la necesitan. Ese es el trabajo que hacemos cada día.",
    founderP3:
      "Trabajamos en data science, machine learning e IA aplicada, con una restricción que nunca negociamos: cada número que ponemos delante de un operador tiene que poder trazarse hasta su fuente.",
    founderTags: [
      { icon: "chart", label: "Data Science" },
      { icon: "cpu",   label: "Machine Learning" },
      { icon: "spark", label: "IA aplicada" },
    ],
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",

    chaseEyebrow: "Cómo trabajamos",
    chaseH1: "Data Science es el rigor. ML es el motor. La IA es el multiplicador.",
    chaseBody:
      "Nos importan los tres — como medios para un fin. El fin es una marca que lee sus ingresos con claridad cada mañana y toma mejores decisiones, más rápido.",
    chaseCards: [
      {
        icon: "chart",
        kicker: "01",
        title: "Data Science",
        body: "Los datos fragmentados son el estado por defecto en el negocio de consumo. Hacerlos legibles — modelados, reconciliados, fiables — es la mayor parte del trabajo, y es el rigor debajo de todo lo que entrega Velur.",
      },
      {
        icon: "cpu",
        kicker: "02",
        title: "Machine Learning",
        body: "Aplicado donde se gana su sitio — predicción de LTV, señales de churn, modelado de atribución. Nunca como decoración. El modelo es el motor, no el marketing.",
      },
      {
        icon: "spark",
        kicker: "03",
        title: "IA aplicada",
        body: "La IA es cómo un equipo enfocado entrega contexto de nivel analista a la velocidad que un operador necesita. Cada brief está asistido por IA; cada número está validado contra los datos de origen. Ese es el contrato.",
      },
    ],

    promiseEyebrow: "La promesa",
    promise: "Sé útil. Aporta valor. No lances dashboards que nadie lee.",
    promiseBody:
      "Es el estándar al que sometemos cada release. Si una funcionalidad no supera esa prueba, no se lanza.",
  },
} as const;

type Copy = typeof COPY.en | typeof COPY.es;

const TAG_ICON: Record<string, typeof BarChart3> = {
  chart: BarChart3,
  cpu: Cpu,
  spark: Sparkles,
};


/* ──────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────── */

export default function CompanyContent() {
  const { lang } = useLanguage();
  const c: Copy = COPY[lang];
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="bg-canvas border-b border-border-light relative overflow-hidden"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        {/* Soft signal-green aurora glow behind the hero. */}
        <div
          className="absolute -top-32 -left-32 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] pointer-events-none opacity-[0.35]"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(79,183,141,0.35) 0%, rgba(79,183,141,0) 65%)",
            filter: "blur(40px)",
          }}
        />

        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", position: "relative" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
            {c.heroEyebrow}
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            className="font-display font-normal text-ink-strong leading-[1.03] tracking-[-0.025em] mb-6 max-w-[18ch]"
            style={{ fontSize: "clamp(38px, 5.8vw, 80px)" }}
          >
            <span className="block">{c.heroLineLead}</span>
            <span className="block text-ink/55">{c.heroLineTail}</span>
          </motion.h1>
          <motion.p {...fadeUp(0.12)} className="font-sans text-[18px] leading-[1.55] text-ink max-w-[58ch]">
            {c.heroBody}
          </motion.p>
        </div>
      </section>

      {/* ── Brand art band — aerial delta (the "one timeline" terrain) ─── */}
      <section className="bg-canvas border-b border-border-light" style={{ padding: "var(--section-y-tight) 0 0" }}>
        <ArtBand src="/art/abstract-glass.png" className="h-[220px] md:h-[360px] lg:h-[440px]" />
        <div style={{ height: "var(--section-y-tight)" }} />
      </section>

      {/* ── Founder block (inlined, trimmed, credibility-led) ─── */}
      <section
        className="bg-cream border-b border-border-light"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-3">
            {c.founderEyebrow}
          </motion.p>

          <motion.h2
            {...fadeUp(0.05)}
            className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-8 max-w-[22ch]"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            {c.founderH1Lead}{" "}
            <span className="text-ink/55">{c.founderH1Tail}</span>
          </motion.h2>

          {/* Pull quote at scale — the credibility line. */}
          <motion.blockquote
            {...fadeUp(0.12)}
            className="border-l-2 border-signal-green pl-6 md:pl-8 mb-8 max-w-[58ch]"
          >
            <p className="font-display font-normal text-ink-strong leading-[1.3] tracking-[-0.01em]"
               style={{ fontSize: "clamp(20px, 2.3vw, 28px)" }}>
              {c.founderQuote}
            </p>
          </motion.blockquote>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14">
            <motion.div {...fadeUp(0.18)} className="space-y-5 max-w-[58ch]">
              <p className="font-sans text-[16.5px] text-ink/85 leading-[1.6]">
                {c.founderP2}
              </p>
              <p className="font-sans text-[16.5px] text-ink/85 leading-[1.6]">
                {c.founderP3}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`mailto:${c.contactEmail}`}
                  className="inline-flex items-center gap-1.5 font-sans text-[14.5px] text-ink hover:text-action-blue transition-colors"
                >
                  {c.contactEmail}
                  <span aria-hidden>→</span>
                </Link>
                <span className="text-line" aria-hidden>·</span>
                <Link
                  href="https://www.linkedin.com/in/juan-alexander-campos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14.5px] text-ink/65 hover:text-ink transition-colors"
                >
                  {c.contactLinkedin}
                </Link>
              </div>
            </motion.div>

            {/* Tag pills — quick credibility chips. */}
            <motion.div {...fadeUp(0.22)} className="flex flex-col gap-2.5 items-start lg:items-end">
              {c.founderTags.map((tag, i) => {
                const Icon = TAG_ICON[tag.icon] ?? BarChart3;
                return (
                  <motion.div
                    key={tag.label}
                    initial={prefersReduced ? {} : { opacity: 0, x: prefersReduced ? 0 : 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: prefersReduced ? 0 : 0.28 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={prefersReduced ? undefined : { x: -4 }}
                    className="inline-flex items-center gap-2.5 bg-paper border border-line rounded-full pl-3 pr-5 py-2"
                  >
                    <span className="inline-flex text-signal-green items-center justify-center">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="font-sans text-[13.5px] text-ink-strong">{tag.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What I'm chasing — 3 motion cards ───────────────────── */}
      <section
        className="bg-canvas"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="max-w-3xl mb-10 md:mb-14">
            <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-4">
              {c.chaseEyebrow}
            </motion.p>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {c.chaseH1}
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="font-sans text-[17px] leading-[1.55] text-ink max-w-[58ch]">
              {c.chaseBody}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {c.chaseCards.map((card, i) => {
              const Icon = TAG_ICON[card.icon] ?? Workflow;
              return (
                <motion.article
                  key={card.title}
                  initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: prefersReduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={prefersReduced ? undefined : { y: -4 }}
                  className="group relative rounded-2xl bg-paper border border-line p-7 md:p-8 overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_64px_-32px_rgba(11,61,46,0.35)]"
                >
                  {/* Hover halo: subtle signal-green glow that fades in. */}
                  <div
                    aria-hidden
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-signal-green/0 group-hover:bg-signal-green/10 blur-2xl transition-colors duration-500"
                  />

                  <div className="relative flex items-center gap-3 mb-6">
                    <span className="inline-flex text-signal-green items-center">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-[11px] tracking-[0.16em] text-slate uppercase">
                      {card.kicker}
                    </span>
                  </div>

                  <h3 className="relative font-display font-normal text-ink-strong text-[22px] leading-tight tracking-[-0.01em] mb-4">
                    {card.title}
                  </h3>

                  <p className="relative font-sans text-[14.5px] text-ink/80 leading-[1.6]">
                    {card.body}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The promise — one statement, with a glow ────────────── */}
      <section
        className="bg-stone relative overflow-hidden"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,74,0.35) 0%, rgba(255,107,74,0) 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="relative"
          style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}
        >
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-6">
            {c.promiseEyebrow}
          </motion.p>
          <motion.h2
            {...fadeUp(0.05)}
            className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(28px, 4.6vw, 60px)" }}
          >
            {c.promise}
          </motion.h2>
          <motion.p {...fadeUp(0.12)} className="font-sans text-[17px] leading-[1.55] text-ink max-w-[52ch]">
            {c.promiseBody}
          </motion.p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
