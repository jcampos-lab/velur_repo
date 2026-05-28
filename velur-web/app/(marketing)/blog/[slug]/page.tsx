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
    title: `${post.title} · Velur`,
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
      <section className="bg-paper pt-16 md:pt-20 pb-12 md:pb-14 border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="font-sans text-[13px] text-ink/55 hover:text-amber transition-colors mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          <div className="max-w-[720px]">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[11px] tracking-[0.16em] text-amber uppercase">
                {post.category}
              </span>
              <span className="font-mono text-[11px] text-ink/55 tracking-[0.06em]">{formatDate(post.date)}</span>
            </div>

            <h1
              className="font-sans font-bold text-ink leading-[1.1] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
            >
              {post.title}
            </h1>

            <p className="font-sans text-base md:text-lg text-ink/70 leading-relaxed">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Body placeholder */}
      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[720px] mx-auto px-6 md:px-12">
          <p className="font-sans text-ink/55 text-[13px] mb-4">
            Coming soon
          </p>
          <p className="font-sans text-ink/80 leading-relaxed mb-8 text-base md:text-lg">
            This article is being written. Check back soon, or reach out if you want to talk through the topic now.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans font-medium text-sm bg-ink text-paper px-6 py-3 rounded-full hover:bg-amber hover:text-paper transition-colors duration-200"
          >
            Book a demo →
          </Link>
        </div>
      </section>
    </>
  );
}
