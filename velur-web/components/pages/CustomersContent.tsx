"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Orbs } from "@/components/velur/Orbs";
import { Check, X } from "lucide-react";
import { ArtBand } from "@/components/velur/ArtBand";

/* ─── Per-page strings (Castilian Spanish for ES) ─────────────────── */
const COPY = {
  en: {
    eyebrow: "Customers",
    h1: "Built for every DTC brand. Not for the data team you don't have.",
    subhead: "Velur is designed for the operators actually running the business, founders, heads of growth, marketing leads. Small or mid-size, you get a complete revenue intelligence layer without standing up a data warehouse or hiring an analyst.",
    audienceEyebrow: "Who Velur is for",
    audienceHeading: "Every DTC and subscription brand, from launch to mid-market.",
    audienceCards: [
      {
        size: "Small DTC",
        revenue: "€100k to €1M ARR",
        body: "You've outgrown Shopify's native reports but you can't justify a data hire. Velur replaces the spreadsheet pile and gives you one place to read revenue every morning.",
      },
      {
        size: "Growing DTC",
        revenue: "€1M to €10M ARR",
        body: "You're running Shopify + Klaviyo + paid social and you've lost the thread of which channel is actually paying for itself. Velur reconciles them onto one timeline so the answer is obvious before your standup.",
      },
      {
        size: "Mid-market",
        revenue: "€10M to €50M ARR",
        body: "You have an analyst (or three) and they're drowning in dashboard requests. Velur becomes the source of truth they query against, and the daily brief that frees them up to do real analysis.",
      },
    ],
    teamEyebrow: "What you don't need",
    teamHeading: "No engineering team. No data science team. No warehouse.",
    teamBody: "Most analytics products assume you already have the infrastructure to run them. Velur assumes you don't, and ships everything in the box.",
    teamPoints: [
      { yes: true,  text: "OAuth into Shopify, Klaviyo, your ad accounts, Stripe, Recharge. Minutes, not weeks." },
      { yes: true,  text: "Velur backfills 90 days of history on its own infrastructure." },
      { yes: true,  text: "Data modelling, normalisation, and the intelligence layer ship with the product." },
      { yes: true,  text: "Daily revenue brief written for the person making decisions, not for the analyst." },
      { yes: false, text: "You don't need BigQuery, Snowflake, dbt, Fivetran, or a warehouse subscription." },
      { yes: false, text: "You don't need a data engineer to maintain pipelines." },
      { yes: false, text: "You don't need a BI tool license per seat, the brief comes to you." },
    ],
    versusEyebrow: "Why a complete layer beats AI chatbots",
    versusHeading: "AI chatbots answer questions. A revenue intelligence layer changes how you operate.",
    versusBody: "The current crop of \"AI for DTC\" tools is mostly a chat interface bolted onto whatever shallow data the integration could grab. They look useful in a demo and fall apart in operations. Here's what you actually get with Velur instead.",
    versusCols: { chatbot: "AI chatbots", velur: "Velur" },
    versusRows: [
      {
        question: "Where does the data live?",
        chatbot: "Whatever the chatbot scraped at session start, usually a partial view of one or two platforms, refreshed inconsistently.",
        velur:   "A modelled, reconciled timeline of every revenue source. Backfilled, version-controlled, queryable.",
      },
      {
        question: "How honest are the numbers?",
        chatbot: "Self-reported by each platform (Meta says it drove X, Google says it drove X, you can't trust either alone).",
        velur:   "Blended ROAS as ground truth + channel ROAS with context. When platforms disagree, we flag the gap and explain why.",
      },
      {
        question: "What does the morning look like?",
        chatbot: "You log in, prompt, re-prompt, then paste the answer into Slack. Most days nobody opens it.",
        velur:   "One paragraph in your inbox at 8am: what moved, why, what to ship today. Two recommendations, three numbers.",
      },
      {
        question: "What about cohorts and LTV?",
        chatbot: "Usually surface-level, average order value, top customers. Nothing about which acquisition channel pays back.",
        velur:   "Behavioural cohorts modelled by first product, channel, and price point. 12-month LTV per segment with confidence intervals.",
      },
      {
        question: "Can a non-technical operator use it?",
        chatbot: "Only if they know how to prompt it. Output quality is bounded by the user's question.",
        velur:   "Output is written for the operator. The intelligence comes to you, no prompt-engineering required.",
      },
      {
        question: "What happens if you cancel?",
        chatbot: "Conversation history gone, integrations disconnected, nothing to take with you.",
        velur:   "Every SQL model, every dashboard, every score function in your repo, under your name, from day one. Cancel anytime, nothing breaks, nothing disappears.",
      },
    ],
    closingEyebrow: "Ready to read revenue clearly",
    closingHeading: "Velur is for operators who'd rather read one good brief than poke at ten dashboards.",
    closingBody: "Join the waitlist and we'll reach out personally when the next seat opens. No automated drip, no sales funnel, just a conversation about what you're running.",
    closingCta: "Join the waitlist",
  },
  es: {
    eyebrow: "Clientes",
    h1: "Hecho para cualquier marca DTC. No para el equipo de datos que no tienes.",
    subhead: "Velur está diseñado para las personas que de verdad operan el negocio, fundadores, responsables de crecimiento, leads de marketing. Pequeña o mediana, obtienes una capa completa de inteligencia de ingresos sin montar un data warehouse ni contratar un analista.",
    audienceEyebrow: "Para quién es Velur",
    audienceHeading: "Cualquier marca DTC y de suscripción, desde el lanzamiento hasta el mid-market.",
    audienceCards: [
      {
        size: "DTC pequeña",
        revenue: "100k € a 1M € ARR",
        body: "Has superado los informes nativos de Shopify pero todavía no puedes justificar una contratación de datos. Velur reemplaza el montón de hojas de cálculo y te da un único sitio donde leer ingresos cada mañana.",
      },
      {
        size: "DTC en crecimiento",
        revenue: "1M € a 10M € ARR",
        body: "Operas Shopify + Klaviyo + publicidad social y has perdido el hilo de qué canal de verdad se paga solo. Velur lo reconcilia todo en una línea de tiempo para que la respuesta sea obvia antes del standup.",
      },
      {
        size: "Mid-market",
        revenue: "10M € a 50M € ARR",
        body: "Tienes un analista (o tres) y están ahogados en peticiones de dashboards. Velur se convierte en la fuente de verdad sobre la que consultan, y en el brief diario que los libera para hacer análisis de verdad.",
      },
    ],
    teamEyebrow: "Lo que NO necesitas",
    teamHeading: "Sin equipo de ingeniería. Sin equipo de data science. Sin warehouse.",
    teamBody: "La mayoría de productos de analítica asumen que ya tienes la infraestructura para ejecutarlos. Velur asume que no la tienes, y entrega todo en la caja.",
    teamPoints: [
      { yes: true,  text: "OAuth a Shopify, Klaviyo, tus cuentas publicitarias, Stripe, Recharge. Minutos, no semanas." },
      { yes: true,  text: "Velur hace backfill de 90 días de histórico sobre su propia infraestructura." },
      { yes: true,  text: "Modelado de datos, normalización y capa de inteligencia incluidos con el producto." },
      { yes: true,  text: "Brief diario de ingresos escrito para la persona que toma las decisiones, no para la analista." },
      { yes: false, text: "No necesitas BigQuery, Snowflake, dbt, Fivetran ni suscripción a un warehouse." },
      { yes: false, text: "No necesitas un ingeniero de datos manteniendo pipelines." },
      { yes: false, text: "No necesitas licencia de una herramienta BI por usuario, el brief llega a ti." },
    ],
    versusEyebrow: "Por qué una capa completa supera a un chatbot de IA",
    versusHeading: "Los chatbots de IA responden preguntas. Una capa de inteligencia de ingresos cambia cómo operas.",
    versusBody: "La actual oleada de herramientas \"IA para DTC\" es básicamente una interfaz de chat colocada encima de los datos superficiales que la integración pudo coger. Se ven útiles en una demo y se caen en operaciones. Esto es lo que de verdad obtienes con Velur en su lugar.",
    versusCols: { chatbot: "Chatbots de IA", velur: "Velur" },
    versusRows: [
      {
        question: "¿Dónde viven los datos?",
        chatbot: "Lo que el chatbot scrapeó al iniciar la sesión, normalmente una vista parcial de una o dos plataformas, refrescada de manera inconsistente.",
        velur:   "Una línea de tiempo modelada y reconciliada de cada fuente de ingresos. Con backfill, versionada, consultable.",
      },
      {
        question: "¿Qué tan honestos son los números?",
        chatbot: "Auto-reportados por cada plataforma (Meta dice que generó X, Google dice que generó X, no puedes fiarte de ninguno por separado).",
        velur:   "ROAS combinado como verdad absoluta + ROAS por canal con contexto. Cuando las plataformas no coinciden, señalamos la brecha y explicamos por qué.",
      },
      {
        question: "¿Qué pinta tiene la mañana?",
        chatbot: "Entras, preguntas, vuelves a preguntar, y pegas la respuesta en Slack. La mayoría de los días nadie lo abre.",
        velur:   "Un párrafo en tu bandeja de entrada a las 8 de la mañana: qué se movió, por qué, qué hay que lanzar hoy. Dos recomendaciones, tres números.",
      },
      {
        question: "¿Qué pasa con cohortes y LTV?",
        chatbot: "Normalmente superficial, ticket medio, top clientes. Nada sobre qué canal de adquisición devuelve la inversión.",
        velur:   "Cohortes de comportamiento modeladas por primer producto, canal y precio. LTV a 12 meses por segmento con intervalos de confianza.",
      },
      {
        question: "¿Puede usarlo alguien no técnico?",
        chatbot: "Solo si sabe cómo promptearlo. La calidad del output depende de la pregunta.",
        velur:   "El output está escrito para la persona que opera. La inteligencia te llega a ti, no hace falta saber promptear.",
      },
      {
        question: "¿Qué pasa si cancelas?",
        chatbot: "Historial de conversación borrado, integraciones desconectadas, nada que llevarte.",
        velur:   "Cada modelo SQL, cada dashboard, cada función de scoring en tu repositorio, a tu nombre, desde el primer día. Cancela cuando quieras, nada se rompe, nada desaparece.",
      },
    ],
    closingEyebrow: "Listos para leer ingresos con claridad",
    closingHeading: "Velur es para operadores que preferirían leer un buen brief antes que tocar diez dashboards.",
    closingBody: "Únete a la lista de espera y te escribiremos personalmente cuando se abra el siguiente cupo. Sin drip automatizado, sin embudo de ventas, solo una conversación sobre lo que estás operando.",
    closingCta: "Unirse a la lista",
  },
} as const;

