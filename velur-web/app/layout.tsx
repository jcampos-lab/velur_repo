import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velur · Revenue Intelligence + AI Studio for small businesses",
  description:
    "Velur helps small businesses grow revenue with AI. Two products: AI Studio for creative work with Higgsfield, MidJourney, Claude and ChatGPT, plus Revenue Intelligence for the data that ties it all back to dollars.",
  openGraph: {
    title: "Velur · AI Studio + Revenue Intelligence",
    description:
      "We help small businesses turn AI into revenue. Creative, campaigns, and the analytics behind both.",
    url: "https://velur.io",
    siteName: "Velur",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://velur.io/og-image.png", width: 1200, height: 630, alt: "Velur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velur · AI Studio + Revenue Intelligence",
    description:
      "We help small businesses turn AI into revenue.",
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
