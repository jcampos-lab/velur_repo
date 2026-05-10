import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact — Velur",
  description: "Book a demo with Velur. See the revenue intelligence platform live with your own data connected.",
};

export default function ContactPage() {
  return <ContactContent />;
}
