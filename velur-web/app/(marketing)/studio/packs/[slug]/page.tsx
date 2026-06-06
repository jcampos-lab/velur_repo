import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROMPT_PACKS, getPackBySlug } from "@/lib/promptPacks";
import PackPageBody from "@/components/pages/PackPageBody";

/* Pre-render every pack at build time. */
export function generateStaticParams() {
  return PROMPT_PACKS.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return { title: "Pack not found · Velur" };
  return {
    title: `${pack.title} · Prompt Pack · Velur AI Studio`,
    description: pack.tagline,
  };
}

export default async function PackPage({ params }: PageProps) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();
  return <PackPageBody pack={pack} />;
}
