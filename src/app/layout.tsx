import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontDisplay = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rishabhtripathi.dev"),
  title: {
    default: "Adaptiv — Build Your Portfolio in Minutes",
    template: "%s | Adaptiv",
  },
  description: "Choose from 50 stunning portfolio templates, fill in your details, and get a unique shareable link. No coding required.",
  keywords: ["portfolio generator", "developer portfolio", "portfolio builder", "free portfolio", "Adaptiv"],
  authors: [{ name: "Adaptiv" }],
  creator: "Adaptiv",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adaptiv — Portfolio Generator",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { PortfolioProvider } from "@/components/portfolio/PortfolioProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
