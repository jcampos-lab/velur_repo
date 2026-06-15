"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ArtBackdrop } from "@/components/velur/ArtBackdrop";
import { GooeyTabs } from "@/components/ui/gooey-tabs";
import { StackedDeck } from "@/components/velur/StackedDeck";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Per-page strings ─────────────────────────────────────────────────
   Inline EN+ES content keeps the translation co-located with the
   component and avoids ballooning translations.ts with one-off page
   strings. Castilian Spanish (España). */

const COPY = {
  en: {
    hero: {
      eyebrow: "Revenue Intelligence",
      h1: "The platform that ties your stack to revenue.",
      body: "Shopify, Klaviyo, Meta, TikTok and Google Ads connected to one daily brief. We tell you what actually moved money last night, in plain English, before your team is even online.",
      cta1: "Join the waitlist",
      cta2: "How it works",
    },
    mock: {
      briefEyebrow: "Today's brief · 08:02",
      briefHeadline: "Net revenue up 12% week-over-week.",
      briefBody:
        "TikTok creator drove 38% of the lift. Klaviyo win-back flow underperformed — pause variant B.",
      roasLabel: "ROAS, blended",
    },
    platform: {
      eyebrow: "The platform",
      heading: "Four modules. One screen. One decision.",
    },
    modules: [
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
      },
      {
        label: "Attribution",
        title: "iOS14 broke this. We rebuilt it.",
        body: "First-party events, server-side signals, and modeled conversions feeding one CAC and one ROAS per channel, per campaign, per creative. No more arguing with Meta's number versus Shopify's number.",
        bullets: [
          "Server-side Meta and TikTok events",
          "Modeled CAC by channel and creative",
          "Margin-adjusted ROAS, not gross",
          "Honest delta vs platform numbers",
        ],
      },
      {
        label: "Cohorts + LTV",
        title: "Retention curves by acquisition channel.",
        body: "Every cohort, every month, by first product and first channel. Find the customer you should pay more to acquire, and the channel that's selling discount hunters who never come back.",
        bullets: [
          "12-month LTV by acquisition channel",
          "First-product cohort retention",
          "Subscription churn by lifecycle day",
          "Loyalty tier behavior over time",
        ],
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
      },
    ],
    onboard: {
      eyebrow: "Onboarding",
      heading: "Velur is live. Onboarding the next cohort.",
      body: "We handle the integrations and the backfill. Your team needs an OAuth approval and twenty minutes on a Wednesday. Join the waitlist and we'll reach out when the next seat opens.",
      cta: "Join the waitlist",
    },
    steps: [
      { label: "Step 01", title: "Plug in your stack.",     body: "Shopify, Klaviyo, Meta, TikTok, plus whichever AI tools you actually use. OAuth or read-only keys." },
      { label: "Step 02", title: "We backfill 18 months.",  body: "Orders, sessions, ad spend, creative metadata, email events. So your first brief is not reading a week of noise." },
      { label: "Step 03", title: "First brief lands.",      body: "One paragraph, three numbers, two recommendations. If it is wrong, you reply and we recalibrate the next day." },
      { label: "Step 04", title: "You own the keys.",       body: "Every SQL model, every dashboard, every score function in your repo, under your name. Cancel anytime." },
    ],
    howDeep: {
      eyebrow: "How Velur works",
      heading: "From fragmented tools to one reasoning layer.",
      intro: "Velur is not a dashboard you check — it's an intelligence layer that reads your whole business and reports back. Here is exactly what happens between connecting your first tool and making a better decision.",
      stages: [
        {
          num: "01",
          title: "Connect",
          body: "Read-only OAuth into the stack you already run. Shopify, Klaviyo, Meta, TikTok, Google Ads, GA4, Stripe and Recharge connect through each platform's official flow — no engineer, no warehouse, no CSV exports.",
          details: [
            "Read-only scopes — Velur can never write to your tools",
            "EU-hosted processing under GDPR-compliant DPAs",
            "Disconnect from the source platform at any time",
          ],
        },
        {
          num: "02",
          title: "Unify",
          body: "Velur backfills eighteen months of history and normalises every source onto a single modelled timeline — orders, spend, sessions, flows, charges and refunds, all speaking the same schema.",
          details: [
            "One customer record across Shopify, Klaviyo and Stripe",
            "Currency, timezone and attribution-window normalisation",
            "Idempotent daily syncs — re-runs never duplicate data",
          ],
        },
        {
          num: "03",
          title: "Reason",
          body: "This is the layer dashboards never had. Large language models analyse the relationships across marketing, commerce, finance and customer behaviour — why revenue moved, which channel actually drove it, what changes next.",
          details: [
            "Cross-source causality: spend → sessions → orders → margin",
            "Cohort and LTV models per channel, product and price point",
            "Anomaly detection with the probable cause attached",
          ],
        },
        {
          num: "04",
          title: "Deliver",
          body: "Intelligence arrives as a written brief at 8am — what moved, why, what to do today. Forecasts come with their assumptions shown. Risks come with time left to act.",
          details: [
            "Daily brief in your inbox — no login required",
            "Forecast split by new, expansion, contraction and churn",
            "Risk flags: churn signals, campaign decay, broken flows",
          ],
        },
        {
          num: "05",
          title: "Decide",
          body: "You make the call. Every recommendation is tied to the number it moves, and every number traces back to its raw sources — so you decide faster and can defend the decision.",
          details: [
            "Recommendations ranked by expected revenue impact",
            "Every metric traceable to its source data",
            "Models and dashboards live in your repo — cancel anytime",
          ],
        },
      ],
    },
    fit: {
      eyebrow: "Who this is for",
      heading: "Honest about the fit.",
      yesLabel: "This is for you if",
      noLabel: "This is not for you if",
    },
    closing: {
      eyebrow: "Ready when you are",
      heading: "Plug in your stack. Get on the schedule.",
      cta: "Join the waitlist",
    },
  },
  es: {
    hero: {
      eyebrow: "Revenue Intelligence",
      h1: "La plataforma que conecta tu stack con los ingresos.",
      body: "Shopify, Klaviyo, Meta, TikTok y Google Ads conectados a un único informe diario. Te contamos qué movió el dinero anoche, en lenguaje claro, antes incluso de que tu equipo se haya conectado.",
      cta1: "Unirse a la lista",
      cta2: "Cómo funciona",
    },
    mock: {
      briefEyebrow: "Informe de hoy · 08:02",
      briefHeadline: "Ingresos netos +12% respecto a la semana pasada.",
      briefBody:
        "Un creador de TikTok generó el 38% de la subida. El flujo de recuperación de Klaviyo no rinde — pausa la variante B.",
      roasLabel: "ROAS combinado",
    },
    platform: {
      eyebrow: "La plataforma",
      heading: "Cuatro módulos. Una pantalla. Una decisión.",
    },
    modules: [
      {
        label: "Informe diario",
        title: "Una nota de las 8 de la mañana sobre la que sí puedes actuar.",
        body: "Cada mañana Velur te escribe un párrafo: qué se movió anoche, por qué se movió, qué hay que lanzar hoy. Ingresos netos, MRR, ROAS combinado y margen del creativo nuevo.",
        bullets: [
          "Ingresos netos y MRR por canal",
          "Margen del creativo nuevo, no los clics",
          "Nota en lenguaje claro sobre qué cambió",
          "Comparativa con la semana y el mes anteriores",
        ],
      },
      {
        label: "Atribución",
        title: "iOS14 rompió esto. Lo hemos reconstruido.",
        body: "Eventos de primera parte, señales del lado del servidor y conversiones modeladas alimentando un único CAC y un único ROAS por canal, por campaña, por creativo. Se acabó la pelea entre el número de Meta y el de Shopify.",
        bullets: [
          "Eventos server-side de Meta y TikTok",
          "CAC modelado por canal y creativo",
          "ROAS ajustado por margen, no bruto",
          "Delta honesto frente a las cifras de las plataformas",
        ],
      },
      {
        label: "Cohortes + LTV",
        title: "Curvas de retención por canal de adquisición.",
        body: "Cada cohorte, cada mes, por primer producto y primer canal. Encuentra al cliente por el que vale la pena pagar más para adquirir, y el canal que te vende cazadores de descuentos que no vuelven.",
        bullets: [
          "LTV a 12 meses por canal de adquisición",
          "Retención de cohorte por primer producto",
          "Abandono de suscripción por día del ciclo de vida",
          "Comportamiento por nivel de fidelidad en el tiempo",
        ],
      },
      {
        label: "Inteligencia creativa",
        title: "Qué publicación vendió de verdad.",
        body: "Etiquetamos cada creativo de TikTok, Instagram y Meta con metadatos cuando se publica. Conectamos vistas, guardados y clics con pedidos y margen, no solo con engagement.",
        bullets: [
          "TikTok, Instagram y Meta medidos juntos",
          "Ingresos hook a hook, no engagement",
          "Lista de qué pausar esta semana",
          "Lista de qué amplificar por su rendimiento",
        ],
      },
    ],
    onboard: {
      eyebrow: "Onboarding",
      heading: "Velur está activo. Onboardeando la próxima cohorte.",
      body: "Nosotros nos encargamos de las integraciones y del backfill. Tu equipo solo necesita aprobar el OAuth y dedicarnos veinte minutos un miércoles. Únete a la lista y te escribiremos cuando se abra el siguiente cupo.",
      cta: "Unirse a la lista",
    },
    steps: [
      { label: "Paso 01", title: "Conecta tu stack.",            body: "Shopify, Klaviyo, Meta, TikTok, más las herramientas de IA que uses de verdad. OAuth o claves de solo lectura." },
      { label: "Paso 02", title: "Hacemos backfill de 18 meses.", body: "Pedidos, sesiones, inversión publicitaria, metadatos creativos, eventos de email. Así tu primer informe no está leyendo una semana de ruido." },
      { label: "Paso 03", title: "Llega el primer informe.",      body: "Un párrafo, tres números, dos recomendaciones. Si algo no encaja, respondes y recalibramos al día siguiente." },
      { label: "Paso 04", title: "Las llaves son tuyas.",         body: "Cada modelo SQL, cada dashboard, cada función de scoring en tu repositorio, a tu nombre. Cancela cuando quieras." },
    ],
    howDeep: {
      eyebrow: "Cómo funciona Velur",
      heading: "De herramientas fragmentadas a una sola capa que razona.",
      intro: "Velur no es un dashboard que consultas — es una capa de inteligencia que lee todo tu negocio y te informa. Esto es exactamente lo que pasa entre conectar tu primera herramienta y tomar una decisión mejor.",
      stages: [
        {
          num: "01",
          title: "Conecta",
          body: "OAuth de solo lectura al stack que ya usas. Shopify, Klaviyo, Meta, TikTok, Google Ads, GA4, Stripe y Recharge se conectan por el flujo oficial de cada plataforma — sin ingeniero, sin warehouse, sin exportar CSVs.",
          details: [
            "Permisos de solo lectura — Velur nunca puede escribir en tus herramientas",
            "Procesamiento alojado en la UE bajo acuerdos DPA conformes con el RGPD",
            "Desconecta desde la plataforma de origen cuando quieras",
          ],
        },
        {
          num: "02",
          title: "Unifica",
          body: "Velur hace backfill de dieciocho meses de histórico y normaliza cada fuente en una sola línea de tiempo modelada — pedidos, inversión, sesiones, flujos, cargos y reembolsos, todos hablando el mismo esquema.",
          details: [
            "Un solo registro de cliente entre Shopify, Klaviyo y Stripe",
            "Normalización de moneda, zona horaria y ventana de atribución",
            "Syncs diarios idempotentes — repetirlos nunca duplica datos",
          ],
        },
        {
          num: "03",
          title: "Razona",
          body: "Esta es la capa que los dashboards nunca tuvieron. Grandes modelos de lenguaje analizan las relaciones entre marketing, comercio, finanzas y comportamiento del cliente — por qué se movieron los ingresos, qué canal lo generó de verdad, qué cambia después.",
          details: [
            "Causalidad entre fuentes: inversión → sesiones → pedidos → margen",
            "Modelos de cohortes y LTV por canal, producto y precio",
            "Detección de anomalías con la causa probable adjunta",
          ],
        },
        {
          num: "04",
          title: "Entrega",
          body: "La inteligencia llega como un brief escrito a las 8 de la mañana — qué se movió, por qué, qué hacer hoy. Los forecasts llegan con sus supuestos a la vista. Los riesgos llegan con tiempo para actuar.",
          details: [
            "Brief diario en tu bandeja de entrada — sin necesidad de login",
            "Forecast desglosado en nuevo, expansión, contracción y churn",
            "Alertas de riesgo: señales de churn, decaimiento de campañas, flujos rotos",
          ],
        },
        {
          num: "05",
          title: "Decide",
          body: "Tú tomas la decisión. Cada recomendación está atada al número que mueve, y cada número se rastrea hasta sus fuentes — decides más rápido y puedes defender la decisión.",
          details: [
            "Recomendaciones ordenadas por impacto esperado en ingresos",
            "Cada métrica trazable hasta sus datos de origen",
            "Modelos y dashboards viven en tu repositorio — cancela cuando quieras",
          ],
        },
      ],
    },
    fit: {
      eyebrow: "Para quién es esto",
      heading: "Honestos sobre el encaje.",
      yesLabel: "Esto es para ti si",
      noLabel: "Esto no es para ti si",
    },
    closing: {
      eyebrow: "Cuando estés listo",
      heading: "Conecta tu stack. Reserva tu hueco.",
      cta: "Unirse a la lista",
    },
  },
} as const;

