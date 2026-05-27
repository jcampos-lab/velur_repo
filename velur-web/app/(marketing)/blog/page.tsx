import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Velur",
  description: "Thinking on revenue analytics, DTC data strategy, and what actually works.",
};

const CATEGORIES = ["All", "AI", "Analytics", "Strategy", "Decision Making"] as const;

const featured = posts.find((p) => p.featured);
const rest = posts.filter((p) => !p.featured);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-14 md:pt-20 pb-16 md:pb-20 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber text-white font-mono text-[11px] tracking-[0.14em] uppercase mb-8">
            · Blog
          </span>
          <h1
            className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(40px, 5.4vw, 80px)" }}
          >
            Notes on creative, data, and the parts that actually sell.
          </h1>
          <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed max-w-[680px] mt-7">
            Half teardown, half public notebook. Written between client calls — usually around 11pm.
          </p>
        </div>
      </section>

      {/* Categories filter */}
      <section className="bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex gap-6 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`font-mono text-xs uppercase tracking-widest shrink-0 pb-1 border-b-2 transition-colors ${
                cat === "All"
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="bg-paper py-16 border-b border-line">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                {/* Cover placeholder */}
                <div className="lg:col-span-7 aspect-[16/9] bg-cream rounded-2xl border border-line flex items-center justify-center">
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">
                    Cover image
                  </span>
                </div>

                {/* Meta */}
                <div className="lg:col-span-5 flex flex-col gap-4 pb-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-amber">
                      {featured.category}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                  <h2
                    className="font-sans font-bold text-ink leading-tight tracking-[-0.03em] group-hover:text-amber transition-colors"
                    style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="font-sans text-lg text-muted leading-relaxed">{featured.excerpt}</p>
                  <span className="font-mono text-sm text-ink mt-2">Read →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="bg-paper py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="border border-line rounded-2xl p-8 flex flex-col gap-4 hover:border-ink transition-colors">
                  {/* Cover placeholder */}
                  <div className="aspect-[16/9] bg-cream rounded-xl flex items-center justify-center mb-2">
                    <span className="font-mono text-xs text-muted uppercase tracking-widest">
                      Cover image
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                  </div>

                  <h3
                    className="font-sans font-bold text-ink leading-snug tracking-[-0.02em] group-hover:text-amber transition-colors"
                    style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                  >
                    {post.title}
                  </h3>

                  <p className="font-sans text-base text-muted leading-relaxed">{post.excerpt}</p>

                  <span className="font-mono text-sm text-ink mt-auto">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
