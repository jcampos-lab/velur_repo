import HeroSection            from "@/components/marketing/HeroSection";
import ToolMarquee            from "@/components/marketing/ToolMarquee";
import BentoSection            from "@/components/marketing/BentoSection";
import BenchmarkGrid          from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection     from "@/components/marketing/ThreeThingsSection";
import SocialMediaAiSection   from "@/components/marketing/SocialMediaAiSection";
import CtaSection             from "@/components/marketing/CtaSection";
import CohortHeatmap          from "@/components/illustrations/CohortHeatmap";
import LtvLineChart           from "@/components/illustrations/LtvLineChart";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Tool marquee */}
      <ToolMarquee />

      {/* Bento dashboard */}
      <BentoSection />

      {/* Interactive LTV chart */}
      <section className="bg-cream py-14 md:py-20 border-b border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-4">
              <p className="font-sans text-ink/55 text-[13px] mb-2">
                How customers compound
              </p>
              <h2
                className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
              >
                Behavioral cohorts pay back twice as hard.
              </h2>
              <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                Compare three segmentation strategies side by side. Scrub across twelve months and watch the gap widen. That is the lift you are leaving on the table with broadcast targeting.
              </p>
            </div>
            {/* LTV chart: desktop only, mobile gets the framing copy only */}
            <div className="hidden lg:block lg:col-span-8">
              <LtvLineChart />
            </div>
          </div>
        </div>
      </section>

      {/* Cohort heatmap, desktop only */}
      <section className="hidden lg:block bg-paper py-14 md:py-20 border-b border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-4 lg:order-2">
              <p className="font-sans text-ink/55 text-[13px] mb-2">
                What we analyze
              </p>
              <h2
                className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-3"
                style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
              >
                Every cohort. Every month.
              </h2>
              <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
                Retention curves quietly tell you which customers are worth acquiring twice, and which campaigns to stop paying for. Hover any cell to see what it really means.
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
      <CtaSection />
    </>
  );
}
