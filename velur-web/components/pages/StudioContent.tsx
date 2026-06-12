"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { PROMPT_PACKS, countPrompts, type Lang as PackLang } from "@/lib/promptPacks";
import { packTitle, packTagline } from "@/lib/promptPacksEs";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { GooeyTabs } from "@/components/ui/gooey-tabs";

/* ─── Per-page strings (Castilian Spanish for ES) ─────────────────── */
const COPY = {
  en: {
    hero: {
      eyebrow: "Velur AI Studio",
      h1Lead: "Learn to use AI to grow your ",
      h1Italic: "small business",
      body: "Hands-on systems that turn Higgsfield, Claude, ChatGPT and MidJourney into real revenue, not novelty posts. Built by a founder who runs a real small business on the same playbook.",
      cta1: "Join the waitlist",
      cta2: "See the prompt packs",
    },
    course: {
      eyebrow: "Flagship course",
      title: "Branded AI Editing Course",
      body: "The exact workflow we use to ship video and image creative for wellness and DTC brands. Higgsfield prompt structure, MidJourney recipes, Claude voice prompts, and the brief that holds them all together.",
      cta: "Learn more →",
      mockChapter: "Chapter 04",
      mockLesson: "Lesson",
      mockLessonTitle: "AI Content Creation",
      mockMicro: "Reel Prompt",
    },
    guide: {
      title: "Velur AI Starter Guide",
      body: "How to generate aesthetic, brand-consistent images and short clips using AI. Written for small-business owners who want to skip the trial-and-error and ship usable assets on day one.",
      cta: "Learn more →",
      bookTitle1: "Branded AI",
      bookTitle2: "Guide",
      bookCaption: "Mobile editing playbook",
    },
    packsCard: {
      title: "Prompt Packs",
      body: "Field-tested prompts for the categories we actually work in. Spa, beauty, hospitality, DTC products. Drop them straight into MidJourney or Higgsfield and edit from there.",
      chip1: "Spa pack",
      chip2: "DTC pack",
      mockCount: "100+",
      mockLabel: "Prompt Pack",
    },
    packGridSection: {
      eyebrow: "Prompt packs",
      heading: "Field-tested prompts for the categories we actually work in.",
      body: "Drop them into MidJourney, Higgsfield or Claude. Edit the brand notes at the top. Ship the asset.",
      promptsSuffix: "prompts",
      seePack: "See the pack →",
    },
    system: {
      eyebrow: "The AI Creative System",
      heading: "A creative system built to find your winning angles and scale them.",
      body: "Three weeks of structured work, then ongoing support. Designed for small teams who need to ship faster than their competitors can.",
      cta: "Join the waitlist",
      weeks: [
        { label: "Week 01", title: "Customer Research", body: "We map your customer, your competitors, and the angles winning in your category right now." },
        { label: "Week 02", title: "Creative Strategy", body: "We map your content needs across organic, paid and email, then write the briefs that drive each one." },
        { label: "Week 03", title: "AI Production",     body: "We help you produce, edit and ship the first batch using your stack: Higgsfield, MidJourney, Claude, ChatGPT." },
      ],
    },
    fit: {
      eyebrow: "Who this is for",
      heading: "Honest about the fit.",
      yesLabel: "This is for you if",
      noLabel: "This is not for you if",
      yes: [
        "You run a small business or DTC brand and you do most of the marketing yourself",
        "You already use AI tools but want a system that produces consistent, on-brand output",
        "You need creative that books appointments or sells products, not awards",
        "You want a real human to talk to, not a Slack bot",
      ],
      no: [
        "You are looking for a generic AI consultant with no industry focus",
        "You expect 10,000 follower growth in a week without paying for ads",
        "You want to outsource your brand identity to a model with zero input",
        "You need a 100-person agency relationship for enterprise work",
      ],
    },
    faq: {
      eyebrow: "Frequently asked",
      heading: "Curious? Let's clear things up.",
      items: [
        { q: "Does this actually look professional or like obvious AI?",     a: "Both have happened. The packs and the course teach you how to control output so it looks like real photography, with brand-consistent props, lighting, and composition. The first attempts will look AI. By week two they shouldn't." },
        { q: "Can I use this material to train AI?",                         a: "No. The prompts and templates are licensed for your direct use, not as training data for other models. We are a small team and we ask that you respect this." },
        { q: "What if I do not match the categories you cover?",             a: "Reach out. We have shipped work for spa, beauty, jewelry, hospitality, DTC apparel, food and drink, and coffee subscriptions. If your niche is close to one of those, we can adapt the prompt structure on a call." },
        { q: "How long does it take to see results?",                        a: "Most teams ship their first usable asset on day one with the starter guide. Real revenue impact, defined as a campaign that pays for itself, typically lands within four to six weeks." },
        { q: "Do I need to be technical?",                                   a: "No. If you can copy and paste, and if you have credit on Higgsfield or MidJourney, you have everything you need." },
        { q: "What if I do not like the first assets?",                      a: "We iterate together on the first batch. The first kickoff exists exactly so we can both decide if the fit is right before any money changes hands." },
      ],
    },
    closing: {
      eyebrow: "Ready when you are",
      heading: "Tell us about the business. We will reply with a plan.",
      cta: "Join the waitlist",
    },
  },
  es: {
    hero: {
      eyebrow: "Velur AI Studio",
      h1Lead: "Aprende a usar la IA para hacer crecer tu ",
      h1Italic: "pequeño negocio",
      body: "Sistemas prácticos que convierten Higgsfield, Claude, ChatGPT y MidJourney en ingresos reales, no en posts decorativos. Hecho por un fundador que gestiona un pequeño negocio real con el mismo manual.",
      cta1: "Unirse a la lista",
      cta2: "Ver los prompt packs",
    },
    course: {
      eyebrow: "Curso insignia",
      title: "Curso de edición con IA de marca",
      body: "El flujo exacto con el que lanzamos vídeo e imagen para marcas de bienestar y DTC. Estructura de prompts en Higgsfield, recetas en MidJourney, prompts de voz en Claude, y el brief que lo une todo.",
      cta: "Saber más →",
      mockChapter: "Capítulo 04",
      mockLesson: "Lección",
      mockLessonTitle: "Creación de contenido con IA",
      mockMicro: "Prompt de reel",
    },
    guide: {
      title: "Guía Velur de iniciación a la IA",
      body: "Cómo generar imágenes y clips cortos estéticos y consistentes con tu marca usando IA. Escrita para fundadores de pequeños negocios que quieren saltarse las pruebas y errores y lanzar activos útiles desde el primer día.",
      cta: "Saber más →",
      bookTitle1: "Guía de IA",
      bookTitle2: "de marca",
      bookCaption: "Manual de edición móvil",
    },
    packsCard: {
      title: "Prompt Packs",
      body: "Prompts probados en clientes reales para las categorías en las que trabajamos: spa, belleza, hostelería y productos DTC. Pégalos directamente en MidJourney o Higgsfield y edita desde ahí.",
      chip1: "Pack Spa",
      chip2: "Pack DTC",
      mockCount: "100+",
      mockLabel: "Prompt Pack",
    },
    packGridSection: {
      eyebrow: "Prompt packs",
      heading: "Prompts probados sobre el terreno para las categorías en las que trabajamos.",
      body: "Pégalos en MidJourney, Higgsfield o Claude. Edita las notas de marca de arriba. Lanza el activo.",
      promptsSuffix: "prompts",
      seePack: "Ver el pack →",
    },
    system: {
      eyebrow: "El sistema creativo con IA",
      heading: "Un sistema creativo diseñado para encontrar tus ángulos ganadores y escalarlos.",
      body: "Tres semanas de trabajo estructurado, después soporte continuo. Diseñado para equipos pequeños que necesitan ir más rápido que sus competidores.",
      cta: "Unirse a la lista",
      weeks: [
        { label: "Semana 01", title: "Investigación de cliente",  body: "Mapeamos a tu cliente, a tu competencia y los ángulos que están ganando en tu categoría ahora mismo." },
        { label: "Semana 02", title: "Estrategia creativa",        body: "Mapeamos tus necesidades de contenido en orgánico, paid y email, y escribimos los briefs que mueven cada uno." },
        { label: "Semana 03", title: "Producción con IA",          body: "Te ayudamos a producir, editar y lanzar la primera tanda con tu stack: Higgsfield, MidJourney, Claude, ChatGPT." },
      ],
    },
    fit: {
      eyebrow: "Para quién es esto",
      heading: "Honestos sobre el encaje.",
      yesLabel: "Esto es para ti si",
      noLabel: "Esto no es para ti si",
      yes: [
        "Llevas un pequeño negocio o marca DTC y haces tú mismo la mayor parte del marketing",
        "Ya usas herramientas de IA pero quieres un sistema que produzca un output consistente y on-brand",
        "Necesitas creatividad que reserve citas o venda productos, no que gane premios",
        "Quieres hablar con una persona de verdad, no con un bot de Slack",
      ],
      no: [
        "Buscas un consultor de IA genérico sin foco de industria",
        "Esperas crecer 10.000 seguidores en una semana sin pagar anuncios",
        "Quieres delegar tu identidad de marca a un modelo sin aportar nada",
        "Necesitas una relación de agencia de 100 personas para trabajo enterprise",
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      heading: "¿Con dudas? Vamos a aclararlo.",
      items: [
        { q: "¿Esto va a parecer profesional o se va a notar que es IA?",                          a: "Las dos cosas han pasado. Los packs y el curso te enseñan a controlar el output para que parezca fotografía real, con props, iluminación y composición consistentes con tu marca. Los primeros intentos parecerán IA. En la segunda semana ya no deberían." },
        { q: "¿Puedo usar este material para entrenar IA?",                                       a: "No. Los prompts y plantillas están licenciados para tu uso directo, no como datos de entrenamiento para otros modelos. Somos un equipo pequeño y te pedimos que lo respetes." },
        { q: "¿Y si mi sector no encaja con las categorías que cubrís?",                          a: "Escríbenos. Hemos lanzado trabajo para spa, belleza, joyería, hostelería, moda DTC, comida y bebida, y suscripciones de café. Si tu nicho está cerca de alguno, podemos adaptar la estructura de prompts en una llamada." },
        { q: "¿Cuánto tarda en verse resultados?",                                                a: "La mayoría de clientes lanza su primer activo útil el primer día con la guía de iniciación. El impacto real en ingresos, definido como una campaña que se paga sola, suele llegar entre la cuarta y la sexta semana." },
        { q: "¿Tengo que tener conocimientos técnicos?",                                          a: "No. Si sabes copiar y pegar, y tienes crédito en Higgsfield o MidJourney, tienes todo lo que necesitas." },
        { q: "¿Y si no me gustan los primeros activos?",                                          a: "Iteramos juntos sobre la primera tanda. El kickoff inicial existe precisamente para que ambos decidamos si encaja antes de que cambie dinero de manos." },
      ],
    },
    closing: {
      eyebrow: "Cuando estés listo",
      heading: "Cuéntanos sobre el negocio. Te respondemos con un plan.",
      cta: "Unirse a la lista",
    },
  },
} as const;

type Lang = keyof typeof COPY;
type Copy = typeof COPY.en | typeof COPY.es;

/* ─── Featured course ─────────────────────────────────────────── */

function FeaturedCourse({ c }: { c: Copy["course"] }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-brand-brown text-paper overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[400px]">
        <div className="p-7 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <p className="font-display text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-4">
              {c.eyebrow}
            </p>
            <h3
              className="font-display font-normal leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}
            >
              {c.title}
            </h3>
            <p className="font-sans text-on-dark-muted leading-relaxed text-[15px] md:text-[16px] max-w-md">
              {c.body}
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors"
          >
            {c.cta}
          </Link>
        </div>

        {/* Preview area — Signal Green band */}
        <div className="relative bg-signal-green overflow-hidden hidden md:block">
          <div className="absolute inset-0 opacity-60" style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, rgba(79,183,141,0.45), transparent 55%), radial-gradient(circle at 80% 80%, rgba(31,95,224,0.18), transparent 55%)",
          }} />
          <div className="absolute top-12 left-8 right-12 bottom-8 rounded-xl bg-velur-ink border border-ink-700 p-5 flex flex-col justify-between shadow-2xl">
            <p className="font-display text-[10px] tracking-[0.18em] text-signal-green-300 uppercase">
              {c.mockChapter}
            </p>
            <div>
              <p className="font-display text-[10px] tracking-[0.16em] text-on-dark-muted uppercase mb-1">
                {c.mockLesson}
              </p>
              <p className="font-display font-normal text-on-dark text-[20px] leading-tight">
                {c.mockLessonTitle}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-28 rounded-xl bg-canvas border border-hairline p-3 rotate-[6deg] shadow-2xl">
            <p className="font-display text-[9px] tracking-[0.18em] text-slate uppercase">
              {c.mockMicro}
            </p>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 bg-hairline rounded-full w-full" />
              <div className="h-1 bg-hairline rounded-full w-3/4" />
              <div className="h-1 bg-signal-green rounded-full w-5/6" />
              <div className="h-1 bg-hairline rounded-full w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Guide + Packs card pair ─────────────────────────────────── */

