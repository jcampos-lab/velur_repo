import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service · Velur",
  description: "The terms that govern your use of the Velur website and product.",
};

/* Terms of Service modelled on a modern SaaS ToS structure (site use,
   AI disclaimer, proprietary rights, products/fees, no advice, security,
   third-party links, indemnity, warranty, liability, governing law,
   general), adapted to Velur: EU/Spain jurisdiction, read-only, beta. */
const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. Our site and your account",
    body: (
      <>
        <p className="mb-4">
          By using <strong>velur.io</strong> or the Velur product you agree to these terms. If you don&apos;t agree,
          please don&apos;t use them. You must be able to form a binding contract (broadly, 18 or older) to use Velur.
        </p>
        <p>
          We grant you a limited, non-exclusive, revocable licence to use the site and product for your business.
          Please don&apos;t scrape it, reverse-engineer it, resell it, attack its security, or try to reach data that
          isn&apos;t yours. We may improve, change, or discontinue parts of the service over time.
        </p>
      </>
    ),
  },
  {
    h: "2. About the AI",
    body: (
      <p>
        Velur uses AI to turn your data into a written brief. AI can be wrong or incomplete. Treat its output as
        decision support, not as a guarantee, and use your own judgement before acting. We work hard to make every
        number traceable to its source so you can check it.
      </p>
    ),
  },
  {
    h: "3. What Velur is, and is not",
    body: (
      <p>
        Velur is a read-only intelligence layer: it reads the tools your business runs and reports back. It never
        moves money, places orders, sends messages, or changes anything in your connected accounts. It is
        <strong> not</strong> financial, legal, tax, or investment advice. Figures and examples on this website are
        illustrative, not a promise of results.
      </p>
    ),
  },
  {
    h: "4. Proprietary rights",
    body: (
      <p>
        The content, design and code of this website and product belong to Velur. Your business data, and anything
        you create with the product, remain entirely yours, we claim no ownership over them. If you send us feedback
        or ideas, you allow us to use them to improve Velur without obligation.
      </p>
    ),
  },
  {
    h: "5. Plans, fees and customer terms",
    body: (
      <p>
        A paid engagement is governed by a separate customer agreement, which takes precedence over anything here if
        they conflict. Pricing, billing and cancellation are set out in that agreement; you can cancel and take your
        data with you.
      </p>
    ),
  },
  {
    h: "6. Privacy and security",
    body: (
      <p>
        How we handle data is described in our{" "}
        <Link href="/privacy" className="text-action-blue hover:underline">Privacy Notice</Link>: read-only access,
        EU hosting, raw customer data that never leaves our database, and delete-anytime control. We use
        industry-standard security, though no system is perfectly secure.
      </p>
    ),
  },
  {
    h: "7. Third-party links and services",
    body: (
      <p>
        The site and product may link to or connect with third-party services (the platforms you integrate, for
        example). Those services have their own terms and privacy policies, and we&apos;re not responsible for them.
      </p>
    ),
  },
  {
    h: "8. Your responsibilities and indemnity",
    body: (
      <p>
        When you connect a tool, you confirm you&apos;re entitled to access that account and its data. You agree to
        use Velur lawfully and in good faith, and to cover us against claims that arise from your misuse of the
        service or breach of these terms.
      </p>
    ),
  },
  {
    h: "9. No warranty",
    body: (
      <p>
        Velur is early and is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong>,
        without warranties of any kind while in beta. We don&apos;t warrant that it will be uninterrupted, error-free,
        or that every figure is exact, though that&apos;s exactly what we&apos;re building toward.
      </p>
    ),
  },
  {
    h: "10. Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, Velur is not liable for indirect, incidental, or consequential
        losses arising from your use of the website or product while in beta. Nothing here limits liability that
        can&apos;t be limited under applicable law, including your statutory rights.
      </p>
    ),
  },
  {
    h: "11. Governing law and disputes",
    body: (
      <p>
        These terms are governed by the laws of Spain and the European Union. We&apos;d always rather resolve any
        issue directly first, so please contact us before anything formal. Where it applies, EU consumer-protection
        law and your local rights still stand.
      </p>
    ),
  },
  {
    h: "12. General, changes and contact",
    body: (
      <p>
        We may assign these terms as part of a sale or reorganisation; you may not assign yours without our consent.
        If any part is unenforceable, the rest still applies. If these terms change, the &quot;last updated&quot; date
        will reflect it, and continued use means you accept the update. Questions go to{" "}
        <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a>.
      </p>
    ),
  },
  {
    h: "13. Media credits",
    body: (
      <p>
        The nature footage in the site footer is{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:002_Northern_lights_in_the_night_sky_over_M%C3%BDvatn_in_Iceland_Video_by_Giles_Laurent.webm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-action-blue hover:underline"
        >
          &quot;Northern lights over M&yacute;vatn, Iceland&quot;
        </a>{" "}
        by Giles Laurent, used under the CC BY-SA 4.0 license.
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

        <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-4">Legal · Terms of Service</p>
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
              <div className="font-sans text-[16px] md:text-[17px] text-ink/90 leading-[1.65] max-w-[72ch]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
