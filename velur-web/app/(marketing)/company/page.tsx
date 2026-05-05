import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import CtaSection from "@/components/marketing/CtaSection";
import Graph3D from "@/components/illustrations/Graph3DClient";

export const metadata: Metadata = {
  title: "Company — Velur",
  description:
    "A small practice with a big stack. Revenue intelligence for high-growth DTC and subscription brands.",
};

const BELIEFS = [
  { num: "01", bold: "Modern data stacks",   text: "beat legacy SaaS dashboards"        },
  { num: "02", bold: "AI as leverage",        text: "not as marketing"                   },
  { num: "03", bold: "Founders should own",   text: "their data, always"                 },
  { num: "04", bold: "Small teams",           text: "ship faster and cheaper"            },
  { num: "05", bold: "Numbers",               text: "are the only language that doesn't lie" },
];

const ROADMAP = [
  {
    num: "01",
    period: "2026 · NOW",
    title: "Velur is a service.",
    body: "We sit beside your analytics team — or become it — for as long as you need. Project-based engagements, embedded partnerships, custom builds.",
  },
  {
    num: "02",
    period: "2027 · NEXT",
    title: "Velur becomes a product.",
    body: "The patterns we discover working with dozens of brands become reusable: a templated DTC analytics stack, an AI revenue forecaster, attribution models trained on first-party data.",
  },
  {
    num: "03",
    period: "2028+ · BEYOND",
    title: "Velur is a platform.",
    body: "The brands we work with own the best analytics layer in their category. The ones we don't work with want to.",
  },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
            COMPANY · WHO WE ARE
          </p>
          <h1
            className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            A small practice.
            <br />A big stack.
          </h1>
        </div>
      </section>

      {/* Position section */}
      <section className="bg-paper pb-28 border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <blockquote
                className="font-serif italic font-black text-ink leading-[1.35]"
                style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
              >
                &ldquo;We&apos;re not a leader in this market yet. We&apos;re pioneers in how to
                deliver it — small, AI-augmented, owner-aligned. We use modern data tooling and AI
                agents because they let us do what an agency needed five people for. That speed is
                your margin.&rdquo;
              </blockquote>
            </div>
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                WHAT WE BELIEVE
              </p>
              <ul className="space-y-5">
                {BELIEFS.map(b => (
                  <li key={b.num} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-muted mt-1 shrink-0">{b.num} ·</span>
                    <span className="font-sans text-base text-ink leading-relaxed">
                      <strong className="font-semibold">{b.bold}</strong> {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience — always-dark section */}
      <section className="bg-ink dark:bg-neutral-950 py-32 relative overflow-hidden">
        <div className="absolute bottom-0 right-8 opacity-25 pointer-events-none hidden xl:block">
          <Graph3D width={300} height={220} forceTheme="dark" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
          <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">EXPERIENCE</span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">2020–2026</span>
          </div>
          <blockquote
            className="font-serif italic font-black text-white leading-[1.35] max-w-4xl mx-auto text-center"
            style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
          >
            &ldquo;Our team has spent the last five years inside the analytics stacks of high-growth
            DTC and subscription brands across the US and Europe — companies you&apos;ve heard of,
            in apparel, consumables, marketplace, and subscription. We&apos;ve built the dashboards
            executives rely on every Monday. We&apos;ve shipped attribution models, retention
            cohorts, and revenue forecasts that went into board meetings. Now we&apos;re bringing
            that same discipline to the next wave of brands.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-paper py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="WHERE WE'RE GOING" right="2026–2028+" className="mb-16" />

          <div className="divide-y divide-line border-t border-line">
            {ROADMAP.map(r => (
              <div key={r.num} className="grid grid-cols-12 gap-6 py-14">
                <div className="col-span-12 md:col-span-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {r.num} / {r.period}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3
                    className="font-sans font-bold text-ink leading-tight tracking-[-0.02em]"
                    style={{ fontSize: "clamp(20px, 2vw, 30px)" }}
                  >
                    {r.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="font-sans text-lg text-muted leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack & Method — glass cards */}
      <section className="bg-cream py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-line bg-cream rounded-[16px] p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">STACK</p>
              <p className="font-sans text-lg text-ink leading-relaxed">
                We build on the modern data stack — BigQuery, dbt, Fivetran, Looker Studio,
                Metabase, Python, SQL. No proprietary tools. No black boxes. Everything is portable,
                everything is documented, everything is yours.
              </p>
            </div>
            <div className="border border-line bg-cream rounded-[16px] p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">METHOD</p>
              <p className="font-sans text-lg text-ink leading-relaxed">
                We deliver in weekly sprints with daily Loom updates. Every artifact we produce —
                every SQL query, every dashboard config, every Python notebook — is in your
                repository under your name from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        headline1={`"Want to know if Velur is right for your brand?"`}
        headline2="Book a call and find out."
        buttonText="Book a call →"
        meta="30 minutes · Free · No pitch"
      />
    </>
  );
}
