import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Velur",
  description: "How Velur collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-paper pt-14 md:pt-20 pb-20 md:pb-24">
      <div className="max-w-[820px] mx-auto px-6 md:px-10">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.14em] text-ink/65 hover:text-amber uppercase mb-8 inline-block"
        >
          ← Home
        </Link>

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-6">
          · Legal · Privacy
        </span>

        <h1
          className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] mb-8"
          style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}
        >
          Privacy Policy
        </h1>

        <div className="prose-velur space-y-8 font-sans text-base text-ink leading-relaxed">
          <p className="text-muted font-mono text-xs uppercase tracking-widest">
            Last updated: May 2026
          </p>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">1. Who we are</h2>
            <p>
              Velur (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a revenue intelligence practice based in Barcelona,
              Spain. We operate the website at velur.io. Contact: hello@velur.io
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">2. What data we collect</h2>
            <p>
              This website does not collect personal data by default. There are no email
              sign-up forms or user accounts. If you book a call via our Cal.com embed,
              Cal.com processes your booking data under their own privacy policy.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">3. Analytics</h2>
            <p>
              We may use privacy-first analytics (no cookies, no cross-site tracking) to
              understand aggregate traffic. No personal data is collected or sold.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">4. Third-party services</h2>
            <p>
              Our booking page embeds Cal.com. When you interact with it, their privacy
              policy applies. We do not share your data with any other third parties.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">5. Your rights</h2>
            <p>
              Under GDPR, you have the right to access, correct, or delete any personal
              data we hold. Contact us at{" "}
              <a href="mailto:hello@velur.io" className="text-amber hover:underline">
                hello@velur.io
              </a>{" "}
              with any requests.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">6. Changes</h2>
            <p>
              We may update this policy. The &quot;last updated&quot; date above will always
              reflect the current version.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
