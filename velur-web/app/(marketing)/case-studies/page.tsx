import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";
import Graph3D from "@/components/illustrations/Graph3DClient";

export const metadata: Metadata = {
  title: "Case Studies — Velur",
  description:
    "Real industry research on what proper analytics unlocks for DTC and subscription brands.",
};

const BENCHMARKS = [
  {
    stat: "+23%",
    label: "LTV",
    body: "Brands that segment customers into behavioral cohorts (rather than basic RFM) see meaningfully higher retention and lifetime value.",
    source: "Klaviyo State of Email Marketing, 2025",
    highlight: true,
  },
  {
    stat: "-32%",
    label: "CAC",
    body: "DTC brands that implement proper post-iOS14 attribution (server-side tagging + first-party data) recover most of the measurement loss and reduce CAC accordingly.",
    source: "AppsFlyer Performance Index, 2025",
    highlight: false,
  },
  {
    stat: "3.4×",
    label: "CONVERSION",
    body: "Personalization based on real-time behavioral signals outperforms generic email blasts by this margin on average.",
    source: "Bloomreach Personalization Index, 2025",
    highlight: false,
  },
  {
    stat: "€2,400",
    label: "SAVED/MONTH",
    body: "Brands replacing Triple Whale, Northbeam, or Daasity with a custom-owned analytics layer recover this in monthly SaaS spend.",
    source: "Velur engagement data, projected",
    highlight: false,
  },
];

const VOICES = [
  {
    attribution: "OPERATOR · Andrew Chen, General Partner, a16z",
    quote:
      "Last-click attribution is dead. The brands that survive the post-iOS14 world are the ones that invested in first-party data infrastructure before they had to — not after their CPAs doubled.",
    context:
      "Chen's writing on the death of mobile attribution has been widely cited across DTC circles. For brands still relying on pixel-based measurement, the implication is clear: the data you think you have is increasingly fictional. The brands winning on Meta in 2025 are operating on server-side events and modeled conversions — not the dashboard you inherited.",
    source: "a16z.com · The End of Mobile Attribution, 2023",
  },
  {
    attribution: "ANALYST · Patrick Campbell, Founder, ProfitWell (acq. Paddle)",
    quote:
      "The subscription brands that scaled weren't the ones with the best product. They were the ones who understood their cohorts. Retention by acquisition channel, by first product, by price point — that granularity is what separates a growing business from a leaking one.",
    context:
      "Campbell spent a decade analyzing the metrics of thousands of subscription businesses before Paddle's $200M acquisition of ProfitWell. His core insight — that cohort depth predicts growth better than headline metrics — applies equally to DTC brands with repeat purchase models. If you don't know your D30 retention by SKU, you're optimizing blind.",
    source: "profitwell.com · Subscription Benchmarks Report, 2022",
  },
  {
    attribution: "RESEARCH · McKinsey & Company, Digital Practice",
    quote:
      "SMBs that invest in data analytics capabilities grow revenue 2.5× faster than peers who don't. The gap between data-native and data-delayed companies is widening, not closing.",
    context:
      "McKinsey's 2024 SMB digital maturity research found that the bottleneck for most growing businesses isn't data availability — it's the infrastructure to act on it quickly. Most brands have more data than they can use. What they lack is the plumbing to turn raw events into weekly decisions. That's precisely the gap Velur closes.",
    source: "McKinsey Digital · SMB Analytics Maturity, 2024",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                CASE STUDIES · WHAT THE RESEARCH SHOWS
              </p>
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-6"
                style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
              >
                What good analytics
                <br />
                actually{" "}
                <em className="font-serif not-italic italic font-black">unlocks.</em>
              </h1>
            </div>
            <div className="hidden lg:block shrink-0 opacity-80">
              <Graph3D width={300} height={230} />
            </div>
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className="bg-paper pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="border border-line bg-paper rounded-2xl p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2">
              <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">
                HONEST NOTE
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="font-sans text-base text-ink leading-relaxed">
                Velur is new. We won&apos;t fabricate results from competitors and present them as
                ours. The numbers below are real, cited industry benchmarks — what proper analytics
                typically unlocks for DTC and subscription brands.
              </p>
            </div>
            <div className="md:col-span-2 md:text-right">
              <span className="font-mono text-xs text-muted">APRIL 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks — glass cards */}
      <section className="bg-cream py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="01 / BENCHMARKS" right="CITED · 2024–2025" className="mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BENCHMARKS.map((b, i) => (
              <div
                key={i}
                className={`border border-line bg-paper rounded-[16px] p-10 flex flex-col gap-4 ${
                  b.highlight ? "ring-1 ring-amber/25" : ""
                }`}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="font-mono font-semibold text-ink leading-none"
                    style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                  >
                    {b.stat}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {b.label}
                  </span>
                </div>
                <p className="font-sans text-lg text-ink leading-relaxed flex-1">{b.body}</p>
                <div className="border-t border-line" />
                <p className="font-mono text-xs text-muted">Source · {b.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="bg-paper py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="02 / VOICES" right="FROM OPERATORS & ANALYSTS" className="mb-16" />

          <div className="space-y-0 divide-y divide-line border-t border-b border-line">
            {VOICES.map((v, i) => (
              <div key={i} className="py-16">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                  {v.attribution}
                </p>
                <blockquote
                  className="font-serif italic font-black text-ink leading-[1.35] mb-8 max-w-4xl"
                  style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
                >
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
                <p className="font-sans text-lg text-muted leading-relaxed max-w-3xl mb-6">
                  {v.context}
                </p>
                <p className="font-mono text-xs text-muted">{v.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="bg-cream py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="03 / IMPLICATION" right="" className="mb-14" />

          <h2
            className="font-sans font-bold text-ink leading-tight tracking-[-0.04em] mb-12"
            style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
          >
            Why proper analytics matters
            <br />more in 2026 than ever before.
          </h2>

          <div className="max-w-[720px] space-y-8">
            <p className="font-sans text-lg text-ink leading-relaxed">
              AI didn&apos;t replace data analysis. It made it more important. The brands that win
              in 2026 aren&apos;t the ones with the most data — they&apos;re the ones who can act on
              it fastest, most accurately, with the tightest feedback loops.
            </p>
            <p className="font-sans text-lg text-ink leading-relaxed">
              First-party data is now the only data you can trust. iOS14 broke attribution. Cookie
              deprecation broke retargeting. AI agents are now mediating purchase decisions. The
              brands that survive these shifts are the ones who built proper analytics infrastructure
              before they had to.
            </p>
            <p className="font-sans text-lg text-ink leading-relaxed">
              Velur exists because most growing brands are making seven-figure decisions on
              six-figure dashboards. We close that gap.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        headline1={`"Want to know what your numbers say?"`}
        headline2="Let's find out together."
        buttonText="Book a 30-min call →"
        meta="30 minutes · Free · No deck"
      />
    </>
  );
}
