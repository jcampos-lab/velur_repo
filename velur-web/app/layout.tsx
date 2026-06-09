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
    images: [{ url: "https://velur.io/art/dunes-og.png", width: 2752, height: 1536, alt: "Velur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velur · Revenue Intelligence",
    description:
      "Revenue, before it moves.",
    images: ["https://velur.io/art/dunes-og.png"],
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
