"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import Link from "next/link";
import CtaSection from "@/components/marketing/CtaSection";
import { StackedDeck } from "@/components/velur/StackedDeck";
import { BarChart3, Cpu, Sparkles } from "lucide-react";

/* ─── Per-page strings (Castilian Spanish for ES) ──────────────────────
   About page, Cohere-style: a mission hero → an evolution timeline drawn
   from Alexander's real path (Medellín → Data Science degree → Fabletics
   / Yitty → Velur) → his personal conviction → a founder block with a
   photo placeholder. Company voice stays "we" (a small team across DS /
   ML / AI); the belief section is first person — his actual reason for
   building this. */
const COPY = {
  en: {
    heroEyebrow: "Company",
    heroLineLead: "Technology is how humanity",
    heroLineTail: "reaches what it couldn't before.",
    heroBody:
      "Velur is built on one conviction: used well, data and AI help people discover and decide things they otherwise couldn't — and that creates real value, far beyond the numbers. We're a small team working across data science, machine learning and applied AI, building the intelligence layer modern businesses are missing.",

    timelineEyebrow: "The path here",
    timelineHeading: "From reading data to rethinking it.",
    timeline: [
      {
        ghost: "2021",
        eyebrow: "Medellín, Colombia",
        title: "Learning to make data speak.",
        body: "As a Data & Reporting Analyst, I automated the messy middle — Python and SQL pipelines that cut errors by a third and turned raw operational data into decisions leaders could act on.",
      },
      {
        ghost: "2023",
        eyebrow: "IU University · Germany",
        title: "Data Science, made formal.",
        body: "A Bachelor of Data Science specialising in Artificial Intelligence, Business Intelligence and visualisation — the foundation under everything Velur is built on.",
      },
      {
        ghost: "2023–25",
        eyebrow: "Fabletics · Yitty",
        title: "The same gap, in every brand.",
        body: "As Marketing Data Analyst I became the liaison between marketing, product and MarTech — the person who made the tools talk. The work drove 35% sales growth and surfaced $750K in untapped revenue. But every brand ran on the same six or seven tools, and none of them spoke to each other. Closing that gap by hand was the whole job.",
      },
      {
        ghost: "Now",
        eyebrow: "Barcelona · Building Velur",
        title: "The layer that was always missing.",
        body: "Velur closes that gap for good — one intelligence layer that reads across every data source a business runs, so the answer is already written when you open your laptop.",
      },
    ],

    beliefEyebrow: "Why I'm building Velur",
    beliefHeading: "I'm fascinated by what technology lets us become.",
    beliefQuote:
      "Technology is one of the biggest transformations in human history. AI now lets us reach outcomes we couldn't have imagined thirty or fifty years ago — and I want to use it to help people create real value, not just another dashboard.",
    beliefP1:
      "A company built today has to be AI-native; that's simply where the world is moving. And it has to bring something genuinely new. Connecting every kind of data source into one layer of intelligence is, I believe, exactly that — useful, and not yet done well for the businesses that need it most.",
    beliefP2:
      "Data Science is the rigor. Machine Learning is the engine. AI is the multiplier. I care about all three only as means to an end: a business that understands itself clearly, every morning, and makes better calls because of it.",
    beliefP3:
      "It might take years. I'm fine with that. I'm willing to fail many times over — as long as I keep going and keep scaling, until one day it works.",

    founderEyebrow: "The founder",
    founderName: "Alexander Campos",
    founderRole: "Founder · Data Scientist",
    founderBio:
      "Four years turning complex data into decisions for consumer brands — from operational analytics in Medellín to marketing data science for Fabletics' Yitty. Data Science graduate (IU, Germany), based in Barcelona. Velur is led by Alexander and built with a small team across data science, ML and applied AI.",
    founderTags: [
      { icon: "chart", label: "Data Science" },
      { icon: "cpu", label: "Machine Learning" },
      { icon: "spark", label: "Applied AI" },
    ],
    photoCaption: "Photo coming soon",
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",
  },

  es: {
    heroEyebrow: "Empresa",
    heroLineLead: "La tecnología es cómo la humanidad",
    heroLineTail: "alcanza lo que antes no podía.",
    heroBody:
      "Velur se construye sobre una convicción: bien usados, los datos y la IA ayudan a las personas a descubrir y decidir cosas que de otro modo no podrían — y eso crea valor real, mucho más allá de los números. Somos un equipo pequeño que trabaja en data science, machine learning e IA aplicada, construyendo la capa de inteligencia que les falta a los negocios de hoy.",

    timelineEyebrow: "El camino hasta aquí",
    timelineHeading: "De leer los datos a repensarlos.",
    timeline: [
      {
        ghost: "2021",
        eyebrow: "Medellín, Colombia",
        title: "Aprender a hacer hablar a los datos.",
        body: "Como Data & Reporting Analyst, automaticé el trabajo sucio del medio — pipelines de Python y SQL que redujeron los errores un tercio y convirtieron datos operativos en bruto en decisiones que los líderes podían tomar.",
      },
      {
        ghost: "2023",
        eyebrow: "IU University · Alemania",
        title: "Data Science, de forma formal.",
        body: "Un Bachelor en Data Science con especialización en Inteligencia Artificial, Business Intelligence y visualización — la base sobre la que se construye todo Velur.",
      },
      {
        ghost: "2023–25",
        eyebrow: "Fabletics · Yitty",
        title: "La misma brecha, en cada marca.",
        body: "Como Marketing Data Analyst me convertí en el enlace entre marketing, producto y MarTech — la persona que hacía hablar a las herramientas. El trabajo impulsó un 35% de crecimiento en ventas y destapó 750.000 $ en ingresos sin aprovechar. Pero cada marca corría con las mismas seis o siete herramientas, y ninguna se hablaba con la siguiente. Cerrar esa brecha a mano era todo el trabajo.",
      },
      {
        ghost: "Ahora",
        eyebrow: "Barcelona · Construyendo Velur",
        title: "La capa que siempre faltó.",
        body: "Velur cierra esa brecha de una vez — una sola capa de inteligencia que lee a través de cada fuente de datos que usa un negocio, para que la respuesta ya esté escrita cuando abres el portátil.",
      },
    ],

    beliefEyebrow: "Por qué construyo Velur",
    beliefHeading: "Me fascina en qué nos permite convertirnos la tecnología.",
    beliefQuote:
      "La tecnología es una de las mayores transformaciones de la historia humana. La IA hoy nos permite alcanzar resultados que no habríamos imaginado hace treinta o cincuenta años — y quiero usarla para ayudar a las personas a crear valor real, no otro dashboard más.",
    beliefP1:
      "Una empresa que nace hoy tiene que ser AI-native; es sencillamente hacia donde va el mundo. Y tiene que aportar algo genuinamente nuevo. Conectar cada tipo de fuente de datos en una sola capa de inteligencia es, creo, exactamente eso — útil, y aún no bien resuelto para los negocios que más lo necesitan.",
    beliefP2:
      "Data Science es el rigor. Machine Learning es el motor. La IA es el multiplicador. Me importan los tres solo como medios para un fin: un negocio que se entiende con claridad, cada mañana, y por eso toma mejores decisiones.",
    beliefP3:
      "Puede que lleve años. Me parece bien. Estoy dispuesto a fallar muchas veces — mientras siga adelante y siga escalando, hasta que un día funcione.",

    founderEyebrow: "El fundador",
    founderName: "Alexander Campos",
    founderRole: "Fundador · Data Scientist",
    founderBio:
      "Cuatro años convirtiendo datos complejos en decisiones para marcas de consumo — de la analítica operativa en Medellín a la data science de marketing para Yitty, de Fabletics. Graduado en Data Science (IU, Alemania), con base en Barcelona. Velur está liderado por Alexander y construido con un equipo pequeño en data science, ML e IA aplicada.",
    founderTags: [
      { icon: "chart", label: "Data Science" },
      { icon: "cpu", label: "Machine Learning" },
      { icon: "spark", label: "IA aplicada" },
    ],
    photoCaption: "Foto próximamente",
    contactEmail: "hello@velur.io",
    contactLinkedin: "LinkedIn",
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
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <>
      {/* ── Hero — mission statement ────────────────────────────── */}
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

      {/* ── Evolution timeline (stacked deck) ───────────────────── */}
      <section className="bg-paper border-b border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="mb-12 md:mb-16 max-w-2xl">
            <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-3">
              {c.timelineEyebrow}
            </motion.p>
            <motion.h2
              {...fadeUp(0.05)}
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              {c.timelineHeading}
            </motion.h2>
          </div>
          <StackedDeck cards={c.timeline.map((t) => ({ ...t }))} />
        </div>
      </section>

      {/* ── Belief / why — first person ─────────────────────────── */}
      <section className="bg-canvas relative overflow-hidden" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(79,183,141,0.3) 0%, rgba(79,183,141,0) 65%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-5">
            {c.beliefEyebrow}
          </motion.p>
          <motion.h2
            {...fadeUp(0.05)}
            className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-8 max-w-[20ch]"
            style={{ fontSize: "clamp(28px, 4.2vw, 56px)" }}
          >
            {c.beliefHeading}
          </motion.h2>

          <motion.blockquote
            {...fadeUp(0.12)}
            className="border-l-2 border-signal-green pl-6 md:pl-8 mb-10 max-w-[60ch]"
          >
            <p className="font-display font-normal text-ink-strong leading-[1.3] tracking-[-0.01em]" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>
              {c.beliefQuote}
            </p>
          </motion.blockquote>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-[1000px]">
            <motion.p {...fadeUp(0.16)} className="font-sans text-[16px] leading-[1.6] text-ink/85">
              {c.beliefP1}
            </motion.p>
            <motion.p {...fadeUp(0.22)} className="font-sans text-[16px] leading-[1.6] text-ink/85">
              {c.beliefP2}
            </motion.p>
            <motion.p {...fadeUp(0.28)} className="font-sans text-[16px] leading-[1.6] text-ink/85">
              {c.beliefP3}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Founder block — photo placeholder + bio ─────────────── */}
      <section className="bg-cream border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <motion.p {...fadeUp(0)} className="font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-8">
            {c.founderEyebrow}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            {/* Photo placeholder — drop a portrait at /public/team/alexander.jpg
                and replace this block with <Image src="/team/alexander.jpg" … />. */}
            <motion.div {...fadeUp(0.05)}>
              <div
                className="relative w-full max-w-[380px] rounded-[22px] border border-line bg-stone overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "4 / 5" }}
              >
                <div className="flex flex-col items-center gap-4 text-center px-6">
                  <span className="inline-flex w-20 h-20 rounded-full bg-signal-green text-white items-center justify-center font-display text-[26px] tracking-[-0.02em]">
                    AC
                  </span>
                  <span className="font-display text-[12px] uppercase tracking-[0.1em] text-slate">
                    {c.photoCaption}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)}>
              <h3 className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
                {c.founderName}
              </h3>
              <p className="font-display text-[12px] uppercase tracking-[0.1em] text-signal-green mb-6">
                {c.founderRole}
              </p>
              <p className="font-sans text-[16.5px] leading-[1.6] text-ink/85 max-w-[56ch] mb-7">
                {c.founderBio}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-7">
                {c.founderTags.map((tag) => {
                  const Icon = TAG_ICON[tag.icon] ?? BarChart3;
                  return (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-2 bg-paper border border-line rounded-full pl-3 pr-4 py-2"
                    >
                      <span className="inline-flex text-signal-green items-center">
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      <span className="font-sans text-[13.5px] text-ink-strong">{tag.label}</span>
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
