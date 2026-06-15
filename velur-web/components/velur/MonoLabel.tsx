import { ReactNode } from "react";

/**
 * Velur, MonoLabel
 * Uppercase mono category / system marker. Reserved for short
 * taxonomy labels (e.g. "REVENUE INTELLIGENCE", "SECURITY",
 * "CHANGELOG"). Never set a full sentence in this style.
 */
export function MonoLabel({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "muted" | "green" | "coral" | "blue" | "onDark";
  className?: string;
}) {
  const colors: Record<string, string> = {
    default: "text-ink-strong",
    muted: "text-slate",
    green: "text-signal-green",
    coral: "text-coral",
    blue: "text-action-blue",
    onDark: "text-on-dark-muted",
  };
  return (
    <span
      className={`font-display text-[13px] uppercase tracking-[0.06em] ${colors[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
