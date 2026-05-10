import type { Metadata } from "next";
import ServicesContent from "@/components/pages/ServicesContent";

export const metadata: Metadata = {
  title: "Platform — Velur",
  description:
    "Revenue intelligence for DTC brands. Pulse, Attribution, and Cohort & LTV intelligence — unified in one platform.",
};

export default function PlatformPage() {
  return <ServicesContent />;
}
