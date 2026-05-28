"use client";

import { useTheme } from "@/components/ui/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-colors duration-200 shrink-0"
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="7.5" y1="1"   x2="7.5" y2="3"   stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="7.5" y1="12"  x2="7.5" y2="14"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="1"   y1="7.5" x2="3"   y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="12"  y1="7.5" x2="14"  y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="2.75" y1="2.75" x2="4.16" y2="4.16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="10.84" y1="10.84" x2="12.25" y2="12.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="12.25" y1="2.75" x2="10.84" y2="4.16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="4.16" y1="10.84" x2="2.75" y2="12.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M12.5 9A6 6 0 0 1 5.5 2a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}
