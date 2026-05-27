import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Imprint — Velur",
  description: "Legal notice and contact information for Velur.",
};

export default function ImprintPage() {
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
          · Legal · Imprint
        </span>

        <h1
          className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] mb-8"
          style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}
        >
          Imprint
        </h1>

        <div className="space-y-8 font-sans text-base text-ink leading-relaxed">
          <div>
            <h2 className="font-sans font-bold text-xl mb-3">Responsible for this website</h2>
            <p className="font-mono text-sm text-muted leading-loose">
              Velur<br />
              Barcelona, Spain<br />
              hello@velur.io<br />
              velur.io
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">Dispute resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              . We are not obliged to participate in dispute resolution proceedings before a
              consumer arbitration body.
            </p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-xl mb-3">Content liability</h2>
            <p>
              The content of this website has been created with care. However, we cannot
              guarantee the accuracy, completeness, or timeliness of the information. As a
              service provider, we are responsible for our own content under general law.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
