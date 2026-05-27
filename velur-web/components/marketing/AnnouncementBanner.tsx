"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("velur-banner-closed") === "1") setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div className="w-full bg-amber text-white relative">
      <Link
        href="/blog"
        className="block w-full text-center font-sans font-semibold text-sm md:text-[15px] py-3 px-12 hover:underline underline-offset-4"
      >
        Velur is in early access — onboarding three founder-led brands this quarter →
      </Link>
      <button
        aria-label="Dismiss announcement"
        onClick={() => {
          setOpen(false);
          try { sessionStorage.setItem("velur-banner-closed", "1"); } catch {}
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-white/90 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
