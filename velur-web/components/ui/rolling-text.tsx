"use client";

import { ReactNode } from "react";

/**
 * Velur, RollingText
 * Editorial link hover: the label rolls up and out while a duplicate
 * rolls in from below, like a split-flap line. Pure CSS (group-hover),
 * so it costs nothing and degrades to a plain label without hover.
 *
 * Usage: put `group` on the interactive parent (Link/button), wrap
 * the label:  <Link className="group ..."><RollingText text={label} /></Link>
 * Honors reduced motion via the global media query in globals.css
 * (transitions collapse to 0ms).
 */
export function RollingText({
  text,
  className = "",
}: {
  text: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex overflow-hidden align-baseline ${className}`}>
      <span className="block transition-transform duration-[360ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%]">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-[110%] transition-transform duration-[360ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {text}
      </span>
    </span>
  );
}
