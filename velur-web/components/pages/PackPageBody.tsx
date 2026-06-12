"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  countPrompts,
  type PromptPack,
  type PromptTool,
  type Lang,
} from "@/lib/promptPacks";
import {
  packTitle,
  packTagline,
  packIntro,
  groupTitle,
  promptTitle,
  promptNote,
} from "@/lib/promptPacksEs";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* Per-page chrome strings — EN + Castilian Spanish. */
const CHROME = {
  en: {
    backLink: "All prompt packs",
    promptPackLabel: "Prompt Pack",
    promptsSuffix: "prompts",
    sidebarEyebrow: "Want the editable version?",
    sidebarBody:
      "We share the full editable Notion + .txt versions with brands on the waitlist when their kickoff begins.",
    sidebarCta: "Join the waitlist",
    finalEyebrow: "Want every pack",
    finalHeading: "All six packs, kept current.",
    finalBody:
      "We add new prompts every week as we ship for clients. Brands on the waitlist get the editable Notion + .txt versions when their kickoff begins.",
    finalCta: "Join the waitlist",
  },
  es: {
    backLink: "Todos los prompt packs",
    promptPackLabel: "Prompt Pack",
    promptsSuffix: "prompts",
    sidebarEyebrow: "¿Quieres la versión editable?",
    sidebarBody:
      "Compartimos la versión editable completa en Notion y .txt con las marcas que están en la lista de espera cuando arranca su kickoff.",
    sidebarCta: "Unirse a la lista",
    finalEyebrow: "Quiero todos los packs",
    finalHeading: "Los seis packs, siempre al día.",
    finalBody:
      "Añadimos prompts nuevos cada semana según lanzamos trabajo para clientes. Las marcas en la lista de espera reciben la versión editable en Notion y .txt cuando arranca su kickoff.",
    finalCta: "Unirse a la lista",
  },
} as const;

/* Tool chips — small mono-uppercase badges next to each prompt title. */
const toolStyles: Record<PromptTool, { bg: string; fg: string }> = {
  MidJourney: { bg: "bg-wash-green", fg: "text-signal-green" },
  Higgsfield: { bg: "bg-coral-wash", fg: "text-coral" },
  Claude:     { bg: "bg-wash-blue",  fg: "text-action-blue" },
  ChatGPT:    { bg: "bg-stone",      fg: "text-ink-strong" },
};

export default function PackPageBody({ pack }: { pack: PromptPack }) {
  const { lang } = useLanguage();
  const l = lang as Lang;
  const chrome = CHROME[l];
  const total = countPrompts(pack);

  const eyebrowTone: Record<typeof pack.eyebrowTone, string> = {
    green:   "text-signal-green",
    coral:   "text-coral",
    blue:    "text-action-blue",
    default: "text-slate",
  };

  return (
    <>
      {/* Hero — solid pack surface */}
      <section
        className={`${pack.surface} ${pack.textOnDark ? "text-on-dark" : "text-ink-strong"}`}
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <Link
            href="/studio#packs"
            className={`inline-flex items-center gap-2 font-sans text-[14px] mb-8 ${pack.textOnDark ? "text-on-dark-muted hover:text-on-dark" : "text-slate hover:text-ink-strong"} transition-colors`}
          >
            <ArrowLeft size={16} strokeWidth={1.6} />
            {chrome.backLink}
          </Link>

          <p className={`font-display text-[13px] uppercase tracking-[0.06em] mb-5 ${pack.textOnDark ? "text-on-dark-muted" : "text-slate"}`}>
            {chrome.promptPackLabel} · {total} {chrome.promptsSuffix}
          </p>

          <h1
            className="velur-display mb-5 max-w-[18ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {packTitle(pack, l)}
          </h1>

          <p className={`font-sans text-[18px] leading-[1.5] max-w-[44ch] ${pack.textOnDark ? "text-on-dark-muted" : "text-ink"}`}>
            {packTagline(pack, l)}
          </p>
        </div>
      </section>

      {/* Intro paragraph + waitlist CTA */}
      <section
        className="bg-canvas"
        style={{ padding: "var(--section-y-tight) var(--gutter)" }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          <p className="font-sans text-[17px] leading-[1.6] text-ink">
            {packIntro(pack, l)}
          </p>
          <aside className="rounded-2xl bg-stone p-6 md:p-7 flex flex-col gap-3 self-start">
            <p className={`font-display text-[11.5px] uppercase tracking-[0.06em] ${eyebrowTone[pack.eyebrowTone]}`}>
              {chrome.sidebarEyebrow}
            </p>
            <p className="font-sans text-[14.5px] text-ink leading-relaxed">
              {chrome.sidebarBody}
            </p>
            <Link
              href="/contact"
              className="self-start inline-flex items-center bg-velur-ink text-canvas font-sans font-medium text-[14px] px-5 py-3 rounded-[32px] hover:bg-ink-700 transition-colors"
            >
              {chrome.sidebarCta}
            </Link>
          </aside>
        </div>
      </section>

      {/* Groups */}
      <section
        className="bg-canvas"
        style={{ padding: "0 var(--gutter) var(--section-y)" }}
      >
        <div
          className="flex flex-col gap-14 md:gap-20"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          {pack.groups.map((g, gi) => (
            <div key={gi}>
              <div className="mb-6 md:mb-8 border-t border-hairline pt-6">
                <h2
                  className="font-display font-normal text-ink-strong tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.2 }}
                >
                  {groupTitle(pack, gi, l)}
                </h2>
                <p className="font-display text-[12px] uppercase tracking-[0.06em] text-slate mt-2">
                  {g.prompts.length} {chrome.promptsSuffix}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {g.prompts.map((p, pi) => {
                  const ts = toolStyles[p.tool];
                  const note = promptNote(pack, gi, pi, l);
                  return (
                    <article
                      key={pi}
                      className="rounded-[16px] bg-canvas border border-border-light p-6 md:p-7 flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display font-normal text-ink-strong text-[17px] leading-tight tracking-[-0.005em]">
                          {promptTitle(pack, gi, pi, l)}
                        </h3>
                        <span
                          className={`shrink-0 font-display text-[11px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-full ${ts.bg} ${ts.fg}`}
                        >
                          {p.tool}
                        </span>
                      </div>
                      {note ? (
                        <p className="font-sans text-[13.5px] text-slate leading-relaxed">
                          {note}
                        </p>
                      ) : null}
                      <pre
                        className="font-mono text-[12.5px] text-ink leading-[1.55] whitespace-pre-wrap bg-stone-200 rounded-[8px] p-4 border border-card-border"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {p.body}
                      </pre>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA — Midnight band */}
      <section
        className="bg-midnight text-on-dark"
        style={{ padding: "var(--section-y) var(--gutter)" }}
      >
        <div
          className="text-center"
          style={{ maxWidth: "var(--container-text)", margin: "0 auto" }}
        >
          <p className="font-display text-[13px] uppercase tracking-[0.06em] text-action-blue mb-5">
            {chrome.finalEyebrow}
          </p>
          <h2
            className="velur-section-display text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3rem)" }}
          >
            {chrome.finalHeading}
          </h2>
          <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[44ch] mx-auto mb-9">
            {chrome.finalBody}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-canvas text-velur-ink font-sans font-medium text-[16px] px-[30px] py-[15px] rounded-[32px] hover:bg-stone transition-colors"
          >
            {chrome.finalCta}
          </Link>
        </div>
      </section>
    </>
  );
}
