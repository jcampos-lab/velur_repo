"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LineChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Velur — OrbitalIntegrations
 * Tool logos orbit a central node on two concentric rings. Adapted
 * from the 21st.dev orbital-integrations pattern with four changes:
 *
 *  - 2× scale (max-w 44rem vs the reference's 22rem).
 *  - Continuous GSAP motion (the reference only animated on hover):
 *    outer ring rotates clockwise 60s/turn, inner counter-rotates
 *    45s/turn, each card counter-rotates so logos stay upright, and
 *    two gradient "comet" arcs sweep the rings. Center node pulses.
 *  - Velur tokens, no shadcn deps (no Button/Card/radix/cva/cn).
 *  - prefers-reduced-motion → fully static layout, no spin.
 *
 * Reusable: pass any items. `VelurStackOrbital` below is the preset
 * wired to Velur's eight live integrations + the Velur mark.
 */

type OrbitItem = {
  label: string;
  icon: ReactNode;
};

/* Position the i-th of n items on a circle's edge (percent coords). */
function placeOnRing(i: number, n: number, startDeg = -90) {
  const a = ((startDeg + (360 / n) * i) * Math.PI) / 180;
  return {
    left: `${50 + 50 * Math.cos(a)}%`,
    top: `${50 + 50 * Math.sin(a)}%`,
  };
}

export function OrbitalIntegrations({
  outer,
  inner,
  center,
  className = "",
}: {
  outer: OrbitItem[];
  inner: OrbitItem[];
  center: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Ring rotation + per-card counter-rotation keeps logos upright. */
        gsap.to(".orb-rotor-outer", { rotation: 360, duration: 60, ease: "none", repeat: -1 });
        gsap.to(".orb-rotor-outer .orb-card", { rotation: -360, duration: 60, ease: "none", repeat: -1 });
        gsap.to(".orb-rotor-inner", { rotation: -360, duration: 45, ease: "none", repeat: -1 });
        gsap.to(".orb-rotor-inner .orb-card", { rotation: 360, duration: 45, ease: "none", repeat: -1 });

        /* Gradient comet arcs sweeping each ring. */
        gsap.to(".orb-sweep-outer", { rotation: 360, duration: 9, ease: "none", repeat: -1 });
        gsap.to(".orb-sweep-inner", { rotation: -360, duration: 7, ease: "none", repeat: -1 });

        /* Center halo pulse. */
        gsap.to(".orb-halo", {
          scale: 1.18, opacity: 0.45, duration: 2.2,
          yoyo: true, repeat: -1, ease: "sine.inOut",
        });

        /* Entry: cards pop in staggered when scrolled into view. */
        gsap.from(".orb-card", {
          scale: 0, opacity: 0, duration: 0.6, stagger: 0.07, ease: "back.out(1.6)",
          scrollTrigger: { trigger: root.current, start: "top 82%" },
        });
        gsap.from(".orb-center", {
          scale: 0.7, opacity: 0, duration: 0.7, ease: "back.out(1.4)",
          scrollTrigger: { trigger: root.current, start: "top 82%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={`relative aspect-square w-full max-w-[min(88vw,44rem)] ${className}`}
      role="img"
      aria-label="Velur connects your tools into one intelligence layer"
    >
      {/* ── Outer ring: hairline + comet sweep + rotating cards ── */}
      <div className="absolute inset-0 rounded-full border border-hairline" />
      <div
        aria-hidden
        className="orb-sweep-outer absolute inset-0 rounded-full border-2 border-transparent"
        style={{ borderTopColor: "rgba(79, 183, 141, 0.55)" }}
      />
      <div className="orb-rotor-outer absolute inset-0">
        {outer.map((item, i) => (
          <div
            key={item.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={placeOnRing(i, outer.length)}
          >
            <div
              className="orb-card flex items-center justify-center rounded-full bg-canvas border border-line"
              title={item.label}
              style={{
                width: "clamp(52px, 9vw, 84px)",
                height: "clamp(52px, 9vw, 84px)",
                boxShadow: "var(--elevation-media)",
              }}
            >
              <span className="sr-only">{item.label}</span>
              <div className="flex items-center justify-center w-[52%] h-[52%] [&>*]:w-full [&>*]:h-full [&>*]:object-contain">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Inner ring (counter-rotating) ── */}
      <div className="absolute inset-[19%] rounded-full border border-hairline" />
      <div
        aria-hidden
        className="orb-sweep-inner absolute inset-[19%] rounded-full border-2 border-transparent"
        style={{ borderTopColor: "rgba(31, 95, 224, 0.4)" }}
      />
      <div className="orb-rotor-inner absolute inset-[19%]">
        {inner.map((item, i) => (
          <div
            key={item.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={placeOnRing(i, inner.length, 90)}
          >
            <div
              className="orb-card flex items-center justify-center rounded-full bg-canvas border border-line"
              title={item.label}
              style={{
                width: "clamp(44px, 7.5vw, 72px)",
                height: "clamp(44px, 7.5vw, 72px)",
                boxShadow: "var(--elevation-media)",
              }}
            >
              <span className="sr-only">{item.label}</span>
              <div className="flex items-center justify-center w-[52%] h-[52%] [&>*]:w-full [&>*]:h-full [&>*]:object-contain">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Center: Velur node with pulsing halo ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden
          className="orb-halo absolute inset-0 -m-4 rounded-full bg-signal-green/20 blur-xl"
        />
        <div
          className="orb-center relative flex items-center justify-center rounded-full bg-canvas border border-line"
          style={{
            width: "clamp(84px, 14vw, 132px)",
            height: "clamp(84px, 14vw, 132px)",
            boxShadow: "var(--elevation-overlay)",
          }}
        >
          <div className="flex items-center justify-center w-[46%] h-[46%] [&>*]:w-full [&>*]:h-full [&>*]:object-contain">
            {center}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   VelurStackOrbital — preset wired to the eight live integrations.
   Outer ring: Shopify, Klaviyo, Meta, TikTok, Google. Inner ring:
   Stripe, Recharge, GA4 (Lucide chart — no official GA4 asset in
   the repo). Center: the Velur mark.
   ──────────────────────────────────────────────────────────────────── */

const brand = (file: string, label: string) => (
  <Image src={`/brands/${file}`} alt="" width={64} height={64} title={label} />
);

const OUTER: OrbitItem[] = [
  { label: "Shopify",    icon: brand("shopify.svg", "Shopify") },
  { label: "Klaviyo",    icon: brand("klaviyo.svg", "Klaviyo") },
  { label: "Meta Ads",   icon: brand("meta.svg", "Meta Ads") },
  { label: "TikTok Ads", icon: brand("tiktok.svg", "TikTok Ads") },
  { label: "Google Ads", icon: brand("google.svg", "Google Ads") },
];

const INNER: OrbitItem[] = [
  { label: "Stripe",   icon: brand("stripe.svg", "Stripe") },
  { label: "Recharge", icon: brand("recharge.svg", "Recharge") },
  { label: "GA4",      icon: <LineChart strokeWidth={1.6} className="text-signal-green" /> },
];

export function VelurStackOrbital({ className = "" }: { className?: string }) {
  return (
    <OrbitalIntegrations
      outer={OUTER}
      inner={INNER}
      center={<Image src="/logos/velur-mark-black.png" alt="Velur" width={96} height={96} />}
      className={className}
    />
  );
}
