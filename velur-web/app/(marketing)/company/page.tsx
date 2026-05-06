import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "Company — Velur",
  description:
    "Why a dedicated revenue intelligence practice delivers more than hiring in-house — and costs less.",
};

const COST_ROWS = [
  {
    label: "Annual cost",
    hire: "$123K–$169K",
    hireNote: "Salary + benefits + employer tax",
    velur: "From $46K",
    velurNote: "Full retainer · all tooling included",
  },
  {
    label: "Time to first insight",
    hire: "3–6 months",
    hireNote: "Job listing → offer → onboarding → ramp",
    velur: "14 days",
    velurNote: "From kickoff call to live dashboard",
  },
  {
    label: "Analytics tool stack",
    hire: "$24K–$60K/yr extra",
    hireNote: "BI + attribution + ETL + warehousing",
    velur: "Included or owned",
    velurNote: "Built into your infrastructure, yours forever",
  },
  {
    label: "What you own if they leave",
    hire: "Almost nothing",
    hireNote: "Tribal knowledge walks out the door",
    velur: "Everything",
    velurNote: "Every file, every query, every model in your repo",
  },
  {
    label: "Specialist depth",
    hire: "One generalist",
    hireNote: "Hard to find one person across the full stack",
    velur: "Full modern data stack",
    velurNote: "dbt, BigQuery, attribution, cohorts, forecasting",
  },
];

const BELIEFS = [
  { num: "01", text: "Modern data stacks beat legacy SaaS dashboards" },
  { num: "02", text: "AI as leverage, not as marketing" },
  { num: "03", text: "Founders should own their data, always" },
  { num: "04", text: "Small teams ship faster and cheaper" },
  { num: "05", text: "Numbers are the only language that doesn't lie" },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-24 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            COMPANY · HOW WE THINK
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8 max-w-5xl"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            The analytics team
            <br />you never had to hire.
          </h1>
          <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
            Velur delivers the data intelligence of a senior analytics function — without the
            salary, the ramp time, or the single-person dependency.
          </p>
        </div>
      </section>

      {/* The math */}
      <section className="bg-cream py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="01 / THE MATH" right="IN-HOUSE VS VELUR" className="mb-16" />

          <h2
            className="font-sans font-bold text-ink leading-tight tracking-[-0.04em] mb-14 max-w-3xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 52px)" }}
          >
            Hiring a senior data analyst costs $147K–$230K per year — before you write a single query.
          </h2>

          {/* Comparison table */}
          <div className="border border-line rounded-[16px] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-paper border-b border-line">
              <div className="p-6 border-r border-line" />
              <div className="p-6 border-r border-line">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">In-house hire</p>
              </div>
              <div className="p-6 bg-cream">
                <p className="font-mono text-xs uppercase tracking-widest text-amber">Velur</p>
              </div>
            </div>

            {COST_ROWS.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 bg-paper ${
                  i < COST_ROWS.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="p-6 border-r border-line">
                  <span className="font-sans font-semibold text-ink text-sm leading-snug">
                    {row.label}
                  </span>
                </div>
                <div className="p-6 border-r border-line flex flex-col gap-1">
                  <span className="font-mono text-sm text-ink">{row.hire}</span>
                  <span className="font-mono text-xs text-muted">{row.hireNote}</span>
                </div>
                <div className="p-6 bg-cream/60 flex flex-col gap-1">
                  <span className="font-mono text-sm text-ink">{row.velur}</span>
                  <span className="font-mono text-xs text-muted">{row.velurNote}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-xs text-muted mt-5">
            Cost estimates based on US BLS Occupational Outlook, Glassdoor salary data, and 30% employer cost burden. Tool stack estimates based on standard modern data stack pricing.
          </p>
        </div>
      </section>

      {/* Why it works */}
      <section className="bg-paper py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="02 / WHY IT WORKS" right="" className="mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line rounded-[16px] overflow-hidden">
            {[
              {
                num: "01",
                heading: "Clarity in 14 days.",
                body: "The average in-house analytics hire takes 3–6 months to reach full productivity. We deliver a working dashboard and revenue analysis within your first two weeks.",
              },
              {
                num: "02",
                heading: "Everything you own.",
                body: "Every SQL file, every dashboard config, every data model lives in your GitHub from day one. We leave and nothing breaks. You own the work, permanently.",
              },
              {
                num: "03",
                heading: "A team's depth at a fraction of the cost.",
                body: "One analyst can't be expert across dbt, BigQuery, attribution modeling, cohort analysis, and forecasting simultaneously. Our practice covers the full modern data stack.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-paper p-10 flex flex-col gap-5">
                <span className="font-mono text-xs text-muted">{item.num}</span>
                <h3
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.025em]"
                  style={{ fontSize: "clamp(20px, 2vw, 30px)" }}
                >
                  {item.heading}
                </h3>
                <p className="font-sans text-base text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background — dark section */}
      <section className="bg-ink py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-10">
                BACKGROUND
              </p>
              <p
                className="font-serif italic font-normal text-white leading-[1.45]"
                style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              >
                "Our team has spent years inside the analytics stacks of high-growth DTC and
                subscription brands — companies you've heard of, in apparel, consumables, and
                subscription. We've built the dashboards executives rely on every Monday, shipped
                attribution models that went into board meetings, and designed retention analyses
                that changed pricing strategy. We're bringing that same discipline to the next wave
                of brands."
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="divide-y divide-white/10 border-t border-white/10">
                {[
                  {
                    label: "Stack",
                    value: "BigQuery · dbt · Fivetran · Looker Studio · Metabase · Python · SQL",
                  },
                  {
                    label: "Integrations",
                    value: "Shopify · Klaviyo · Meta · Google · TikTok · Recharge · Stripe",
                  },
                  {
                    label: "Method",
                    value: "Weekly sprints · Daily Loom updates · Everything in your repo",
                  },
                ].map((row) => (
                  <div key={row.label} className="py-6 grid grid-cols-3 gap-4 items-start">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {row.label}
                    </span>
                    <span className="font-mono text-xs text-white/60 col-span-2 leading-relaxed">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-paper py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="03 / WHAT WE BELIEVE" right="" className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[16px] overflow-hidden">
            {BELIEFS.map((b) => (
              <div key={b.num} className="bg-paper p-8 flex items-start gap-4">
                <span className="font-mono text-xs text-muted shrink-0 mt-0.5">{b.num} ·</span>
                <span className="font-sans text-base text-ink leading-relaxed">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline1="Want to know if Velur is right for your brand?"
        headline2="Book a call and find out."
        buttonText="Book a call →"
        meta="30 minutes · Free · No pitch"
      />
    </>
  );
}
