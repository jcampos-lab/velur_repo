import { ReactNode } from "react";

/**
 * Velur — Badge
 * Small status / taxonomy label. Soft-wash by default. Use `coral` variant
 * for editorial taxonomy chips (blog category, etc.) per system rules.
 */
type Tone = "neutral" | "success" | "warning" | "error" | "info" | "green" | "coral";
type Variant = "soft" | "solid" | "outline";

interface ToneStyle { fg: string; soft: string; solid: string; }

const toneMap: Record<Tone, ToneStyle> = {
  neutral: { fg: "text-slate", soft: "bg-stone", solid: "bg-velur-ink" },
  success: { fg: "text-success", soft: "bg-success-wash", solid: "bg-success" },
  warning: { fg: "text-warning", soft: "bg-warning-wash", solid: "bg-warning" },
  error:   { fg: "text-error",   soft: "bg-error-wash",   solid: "bg-error" },
  info:    { fg: "text-action-blue", soft: "bg-wash-blue", solid: "bg-action-blue" },
  green:   { fg: "text-signal-green", soft: "bg-wash-green", solid: "bg-signal-green" },
  coral:   { fg: "text-coral", soft: "bg-coral-wash", solid: "bg-coral" },
};

const outlineBorder: Record<Tone, string> = {
  neutral: "border-slate",
  success: "border-success",
  warning: "border-warning",
  error: "border-error",
  info: "border-action-blue",
  green: "border-signal-green",
  coral: "border-coral-soft",
};

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  dot = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  dot?: boolean;
  className?: string;
}) {
  const t = toneMap[tone];
  let cls = "";
  if (variant === "solid") cls = `${t.solid} text-white border-transparent`;
  else if (variant === "outline") cls = `bg-transparent ${t.fg} ${outlineBorder[tone]}`;
  else cls = `${t.soft} ${t.fg} border-transparent`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans text-[12.5px] leading-none px-2.5 py-[5px] rounded-full whitespace-nowrap border ${cls} ${className}`}
    >
      {dot ? <span className={`w-1.5 h-1.5 rounded-full ${variant === "solid" ? "bg-white" : t.solid}`} /> : null}
      {children}
    </span>
  );
}
