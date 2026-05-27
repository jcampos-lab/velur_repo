"use client";

type Persona = {
  name: string;
  attrs: string[];
  decision: { title: string; body: string; cta: string; tone: "amber" | "ink" | "stone" };
};

const PERSONAS: Persona[] = [
  {
    name: "Maya — Skincare founder",
    attrs: [
      "$250K/MO ON META",
      "80% NEW CUSTOMERS",
      "CTR DOWN 22% IN 3 WEEKS",
      "HIGGSFIELD ACTIVE",
      "5 CREATIVES IN ROTATION",
    ],
    decision: {
      title: "Cut the dermatologist hook.",
      body: "It tanked last Tuesday. Ship 3 new MidJourney concepts before Friday — your audience is reacting to dupes, not white coats.",
      cta: "Open today's brief",
      tone: "amber",
    },
  },
  {
    name: "Diego — Coffee subscription",
    attrs: [
      "MRR $310K",
      "CHURN > 8% MONTH 2",
      "TIKTOK ORGANIC SOFT",
      "CLAUDE WRITES WIN-BACK",
      "KLAVIYO FLOWS STALE",
    ],
    decision: {
      title: "Rewrite the day-21 email.",
      body: "Claude has a winning hook in your archives — pulled from a 2024 thread that converted at 6.1%. Push it tonight, watch retention bend.",
      cta: "See draft",
      tone: "stone",
    },
  },
  {
    name: "Cami — Spa studio in Florida",
    attrs: [
      "1 LOCATION",
      "INSTAGRAM PRIMARY",
      "HIGGSFIELD REELS 4×/WK",
      "BOOKINGS UP 31%",
      "WEEKEND CAPACITY MAXED",
    ],
    decision: {
      title: "Boost Reel #4. Pause #2.",
      body: "Reel #4 — the morning-routine clip — drove 14 bookings on its own. Reel #2 is collecting saves but zero conversions. Reallocate now.",
      cta: "Boost it",
      tone: "ink",
    },
  },
];

export default function PersonalizedDecisionSection() {
  return (
    <section className="bg-cream border-t border-line py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 mb-12 md:mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber text-white font-sans font-semibold text-[13px]">
              <SparkleIcon /> Daily brief
            </span>
            <p className="mt-5 font-sans text-ink/75 text-[15px] leading-relaxed max-w-[280px]">
              Velur reads your sales, your ads, your creative — then tells you what to ship next. Specifically. By name. At 8am, before you&apos;ve opened a tab.
            </p>
          </div>

          <h2
            className="font-sans font-bold text-ink tracking-[-0.035em] leading-[1.02]"
            style={{ fontSize: "clamp(34px, 4.6vw, 64px)" }}
          >
            Three brands. Three honest decisions.
            <span className="text-ink/40"> Same Tuesday morning.</span>
          </h2>
        </div>

        {/* Persona + decision grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PERSONAS.map((p, idx) => (
            <div key={p.name} className="flex flex-col gap-4 md:gap-5">
              {/* Persona card */}
              <div className="rounded-2xl border border-line bg-cream p-5 min-h-[220px] relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-stone border border-line flex items-center justify-center">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="4.5" r="2.5" stroke="#1A1A1A" strokeWidth="1.2" />
                      <path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#1A1A1A" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <p className="font-sans font-semibold text-ink text-[15px]">{p.name}</p>
                </div>
                <div className="space-y-1">
                  {p.attrs.map(a => (
                    <p key={a} className="font-mono text-[11px] tracking-[0.10em] text-ink/65">
                      {a}
                    </p>
                  ))}
                </div>
                {/* Connector */}
                <div className="absolute left-1/2 -bottom-5 w-px h-5 bg-line" aria-hidden />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-amber" aria-hidden />
              </div>

              {/* Decision card */}
              <DecisionCard persona={p} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionCard({ persona, index }: { persona: Persona; index: number }) {
  const tone = persona.decision.tone;
  const styles =
    tone === "amber"
      ? "bg-gradient-to-br from-amber via-[#FF7A3D] to-[#FFA868] text-white"
      : tone === "ink"
      ? "bg-ink text-paper"
      : "bg-gradient-to-br from-stone to-[#EFEBE2] text-ink";

  return (
    <div className={`relative rounded-2xl overflow-hidden p-5 md:p-6 min-h-[260px] flex flex-col justify-end ${styles}`}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl ${
          tone === "amber" ? "bg-white/25" : tone === "ink" ? "bg-amber/30" : "bg-amber/15"
        }`} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.18]" viewBox="0 0 240 280" preserveAspectRatio="none">
          {index === 0 && <path d="M0,180 Q60,120 120,160 T240,150 L240,280 L0,280 Z" fill="currentColor" />}
          {index === 1 && (
            <>
              <circle cx="200" cy="60" r="40" fill="currentColor" />
              <rect x="20" y="160" width="60" height="60" fill="currentColor" />
            </>
          )}
          {index === 2 && (
            <>
              <path d="M0,80 L240,80" stroke="currentColor" strokeWidth="2" />
              <path d="M0,140 L240,140" stroke="currentColor" strokeWidth="2" />
              <path d="M0,200 L240,200" stroke="currentColor" strokeWidth="2" />
            </>
          )}
        </svg>
      </div>

      <div className="relative">
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase mb-2 ${
          tone === "amber" ? "text-white/85" : tone === "ink" ? "text-amber" : "text-ink/55"
        }`}>
          Decision · this morning
        </p>
        <h3 className="font-sans font-bold text-[22px] md:text-[24px] leading-[1.1] mb-2.5">
          {persona.decision.title}
        </h3>
        <p className={`font-sans text-[14px] leading-snug mb-4 ${
          tone === "amber" ? "text-white/90" : tone === "ink" ? "text-paper/80" : "text-ink/75"
        }`}>
          {persona.decision.body}
        </p>
        <button
          className={`self-start inline-flex items-center font-sans font-semibold text-[13px] px-3.5 py-2 rounded-md ${
            tone === "amber"
              ? "bg-white/95 text-ink hover:bg-white"
              : tone === "ink"
              ? "bg-amber text-white hover:bg-paper hover:text-ink"
              : "bg-ink text-paper hover:bg-amber"
          } transition-colors`}
        >
          {persona.decision.cta}
        </button>
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1l1.4 4.2L12.6 7 8.4 8.4 7 13l-1.4-4.6L1.4 7 5.6 5.6 7 1z" fill="currentColor" />
    </svg>
  );
}
