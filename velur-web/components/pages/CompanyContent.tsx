"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

/* lucide build here has no LinkedIn glyph, small inline mark instead. */
function LinkedinMark({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06C21.4 8.64 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4z" />
    </svg>
  );
}
import CtaSection from "@/components/marketing/CtaSection";
import { StackedDeck } from "@/components/velur/StackedDeck";

/* ─── Per-page strings (Castilian Spanish for ES) ──────────────────────
   About page, Cohere-style. Company voice is always "we", the journey
   is the evolution of the idea, not a personal résumé. No company names
   (industries instead), no country names in the narrative. The founder
   bio (in the modal) is third-person and is the only place that mentions
   his studies. */
const COPY = {
  en: {
    heroEyebrow: "Company",
    heroLineLead: "Technology is how businesses",
    heroLineTail: "reach what they couldn't before.",
    heroBody:
      "Velur is built on one conviction: used well, data and AI help businesses see and decide things they otherwise couldn't. I'm a solo founder, a data analyst and operator, building the revenue intelligence layer that small and mid-size businesses are missing.",

    journeyEyebrow: "The journey",
    journeyHeading: "How we got to one intelligence layer.",
    journey: [
      {
        ghost: "01",
        eyebrow: "What I kept seeing",
        title: "Every business runs on the same broken setup.",
        body: "Across ecommerce, retail and fashion, subscription, logistics and transportation, I kept finding the same thing, six or seven tools per business, none of them speaking to each other, and a person stuck in the middle stitching the truth together by hand.",
      },
      {
        ghost: "02",
        eyebrow: "Why it matters",
        title: "The gap is where value quietly leaks.",
        body: "Disconnected data isn't a cosmetic problem. It's missed revenue, slow decisions and answers that arrive a week too late, in industries where a week is the difference between scaling a winner and funding a loser.",
      },
      {
        ghost: "03",
        eyebrow: "What I'm building",
        title: "One clear read above everything.",
        body: "Velur connects the data sources a business already runs onto a single timeline, so instead of ten dashboards to read, there's one clear written summary when the day starts.",
      },
      {
        ghost: "04",
        eyebrow: "Where this goes",
        title: "AI that helps you read an entire business.",
        body: "I believe the businesses that do well over the next decade will be the ones whose data finally works as one. I'm building the layer that makes that ordinary.",
      },
    ],

    beliefEyebrow: "What I believe",
    beliefHeading: "I'm fascinated by what technology lets us become.",
    beliefStatement:
      "Modern AI finally lets software read and explain how a business is performing, in plain language. I'm building Velur to make that genuinely useful for the businesses that don't have a data team, as decision support, not a replacement for judgement.",

    intro: {
      eyebrow: "The founder",
      lead: "Why Velur exists.",
      paragraphs: [
        "For more than five years, Alexander worked inside the data of DTC and apparel brands, subscription businesses, retail and fashion, and logistics, first as a data analyst, later close to marketing and growth. The pattern never changed: ten dashboards, none of them agreeing, and the real answer buried somewhere in between.",
        "He studied data science in Germany and Barcelona, but spent most of his time on the operator's side of the screen, turning scattered, messy data into decisions teams could act on. Velur is the tool he kept wishing those small and mid-size companies had: one intelligent layer over everything, giving founders, marketers, sales managers and owners accurate, actionable answers instead of more charts to read.",
      ],
    },

    founderEyebrow: "Founded by",
    founderName: "Alexander Campos",
    founderRole: "Founder · Data Analyst & Marketer",
    founderHint: "Read bio",
    photoCaption: "Photo coming soon",
    modalBio: [
      "Alexander founded Velur after years as a data analyst embedded inside the data stacks of ecommerce, retail and fashion, subscription, logistics and transportation businesses, the operator who turned fragmented data into decisions teams could actually act on.",
      "He studied data science in Germany and Barcelona, specialising in artificial intelligence and business intelligence. Velur is the layer he kept wishing those businesses had, now built for the ones that need it most.",
    ],
    linkedinCta: "View LinkedIn",
    close: "Close",
  },

  es: {
    heroEyebrow: "Empresa",
    heroLineLead: "La tecnología es cómo los negocios",
    heroLineTail: "alcanzan lo que antes no podían.",
    heroBody:
      "Velur se construye sobre una convicción: bien usados, los datos y la IA ayudan a los negocios a ver y decidir cosas que de otro modo no podrían. Soy un fundador en solitario, analista de datos y operador, construyendo la capa de inteligencia de ingresos que les falta a las pequeñas y medianas empresas.",

    journeyEyebrow: "El recorrido",
    journeyHeading: "Cómo llegamos a una sola capa de inteligencia.",
    journey: [
      {
        ghost: "01",
        eyebrow: "Lo que veía una y otra vez",
        title: "Cada negocio corre con el mismo montaje roto.",
        body: "En ecommerce, retail y moda, suscripción, logística y transporte, encontraba siempre lo mismo, seis o siete herramientas por negocio, ninguna hablando con la siguiente, y una persona atrapada en el medio cosiendo la verdad a mano.",
      },
      {
        ghost: "02",
        eyebrow: "Por qué importa",
        title: "La brecha es donde el valor se escapa en silencio.",
        body: "Los datos desconectados no son un problema cosmético. Son ingresos perdidos, decisiones lentas y respuestas que llegan una semana tarde, en industrias donde una semana es la diferencia entre escalar a un ganador y financiar a un perdedor.",
      },
      {
        ghost: "03",
        eyebrow: "Lo que construyo",
        title: "Una lectura clara por encima de todo.",
        body: "Velur conecta las fuentes de datos que un negocio ya usa en una sola línea de tiempo, para que en lugar de diez dashboards que leer, haya un resumen claro escrito cuando empieza el día.",
      },
      {
        ghost: "04",
        eyebrow: "Hacia dónde va",
        title: "IA que te ayuda a leer un negocio entero.",
        body: "Creo que los negocios que vayan bien en la próxima década serán aquellos cuyos datos por fin funcionen como uno. Construyo la capa que hace que eso sea lo normal.",
      },
    ],

    beliefEyebrow: "Lo que creo",
    beliefHeading: "Me fascina en qué nos permite convertirnos la tecnología.",
    beliefStatement:
      "La IA moderna por fin permite que el software lea y explique cómo está rindiendo un negocio, en lenguaje claro. Construyo Velur para que eso sea de verdad útil para los negocios que no tienen un equipo de datos, como apoyo a la decisión, no un sustituto del criterio.",

    intro: {
      eyebrow: "El fundador",
      lead: "Por qué existe Velur.",
      paragraphs: [
        "Durante más de cinco años, Alexander trabajó dentro de los datos de marcas DTC y de moda, negocios de suscripción, retail y logística, primero como analista de datos y después cerca del marketing y el crecimiento. El patrón nunca cambiaba: diez dashboards, ninguno de acuerdo, y la respuesta real enterrada en algún punto intermedio.",
        "Estudió data science en Alemania y Barcelona, pero pasó la mayor parte del tiempo del lado del operador, convirtiendo datos dispersos y desordenados en decisiones que los equipos podían tomar. Velur es la herramienta que siempre deseó que esas pequeñas y medianas empresas tuvieran: una sola capa inteligente sobre todo, que da a fundadores, marketers, responsables de ventas y dueños de negocio respuestas precisas y accionables en lugar de más gráficos que leer.",
      ],
    },

    founderEyebrow: "Fundada por",
    founderName: "Alexander Campos",
    founderRole: "Fundador · Analista de Datos y Marketing",
    founderHint: "Ver bio",
    photoCaption: "Foto próximamente",
    modalBio: [
      "Alexander fundó Velur tras años como analista de datos dentro de los stacks de datos de negocios de ecommerce, retail y moda, suscripción, logística y transporte, el operador que convertía datos fragmentados en decisiones que los equipos podían tomar de verdad.",
      "Estudió data science en Alemania y Barcelona, con especialización en inteligencia artificial y business intelligence. Velur es la capa que siempre deseó que esos negocios tuvieran, ahora construida para los que más la necesitan.",
    ],
    linkedinCta: "Ver LinkedIn",
    close: "Cerrar",
  },
} as const;

