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
import { THEME_COLOR_DARK, THEME_COLOR_LIGHT } from "@/data/theme-config";

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
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR_LIGHT },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR_DARK },
  ],
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { SkinProvider } from "@/components/shared/SkinProvider";
import { ShellModeProvider } from "@/context/ShellModeContext";
import dynamic from "next/dynamic";

// Import estatico mandaria o painel no bundle de producao (a referencia de client component
// entra no manifest mesmo com o JSX desligado). Com o ternario constante, o import() some.
const DevTools =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/shared/DevTools").then((m) => m.DevTools))
    : () => null;
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
        {process.env.NODE_ENV === "development" && (
          // Mata service workers orfaos deixados por outro projeto que ja usou esta porta.
          // Um SW estranho intercepta os chunks de HMR do Next e joga o navegador num loop
          // de full reload. Ver public/sw.js.
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations().then(function(rs){
    rs.forEach(function(r){ r.unregister(); });
  }).catch(function(){});
  if (window.caches && caches.keys) {
    caches.keys().then(function(ks){
      ks.forEach(function(k){ caches.delete(k); });
    }).catch(function(){});
  }
})();`,
            }}
          />
        )}
        {/*
          Framer Motion renders its `initial` state as an inline style, so server output
          carries opacity:0 on every reveal and the content stayed invisible when scripts
          did not run. This shows it instead of hiding it.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey={MODE_STORAGE_KEY}
        >
          <SkinProvider>
            {/* The terminal skin offers the shell on every page, so the mode lives here. */}
            <ShellModeProvider>
              {children}
              <DevTools />
            </ShellModeProvider>
          </SkinProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