type Copy = typeof COPY.en | typeof COPY.es;

export default function CustomersContent() {
  const { lang } = useLanguage();
  const c: Copy = COPY[lang];
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-canvas border-b border-border-light"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <Orbs />
        <div className="relative" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="mb-6">
            <span className="inline-flex rounded-full bg-[#E4EAC8] px-4 py-2 font-display text-[11px] uppercase tracking-[0.16em] text-ink">
              {c.eyebrow}
            </span>
          </p>
          <h1
            className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-6 max-w-[20ch]"
            style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}
          >
            {c.h1}
          </h1>
          <p className="font-sans text-[18px] leading-[1.5] text-ink max-w-[58ch]">
            {c.subhead}
          </p>
        </div>
      </section>

      {/* Brand art band, spiral delta (every account converging on one console) */}
      <section className="bg-canvas" style={{ padding: "var(--section-y-tight) 0 0" }}>
        <ArtBand src="/art/abstract-pills.png" className="h-[220px] md:h-[340px] lg:h-[420px]" />
      </section>

      {/* Audience cards */}
      <section
        className="bg-canvas"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-2">
              {c.audienceEyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink-strong leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.audienceHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {c.audienceCards.map((card, i) => (
              <motion.div
                key={card.size}
                initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-paper border border-line p-7 md:p-8 flex flex-col gap-4"
              >
                <h3 className="font-display font-normal text-ink-strong text-[22px] leading-tight tracking-[-0.01em]">
                  {card.size}
                </h3>
                <p className="font-display text-[11.5px] uppercase tracking-[0.06em] text-signal-green">
                  {card.revenue}
                </p>
                <p className="font-sans text-[15px] text-ink/80 leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* No team needed */}
      <section
        className="bg-cream border-y border-border-light"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          <div>
            <p className="font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-2">
              {c.teamEyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(26px, 3.6vw, 44px)" }}
            >
              {c.teamHeading}
            </h2>
            <p className="font-sans text-[17px] leading-[1.55] text-ink max-w-[46ch]">
              {c.teamBody}
            </p>
          </div>
          <ul className="rounded-2xl bg-paper border border-line divide-y divide-line overflow-hidden">
            {c.teamPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-4 px-6 md:px-7 py-4 md:py-5">
                <span className={`shrink-0 mt-0.5 inline-flex w-6 h-6 rounded-full items-center justify-center ${p.yes ? "bg-success/15 text-success" : "bg-error/10 text-error"}`}>
                  {p.yes ? <Check size={14} strokeWidth={2} /> : <X size={14} strokeWidth={2} />}
                </span>
                <span className="font-sans text-[15px] text-ink/85 leading-relaxed">
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chatbot vs Velur */}
      <section
        className="bg-canvas"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="mb-10 md:mb-12 max-w-3xl">
            <p className="font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-2">
              {c.versusEyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(26px, 3.6vw, 44px)" }}
            >
              {c.versusHeading}
            </h2>
            <p className="font-sans text-[17px] leading-[1.55] text-ink max-w-[58ch]">
              {c.versusBody}
            </p>
          </div>

          {/* Engaging comparison, one card per question, the answer split
              into a muted "chatbot" half and a highlighted Velur half. */}
          <div className="space-y-5">
            {c.versusRows.map((row, i) => (
              <motion.div
                key={row.question}
                initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[20px] border border-line bg-paper overflow-hidden"
              >
                <div className="px-6 md:px-10 pt-6 md:pt-8 pb-2">
                  <h3 className="font-display font-normal text-ink-strong leading-snug tracking-[-0.015em]" style={{ fontSize: "clamp(20px, 2.4vw, 27px)" }}>
                    {row.question}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="px-6 md:px-10 py-6 md:py-7 border-t border-line md:border-r">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex w-7 h-7 rounded-full bg-ink/[0.06] text-slate items-center justify-center">
                        <X size={15} strokeWidth={2} />
                      </span>
                      <span className="font-display text-[11px] uppercase tracking-[0.08em] text-slate">{c.versusCols.chatbot}</span>
                    </div>
                    <p className="font-sans text-[16px] md:text-[17px] text-ink/65 leading-[1.6]">{row.chatbot}</p>
                  </div>
                  <div className="px-6 md:px-10 py-6 md:py-7 border-t border-line bg-wash-green/40">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex w-7 h-7 rounded-full bg-signal-green text-white items-center justify-center">
                        <Check size={15} strokeWidth={2.2} />
                      </span>
                      <span className="font-display text-[11px] uppercase tracking-[0.08em] text-signal-green">{c.versusCols.velur}</span>
                    </div>
                    <p className="font-sans text-[16px] md:text-[17px] text-ink leading-[1.6]">{row.velur}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        className="bg-midnight text-on-dark"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div
          className="text-center"
          style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}
        >
          <p className="font-display text-[13px] uppercase tracking-[0.06em] text-action-blue mb-5">
            {c.closingEyebrow}
          </p>
          <h2
            className="font-display font-normal text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {c.closingHeading}
          </h2>
          <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[52ch] mx-auto mb-9">
            {c.closingBody}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-canvas text-velur-ink font-sans font-medium text-[16px] px-[30px] py-[15px] rounded-[32px] hover:bg-stone transition-colors"
          >
            {c.closingCta}
          </Link>
        </div>
      </section>
    </>
  );
}
