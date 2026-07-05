"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Orbs } from "@/components/velur/Orbs";
import { RippleGrid } from "@/components/ui/ripple-grid";

gsap.registerPlugin(useGSAP);

/**
 * Velur — Contact.
 * One monumental rounded container on the canvas (the Velur box), with
 * the minimal underlined form on the left and a living invitation on
 * the right: a large breathing RippleGrid with a floating sage badge
 * that pulls you into the form. Orbs behind everything.
 */

type State = "idle" | "loading" | "success" | "error";

const L = {
  en: {
    h1: "Have a seat.",
    sub: "Whether you run a DTC brand, a subscription business or you're just curious, drop a line and take a seat on the waitlist.",
    name: "Name",
    mail: "Mail",
    message: "Message",
    terms1: "I accept the",
    terms2: "terms of use",
    send: "Send",
    honeypot: "If you are human, leave this field blank.",
    badge: "Join the waitlist",
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
    sub: "Tanto si llevas una marca DTC, un negocio de suscripción o simplemente tienes curiosidad, escribe unas líneas y reserva tu sitio en la lista.",
    name: "Nombre",
    mail: "Mail",
    message: "Mensaje",
    terms1: "Acepto las",
    terms2: "condiciones de uso",
    send: "Enviar",
    honeypot: "Si eres humano, deja este campo en blanco.",
    badge: "Únete a la lista",
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
        <textarea id={id} rows={4} value={value} required={required} disabled={disabled}
          onChange={(e) => onChange(e.target.value)} className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} value={value} required={required} disabled={disabled}
          onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-line pt-4 pb-4">
      <span className="rounded-full bg-stone-200/90 px-3.5 py-1.5 font-display text-[10.5px] uppercase tracking-[0.14em] text-ink shrink-0">
        {label}
      </span>
      <span className="font-sans text-[15px] text-ink text-right leading-snug pt-1">{children}</span>
    </div>
  );
}

export default function ContactContent() {
  const { lang } = useLanguage();
  const c = L[lang as "en" | "es"] ?? L.en;
  const prefersReduced = useReducedMotion();
  const inviteRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [honey, setHoney] = useState("");
  const [state, setState] = useState<State>("idle");

  /* The badge floats gently over the grid, a slow breath + bob. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".ct-badge", {
          y: -12,
          scale: 1.04,
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".ct-badge-ring", {
          scale: 1.35,
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          ease: "power1.out",
        });
      });
      return () => mm.revert();
    },
    { scope: inviteRef },
  );

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

  const focusForm = () => {
    document.getElementById("ct-mail")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.getElementById("ct-mail")?.focus(), 450);
  };

  return (
    <section className="relative bg-canvas overflow-hidden" style={{ padding: "clamp(28px, 4vw, 56px) var(--gutter) clamp(56px, 7vw, 96px)" }}>
      <Orbs />
      {/* The Velur box: one big rounded container holding everything */}
      <div
        className="relative rounded-[28px] border border-line bg-paper overflow-hidden"
        style={{ maxWidth: "var(--container-wide)", margin: "0 auto", boxShadow: "0 40px 100px -60px rgba(16,19,22,0.25)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* Left: heading + underlined form */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 md:p-12 lg:p-14"
          >
            {state === "success" ? (
              <div className="py-16">
                <h1 className="font-display font-normal text-ink-strong leading-[1.0] tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(42px, 6vw, 84px)" }}>
                  {c.successTitle}
                </h1>
                <p className="font-sans text-[18px] leading-[1.6] text-ink/85 max-w-[46ch]">{c.successBody}</p>
              </div>
            ) : (
              <>
                <h1 className="font-display font-normal text-ink-strong leading-[1.0] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(42px, 6vw, 84px)" }}>
                  {c.h1}
                </h1>
                <p className="font-sans text-[16.5px] md:text-[18px] leading-[1.55] text-ink/85 max-w-[42ch] mb-10">
                  {c.sub}
                </p>

                <form onSubmit={handleSubmit} className="max-w-[560px] space-y-8">
                  <Field id="ct-name" label={c.name} value={name} onChange={setName} disabled={state === "loading"} />
                  <Field id="ct-mail" label={c.mail} value={email} onChange={setEmail} type="email" required disabled={state === "loading"} />
                  <Field id="ct-msg" label={c.message} value={message} onChange={setMessage} textarea disabled={state === "loading"} />

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
                    <p className="font-sans text-[13px] text-ink/55 mt-4">{c.honeypot}</p>
                    {state === "error" && <p className="font-sans text-[13px] text-coral mt-3">{c.error}</p>}
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* Right: the living invitation. A large breathing grid on
              stone, with a floating sage badge pulling you into the form. */}
          <div ref={inviteRef} className="relative hidden lg:flex flex-col bg-stone-200/60 border-l border-line">
            <div className="relative flex-1 flex items-center justify-center overflow-hidden py-12">
              <RippleGrid rows={8} cols={8} cellSize={58} autoEvery={4} />
              <button
                type="button"
                onClick={focusForm}
                className="ct-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center text-center w-[150px] h-[150px] rounded-full bg-[#E4EAC8] hover:bg-[#DCE4B8] font-display text-[12px] uppercase tracking-[0.14em] text-ink leading-snug px-5 transition-colors"
                style={{ boxShadow: "0 24px 56px -20px rgba(120,140,70,0.55)" }}
              >
                {c.badge}
                <span
                  aria-hidden
                  className="ct-badge-ring absolute inset-0 rounded-full border-2 border-[#C6D394] pointer-events-none"
                />
              </button>
            </div>
            <div className="px-8 pb-8">
              <InfoRow label={c.infoEmail}>
                <a href="mailto:hello@velur.io" className="hover:underline">hello@velur.io</a>
              </InfoRow>
              <InfoRow label={c.infoBase}>{c.infoBaseValue}</InfoRow>
              <InfoRow label={c.infoReply}>{c.infoReplyValue}</InfoRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
