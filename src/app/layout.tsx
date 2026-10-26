import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageFade } from '@/components/PageFade';
import { Starfield } from '@/components/Starfield';
import './globals.css';
import { Audiowide, Noto_Sans_Display } from 'next/font/google';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
});

const notoDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'CMU Moon Miners',
    template: '%s | CMU Moon Miners',
  },
  description:
    'Carnegie Mellon University\'s NASA Lunabotics team — building autonomous lunar excavation robotics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${audiowide.variable} ${notoDisplay.variable}`}>
      <body className="bg-void text-starlight antialiased flex flex-col min-h-screen font-[var(--font-noto)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10050] focus:bg-tartan focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wider focus:text-starlight"
        >
          Skip to content
        </a>
        <Starfield />

        <header className="relative z-[9999]">
          <Navbar />
        </header>

        <PageFade>
          <main id="main" className="relative z-[1] flex-grow">
            {children}
          </main>
          <Footer />
        </PageFade>
      </body>
    </html>
  );
}
