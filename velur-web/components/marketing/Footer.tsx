"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const PAGES = [
    { label: t.footer.links.platform,    href: "/services"     },
    { label: t.footer.links.caseStudies, href: "/case-studies" },
    { label: t.footer.links.company,     href: "/company"      },
    { label: t.footer.links.faq,         href: "/faq"          },
    { label: t.footer.links.contact,     href: "/contact"      },
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

      {/* Giant lowercase wordmark — fades out at the bottom */}
      <div
        className="w-full select-none pointer-events-none overflow-hidden flex justify-center"
        aria-hidden
      >
        <p
          className="font-sans font-extrabold text-ink leading-[0.85] tracking-[-0.05em] text-center w-full"
          style={{
            fontSize: "clamp(120px, 26vw, 420px)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
            maskImage:       "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          }}
        >
          velur
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-0">

        {/* Brand — full width, sits above the link columns */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/logos/Velur_Icon_Logo_Transparent_Black.png" alt="Velur" width={28} height={28} className="dark:hidden" />
            <Image src="/logos/Velur_Copy_Logo_Transparent_Black.png" alt="velur" width={72} height={18} className="dark:hidden" />
            <Image src="/logos/Velur_Icon_Logo_Transparent_White.png" alt="Velur" width={28} height={28} className="hidden dark:block" />
            <Image src="/logos/Velur_Copy_Logo_Transparent_White.png" alt="velur" width={72} height={18} className="hidden dark:block" />
          </Link>
          <p className="font-sans text-base text-muted leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>
        </div>

        {/* Link columns — 3-col on mobile and desktop */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-16">
          <FooterCol title={t.footer.cols.pages}   links={PAGES}   />
          <FooterCol title={t.footer.cols.connect}  links={CONNECT} external />
          <FooterCol title={t.footer.cols.legal}    links={LEGAL}   />
        </div>

        {/* Copyright bar */}
        <div className="border-t border-line pt-8 pb-6">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            &copy; {new Date().getFullYear()} VELUR
          </p>
        </div>
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
