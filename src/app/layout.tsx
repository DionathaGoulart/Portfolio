import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Medium-Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/JetBrainsMono-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-ExtraBold-Italic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
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
      <body className={`${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          <RouteThemeProvider>
            {children}
          </RouteThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
