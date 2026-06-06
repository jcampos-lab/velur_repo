"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

/**
 * Velur — Button
 * Primary action is a near-black (or white-on-dark) pill. Secondary is a
 * quiet underlined text link. Outline is a transparent pill for filters/tags.
 *
 * Port of the official handoff bundle component (components/buttons/Button.jsx).
 */
type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";
type Tone = "auto" | "onLight" | "onDark";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & { href: string; onClick?: () => void; target?: string; rel?: string };

const sizeMap: Record<Size, string> = {
  sm: "text-[13px] px-4 py-2 gap-1.5",
  md: "text-sm px-6 py-3 gap-2",
  lg: "text-base px-[30px] py-[15px] gap-2",
};

function classesFor(variant: Variant, size: Size, tone: Tone, fullWidth: boolean) {
  const onDark = tone === "onDark";
  const base =
    `${fullWidth ? "flex w-full" : "inline-flex"} items-center justify-center font-medium leading-tight tracking-[0.005em] ` +
    `whitespace-nowrap border border-transparent transition-colors duration-150 ease-out cursor-pointer ` +
    `disabled:opacity-45 disabled:cursor-not-allowed ` +
    sizeMap[size];

  if (variant === "primary") {
    return (
      base +
      " rounded-[32px] " +
      (onDark
        ? "bg-canvas text-velur-ink hover:bg-[#eef0f1]"
        : "bg-velur-ink text-canvas hover:bg-ink-700")
    );
  }
  if (variant === "secondary") {
    return (
      `${fullWidth ? "flex w-full" : "inline-flex"} items-center justify-center font-medium leading-tight whitespace-nowrap ` +
      `transition-all duration-150 ease-out cursor-pointer ` +
      `${size === "sm" ? "text-[13px]" : size === "lg" ? "text-base" : "text-sm"} ` +
      `py-1 underline underline-offset-[0.22em] decoration-1 hover:decoration-2 ` +
      (onDark ? "text-on-dark" : "text-ink")
    );
  }
  // outline
  return (
    base +
    " rounded-[30px] " +
    (onDark
      ? "text-on-dark border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.08)]"
      : "text-ink-strong border-ink hover:bg-[rgba(16,19,22,0.04)]")
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton>(function Button(
  {
    variant = "primary",
    size = "md",
    tone = "auto",
    iconLeft,
    iconRight,
    fullWidth = false,
    children,
    className = "",
    ...rest
  },
  ref,
) {
  const cls = classesFor(variant, size, tone, fullWidth);
  return (
    <button ref={ref} className={`${cls} ${className}`} {...rest}>
      {iconLeft ? <span className="inline-flex">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="inline-flex">{iconRight}</span> : null}
    </button>
  );
});

export function ButtonLink({
  variant = "primary",
  size = "md",
  tone = "auto",
  iconLeft,
  iconRight,
  fullWidth = false,
  href,
  children,
  className = "",
  onClick,
  target,
  rel,
}: ButtonAsLink & { variant?: Variant; size?: Size; tone?: Tone; iconLeft?: ReactNode; iconRight?: ReactNode; fullWidth?: boolean; children?: ReactNode; className?: string }) {
  const cls = classesFor(variant, size, tone, fullWidth);
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a href={href} className={`${cls} ${className}`} onClick={onClick} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}>
        {iconLeft ? <span className="inline-flex">{iconLeft}</span> : null}
        <span>{children}</span>
        {iconRight ? <span className="inline-flex">{iconRight}</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={`${cls} ${className}`} onClick={onClick}>
      {iconLeft ? <span className="inline-flex">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="inline-flex">{iconRight}</span> : null}
    </Link>
  );
}
