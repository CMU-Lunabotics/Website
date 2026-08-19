'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/updates', label: 'Updates' },
  { href: '/sponsors', label: 'Sponsors' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[9999] bg-void/70 backdrop-blur-md border-b border-titanium/15">
        <div className="relative w-full h-[88px] flex justify-between items-center px-6 md:px-12">
          {/* LOGO */}
          <div className="relative z-[10001] flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group" aria-label="Moon Miners home">
              <Logo size="md" className="transition-transform group-hover:scale-[1.03]" />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 relative z-[10001]">
            {NAV_LINKS.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-xs font-bold uppercase tracking-widest transition-colors py-1.5',
                    'after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-supernova after:transition-all after:duration-200',
                    active
                      ? 'text-starlight after:w-full'
                      : 'text-moon-dust hover:text-starlight after:w-0 hover:after:w-full'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/donate"
              className="bg-tartan text-starlight px-7 py-2.5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-supernova glow-supernova-hover"
            >
              Donate
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden relative z-[10002] flex-shrink-0 ml-auto">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-starlight p-2 border-none outline-none bg-transparent"
              aria-label="Open menu"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULL SCREEN MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[10000] bg-void text-starlight lg:hidden overflow-y-auto">
          {/* Nebula accent */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full"
            style={{
              background:
                'radial-gradient(circle at center, rgba(51,32,79,0.55) 0%, transparent 70%)',
            }}
            aria-hidden
          />

          <div className="relative flex items-start justify-between px-7 pt-6">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Moon Miners home">
              <Logo size="md" />
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-starlight p-2"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="relative px-7 pt-12 pb-12 flex flex-col gap-10">
            <div className="cosmic-rule w-24" aria-hidden />

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-titanium/20 pb-4"
              >
                <span className="text-[26px] font-extrabold tracking-tight text-starlight group-hover:text-supernova transition-colors">
                  {link.label}
                </span>
                <span className="text-supernova text-xl" aria-hidden>
                  ↗
                </span>
              </Link>
            ))}

            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-tartan text-starlight px-8 py-4 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-supernova transition-all glow-supernova"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
