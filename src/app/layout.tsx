import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetbrainsMono = localFont({
  src: [
    {
      path: "../assets/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Medium-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Bold-Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/JetBrainsMono-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMono-ExtraBold-Italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  // next/font preloads every declared face. With eight of them that was 1.1MB of
  // render-blocking font requests on each page load; the browser now fetches only the
  // faces a page actually uses.
  preload: false,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: seoGlobal.url,
    siteName: seoGlobal.siteName,
    title: seoHub.title,
    description: seoHub.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoHub.title,
    description: seoHub.description,
    creator: seoGlobal.twitterHandle,
  },
  robots: {
    index: seoGlobal.robots.index,
    follow: seoGlobal.robots.follow,
  },
  other: { "view-transition": "same-origin" },
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
    // Was pointing at the 215KB .ico; this is a 6KB 180x180 png generated from it.
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SkinProvider } from "@/components/shared/SkinProvider";
import { MODE_STORAGE_KEY, THEME_INIT_SCRIPT } from "@/data/theme-config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Stamps data-theme/data-skin before first paint so dark visitors never see a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey={MODE_STORAGE_KEY}
        >
          <SkinProvider>{children}</SkinProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
