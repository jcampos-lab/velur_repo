import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

/* Px Grotesk is loaded as @font-face from /public/fonts in globals.css.
   These Google fonts remain as graceful fallbacks while Px Grotesk swaps in. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velur · Revenue Intelligence for small businesses",
  description:
    "Velur unifies pipeline, billing, product-usage and CRM signals into one console — so revenue teams see what's changing, and act before it costs them.",
  openGraph: {
    title: "Velur · Revenue Intelligence",
    description:
      "Revenue, before it moves. Velur reconciles every source onto one timeline so a board-ready forecast is one click — not one week.",
    url: "https://velur.io",
    siteName: "Velur",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://velur.io/og-image.png", width: 1200, height: 630, alt: "Velur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velur · Revenue Intelligence",
    description:
      "Revenue, before it moves.",
    images: ["https://velur.io/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${fraunces.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
