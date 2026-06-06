import HeroSection      from "@/components/marketing/HeroSection";
import CapabilityGrid   from "@/components/marketing/CapabilityGrid";
import DarkProofBand    from "@/components/marketing/DarkProofBand";
import AiStudioCallout  from "@/components/marketing/AiStudioCallout";
import CtaSection       from "@/components/marketing/CtaSection";

/**
 * Velur — Homepage
 * Rebuilt against the official Velur Design System handoff bundle (2026-06-06).
 *
 * Rhythm follows ui_kits/marketing/Home.jsx:
 *   1. Hero (white canvas, copy left / ConsoleMock right)
 *   2. Trust strip (six brand names in mono)
 *   3. Capability grid (three columns joined by hairlines)
 *   4. Dark Signal-Green proof band (4 StatCards in navy)
 *   5. AI Studio secondary callout (warm stone Card)
 *   6. Midnight CTA close
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityGrid />
      <DarkProofBand />
      <AiStudioCallout />
      <CtaSection />
    </>
  );
}
