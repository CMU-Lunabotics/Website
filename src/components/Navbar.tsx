'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logoUrl =
    'https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/navbar/Frame%20684.svg';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[9999] bg-black/40 backdrop-blur-[2px] border-none shadow-none">
        <div className="relative w-full h-[80px] flex justify-between items-center px-6 md:px-12">
          
          {/* LOGO */}
          <div className="relative z-[10001] flex items-center flex-shrink-0 mt-2">
            <Link href="/" className="flex items-center">
              <Image
                src={logoUrl}
                alt="Moon Miners Logo"
                width={167}
                height={106}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform hover:scale-105"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 relative z-[10001]">
            <Link
              href="/about"
              className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all"
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all"
            >
              Team
            </Link>
            <Link
              href="/updates"
              className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all"
            >
              Updates
            </Link>
            <Link
              href="/sponsors"
              className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all"
            >
              Sponsors
            </Link>
            <Link
              href="/donate"
              className="bg-[#F1EDE6] text-black px-8 py-2.5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all"
            >
              Donate
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden relative z-[10002] flex-shrink-0 ml-auto">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-[#F1EDE6] p-2 border-none outline-none bg-transparent"
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
        <div className="fixed inset-0 z-[10000] bg-black text-white md:hidden">
          <div className="flex items-start justify-between px-7 pt-8">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src={logoUrl}
                alt="Moon Miners Logo"
                width={150}
                height={95}
                className="h-16 w-auto object-contain"
                unoptimized
              />
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>

          <div className="px-7 pt-10 pb-12 flex flex-col gap-14">
            {/* ABOUT */}
            <div>
              <h2 className="text-[22px] font-extrabold tracking-tight">About</h2>
              <div className="mt-4 flex flex-col gap-3 text-[17px] text-white/90">
                <Link
                  href="/team"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">↗</span>
                  <span>Our team</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">↗</span>
                  <span>Our story</span>
                </Link>
              </div>
            </div>

            {/* SPONSOR */}
            <div>
              <h2 className="text-[22px] font-extrabold tracking-tight">Sponsor</h2>
              <div className="mt-4 flex flex-col gap-3 text-[17px] text-white/90">
                <Link
                  href="/sponsors"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">↗</span>
                  <span>Partner with us</span>
                </Link>
              </div>
            </div>

            {/* UPDATES */}
            <div>
              <h2 className="text-[22px] font-extrabold tracking-tight">Updates</h2>
              <div className="mt-3 flex flex-col gap-2 text-[15px] text-white/85">
                <Link
                  href="/updates"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">↗</span>
                  <span>News & Updates</span>
                </Link>
              </div>
            </div>

            {/* DONATE */}
            <div>
              <Link
                href="/donate"
                onClick={() => setMenuOpen(false)}
                className="text-[22px] font-extrabold tracking-tight"
              >
                Sponsor us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}