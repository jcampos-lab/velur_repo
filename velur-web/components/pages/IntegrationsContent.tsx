"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Lock, Shield, Check } from "lucide-react";
import { ArtBackdrop } from "@/components/velur/ArtBackdrop";
import { VelurStackOrbital } from "@/components/ui/orbital-integrations";

/* ─── Per-page strings (Castilian Spanish for ES) ─────────────────── */
const COPY = {
  en: {
    eyebrow: "Integrations",
    h1: "Eight integrations. One revenue truth.",
    subhead: "Velur connects to the tools every DTC brand already runs on. Read-only OAuth, EU-hosted processing, no warehouse to stand up. Plug them in and your first daily brief lands the next morning.",
    securityEyebrow: "Security & compatibility",
    securityHeading: "How Velur connects.",
    securityCards: [
      { icon: "lock",  title: "Read-only OAuth",          body: "Every integration uses the platform's official OAuth flow with read-only scopes. We never request write access. Disconnect from your platform's settings at any time and the connection drops immediately." },
      { icon: "shield",title: "EU-hosted processing",    body: "Data is processed and stored on EU infrastructure under GDPR-compliant DPAs. Your revenue data stays yours — never resold, never used to train shared models, never shared with other brands." },
      { icon: "check", title: "No warehouse required",   body: "You don't need BigQuery, Snowflake, or a data engineer. Velur handles modeling, normalization and orchestration. The setup is the OAuth click, then we backfill the last 18 months." },
    ],
    integrationsEyebrow: "The stack",
    integrationsHeading: "Eight tools that cover ~95% of DTC revenue.",
    closingEyebrow: "Don't see your stack?",
    closingHeading: "We add integrations every quarter.",
    closingBody: "If a tool isn't listed, tell us when you join the waitlist and we'll share where it sits on the roadmap. Anything CSV/SFTP-importable can be onboarded manually in the meantime.",
    closingCta: "Join the waitlist",
    integrations: [
      {
        name: "Shopify",
        category: "Commerce",
        data: "Orders, customers, products, refunds, fulfilment",
        what: "The spine of every DTC brand we work with. Velur reads the order and customer graph so we can attribute revenue, build behavioural cohorts, and reconcile margin against ad spend.",
        scope: "read_orders, read_customers, read_products, read_inventory",
        compatibility: "Shopify Basic, Shopify, Advanced, Plus. B2B / wholesale channels supported on Plus.",
      },
      {
        name: "Klaviyo",
        category: "Email + SMS",
        data: "Flow triggers, segment membership, campaign performance, attributed revenue",
        what: "Klaviyo is where the post-purchase relationship lives. Velur ties flow performance back to first-party Shopify revenue — so 'attributed' actually means a real order, not a click that opened the email.",
        scope: "Read-only API key with metrics + profiles + campaigns scope",
        compatibility: "All Klaviyo plans. Klaviyo SMS supported on the SMS plan.",
      },
      {
        name: "Meta Ads",
        category: "Paid social",
        data: "Spend, impressions, clicks, creative metadata, ad-level conversions",
        what: "Server-side and pixel events together, reconciled with Shopify orders. We rebuild post-iOS14 attribution at the campaign and creative level so your reported ROAS is the one you trust.",
        scope: "ads_read, business_management (read-only)",
        compatibility: "Meta Business Manager. Aggregated Event Measurement supported. CAPI integration recommended for accuracy.",
      },
      {
        name: "TikTok Ads",
        category: "Paid social",
        data: "Spend, creative-level performance, video views, ad-level conversions",
        what: "Treats TikTok as a real revenue channel, not just a vanity dashboard. Velur ties hook → save → checkout so you stop boosting creative that only drives engagement.",
        scope: "Read-only TikTok Ads API access",
        compatibility: "TikTok Ads Manager + TikTok Pixel + Events API. Spark Ads supported.",
      },
      {
        name: "Google Ads",
        category: "Paid search",
        data: "Spend, search and shopping conversions, Performance Max breakdown, asset-level performance",
        what: "Shows you what Performance Max is actually doing under the hood. Velur splits PMax into its real placements (search vs shopping vs YouTube) so the channel mix is honest.",
        scope: "AdWords read scope",
        compatibility: "Standard, Performance Max, Shopping. Manager (MCC) accounts supported.",
      },
      {
        name: "GA4",
        category: "Web analytics",
        data: "Sessions, events, attribution paths, e-commerce conversions",
        what: "GA4 is our cross-check on Shopify's view of the world. When the two diverge on a date, Velur surfaces the gap and the most likely cause (pixel drop, attribution window, bot traffic).",
        scope: "Google Analytics Data API (read-only)",
        compatibility: "GA4 properties only. Universal Analytics is end-of-life.",
      },
      {
        name: "Stripe",
        category: "Payments + billing",
        data: "Charges, refunds, disputes, subscription MRR, payout schedule",
        what: "For DTC brands with a subscription line — and any brand processing payments outside Shopify — Stripe is where the truth lives. Velur ties MRR, churn and dunning to the same customer record as Shopify orders.",
        scope: "Read-only restricted key",
        compatibility: "Stripe Billing, Subscriptions, Checkout. Stripe Connect supported.",
      },
      {
        name: "Recharge",
        category: "Subscriptions",
        data: "Subscription MRR, churn, cohort retention, next-charge schedule, plan changes",
        what: "If you sell on a recurring schedule, Recharge is the data set that matters most. Velur models retention by acquisition channel, plan, and first product — so you stop guessing which acquisition cohort pays back.",
        scope: "Recharge API read scope (subscriptions, customers, charges)",
        compatibility: "Recharge Standard, Pro, Custom. Bundles and tiered subscriptions supported.",
      },
    ],
  },
  es: {
    eyebrow: "Integraciones",
    h1: "Ocho integraciones. Una sola verdad de ingresos.",
    subhead: "Velur se conecta a las herramientas con las que ya opera cualquier marca DTC. OAuth de solo lectura, procesamiento alojado en la UE, sin warehouse que montar. Conéctalas y tu primer informe diario llega a la mañana siguiente.",
    securityEyebrow: "Seguridad y compatibilidad",
    securityHeading: "Cómo se conecta Velur.",
    securityCards: [
      { icon: "lock",   title: "OAuth de solo lectura",       body: "Cada integración usa el flujo OAuth oficial de la plataforma con permisos de solo lectura. Nunca pedimos acceso de escritura. Desconecta desde tu plataforma cuando quieras y la conexión cae al instante." },
      { icon: "shield", title: "Procesamiento en la UE",      body: "Los datos se procesan y almacenan en infraestructura europea bajo acuerdos DPA conformes con el RGPD. Tus datos de ingresos son tuyos — nunca los revendemos, nunca los usamos para entrenar modelos compartidos, nunca los compartimos con otras marcas." },
      { icon: "check",  title: "Sin warehouse necesario",     body: "No necesitas BigQuery, Snowflake ni ingeniero de datos. Velur se encarga del modelado, la normalización y la orquestación. El setup es el clic de OAuth, y luego hacemos backfill de los últimos 18 meses." },
    ],
    integrationsEyebrow: "El stack",
    integrationsHeading: "Ocho herramientas que cubren ~95% de los ingresos DTC.",
    closingEyebrow: "¿No ves tu stack?",
    closingHeading: "Añadimos integraciones cada trimestre.",
    closingBody: "Si una herramienta no está listada, dínoslo al unirte a la lista de espera y te contamos dónde está en la hoja de ruta. Cualquier cosa importable por CSV/SFTP se puede onboardear manualmente mientras tanto.",
    closingCta: "Unirse a la lista",
    integrations: [
      {
        name: "Shopify",
        category: "E-commerce",
        data: "Pedidos, clientes, productos, reembolsos, fulfilment",
        what: "La columna vertebral de cada marca DTC con la que trabajamos. Velur lee el grafo de pedidos y clientes para atribuir ingresos, construir cohortes de comportamiento y reconciliar margen contra inversión publicitaria.",
        scope: "read_orders, read_customers, read_products, read_inventory",
        compatibility: "Shopify Basic, Shopify, Advanced, Plus. Canales B2B / mayorista soportados en Plus.",
      },
      {
        name: "Klaviyo",
        category: "Email + SMS",
        data: "Disparadores de flujo, pertenencia a segmento, rendimiento de campaña, ingresos atribuidos",
        what: "Klaviyo es donde vive la relación post-compra. Velur conecta el rendimiento de los flujos con los ingresos de primera parte de Shopify — así 'atribuido' significa un pedido real, no un clic que abrió el email.",
        scope: "API key de solo lectura con scope metrics + profiles + campaigns",
        compatibility: "Todos los planes Klaviyo. Klaviyo SMS soportado en el plan SMS.",
      },
      {
        name: "Meta Ads",
        category: "Publicidad social",
        data: "Inversión, impresiones, clics, metadatos creativos, conversiones a nivel de anuncio",
        what: "Eventos server-side y de píxel a la vez, reconciliados con pedidos de Shopify. Reconstruimos la atribución post-iOS14 a nivel de campaña y creativo, para que el ROAS reportado sea el ROAS en el que confías.",
        scope: "ads_read, business_management (solo lectura)",
        compatibility: "Meta Business Manager. Aggregated Event Measurement soportado. CAPI recomendado para precisión.",
      },
      {
        name: "TikTok Ads",
        category: "Publicidad social",
        data: "Inversión, rendimiento a nivel de creativo, vistas de vídeo, conversiones a nivel de anuncio",
        what: "Trata a TikTok como un canal de ingresos real, no como un dashboard de vanidad. Velur conecta hook → guardado → checkout para que dejes de impulsar creatividad que solo mueve engagement.",
        scope: "Acceso de solo lectura a la API de TikTok Ads",
        compatibility: "TikTok Ads Manager + TikTok Pixel + Events API. Spark Ads soportado.",
      },
      {
        name: "Google Ads",
        category: "Search ads",
        data: "Inversión, conversiones de search y shopping, desglose de Performance Max, rendimiento por asset",
        what: "Te muestra lo que Performance Max realmente está haciendo por debajo. Velur separa PMax en sus placements reales (search vs shopping vs YouTube) para que el mix de canal sea honesto.",
        scope: "Scope de lectura AdWords",
        compatibility: "Standard, Performance Max, Shopping. Cuentas Manager (MCC) soportadas.",
      },
      {
        name: "GA4",
        category: "Analítica web",
        data: "Sesiones, eventos, paths de atribución, conversiones e-commerce",
        what: "GA4 es nuestro contraste sobre la visión que tiene Shopify del mundo. Cuando los dos divergen en una fecha, Velur señala la brecha y la causa más probable (caída de píxel, ventana de atribución, tráfico bot).",
        scope: "Google Analytics Data API (solo lectura)",
        compatibility: "Solo propiedades GA4. Universal Analytics está en fin de vida.",
      },
      {
        name: "Stripe",
        category: "Pagos + facturación",
        data: "Cargos, reembolsos, disputas, MRR de suscripción, calendario de payouts",
        what: "Para marcas DTC con línea de suscripción — y cualquier marca que procese pagos fuera de Shopify — Stripe es donde vive la verdad. Velur conecta MRR, churn y dunning con el mismo registro de cliente que los pedidos de Shopify.",
        scope: "Clave restringida de solo lectura",
        compatibility: "Stripe Billing, Subscriptions, Checkout. Stripe Connect soportado.",
      },
      {
        name: "Recharge",
        category: "Suscripciones",
        data: "MRR de suscripción, churn, retención por cohorte, próximo cargo, cambios de plan",
        what: "Si vendes en formato recurrente, Recharge es el conjunto de datos que más importa. Velur modela retención por canal de adquisición, plan y primer producto — para que dejes de adivinar qué cohorte de adquisición devuelve la inversión.",
        scope: "Scope de lectura de la API de Recharge (subscriptions, customers, charges)",
        compatibility: "Recharge Standard, Pro, Custom. Bundles y suscripciones por niveles soportados.",
      },
    ],
  },
} as const;

