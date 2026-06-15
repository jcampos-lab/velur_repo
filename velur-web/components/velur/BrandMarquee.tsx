"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LineChart } from "lucide-react";

gsap.registerPlugin(useGSAP);

/**
 * Velur, BrandMarquee
 * Slow infinite strip of the eight live integrations as quiet chips.
 * GSAP xPercent loop (two copies, -50% per cycle); pauses on hover,
 * static row under prefers-reduced-motion. Soft edge fades keep it
 * from hard-cropping at the section gutters.
 */
const BRANDS: { label: string; file?: string }[] = [
  { label: "Shopify", file: "shopify.svg" },
  { label: "Klaviyo", file: "klaviyo.svg" },
  { label: "Meta Ads", file: "meta.svg" },
  { label: "TikTok Ads", file: "tiktok.svg" },
  { label: "Google Ads", file: "google.svg" },
  { label: "Stripe", file: "stripe.svg" },
  { label: "Recharge", file: "recharge.svg" },
  { label: "GA4" }, // no official asset in repo, Lucide glyph
];

function ChipRow() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {BRANDS.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-2.5 bg-paper border border-line rounded-[30px] px-5 py-2.5 font-sans text-[14px] text-ink whitespace-nowrap"
        >
          {b.file ? (
            <Image src={`/brands/${b.file}`} alt="" width={18} height={18} className="shrink-0" />
          ) : (
            <LineChart size={16} strokeWidth={1.7} className="text-signal-green shrink-0" />
          )}
          {b.label}
        </span>
      ))}
    </div>
  );
}

export function BrandMarquee({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(".bm-track", {
          xPercent: -50,
          duration: 36,
          ease: "none",
          repeat: -1,
        });
        const el = root.current;
        const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
        const play = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        el?.addEventListener("pointerenter", pause);
        el?.addEventListener("pointerleave", play);
        return () => {
          el?.removeEventListener("pointerenter", pause);
          el?.removeEventListener("pointerleave", play);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div className="bm-track flex w-max">
        <ChipRow />
        <ChipRow />
      </div>
    </div>
  );
}
