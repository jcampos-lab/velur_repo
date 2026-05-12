import type { Metadata } from "next";
import CaseStudiesContent from "@/components/pages/CaseStudiesContent";

export const metadata: Metadata = {
  title: "Results — Velur",
  description:
    "What revenue intelligence delivers for DTC and subscription brands. Real benchmarks from independent industry research.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
