"use client";

// Data pipeline flow: Sources → Warehouse → dbt Models → Dashboards
// All SVG colors use CSS custom properties for automatic dark mode adaptation

const SOURCES = ["Shopify", "Klaviyo", "Meta Ads", "Google Ads"];

const SX = 8;
const SW = 112;
const SH = 35;
const SY = [10, 57, 104, 151] as const;

const BUS_X = SX + SW + 30;
const CONV_Y = (SY[0] + SH / 2 + SY[3] + SH / 2) / 2; // ≈ 98

const WH_X = BUS_X + 28;
const WH_W = 150;
const WH_H = SY[3] + SH - SY[0]; // = 176

const ARR = 28; // arrow gap between stages

const MX = WH_X + WH_W + ARR;
const MW = 136;
const MH = 100;
const MY = SY[0] + (WH_H - MH) / 2;

const DX = MX + MW + ARR;
const DW = 136;
const DH = MH;
const DY = MY;

const VBW = DX + DW + 12;
const VBH = SY[3] + SH + 18;

function Arr({ x1, y, x2, delay }: { x1: number; y: number; x2: number; delay: string }) {
  return (
    <g style={{ animation: `fadeSlideUp 0.3s ease ${delay} both` }}>
      <line x1={x1} y1={y} x2={x2 - 6} y2={y} strokeWidth="1" style={{ stroke: "var(--color-line)" }} />
      <polygon
        points={`${x2 - 8},${y - 3.5} ${x2},${y} ${x2 - 8},${y + 3.5}`}
        style={{ fill: "var(--color-line)" }}
      />
    </g>
  );
}

export default function DataPipelineFlow() {
  return (
    <div
      className="border border-line bg-stone rounded-2xl p-5 md:p-6 select-none overflow-hidden"
      style={{ animation: "fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
        Your Analytics Stack — Built Once, Owned Forever
      </p>

      <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full overflow-visible" aria-hidden>

        {/* Source boxes */}
        {SOURCES.map((name, i) => (
          <g key={name} style={{ animation: `fadeSlideUp 0.3s ease ${0.2 + i * 0.06}s both` }}>
            <rect
              x={SX} y={SY[i]} width={SW} height={SH} rx={5}
              fill="none" strokeWidth="1"
              style={{ stroke: "var(--color-line)" }}
            />
            <text
              x={SX + SW / 2} y={SY[i] + SH / 2 + 3.5}
              textAnchor="middle" fontSize="9"
              fontFamily="var(--font-jetbrains)"
              style={{ fill: "var(--color-muted)" }}
            >
              {name}
            </text>
          </g>
        ))}

        {/* Horizontal lines: sources → bus */}
        {SY.map((sy, i) => (
          <line
            key={i}
            x1={SX + SW} y1={sy + SH / 2} x2={BUS_X} y2={sy + SH / 2}
            strokeWidth="1"
            style={{ stroke: "var(--color-line)", animation: `fadeSlideUp 0.3s ease ${0.44 + i * 0.04}s both` }}
          />
        ))}

        {/* Vertical bus */}
        <line
          x1={BUS_X} y1={SY[0] + SH / 2} x2={BUS_X} y2={SY[3] + SH / 2}
          strokeWidth="1"
          style={{ stroke: "var(--color-line)", animation: "fadeSlideUp 0.3s ease 0.6s both" }}
        />

        {/* Bus → Warehouse */}
        <Arr x1={BUS_X} y={CONV_Y} x2={WH_X} delay="0.65s" />

        {/* Warehouse (amber accent — the core node) */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.55s both" }}>
          <rect
            x={WH_X} y={SY[0]} width={WH_W} height={WH_H} rx={8}
            fill="none" stroke="#FF5B1A" strokeWidth="1.5"
          />
          <text x={WH_X + WH_W / 2} y={SY[0] + 24} textAnchor="middle" fontSize="7.5"
            letterSpacing="0.07em" fill="#FF5B1A" fontFamily="var(--font-jetbrains)">
            WAREHOUSE
          </text>
          <text x={WH_X + WH_W / 2} y={SY[0] + 50} textAnchor="middle" fontSize="12"
            fontWeight="700" fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-ink)" }}>
            BigQuery
          </text>
          <text x={WH_X + WH_W / 2} y={SY[0] + 70} textAnchor="middle" fontSize="8.5"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Snowflake · DuckDB
          </text>
          <line x1={WH_X + 16} y1={SY[0] + 86} x2={WH_X + WH_W - 16} y2={SY[0] + 86}
            strokeWidth="0.6" style={{ stroke: "var(--color-line)" }} />
          <text x={WH_X + WH_W / 2} y={SY[0] + 106} textAnchor="middle" fontSize="8"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Raw ingestion
          </text>
          <text x={WH_X + WH_W / 2} y={SY[0] + 124} textAnchor="middle" fontSize="8"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Fivetran · custom connectors
          </text>
          <text x={WH_X + WH_W / 2} y={SY[0] + 152} textAnchor="middle" fontSize="8"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            You own everything
          </text>
        </g>

        {/* Warehouse → Models */}
        <Arr x1={WH_X + WH_W} y={CONV_Y} x2={MX} delay="0.85s" />

        {/* Models node */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.8s both" }}>
          <rect x={MX} y={MY} width={MW} height={MH} rx={8}
            fill="none" strokeWidth="1" style={{ stroke: "var(--color-line)" }} />
          <text x={MX + MW / 2} y={MY + 22} textAnchor="middle" fontSize="7.5"
            letterSpacing="0.07em" fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-muted)" }}>
            TRANSFORM
          </text>
          <text x={MX + MW / 2} y={MY + 46} textAnchor="middle" fontSize="12"
            fontWeight="700" fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-ink)" }}>
            dbt Models
          </text>
          <text x={MX + MW / 2} y={MY + 64} textAnchor="middle" fontSize="8.5"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            SQL · Python
          </text>
          <text x={MX + MW / 2} y={MY + 82} textAnchor="middle" fontSize="8"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Cleaned · modeled · versioned
          </text>
        </g>

        {/* Models → Dashboard */}
        <Arr x1={MX + MW} y={CONV_Y} x2={DX} delay="1.0s" />

        {/* Dashboard node */}
        <g style={{ animation: "fadeSlideUp 0.4s ease 0.95s both" }}>
          <rect x={DX} y={DY} width={DW} height={DH} rx={8}
            fill="none" strokeWidth="1" style={{ stroke: "var(--color-line)" }} />
          <text x={DX + DW / 2} y={DY + 22} textAnchor="middle" fontSize="7.5"
            letterSpacing="0.07em" fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-muted)" }}>
            INSIGHTS
          </text>
          <text x={DX + DW / 2} y={DY + 46} textAnchor="middle" fontSize="12"
            fontWeight="700" fontFamily="var(--font-jetbrains)"
            style={{ fill: "var(--color-ink)" }}>
            Dashboards
          </text>
          <text x={DX + DW / 2} y={DY + 64} textAnchor="middle" fontSize="8.5"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Looker · Metabase
          </text>
          <text x={DX + DW / 2} y={DY + 82} textAnchor="middle" fontSize="8"
            fontFamily="var(--font-jetbrains)" style={{ fill: "var(--color-muted)" }}>
            Live · yours · forever
          </text>
        </g>

      </svg>
    </div>
  );
}
