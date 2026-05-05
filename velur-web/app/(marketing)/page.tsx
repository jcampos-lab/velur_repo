import HeroSection from "@/components/marketing/HeroSection";
import BenchmarkGrid from "@/components/marketing/BenchmarkGrid";
import ThreeThingsSection from "@/components/marketing/ThreeThingsSection";
import ReceiptsSection from "@/components/marketing/ReceiptsSection";
import CtaSection from "@/components/marketing/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenchmarkGrid />
      <ThreeThingsSection />
      <ReceiptsSection />
      <CtaSection />
    </>
  );
}