/* ─── Hero card ────────────────────────────────────────────────────────── */

type Copy = typeof COPY.en | typeof COPY.es;

function HeroCard({ c, m }: { c: Copy; m: Copy["mock"] }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-brand-brown text-paper overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[420px]">
        <div className="p-7 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <p className="font-display text-[10.5px] tracking-[0.18em] text-amber uppercase mb-5">
              {c.hero.eyebrow}
            </p>
            <h1
              className="font-display font-normal leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
            >
              {c.hero.h1}
            </h1>
            <p className="font-sans text-paper/75 leading-relaxed text-[15px] md:text-[16px] max-w-md">
              {c.hero.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center bg-transparent text-paper border border-on-dark/30 font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-ink/10 transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
        </div>

        {/* Right preview — dunes brand art behind the floating console cards */}
        <div className="relative bg-signal-green overflow-hidden hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/abstract-green.png"
            alt=""
            aria-hidden="true"
            className="art-live absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "70% center" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-velur-ink/25" aria-hidden="true" />
          <div className="absolute top-10 left-8 right-12 rounded-xl bg-velur-ink/95 backdrop-blur-sm border border-ink-700 p-5 shadow-2xl">
            <p className="font-display text-[9.5px] tracking-[0.18em] text-signal-green-300 uppercase">
              {m.briefEyebrow}
            </p>
            <p className="font-sans font-semibold text-on-dark text-[16px] leading-tight mt-2">
              {m.briefHeadline}
            </p>
            <p className="font-sans text-[12px] text-on-dark-muted leading-snug mt-2">
              {m.briefBody}
            </p>
          </div>
          <div className="absolute bottom-10 right-10 left-20 rounded-xl bg-velur-ink border border-ink-700 p-4 shadow-2xl">
            <p className="font-display text-[9px] tracking-[0.18em] text-signal-green-300 uppercase mb-2">
              {m.roasLabel}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="font-sans font-semibold text-on-dark text-[24px] leading-none">3.14×</p>
              <p className="font-mono text-[10px] text-revenue-up">▲ 21.9%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function ServicesContent() {
  const { t, lang } = useLanguage();
  const c: Copy = COPY[lang];
  const s = t.services;
  const prefersReduced = useReducedMotion();
  const howRef = useRef<HTMLElement>(null);

  /* GSAP — scoped to the "How Velur works" deep-dive section. The
     rest of the page keeps its existing reveal motion; all GSAP
     animation lives behind a reduced-motion matchMedia gate. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gsv-rise", {
          y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: howRef.current, start: "top 80%" },
        });
        /* The stacked-deck scroll scaling lives inside <StackedDeck>. */
      });
      return () => mm.revert();
    },
    { scope: howRef },
  );

  return (
    <>
      {/* Hero card */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <HeroCard c={c} m={c.mock} />
        </div>
      </section>

      {/* Module explorer — four cards, one per platform module */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-10 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">{c.platform.eyebrow}</p>
            <h2
              className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
            >
              {c.platform.heading}
            </h2>
          </div>
          <GooeyTabs
            tabs={c.modules.map((m) => ({
              label: m.label,
              content: (
                <div className="max-w-[760px]">
                  <h3
                    className="font-display font-normal text-ink-strong leading-[1.1] tracking-[-0.02em] mb-4"
                    style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
                  >
                    {m.title}
                  </h3>
                  <p className="font-sans text-[15.5px] leading-[1.6] text-ink/75 mb-6">
                    {m.body}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-signal-green" />
                        <span className="font-sans text-[14px] text-ink/85 leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* How Velur works — the 5-stage deep dive (GSAP) */}
      <section id="how" ref={howRef} className="bg-paper border-y border-line py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="gsv-rise mb-4">
            <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-3">
              {c.howDeep.eyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em] max-w-[22ch]"
              style={{ fontSize: "clamp(26px, 3.6vw, 48px)" }}
            >
              {c.howDeep.heading}
            </h2>
          </div>
          <p className="gsv-rise font-sans text-[17px] leading-[1.6] text-ink/80 max-w-[60ch] mb-14">
            {c.howDeep.intro}
          </p>

          {/* Stacked deck — readable soft tints + a Signal Green finale.
              Each stage pins under the nav while the next slides over it. */}
          <StackedDeck
            cards={c.howDeep.stages.map((s) => ({
              ghost: s.num,
              title: s.title,
              body: s.body,
              bullets: [...s.details],
            }))}
          />
        </div>
      </section>

      {/* Onboarding strip, dark wrapper */}
      <section className="bg-cream py-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16">
            <ArtBackdrop
              still="/art/abstract-pills.png"
              overlay="rgba(16,19,22,0.62)"
              objectPosition="center 75%"
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-display text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-4">
                  {c.onboard.eyebrow}
                </p>
                <h2
                  className="font-display font-normal leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  {c.onboard.heading}
                </h2>
                <p className="font-sans text-on-dark-muted leading-relaxed mt-5 text-[15px] md:text-[16px] max-w-md">
                  {c.onboard.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors"
                >
                  {c.onboard.cta}
                </Link>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {c.steps.map(step => (
                  <div key={step.label} className="rounded-2xl bg-on-dark/[0.06] border border-on-dark/15 p-5">
                    <p className="font-display text-[10px] tracking-[0.18em] text-signal-green-300 uppercase mb-3">
                      {step.label}
                    </p>
                    <p className="font-sans font-semibold text-paper text-[16px] leading-tight mb-2">
                      {step.title}
                    </p>
                    <p className="font-sans text-[13.5px] text-on-dark-muted leading-relaxed">
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
            <p className="font-sans text-ink/55 text-[13px] mb-2">{c.fit.eyebrow}</p>
            <h2
              className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
            >
              {c.fit.heading}
            </h2>
          </div>
          <GooeyTabs
            tabs={[
              {
                label: c.fit.yesLabel,
                content: (
                  <ul className="space-y-3 max-w-[64ch]">
                    {s.rightForItems.map((g, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                          <circle cx="8" cy="8" r="8" fill="#0E8A5F" opacity="0.12" />
                          <path d="M4.5 8.2 L7 10.5 L11.5 5.5" stroke="#0E8A5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                        <span className="font-sans text-[15px] text-ink/85 leading-relaxed">{g}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                label: c.fit.noLabel,
                content: (
                  <ul className="space-y-3 max-w-[64ch]">
                    {s.notRightForItems.map((n, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                          <circle cx="8" cy="8" r="8" fill="#8A8F98" opacity="0.12" />
                          <path d="M5 5 L11 11 M11 5 L5 11" stroke="#8A8F98" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <span className="font-sans text-[15px] text-ink/65 leading-relaxed">{n}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-[420px] h-[420px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(79,183,141,0.22), transparent 65%)", filter: "blur(20px)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
              <div className="max-w-2xl">
                <p className="font-display text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-3">
                  {c.closing.eyebrow}
                </p>
                <h3
                  className="font-display font-normal leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  {c.closing.heading}
                </h3>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors self-start md:self-auto"
              >
                {c.closing.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