type Copy = typeof COPY.en | typeof COPY.es;

const LINKEDIN_URL = "https://www.linkedin.com/in/juan-alexander-campos/";

/* TEMP: founder block (portrait + name + bio modal) hidden until the
   final founder photo is ready. Flip back to true to restore it. */
const SHOW_FOUNDER = false;

/* Photo placeholder, swap for <Image src="/team/alexander.jpg" … /> once
   the portrait is added under /public/team/. */
function PhotoPlaceholder({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <div
      className={`relative w-full rounded-[18px] overflow-hidden bg-[#0F1115] flex items-center justify-center ${className}`}
      style={{ aspectRatio: "4 / 5" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(circle at 50% 35%, rgba(79,183,141,0.4), transparent 60%)" }}
      />
      <div className="relative flex flex-col items-center gap-4 text-center px-6">
        <span className="inline-flex w-20 h-20 rounded-full bg-signal-green text-white items-center justify-center font-display text-[26px] tracking-[-0.02em]">
          AC
        </span>
        <span className="font-display text-[11px] uppercase tracking-[0.12em] text-on-dark-muted">
          {caption}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────── */

export default function CompanyContent() {
  const { lang } = useLanguage();
  const c: Copy = COPY[lang];
  const prefersReduced = useReducedMotion();
  const [bioOpen, setBioOpen] = useState(false);

  /* Close the bio modal on Escape. */
  useEffect(() => {
    if (!bioOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBioOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bioOpen]);

  const fadeUp = (delay = 0) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <>
      {/* ── Hero, mission statement ────────────────────────────── */}
      <section
        className="bg-canvas border-b border-border-light relative overflow-hidden"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
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
            className="font-display font-normal text-ink-strong leading-[1.03] tracking-[-0.025em] mb-6 max-w-[20ch]"
            style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
          >
            <span className="block">{c.heroLineLead}</span>
            <span className="block text-ink/55">{c.heroLineTail}</span>
          </motion.h1>
          <motion.p {...fadeUp(0.12)} className="font-sans text-[18px] leading-[1.55] text-ink max-w-[60ch]">
            {c.heroBody}
          </motion.p>
        </div>
      </section>

      {/* ── The journey (stacked deck, bold dark cards) ─────────── */}
      <section className="bg-stone border-b border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="mb-12 md:mb-16 max-w-2xl">
            <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-3">
              {c.journeyEyebrow}
            </motion.p>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {c.journeyHeading}
            </motion.h2>
          </div>
          <StackedDeck cards={c.journey.map((t) => ({ ...t }))} />
        </div>
      </section>

      {/* ── Founder intro, portrait (left half) + bio (right) ───── */}
      <section className="bg-canvas border-b border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Portrait fills the left half */}
            <motion.div
              {...fadeUp(0)}
              className="relative w-full overflow-hidden rounded-[22px] bg-[#E7E7E9]"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src="/team/alexander.jpg"
                alt={c.founderName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Bio, right */}
            <div>
              <motion.p {...fadeUp(0.05)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
                {c.intro.eyebrow}
              </motion.p>
              <motion.h2
                {...fadeUp(0.08)}
                className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
              >
                {c.intro.lead}
              </motion.h2>
              <motion.p {...fadeUp(0.1)} className="font-display text-[12px] uppercase tracking-[0.1em] text-slate mb-6">
                {c.founderName} · {c.founderRole}
              </motion.p>
              <div className="space-y-4 max-w-[54ch]">
                {c.intro.paragraphs.map((p, i) => (
                  <motion.p key={i} {...fadeUp(0.12 + i * 0.05)} className="font-sans text-[16.5px] leading-[1.65] text-ink/85">
                    {p}
                  </motion.p>
                ))}
              </div>
              <motion.div {...fadeUp(0.24)}>
                <Link
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-sans text-[14.5px] text-ink hover:text-signal-green transition-colors"
                >
                  <LinkedinMark size={17} />
                  {c.linkedinCta}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Belief / why, "we" voice ───────────────────────────── */}
      <section className="bg-canvas relative overflow-hidden" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(11,61,46,0.18) 0%, rgba(11,61,46,0) 65%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
            {c.beliefEyebrow}
          </motion.p>
          <motion.h2
            {...fadeUp(0.05)}
            className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-8 max-w-[20ch]"
            style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
          >
            {c.beliefHeading}
          </motion.h2>

          <motion.p
            {...fadeUp(0.12)}
            className="font-sans text-ink/85 leading-[1.55] max-w-[58ch]"
            style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
          >
            {c.beliefStatement}
          </motion.p>
        </div>
      </section>

      {/* ── Founder, carbon band, photo on top, click → bio modal ── */}
      {SHOW_FOUNDER && (
      <section className="bg-[#0F1115] text-on-dark" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div className="text-center" style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green-300 mb-8">
            {c.founderEyebrow}
          </motion.p>

          <motion.button
            {...fadeUp(0.05)}
            type="button"
            onClick={() => setBioOpen(true)}
            className="group inline-flex flex-col items-center mx-auto"
            aria-haspopup="dialog"
          >
            <span className="block w-[180px] sm:w-[200px] transition-transform duration-300 group-hover:-translate-y-1">
              <PhotoPlaceholder caption={c.photoCaption} />
            </span>
            <span className="mt-6 font-display font-normal text-white text-[26px] tracking-[-0.015em]">
              {c.founderName}
            </span>
            <span className="font-display text-[12px] uppercase tracking-[0.1em] text-signal-green-300 mt-1">
              {c.founderRole}
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-[14px] text-on-dark-muted group-hover:text-white transition-colors">
              {c.founderHint}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </motion.button>
        </div>
      </section>
      )}

      {/* ── Bio modal (Cohere-style) ────────────────────────────── */}
      <AnimatePresence>
        {bioOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={c.founderName}
          >
            <div
              className="absolute inset-0 bg-[#0F1115]/85 backdrop-blur-sm"
              onClick={() => setBioOpen(false)}
              aria-hidden
            />
            <motion.div
              className="relative w-full max-w-3xl rounded-[22px] bg-canvas overflow-hidden shadow-2xl"
              initial={prefersReduced ? {} : { scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={prefersReduced ? {} : { scale: 0.97, y: 8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            >
              <button
                type="button"
                onClick={() => setBioOpen(false)}
                aria-label={c.close}
                className="absolute top-4 right-4 z-10 inline-flex w-9 h-9 items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/[0.06] transition-colors"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-8 p-6 sm:p-9">
                <div className="w-[150px] sm:w-full mx-auto sm:mx-0">
                  <PhotoPlaceholder caption={c.photoCaption} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display font-normal text-ink-strong text-[28px] sm:text-[34px] leading-tight tracking-[-0.02em]">
                    {c.founderName}
                  </h3>
                  <p className="font-display text-[12px] uppercase tracking-[0.1em] text-signal-green mt-1.5 mb-4">
                    {c.founderRole}
                  </p>
                  <div className="space-y-4 mb-6">
                    {c.modalBio.map((p, i) => (
                      <p key={i} className="font-sans text-[15.5px] leading-[1.6] text-ink/85">{p}</p>
                    ))}
                  </div>
                  <Link
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start bg-velur-ink text-canvas font-sans font-medium text-[14.5px] px-5 py-3 rounded-[28px] hover:bg-ink-700 transition-colors"
                  >
                    <LinkedinMark size={17} />
                    {c.linkedinCta}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaSection />
    </>
  );
}
