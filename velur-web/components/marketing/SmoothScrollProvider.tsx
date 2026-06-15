"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Velur — SmoothScrollProvider
 * Lenis smooth scroll, properly wired to GSAP ScrollTrigger.
 *
 * Why the wiring matters: every scroll-driven animation on the site
 * (the deck scale, the signal journey, parallax, progress rails) is a
 * ScrollTrigger. If Lenis isn't told to update ScrollTrigger on its
 * smoothed frames, and ScrollTrigger isn't refreshed after the page
 * height changes (fonts/images loading, gooey panels expanding), the
 * trigger positions go stale and the page can "stick" until reload.
 *
 * Fixes:
 *  - lenis.on('scroll', ScrollTrigger.update) keeps them in sync.
 *  - Lenis is driven by gsap.ticker (one rAF loop, no double-driving).
 *  - ScrollTrigger.refresh() on load + on any body height change.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let lenis: import("lenis").default | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let ro: ResizeObserver | null = null;
    let refreshTimer: number | undefined;

    const onLoad = () => ScrollTrigger.refresh();

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Recompute trigger positions after the layout settles, and again
      // whenever the document height changes (panels, modals, lazy art).
      ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const debouncedRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      };
      ro = new ResizeObserver(debouncedRefresh);
      ro.observe(document.body);
      window.setTimeout(() => ScrollTrigger.refresh(), 600);
    };

    init();

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(refreshTimer);
      ro?.disconnect();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      gsap.ticker.lagSmoothing(1000, 16);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
