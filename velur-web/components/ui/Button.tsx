"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary" | "amber" | "light";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3.5 text-base",
  lg: "px-8 py-4 text-base",
};

const variantClasses = {
  // text-paper flips: white in light, dark in dark — always readable on bg-ink which also flips
  primary:
    "bg-ink text-paper border border-ink hover:bg-amber hover:border-amber hover:text-white transition-colors duration-200",
  secondary:
    "bg-paper text-ink border border-ink hover:bg-ink hover:text-paper transition-colors duration-200",
  // amber stays amber; text-paper on ink hover is dark in dark mode = correct on light ink bg
  amber:
    "bg-amber text-white border border-amber hover:bg-ink hover:border-ink hover:text-paper transition-colors duration-200",
  // text-black → text-ink so it flips in dark mode
  light:
    "bg-cream text-ink border border-line hover:bg-amber hover:border-amber hover:text-white transition-colors duration-200",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-full font-sans font-medium leading-none whitespace-nowrap cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
