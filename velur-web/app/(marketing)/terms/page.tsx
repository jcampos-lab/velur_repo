import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use · Velur",
  description: "Plain-language terms for using the Velur website and product.",
};

/* Plain-language terms. Full page width, label rail on the left, the
   explanation on the right. */
const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "Who this is between",
    body: (
      <p>
        These terms are between you and Velur, a revenue-intelligence team based in Barcelona, Spain. They cover
        your use of <strong>velur.io</strong> and the Velur product. A paid engagement has its own separate
        contract, which takes precedence over anything here.
      </p>
    ),
  },
  {
    h: "What Velur is",
    body: (
      <p>
        Velur is an intelligence layer that reads across the tools your business already runs and turns them into
        a clear, written brief. It is <strong>read-only</strong>: Velur never moves money, places orders, sends
        messages, or changes anything inside your connected accounts. You stay in control at all times.
      </p>
    ),
  },
  {
    h: "What Velur is not",
    body: (
      <p>
        Velur is not financial, legal, tax, or investment advice. It helps you see your business clearly and
        decide faster, but the decisions are yours. Any figures, charts, or examples shown on this website are
        <strong> illustrative</strong>, not a promise of results.
      </p>
    ),
  },
  {
    h: "Early product, honest expectations",
    body: (
      <p>
        Velur is early. We work hard to make every number accurate and traceable to its source, but while the
        product is in beta it is provided <strong>&quot;as is&quot;</strong>, without warranties. We&apos;ll always be
        straight with you about what works today and what doesn&apos;t yet.
      </p>
    ),
  },
  {
    h: "Your side of it",
    body: (
      <p>
        When you connect a tool, you confirm you&apos;re allowed to access that account and the data in it. Please
        don&apos;t misuse the site, no scraping, reverse-engineering, reselling, or trying to access other
        businesses&apos; data. Normal, good-faith use is all we ask.
      </p>
    ),
  },
  {
    h: "Your data and your control",
    body: (
      <p>
        Everything about how we handle your data lives in our{" "}
        <Link href="/privacy" className="text-action-blue hover:underline">Privacy Policy</Link>. In short: read-only
        access, EU hosting, your raw customer data never leaves our database, and you can disconnect and delete
        everything whenever you want.
      </p>
    ),
  },
  {
    h: "Intellectual property",
    body: (
      <p>
        The content, design, and code of this website belong to Velur unless otherwise attributed. Your business
        data, of course, remains entirely yours.
      </p>
    ),
  },
  {
    h: "Liability",
    body: (
      <p>
        To the fullest extent allowed by law, Velur isn&apos;t liable for indirect or consequential losses arising
        from use of the website or the product while in beta. Nothing here limits rights you have that can&apos;t
        be limited under applicable law.
      </p>
    ),
  },
  {
    h: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Spain and the European Union. Anything not covered here defaults
        to your statutory rights under EU law.
      </p>
    ),
  },
  {
    h: "Changes & contact",
    body: (
      <p>
        If these terms change, the &quot;last updated&quot; date will reflect it. Questions go to{" "}
        <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <section className="bg-canvas" style={{ padding: "var(--section-y-tight) var(--gutter) var(--section-y)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <Link href="/" className="font-display text-[12px] uppercase tracking-[0.1em] text-slate hover:text-ink transition-colors mb-10 inline-block">
          ← Home
        </Link>

        <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-4">Legal · Terms</p>
        <h1
          className="font-display font-normal text-ink-strong leading-[1.04] tracking-[-0.025em] mb-6 max-w-[20ch]"
          style={{ fontSize: "clamp(34px, 5vw, 66px)" }}
        >
          The plain-English terms.
        </h1>

        <div className="rounded-2xl border border-line bg-wash-green/50 p-6 md:p-8 mb-4 max-w-[900px]">
          <p className="font-display text-[12px] uppercase tracking-[0.08em] text-signal-green mb-4">The short version</p>
          <ul className="space-y-2.5 font-sans text-[16px] md:text-[17px] text-ink leading-[1.55]">
            <li>• Velur reads your tools and writes you a brief, it <strong>never changes anything</strong>.</li>
            <li>• It&apos;s <strong>not financial advice</strong>; the decisions stay yours.</li>
            <li>• It&apos;s early and provided <strong>as is</strong> while in beta, we&apos;ll be honest about that.</li>
            <li>• Use it in good faith; you can <strong>leave and delete your data</strong> anytime.</li>
          </ul>
        </div>
        <p className="font-display text-[11px] uppercase tracking-[0.08em] text-slate mb-12">Last updated: June 2026</p>

        <div>
          {SECTIONS.map((s) => (
            <div
              key={s.h}
              className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 md:gap-14 py-8 md:py-10 border-t border-border-light"
            >
              <h2 className="font-display font-normal text-ink-strong leading-tight tracking-[-0.015em]" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                {s.h}
              </h2>
              <div className="font-sans text-[16px] md:text-[17px] text-ink/90 leading-[1.65] max-w-[70ch]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
