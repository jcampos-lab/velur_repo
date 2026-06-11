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
   Heavy redesign: instead of three list-style sections (Opinions /
   Beliefs / Passion) stacking on each other, the story flows as
   one piece — founder voice, the gap, what I'm chasing, the promise.

   Founder voice rules applied:
   - State what's real (5 years as a Data Analyst inside DTC).
   - Don't pitch. Be specific. Cami Lab Studio is the first client,
     said plainly.
   - The mission is honest: tools were never built to talk to each
     other; the point is to make that layer exist. */
const COPY = {
  en: {
    heroEyebrow: "Company · The team",
    heroLineLead: "Five years inside DTC data.",
    heroLineTail: "One question I couldn't shake.",
    heroBody:
      "Velur is the revenue layer your tools were never built to share. Honest about what's real, specific about what we ship, and led by someone who's spent the last five years watching brands stuck between platforms that don't talk to each other.",
    /* Founder block — replaces the imported FounderSection,
       trimmed and re-anchored on the credibility (5+ years), the
       fascination (DS / ML / AI), and the honest framing. */
    founderEyebrow: "The founder",
    founderH1Lead: "I'm Alexander Campos.",
    founderH1Tail: "I'm building the tool I spent five years wishing existed.",
    founderQuote:
      "Five years as a Data Analyst inside DTC and small-business stacks. Every brand I've worked with ran on the same six or seven tools — and every brand was losing money because none of them talked to each other.",
    founderP2:
      "Velur is the layer that makes them talk. Nothing about the product is novel by itself; what's new is that no one has actually built it for the brands that need it most.",
    founderP3Pre: "Our first client is ",
    founderP3Mid: ", a spa in Port St. Lucie that runs the same playbook Velur is built on — live, every day, by one person. It's how I test everything before it ships.",
    founderTags: [
      { icon: "chart",  label: "Data analyst" },
      { icon: "cpu",    label: "ML curious" },
      { icon: "spark",  label: "AI honest" },
    ],
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",

    /* What I'm chasing — three short founder-voice cards. */
    chaseEyebrow: "What I'm chasing",
    chaseH1: "Data Science is the rigor. ML is the engine. AI is the multiplier.",
    chaseBody:
      "I'm fascinated by all three — but only as means to an end. The end is a brand that reads its revenue clearly every morning and makes one fewer wrong call this week than last.",
    chaseCards: [
      {
        icon: "chart",
        kicker: "01",
        title: "Data Science",
        body: "Fragmented data is the default in DTC. Making it legible is most of the work. That's where I started, and that's still the rigor underneath everything Velur ships.",
      },
      {
        icon: "cpu",
        kicker: "02",
        title: "Machine Learning",
        body: "Used where it earns its keep — LTV projection, churn signals, attribution modeling. Not sprinkled on the product to look modern. The model is the engine, not the marketing.",
      },
      {
        icon: "spark",
        kicker: "03",
        title: "AI as multiplier",
        body: "AI is how a small team ships analyst-grade context at the speed an operator actually needs. Every brief is AI-assisted. Every number is human-validated. That's the contract.",
      },
    ],

    /* The promise — one large statement instead of a five-card list. */
    promiseEyebrow: "The promise",
    promise: "Be useful. Add value. Don't ship dashboards no one reads.",
    promiseBody:
      "That's the only line I write down. Everything Velur does either survives that test, or it doesn't ship.",
  },

  es: {
    heroEyebrow: "Empresa · El equipo",
    heroLineLead: "Cinco años dentro de los datos DTC.",
    heroLineTail: "Una pregunta que no se me quitaba de la cabeza.",
    heroBody:
      "Velur es la capa de ingresos para la que tus herramientas nunca fueron diseñadas a compartir información. Honestos sobre lo que es real, específicos sobre lo que entregamos, y liderados por alguien que ha pasado los últimos cinco años viendo marcas atascadas entre plataformas que no se hablan entre sí.",
    founderEyebrow: "El fundador",
    founderH1Lead: "Soy Alexander Campos.",
    founderH1Tail: "Construyo la herramienta que pasé cinco años echando en falta.",
    founderQuote:
      "Cinco años como Data Analyst dentro de stacks DTC y de pequeño negocio. Cada marca con la que trabajé corría con las mismas seis o siete herramientas — y cada marca perdía dinero porque ninguna se hablaba con la siguiente.",
    founderP2:
      "Velur es la capa que las pone a hablar. Nada del producto es novedoso por sí solo; lo nuevo es que nadie lo ha construido todavía para las marcas que más lo necesitan.",
    founderP3Pre: "Nuestro primer cliente es ",
    founderP3Mid: ", un spa en Port St. Lucie que opera con el mismo manual sobre el que se construyó Velur — en vivo, cada día, llevado por una sola persona. Es donde pruebo cada cosa antes de lanzarla.",
    founderTags: [
      { icon: "chart", label: "Data analyst" },
      { icon: "cpu",   label: "Curioso de ML" },
      { icon: "spark", label: "IA con honestidad" },
    ],
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",

    chaseEyebrow: "Lo que me mueve",
    chaseH1: "Data Science es el rigor. ML es el motor. La IA es el multiplicador.",
    chaseBody:
      "Me fascinan los tres — pero solo como medios para un fin. El fin es una marca que lee sus ingresos con claridad cada mañana y toma una decisión equivocada menos esta semana que la anterior.",
    chaseCards: [
      {
        icon: "chart",
        kicker: "01",
        title: "Data Science",
        body: "Los datos fragmentados son el estado por defecto en DTC. Hacerlos legibles es la mayor parte del trabajo. Ahí empecé, y ese es todavía el rigor debajo de todo lo que entrega Velur.",
      },
      {
        icon: "cpu",
        kicker: "02",
        title: "Machine Learning",
        body: "Lo usamos donde de verdad se paga solo — predicción de LTV, señales de churn, modelado de atribución. No espolvoreado encima del producto para que parezca moderno. El modelo es el motor, no el marketing.",
      },
      {
        icon: "spark",
        kicker: "03",
        title: "IA como multiplicador",
        body: "La IA es cómo un equipo pequeño entrega contexto de nivel analista a la velocidad que un operador realmente necesita. Cada brief está asistido por IA. Cada número está validado por personas. Ese es el contrato.",
      },
    ],

    promiseEyebrow: "La promesa",
    promise: "Sé útil. Aporta valor. No lances dashboards que nadie lee.",
    promiseBody:
      "Es la única línea que tengo escrita. Todo lo que Velur hace sobrevive a esa prueba, o no se lanza.",
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
          <motion.p {...fadeUp(0)} className="font-mono text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
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
          <motion.p {...fadeUp(0)} className="font-mono text-[13px] uppercase tracking-[0.06em] text-slate mb-3">
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
                {c.founderP3Pre}
                <Link
                  href="https://camilab.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action-blue hover:underline underline-offset-4"
                >
                  Cami Lab Studio
                </Link>
                {c.founderP3Mid}
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
                    <span className="inline-flex w-6 h-6 rounded-full bg-wash-green text-signal-green items-center justify-center">
                      <Icon size={13} strokeWidth={1.8} />
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
            <motion.p {...fadeUp(0)} className="font-mono text-[13px] uppercase tracking-[0.06em] text-coral mb-4">
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
                    <span className="inline-flex w-9 h-9 rounded-full bg-wash-green text-signal-green items-center justify-center">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-slate uppercase">
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
          <motion.p {...fadeUp(0)} className="font-mono text-[13px] uppercase tracking-[0.06em] text-coral mb-6">
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
