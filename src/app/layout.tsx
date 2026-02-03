import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { HomepageBackground } from "@/components/HomepageBackground";
import { getSiteConfig } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cmu-moon-miners.com';

export const metadata: Metadata = {
  title: "CMU MoonMiners - NASA Lunabotics",
  description: "Autonomous lunar excavation for NASA Lunabotics. Building the future of space robotics at Carnegie Mellon University.",
  keywords: ["NASA", "Lunabotics", "CMU", "robotics", "lunar", "excavation", "autonomous"],
  authors: [{ name: "CMU MoonMiners" }],
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/images/logo/logo20262.png', type: 'image/png' },
      { url: '/images/logo/logo2026.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/images/logo/logo20262.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "CMU MoonMiners - NASA Lunabotics",
    description: "Autonomous lunar excavation for NASA Lunabotics. Building the future of space robotics at Carnegie Mellon University.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CMU MoonMiners",
  },
  twitter: {
    card: "summary_large_image",
    title: "CMU MoonMiners - NASA Lunabotics",
    description: "Autonomous lunar excavation for NASA Lunabotics. Building the future of space robotics at Carnegie Mellon University.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col relative">
            <HomepageBackground />
            <NavBar logoPath={siteConfig.logo} />
            <main className="flex-1">
              {children}
            </main>

            {/* Newsletter full-width block attached above footer */}
            <div className="border-t bg-gradient-to-b from-white/10 to-white/30">
              <Newsletter />
            </div>

            <Footer siteConfig={siteConfig} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
