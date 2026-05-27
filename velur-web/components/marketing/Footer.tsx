"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const PAGES = [
    { label: t.footer.links.platform, href: "/services" },
    { label: t.footer.links.company,  href: "/company"  },
    { label: t.footer.links.faq,      href: "/faq"      },
    { label: t.footer.links.contact,  href: "/contact"  },
  ];

  const CONNECT = [
    { label: "LinkedIn",       href: "https://linkedin.com/company/velur" },
    { label: "X / Twitter",    href: "https://x.com/velur_io"             },
    { label: "hello@velur.io", href: "mailto:hello@velur.io"              },
  ];

  const LEGAL = [
    { label: t.footer.links.privacy, href: "/privacy" },
    { label: t.footer.links.terms,   href: "/terms"   },
    { label: t.footer.links.imprint, href: "/imprint" },
  ];

  return (
    <footer className="bg-cream border-t border-line overflow-hidden">

      {/* Top: link columns */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <FooterCol title={t.footer.cols.pages}   links={PAGES}   />
          <FooterCol title={t.footer.cols.connect} links={CONNECT} external />
          <FooterCol title={t.footer.cols.legal}   links={LEGAL}   />
        </div>
      </div>

      {/* Copyright row — sits above the wordmark */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 border-t border-line py-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-muted tracking-widest uppercase">
          &copy; {new Date().getFullYear()} VELUR · ALL RIGHTS RESERVED
        </p>
        <p className="font-mono text-[11px] text-muted tracking-widest uppercase">
          Built in Barcelona · velur.io
        </p>
      </div>

      {/* Full-screen wordmark — fills the viewport width edge-to-edge */}
      <div
        className="w-full select-none pointer-events-none flex items-end justify-center overflow-hidden"
        aria-hidden
      >
        <p
          className="font-sans font-extrabold text-ink leading-[0.8] tracking-[-0.06em] text-center"
          style={{
            // Sized so it fills the entire width of the viewport without overflow,
            // independent of the max-content wrapper used elsewhere on the page.
            fontSize: "calc(100vw / 2.45)",
            lineHeight: 0.8,
            marginBottom: "-0.08em",
            width: "100%",
          }}
        >
          velur
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted mb-4 md:mb-5">
        {title}
      </p>
      <ul className="space-y-2 md:space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external    ? "noopener noreferrer" : undefined}
              className="font-sans text-sm md:text-base text-ink hover:text-amber transition-colors duration-150 leading-snug"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
