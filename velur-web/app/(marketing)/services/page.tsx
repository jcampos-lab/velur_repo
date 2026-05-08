import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import MarqueeCarousel from "@/components/marketing/MarqueeCarousel";
import CtaSection from "@/components/marketing/CtaSection";
import VelurDelivery from "@/components/illustrations/VelurDelivery";
import VelurStack    from "@/components/illustrations/VelurStack";

export const metadata: Metadata = {
  title: "Services — Velur",
  description:
    "Three engagements. One direction: turn what's already in your warehouse into the decisions that change your quarter.",
};

const SERVICES = [
  {
    num: "01",
    label: "DIAGNOSTIC",
    heading: "A complete picture of where your money is actually going.",
    body: "We connect to your Shopify, Klaviyo, and ad platforms. We map your customer journey end-to-end. We deliver a dashboard, a 20-page revenue analysis, and a 90-minute strategy session. You walk away knowing exactly which products drive your margin, where your ad spend leaks, and which cohort retains best.",
    deliverables: [
      "Full data audit across your stack",
      "Customer cohort & retention analysis",
      "Marketing attribution review (post-iOS14)",
      "Margin & profitability mapping by SKU",
      "Live dashboard you keep",
    ],
  },
  {
    num: "02",
    label: "BUILD",
    heading: "A custom analytics stack you own forever.",
    body: "We build the analytics layer your business actually needs. Warehouse setup, data modeling, dashboards, and the operating playbook. Built on tools you own — BigQuery, Looker Studio, Metabase. No per-seat fees. No vendor lock-in. Cancel us tomorrow and the whole thing keeps running.",
    deliverables: [
      "Modern data warehouse setup",
      "Source connections (Fivetran or Airbyte)",
      "dbt-based data modeling",
      "Custom dashboards in Looker Studio or Metabase",
      "Documentation and team training",
    ],
  },
  {
    num: "03",
    label: "PARTNERSHIP",
    heading: "Your part-time analytics team.",
    body: "We become the data team you can't yet hire. Weekly KPI reviews, ad-hoc analyses, dashboard maintenance, and quarterly strategy sessions. We ship faster than hiring, cost less than a full-time analyst, and we get to know your data better than any consultant.",
    deliverables: [
      "Weekly KPI digest delivered Monday morning",
      "Ad-hoc analysis on demand",
      "Dashboard maintenance & evolution",
      "Quarterly strategy sessions",
      "Direct Slack access to the analyst on your account",
    ],
  },
];

const PROCESS = [
  { num: "01", title: "Discovery call",      body: "30 minutes. We listen. You explain. No pitch." },
  { num: "02", title: "Scope & quote",       body: "Within 48 hours, you get a written scope and fixed price. No surprises." },
  { num: "03", title: "Build sprint",        body: "We work in 1-week sprints with daily Loom updates. You see progress every day." },
  { num: "04", title: "Handoff & ownership", body: "Everything we built is in your accounts, your repos. We document everything. You own it forever." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-20 pb-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
                SERVICES · WHAT WE BUILD
              </p>
              <h1
                className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-8"
                style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
              >
                How we work
                <br />with your data.
              </h1>
              <p className="font-sans text-xl text-muted leading-relaxed max-w-2xl">
                Three engagements. One direction: turn what&apos;s already in your warehouse into the
                decisions that change your quarter.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end pointer-events-none select-none" aria-hidden>
              <div className="w-full max-w-[420px]">
                <VelurDelivery />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service blocks — glass cards */}
      <div className="bg-cream divide-y divide-line border-t border-b border-line">
        {SERVICES.map((s) => (
          <div key={s.num} className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left */}
              <div className="lg:col-span-6">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">
                  {s.num} / {s.label}
                </p>
                <h2
                  className="font-sans font-bold text-ink leading-tight tracking-[-0.03em] mb-6"
                  style={{ fontSize: "clamp(26px, 3vw, 48px)" }}
                >
                  {s.heading}
                </h2>
                <p className="font-sans text-lg text-ink leading-relaxed mb-8">{s.body}</p>
                <Button href="/contact" variant="secondary" size="md">
                  Book a call about this →
                </Button>
              </div>

              {/* Right: deliverables glass card */}
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="border border-line bg-paper rounded-[16px] p-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">
                    WHAT&apos;S INCLUDED
                  </p>
                  <ul className="space-y-3">
                    {s.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-muted mt-1 shrink-0">
                          {String(i + 1).padStart(2, "0")} ·
                        </span>
                        <span className="font-sans text-base text-ink">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stack illustration — tools Velur connects to */}
      <section className="bg-paper py-16 flex justify-center overflow-visible">
        <div className="w-full max-w-[580px] px-6 md:px-0 pointer-events-none select-none" aria-hidden>
          <VelurStack />
        </div>
      </section>

      {/* Marquee */}
      <MarqueeCarousel />

      {/* Process */}
      <section className="bg-paper py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionLabel left="THE PROCESS" right="STEP BY STEP" className="mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <div key={step.num} className="border border-line bg-paper rounded-[16px] p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-muted">{step.num}</span>
                  {i < PROCESS.length - 1 && (
                    <div className="flex-1 h-px bg-line hidden lg:block" />
                  )}
                </div>
                <h3 className="font-sans font-bold text-ink text-xl">{step.title}</h3>
                <p className="font-sans text-base text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline1={"\"Want to know which engagement is right for you?\""}
        headline2="Start with a call. We'll figure it out."
        buttonText="Book a 30-min call →"
        meta="30 minutes · Free · No pitch"
      />
    </>
  );
}
