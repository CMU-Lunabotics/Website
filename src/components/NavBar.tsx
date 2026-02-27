'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] px-4 py-6">
      <div className="mx-auto max-w-[1280px] h-[60px] flex justify-between items-center px-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/5">
        <Link href="/" className="text-[20px] font-normal tracking-wider text-white font-[var(--font-audiowide)]">
          Moon Miners
        </Link>
        
        <div className="flex gap-8 items-center text-sm uppercase tracking-widest font-bold">
          <Link href="/team" className="text-white hover:opacity-70 transition-opacity">Team</Link>
          <Link href="/updates" className="text-white hover:opacity-70 transition-opacity">Updates</Link>
          <Link href="/sponsors" className="text-white hover:opacity-70 transition-opacity">Sponsors</Link>
          <Link href="/donate" className="bg-white text-black px-6 py-2 rounded-[2px] hover:bg-white/90 transition-all">
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
}