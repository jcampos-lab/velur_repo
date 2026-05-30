"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Header() {
  const headerRef   = useRef<HTMLElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { t, lang, setLang } = useLanguage();

  const NAV_LINKS = [
    { label: t.header.nav.platform, href: "/services" },
    { label: t.header.nav.studio,   href: "/studio"   },
    { label: t.header.nav.company,  href: "/company"  },
    { label: t.header.nav.faq,      href: "/faq"      },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-[68px] transition-all duration-200 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-md border-b border-line"
            : "bg-paper"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between gap-6">

          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Velur home">
            <Image src="/logos/Velur_Icon_Logo_Transparent_Black.png" alt="Velur mark" width={22} height={22} className="shrink-0" />
            <Image src="/logos/Velur_Copy_Logo_Transparent_Black.png" alt="velur"       width={56} height={14} className="shrink-0" />
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-[14.5px] text-ink hover:text-amber transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              aria-label="Change language"
              className="hidden md:flex items-center gap-1 font-mono text-[11px] text-muted hover:text-ink transition-colors duration-150 border border-line rounded-full px-2.5 py-1"
            >
              <span className={lang === "en" ? "text-ink font-semibold" : ""}>EN</span>
              <span className="text-line">/</span>
              <span className={lang === "es" ? "text-ink font-semibold" : ""}>ES</span>
            </button>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-ink text-paper font-sans font-medium text-[13.5px] px-4 py-2 rounded-full hover:bg-amber hover:text-paper transition-colors duration-200"
            >
              {t.header.cta} <span aria-hidden>→</span>
            </Link>
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
        <div className="fixed inset-0 z-[100] bg-paper flex flex-col">
          <div className="flex items-center justify-between px-5 h-16 border-b border-line">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Image src="/logos/Velur_Icon_Logo_Transparent_Black.png" alt="Velur mark" width={22} height={22} />
              <Image src="/logos/Velur_Copy_Logo_Transparent_Black.png" alt="velur"       width={56} height={14} />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans font-semibold text-lg text-ink py-3.5 border-b border-line"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-ink text-paper font-sans font-medium text-base px-6 py-3.5 rounded-lg"
            >
              {t.header.cta} →
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="mt-4 font-mono text-sm text-muted text-left"
            >
              {lang === "en" ? "Cambiar a Español" : "Switch to English"}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
