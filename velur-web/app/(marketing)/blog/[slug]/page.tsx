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
      <section className="bg-cream pt-14 md:pt-20 pb-14 md:pb-16 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Link
            href="/blog"
            className="font-mono text-[11px] tracking-[0.14em] text-ink/65 hover:text-amber uppercase mb-8 inline-block"
          >
            ← Back to blog
          </Link>

          <div className="max-w-[820px]">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase">
                · {post.category}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-ink/55 uppercase">
                {formatDate(post.date)}
              </span>
            </div>

            <h1
              className="font-sans font-bold text-ink leading-[1.0] tracking-[-0.035em] mb-5"
              style={{ fontSize: "clamp(30px, 4.4vw, 64px)" }}
            >
              {post.title}
            </h1>

            <p className="font-sans text-ink/75 text-lg md:text-xl leading-relaxed">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Body placeholder */}
      <section className="bg-paper py-20 md:py-24">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase mb-4">
            · In progress
          </p>
          <p className="font-sans text-ink text-lg leading-relaxed mb-8">
            This one&apos;s still in drafts. We&apos;d rather ship it slow than ship it generic. If the headline grabbed you and you want to talk the topic through now, just email us.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-amber text-white font-sans font-semibold text-[15px] px-6 py-3.5 rounded-md hover:bg-ink transition-colors"
          >
            Email us about this →
          </Link>
        </div>
      </section>
    </>
  );
}
