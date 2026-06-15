"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ConsoleMock } from "@/components/velur/ConsoleMock";
import { RevenueAreaCard } from "@/components/velur/RevenueAreaCard";
import { SignalJourney } from "@/components/velur/SignalJourney";
import { RippleGrid } from "@/components/ui/ripple-grid";
import { TiltCard } from "@/components/ui/tilt-card";
import { GooeyTabs } from "@/components/ui/gooey-tabs";
import {
  Plug,
  Layers,
  BrainCircuit,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Lightbulb,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ────────────────────────────────────────────────────────────────────
   Velur, Homepage v3 · "AI Revenue Operating System"
   --------------------------------------------------------------------
   Cohere-grade structure (monumental centered hero → media composition
   → trust strip → problem → dark solution band → how it works →
   questions → features → before/after → integrations → proof → CTA),
   built on Velur's own palette, type and river/dunes/delta art.

   Motion: GSAP + ScrollTrigger throughout. Lenis (SmoothScrollProvider)
   animates native scroll, so ScrollTrigger reads it without adapters.
   All animation lives inside gsap.matchMedia("(prefers-reduced-motion:
   no-preference)"), reduced-motion users get the static page.
   ──────────────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    hero: {
      eyebrow: "AI Revenue Operating System",
      h1a: "AI that understands",
      h1b: "your entire business.",
      sub: "Velur sits above the tools you already run, Shopify, Meta, Klaviyo, Stripe, and turns their fragmented data into one reasoning intelligence layer. It reads everything, so you don't have to.",
      ctaPrimary: "Join the waitlist",
      ctaSecondary: "How it works",
      mediaChipLabel: "Today's brief · 08:02",
      mediaChipText: "Net revenue up 12.4%, TikTok creative drove the lift. One flow needs attention.",
    },
    strip: {
      caption: "Reads from the tools you already run",
      tools: ["Shopify", "Klaviyo", "Meta Ads", "TikTok Ads", "Google Ads", "GA4", "Stripe", "Recharge"],
    },
    problem: {
      eyebrow: "The problem",
      statement: "You don't have a data problem. You have an intelligence problem.",
      silos: [
        { where: "Meta · Google",  what: "Marketing" },
        { where: "Shopify",        what: "Customers" },
        { where: "Stripe",         what: "Revenue" },
        { where: "Klaviyo",        what: "Retention" },
        { where: "GA4",            what: "Behaviour" },
        { where: "Spreadsheets",   what: "Everything else" },
      ],
      after: "Every tool reports its own version of the truth. None of them can see the whole business. That gap, between ten dashboards and one decision, is where revenue quietly leaks.",
    },
    solution: {
      eyebrow: "The solution",
      h2: "One intelligence layer above everything.",
      body: "Velur ingests every revenue signal onto a single modelled timeline, then uses large language models to reason across the whole customer journey, acquisition, conversion, retention, billing. It isn't another dashboard. It's the analyst that reads all of them.",
      points: [
        "One source of truth, reconciled daily",
        "Insight written in plain language, not charts to decode",
        "Forecasts and risks surfaced before they cost you",
      ],
      chart: {
        label: "Net revenue · last 30 days",
        metric: "€1.42M",
        delta: "+12.4% vs prior 30d",
        seriesLabel: "Net revenue",
      },
    },
    how: {
      eyebrow: "How it works",
      h2: "Five steps from chaos to clarity.",
      steps: [
        { icon: "plug",   title: "Connect",  body: "OAuth into your stack. Read-only scopes, no engineering, minutes not weeks." },
        { icon: "layers", title: "Unify",    body: "Velur backfills 18 months of history and reconciles every source onto one timeline." },
        { icon: "brain",  title: "Reason",   body: "LLMs analyse the relationships across marketing, commerce, finance and customer behaviour." },
        { icon: "file",   title: "Deliver",  body: "Insights, forecasts, risks and recommendations arrive as a written brief, not a chart to decode." },
        { icon: "check",  title: "Decide",   body: "You make the call. Faster, with the whole picture, before the moment passes." },
      ],
    },
    questions: {
      eyebrow: "Ask it anything",
      h2: "The questions Velur answers every day.",
      groups: [
        {
          label: "Revenue",
          note: "Every movement traced back to its cause, channel, creative, cohort or flow.",
          items: ["Why did revenue decline this week?", "Where are we losing money?"],
        },
        {
          label: "Acquisition",
          note: "Spend, sessions, orders and margin reconciled into one honest ROAS per channel.",
          items: ["Which channel brings the highest-LTV customers?", "Which campaigns should be paused today?"],
        },
        {
          label: "Profit",
          note: "Contribution margin per product and segment, not just gross revenue.",
          items: ["Which products actually drive profit?", "Which segments are growing fastest?"],
        },
        {
          label: "Forecast",
          note: "Churn signals and next month's revenue, with every assumption shown.",
          items: ["What is causing customer churn?", "What's the expected revenue next month?"],
        },
      ],
    },
    features: {
      eyebrow: "What you get",
      h2: "Intelligence that arrives, instead of dashboards that wait.",
      detailLabel: "How it works",
      learnMore: "How it works",
      close: "Close",
      cards: [
        {
          icon: "file",
          art: "/art/abstract-tiles.png",
          title: "The daily brief",
          body: "One paragraph at 8am: what moved, why it moved, what to do today. Written for the operator, not the analyst.",
          detail: "Every morning Velur reads the previous night across all six connected tools, reconciles them onto one timeline, and writes a short brief, net revenue, what drove the change, which channel paid back, what needs attention. It's the work a senior analyst would do before standup, done by 8am in plain language, so you act on the day instead of decoding it.",
        },
        {
          icon: "trending",
          art: "/art/abstract-pills.png",
          title: "Forecasts with receipts",
          body: "Next month's expected revenue with every assumption shown, new, expansion, contraction, churn. No black box.",
          detail: "We never hand you a single number and ask you to trust it. Velur breaks next month's expected revenue into its parts, new customers, expansion, contraction, churn, and shows the assumption behind each one. When the forecast moves you can see exactly which lever moved it, so you can defend the number or push back on it with evidence.",
        },
        {
          icon: "shield",
          art: "/art/abstract-cylinders.png",
          title: "Risk before it lands",
          body: "Churn signals, campaign decay and broken flows flagged while there's still time to act, not in next month's report.",
          detail: "Velur watches the leading indicators, not the lagging ones, a flow that quietly broke, a cohort retaining worse than last month, a campaign whose ROAS is decaying before the spend catches up. Each risk is flagged while you can still act, with the most likely cause attached, instead of being explained after the damage in next month's report.",
        },
        {
          icon: "bulb",
          art: "/art/abstract-petals.png",
          title: "Recommendations, not homework",
          body: "Pause this ad set. Scale that creative. Fix this flow. Every recommendation tied to the number it moves.",
          detail: "Insight you can't act on is just trivia. Every Velur recommendation is specific and tied to the number it moves, pause this ad set, scale that creative, fix this flow, with the expected impact and the data behind it. You make the call; Velur does the analysis that makes the call obvious.",
        },
      ],
    },
    shift: {
      eyebrow: "The shift",
      beforeLabel: "Before Velur",
      afterLabel: "With Velur",
      before: ["Ten disconnected tools", "Conflicting reports", "Manual spreadsheets", "Hours decoding dashboards", "Reactive management"],
      after: ["One source of truth", "AI-written insight", "Forecasts you can defend", "Risks caught early", "Decisions in minutes"],
    },
    integrations: {
      eyebrow: "Integrations",
      h2: "Built on the stack you already trust.",
      liveLabel: "Live today",
      live: ["Shopify", "Meta Ads", "Stripe", "Recharge", "Google Ads", "Klaviyo"],
      link: "Explore all integrations →",
    },
    proof: {
      eyebrow: "Why trust us",
      quote: "Velur is built by a team that spent years inside DTC and small-business data stacks, data scientists, ML engineers and operators who lived the problem before building the answer.",
      body: "No invented logos, no fake case studies. An honest roadmap, and a team that reads every reply.",
      link: "Meet the team →",
    },
    cta: {
      eyebrow: "Get started",
      h2: "One place where AI understands your whole business.",
      body: "Join the waitlist and we'll reach out personally when the next seat opens.",
      button: "Join the waitlist",
    },
  },

  es: {
    hero: {
      eyebrow: "Sistema Operativo de Ingresos con IA",
      h1a: "IA que entiende",
      h1b: "todo tu negocio.",
      sub: "Velur se sitúa por encima de las herramientas que ya usas, Shopify, Meta, Klaviyo, Stripe, y convierte sus datos fragmentados en una sola capa de inteligencia que razona. Lo lee todo, para que tú no tengas que hacerlo.",
      ctaPrimary: "Unirse a la lista",
      ctaSecondary: "Cómo funciona",
      mediaChipLabel: "Informe de hoy · 08:02",
      mediaChipText: "Ingresos netos +12,4%, la creatividad de TikTok generó la subida. Un flujo necesita atención.",
    },
    strip: {
      caption: "Lee de las herramientas que ya usas",
      tools: ["Shopify", "Klaviyo", "Meta Ads", "TikTok Ads", "Google Ads", "GA4", "Stripe", "Recharge"],
    },
    problem: {
      eyebrow: "El problema",
      statement: "No tienes un problema de datos. Tienes un problema de inteligencia.",
      silos: [
        { where: "Meta · Google",   what: "Marketing" },
        { where: "Shopify",         what: "Clientes" },
        { where: "Stripe",          what: "Ingresos" },
        { where: "Klaviyo",         what: "Retención" },
        { where: "GA4",             what: "Comportamiento" },
        { where: "Hojas de cálculo", what: "Todo lo demás" },
      ],
      after: "Cada herramienta reporta su propia versión de la verdad. Ninguna puede ver el negocio completo. Esa brecha, entre diez dashboards y una decisión, es donde los ingresos se escapan en silencio.",
    },
    solution: {
      eyebrow: "La solución",
      h2: "Una capa de inteligencia por encima de todo.",
      body: "Velur ingiere cada señal de ingresos en una sola línea de tiempo modelada, y usa grandes modelos de lenguaje para razonar sobre todo el recorrido del cliente, adquisición, conversión, retención, facturación. No es otro dashboard. Es el analista que los lee todos.",
      points: [
        "Una sola fuente de verdad, reconciliada a diario",
        "Insight escrito en lenguaje claro, no gráficos que descifrar",
        "Forecasts y riesgos detectados antes de que te cuesten dinero",
      ],
      chart: {
        label: "Ingresos netos · últimos 30 días",
        metric: "1,42 M€",
        delta: "+12,4% vs 30d anteriores",
        seriesLabel: "Ingresos netos",
      },
    },
    how: {
      eyebrow: "Cómo funciona",
      h2: "Cinco pasos del caos a la claridad.",
      steps: [
        { icon: "plug",   title: "Conecta",   body: "OAuth a tu stack. Permisos de solo lectura, sin ingeniería, minutos y no semanas." },
        { icon: "layers", title: "Unifica",   body: "Velur hace backfill de 18 meses de histórico y reconcilia cada fuente en una sola línea de tiempo." },
        { icon: "brain",  title: "Razona",    body: "Los LLMs analizan las relaciones entre marketing, comercio, finanzas y comportamiento del cliente." },
        { icon: "file",   title: "Entrega",   body: "Insights, forecasts, riesgos y recomendaciones llegan como un brief escrito, no como un gráfico que descifrar." },
        { icon: "check",  title: "Decide",    body: "Tú tomas la decisión. Más rápido, con la imagen completa, antes de que pase el momento." },
      ],
    },
    questions: {
      eyebrow: "Pregúntale lo que sea",
      h2: "Las preguntas que Velur responde cada día.",
      groups: [
        {
          label: "Ingresos",
          note: "Cada movimiento trazado hasta su causa, canal, creatividad, cohorte o flow.",
          items: ["¿Por qué bajaron los ingresos esta semana?", "¿Dónde estamos perdiendo dinero?"],
        },
        {
          label: "Adquisición",
          note: "Inversión, sesiones, pedidos y margen reconciliados en un ROAS honesto por canal.",
          items: ["¿Qué canal trae los clientes con mayor LTV?", "¿Qué campañas habría que pausar hoy?"],
        },
        {
          label: "Beneficio",
          note: "Margen de contribución por producto y segmento, no solo ingreso bruto.",
          items: ["¿Qué productos generan beneficio de verdad?", "¿Qué segmentos crecen más rápido?"],
        },
        {
          label: "Forecast",
          note: "Señales de churn y el ingreso del mes que viene, con cada supuesto a la vista.",
          items: ["¿Qué está causando el churn?", "¿Cuál es el ingreso esperado el mes que viene?"],
        },
      ],
    },
    features: {
      eyebrow: "Lo que obtienes",
      h2: "Inteligencia que llega, en vez de dashboards que esperan.",
      detailLabel: "Cómo funciona",
      learnMore: "Cómo funciona",
      close: "Cerrar",
      cards: [
        {
          icon: "file",
          art: "/art/abstract-tiles.png",
          title: "El brief diario",
          body: "Un párrafo a las 8 de la mañana: qué se movió, por qué se movió, qué hacer hoy. Escrito para quien opera, no para el analista.",
          detail: "Cada mañana Velur lee la noche anterior en las seis herramientas conectadas, las reconcilia en una sola línea de tiempo y escribe un brief corto, ingreso neto, qué causó el cambio, qué canal devolvió la inversión, qué requiere atención. Es el trabajo que haría un analista senior antes del standup, listo a las 8 y en lenguaje claro, para que actúes sobre el día en vez de descifrarlo.",
        },
        {
          icon: "trending",
          art: "/art/abstract-pills.png",
          title: "Forecasts con recibos",
          body: "El ingreso esperado del mes que viene con cada supuesto a la vista, nuevo, expansión, contracción, churn. Sin caja negra.",
          detail: "Nunca te damos un único número y te pedimos que confíes. Velur descompone el ingreso esperado del mes que viene en sus partes, nuevos clientes, expansión, contracción, churn, y muestra el supuesto detrás de cada una. Cuando el forecast se mueve, ves exactamente qué palanca lo movió, para defender el número o rebatirlo con evidencia.",
        },
        {
          icon: "shield",
          art: "/art/abstract-cylinders.png",
          title: "Riesgo antes de que aterrice",
          body: "Señales de churn, decaimiento de campañas y flujos rotos detectados mientras aún hay tiempo de actuar, no en el informe del mes siguiente.",
          detail: "Velur vigila los indicadores adelantados, no los rezagados, un flow que se rompió en silencio, una cohorte que retiene peor que el mes pasado, una campaña cuyo ROAS decae antes de que el gasto lo note. Cada riesgo se señala mientras aún puedes actuar, con la causa más probable adjunta, en vez de explicarse tras el daño en el informe del mes siguiente.",
        },
        {
          icon: "bulb",
          art: "/art/abstract-petals.png",
          title: "Recomendaciones, no deberes",
          body: "Pausa este ad set. Escala esa creatividad. Arregla este flujo. Cada recomendación atada al número que mueve.",
          detail: "El insight sobre el que no puedes actuar es solo trivia. Cada recomendación de Velur es específica y está atada al número que mueve, pausa este ad set, escala esa creatividad, arregla este flujo, con el impacto esperado y los datos que la respaldan. Tú decides; Velur hace el análisis que vuelve obvia la decisión.",
        },
      ],
    },
    shift: {
      eyebrow: "El cambio",
      beforeLabel: "Antes de Velur",
      afterLabel: "Con Velur",
      before: ["Diez herramientas desconectadas", "Informes que se contradicen", "Hojas de cálculo manuales", "Horas descifrando dashboards", "Gestión reactiva"],
      after: ["Una sola fuente de verdad", "Insight escrito por IA", "Forecasts que puedes defender", "Riesgos detectados a tiempo", "Decisiones en minutos"],
    },
    integrations: {
      eyebrow: "Integraciones",
      h2: "Construido sobre el stack en el que ya confías.",
      liveLabel: "Activas hoy",
      live: ["Shopify", "Meta Ads", "Stripe", "Recharge", "Google Ads", "Klaviyo"],
      link: "Explorar todas las integraciones →",
    },
    proof: {
      eyebrow: "Por qué confiar en nosotros",
      quote: "Velur lo construye un equipo que pasó años dentro de stacks de datos DTC y de pequeño negocio, data scientists, ingenieros de ML y operadores que vivieron el problema antes de construir la respuesta.",
      body: "Sin logos inventados, sin casos de éxito falsos. Una hoja de ruta honesta y un equipo que lee cada respuesta.",
      link: "Conoce al equipo →",
    },
    cta: {
      eyebrow: "Empezar",
      h2: "Un solo lugar donde la IA entiende todo tu negocio.",
      body: "Únete a la lista de espera y te escribiremos personalmente cuando se abra el siguiente cupo.",
      button: "Unirse a la lista",
    },
  },
} as const;

