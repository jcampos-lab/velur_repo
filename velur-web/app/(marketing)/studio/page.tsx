import type { Metadata } from "next";
import StudioContent from "@/components/pages/StudioContent";

export const metadata: Metadata = {
  title: "AI Studio · Velur",
  description:
    "Velur AI Studio helps small businesses turn generative AI into revenue. Higgsfield, MidJourney, Claude, ChatGPT, applied to web, creative, campaigns, social and branding.",
};

export default function StudioPage() {
  return <StudioContent />;
}
