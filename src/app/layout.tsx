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

import { seoConfig } from "@/data/seo-config";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  openGraph: {
    type: "website",
    locale: seoConfig.og.locale,
    url: seoConfig.url,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.og.image,
        width: 1200,
        height: 630,
        alt: seoConfig.og.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    creator: seoConfig.twitter.handle,
    images: [seoConfig.og.image],
  },
  robots: {
    index: seoConfig.robots.index,
    follow: seoConfig.robots.follow,
  },
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { RouteThemeProvider } from "@/components/shared/RouteThemeProvider";
import Script from 'next/script';

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
        <Script id="theme-checker" src="/theme-check.js" strategy="beforeInteractive" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouteThemeProvider>
            {children}
          </RouteThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
