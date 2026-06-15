import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice · Velur",
  description:
    "How Velur collects, uses, stores and protects data. EU-hosted, read-only, tenant-isolated, and never used to train AI.",
};

/* Privacy Notice modelled on a modern DTC-analytics privacy notice
   (data categories, lawful bases, storage/transfer, retention, sharing,
   cookies, rights, controller/processor roles), adapted to Velur's
   reality: EU residency, read-only access, minimise egress, no AI
   training, tenant isolation. Full page width, label rail + explanation. */
const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "1. The data we collect and process",
    body: (
      <>
        <p className="mb-4">We work with three kinds of data, and we treat them very differently.</p>
        <ul className="space-y-3">
          <li><strong>Connected business data.</strong> When a customer connects their tools (Shopify, Meta, Stripe, Recharge, Google Ads, Klaviyo), we read their orders, customers, products, ad spend, subscriptions and related records, read-only, to build their revenue intelligence. We process this on the customer&apos;s behalf, as their processor.</li>
          <li><strong>Account and user data.</strong> Names, work emails and login details of the people who use Velur, so we can run accounts, support and billing.</li>
          <li><strong>Website and prospect data.</strong> The email you enter in the waitlist form, plus basic, privacy-first analytics about how the site is used.</li>
        </ul>
      </>
    ),
  },
  {
    h: "2. How we use data, and our lawful bases",
    body: (
      <>
        <p className="mb-4">We use data only for clear purposes, each with a lawful basis under the GDPR:</p>
        <ul className="space-y-3">
          <li><strong>To provide the service</strong> (model your data, write your daily brief): performance of a contract.</li>
          <li><strong>To secure and improve the product</strong> (debugging, abuse prevention, reliability): legitimate interests.</li>
          <li><strong>To contact waitlist signups and send service messages:</strong> consent or legitimate interests.</li>
          <li><strong>To meet legal and tax obligations:</strong> legal obligation.</li>
        </ul>
        <p className="mt-4">We never sell your data, and we never use it to train shared AI models.</p>
      </>
    ),
  },
  {
    h: "3. The principle that shapes everything: minimal egress",
    body: (
      <p>
        Your raw business data stays in your ecosystem. The most sensitive records, individual customer names,
        emails and transactions, <strong>never leave our database</strong>. To write your brief we send the AI model
        <strong> only aggregated, derived numbers</strong> (revenue by channel, blended ROAS, churn by cohort). The
        model reasons over the summary, never over your customers.
      </p>
    ),
  },
  {
    h: "4. Where your data is stored and transferred",
    body: (
      <p>
        Connected business data is processed and stored on <strong>EU infrastructure</strong>, under GDPR-compliant
        data-processing agreements, encrypted in transit and at rest. Where any provider operates outside the EU,
        we rely on appropriate safeguards (such as Standard Contractual Clauses) and keep transfers to the minimum
        the service needs.
      </p>
    ),
  },
  {
    h: "5. How long we keep it",
    body: (
      <p>
        We keep connected data while you use Velur, so your history and trends stay intact. If you stop using the
        product, we delete your connected data; we keep account and billing records only as long as the law
        requires. You can ask us to delete your data at any time.
      </p>
    ),
  },
  {
    h: "6. How we share your data",
    body: (
      <>
        <p className="mb-4">We don&apos;t sell data or share it with other brands. We use a small set of trusted sub-processors to run Velur, each under a data-processing agreement:</p>
        <ul className="space-y-2">
          <li><strong>Anthropic</strong>, the AI that drafts the brief (receives aggregates only; does not train on the data; zero-retention used where it qualifies).</li>
          <li><strong>Supabase</strong>, database and storage (EU region).</li>
          <li><strong>Vercel</strong>, website and application hosting.</li>
          <li><strong>Resend</strong>, transactional email (delivering your brief).</li>
        </ul>
        <p className="mt-4">We may also disclose data where the law requires it, or to protect rights and safety. We&apos;ll keep this list current as the product grows.</p>
      </>
    ),
  },
  {
    h: "7. Cookies and tracking",
    body: (
      <p>
        The marketing site uses privacy-first analytics with no advertising cookies and no cross-site tracking. We
        don&apos;t build profiles of you across the web, and we honour Global Privacy Control / Do-Not-Track signals.
      </p>
    ),
  },
  {
    h: "8. Communications",
    body: (
      <p>
        Service messages (security, account, your brief) are part of using Velur. Anything promotional is optional,
        and every marketing email has a one-click unsubscribe.
      </p>
    ),
  },
  {
    h: "9. Security",
    body: (
      <p>
        We use read-only connections, encryption, strict tenant isolation (one business can never see another&apos;s
        data, even by mistake) and least-privilege access. No system is perfectly secure, but we design Velur so
        that the most sensitive data is the least exposed.
      </p>
    ),
  },
  {
    h: "10. Your rights",
    body: (
      <p>
        Under the GDPR (and similar laws) you can access, correct, export, restrict, or delete your data, and object
        to certain processing, at any time. To exercise any right, email{" "}
        <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a> and we&apos;ll
        handle it promptly.
      </p>
    ),
  },
  {
    h: "11. Our role: controller and processor",
    body: (
      <p>
        For connected business data, the customer is the <strong>controller</strong> and Velur is the
        <strong> processor</strong>, we act on their instructions. For account/user and website data, Velur is the
        controller. A data-processing agreement governs the processor relationship with each customer.
      </p>
    ),
  },
  {
    h: "12. Children, changes and contact",
    body: (
      <p>
        Velur is a business tool and is not directed at children. If this notice changes, the &quot;last updated&quot;
        date will reflect it. Questions, or to reach whoever handles data protection at Velur, write to{" "}
        <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-canvas" style={{ padding: "var(--section-y-tight) var(--gutter) var(--section-y)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <Link href="/" className="font-display text-[12px] uppercase tracking-[0.1em] text-slate hover:text-ink transition-colors mb-10 inline-block">
          ← Home
        </Link>

        <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-4">Legal · Privacy Notice</p>
        <h1
          className="font-display font-normal text-ink-strong leading-[1.04] tracking-[-0.025em] mb-6 max-w-[20ch]"
          style={{ fontSize: "clamp(34px, 5vw, 66px)" }}
        >
          Your data stays yours.
        </h1>

        <div className="rounded-2xl border border-line bg-wash-green/50 p-6 md:p-8 mb-4 max-w-[900px]">
          <p className="font-display text-[12px] uppercase tracking-[0.08em] text-signal-green mb-4">The short version</p>
          <ul className="space-y-2.5 font-sans text-[16px] md:text-[17px] text-ink leading-[1.55]">
            <li>• We connect to your tools <strong>read-only</strong>, we can never change anything.</li>
            <li>• Your raw customer data <strong>stays in our EU database</strong>; only aggregated numbers reach the AI.</li>
            <li>• The AI <strong>doesn&apos;t train on your data</strong>, and your data is never sold or shared with other brands.</li>
            <li>• You can <strong>disconnect and delete everything</strong> whenever you want.</li>
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
