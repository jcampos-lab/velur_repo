"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber uppercase mb-5">
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

        {/* Right preview — Signal Green band per Velur Design System */}
        <div className="relative bg-signal-green overflow-hidden hidden md:block">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(79,183,141,0.35), transparent 55%), radial-gradient(circle at 78% 78%, rgba(31,95,224,0.18), transparent 55%)",
            }}
          />
          <div className="absolute top-10 left-8 right-12 rounded-xl bg-velur-ink/95 backdrop-blur-sm border border-ink-700 p-5 shadow-2xl">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-signal-green-300 uppercase">
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
            <p className="font-mono text-[9px] tracking-[0.18em] text-signal-green-300 uppercase mb-2">
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

/* ─── Module cards ─────────────────────────────────────────────────────── */

type Module = {
  label: string;
  title: string;
  body: string;
  bullets: string[];
  bg: string;
  textTone: "dark" | "light";
};

const MODULE_SURFACES = [
  { bg: "bg-paper",       textTone: "dark"  as const },
  { bg: "bg-brand-beige", textTone: "dark"  as const },
  { bg: "bg-brand-slate", textTone: "light" as const },
  { bg: "bg-brand-brown", textTone: "light" as const },
];

function ModuleCard({ m, i, prefersReduced }: { m: Module; i: number; prefersReduced: boolean | null }) {
  const dark = m.textTone === "light";
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: prefersReduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReduced ? undefined : { y: -3 }}
      className={`rounded-2xl ${m.bg} ${dark ? "text-on-dark" : "text-ink"} border ${dark ? "border-transparent" : "border-line"} p-7 md:p-9 flex flex-col gap-5`}
    >
      <p className={`font-mono text-[10.5px] tracking-[0.18em] uppercase ${dark ? "text-signal-green-300" : "text-action-blue"}`}>
        {m.label}
      </p>
      <h3
        className={`font-display font-normal leading-[1.1] tracking-[-0.02em] ${dark ? "text-on-dark" : "text-ink-strong"}`}
        style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
      >
        {m.title}
      </h3>
      <p className={`font-sans text-[14.5px] leading-relaxed ${dark ? "text-on-dark-muted" : "text-ink/70"}`}>
        {m.body}
      </p>
      <ul className="mt-2 space-y-2">
        {m.bullets.map(b => (
          <li key={b} className="flex items-start gap-2.5">
            <span className={`mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-signal-green-300" : "bg-action-blue"}`} />
            <span className={`font-sans text-[13.5px] ${dark ? "text-on-dark/90" : "text-ink/85"}`}>
              {b}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function ServicesContent() {
  const { t, lang } = useLanguage();
  const c: Copy = COPY[lang];
  const s = t.services;
  const prefersReduced = useReducedMotion();

  const modules: Module[] = c.modules.map((m, i) => ({
    ...m,
    bullets: [...m.bullets],
    bg: MODULE_SURFACES[i].bg,
    textTone: MODULE_SURFACES[i].textTone,
  }));

  return (
    <>
      {/* Hero card */}
      <section className="bg-cream py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <HeroCard c={c} m={c.mock} />
        </div>
      </section>

      {/* Module grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {modules.map((m, i) => (
              <ModuleCard key={m.label} m={m} i={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works strip, dark wrapper */}
      <section id="how" className="bg-cream pb-14 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-4">
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
                    <p className="font-mono text-[10px] tracking-[0.18em] text-signal-green-300 uppercase mb-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-paper border border-line p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-2 h-2 rounded-full bg-success" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-success uppercase font-semibold">
                  {c.fit.yesLabel}
                </p>
              </div>
              <ul className="space-y-3">
                {s.rightForItems.map((g, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#0E8A5F" opacity="0.12" />
                      <path d="M4.5 8.2 L7 10.5 L11.5 5.5" stroke="#0E8A5F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className="font-sans text-[14.5px] text-ink/85 leading-relaxed">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-stone border border-line p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-2 h-2 rounded-full bg-muted-slate" />
                <p className="font-mono text-[11px] tracking-[0.16em] text-muted-slate uppercase font-semibold">
                  {c.fit.noLabel}
                </p>
              </div>
              <ul className="space-y-3">
                {s.notRightForItems.map((n, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#8A8F98" opacity="0.12" />
                      <path d="M5 5 L11 11 M11 5 L5 11" stroke="#8A8F98" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    <span className="font-sans text-[14.5px] text-ink/65 leading-relaxed">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
                <p className="font-mono text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-3">
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