type Copy = typeof COPY.en | typeof COPY.es;
type Integration = Copy["integrations"][number];

const SECURITY_ICON: Record<string, typeof Lock> = {
  lock: Lock,
  shield: Shield,
  check: Check,
};

/* Detail block rendered inside each integration card. */
function IntegrationDetail({ it }: { it: Integration }) {
  return (
    <div className="max-w-[820px]">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h3 className="font-display font-normal text-ink-strong text-[24px] leading-tight tracking-[-0.015em]">
          {it.name}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-signal-green">
          {it.category}
        </span>
      </div>

      <p className="font-sans text-[15px] text-ink leading-[1.55] mb-5">
        {it.what}
      </p>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-light pt-5">
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-slate mb-1">Data in</dt>
          <dd className="font-sans text-[13.5px] text-ink/85 leading-snug">{it.data}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-slate mb-1">Scope</dt>
          <dd className="font-mono text-[12.5px] text-ink/85 leading-snug">{it.scope}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-slate mb-1">Compatibility</dt>
          <dd className="font-sans text-[13.5px] text-ink/85 leading-snug">{it.compatibility}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function IntegrationsContent() {
  const { lang } = useLanguage();
  const c: Copy = COPY[lang];
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section
        className="bg-canvas border-b border-border-light"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-signal-green mb-5">
            {c.eyebrow}
          </p>
          <h1
            className="font-display font-normal text-ink-strong leading-[1.02] tracking-[-0.025em] mb-6 max-w-[20ch]"
            style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}
          >
            {c.h1}
          </h1>
          <p className="font-sans text-[18px] leading-[1.5] text-ink max-w-[52ch]">
            {c.subhead}
          </p>
        </div>
      </section>

      {/* Orbital — the eight live integrations circling the Velur node */}
      <section
        className="bg-canvas border-b border-border-light"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div className="flex justify-center">
          <VelurStackOrbital />
        </div>
      </section>

      {/* Security + compatibility */}
      <section
        className="bg-canvas"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-slate mb-2">
              {c.securityEyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink-strong leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.securityHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {c.securityCards.map((card) => {
              const Icon = SECURITY_ICON[card.icon] ?? Lock;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl bg-paper border border-line p-6 md:p-7 flex flex-col gap-4"
                >
                  <span className="inline-flex w-10 h-10 rounded-full bg-wash-green text-signal-green items-center justify-center">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display font-normal text-ink-strong text-[18px] leading-snug tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[14.5px] text-ink/75 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 8 integrations */}
      <section
        className="bg-cream border-y border-border-light"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          {/* Sticky heading left, integration cards on the right. */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-10 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-slate mb-2">
                {c.integrationsEyebrow}
              </p>
              <h2
                className="font-display font-normal text-ink-strong leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
              >
                {c.integrationsHeading}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {c.integrations.map((it, i) => (
                <motion.article
                  key={it.name}
                  initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl bg-paper border border-line p-6 md:p-8"
                >
                  <IntegrationDetail it={it} />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA — dunes brand art behind the midnight band */}
      <section
        className="relative bg-midnight text-on-dark"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <ArtBackdrop
          still="/art/abstract-petals.png"
          overlay="linear-gradient(180deg, rgba(10,26,47,0.72) 0%, rgba(10,26,47,0.55) 55%, rgba(10,26,47,0.78) 100%)"
        />
        <div
          className="relative text-center"
          style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-action-blue mb-5">
            {c.closingEyebrow}
          </p>
          <h2
            className="font-display font-normal text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {c.closingHeading}
          </h2>
          <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[48ch] mx-auto mb-9">
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
