"use client";

// Data pipeline flow diagram: Sources → Warehouse → dbt Models → Dashboards
// Shown in the Services "stack" section

const SOURCES = ["Shopify", "Klaviyo", "Meta Ads", "Google Ads"];

// Layout constants
const SX = 8;    // source column x
const SW = 112;  // source box width
const SH = 35;   // source box height
const SG = 12;   // source gap
const SY = [10, 57, 104, 151] as const; // source top-y positions

const BUS_X = SW + SX + 30; // vertical bus x
const CONV_Y = (SY[0] + SH / 2 + SY[3] + SH / 2) / 2; // center y ≈ 98

const WH_X = BUS_X + 28;  // warehouse left edge
const WH_W = 150;
const WH_H = SY[3] + SH - SY[0]; // same height as sources span = 176

const ARR_GAP = 28; // gap between stages for arrow

const M_X = WH_X + WH_W + ARR_GAP;
const M_W = 136;
const M_H = 100;
const M_Y = SY[0] + (WH_H - M_H) / 2; // vertically centered on warehouse

const D_X = M_X + M_W + ARR_GAP;
const D_W = 136;
const D_H = M_H;
const D_Y = M_Y;

const VB_W = D_X + D_W + 12;
const VB_H = SY[3] + SH + 18;

function Arrow({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: string }) {
  const headSize = 5;
  return (
    <g style={{ animation: `fadeSlideUp 0.3s ease ${delay} both` }}>
      <line x1={x1} y1={y1} x2={x2 - headSize} y2={y2} stroke="#D9D6CF" strokeWidth="1" />
      <polygon
        points={`${x2 - headSize - 2},${y2 - 3} ${x2},${y2} ${x2 - headSize - 2},${y2 + 3}`}
        fill="#D9D6CF"
      />
    </g>
  );
}

export default function DataPipelineFlow() {
  return (
    <div
      className="border border-line bg-paper rounded-2xl p-5 md:p-6 select-none overflow-hidden"
      style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
        Your Analytics Stack — Built Once, Owned Forever
      </p>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full overflow-visible" aria-hidden>

        {/* ── Source boxes ── */}
        {SOURCES.map((name, i) => (
          <g key={name} style={{ animation: `fadeSlideUp 0.3s ease ${0.2 + i * 0.06}s both` }}>
            <rect
              x={SX} y={SY[i]} width={SW} height={SH} rx={5}
              fill="none" stroke="#D9D6CF" strokeWidth="1"
            />
            <text
              x={SX + SW / 2} y={SY[i] + SH / 2 + 3.5}
              textAnchor="middle" fontSize="9" fill="#6E6E6E"
              fontFamily="var(--font-jetbrains)"
            >
              {name}
            </text>
          </g>
        ))}

        {/* ── Horizontal lines: sources → bus ── */}
        {SY.map((sy, i) => (
          <line
            key={i}
            x1={SX + SW} y1={sy + SH / 2}
            x2={BUS_X} y2={sy + SH / 2}
            stroke="#D9D6CF" strokeWidth="1"
            style={{ animation: `fadeSlideUp 0.3s ease ${0.44 + i * 0.04}s both` }}
          />
        ))}

        {/* ── Vertical bus line ── */}
        <line
          x1={BUS_X} y1={SY[0] + SH / 2}
          x2={BUS_X} y2={SY[3] + SH / 2}
          stroke="#D9D6CF" strokeWidth="1"
          style={{ animation: "fadeSlideUp 0.3s ease 0.6s both" }}
        />

        {/* ── Bus → Warehouse arrow ── */}
        <Arrow x1={BUS_X} y1={CONV_Y} x2={WH_X} y2={CONV_Y} delay="0.65s" />

        {/* ── Warehouse (amber accent — the core node) ── */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.55s both" }}>
          <rect
            x={WH_X} y={SY[0]} width={WH_W} height={WH_H} rx={8}
            fill="none" stroke="#FF5B1A" strokeWidth="1.5"
          />
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 24}
            textAnchor="middle" fontSize="7.5" letterSpacing="0.07em" fill="#FF5B1A"
            fontFamily="var(--font-jetbrains)"
          >
            WAREHOUSE
          </text>
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 50}
            textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1A1A"
            fontFamily="var(--font-jetbrains)"
          >
            BigQuery
          </text>
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 70}
            textAnchor="middle" fontSize="8.5" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Snowflake · DuckDB
          </text>
          <line
            x1={WH_X + 16} y1={SY[0] + 86}
            x2={WH_X + WH_W - 16} y2={SY[0] + 86}
            stroke="#D9D6CF" strokeWidth="0.6"
          />
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 106}
            textAnchor="middle" fontSize="8" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Raw ingestion
          </text>
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 124}
            textAnchor="middle" fontSize="8" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Fivetran · custom connectors
          </text>
          <text
            x={WH_X + WH_W / 2} y={SY[0] + 152}
            textAnchor="middle" fontSize="8" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            You own everything
          </text>
        </g>

        {/* ── Warehouse → Models arrow ── */}
        <Arrow x1={WH_X + WH_W} y1={CONV_Y} x2={M_X} y2={CONV_Y} delay="0.85s" />

        {/* ── Models node ── */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.8s both" }}>
          <rect
            x={M_X} y={M_Y} width={M_W} height={M_H} rx={8}
            fill="none" stroke="#D9D6CF" strokeWidth="1"
          />
          <text
            x={M_X + M_W / 2} y={M_Y + 22}
            textAnchor="middle" fontSize="7.5" letterSpacing="0.07em" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            TRANSFORM
          </text>
          <text
            x={M_X + M_W / 2} y={M_Y + 46}
            textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1A1A"
            fontFamily="var(--font-jetbrains)"
          >
            dbt Models
          </text>
          <text
            x={M_X + M_W / 2} y={M_Y + 64}
            textAnchor="middle" fontSize="8.5" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            SQL · Python
          </text>
          <text
            x={M_X + M_W / 2} y={M_Y + 82}
            textAnchor="middle" fontSize="8" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Cleaned · modeled · versioned
          </text>
        </g>

        {/* ── Models → Dashboard arrow ── */}
        <Arrow x1={M_X + M_W} y1={CONV_Y} x2={D_X} y2={CONV_Y} delay="1.0s" />

        {/* ── Dashboard node ── */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.95s both" }}>
          <rect
            x={D_X} y={D_Y} width={D_W} height={D_H} rx={8}
            fill="none" stroke="#D9D6CF" strokeWidth="1"
          />
          <text
            x={D_X + D_W / 2} y={D_Y + 22}
            textAnchor="middle" fontSize="7.5" letterSpacing="0.07em" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            INSIGHTS
          </text>
          <text
            x={D_X + D_W / 2} y={D_Y + 46}
            textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1A1A"
            fontFamily="var(--font-jetbrains)"
          >
            Dashboards
          </text>
          <text
            x={D_X + D_W / 2} y={D_Y + 64}
            textAnchor="middle" fontSize="8.5" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Looker · Metabase
          </text>
          <text
            x={D_X + D_W / 2} y={D_Y + 82}
            textAnchor="middle" fontSize="8" fill="#6E6E6E"
            fontFamily="var(--font-jetbrains)"
          >
            Live · yours · forever
          </text>
        </g>

      </svg>
    </div>
  );
}
