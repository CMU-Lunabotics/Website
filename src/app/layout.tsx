import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';
import { Audiowide, Noto_Sans_Display } from 'next/font/google';

const audiowide = Audiowide({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-audiowide' 
});

const notoTabs = Noto_Sans_Display({ 
  subsets: ['latin'],
  variable: '--font-noto' 
});

export const metadata = {
  title: 'CMU MoonMiners',
  description: 'Pushing the boundaries of planetary robotics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${audiowide.variable} ${notoTabs.variable}`}>
      <body className="bg-black antialiased flex flex-col min-h-screen font-[var(--font-noto)]">
        <header className="relative z-[9999]">
          <Navbar />
        </header>

        <main className="flex-grow relative z-0">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}