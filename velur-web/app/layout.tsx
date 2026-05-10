import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
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
  title: "Velur — Revenue Intelligence for DTC Brands",
  description:
    "Velur turns your Shopify, Klaviyo, and Meta data into the three numbers that decide your next quarter. No new dashboard. No new SaaS bill.",
  openGraph: {
    title: "Velur — Revenue Intelligence for DTC Brands",
    description:
      "Velur turns your Shopify, Klaviyo, and Meta data into the three numbers that decide your next quarter.",
    url: "https://velur.io",
    siteName: "Velur",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://velur.io/og-image.png", width: 1200, height: 630, alt: "Velur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velur — Revenue Intelligence for DTC Brands",
    description:
      "Velur turns your Shopify, Klaviyo, and Meta data into the three numbers that decide your next quarter.",
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
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('velur-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
      </body>
    </html>
  );
}
