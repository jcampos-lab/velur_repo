import { ReactNode } from "react";

/**
 * Velur, StatCard
 * Composed metric block: mono label, large display value, optional delta + caption.
 * Used across the revenue console and marketing proof sections.
 *
 * Port of components/data-display/StatCard.jsx.
 */
type Surface = "default" | "warm" | "green" | "navy" | "ink";

const surfaceMap: Record<Surface, string> = {
  default: "bg-canvas border-border-light text-ink",
  warm: "bg-stone border-transparent text-ink",
  green: "bg-signal-green border-transparent text-on-dark",
  navy: "bg-midnight border-transparent text-on-dark",
  ink: "bg-velur-ink border-transparent text-on-dark",
};

export function StatCard({
  label,
  value,
  delta,
  caption,
  surface = "default",
  className = "",
}: {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  caption?: string;
  surface?: Surface;
  className?: string;
}) {
  const isDark = surface === "green" || surface === "navy" || surface === "ink";
  const labelColor = isDark ? "text-on-dark-muted" : "text-slate";
  const captionColor = isDark ? "text-on-dark-muted" : "text-slate";
  const valueColor = isDark ? "text-on-dark" : "text-ink-strong";

  return (
    <div
      className={`border rounded-[16px] px-6 py-[22px] flex flex-col gap-2.5 ${surfaceMap[surface]} ${className}`}
    >
      <span className={`font-display text-[12px] uppercase tracking-[0.06em] ${labelColor}`}>
        {label}
      </span>
      <span
        className={`font-display text-[40px] leading-none tracking-[-0.02em] ${valueColor}`}
      >
        {value}
      </span>
      {(delta || caption) && (
        <div className="flex items-center gap-2.5">
          {delta}
          {caption ? (
            <span className={`text-[13px] ${captionColor}`}>{caption}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
