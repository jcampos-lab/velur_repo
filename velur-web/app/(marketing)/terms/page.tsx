import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Velur",
  description: "Terms governing your use of Velur and its services.",
};

export default function TermsPage() {
  return (
    <section className="bg-paper pt-20 pb-24">
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors mb-10 inline-block"
        >
          ← Home
        </Link>

        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
          LEGAL · TERMS OF SERVICE
        </p>

        <h1
          className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-10"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          Terms of Service
        </h1>

        <div className="space-y-8 font-sans text-base text-ink leading-relaxed">
          <p className="text-muted font-mono text-xs uppercase tracking-widest">
            Last updated: May 2026
          </p>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">1. Agreement</h2>
            <p>
              By using velur.io, you agree to these terms. If you don&apos;t agree, please
              don&apos;t use the site. These terms govern your use of this website only, not
              any client engagement with Velur (which is covered by a separate contract).
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">2. Use of this site</h2>
            <p>
              You may browse this site for your own informational purposes. You may not
              scrape, reproduce, or redistribute the content without written permission.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">3. Content</h2>
            <p>
              All content on this site — text, statistics, and design — is the property
              of Velur unless otherwise attributed. Statistics sourced from third parties
              are cited and remain the property of their respective publishers.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">4. Disclaimer</h2>
            <p>
              This website is provided for informational purposes. Industry statistics
              and benchmarks are sourced from public research and provided in good faith.
              Results for any individual business will vary.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">5. Contact</h2>
            <p>
              Questions?{" "}
              <a href="mailto:hello@velur.io" className="text-amber hover:underline">
                hello@velur.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
