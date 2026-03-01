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
    default: "Rishabh Tripathi — Adaptive Portfolio",
    template: "%s | Rishabh Tripathi",
  },
  description: "An AI-powered portfolio that dynamically adapts its content to match your company and role. Experience personalized project descriptions, tailored skills, and context-aware resumes.",
  keywords: ["portfolio", "developer", "frontend engineer", "AI portfolio", "adaptive portfolio", "Rishabh Tripathi"],
  authors: [{ name: "Rishabh Tripathi" }],
  creator: "Rishabh Tripathi",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rishabh Tripathi — Adaptive Portfolio",
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
      <body className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased font-sans`}>
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
