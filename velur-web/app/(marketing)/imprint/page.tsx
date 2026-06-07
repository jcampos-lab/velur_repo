import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Imprint · Velur",
  description: "Legal notice and contact information for Velur.",
};

export default function ImprintPage() {
  return (
    <section className="bg-paper pt-16 md:pt-20 pb-20 md:pb-24">
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors mb-10 inline-block"
        >
          ← Home
        </Link>

        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
          LEGAL · IMPRINT
        </p>

        <h1
          className="font-sans font-normal text-ink leading-[1.05] tracking-[-0.025em] mb-8"
          style={{ fontSize: "clamp(26px, 3.4vw, 40px)" }}
        >
          Imprint
        </h1>

        <div className="space-y-8 font-sans text-base text-ink leading-relaxed">
          <div>
            <h2 className="font-sans font-normal text-xl mb-3">Responsible for this website</h2>
            <p className="font-mono text-sm text-muted leading-loose">
              Velur<br />
              Barcelona, Spain<br />
              hello@velur.io<br />
              velur.io
            </p>
          </div>

          <div>
            <h2 className="font-sans font-normal text-xl mb-3">Dispute resolution</h2>
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
            <h2 className="font-sans font-normal text-xl mb-3">Content liability</h2>
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
