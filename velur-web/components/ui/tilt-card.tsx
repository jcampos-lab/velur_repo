"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Velur — TiltCard
 * Cursor-following 3D tilt + lift for marketing cards: the card leans
 * a few degrees toward the pointer, rises slightly, and a soft
 * specular sheen tracks the cursor. Children marked with
 * `data-tilt-media` get a touch of extra depth (translateZ).
 *
 * Restraint by design: ±4° max, quick-to-follow springs, and the
 * whole effect only runs on fine pointers with no reduced-motion
 * preference — touch devices and reduced motion get a static card.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 4,
  lift = 6,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
  /** Hover rise in px. */
  lift?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
          const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
          const sx = sheen.current
            ? gsap.quickTo(sheen.current, "xPercent", { duration: 0.5, ease: "power3.out" })
            : null;
          const sy = sheen.current
            ? gsap.quickTo(sheen.current, "yPercent", { duration: 0.5, ease: "power3.out" })
            : null;

          gsap.set(el, { transformPerspective: 900 });

          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;  // -0.5 … 0.5
            const py = (e.clientY - r.top) / r.height - 0.5;
            rx(-py * maxTilt * 2);
            ry(px * maxTilt * 2);
            sx?.(px * 100);
            sy?.(py * 100);
          };
          const enter = () => {
            y(-lift);
            if (sheen.current) gsap.to(sheen.current, { opacity: 1, duration: 0.35 });
          };
          const leave = () => {
            rx(0);
            ry(0);
            y(0);
            sx?.(0);
            sy?.(0);
            if (sheen.current) gsap.to(sheen.current, { opacity: 0, duration: 0.45 });
          };

          el.addEventListener("pointermove", move);
          el.addEventListener("pointerenter", enter);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerenter", enter);
            el.removeEventListener("pointerleave", leave);
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative will-change-transform ${className}`}>
      {children}
      {/* Specular sheen — a soft radial light that follows the cursor.
          Sized 2x and recentered via xPercent/yPercent in the handler. */}
      <div
        ref={sheen}
        aria-hidden
        className="pointer-events-none absolute left-[-50%] top-[-50%] w-full h-full rounded-[inherit] opacity-0"
        style={{
          background:
            "radial-gradient(420px circle at center, rgba(255,255,255,0.32), transparent 65%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
