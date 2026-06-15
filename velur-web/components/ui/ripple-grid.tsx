"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Velur, RippleGrid
 * A quiet grid of hairline cells. Click (or tap) any cell and a pulse
 * ripples outward through its neighbours by Manhattan distance, a
 * small visual of one signal propagating through the whole layer.
 *
 * Adapted from the 21st.dev ripple-grid pattern with two changes:
 *  - GSAP timeline instead of styled-jsx keyframes + setTimeout
 *    chains (repo standard; also lets reduced-motion opt out cleanly).
 *  - A gentle automatic ripple fires from a random cell every few
 *    seconds so the surface reads as alive without interaction.
 */
export function RippleGrid({
  rows = 7,
  cols = 7,
  cellSize = 34,
  pulseColor = "#E9F6EE",
  pulseBorderColor = "#4FB78D",
  pulseScale = 1.06,
  rippleDelay = 0.055,
  autoEvery = 6,
  className = "",
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  /** Cell fill at the pulse peak. */
  pulseColor?: string;
  /** Cell border at the pulse peak. */
  pulseBorderColor?: string;
  pulseScale?: number;
  /** Seconds of extra delay per cell of Manhattan distance. */
  rippleDelay?: number;
  /** Fire an ambient ripple from a random cell every N seconds (0 = off). */
  autoEvery?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (autoEvery <= 0) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tick = gsap.delayedCall(autoEvery, function ambient() {
          rippleFrom(
            Math.floor(Math.random() * rows),
            Math.floor(Math.random() * cols),
          );
          tick.restart(true);
        });
        return () => tick.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const rippleFrom = (row: number, col: number) => {
    if (!root.current) return;
    const cells = root.current.querySelectorAll<HTMLElement>("[data-cell]");
    cells.forEach((cell) => {
      const r = Number(cell.dataset.row);
      const c = Number(cell.dataset.col);
      const distance = Math.abs(r - row) + Math.abs(c - col);
      gsap
        .timeline({ delay: distance * rippleDelay, overwrite: "auto" })
        .to(cell, {
          backgroundColor: pulseColor,
          borderColor: pulseBorderColor,
          scale: pulseScale,
          duration: 0.18,
          ease: "power2.out",
        })
        .to(cell, {
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "var(--color-line-soft)",
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });
    });
  };

  const onClick = contextSafe((e: React.MouseEvent) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-cell]");
    if (cell) rippleFrom(Number(cell.dataset.row), Number(cell.dataset.col));
  });

  return (
    <div
      ref={root}
      onClick={onClick}
      className={`grid w-fit cursor-pointer ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
      role="presentation"
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <div
            key={`${row}-${col}`}
            data-cell
            data-row={row}
            data-col={col}
            className="border border-line-soft box-border"
            style={{ backgroundColor: "rgba(255,255,255,0)" }}
          />
        );
      })}
    </div>
  );
}
