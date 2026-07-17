import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiSphere Agency — L'union des expertises, la force de vos projets",
  description:
    "MultiSphere Agency : agence pluridisciplinaire à Abomey-Calavi, Bénin. Événementiel, communication digitale, développement web & mobile, cybersécurité et gestion administrative. Un interlocuteur unique pour tous vos projets.",
  keywords: [
    "MultiSphere Agency",
    "agence événementiel Bénin",
    "communication digitale Bénin",
    "développement web Abomey-Calavi",
    "cybersécurité Bénin",
    "gestion administrative",
    "agence pluridisciplinaire",
  ],
  authors: [{ name: "MultiSphere Agency" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "MultiSphere Agency — L'union des expertises, la force de vos projets",
    description:
      "Événementiel, communication digitale, développement web/mobile, cybersécurité et gestion administrative. Un interlocuteur unique pour piloter vos projets à 360°.",
    siteName: "MultiSphere Agency",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiSphere Agency",
    description: "L'union des expertises, la force de vos projets.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d6efd" },
    { media: "(prefers-color-scheme: dark)", color: "#060b1e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
