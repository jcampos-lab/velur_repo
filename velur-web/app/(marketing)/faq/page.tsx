import type { Metadata } from "next";
import FaqContent from "@/components/pages/FaqContent";

export const metadata: Metadata = {
  title: "FAQ — Velur",
  description:
    "Answers to the most common questions DTC founders ask about Velur — attribution, cohorts, integrations, pricing, and more.",
};

export default function FaqPage() {
  return <FaqContent />;
}
