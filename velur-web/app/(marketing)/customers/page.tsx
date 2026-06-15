import type { Metadata } from "next";
import CustomersContent from "@/components/pages/CustomersContent";

export const metadata: Metadata = {
  title: "Customers · Velur",
  description:
    "Velur is built for every DTC and subscription brand, small to mid-market. No engineering team, no data science team, no warehouse required. Just a complete revenue intelligence layer under the tools you already use.",
};

export default function CustomersPage() {
  return <CustomersContent />;
}
