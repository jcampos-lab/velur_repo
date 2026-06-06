"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Velur — Marketing Footer
 * Signature dark newsletter footer per ui_kits/marketing/Chrome.jsx.
 * Velur-ink (#101316) bg, coral editorial eyebrow, monumental claim,
 * underlined newsletter form, 3-column link list, bottom legal strip.
 */
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
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12"
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
              <div className="text-sm text-white mb-3.5">{c.h}</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-muted-slate hover:text-white no-underline transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
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
            {f.legal.map((l) => (
              <Link
                key={l}
                href="#"
                className="text-[12px] text-muted-slate hover:text-white no-underline"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Massive bottom wordmark — mark + "Velur" filling the footer width
          (Retool-style). The brand font Px Grotesk only ships Regular, so
          we use Bricolage Grotesque at 800 here for the proper thick
          display weight. Stays on velur-ink with the on-dark cream color. */}
      <div
        className="relative mt-12 md:mt-16 select-none pointer-events-none"
        style={{ maxWidth: "var(--container-wide)", margin: "48px auto 0" }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-center gap-[3vw] md:gap-[2.5vw] px-2 md:px-4">
          <Image
            src="/logos/velur-mark-white.png"
            alt=""
            width={400}
            height={400}
            priority={false}
            className="w-[14vw] max-w-[200px] h-auto shrink-0"
          />
          <span
            className="leading-none tracking-[-0.04em] text-[#F4F1E8]"
            style={{
              fontFamily: "var(--font-bricolage), 'Px Grotesk', Inter, system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(8rem, 28vw, 28rem)",
            }}
          >
            Velur
          </span>
        </div>
      </div>
    </footer>
  );
}
