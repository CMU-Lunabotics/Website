import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
        <Starfield />

        <header className="relative z-[9999]">
          <Navbar />
        </header>

        <main className="flex-grow relative z-[1]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
