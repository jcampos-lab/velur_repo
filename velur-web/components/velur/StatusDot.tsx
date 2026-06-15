/**
 * Velur, StatusDot
 * Small colored dot + label. The brand's status convention (never emoji).
 */
type Status = "healthy" | "at-risk" | "churned" | "pending" | "neutral";

const map: Record<Status, { color: string; text: string }> = {
  healthy: { color: "bg-success", text: "Healthy" },
  "at-risk": { color: "bg-warning", text: "At risk" },
  churned: { color: "bg-error", text: "Churned" },
  pending: { color: "bg-action-blue", text: "Pending" },
  neutral: { color: "bg-muted-slate", text: ", " },
};

export function StatusDot({
  status = "neutral",
  label,
  className = "",
}: {
  status?: Status;
  label?: string;
  className?: string;
}) {
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-2 text-sm text-ink ${className}`}>
      <span className={`w-2 h-2 rounded-full flex-none ${s.color}`} />
      {label || s.text}
    </span>
  );
}
