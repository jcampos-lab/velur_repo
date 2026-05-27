"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const NAV_LINKS = [
  { label: "Platform",  href: "/services" },
  { label: "Company",   href: "/company"  },
  { label: "Blog",      href: "/blog"     },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 h-[72px] transition-colors duration-200 ${
          scrolled ? "bg-cream/90 backdrop-blur-md border-b border-line" : "bg-cream"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-6">

          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Velur home">
            <Image src="/logos/Velur_Icon_Logo_Transparent_Black.png" alt="" width={28} height={28} className="dark:hidden" />
            <Image src="/logos/Velur_Copy_Logo_Transparent_Black.png" alt="velur" width={78} height={20} className="dark:hidden" />
            <Image src="/logos/Velur_Icon_Logo_Transparent_White.png" alt="" width={28} height={28} className="hidden dark:block" />
            <Image src="/logos/Velur_Copy_Logo_Transparent_White.png" alt="velur" width={78} height={20} className="hidden dark:block" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[15px] text-ink/80 hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-5 py-2.5 rounded-md hover:bg-ink transition-colors"
            >
              Request access
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              aria-label="Change language"
              className="hidden md:inline-flex items-center font-sans text-[14px] text-ink/70 hover:text-ink pl-3 border-l border-line transition-colors"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
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

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-cream flex flex-col">
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-line">
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <Image src="/logos/Velur_Icon_Logo_Transparent_Black.png" alt="" width={28} height={28} className="dark:hidden" />
              <Image src="/logos/Velur_Copy_Logo_Transparent_Black.png" alt="velur" width={78} height={20} className="dark:hidden" />
              <Image src="/logos/Velur_Icon_Logo_Transparent_White.png" alt="" width={28} height={28} className="hidden dark:block" />
              <Image src="/logos/Velur_Copy_Logo_Transparent_White.png" alt="velur" width={78} height={20} className="hidden dark:block" />
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
              className="mt-6 inline-flex items-center justify-center bg-amber text-white font-sans font-semibold text-base px-6 py-3.5 rounded-md"
            >
              Request access
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="mt-4 font-sans text-sm text-muted text-left"
            >
              {lang === "en" ? "Cambiar a Español" : "Switch to English"}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