type Copy = typeof COPY.en | typeof COPY.es;

const STEP_ICON: Record<string, typeof Plug> = {
  plug: Plug, layers: Layers, brain: BrainCircuit, file: FileText, check: CheckCircle2,
};
const FEATURE_ICON: Record<string, typeof FileText> = {
  file: FileText, trending: TrendingUp, shield: ShieldAlert, bulb: Lightbulb,
};

/* Word-splitter for GSAP staggered reveals. */
function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className={`gs-word inline-block ${className}`}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export default function HomeContent() {
  const root = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const c: Copy = COPY[lang];

  /* Which feature card's detail modal is open (index, or null). */
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  useEffect(() => {
    if (activeFeature === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveFeature(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeFeature]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Hero load timeline ───────────────────────────────── */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".gs-hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
          .from(".gs-hero-h1 .gs-word", { yPercent: 110, duration: 0.9, stagger: 0.05 }, "-=0.3")
          .from(".gs-hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
          .from(".gs-hero-ctas", { y: 16, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(".gs-hero-media", { y: 60, opacity: 0, scale: 0.97, duration: 1.0, stagger: 0.12 }, "-=0.35");

        /* ── Problem statement: per-word scrub reveal ─────────── */
        gsap.fromTo(
          ".gs-problem .gs-word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: { trigger: ".gs-problem", start: "top 78%", end: "top 30%", scrub: 0.6 },
          },
        );

        /* ── Generic batch reveals ────────────────────────────── */
        (gsap.utils.toArray(".gs-rise") as Element[]).forEach((el) => {
          gsap.from(el, {
            y: 36, opacity: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });
        ScrollTrigger.batch(".gs-batch", {
          start: "top 88%",
          onEnter: (els) =>
            gsap.from(els, { y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });

        /* ── Solution band: console clip reveal ───────────────── */
        gsap.from(".gs-console", {
          clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: ".gs-console", start: "top 80%" },
        });

        /* ── How it works (mobile list reveal; the desktop journey
              animates inside SignalJourney itself) ─────────────── */
        (gsap.utils.toArray(".gs-step") as Element[]).forEach((el) => {
          gsap.from(el, {
            x: -24, opacity: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });

        /* ── Art parallax ─────────────────────────────────────── */
        (gsap.utils.toArray(".gs-parallax") as Element[]).forEach((el) => {
          gsap.fromTo(
            el, { yPercent: -8 },
            { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        /* ── Floating chips: slow bob, desynced per element ────── */
        gsap.utils.toArray<HTMLElement>(".gs-float").forEach((el, i) => {
          gsap.to(el, {
            y: -8, duration: 2.6 + i * 0.4, yoyo: true, repeat: -1,
            ease: "sine.inOut", delay: i * 0.35,
          });
        });

        /* ── CTA band scale-in ────────────────────────────────── */
        gsap.from(".gs-cta-band", {
          scale: 0.96, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".gs-cta-band", start: "top 82%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ════ 1 · HERO, centered declaration + media composition ════ */}
      <section className="bg-canvas relative overflow-hidden" style={{ padding: "var(--section-y-tight) var(--gutter) 0" }}>
        <div className="text-center" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-hero-eyebrow font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-6">
            {c.hero.eyebrow}
          </p>
          <h1
            className="gs-hero-h1 font-display font-normal text-ink-strong leading-[1.02] tracking-[-0.025em] mx-auto mb-7 max-w-[16ch]"
            style={{ fontSize: "clamp(40px, 6.6vw, 92px)" }}
          >
            <span className="block"><Words text={c.hero.h1a} /></span>
            <span className="block text-signal-green"><Words text={c.hero.h1b} /></span>
          </h1>
          <p className="gs-hero-sub font-sans text-[18px] leading-[1.55] text-ink max-w-[58ch] mx-auto mb-9">
            {c.hero.sub}
          </p>
          <div className="gs-hero-ctas flex flex-wrap items-center justify-center gap-5 mb-14">
            <Link
              href="/contact"
              className="inline-flex items-center bg-velur-ink text-canvas font-sans font-medium text-[15px] px-7 py-[14px] rounded-[32px] hover:bg-ink-700 transition-colors"
            >
              {c.hero.ctaPrimary}
            </Link>
            <a href="#how" className="font-sans text-[15px] text-ink underline underline-offset-[0.25em] decoration-1 hover:decoration-2">
              {c.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Two-card media composition (wide abstract art + console) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-4 md:gap-5 items-stretch"
          style={{ maxWidth: "var(--container-wide)", margin: "0 auto", paddingBottom: "var(--section-y-tight)" }}
        >
          <div className="gs-hero-media relative rounded-[22px] overflow-hidden min-h-[300px]" style={{ boxShadow: "var(--elevation-media)" }}>
            <Image
              src="/art/abstract-glass.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="art-live gs-parallax object-cover"
              style={{ objectPosition: "center 35%" }}
            />
            {/* Brief chip overlay, the product moment inside the art.
                gs-float gives it a slow bob so the card feels alive. */}
            <div className="gs-float absolute left-5 bottom-5 right-5 sm:right-auto sm:max-w-[380px] bg-velur-ink/90 backdrop-blur-md border border-ink-700 rounded-[14px] p-4">
              <p className="font-display text-[10px] uppercase tracking-[0.08em] text-signal-green-300 mb-1.5">
                {c.hero.mediaChipLabel}
              </p>
              <p className="font-sans text-[13.5px] text-on-dark leading-snug">{c.hero.mediaChipText}</p>
            </div>
          </div>
          {/* Console is desktop-only, reads cramped on phones. */}
          <div className="gs-hero-media hidden md:block">
            <ConsoleMock />
          </div>
        </div>
      </section>

      {/* ════ 3 · PROBLEM, scrub statement + quiet ripple grid ════ */}
      <section className="bg-canvas" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_auto] gap-12 lg:gap-16 items-center"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          <div>
            <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-6">
              {c.problem.eyebrow}
            </p>
            <h2
              className="gs-problem font-display font-normal text-ink-strong leading-[1.08] tracking-[-0.02em] max-w-[24ch] mb-10"
              style={{ fontSize: "clamp(30px, 4.6vw, 60px)" }}
            >
              <Words text={c.problem.statement} />
            </h2>

            <p className="gs-rise font-sans text-[18px] leading-[1.6] text-ink max-w-[58ch]">
              {c.problem.after}
            </p>
          </div>

          {/* One signal propagating through every cell, the quiet
              counterpoint to the siloed-tools problem. Click to ripple;
              an ambient pulse fires on its own now and then. */}
          <div className="gs-rise hidden lg:block justify-self-end">
            <RippleGrid rows={7} cols={7} cellSize={36} />
          </div>
        </div>
      </section>

      {/* ════ 4 · SOLUTION, Signal Green dark band + revenue chart ════ */}
      <section className="bg-signal-green text-on-dark relative overflow-hidden" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, rgba(79,183,141,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div
          className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          <div>
            <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-signal-green-300 mb-5">
              {c.solution.eyebrow}
            </p>
            <h2 className="gs-rise font-display font-normal text-white leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(30px, 4.2vw, 54px)" }}>
              {c.solution.h2}
            </h2>
            <p className="gs-rise font-sans text-[17px] leading-[1.6] text-on-dark-muted max-w-[52ch] mb-8">
              {c.solution.body}
            </p>
            <ul className="space-y-3">
              {c.solution.points.map((p) => (
                <li key={p} className="gs-batch flex items-start gap-3">
                  <CheckCircle2 size={18} strokeWidth={1.8} className="text-signal-green-300 shrink-0 mt-0.5" />
                  <span className="font-sans text-[15px] text-on-dark leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Chart is desktop-only, it reads cramped on phones. */}
          <div className="gs-console hidden md:block" style={{ clipPath: "inset(0 0 0% 0)" }}>
            <RevenueAreaCard
              label={c.solution.chart.label}
              metric={c.solution.chart.metric}
              delta={c.solution.chart.delta}
              seriesLabel={c.solution.chart.seriesLabel}
            />
          </div>
        </div>
      </section>

      {/* ════ 5 · HOW IT WORKS, progress rail + 5 steps ════ */}
      <section id="how" className="bg-canvas" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-4">{c.how.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-14 max-w-[20ch]" style={{ fontSize: "clamp(30px, 4.2vw, 54px)" }}>
            {c.how.h2}
          </h2>

          {/* Desktop: the signal journey, a curved line weaving the
              full width, drawn on scroll, with a pulse riding it
              station to station. */}
          <div className="hidden md:block">
            <SignalJourney
              steps={c.how.steps.map((s) => {
                const Icon = STEP_ICON[s.icon] ?? Plug;
                return {
                  title: s.title,
                  body: s.body,
                  icon: <Icon size={22} strokeWidth={1.5} />,
                };
              })}
            />
          </div>

          {/* Mobile: compact stacked list. */}
          <ol className="md:hidden space-y-9">
            {c.how.steps.map((s, i) => {
              const Icon = STEP_ICON[s.icon] ?? Plug;
              return (
                <li key={s.title} className="gs-step">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={22} strokeWidth={1.5} className="text-signal-green" />
                    <span className="font-display text-[12px] tracking-[0.08em] text-slate">0{i + 1}</span>
                    <h3 className="font-display font-normal text-ink-strong text-[22px] tracking-[-0.01em]">{s.title}</h3>
                  </div>
                  <p className="font-sans text-[15px] text-ink/80 leading-[1.6]">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ════ 6 · QUESTIONS, gooey tabs by question category ════ */}
      <section className="bg-stone-200 border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-action-blue mb-4">{c.questions.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-12 max-w-[22ch]" style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>
            {c.questions.h2}
          </h2>
          <div className="gs-rise">
            <GooeyTabs
              surfaceClass="bg-paper"
              tabs={c.questions.groups.map((g) => ({
                label: g.label,
                content: (
                  <div className="max-w-[760px]">
                    <ul className="space-y-4 mb-6">
                      {g.items.map((q, qi) => (
                        <li key={q} className="flex items-baseline gap-4">
                          <span className="font-display text-[11px] uppercase tracking-[0.08em] text-signal-green shrink-0">
                            Q{String(qi + 1).padStart(2, "0")}
                          </span>
                          <p
                            className="font-display font-normal text-ink-strong leading-[1.25] tracking-[-0.015em]"
                            style={{ fontSize: "clamp(19px, 2.2vw, 27px)" }}
                          >
                            {q}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="font-sans text-[14.5px] text-ink/70 leading-[1.55] border-t border-line pt-5">
                      {g.note}
                    </p>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* ════ 7 · FEATURES, 4 art-led capability cards ════ */}
      <section className="bg-canvas" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-4">{c.features.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-12 max-w-[24ch]" style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>
            {c.features.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {c.features.cards.map((f, i) => {
              const Icon = FEATURE_ICON[f.icon] ?? FileText;
              return (
                <div key={f.title} className="gs-batch">
                  <TiltCard className="rounded-[22px]">
                    <article
                      onClick={() => setActiveFeature(i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveFeature(i)}
                      aria-haspopup="dialog"
                      className="group cursor-pointer rounded-[22px] bg-paper border border-line overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_64px_-32px_rgba(11,61,46,0.35)]"
                    >
                      <div className="relative h-[180px] md:h-[220px] overflow-hidden">
                        <Image
                          src={f.art}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="art-live gs-parallax object-cover"
                        />
                      </div>
                      <div className="p-7 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex text-signal-green items-center">
                            <Icon size={26} strokeWidth={1.5} />
                          </span>
                          <h3 className="font-display font-normal text-ink-strong text-[21px] tracking-[-0.01em]">{f.title}</h3>
                        </div>
                        <p className="font-sans text-[14.5px] text-ink/80 leading-[1.6] mb-4">{f.body}</p>
                        <span className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-signal-green">
                          {c.features.learnMore}
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </span>
                      </div>
                    </article>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature detail modal, blurs the page, explains how each works. */}
        <AnimatePresence>
          {activeFeature !== null && (() => {
            const f = c.features.cards[activeFeature];
            const Icon = FEATURE_ICON[f.icon] ?? FileText;
            return (
              <motion.div
                className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
                aria-label={f.title}
              >
                <div
                  className="absolute inset-0 bg-velur-ink/70 backdrop-blur-md"
                  onClick={() => setActiveFeature(null)}
                  aria-hidden
                />
                <motion.div
                  className="relative w-full max-w-xl rounded-[22px] bg-canvas overflow-hidden shadow-2xl"
                  initial={{ scale: 0.96, y: 12 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.97, y: 8, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                >
                  <div className="relative h-[160px] overflow-hidden">
                    <Image src={f.art} alt="" fill sizes="600px" className="art-live object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveFeature(null)}
                    aria-label={c.features.close}
                    className="absolute top-4 right-4 z-10 inline-flex w-9 h-9 items-center justify-center rounded-full bg-velur-ink/70 text-white hover:bg-velur-ink transition-colors"
                  >
                    <X size={18} strokeWidth={1.8} />
                  </button>
                  <div className="p-7 md:p-9">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex text-signal-green items-center">
                        <Icon size={24} strokeWidth={1.5} />
                      </span>
                      <h3 className="font-display font-normal text-ink-strong text-[24px] tracking-[-0.015em]">{f.title}</h3>
                    </div>
                    <p className="font-display text-[11px] uppercase tracking-[0.08em] text-slate mb-4">
                      {c.features.detailLabel}
                    </p>
                    <p className="font-sans text-[15.5px] leading-[1.6] text-ink/85">{f.detail}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* ════ 8 · THE SHIFT, before / with Velur as gooey tabs ════ */}
      <section className="bg-canvas" style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div className="gs-rise" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <GooeyTabs
            tabs={[
              {
                label: c.shift.beforeLabel,
                content: (
                  <ul className="space-y-3.5 max-w-[64ch]">
                    {c.shift.before.map((b) => (
                      <li key={b} className="font-sans text-[15.5px] text-ink/60 leading-snug line-through decoration-ink/25 decoration-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                label: c.shift.afterLabel,
                content: (
                  <ul className="space-y-3.5 max-w-[64ch]">
                    {c.shift.after.map((a) => (
                      <li key={a} className="flex items-start gap-3">
                        <CheckCircle2 size={20} strokeWidth={1.8} className="text-signal-green shrink-0 mt-0.5" />
                        <span className="font-sans text-[15.5px] text-ink leading-snug">{a}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* ════ 9 · INTEGRATIONS, the six live tools ════ */}
      <section className="bg-cream border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-4">{c.integrations.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-10 max-w-[22ch]" style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>
            {c.integrations.h2}
          </h2>

          <p className="gs-rise font-display text-[11px] uppercase tracking-[0.08em] text-signal-green mb-4">{c.integrations.liveLabel}</p>
          <div className="flex flex-wrap gap-2.5 mb-10">
            {c.integrations.live.map((t) => (
              <span key={t} className="gs-batch inline-flex items-center gap-2 bg-paper border border-line rounded-[30px] px-5 py-2.5 font-sans text-[14.5px] text-ink-strong transition-transform duration-300 hover:-translate-y-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                {t}
              </span>
            ))}
          </div>

          <Link href="/integrations" className="gs-rise inline-block font-sans text-[15px] text-action-blue underline underline-offset-[0.25em] decoration-1 hover:decoration-2">
            {c.integrations.link}
          </Link>
        </div>
      </section>

      {/* ════ 10 · PROOF, honest founder note (no fake logos) ════ */}
      <section className="bg-canvas" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-6 text-center">{c.proof.eyebrow}</p>
          <blockquote className="gs-rise font-display font-normal text-ink-strong leading-[1.3] tracking-[-0.01em] text-center mb-6" style={{ fontSize: "clamp(20px, 2.6vw, 30px)" }}>
            &ldquo;{c.proof.quote}&rdquo;
          </blockquote>
          <p className="gs-rise font-sans text-[15.5px] text-ink/70 leading-relaxed text-center mb-6 max-w-[52ch] mx-auto">
            {c.proof.body}
          </p>
          <p className="gs-rise text-center">
            <Link href="/company" className="font-sans text-[15px] text-action-blue underline underline-offset-[0.25em] decoration-1 hover:decoration-2">
              {c.proof.link}
            </Link>
          </p>
        </div>
      </section>

      {/* ════ 11 · CTA, abstract green art band ════ */}
      <section className="bg-canvas" style={{ padding: "0 var(--gutter) var(--section-y)" }}>
        <div
          className="gs-cta-band relative rounded-[22px] overflow-hidden text-center"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "clamp(64px, 9vw, 140px) 24px" }}
        >
          <Image
            src="/art/abstract-green.png"
            alt=""
            fill
            sizes="100vw"
            className="art-live gs-parallax object-cover"
            aria-hidden
          />
          <div aria-hidden className="absolute inset-0 bg-velur-ink/60" />
          <div className="relative">
            <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green-300 mb-5">{c.cta.eyebrow}</p>
            <h2 className="font-display font-normal text-white leading-[1.05] tracking-[-0.02em] mx-auto mb-5 max-w-[20ch]" style={{ fontSize: "clamp(28px, 4.4vw, 56px)" }}>
              {c.cta.h2}
            </h2>
            <p className="font-sans text-[17px] leading-[1.5] text-white/85 max-w-[44ch] mx-auto mb-9">{c.cta.body}</p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-canvas text-velur-ink font-sans font-medium text-[16px] px-[30px] py-[15px] rounded-[32px] hover:bg-stone transition-colors"
            >
              {c.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