function GuideAndPacks({
  guide,
  packs,
}: {
  guide: Copy["guide"];
  packs: Copy["packsCard"];
}) {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {/* Guide */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-midnight text-on-dark overflow-hidden flex flex-col"
      >
        <div className="p-7 md:p-9 flex flex-col gap-5">
          <h3
            className="font-display font-normal leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            {guide.title}
          </h3>
          <p className="font-sans text-on-dark-muted leading-relaxed text-[14.5px] md:text-[15.5px]">
            {guide.body}
          </p>
          <Link
            href="/contact"
            className="self-start inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors"
          >
            {guide.cta}
          </Link>
        </div>

        {/* Book mock */}
        <div className="relative flex-1 min-h-[180px] md:min-h-[220px] mt-2">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[140px] md:w-[170px] aspect-[3/4] bg-paper rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-stone p-3 flex flex-col gap-1.5 h-full">
              <p className="font-display font-normal text-ink text-[14px] leading-tight">
                {guide.bookTitle1}<br />{guide.bookTitle2}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1 flex-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      background: i % 4 === 0 ? "#1F5FE0" : i % 3 === 0 ? "#101316" : "#DCDDE0",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
              <p className="font-display text-[7px] text-ink/45 tracking-wider uppercase mt-1">
                {guide.bookCaption}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prompt Packs */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-stone text-ink overflow-hidden flex flex-col"
      >
        <div className="p-7 md:p-9 flex flex-col gap-5">
          <h3
            className="font-display font-normal leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            {packs.title}
          </h3>
          <p className="font-sans text-ink/70 leading-relaxed text-[14.5px] md:text-[15.5px]">
            {packs.body}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[13.5px] px-4 py-2.5 rounded-lg hover:bg-ink hover:text-paper transition-colors"
            >
              {packs.chip1}
            </Link>
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink font-sans font-semibold text-[13.5px] px-4 py-2.5 rounded-lg hover:bg-ink hover:text-paper transition-colors"
            >
              {packs.chip2}
            </Link>
          </div>
        </div>

        {/* Pack stack mock */}
        <div className="relative flex-1 min-h-[180px] md:min-h-[220px]">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-end gap-[-20px]">
            <div className="w-[130px] aspect-[3/4] bg-brand-brown text-paper rounded-lg shadow-2xl p-3 -rotate-6 -mr-6">
              <p className="font-display font-normal text-[12px] leading-tight">{packs.mockCount} Beauty Shots</p>
              <p className="font-mono text-[10px] text-on-dark-muted mt-0.5">{packs.mockLabel}</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-gradient-to-br from-signal-green-300 to-signal-green opacity-90" />
                ))}
              </div>
            </div>
            <div className="w-[130px] aspect-[3/4] bg-brand-brown text-paper rounded-lg shadow-2xl p-3 rotate-3 relative z-10">
              <p className="font-display font-normal text-[12px] leading-tight">{packs.mockCount} Spa &amp; Studio</p>
              <p className="font-mono text-[10px] text-on-dark-muted mt-0.5">{packs.mockLabel}</p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-gradient-to-br from-stone to-slate opacity-90" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Prompt pack grid (real packs from lib/promptPacks) ──────── */

