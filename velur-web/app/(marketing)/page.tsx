import HeroSection            from "@/components/marketing/HeroSection";
import BenchmarkGrid          from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection     from "@/components/marketing/ThreeThingsSection";
import FounderSection         from "@/components/marketing/FounderSection";
import SocialMediaAiSection   from "@/components/marketing/SocialMediaAiSection";
import CtaSection             from "@/components/marketing/CtaSection";
import CohortHeatmap          from "@/components/illustrations/CohortHeatmap";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Interactive cohort heatmap — hoverable */}
      <section className="bg-cream py-16 md:py-24 border-y border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
                What we analyze
              </p>
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
              >
                We track every cohort, every month.
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Retention curves quietly tell you which customers are worth acquiring twice — and which campaigns to stop paying for. Hover any cell to see what it really means.
              </p>
            </div>
            <div className="lg:col-span-8">
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
