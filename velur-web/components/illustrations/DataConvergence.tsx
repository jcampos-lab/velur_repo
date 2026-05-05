export default function DataConvergence({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="180" y2="40" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="0" y1="40" x2="180" y2="40" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="0" y1="70" x2="180" y2="40" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="188" cy="40" r="8" fill="#1A1A1A" />
    </svg>
  );
}
