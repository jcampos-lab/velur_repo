"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Header() {
  const headerRef   = useRef<HTMLElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { t, lang, setLang } = useLanguage();

  const NAV_LINKS = [
    { label: t.header.nav.platform,     href: "/services"      },
    { label: t.header.nav.caseStudies,  href: "/case-studies"  },
    { label: t.header.nav.company,      href: "/company"       },
    { label: t.header.nav.faq,          href: "/faq"           },
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
        className={`fixed top-0 left-0 right-0 z-50 h-20 border-b border-line transition-all duration-200 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-md"
            : "bg-paper"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between gap-6">

          {/* Logo — black in light mode, white in dark mode */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Velur home">
            <Image src="/logos/Velur_Icon_Logo_Black.svg" alt="Velur mark" width={28} height={28} className="shrink-0 dark:hidden" />
            <Image src="/logos/Velur_Copy_Logo_Black.svg" alt="velur"       width={72} height={18} className="shrink-0 dark:hidden" />
            <Image src="/logos/Velur_Icon_Logo_White.svg" alt="Velur mark" width={28} height={28} className="shrink-0 hidden dark:block" />
            <Image src="/logos/Velur_Copy_Logo_White.svg" alt="velur"       width={72} height={18} className="shrink-0 hidden dark:block" />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans font-medium text-base text-ink hover:text-amber transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              aria-label="Change language"
              className="hidden md:flex items-center gap-1 font-mono text-xs text-muted hover:text-ink transition-colors duration-150 border border-line rounded-full px-3 py-1.5"
            >
              <span className={lang === "en" ? "text-ink font-semibold" : ""}>EN</span>
              <span className="text-line">/</span>
              <span className={lang === "es" ? "text-ink font-semibold" : ""}>ES</span>
            </button>
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-ink text-paper font-sans font-medium text-base px-6 py-3 rounded-full hover:bg-amber transition-colors duration-200"
            >
              {t.header.cta} <span aria-hidden>→</span>
            </Link>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-px bg-ink" />
              <span className="block w-6 h-px bg-ink" />
              <span className="block w-4 h-px bg-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay nav */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-paper flex flex-col">
          <div className="flex items-center justify-between px-6 h-20 border-b border-line">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <Image src="/logos/Velur_Icon_Logo_Black.svg" alt="Velur mark" width={28} height={28} className="dark:hidden" />
              <Image src="/logos/Velur_Copy_Logo_Black.svg" alt="velur"       width={72} height={18} className="dark:hidden" />
              <Image src="/logos/Velur_Icon_Logo_White.svg" alt="Velur mark" width={28} height={28} className="hidden dark:block" />
              <Image src="/logos/Velur_Copy_Logo_White.svg" alt="velur"       width={72} height={18} className="hidden dark:block" />
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
              className="mt-6 inline-flex items-center justify-center gap-2 bg-ink text-paper font-sans font-medium text-base px-6 py-3.5 rounded-full"
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
