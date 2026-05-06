import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Velur`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://velur.io/blog/${post.slug}`,
      type: "article",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      {/* Header */}
      <section className="bg-paper pt-20 pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors mb-10 inline-block"
          >
            ← Back to Blog
          </Link>

          <div className="max-w-[720px]">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-amber">
                {post.category}
              </span>
              <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
            </div>

            <h1
              className="font-sans font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
            >
              {post.title}
            </h1>

            <p className="font-sans text-xl text-muted leading-relaxed">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Body placeholder */}
      <section className="bg-cream py-24">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-6">
            COMING SOON
          </p>
          <p
            className="font-serif italic text-ink leading-relaxed mb-10"
            style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
          >
            "This article is being written. Check back soon — or reach out if
            you want to talk through the topic now."
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-mono text-sm bg-ink text-paper px-6 py-3 rounded-pill hover:bg-amber transition-colors duration-200"
          >
            Book a call →
          </Link>
        </div>
      </section>
    </>
  );
}
