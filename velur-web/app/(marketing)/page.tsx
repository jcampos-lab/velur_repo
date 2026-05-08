import HeroSection       from "@/components/marketing/HeroSection";
import BenchmarkGrid     from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection from "@/components/marketing/ThreeThingsSection";
import ReceiptsSection   from "@/components/marketing/ReceiptsSection";
import CtaSection        from "@/components/marketing/CtaSection";
import VelurAnchor       from "@/components/illustrations/VelurAnchor";
import DataChaos         from "@/components/illustrations/DataChaos";
import VelurConvergence  from "@/components/illustrations/VelurConvergence";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Chapter 1: Velur exists. Alone. Alive. */}
      <section className="bg-paper pt-10 pb-4 flex justify-center overflow-visible">
        <div className="w-full max-w-[360px] px-6 md:px-0">
          <VelurAnchor />
        </div>
      </section>

      {/* Chapter 2: Without Velur — chaos. Sets up the pain section. */}
      <section className="bg-paper pt-4 pb-2 flex justify-center overflow-visible">
        <div className="w-full max-w-[720px] px-6 md:px-0">
          <DataChaos />
        </div>
      </section>

      <BenchmarkGrid />

      {/* Chapter 3: Velur arrives and pulls data together. */}
      <section className="bg-paper pt-8 pb-4 flex justify-center overflow-visible">
        <div className="w-full max-w-[680px] px-6 md:px-0">
          <VelurConvergence />
        </div>
      </section>

      <ThreeThingsSection />
      <ReceiptsSection />
      <CtaSection />
    </>
  );
}
