"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A 2px progress bar pinned to the top of the viewport that fills as the
 * user scrolls the page. Hugely satisfying for free, classic 21st.dev tic.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-amber"
      style={{ scaleX }}
    />
  );
}
