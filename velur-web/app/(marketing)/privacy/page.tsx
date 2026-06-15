import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · Velur",
  description:
    "Plain-language privacy policy: your raw data stays in your ecosystem. EU-hosted, read-only, tenant-isolated, and never used to train AI.",
};

/* Plain-language privacy policy. Full page width — heading in a left
   rail, the explanation on the right, so every clause is easy to scan
   and nothing is boxed into a narrow centre column. */
const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "Who we are",
    body: (
      <p>
        Velur (&quot;we&quot;, &quot;us&quot;) is a revenue-intelligence team based in Barcelona, Spain.
        We operate <strong>velur.io</strong> and the Velur product. For anything in this policy,
        reach us at <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a>.
      </p>
    ),
  },
  {
    h: "The one principle behind all of this",
    body: (
      <p>
        Your raw business data stays in your ecosystem. We connect to your tools <strong>read-only</strong>,
        we pull only what we need to build your brief, and we keep what ever leaves our database to an
        absolute minimum. The most sensitive data — individual customer names, emails and transactions —
        <strong> never leaves our database at all</strong>. Everything below is just the detail of how we keep that promise.
      </p>
    ),
  },
  {
    h: "What we connect to, and how",
    body: (
      <p>
        Velur connects to six tools — Shopify, Meta, Stripe, Recharge, Google Ads and Klaviyo — through
        each platform&apos;s official OAuth flow, with <strong>read-only scopes</strong>. We can read your data
        to model it; we can never write to, change, or delete anything in your accounts. You can disconnect
        any tool from its own settings at any time, and the connection drops immediately.
      </p>
    ),
  },
  {
    h: "What actually leaves our database",
    body: (
      <p>
        To write your daily brief, Velur sends <strong>only aggregated, derived numbers</strong> — things like
        revenue by channel, blended ROAS, or churn by cohort — to the AI model that drafts the text. Individual
        customer records (names, emails, order-level detail) <strong>stay inside our EU database and are never sent
        to the model</strong>. The AI reasons over the summary, not over your customers.
      </p>
    ),
  },
  {
    h: "Where your data lives",
    body: (
      <p>
        Your data is processed and stored on <strong>EU infrastructure</strong>, under GDPR-compliant data-processing
        agreements. It is encrypted in transit and at rest. It is yours: we never sell it, never use it to train
        shared models, and never share it with other brands.
      </p>
    ),
  },
  {
    h: "The AI we use",
    body: (
      <p>
        Velur uses Anthropic&apos;s Claude API to write the brief. By Anthropic&apos;s terms, data sent through the API
        is <strong>not used to train their models</strong>, and where it qualifies we use their zero-retention option.
        Combined with the previous point — that we only ever send aggregates — this means your customer-level data
        is never exposed to the model.
      </p>
    ),
  },
  {
    h: "You are isolated from every other business",
    body: (
      <p>
        Each customer&apos;s data is strictly separated at the database level. One business can never see, query, or
        be mixed with another&apos;s — even by mistake. Your numbers are yours alone.
      </p>
    ),
  },
  {
    h: "Who else touches your data (sub-processors)",
    body: (
      <p>
        We rely on a small set of trusted providers to run Velur — Anthropic (AI), Supabase (database, EU),
        Vercel (hosting) and Resend (email). Each operates under a data-processing agreement, and we keep the
        list as short as possible. We&apos;ll keep this section current as the product grows.
      </p>
    ),
  },
  {
    h: "Your rights, and leaving",
    body: (
      <p>
        Under GDPR you can ask us to access, correct, export, or delete the data we hold about your business,
        at any time. If you stop using Velur, we delete your connected data — nothing is held hostage. Email{" "}
        <a href="mailto:hello@velur.io" className="text-action-blue hover:underline">hello@velur.io</a> and we&apos;ll handle it.
      </p>
    ),
  },
  {
    h: "This website",
    body: (
      <p>
        The website itself collects almost nothing. The only personal data we take here is the email you enter
        in the waitlist form, stored solely to contact you when a seat opens. If we use analytics, it is
        privacy-first — no cookies, no cross-site tracking, no selling data.
      </p>
    ),
  },
  {
    h: "Changes & contact",
    body: (
      <p>
        If this policy changes, the &quot;last updated&quot; date will reflect it. Questions about any of this go to{" "}
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

        <p className="font-display text-[13px] uppercase tracking-[0.06em] text-signal-green mb-4">Legal · Privacy</p>
        <h1
          className="font-display font-normal text-ink-strong leading-[1.04] tracking-[-0.025em] mb-6 max-w-[20ch]"
          style={{ fontSize: "clamp(34px, 5vw, 66px)" }}
        >
          Your data stays yours.
        </h1>

        {/* Short version */}
        <div className="rounded-2xl border border-line bg-wash-green/50 p-6 md:p-8 mb-4 max-w-[900px]">
          <p className="font-display text-[12px] uppercase tracking-[0.08em] text-signal-green mb-4">The short version</p>
          <ul className="space-y-2.5 font-sans text-[16px] md:text-[17px] text-ink leading-[1.55]">
            <li>• We connect to your tools <strong>read-only</strong> — we can never change anything.</li>
            <li>• Your raw customer data <strong>stays in our EU database</strong>; only aggregated numbers reach the AI.</li>
            <li>• The AI <strong>doesn&apos;t train on your data</strong>, and your data is never shared with other brands.</li>
            <li>• You can <strong>disconnect and delete everything</strong> whenever you want.</li>
          </ul>
        </div>
        <p className="font-display text-[11px] uppercase tracking-[0.08em] text-slate mb-12">Last updated: June 2026</p>

        {/* Full-width sections: label left, explanation right */}
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
