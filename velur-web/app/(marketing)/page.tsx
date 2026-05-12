import HeroSection        from "@/components/marketing/HeroSection";
import BenchmarkGrid      from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection from "@/components/marketing/ThreeThingsSection";
import ReceiptsSection    from "@/components/marketing/ReceiptsSection";
import CtaSection         from "@/components/marketing/CtaSection";
import CohortHeatmap      from "@/components/illustrations/CohortHeatmap";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Cohort retention heatmap — what we actually analyze */}
      <section className="bg-cream py-16 border-y border-line overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
                What we analyze
              </p>
              <h2
                className="font-sans font-bold text-ink leading-tight tracking-[-0.03em] mb-4"
                style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
              >
                We track every cohort, every month.
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Retention curves tell you which customers are worth acquiring twice — and which campaigns to cut.
              </p>
            </div>
            <div className="lg:col-span-8 pointer-events-none select-none" aria-hidden>
              <CohortHeatmap />
            </div>
          </div>
        </div>
      </section>

      <BenchmarkGrid />
      <ThreeThingsSection />
      <ReceiptsSection />
      <CtaSection />
    </>
  );
}
