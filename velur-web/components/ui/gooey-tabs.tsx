"use client";

import { ReactNode, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GooeyFilter } from "@/components/ui/gooey-filter";
import { useScreenSize } from "@/hooks/use-screen-size";

/**
 * Velur, GooeyTabs
 * Tabbed panel where the active tab visually FUSES into the content
 * panel through an SVG goo filter, the tab and the panel read as one
 * liquid surface, and the blob slides between tabs on change.
 *
 * Adapted from the 21st.dev gooey-tabs pattern with two changes:
 *  - Auto-height: the goo background is an absolute layer BEHIND
 *    in-flow content, so panels grow with their copy (the original
 *    used fixed heights, which clips translated text).
 *  - Velur tokens: stone surface on canvas, mono tab labels, no
 *    extra deps (no shadcn Button / radix / cva, framer-motion only).
 *
 * Reusable: pass any number of tabs with arbitrary ReactNode content.
 */
type GooeyTab = {
  /** Short label shown in the tab strip. */
  label: string;
  /** Panel content, any markup. */
  content: ReactNode;
};

export function GooeyTabs({
  tabs,
  className = "",
  /** Surface color class for tab blob + panel (one layer = one goo).
      Neutral gray by default, Velur's signature card surface. */
  surfaceClass = "bg-[#ECEDEF]",
  /** Tab strip height. */
  tabHeightClass = "h-10 md:h-12",
}: {
  tabs: GooeyTab[];
  className?: string;
  surfaceClass?: string;
  tabHeightClass?: string;
}) {
  const [active, setActive] = useState(0);
  const screenSize = useScreenSize();
  const rawId = useId();
  const filterId = `goo-${rawId.replace(/[:]/g, "")}`;

  return (
    /* Framed rail: visible rounded boundary + soft gray base so the
       component reads as a finished surface (the strip previously had
       no edges and looked unanchored). overflow-hidden also crops the
       goo blur cleanly at the corners. */
    <div
      className={`relative rounded-[22px] border border-line bg-[#F5F6F7] overflow-hidden ${className}`}
    >
      <GooeyFilter id={filterId} strength={screenSize.lessThan("md") ? 8 : 15} />

      {/* ── Goo layer: tab blob + panel background, fused by the filter.
            Absolutely positioned behind the in-flow content so the
            panel height follows the content. ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ filter: `url(#${filterId})` }}
      >
        <div className={`flex w-full ${tabHeightClass}`}>
          {tabs.map((_, i) => (
            <div key={i} className="relative flex-1 h-full">
              {active === i && (
                <motion.div
                  layoutId={`${filterId}-active-tab`}
                  className={`absolute inset-0 ${surfaceClass}`}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>
        {/* Panel background fills everything below the tab strip. */}
        <div className={`absolute inset-x-0 bottom-0 top-10 md:top-12 ${surfaceClass} rounded-b-[22px]`} />
      </div>

      {/* ── Interactive layer: crisp labels + content, unfiltered. ── */}
      <div className="relative">
        <div className={`flex w-full ${tabHeightClass}`} role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="group flex-1 h-full p-1.5"
            >
              {/* Gray-glassy pill on hover + press; the goo blob still
                  marks the active tab underneath. */}
              <span
                className={`w-full h-full flex items-center justify-center rounded-full font-display uppercase tracking-[0.06em] text-[10px] sm:text-[11px] md:text-[12px] transition-all duration-200 backdrop-blur-sm ${
                  active === i
                    ? "text-ink-strong"
                    : "text-slate group-hover:text-ink group-hover:bg-ink/[0.06] group-active:bg-ink/[0.1] group-active:scale-[0.97]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-7 md:p-10"
            >
              {tabs[active].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
