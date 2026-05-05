export default function QuartetMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="quartet" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="5" fill="#1A1A1A" opacity="0.06" />
          <circle cx="30" cy="10" r="5" fill="#1A1A1A" opacity="0.06" />
          <circle cx="10" cy="30" r="5" fill="#1A1A1A" opacity="0.06" />
          <circle cx="30" cy="30" r="5" fill="#1A1A1A" opacity="0.06" />
          <rect x="18.5" y="18.5" width="3" height="3" rx="1" fill="#1A1A1A" opacity="0.06" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#quartet)" />
    </svg>
  );
}
