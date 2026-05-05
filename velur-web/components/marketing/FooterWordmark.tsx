"use client";

import { useEffect, useRef, useState } from "react";

export default function FooterWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;

      // Reset so we can read natural width
      text.style.fontSize = "200px";
      const naturalW = text.scrollWidth;
      const containerW = wrap.clientWidth;

      if (naturalW > 0) {
        const newSize = (200 * containerW) / naturalW;
        text.style.fontSize = `${newSize}px`;
      }
      setReady(true);
    };

    // Wait for fonts then measure
    document.fonts.ready.then(fit);

    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full overflow-hidden select-none pointer-events-none">
      <p
        ref={textRef}
        className="font-sans font-extrabold text-ink leading-none whitespace-nowrap"
        style={{
          fontSize: "200px",
          letterSpacing: "-0.04em",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.2s ease",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 90%)",
          maskImage:       "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 90%)",
        }}
        aria-hidden
      >
        velur
      </p>
    </div>
  );
}
