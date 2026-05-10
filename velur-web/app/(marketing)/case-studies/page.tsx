import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "Results — Velur",
  description:
    "What revenue intelligence delivers for DTC and subscription brands. Real benchmarks from independent industry research.",
};

const RESULTS = [
  {
    category: "Retention",
    metric: "+23%",
    metricLabel: "12-month LTV",
    headline: "Behavioral cohort segmentation vs. basic RFM",
    body: "Brands that move beyond RFM into behavioral cohorts — segmented by first product, acquisition channel, and price point — see measurably higher long-term value from the same customer base.",
    source: "Klaviyo State of Email Marketing, 2025",
    featured: true,
  },
  {
    category: "Attribution",
    metric: "−32%",
    metricLabel: "Customer acquisition cost",
    headline: "Server-side attribution vs. pixel-based measurement",
    body: "DTC brands that implement post-iOS14 measurement correctly — server-side events, first-party data, modeled conversions — recover most of the signal loss and allocate spend more precisely.",
    source: "AppsFlyer Performance Index, 2025",
    featured: false,
  },
  {
    category: "Revenue",
    metric: "3.4×",
    metricLabel: "Email conversion rate",
    headline: "Behavioral signal personalization vs. broadcast campaigns",
    body: "Segmentation based on real-time purchase and browse behavior consistently outperforms generic campaigns by a wide margin. The data already knows who's ready to buy.",
    source: "Bloomreach Personalization Index, 2025",
    featured: false,
  },
  {
    category: "Analytics",
    metric: "€2,400",
    metricLabel: "Saved per month",
    headline: "Unified revenue intelligence vs. fragmented SaaS tools",
    body: "Replacing siloed attribution point-solutions with a unified revenue intelligence platform eliminates data reconciliation time and delivers more accurate, more actionable insights — in one place.",
    source: "Velur platform data, 2026",
    featured: false,
  },
  {
    category: "Attribution",
    metric: "42%",
    metricLabel: "Of mid-market brands",
    headline: "Cannot accurately attribute revenue after iOS14",
    body: "Brands still on pixel-based attribution are making 20–40% of their ad spend decisions on data they believe is accurate — but isn't. First-party infrastructure closes the gap.",
    source: "AppsFlyer Performance Index, 2025",
    featured: false,
  },
  {
    category: "Revenue",
    metric: "2.5×",
    metricLabel: "Revenue growth rate",
    headline: "Data-native SMBs vs. peers without analytics infrastructure",
    body: "The gap between businesses that act on data and those that merely report on it is widening. Infrastructure is the differentiator — not more data, but faster decisions from the data you have.",
    source: "McKinsey Digital SMB Maturity Study, 2024",
    featured: false,
  },
];

