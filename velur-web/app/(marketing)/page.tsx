import HeroSection        from "@/components/marketing/HeroSection";
import BenchmarkGrid      from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection from "@/components/marketing/ThreeThingsSection";
import ReceiptsSection    from "@/components/marketing/ReceiptsSection";
import CtaSection         from "@/components/marketing/CtaSection";
import PlatformMap        from "@/components/illustrations/PlatformMap";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Unified platform diagram — all sources → Velur → revenue signal */}
      <section className="bg-paper py-12 overflow-hidden">
        <div
          className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pointer-events-none select-none"
          aria-hidden
        >
          <PlatformMap />
        </div>
      </section>

      <BenchmarkGrid />
      <ThreeThingsSection />
      <ReceiptsSection />
      <CtaSection />
    </>
  );
}
