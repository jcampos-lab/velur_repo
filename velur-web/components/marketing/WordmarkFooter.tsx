"use client";

import Link from "next/link";

const COMPANY = [
  { label: "LinkedIn", href: "https://linkedin.com/company/velur", external: true },
  { label: "X / Twitter", href: "https://x.com/velur_io", external: true },
];
const PRODUCT = [
  { label: "Platform", href: "/services" },
  { label: "FAQ", href: "/faq" },
];
const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "hello@velur.io", href: "mailto:hello@velur.io" },
];

export default function WordmarkFooter() {
  return (
    <footer className="relative bg-amber text-white overflow-hidden">
      {/* Massive wordmark */}
      <div
        aria-hidden
        className="w-full select-none pointer-events-none flex justify-center pt-16 pb-2"
      >
        <p
          className="font-sans font-extrabold leading-[0.82] tracking-[-0.05em] text-center text-cream w-full px-4"
          style={{ fontSize: "clamp(140px, 30vw, 460px)" }}
        >
          velur
        </p>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_180px_180px_180px] gap-8 md:gap-10 pt-8">

          <div>
            <p className="font-sans text-[14px] text-white/80">
              © {new Date().getFullYear()} VELUR. ALL RIGHTS RESERVED.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="/terms" className="font-sans text-[14px] text-white/85 hover:text-white">
                Terms
              </Link>
              <span className="text-white/40" aria-hidden>·</span>
              <Link href="/privacy" className="font-sans text-[14px] text-white/85 hover:text-white">
                Privacy
              </Link>
            </div>
          </div>

          <FooterCol title="COMPANY" links={COMPANY} />
          <FooterCol title="PRODUCT" links={PRODUCT} />
          <FooterCol title="RESOURCES" links={RESOURCES} />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-white/65 mb-3 uppercase">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="font-sans text-[16px] md:text-[17px] text-white hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
