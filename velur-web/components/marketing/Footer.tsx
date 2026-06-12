"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RollingText } from "@/components/ui/rolling-text";

/**
 * Velur — Marketing Footer
 * Signature dark newsletter footer per ui_kits/marketing/Chrome.jsx.
 * Velur-ink (#101316) bg, coral editorial eyebrow, monumental claim,
 * underlined newsletter form, 3-column link list, bottom legal strip.
 *
 * Link resolution rule
 * --------------------
 * Most footer column labels are aspirational nav targets that don't
 * have real pages yet. We render those as non-clickable <span>s so
 * we don't ship dead "#" links to crawlers or users. Anything in
 * KNOWN_LINKS resolves to a real route and renders as a real <Link>.
 */
const KNOWN_LINKS: Record<string, string> = {
  // English labels
  "AI Studio":    "/studio",
  "Integrations": "/integrations",
  "About":        "/company",
  "Customers":    "/customers",
  "Privacy":      "/privacy",
  "Terms":        "/terms",
  // Spanish labels
  "Integraciones":  "/integrations",
  "Sobre nosotros": "/company",
  "Clientes":       "/customers",
  "Privacidad":     "/privacy",
  "Términos":       "/terms",
};

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footerKit;

  return (
    <footer
      className="bg-velur-ink text-on-dark overflow-hidden"
      style={{ padding: "var(--section-y-tight) var(--gutter) 24px" }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 pb-12"
          style={{ borderBottom: "1px solid var(--border-dark)" }}
        >
          {/* Newsletter column */}
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.06em] text-coral">
              {f.eyebrow}
            </div>
            <h3 className="font-display text-[28px] leading-[1.1] tracking-[-0.01em] text-white mt-3 mb-4 max-w-[16ch]">
              {f.heading}
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2.5 pb-2.5 max-w-[340px]"
              style={{ borderBottom: "1px solid var(--border-dark)" }}
            >
              <input
                placeholder={f.placeholder}
                className="flex-1 bg-transparent border-none outline-none text-white font-sans text-[15px] placeholder:text-on-dark-muted"
              />
              <button
                aria-label="Subscribe"
                type="submit"
                className="bg-transparent border-none cursor-pointer text-white inline-flex"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>

          {f.cols.map((c) => (
            <div key={c.h}>
              {/* Column heading — quiet underline grows in on hover */}
              <div className="relative w-fit text-sm text-white mb-3.5 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-signal-green-300 after:transition-[width] after:duration-300 hover:after:w-full">
                {c.h}
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {c.links.map((l) => {
                  const href = KNOWN_LINKS[l];
                  return (
                    <li key={l}>
                      {href ? (
                        <Link
                          href={href}
                          className="group text-sm text-muted-slate hover:text-white no-underline transition-colors"
                        >
                          <RollingText text={l} />
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-slate">{l}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logos/velur-mark-white.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="font-sans text-[12px] text-muted-slate">
              {f.copyright}
            </span>
          </div>
          <div className="flex gap-5">
            {f.legal.map((l) => {
              const href = KNOWN_LINKS[l];
              return href ? (
                <Link
                  key={l}
                  href={href}
                  className="group text-[12px] text-muted-slate hover:text-white no-underline"
                >
                  <RollingText text={l} />
                </Link>
              ) : (
                <span key={l} className="text-[12px] text-muted-slate">
                  {l}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wordmark — mark + "Velur" pinned to the LEFT edge of
          the footer (under the newsletter column). The mark stays at
          its smaller proportion; only the wordmark gets sized up.
          A soft mask-image fade dissolves the right edge into the
          velur-ink canvas. Px Grotesk only ships Regular, so we
          thicken the letterforms with a same-color stroke behind. */}
      <div
        className="relative mt-12 md:mt-16 select-none pointer-events-none overflow-hidden"
        style={{
          /* Break out of the footer's own gutter so the mark touches
             the very left edge of the screen. */
          margin: "56px calc(var(--gutter) * -1) 0",
          paddingLeft: 0,
          paddingRight: 0,
          /* Fade holds full opacity through 72%, dissolves through
             90%, fully transparent at 100%. Both prefixed for Safari. */
          WebkitMaskImage:
            "linear-gradient(to right, #000 0%, #000 72%, rgba(0,0,0,0.55) 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, #000 0%, #000 72%, rgba(0,0,0,0.55) 90%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-start gap-[1.5vw] flex-nowrap">
          <Image
            src="/logos/velur-mark-white.png"
            alt=""
            width={400}
            height={400}
            priority={false}
            className="h-auto shrink-0"
            style={{ width: "clamp(64px, 11vw, 180px)" }}
          />
          <span
            className="leading-[0.85] tracking-[-0.04em] text-[#F4F1E8] whitespace-nowrap"
            style={{
              fontFamily: "'Px Grotesk', Inter, system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(9rem, 30vw, 26rem)",
              /* Subtle faux-bold — just enough to lift Px Grotesk Regular
                 at display size without going slab. */
              WebkitTextStroke: "0.022em #F4F1E8",
              paintOrder: "stroke fill",
              fontSynthesisWeight: "auto",
            }}
          >
            Velur
          </span>
        </div>
      </div>
    </footer>
  );
}
