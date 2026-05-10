import type { Metadata } from "next";
import CompanyContent from "@/components/pages/CompanyContent";

export const metadata: Metadata = {
  title: "Company — Velur",
  description:
    "Velur is a revenue intelligence platform for high-growth DTC and subscription brands.",
};

export default function CompanyPage() {
  return <CompanyContent />;
}
