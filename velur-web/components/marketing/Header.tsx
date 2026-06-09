"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ButtonLink } from "@/components/velur/Button";

/**
 * Velur — Marketing Header
 * Three-zone bar (mark left · menu center · CTA right) following the
 * design system's marketing nav pattern. Liquid-glass sticky nav,
 * 72px tall, optional announcement bar above for product news.
 *
 * Liquid glass treatment (always on, not just on scroll):
 *   - 55% white tint that shows the content behind
 *   - 24px backdrop blur + 180% saturate — strong enough to feel
 *     like Apple's Liquid Glass surface, refined enough to stay
 *     readable as the nav
 *   - 1px inner-top highlight (white 55%) suggests a reflection
 *   - 1px bottom hairline (border-light at 50%) anchors the edge
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [annOpen, setAnnOpen] = useState(true);
  const { t, lang, setLang } = useLanguage();

  /* AI Studio intentionally NOT in the top nav — it lives in the
     footer only. The top nav stays focused on Platform, Company, FAQ. */
  const NAV_LINKS = [
    { label: t.header.nav.platform, href: "/services" },
    { label: t.header.nav.company,  href: "/company" },
    { label: t.header.nav.faq,      href: "/faq" },
  ];

  return (
    <>
      {/* Announcement bar — full-width black strip per AnnouncementBar spec */}
      {annOpen && (
        <div
          className="relative bg-velur-black text-white text-[13px] flex items-center justify-center px-11 py-2"
          style={{ minHeight: "var(--bar-h)" }}
        >
          <span className="text-center">
            {t.header.announcement}{" "}
            <Link
              href="/services"
              className="text-white underline underline-offset-2 ml-2"
            >
              {t.header.announcementLink}
            </Link>
          </span>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setAnnOpen(false)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 inline-flex text-white opacity-80 hover:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>
      )}

      <header
        className="sticky top-0 left-0 right-0 z-50"
        style={{
          height: "var(--nav-h)",
          /* Liquid glass — translucent tint + strong backdrop blur
             so content scrolling behind the nav refracts through it. */
          backgroundColor: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          /* Two-line edge: a soft top highlight (reflection) and a
             very faint bottom hairline (anchor to the page). */
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 0 rgba(220, 221, 224, 0.5)",
        }}
      >
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between gap-6 px-5 md:px-10">
          {/* Mark left */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Velur home">
            <Image
              src="/logos/velur-mark-black.png"
              alt=""
              width={26}
              height={26}
              className="shrink-0"
            />
            <span className="font-display text-[22px] tracking-[-0.02em] text-ink-strong">
              Velur
            </span>
          </Link>

          {/* Menu center */}
          <nav className="hidden md:flex items-center gap-7 mx-auto" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] text-ink hover:text-ink-strong transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA right */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              aria-label="Change language"
              className="hidden md:flex items-center gap-1 font-mono text-[11px] tracking-[0.04em] text-slate hover:text-ink transition-colors duration-150"
            >
              <span className={lang === "en" ? "text-ink-strong" : ""}>EN</span>
              <span className="text-hairline">/</span>
              <span className={lang === "es" ? "text-ink-strong" : ""}>ES</span>
            </button>
            <ButtonLink href="/contact" variant="primary" size="sm" className="hidden md:inline-flex">
              {t.header.cta}
            </ButtonLink>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-5 h-px bg-ink" />
              <span className="block w-5 h-px bg-ink" />
              <span className="block w-3.5 h-px bg-ink" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-canvas flex flex-col">
          <div className="flex items-center justify-between px-5 h-16 border-b border-border-light">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <Image src="/logos/velur-mark-black.png" alt="" width={24} height={24} />
              <span className="font-display text-[20px] tracking-[-0.02em] text-ink-strong">Velur</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-lg text-ink-strong py-3.5 border-b border-border-light"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-velur-ink text-canvas font-medium text-base px-6 py-3.5 rounded-[32px]"
            >
              {t.header.cta}
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="mt-4 font-mono text-sm text-slate text-left"
            >
              {lang === "en" ? "Cambiar a Español" : "Switch to English"}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
