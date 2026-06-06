import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  PROMPT_PACKS,
  countPrompts,
  getPackBySlug,
  type PromptTool,
} from "@/lib/promptPacks";

/* Pre-render every pack at build time. */
export function generateStaticParams() {
  return PROMPT_PACKS.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return { title: "Pack not found · Velur" };
  return {
    title: `${pack.title} · Prompt Pack · Velur AI Studio`,
    description: pack.tagline,
  };
}

/* Tool chips — small mono-uppercase badges next to each prompt title. */
const toolStyles: Record<PromptTool, { bg: string; fg: string }> = {
  MidJourney: { bg: "bg-wash-green", fg: "text-signal-green" },
  Higgsfield: { bg: "bg-coral-wash", fg: "text-coral" },
  Claude:     { bg: "bg-wash-blue",  fg: "text-action-blue" },
  ChatGPT:    { bg: "bg-stone",      fg: "text-ink-strong" },
};

export default async function PackPage({ params }: PageProps) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const total = countPrompts(pack);
  const eyebrowTone: Record<typeof pack.eyebrowTone, string> = {
    green:   "text-signal-green",
    coral:   "text-coral",
    blue:    "text-action-blue",
    default: "text-slate",
  };

  return (
    <>
      {/* Hero — solid pack surface, big title */}
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
            All prompt packs
          </Link>

          <p className={`font-mono text-[13px] uppercase tracking-[0.06em] mb-5 ${pack.textOnDark ? "text-on-dark-muted" : "text-slate"}`}>
            Prompt Pack · {total} prompts
          </p>

          <h1
            className="velur-display mb-5 max-w-[18ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {pack.title}
          </h1>

          <p className={`font-sans text-[18px] leading-[1.5] max-w-[44ch] ${pack.textOnDark ? "text-on-dark-muted" : "text-ink"}`}>
            {pack.tagline}
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
            {pack.intro}
          </p>
          <aside className="rounded-2xl bg-stone p-6 md:p-7 flex flex-col gap-3 self-start">
            <p className={`font-mono text-[11.5px] uppercase tracking-[0.06em] ${eyebrowTone[pack.eyebrowTone]}`}>
              Want the editable version?
            </p>
            <p className="font-sans text-[14.5px] text-ink leading-relaxed">
              We share the full editable Notion + .txt versions with brands on the waitlist when their kickoff begins.
            </p>
            <Link
              href="/contact"
              className="self-start inline-flex items-center bg-velur-ink text-canvas font-sans font-medium text-[14px] px-5 py-3 rounded-[32px] hover:bg-ink-700 transition-colors"
            >
              Join the waitlist
            </Link>
          </aside>
        </div>
      </section>

      {/* Groups — each is a section header + a stack of prompt cards */}
      <section
        className="bg-canvas"
        style={{ padding: "0 var(--gutter) var(--section-y)" }}
      >
        <div
          className="flex flex-col gap-14 md:gap-20"
          style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
        >
          {pack.groups.map((g) => (
            <div key={g.title}>
              <div className="mb-6 md:mb-8 border-t border-hairline pt-6">
                <h2
                  className="font-display font-semibold text-ink-strong tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.2 }}
                >
                  {g.title}
                </h2>
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-slate mt-2">
                  {g.prompts.length} prompts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {g.prompts.map((p) => {
                  const ts = toolStyles[p.tool];
                  return (
                    <article
                      key={p.title}
                      className="rounded-[16px] bg-canvas border border-border-light p-6 md:p-7 flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-sans font-semibold text-ink-strong text-[17px] leading-tight tracking-[-0.005em]">
                          {p.title}
                        </h3>
                        <span
                          className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-full ${ts.bg} ${ts.fg}`}
                        >
                          {p.tool}
                        </span>
                      </div>
                      {p.note ? (
                        <p className="font-sans text-[13.5px] text-slate leading-relaxed">
                          {p.note}
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
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-action-blue mb-5">
            Want every pack
          </p>
          <h2
            className="velur-section-display text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3rem)" }}
          >
            All six packs, kept current.
          </h2>
          <p className="font-sans text-[18px] leading-[1.5] text-on-dark-muted max-w-[44ch] mx-auto mb-9">
            We add new prompts every week as we ship for clients. Brands on the waitlist get the editable Notion + .txt versions when their kickoff begins.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-canvas text-velur-ink font-sans font-medium text-[16px] px-[30px] py-[15px] rounded-[32px] hover:bg-stone transition-colors"
          >
            Join the waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