function PackGrid({ s, lang }: { s: Copy["packGridSection"]; lang: PackLang }) {
  const prefersReduced = useReducedMotion();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {PROMPT_PACKS.map((p, i) => {
        const count = countPrompts(p);
        return (
          <motion.div
            key={p.slug}
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReduced ? undefined : { y: -3 }}
            className="rounded-2xl bg-paper border border-line overflow-hidden flex flex-col"
          >
            <Link href={`/studio/packs/${p.slug}`} className="flex flex-col h-full">
              <div className={`aspect-[5/4] ${p.surface} relative p-6 flex flex-col justify-end`}>
                <p className={`font-display text-[10px] tracking-[0.18em] uppercase ${p.textOnDark ? "text-on-dark-muted" : "text-ink/60"}`}>
                  {count} {s.promptsSuffix}
                </p>
                <p className={`font-display font-normal text-[24px] leading-tight tracking-[-0.01em] mt-1 ${p.textOnDark ? "text-on-dark" : "text-ink-strong"}`}>
                  {packTitle(p, lang)}
                </p>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <p className="font-sans text-[14px] text-ink/70 leading-relaxed flex-1">
                  {packTagline(p, lang)}
                </p>
                <span className="self-start font-sans font-semibold text-[13.5px] text-action-blue group-hover:underline underline-offset-4">
                  {s.seePack}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}


/* ─── Fit comparison — signature gooey tabs ───────────────────── */

function FitSection({ f }: { f: Copy["fit"] }) {
  return (
    <GooeyTabs
      tabs={[
        {
          label: f.yesLabel,
          content: (
            <ul className="space-y-3 max-w-[64ch]">
              {f.yes.map((g, i) => (
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
          label: f.noLabel,
          content: (
            <ul className="space-y-3 max-w-[64ch]">
              {f.no.map((n, i) => (
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
  );
}

/* ─── FAQ accordion ───────────────────────────────────────────── */

function Faq({ items }: { items: Copy["faq"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-2xl bg-paper border border-line overflow-hidden">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i < items.length - 1 ? "border-b border-line" : ""}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-sans font-semibold text-ink text-[15px] md:text-[16.5px] leading-snug">
                {f.q}
              </span>
              <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-line text-ink/60">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  {isOpen ? (
                    <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  ) : (
                    <>
                      <line x1="5.5" y1="2" x2="5.5" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="2" y1="5.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 md:px-8 pb-5 md:pb-6">
                <p className="font-sans text-[14.5px] text-ink/75 leading-relaxed max-w-3xl">
                  {f.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function StudioContent() {
  const { lang } = useLanguage();
  const c: Copy = COPY[lang as Lang];

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <p className="font-display text-[11px] tracking-[0.18em] text-signal-green uppercase mb-6">
            {c.hero.eyebrow}
          </p>
          <h1
            className="font-display font-normal text-ink leading-[1.02] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(30px, 5vw, 64px)" }}
          >
            {c.hero.h1Lead}
            <span className="font-serif italic font-normal text-ink/60">{c.hero.h1Italic}</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {c.hero.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper font-sans font-medium text-[14.5px] px-5 py-3 rounded-lg hover:bg-ink-700 transition-colors"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href="#packs"
              className="inline-flex items-center bg-paper text-ink border border-line font-sans font-medium text-[14.5px] px-5 py-3 rounded-lg hover:bg-ink hover:text-paper hover:border-ink transition-colors"
            >
              {c.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured course card */}
      <section className="bg-cream pb-12 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <FeaturedCourse c={c.course} />
        </div>
      </section>

      {/* Guide + Prompt Packs cards */}
      <section className="bg-cream pb-12 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <GuideAndPacks guide={c.guide} packs={c.packsCard} />
        </div>
      </section>

      {/* Prompt Pack grid */}
      <section id="packs" className="bg-paper py-14 md:py-20 border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">
              {c.packGridSection.eyebrow}
            </p>
            <h2
              className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.packGridSection.heading}
            </h2>
            <p className="font-sans text-base text-ink/70 leading-relaxed mt-3">
              {c.packGridSection.body}
            </p>
          </div>
          <PackGrid s={c.packGridSection} lang={lang as PackLang} />
        </div>
      </section>

      {/* AI Creative System */}
      <section className="bg-cream py-14 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-display text-[10.5px] tracking-[0.18em] text-signal-green-300 uppercase mb-4">
                  {c.system.eyebrow}
                </p>
                <h2
                  className="font-display font-normal leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
                >
                  {c.system.heading}
                </h2>
                <p className="font-sans text-on-dark-muted leading-relaxed mt-5 text-[15px] md:text-[16px]">
                  {c.system.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center bg-paper text-ink font-sans font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-stone transition-colors"
                >
                  {c.system.cta}
                </Link>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {c.system.weeks.map(step => (
                  <div key={step.label} className="rounded-2xl bg-on-dark/[0.06] border border-on-dark/15 p-5">
                    <p className="font-display text-[10px] tracking-[0.16em] text-signal-green-300 uppercase mb-3">
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

      {/* Fit */}
      <section className="bg-cream py-14 md:py-20 border-b border-line">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">{c.fit.eyebrow}</p>
            <h2
              className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.fit.heading}
            </h2>
          </div>
          <FitSection f={c.fit} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-14 md:py-20 border-b border-line">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-12 max-w-2xl">
            <p className="font-sans text-ink/55 text-[13px] mb-2">{c.faq.eyebrow}</p>
            <h2
              className="font-display font-normal text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
            >
              {c.faq.heading}
            </h2>
          </div>
          <Faq items={c.faq.items} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="rounded-2xl bg-brand-brown text-paper p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end">
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
