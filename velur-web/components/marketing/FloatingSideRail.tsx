"use client";

export default function FloatingSideRail() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* LinkedIn */}
      <a
        href="https://linkedin.com/company/velur"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-ink bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-200 group"
        aria-label="LinkedIn"
      >
        <span className="font-mono text-[10px] font-medium text-ink group-hover:text-paper transition-colors">in</span>
      </a>

      {/* X */}
      <a
        href="https://x.com/velur_io"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-ink bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-200 group"
        aria-label="X / Twitter"
      >
        <span className="font-mono text-[10px] font-medium text-ink group-hover:text-paper transition-colors">x</span>
      </a>

      {/* Email */}
      <a
        href="mailto:hello@velur.io"
        className="w-8 h-8 rounded-full border border-ink bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-200 group"
        aria-label="Email"
      >
        <span className="font-mono text-[10px] font-medium text-ink group-hover:text-paper transition-colors">@</span>
      </a>

      {/* Rotated label */}
      <span
        className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mt-2"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        VELUR.IO
      </span>
    </div>
  );
}
