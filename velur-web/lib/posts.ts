export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "AI" | "Analytics" | "Strategy" | "Decision Making";
  featured: boolean;
};

export const posts: Post[] = [
  {
    slug: "post-ios14-attribution-guide",
    title: "The honest guide to attribution after iOS14",
    excerpt:
      "Three years on, most DTC brands are still flying blind. Here's what actually works — and what to stop pretending works.",
    date: "2026-04-15",
    category: "Analytics",
    featured: true,
  },
  {
    slug: "cohort-analysis-for-dtc",
    title: "Why cohort analysis is the only metric that matters",
    excerpt:
      "LTV, CAC, ROAS — they're all derivatives of one thing. Here's how to look at your customers the right way.",
    date: "2026-03-28",
    category: "Strategy",
    featured: false,
  },
  {
    slug: "replace-triple-whale",
    title: "We replaced Triple Whale with BigQuery. Here's what happened.",
    excerpt:
      "A walkthrough of what a custom analytics layer looks like, what it costs to build, and what you get back.",
    date: "2026-03-10",
    category: "AI",
    featured: false,
  },
];