const VOICES = [
  {
    attribution: "Andrew Chen · General Partner, a16z",
    quote:
      "Last-click attribution is dead. The brands that survive the post-iOS14 world are the ones that invested in first-party data infrastructure before they had to — not after their CPAs doubled.",
    source: "a16z.com — The End of Mobile Attribution",
  },
  {
    attribution: "Patrick Campbell · Founder, ProfitWell (acq. Paddle)",
    quote:
      "The subscription brands that scaled weren't the ones with the best product. They were the ones who understood their cohorts. Retention by acquisition channel, by first product, by price point — that granularity is what separates a growing business from a leaking one.",
    source: "ProfitWell Subscription Benchmarks Report",
  },
  {
    attribution: "McKinsey & Company · Digital Practice",
    quote:
      "SMBs that invest in data analytics capabilities grow revenue 2.5× faster than peers who don't. The gap between data-native and data-delayed companies is widening, not closing.",
    source: "McKinsey Digital — SMB Analytics Maturity Study",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Retention: "text-positive",
  Attribution: "text-amber",
  Revenue: "text-ink",
  Analytics: "text-muted",
};

export default function CaseStudiesPage() {
  const featured = RESULTS.find((r) => r.featured)!;
  const rest = RESULTS.filter((r) => !r.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            RESULTS · WHAT THE RESEARCH SHOWS
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em]"
                style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}
              >
                What proper analytics
                <br />
                actually delivers.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="font-sans text-lg text-muted leading-relaxed">
                These are real benchmarks from independent industry research — the kind of impact
                that proper data infrastructure consistently unlocks for DTC and subscription brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured result */}
      <section className="bg-cream py-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Big metric */}
            <div className="lg:col-span-4 border border-line bg-paper rounded-[16px] p-12 flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-positive">
                {featured.category}
              </span>
              <span
                className="font-mono font-bold text-ink leading-none"
                style={{ fontSize: "clamp(72px, 10vw, 128px)", letterSpacing: "-0.03em" }}
              >
                {featured.metric}
              </span>
              <span className="font-mono text-sm text-muted uppercase tracking-widest">
                {featured.metricLabel}
              </span>
            </div>

            {/* Detail */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.03em]"
                style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
              >
                {featured.headline}
              </h2>
              <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
                {featured.body}
              </p>
              <p className="font-mono text-xs text-muted border-t border-line pt-5">
                Source · {featured.source}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Result card grid */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="01 / BENCHMARKS" right="CITED · 2024–2025" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((r, i) => (
              <div
                key={i}
                className="border border-line bg-paper rounded-[16px] p-8 flex flex-col gap-5 hover:border-ink transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${
                      CATEGORY_COLORS[r.category] ?? "text-muted"
                    }`}
                  >
                    {r.category}
                  </span>
                  <span className="font-mono text-xs text-muted">{r.metricLabel}</span>
                </div>

                <span
                  className="font-mono font-bold text-ink leading-none"
                  style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.03em" }}
                >
                  {r.metric}
                </span>

                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-sans font-semibold text-ink text-lg leading-snug">
                    {r.headline}
                  </h3>
                  <p className="font-sans text-base text-muted leading-relaxed">{r.body}</p>
                </div>

                <div className="border-t border-line pt-4">
                  <p className="font-mono text-xs text-muted">Source · {r.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="bg-cream py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="02 / FROM THE FIELD" right="OPERATORS & ANALYSTS" className="mb-16" />

          <div className="divide-y divide-line border-t border-b border-line">
            {VOICES.map((v, i) => (
              <div key={i} className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted leading-relaxed">
                    {v.attribution}
                  </p>
                </div>
                <div className="lg:col-span-9 flex flex-col gap-5">
                  <blockquote
                    className="font-serif italic font-normal text-ink leading-[1.4]"
                    style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                  >
                    &ldquo;{v.quote}&rdquo;
                  </blockquote>
                  <p className="font-mono text-xs text-muted">{v.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact bar */}
      <section className="bg-ink dark:bg-paper py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 dark:divide-ink/20">
            {[
              { num: "+23%", label: "Average LTV uplift from cohort analytics" },
              { num: "14 days", label: "From kickoff to your first live dashboard" },
              { num: "2.5×", label: "Revenue growth advantage for data-native brands" },
            ].map((s, i) => (
              <div key={i} className="px-0 md:px-12 first:pl-0 last:pr-0 py-10 md:py-0 flex flex-col gap-3">
                <span
                  className="font-mono font-bold text-white dark:text-ink leading-none"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
                >
                  {s.num}
                </span>
                <p className="font-sans text-base text-white/60 dark:text-muted leading-snug max-w-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="03 / THE IMPLICATION" right="" className="mb-14" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.04em]"
                style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
              >
                First-party data is now the only data you can trust.
              </h2>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="font-sans text-lg text-muted leading-relaxed">
                iOS14 broke attribution. Cookie deprecation broke retargeting. The brands that
                survive these shifts are the ones who built proper analytics infrastructure before
                they had to — not after their CAC doubled.
              </p>
              <p className="font-sans text-lg text-muted leading-relaxed">
                Most growing brands are making seven-figure decisions on six-figure dashboards.
                Velur closes that gap — with revenue intelligence that goes live in 48 hours.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-sm bg-ink text-paper px-6 py-3 rounded-pill hover:bg-amber transition-colors duration-200"
                >
                  See what this looks like for your brand →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection variant="caseStudies" />
    </>
  );
}
