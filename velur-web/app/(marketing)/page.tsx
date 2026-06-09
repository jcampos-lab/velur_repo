import HeroSection      from "@/components/marketing/HeroSection";
import CapabilityGrid   from "@/components/marketing/CapabilityGrid";
import DarkProofBand    from "@/components/marketing/DarkProofBand";
import CtaSection       from "@/components/marketing/CtaSection";

/**
 * Velur — Homepage
 * Rebuilt against the official Velur Design System handoff bundle (2026-06-06).
 *
 * Rhythm follows ui_kits/marketing/Home.jsx:
 *   1. Hero (white canvas, copy left / ConsoleMock right)
 *   2. Capability grid (three columns joined by hairlines)
 *   3. Dark Signal-Green proof band (4 StatCards in navy)
 *   4. Midnight CTA close
 *
 * Note: AI Studio is intentionally NOT on the homepage. It lives in
 * the footer only (Platform column) and at /studio for visitors who
 * navigate there.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityGrid />
      <DarkProofBand />
      <CtaSection />
    </>
  );
}
