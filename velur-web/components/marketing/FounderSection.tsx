"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* Per-section EN+ES content — Castilian Spanish. */
const COPY = {
  en: {
    eyebrow: "The founder",
    h1Lead: "Hi, I'm Alexander.",
    h1Tail: " I built Velur for founders like you.",
    p1: "I've spent the last several years inside DTC and small-business analytics. The kind of work where you watch a great product get stuck because the founder can't tell what's working. That problem is what Velur solves.",
    p2Pre: "I'm also the person building ",
    p2Mid: ", a spa in Port St. Lucie, using the same playbook Velur runs on, plus Higgsfield and MidJourney for the creative side. It is a live test of what good analytics and good AI tooling can do for a small business, run by one person.",
    p3: "I'm not here to upsell you on another dashboard. I'm here to help you understand your numbers and put AI to work where it actually pays for itself. If that sounds useful, let's talk.",
    linkedin: "LinkedIn",
    pillarsLabel: "What guides the work",
    pillars: [
      {
        title: "Clarity over volume",
        body: "Most founders I work with don't need more metrics. They need someone to tell them which three actually matter this week, and why.",
      },
      {
        title: "AI as leverage, not gimmick",
        body: "Claude, MidJourney, Higgsfield. These tools should pay for themselves. I help small businesses fold them into the work they're already doing, then measure whether they moved revenue.",
      },
      {
        title: "Built for small teams",
        body: "Velur is designed for founders, owner-operators, and lean marketing teams. If you have a data department of one, or zero, this is for you.",
      },
    ],
  },
  es: {
    eyebrow: "El fundador",
    h1Lead: "Hola, soy Alexander.",
    h1Tail: " Construí Velur para fundadores como tú.",
    p1: "He pasado los últimos años dentro de la analítica de marcas DTC y pequeños negocios. Ese tipo de trabajo en el que ves cómo un gran producto se queda atascado porque el fundador no sabe qué está funcionando. Ese problema es el que Velur resuelve.",
    p2Pre: "También soy la persona que está construyendo ",
    p2Mid: ", un spa en Port St. Lucie, con el mismo manual con el que opera Velur, además de Higgsfield y MidJourney para todo lo creativo. Es una prueba en vivo de lo que una buena analítica y un buen utillaje de IA pueden hacer por un pequeño negocio gestionado por una sola persona.",
    p3: "No estoy aquí para venderte otro dashboard. Estoy aquí para ayudarte a entender tus números y a poner la IA a trabajar donde de verdad se paga sola. Si te encaja, hablamos.",
    linkedin: "LinkedIn",
    pillarsLabel: "Lo que guía el trabajo",
    pillars: [
      {
        title: "Claridad antes que volumen",
        body: "La mayoría de los fundadores con los que trabajo no necesitan más métricas. Necesitan que alguien les diga qué tres importan esta semana, y por qué.",
      },
      {
        title: "IA como palanca, no como truco",
        body: "Claude, MidJourney, Higgsfield. Estas herramientas deberían pagarse solas. Ayudo a pequeños negocios a integrarlas en el trabajo que ya hacen, y después mido si han movido los ingresos.",
      },
      {
        title: "Pensado para equipos pequeños",
        body: "Velur está diseñado para fundadores, owner-operators y equipos de marketing reducidos. Si tu departamento de datos es de una persona, o de ninguna, esto es para ti.",
      },
    ],
  },
} as const;

export default function FounderSection() {
  const prefersReduced = useReducedMotion();
  const { lang } = useLanguage();
  const c = COPY[lang];

  return (
    <section className="bg-cream py-14 md:py-20 border-y border-line">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="mb-10 md:mb-12 max-w-2xl">
          <p className="font-sans text-ink/55 text-[13px] mb-2">{c.eyebrow}</p>
          <h2
            className="font-sans font-normal text-ink leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            {c.h1Lead}
            <span className="text-ink/55">{c.h1Tail}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-5 max-w-2xl">
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {c.p1}
              </p>
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {c.p2Pre}
                <Link
                  href="https://camilab.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action-blue hover:underline underline-offset-4"
                >
                  Cami Lab Studio
                </Link>
                {c.p2Mid}
              </p>
              <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed">
                {c.p3}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="mailto:hello@velur.io"
                className="inline-flex items-center gap-2 font-sans font-medium text-base text-ink hover:text-action-blue transition-colors"
              >
                hello@velur.io <span aria-hidden>→</span>
              </Link>
              <span className="text-line" aria-hidden>·</span>
              <Link
                href="https://linkedin.com/in/alexander-campos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-base text-ink/65 hover:text-ink transition-colors"
              >
                {c.linkedin}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pl-8 lg:border-l border-line space-y-5"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-slate uppercase">
              {c.pillarsLabel}
            </p>
            {c.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                whileHover={prefersReduced ? undefined : { x: 4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-line pt-5 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-mono text-[11px] text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans font-semibold text-ink text-[16px] leading-snug tracking-[-0.01em]">
                    {p.title}
                  </h3>
                </div>
                <p className="font-sans text-[14.5px] text-ink/65 leading-relaxed pl-7">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
