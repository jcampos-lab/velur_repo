"use client";

/**
 * Velur — IntegrationFlow
 * Custom SVG illustration for the homepage integrations section:
 * six tool nodes stream animated signal pulses along curved paths into
 * a central Velur hub, which emits one clean line to the daily brief.
 * The diagram IS the pitch: many sources → one reconciled read.
 *
 * Pure SVG + CSS keyframes (no GSAP needed): each path carries a low
 * opacity base stroke plus a bright dashed overlay whose dashoffset
 * animates, reading as pulses of data travelling the wire. Reduced
 * motion disables the movement, the structure remains.
 */

const SOURCES = [
  { logo: "/integrations/shopify.svg",  label: "Shopify",    y: 60  },
  { logo: "/integrations/meta.svg",     label: "Meta Ads",   y: 140 },
  { logo: "/integrations/stripe.svg",   label: "Stripe",     y: 220 },
  { logo: "/integrations/recharge.svg", label: "Recharge",   y: 300 },
  { logo: "/integrations/google.svg",   label: "Google Ads", y: 380 },
  { logo: "/integrations/klaviyo.svg",  label: "Klaviyo",    y: 460 },
];

const HUB = { x: 620, y: 260 };
const SRC_X = 148;

function pathFor(y: number) {
  /* Gentle S-curve from source node to hub. */
  const midX = (SRC_X + HUB.x) / 2 + 40;
  return `M ${SRC_X + 34} ${y} C ${midX} ${y}, ${midX - 60} ${HUB.y}, ${HUB.x - 58} ${HUB.y}`;
}

export function IntegrationFlow({ briefLabel, briefTime }: { briefLabel: string; briefTime: string }) {
  return (
    <div className="relative w-full" aria-hidden>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .ifl-pulse {
            stroke-dasharray: 14 220;
            animation: ifl-flow 3.2s linear infinite;
          }
          .ifl-halo {
            transform-origin: ${HUB.x}px ${HUB.y}px;
            animation: ifl-halo 3.4s ease-in-out infinite;
          }
          .ifl-out {
            stroke-dasharray: 18 90;
            animation: ifl-flow 1.8s linear infinite;
          }
          .ifl-spark {
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            animation: ifl-spark 4s ease-out infinite;
          }
        }
        @keyframes ifl-flow { to { stroke-dashoffset: -234; } }
        @keyframes ifl-spark { 40% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
        @keyframes ifl-halo {
          0%, 100% { transform: scale(1); opacity: .45; }
          50% { transform: scale(1.18); opacity: .12; }
        }
      `}</style>

      <svg viewBox="0 0 1160 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* wires: base + travelling pulse */}
        {SOURCES.map((s, i) => (
          <g key={s.label}>
            <path d={pathFor(s.y)} stroke="rgba(79,183,141,0.22)" strokeWidth="1.5" />
            <path
              d={pathFor(s.y)}
              className="ifl-pulse"
              stroke="#4FB78D"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          </g>
        ))}

        {/* output wire hub → brief */}
        <path d={`M ${HUB.x + 58} ${HUB.y} H 872`} stroke="rgba(79,183,141,0.3)" strokeWidth="2" />
        <path d={`M ${HUB.x + 58} ${HUB.y} H 872`} className="ifl-out" stroke="#4FB78D" strokeWidth="3" strokeLinecap="round" />

        {/* source nodes */}
        {SOURCES.map((s) => (
          <g key={s.label}>
            <circle cx={SRC_X} cy={s.y} r="33" fill="#F5F6F7" stroke="rgba(255,255,255,0.14)" />
            <image href={s.logo} x={SRC_X - 17} y={s.y - 17} width="34" height="34" preserveAspectRatio="xMidYMid meet" />
            <text
              x={SRC_X - 48}
              y={s.y + 4}
              textAnchor="end"
              fill="rgba(244,241,232,0.72)"
              fontSize="14"
              fontFamily="'Px Grotesk', Inter, system-ui, sans-serif"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* hub: pulsing halo + velur mark */}
        <circle className="ifl-halo" cx={HUB.x} cy={HUB.y} r="72" fill="none" stroke="#4FB78D" strokeWidth="1.5" opacity="0.45" />
        <circle cx={HUB.x} cy={HUB.y} r="54" fill="#15191D" stroke="rgba(79,183,141,0.55)" strokeWidth="1.5" />
        <image href="/logos/velur-mark-white.png" x={HUB.x - 24} y={HUB.y - 24} width="48" height="48" />

        {/* the daily brief card */}
        <g>
          <rect x="872" y="164" width="252" height="192" rx="18" fill="#15191D" stroke="rgba(255,255,255,0.1)" />
          <text x="896" y="200" fill="#4FB78D" fontSize="12" letterSpacing="1.4" fontFamily="'Px Grotesk', Inter, system-ui, sans-serif">
            {briefLabel.toUpperCase()} · {briefTime}
          </text>
          {/* abstract text lines */}
          <rect x="896" y="218" width="196" height="9" rx="4.5" fill="rgba(244,241,232,0.34)" />
          <rect x="896" y="238" width="160" height="9" rx="4.5" fill="rgba(244,241,232,0.2)" />
          <rect x="896" y="258" width="178" height="9" rx="4.5" fill="rgba(244,241,232,0.2)" />
          {/* sparkline */}
          <polyline
            className="ifl-spark"
            points="896,326 928,318 954,322 984,304 1014,310 1044,292 1074,296 1100,282"
            stroke="#4FB78D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="1100" cy="282" r="4" fill="#4FB78D" />
        </g>
      </svg>
    </div>
  );
}
