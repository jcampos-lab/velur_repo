/**
 * Velur, MetricDelta
 * Signed percentage / value with directional color (green up / red down).
 * The core revenue-intelligence affordance.
 *
 * Port of components/data-display/MetricDelta.jsx.
 */
type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "text-[13px]",
  md: "text-[15px]",
  lg: "text-[20px]",
};

export function MetricDelta({
  value,
  suffix = "%",
  format,
  showArrow = true,
  size = "md",
  className = "",
}: {
  value: number;
  suffix?: string;
  format?: (n: number) => string;
  showArrow?: boolean;
  size?: Size;
  className?: string;
}) {
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const colorClass =
    dir === "up"
      ? "text-revenue-up"
      : dir === "down"
      ? "text-revenue-down"
      : "text-revenue-flat";
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  const abs = Math.abs(value);
  const text = format ? format(value) : `${sign}${abs}${suffix}`;
  const arrow = dir === "flat" ? "→" : dir === "up" ? "↑" : "↓";

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono tracking-[0.01em] ${sizeMap[size]} ${colorClass} ${className}`}
    >
      {showArrow ? <span aria-hidden="true">{arrow}</span> : null}
      {text}
    </span>
  );
}
