import type { Metadata } from "next";
import IntegrationsContent from "@/components/pages/IntegrationsContent";

export const metadata: Metadata = {
  title: "Integrations · Velur",
  description:
    "Velur connects to the eight tools every DTC brand already runs on, Shopify, Klaviyo, Meta, TikTok, Google, GA4, Stripe and Recharge, with read-only OAuth and EU-hosted processing.",
};

export default function IntegrationsPage() {
  return <IntegrationsContent />;
}
