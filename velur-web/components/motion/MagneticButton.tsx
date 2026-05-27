"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How much the inner element drifts toward the cursor, 0–1. */
  strength?: number;
};

/**
 * Button (or link) that subtly drifts toward the cursor while hovered.
 * Falls back to a plain element if the user prefers reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const prefersReduced = useReducedMotion();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const divRef  = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function track(rect: DOMRect, clientX: number, clientY: number) {
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        ref={linkRef}
        href={href}
        className={`inline-flex ${className}`}
        onMouseMove={e => {
          if (prefersReduced || !linkRef.current) return;
          track(linkRef.current.getBoundingClientRect(), e.clientX, e.clientY);
        }}
        onMouseLeave={reset}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      ref={divRef}
      className={`inline-flex ${className}`}
      onMouseMove={e => {
        if (prefersReduced || !divRef.current) return;
        track(divRef.current.getBoundingClientRect(), e.clientX, e.clientY);
      }}
      onMouseLeave={reset}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {inner}
    </div>
  );
}
