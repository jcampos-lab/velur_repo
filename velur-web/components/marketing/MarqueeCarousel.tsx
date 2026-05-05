const CARDS = [
  { label: "STACK",       text: "BigQuery, dbt, Metabase"              },
  { label: "METHOD",      text: "1-week sprints, daily Loom updates"   },
  { label: "TOOLS",       text: "Claude, Cursor, modern tooling"       },
  { label: "OUTPUT",      text: "SQL files in your GitHub, day one"    },
  { label: "SOURCES",     text: "Shopify, Klaviyo, Meta, Google, TikTok" },
  { label: "APPROACH",    text: "AI-augmented, founder-aligned"        },
  { label: "SPEED",       text: "14 days from kickoff to live"         },
  { label: "OWNERSHIP",   text: "You own everything we build"          },
  { label: "CADENCE",     text: "Async-first, weekly sync"             },
  { label: "PHILOSOPHY",  text: "Numbers don't lie. Decisions do."     },
];

function Card({ label, text }: { label: string; text: string }) {
  return (
    <div className="shrink-0 w-[380px] border border-line bg-paper rounded-[16px] p-9 flex flex-col gap-4 mr-5">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
      <p className="font-sans font-semibold text-ink text-xl leading-snug">{text}</p>
    </div>
  );
}

export default function MarqueeCarousel() {
  const doubled = [...CARDS, ...CARDS];

  return (
    <div className="bg-cream py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          HOW WE ACTUALLY DELIVER
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex marquee-track">
          {doubled.map((card, i) => (
            <Card key={i} label={card.label} text={card.text} />
          ))}
        </div>
      </div>
    </div>
  );
}
