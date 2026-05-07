import HeroSection from "@/components/marketing/HeroSection";
import BenchmarkGrid from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection from "@/components/marketing/ThreeThingsSection";
import ReceiptsSection from "@/components/marketing/ReceiptsSection";
import CtaSection from "@/components/marketing/CtaSection";
import DataFlowConvergence from "@/components/illustrations/DataFlowConvergence";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Data flow illustration — shows how sources converge into signal */}
      <section className="bg-paper pt-8 pb-4 flex justify-center overflow-hidden">
        <div className="w-full max-w-[680px] px-6 md:px-0">
          <DataFlowConvergence />
        </div>
      </section>

      <BenchmarkGrid />
      <ThreeThingsSection />
      <ReceiptsSection />
      <CtaSection />
    </>
  );
}
