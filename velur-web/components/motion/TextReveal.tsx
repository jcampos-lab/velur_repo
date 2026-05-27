"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Stagger between word-groups, in seconds. */
  stagger?: number;
};

/**
 * Splits text into lines (via <br> in children) and applies a clip-path +
 * blur reveal per line. For multi-word stagger use TextRevealWords below.
 */
export default function TextReveal({
  children,
  as = "h2",
  className = "",
  style,
  delay = 0,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.h2;

  if (prefersReduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}

type WordsProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  delay?: number;
  /** Tailwind class applied to each word span — useful for color overrides. */
  wordClassName?: string;
};

/**
 * Splits a string into words and animates each one — clip + blur reveal,
 * staggered. Use for hero headlines where a per-word reveal feels alive
 * instead of one blocky fade.
 */
export function TextRevealWords({
  text,
  className = "",
  style,
  stagger = 0.06,
  delay = 0,
  wordClassName = "",
}: WordsProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={`${className} inline-block`} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
