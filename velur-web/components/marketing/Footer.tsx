import Link from "next/link";
import Image from "next/image";

const PAGES = [
  { label: "Services",     href: "/services"     },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Company",      href: "/company"      },
  { label: "Contact",      href: "/contact"      },
];

const CONNECT = [
  { label: "LinkedIn",        href: "https://linkedin.com/company/velur" },
  { label: "X / Twitter",     href: "https://x.com/velur_io"             },
  { label: "hello@velur.io",  href: "mailto:hello@velur.io"              },
];

const FINEPRINT = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms",   href: "/terms"   },
  { label: "Imprint", href: "/imprint" },
];

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-line overflow-hidden">

      {/* Giant wordmark — fade top-to-bottom */}
      <div className="relative select-none pointer-events-none px-6 md:px-12 pt-10 pb-0">
        <p
          className="font-sans font-extrabold text-ink leading-none tracking-[-0.05em] whitespace-nowrap"
          style={{
            fontSize: "clamp(88px, 17vw, 260px)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 90%)",
            maskImage:       "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 90%)",
          }}
          aria-hidden
        >
          velur
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              {/* Light mode: black logo */}
              <Image src="/logos/Velur_Icon_Logo_Black.svg" alt="Velur" width={28} height={28} className="dark:hidden" />
              <Image src="/logos/Velur_Copy_Logo_Black.svg" alt="velur" width={72} height={18} className="dark:hidden" />
              {/* Dark mode: white logo */}
              <Image src="/logos/Velur_Icon_Logo_White.svg" alt="Velur" width={28} height={28} className="hidden dark:block" />
              <Image src="/logos/Velur_Copy_Logo_White.svg" alt="velur" width={72} height={18} className="hidden dark:block" />
            </Link>
            <p className="font-sans text-base text-muted leading-relaxed max-w-xs">
              Revenue intelligence for high-growth DTC and subscription brands.
            </p>
          </div>

          <FooterCol title="PAGES"    links={PAGES}     />
          <FooterCol title="CONNECT"  links={CONNECT}   external />
          <FooterCol title="FINEPRINT" links={FINEPRINT} />
        </div>

        {/* Editorial line */}
        <p className="font-serif italic font-black text-muted text-sm mb-8 max-w-md" style={{ fontSize: "clamp(13px,1.2vw,16px)" }}>
          "Built in Barcelona. Numbers are the only language that doesn't lie."
        </p>

        {/* Bottom bar */}
        <div className="border-t border-line pt-8">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            © 2026 VELUR · BARCELONA
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
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external    ? "noopener noreferrer" : undefined}
              className="font-sans text-base text-ink hover:text-amber transition-colors duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
