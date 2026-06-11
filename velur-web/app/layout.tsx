import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

/* Px Grotesk (display) loads as @font-face from /public/fonts in globals.css.
   Hanken Grotesk (body / small UI copy) pairs with it — open-source humanist
   grotesque designed as a counterpart to Unica77 / Söhne, full Latin Extended
   coverage so Spanish accents render correctly. */
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velur · The AI Revenue Operating System",
  description:
    "Velur sits above the tools you already run — Shopify, Meta, Klaviyo, Stripe — and turns their fragmented data into one reasoning intelligence layer. AI that understands your entire business.",
  openGraph: {
    title: "Velur · The AI Revenue Operating System",
    description:
      "One intelligence layer above everything. Velur unifies your revenue data and uses AI to tell you what's working, what's breaking, and what to do next.",
    url: "https://velur.io",
    siteName: "Velur",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://velur.io/art/og.png", width: 1200, height: 630, alt: "Velur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velur · The AI Revenue Operating System",
    description:
      "AI that understands your entire business.",
    images: ["https://velur.io/art/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} h-full`}>
      <body className="min-h-full antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
