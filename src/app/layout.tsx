import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { seoGlobal, seoHub } from "@/data/seo-config";

export const metadata: Metadata = {
  metadataBase: new URL(seoGlobal.url),
  title: {
    default: seoHub.title,
    template: `%s | ${seoGlobal.author}`,
  },
  description: seoHub.description,
  keywords: seoHub.keywords,
  authors: [{ name: seoGlobal.author }],
  creator: seoGlobal.author,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: seoGlobal.url,
    siteName: seoGlobal.siteName,
    title: seoHub.title,
    description: seoHub.description,
    images: [
      {
        url: seoHub.ogImage,
        width: 1200,
        height: 630,
        alt: seoGlobal.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoHub.title,
    description: seoHub.description,
    creator: seoGlobal.twitterHandle,
    images: [seoHub.ogImage],
  },
  robots: {
    index: seoGlobal.robots.index,
    follow: seoGlobal.robots.follow,
  },
  icons: {
    icon: [
      {
        url: "/icon-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/icon-dark.ico",
      },
    ],
  },
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { RouteThemeProvider } from "@/components/shared/RouteThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          <RouteThemeProvider>
            {children}
          </RouteThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
