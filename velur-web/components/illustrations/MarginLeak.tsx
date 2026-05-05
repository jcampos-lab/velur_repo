export default function MarginLeak({ className = "" }: { className?: string }) {
  const heights = [80, 62, 48, 32, 18];
  const barWidth = 12;
  const gap = 20;
  const totalWidth = heights.length * barWidth + (heights.length - 1) * gap;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} 100`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * (barWidth + gap)}
          y={100 - h}
          width={barWidth}
          height={h}
          fill="#1A1A1A"
          opacity="0.15"
          rx="2"
        />
      ))}
    </svg>
  );
}
