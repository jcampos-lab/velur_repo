"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Velur — Contact, Anima "Have a seat!" treatment.
 * Soft butter→lavender gradient page, a floating white sheet with a
 * monumental heading and an underlined minimal form (uppercase micro
 * labels, hairline inputs, sage SEND + pill, honeypot), and a right
 * rail with an art card + a mono-labelled ADDRESS/MAIL-style info card.
 */

type State = "idle" | "loading" | "success" | "error";

const L = {
  en: {
    h1: "Have a seat.",
    sub: "We'd love to hear from you. Whether you run a DTC brand, a subscription business or you're just curious, drop a line and get a seat on the waitlist.",
    name: "Name",
    mail: "Mail",
    message: "Message",
    terms1: "I accept the",
    terms2: "terms of use",
    send: "Send",
    honeypot: "If you are human, leave this field blank.",
    infoEmail: "Mail",
    infoBase: "Base",
    infoBaseValue: "Barcelona, ES",
    infoReply: "Reply",
    infoReplyValue: "Within 24h, weekdays",
    successTitle: "You have a seat.",
    successBody: "You're on the list. I'll reach out personally when the next seat opens.",
    error: "Something went wrong, try again or email hello@velur.io",
  },
  es: {
    h1: "Toma asiento.",
    sub: "Nos encantará saber de ti. Tanto si llevas una marca DTC, un negocio de suscripción o simplemente tienes curiosidad, escribe unas líneas y reserva tu sitio en la lista.",
    name: "Nombre",
    mail: "Mail",
    message: "Mensaje",
    terms1: "Acepto las",
    terms2: "condiciones de uso",
    send: "Enviar",
    honeypot: "Si eres humano, deja este campo en blanco.",
    infoEmail: "Mail",
    infoBase: "Base",
    infoBaseValue: "Barcelona, ES",
    infoReply: "Respuesta",
    infoReplyValue: "En 24h, días laborables",
    successTitle: "Tienes tu asiento.",
    successBody: "Estás en la lista. Te escribiré personalmente cuando se abra el siguiente cupo.",
    error: "Algo ha fallado, inténtalo de nuevo o escribe a hello@velur.io",
  },
} as const;

/* Underlined Anima field: uppercase micro label sitting on a hairline. */
function Field({
  id, label, value, onChange, type = "text", textarea = false, required = false, disabled = false,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; textarea?: boolean; required?: boolean; disabled?: boolean;
}) {
  const base =
    "w-full bg-transparent border-0 border-b border-line focus:border-ink outline-none font-sans text-[16px] text-ink py-2.5 transition-colors disabled:opacity-50";
  return (
    <div>
      <label htmlFor={id} className="block font-display text-[11px] uppercase tracking-[0.16em] text-ink/80 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} value={value} required={required} disabled={disabled}
          onChange={(e) => onChange(e.target.value)} className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} value={value} required={required} disabled={disabled}
          onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </div>
  );
}

/* Mono-pill info row: gray pill label, hairline, right-aligned value. */
function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-line pt-4 pb-5">
      <span className="rounded-full bg-stone-200/90 px-3.5 py-1.5 font-display text-[10.5px] uppercase tracking-[0.14em] text-ink shrink-0">
        {label}
      </span>
      <span className="font-sans text-[15.5px] text-ink text-right leading-snug pt-1">{children}</span>
    </div>
  );
}

export default function ContactContent() {
  const { lang } = useLanguage();
  const c = L[lang as "en" | "es"] ?? L.en;
  const prefersReduced = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [honey, setHoney] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !terms || honey) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      className="min-h-[92vh]"
      style={{
        background:
          "linear-gradient(165deg, #F1EFC6 0%, #FAF9F2 42%, #FFFFFF 60%, #E5E0F2 100%)",
        padding: "clamp(20px, 3vw, 44px) var(--gutter) clamp(48px, 6vw, 88px)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-5 items-start" style={{ maxWidth: "var(--container-wide)", margin: "0 auto" }}>
        {/* The white sheet */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[24px] bg-white p-7 md:p-12 lg:p-14"
        >
          {state === "success" ? (
            <div className="py-16">
              <h1 className="font-display font-normal text-ink-strong leading-[1.0] tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(44px, 7vw, 96px)" }}>
                {c.successTitle}
              </h1>
              <p className="font-sans text-[18px] leading-[1.6] text-ink/85 max-w-[46ch]">{c.successBody}</p>
            </div>
          ) : (
            <>
              <h1 className="font-display font-normal text-ink-strong leading-[1.0] tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(44px, 7vw, 96px)" }}>
                {c.h1}
              </h1>
              <p className="font-sans text-[17px] md:text-[19px] leading-[1.55] text-ink/85 max-w-[42ch] mb-12">
                {c.sub}
              </p>

              <form onSubmit={handleSubmit} className="max-w-[620px] space-y-9">
                <Field id="ct-name" label={c.name} value={name} onChange={setName} disabled={state === "loading"} />
                <Field id="ct-mail" label={c.mail} value={email} onChange={setEmail} type="email" required disabled={state === "loading"} />
                <Field id="ct-msg" label={c.message} value={message} onChange={setMessage} textarea disabled={state === "loading"} />

                {/* honeypot, invisible to humans */}
                <input
                  type="text"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                />

                <label className="flex items-center gap-3 border-b border-line pb-5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    required
                    className="h-4 w-4 accent-[#9FB16A]"
                  />
                  <span className="font-display text-[11px] uppercase tracking-[0.16em] text-ink">
                    {c.terms1}{" "}
                    <Link href="/terms" className="underline underline-offset-2 hover:text-signal-green">{c.terms2}</Link>
                  </span>
                </label>

                <div>
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex items-center gap-8 rounded-full bg-[#E4EAC8] hover:bg-[#DCE4B8] px-7 py-3.5 font-display text-[12.5px] uppercase tracking-[0.16em] text-ink transition-colors disabled:opacity-50"
                  >
                    {state === "loading" ? "…" : c.send}
                    <span aria-hidden className="text-[16px] leading-none">+</span>
                  </button>
                  <p className="font-sans text-[13px] text-ink/55 mt-5">{c.honeypot}</p>
                  {state === "error" && (
                    <p className="font-sans text-[13px] text-coral mt-3">{c.error}</p>
                  )}
                </div>
              </form>
            </>
          )}
        </motion.div>

        {/* Right rail: art card + info card */}
        <div className="flex flex-col gap-5 lg:pt-24">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[18px]"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image src="/art/abstract-petals.png" alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </motion.div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[18px] bg-white p-6 md:p-8"
          >
            <InfoRow label={c.infoEmail}>
              <a href="mailto:hello@velur.io" className="hover:underline">hello@velur.io</a>
            </InfoRow>
            <InfoRow label={c.infoBase}>{c.infoBaseValue}</InfoRow>
            <InfoRow label={c.infoReply}>{c.infoReplyValue}</InfoRow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
