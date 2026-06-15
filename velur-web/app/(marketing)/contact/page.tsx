import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact · Velur",
  description: "Join the Velur waitlist. We'll reach out when the next seat opens, no pitch, just a conversation about what you're building.",
};

export default function ContactPage() {
  return <ContactContent />;
}
