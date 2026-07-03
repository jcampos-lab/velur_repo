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
import { Orbs } from "@/components/velur/Orbs";
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
  Lock,
  ScanSearch,
  Gauge,
  UserCheck,
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
      eyebrow: "Revenue intelligence for DTC",
      h1a: "Your revenue, decoded",
      h1b: "every morning.",
      sub: "Velur connects your store, ads, billing and email through read-only access, reconciles everything onto one timeline, and writes the brief that explains your day: what changed, what's behind it, what to act on. Every number traces back to its source.",
      ctaPrimary: "Join the waitlist",
      ctaSecondary: "How it works",
      mediaChipLabel: "Example brief · 08:02",
      mediaChipText: "Net revenue +12.4% w/w. Driver: Meta creative. One Klaviyo flow needs attention.",
    },
    strip: {
      caption: "Reads from the tools you already run",
      tools: ["Shopify", "Klaviyo", "Meta Ads", "TikTok Ads", "Google Ads", "GA4", "Stripe", "Recharge"],
    },
    problem: {
      eyebrow: "The problem",
      statement: "Your numbers live in ten tools. The answer lives in none of them.",
      silos: [
        { where: "Meta · Google",  what: "Marketing" },
        { where: "Shopify",        what: "Customers" },
        { where: "Stripe",         what: "Revenue" },
        { where: "Klaviyo",        what: "Retention" },
        { where: "GA4",            what: "Behaviour" },
        { where: "Spreadsheets",   what: "Everything else" },
      ],
      after: "Every tool reports its own version of the truth, and none of them can see the whole business. That gap, between ten dashboards and one decision, is where revenue quietly leaks: the broken flow no one caught, the channel that stopped paying back, the cohort that started churning a month before the report showed it.",
    },
    solution: {
      eyebrow: "The solution",
      h2: "Every tool, reconciled onto one timeline.",
      body: "Velur pulls every order, charge, ad and subscription onto a single timeline and computes the metrics deterministically. A language model then explains them in plain words, what changed and what's behind it, with every number traceable to its source. Not another dashboard to read, a written summary of what moved and what to look at next.",
      points: [
        "Verified metrics, reconciled daily from read-only data",
        "Plain-language summaries, not charts to decode",
        "Unusual movements flagged for you to review",
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
      h2: "From your tools to a daily brief.",
      steps: [
        { icon: "plug",   title: "Connect",         body: "Read-only OAuth into your tools. No engineering, and Velur can never write back." },
        { icon: "layers", title: "Reconcile",       body: "Velur backfills 90 days and reconciles every source onto one timeline." },
        { icon: "brain",  title: "Explain",         body: "Velur computes the metrics and deltas deterministically, then a language model explains them in plain words." },
        { icon: "file",   title: "Your daily brief", body: "Each morning: what changed, what's behind it, and what to look at, with sources you can check. Reply if something looks off." },
      ],
    },
    questions: {
      eyebrow: "What it helps with",
      h2: "The questions Velur helps you answer.",
      groups: [
        {
          label: "Revenue",
          note: "Every movement linked to what drives it, channel, creative, cohort or flow, with sources you can check.",
          items: ["Why did revenue change this week?", "Where might we be losing money?"],
        },
        {
          label: "Acquisition",
          note: "Spend, sessions, orders and margin reconciled into one blended ROAS per channel.",
          items: ["Which channel brings the highest-LTV customers?", "Which campaigns are losing efficiency?"],
        },
        {
          label: "Profit",
          note: "Contribution margin per product and segment, not just gross revenue.",
          items: ["Which products actually drive profit?", "Which segments are growing fastest?"],
        },
        {
          label: "Retention",
          note: "Cohort and churn trends, with the numbers behind them.",
          items: ["Which cohorts are retaining worse than before?", "Which customers look at risk of churning?"],
        },
      ],
    },
    features: {
      eyebrow: "What you get",
      h2: "Answers that come to you, instead of dashboards you check.",
      detailLabel: "How it works",
      learnMore: "How it works",
      close: "Close",
      cards: [
        {
          icon: "file",
          art: "/art/abstract-tiles.png",
          title: "The daily brief",
          body: "One short note: what changed, what's behind it, what to look at. Written for the operator, in plain language.",
          detail: "Each morning Velur reads the previous day across your connected tools, reconciles them onto one timeline, and writes a short brief: net revenue, what changed, the driver behind it, what needs your attention. It's a starting point for your day, not a replacement for your judgement, and every number links back to its source.",
        },
        {
          icon: "trending",
          art: "/art/abstract-pills.png",
          title: "Numbers you can audit",
          body: "Metrics and deltas are computed deterministically from read-only data. Every figure traces back to where it came from.",
          detail: "Velur never hands you a number and asks you to trust it. The metrics and deltas in your brief are calculated deterministically from your connected data, and every figure links back to its source, so you can check it instead of taking it on faith. The language model only explains the verified numbers, it doesn't invent them.",
        },
        {
          icon: "shield",
          art: "/art/abstract-cylinders.png",
          title: "Signals before they cost you",
          body: "Velur flags unusual changes, a flow that shifted, a cohort retaining differently, a campaign losing efficiency, so you can look while it still matters.",
          detail: "Velur watches for unusual movements across your data, a flow whose performance changed, a cohort retaining worse than before, a campaign losing efficiency, and flags them with the driver behind it. Flags are signals to review, not guarantees, and low-confidence ones are kept quiet so you're not chasing noise.",
        },
        {
          icon: "bulb",
          art: "/art/abstract-petals.png",
          title: "Pointers, not commands",
          body: "Velur points you to what changed and what needs a closer look, tied to the numbers behind it. You decide.",
          detail: "Insight you can't use is just trivia. Velur points you to what changed and what needs a closer look, tied to the numbers behind it, so the next step is clearer. It's decision support, not autopilot: you make the call, and if it gets something wrong, you can tell it.",
        },
      ],
    },
    trust: {
      eyebrow: "Built to be trusted",
      h2: "Decision support you can check.",
      points: [
        { title: "Read-only access", body: "Velur connects through official OAuth with read-only scopes. It reads your data, never changes it." },
        { title: "Source-backed numbers", body: "Every figure is computed deterministically and traces back to where it came from, so you can check it." },
        { title: "Confidence-aware", body: "Low-confidence signals are kept quiet. Velur flags what needs your attention, and says when it's unsure." },
        { title: "You stay in control", body: "Velur explains, you decide. If a brief gets something wrong, you reply and it's corrected." },
      ],
    },
    diff: {
      eyebrow: "Why Velur",
      h2: "Not a dashboard. Not a chatbot. A clear daily read.",
      rows: [
        {
          title: "Dashboards show numbers. Velur explains them.",
          body: "BI tools draw the chart and stop. Velur reads across your connected sources and tells you, in plain writing, what changed and what's behind it, with the numbers behind it.",
        },
        {
          title: "ChatGPT can't see your numbers. Velur can.",
          body: "A generic model has no access to your orders, spend or subscriptions, and forgets everything between chats. Velur works from your real, reconciled, read-only data, and shows its sources.",
        },
        {
          title: "Monthly reports arrive too late. Velur arrives at 8am.",
          body: "By the time a report explains the dip, the month is over. Velur reconciles your data daily and flags unusual movements while there's still time to look.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      h2: "Built on the stack you already trust.",
      liveLabel: "Connects to",
      live: ["Shopify", "Meta Ads", "Stripe", "Recharge", "Google Ads", "Klaviyo"],
      link: "Explore all integrations →",
    },
    proof: {
      eyebrow: "Built by an operator",
      quote: "Velur is built by one founder, a data analyst and operator who spent years inside DTC and small-business data stacks, and lived this problem before building the answer.",
      body: "You can see exactly what Velur reads, how it works and what it writes, so you can judge the product on the product. The person building it is the one who answers your emails.",
      link: "About the founder →",
    },
    cta: {
      eyebrow: "Get started",
      h2: "Your revenue, explained before your first coffee.",
      body: "Join the waitlist and I'll reach out personally when the next seat opens.",
      button: "Join the waitlist",
    },
  },

  es: {
    hero: {
      eyebrow: "Inteligencia de ingresos para DTC",
      h1a: "Tus ingresos, descifrados",
      h1b: "cada mañana.",
      sub: "Velur conecta tu tienda, anuncios, facturación y email con acceso de solo lectura, lo reconcilia todo en una sola línea de tiempo y escribe el brief que explica tu día: qué cambió, qué hay detrás, sobre qué actuar. Cada número se rastrea hasta su fuente.",
      ctaPrimary: "Unirse a la lista",
      ctaSecondary: "Cómo funciona",
      mediaChipLabel: "Ejemplo de brief · 08:02",
      mediaChipText: "Ingresos netos +12,4% s/s. Factor: creatividad de Meta. Un flujo de Klaviyo a revisar.",
    },
    strip: {
      caption: "Lee de las herramientas que ya usas",
      tools: ["Shopify", "Klaviyo", "Meta Ads", "TikTok Ads", "Google Ads", "GA4", "Stripe", "Recharge"],
    },
    problem: {
      eyebrow: "El problema",
      statement: "Tus números viven en diez herramientas. La respuesta no vive en ninguna.",
      silos: [
        { where: "Meta · Google",   what: "Marketing" },
        { where: "Shopify",         what: "Clientes" },
        { where: "Stripe",          what: "Ingresos" },
        { where: "Klaviyo",         what: "Retención" },
        { where: "GA4",             what: "Comportamiento" },
        { where: "Hojas de cálculo", what: "Todo lo demás" },
      ],
      after: "Cada herramienta reporta su propia versión de la verdad, y ninguna puede ver el negocio completo. Esa brecha, entre diez dashboards y una decisión, es donde los ingresos se escapan en silencio: el flow roto que nadie detectó, el canal que dejó de devolver la inversión, la cohorte que empezó a hacer churn un mes antes de que el informe lo mostrara.",
    },
    solution: {
      eyebrow: "La solución",
      h2: "Cada herramienta, reconciliada en una sola línea de tiempo.",
      body: "Velur reúne cada pedido, cargo, anuncio y suscripción en una única línea de tiempo y calcula las métricas de forma determinista. Después un modelo de lenguaje las explica en palabras claras, qué cambió y lo que hay detrás, con cada número trazable hasta su fuente. No es otro dashboard que revisar, es un resumen escrito de qué se movió y qué revisar a continuación.",
      points: [
        "Métricas verificadas, reconciliadas a diario desde datos de solo lectura",
        "Resúmenes en lenguaje claro, no gráficos que descifrar",
        "Movimientos inusuales señalados para que los revises",
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
      h2: "De tus herramientas a un brief diario.",
      steps: [
        { icon: "plug",   title: "Conecta",        body: "OAuth de solo lectura a tus herramientas. Sin ingeniería, y Velur nunca puede escribir de vuelta." },
        { icon: "layers", title: "Reconcilia",     body: "Velur hace backfill de 90 días y reconcilia cada fuente en una sola línea de tiempo." },
        { icon: "brain",  title: "Explica",        body: "Velur calcula las métricas y deltas de forma determinista, y luego un modelo de lenguaje las explica en palabras claras." },
        { icon: "file",   title: "Tu brief diario", body: "Cada mañana: qué cambió, lo que hay detrás y qué revisar, con fuentes que puedes comprobar. Responde si algo no encaja." },
      ],
    },
    questions: {
      eyebrow: "En qué ayuda",
      h2: "Las preguntas que Velur te ayuda a responder.",
      groups: [
        {
          label: "Ingresos",
          note: "Cada movimiento vinculado a sus factores más probables, canal, creatividad, cohorte o flow, con fuentes que puedes comprobar.",
          items: ["¿Por qué cambiaron los ingresos esta semana?", "¿Dónde podríamos estar perdiendo dinero?"],
        },
        {
          label: "Adquisición",
          note: "Inversión, sesiones, pedidos y margen reconciliados en un ROAS combinado por canal.",
          items: ["¿Qué canal trae los clientes con mayor LTV?", "¿Qué campañas están perdiendo eficiencia?"],
        },
        {
          label: "Beneficio",
          note: "Margen de contribución por producto y segmento, no solo ingreso bruto.",
          items: ["¿Qué productos generan beneficio de verdad?", "¿Qué segmentos crecen más rápido?"],
        },
        {
          label: "Retención",
          note: "Tendencias de cohortes y churn, con los números que las respaldan.",
          items: ["¿Qué cohortes retienen peor que antes?", "¿Qué clientes parecen en riesgo de churn?"],
        },
      ],
    },
    features: {
      eyebrow: "Lo que obtienes",
      h2: "Respuestas que te llegan, en vez de dashboards que revisas.",
      detailLabel: "Cómo funciona",
      learnMore: "Cómo funciona",
      close: "Cerrar",
      cards: [
        {
          icon: "file",
          art: "/art/abstract-tiles.png",
          title: "El brief diario",
          body: "Una nota corta: qué cambió, lo que hay detrás, qué revisar. Escrita para quien opera, en lenguaje claro.",
          detail: "Cada mañana Velur lee el día anterior en tus herramientas conectadas, las reconcilia en una sola línea de tiempo y escribe un brief corto: ingreso neto, qué cambió, el factor detrás, qué necesita tu atención. Es un punto de partida para tu día, no un sustituto de tu criterio, y cada número enlaza con su fuente.",
        },
        {
          icon: "trending",
          art: "/art/abstract-pills.png",
          title: "Números que puedes auditar",
          body: "Las métricas y los deltas se calculan de forma determinista desde datos de solo lectura. Cada cifra es trazable hasta su origen.",
          detail: "Velur nunca te da un número y te pide que confíes. Las métricas y deltas de tu brief se calculan de forma determinista desde tus datos conectados, y cada cifra enlaza con su fuente, para que la compruebes en vez de creerla a ciegas. El modelo de lenguaje solo explica los números verificados, no los inventa.",
        },
        {
          icon: "shield",
          art: "/art/abstract-cylinders.png",
          title: "Señales antes de que cuesten dinero",
          body: "Velur señala cambios inusuales, un flow que se movió, una cohorte que retiene distinto, una campaña que pierde eficiencia, para que mires mientras aún importa.",
          detail: "Velur vigila movimientos inusuales en tus datos, un flow cuyo rendimiento cambió, una cohorte que retiene peor que antes, una campaña que pierde eficiencia, y los señala con el factor detrás. Las señales son para revisar, no garantías, y las de baja confianza se mantienen en silencio para que no persigas ruido.",
        },
        {
          icon: "bulb",
          art: "/art/abstract-petals.png",
          title: "Pistas, no órdenes",
          body: "Velur te apunta a qué cambió y a lo que necesita una mirada más cercana, atado a los números detrás. Tú decides.",
          detail: "El insight que no puedes usar es solo trivia. Velur te apunta a qué cambió y a lo que necesita una mirada más cercana, atado a los números detrás, para que el siguiente paso sea más claro. Es apoyo a la decisión, no piloto automático: tú decides, y si se equivoca, puedes decírselo.",
        },
      ],
    },
    trust: {
      eyebrow: "Construido para dar confianza",
      h2: "Apoyo a la decisión que puedes comprobar.",
      points: [
        { title: "Acceso de solo lectura", body: "Velur se conecta por OAuth oficial con permisos de solo lectura. Lee tus datos, nunca los cambia." },
        { title: "Números con fuente", body: "Cada cifra se calcula de forma determinista y se rastrea hasta su origen, para que la compruebes." },
        { title: "Consciente de la confianza", body: "Las señales de baja confianza se mantienen en silencio. Velur señala lo que necesita tu atención, y dice cuándo no está seguro." },
        { title: "Mantienes el control", body: "Velur explica, tú decides. Si un brief se equivoca, respondes y se corrige." },
      ],
    },
    diff: {
      eyebrow: "Por qué Velur",
      h2: "No es un dashboard. No es un chatbot. Es una lectura diaria clara.",
      rows: [
        {
          title: "Los dashboards muestran números. Velur los explica.",
          body: "Las herramientas de BI dibujan el gráfico y se detienen. Velur lee tus fuentes conectadas y te dice, en lenguaje claro, qué cambió y lo que hay detrás, con los números detrás.",
        },
        {
          title: "ChatGPT no ve tus números. Velur sí.",
          body: "Un modelo genérico no accede a tus pedidos, inversión ni suscripciones, y olvida todo entre conversaciones. Velur trabaja desde tus datos reales, reconciliados y de solo lectura, y muestra sus fuentes.",
        },
        {
          title: "Los informes mensuales llegan tarde. Velur llega a las 8h.",
          body: "Para cuando un informe explica la caída, el mes ya terminó. Velur reconcilia tus datos a diario y señala movimientos inusuales cuando aún hay tiempo de mirar.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integraciones",
      h2: "Construido sobre el stack en el que ya confías.",
      liveLabel: "Se conecta con",
      live: ["Shopify", "Meta Ads", "Stripe", "Recharge", "Google Ads", "Klaviyo"],
      link: "Explorar todas las integraciones →",
    },
    proof: {
      eyebrow: "Construido por un operador",
      quote: "Velur lo construye un solo fundador, un analista de datos y operador que pasó años dentro de stacks de datos DTC y de pequeño negocio, y vivió este problema antes de construir la respuesta.",
      body: "Puedes ver exactamente qué lee Velur, cómo funciona y qué escribe, para que juzgues el producto por el producto. Quien lo construye es quien responde tus correos.",
      link: "Sobre el fundador →",
    },
    cta: {
      eyebrow: "Empezar",
      h2: "Tus ingresos, explicados antes del primer café.",
      body: "Únete a la lista de espera y te escribiré personalmente cuando se abra el siguiente cupo.",
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
        <Orbs />
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
              <span className="text-ink/35 mr-2.5">001 /</span>{c.problem.eyebrow}
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
              <span className="text-white/35 mr-2.5">002 /</span>{c.solution.eyebrow}
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
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-4"><span className="text-ink/35 mr-2.5">003 /</span>{c.how.eyebrow}</p>
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

      {/* ════ 5.5 · TRUST, visible, not in footnotes ════ */}
      <section className="bg-canvas border-t border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-4"><span className="text-ink/35 mr-2.5">004 /</span>{c.trust.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-12 max-w-[22ch]" style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>
            {c.trust.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {c.trust.points.map((p, i) => {
              const TrustIcon = [Lock, ScanSearch, Gauge, UserCheck][i] ?? Lock;
              return (
                <div
                  key={p.title}
                  className="gs-batch group relative overflow-hidden rounded-[18px] border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal-green/40 hover:shadow-[0_20px_48px_-28px_rgba(11,61,46,0.4)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2.5px] bg-signal-green origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <span className="inline-flex text-signal-green mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <TrustIcon size={26} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display font-normal text-ink-strong text-[17px] tracking-[-0.01em] mb-2.5">{p.title}</h3>
                  <p className="font-sans text-[14px] text-ink/75 leading-[1.55]">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ 6 · QUESTIONS, gooey tabs by question category ════ */}
      <section className="bg-stone-200 border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-action-blue mb-4"><span className="text-ink/35 mr-2.5">005 /</span>{c.questions.eyebrow}</p>
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
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-slate mb-4"><span className="text-ink/35 mr-2.5">006 /</span>{c.features.eyebrow}</p>
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
                          className="art-live gs-parallax object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
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

      {/* ════ 8.5 · DIFFERENTIATION, why not a dashboard / chatbot ════ */}
      <section className="bg-stone-200 border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-action-blue mb-4"><span className="text-ink/35 mr-2.5">007 /</span>{c.diff.eyebrow}</p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-12 max-w-[24ch]" style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>
            {c.diff.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {c.diff.rows.map((r) => (
              <div
                key={r.title}
                className="gs-batch group relative overflow-hidden rounded-[22px] bg-paper border border-line p-7 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_-32px_rgba(16,19,22,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[3px] bg-signal-green origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <h3 className="font-display font-normal text-ink-strong text-[20px] leading-[1.2] tracking-[-0.01em] mb-4">{r.title}</h3>
                <p className="font-sans text-[14.5px] text-ink/80 leading-[1.6]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 9 · INTEGRATIONS, calm Anima treatment: orbs + type + marks ════ */}
      <section className="relative bg-canvas overflow-hidden border-y border-border-light" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <Orbs />
        <div className="relative" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
            <span className="text-ink/35 mr-2.5">008 /</span>{c.integrations.eyebrow}
          </p>
          <h2 className="gs-rise font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.02em] mb-14 max-w-[20ch]" style={{ fontSize: "clamp(30px, 4.4vw, 56px)" }}>
            {c.integrations.h2}
          </h2>

          {/* The six marks, quiet and monumental. Opacity breathes on hover. */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-12 items-center mb-16">
            {[
              { logo: "/integrations/shopify.svg",  label: "Shopify" },
              { logo: "/integrations/meta.svg",     label: "Meta Ads" },
              { logo: "/integrations/stripe.svg",   label: "Stripe" },
              { logo: "/integrations/recharge.svg", label: "Recharge" },
              { logo: "/integrations/google.svg",   label: "Google Ads" },
              { logo: "/integrations/klaviyo.svg",  label: "Klaviyo" },
            ].map((it) => (
              <div key={it.label} className="gs-batch group flex flex-col items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.logo}
                  alt={it.label}
                  className="h-9 md:h-11 w-auto max-w-full object-contain opacity-55 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-translate-y-1"
                />
                <span className="font-display text-[11px] uppercase tracking-[0.1em] text-slate/70 transition-colors duration-500 group-hover:text-ink">
                  {it.label}
                </span>
              </div>
            ))}
          </div>

          <Link href="/integrations" className="gs-rise inline-block font-sans text-[15px] text-ink underline underline-offset-[0.3em] decoration-1 hover:decoration-2 transition-all">
            {c.integrations.link}
          </Link>
        </div>
      </section>

      {/* ════ 10 · PROOF, honest founder note (no fake logos) ════ */}
      <section className="bg-canvas" style={{ padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}>
          <p className="gs-rise font-display text-[13px] uppercase tracking-[0.06em] text-coral mb-6 text-center"><span className="text-ink/35 mr-2.5">009 /</span>{c.proof.eyebrow}</p>
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
