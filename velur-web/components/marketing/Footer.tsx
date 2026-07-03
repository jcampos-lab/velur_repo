"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RollingText } from "@/components/ui/rolling-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Velur, Marketing Footer
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
/* Corporate social row, replaces the old floating side rail. */
function SocialLinks() {
  const base =
    "inline-flex w-9 h-9 items-center justify-center rounded-full border text-muted-slate hover:text-white hover:border-white transition-colors";
  const border = { borderColor: "var(--border-dark)" };
  return (
    <div className="flex items-center gap-2.5">
      <a href="https://www.linkedin.com/company/velur/" target="_blank" rel="noopener noreferrer" aria-label="Velur on LinkedIn" className={base} style={border}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06C21.4 8.64 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4z" />
        </svg>
      </a>
      <a href="https://x.com/velur_io" target="_blank" rel="noopener noreferrer" aria-label="Velur on X" className={base} style={border}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href="mailto:hello@velur.io" aria-label="Email Velur" className={base} style={border}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      </a>
    </div>
  );
}

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
  const root = useRef<HTMLElement>(null);

  /* Giant wordmark rises in and the mark spins half a turn as the
     footer scrolls into view. Reduced motion → static. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ft-wordmark", {
          yPercent: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ft-wordmark", start: "top 95%" },
        });
        gsap.from(".ft-wordmark-mark", {
          rotation: -180,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ft-wordmark", start: "top 95%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      className="relative bg-velur-ink text-on-dark overflow-hidden"
      style={{ padding: "var(--section-y-tight) var(--gutter) 24px" }}
    >
      {/* Nature backdrop: silky long-exposure waterfall (Svartifoss),
          barely-there behind an ink wash so the footer stays calm and
          readable. Decorative only, muted, looped, reduced-motion safe. */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.16] pointer-events-none motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/media/footer-nature.webm" type="video/webm" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #101316 0%, rgba(16,19,22,0.72) 35%, rgba(16,19,22,0.62) 70%, #101316 100%)",
        }}
      />
      <div className="relative" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 pb-12"
          style={{ borderBottom: "1px solid var(--border-dark)" }}
        >
          {/* Newsletter column */}
          <div>
            <div className="font-display text-[12px] uppercase tracking-[0.06em] text-coral">
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
              {/* Column heading, quiet underline grows in on hover */}
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
        <div className="flex flex-wrap justify-between items-center gap-5 pt-6">
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

          <SocialLinks />

          <div className="flex items-center gap-5">
            <a
              href="https://commons.wikimedia.org/wiki/File:202_Svartifoss_long_exposure_timelapse_Video_by_Giles_Laurent.webm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10.5px] text-muted-slate/60 hover:text-muted-slate no-underline"
            >
              Footage: Giles Laurent · CC BY-SA 4.0
            </a>
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

      {/* Bottom wordmark, mark + "Velur" pinned to the LEFT edge of
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
        <div className="ft-wordmark flex items-center justify-start gap-[1.5vw] flex-nowrap">
          <Image
            src="/logos/velur-mark-white.png"
            alt=""
            width={400}
            height={400}
            priority={false}
            className="ft-wordmark-mark h-auto shrink-0"
            style={{ width: "clamp(64px, 11vw, 180px)" }}
          />
          <span
            className="leading-[0.85] tracking-[-0.04em] text-[#F4F1E8] whitespace-nowrap"
            style={{
              fontFamily: "'Px Grotesk', Inter, system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(9rem, 30vw, 26rem)",
              /* Subtle faux-bold, just enough to lift Px Grotesk Regular
                 at display size without going slab. */
              WebkitTextStroke: "0.022em #F4F1E8",
              paintOrder: "stroke fill",
              fontSynthesisWeight: "auto",
            }}
          >
            velur
          </span>
        </div>
      </div>
    </footer>
  );
}
