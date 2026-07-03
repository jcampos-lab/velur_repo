"use client";

/**
 * Velur — Orbs
 * Anima-style atmospheric backdrop: three layered, heavily-blurred
 * gradient ellipses (signal green, warm butter, soft lavender) drifting
 * almost imperceptibly. They give sections air and depth without a
 * single hard edge. Pure CSS, reduced-motion static, pointer-inert.
 */
export function Orbs({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .vlr-orb-a { animation: vlr-orb-drift 28s ease-in-out infinite alternate; }
          .vlr-orb-b { animation: vlr-orb-drift 36s ease-in-out infinite alternate-reverse; }
          .vlr-orb-c { animation: vlr-orb-drift 44s ease-in-out infinite alternate; }
        }
        @keyframes vlr-orb-drift {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to   { transform: translate3d(5%, -4%, 0) scale(1.14); }
        }
      `}</style>
      <div
        className="vlr-orb-a absolute rounded-full"
        style={{
          width: "46vw", height: "46vw", left: "-12%", top: "-20%",
          background: "radial-gradient(circle, rgba(79,183,141,0.20) 0%, rgba(79,183,141,0) 66%)",
          filter: "blur(58px)",
        }}
      />
      <div
        className="vlr-orb-b absolute rounded-full"
        style={{
          width: "40vw", height: "40vw", right: "-10%", top: "6%",
          background: "radial-gradient(circle, rgba(243,224,170,0.42) 0%, rgba(243,224,170,0) 66%)",
          filter: "blur(64px)",
        }}
      />
      <div
        className="vlr-orb-c absolute rounded-full"
        style={{
          width: "36vw", height: "36vw", left: "28%", bottom: "-26%",
          background: "radial-gradient(circle, rgba(201,197,238,0.36) 0%, rgba(201,197,238,0) 66%)",
          filter: "blur(64px)",
        }}
      />
    </div>
  );
}
