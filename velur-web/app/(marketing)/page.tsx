import HeroSection            from "@/components/marketing/HeroSection";
import BentoSection            from "@/components/marketing/BentoSection";
import AnimatedPipelineSection from "@/components/marketing/AnimatedPipelineSection";
import BenchmarkGrid          from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection     from "@/components/marketing/ThreeThingsSection";
import FounderSection         from "@/components/marketing/FounderSection";
import SocialMediaAiSection   from "@/components/marketing/SocialMediaAiSection";
import CtaSection             from "@/components/marketing/CtaSection";
import CohortHeatmap          from "@/components/illustrations/CohortHeatmap";
import LtvLineChart           from "@/components/illustrations/LtvLineChart";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Bento — live KPI dashboard, brief preview, correlation scatter, tools, stat */}
      <BentoSection />

      {/* Pipeline — animated beams from sources to Velur to outputs */}
      <AnimatedPipelineSection />

      {/* Interactive LTV line chart with hover crosshair + tooltip */}
      <section className="bg-cream py-16 md:py-24 border-b border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
                How customers compound
              </p>
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
              >
                Behavioral cohorts pay back twice as hard.
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Compare three segmentation strategies side by side. Scrub across twelve months and watch the gap widen — that&apos;s the lift you&apos;re leaving on the table with broadcast targeting.
              </p>
            </div>
            <div className="lg:col-span-8">
              <LtvLineChart />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive cohort retention heatmap */}
      <section className="bg-paper py-16 md:py-24 border-b border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-4 lg:order-2">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
                What we analyze
              </p>
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
              >
                Every cohort. Every month.
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Retention curves quietly tell you which customers are worth acquiring twice — and which campaigns to stop paying for. Hover any cell to see what it really means.
              </p>
            </div>
            <div className="lg:col-span-8 lg:order-1">
              <CohortHeatmap />
            </div>
          </div>
        </div>
      </section>

      <BenchmarkGrid />
      <ThreeThingsSection />
      <SocialMediaAiSection />
      <FounderSection />
      <CtaSection />
    </>
  );
}
