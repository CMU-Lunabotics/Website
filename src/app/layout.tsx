import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getSiteConfig } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMU MoonMiners - NASA Lunabotics",
  description: "Autonomous lunar excavation for NASA Lunabotics. Building the future of space robotics at Carnegie Mellon University.",
  keywords: ["NASA", "Lunabotics", "CMU", "robotics", "lunar", "excavation", "autonomous"],
  authors: [{ name: "CMU MoonMiners" }],
  openGraph: {
    title: "CMU MoonMiners - NASA Lunabotics",
    description: "Autonomous lunar excavation for NASA Lunabotics. Building the future of space robotics at Carnegie Mellon University.",
    type: "website",
    locale: "en_US",
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
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
            <Footer siteConfig={siteConfig} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
