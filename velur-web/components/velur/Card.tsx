"use client";

import { HTMLAttributes, ReactNode, useState } from "react";

/**
 * Velur, Card
 * Surface container. White bordered by default; warm stone, or dark
 * green/navy/ink product fields. Flat, depth via border or soft media lift.
 */
type Surface = "default" | "warm" | "green" | "navy" | "ink";
type Radius = "sm" | "md" | "lg";
type Elevation = "flat" | "bordered" | "media";

const surfaceMap: Record<Surface, string> = {
  default: "bg-canvas text-ink border-border-light",
  warm: "bg-stone text-ink border-transparent",
  green: "bg-signal-green text-on-dark border-transparent",
  navy: "bg-midnight text-on-dark border-transparent",
  ink: "bg-velur-ink text-on-dark border-transparent",
};

const radiusMap: Record<Radius, string> = {
  sm: "rounded-[8px]",
  md: "rounded-[16px]",
  lg: "rounded-[22px]",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  surface?: Surface;
  radius?: Radius;
  padding?: number | string;
  interactive?: boolean;
  elevation?: Elevation;
}

export function Card({
  children,
  surface = "default",
  radius = "md",
  padding = 24,
  interactive = false,
  elevation = "bordered",
  className = "",
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const isDark = surface === "green" || surface === "navy" || surface === "ink";

  const elevationStyle =
    elevation === "media"
      ? { boxShadow: "var(--elevation-media)" }
      : elevation === "flat"
      ? { boxShadow: "none" }
      : {};

  const hoverStyle =
    interactive && hover
      ? {
          boxShadow: isDark ? "var(--elevation-dark-panel)" : "var(--elevation-media)",
          transform: "translateY(-1px)",
        }
      : {};

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      className={`border ${radiusMap[radius]} ${surfaceMap[surface]} transition-all duration-150 ease-out ${interactive ? "cursor-pointer" : ""} ${className}`}
      style={{
        padding: typeof padding === "number" ? `${padding}px` : padding,
        ...elevationStyle,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
