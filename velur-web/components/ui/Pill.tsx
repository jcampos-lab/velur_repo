type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink bg-cream font-mono text-xs tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
