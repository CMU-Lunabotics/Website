'use client';

import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

export function Navbar() {
  const logoUrl = "https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/navbar/Frame%20684.svg";

  return (
    // 'border-none' and 'shadow-none' ensure no decorative lines appear
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-black/40 backdrop-blur-md border-none shadow-none">
      
      {/* - px-6 md:px-12: Controls the horizontal space for the logo and links
          - h-[80px]: Keeps the height consistent
      */}
      <div className="w-full h-[80px] flex justify-between items-center px-6 md:px-12">
        
        {/* LOGO SECTION */}
        <div className="flex items-center flex-shrink-0 mt-2">
          <Link href="/" className="flex items-center">
            <Image 
              src={logoUrl} 
              alt="Moon Miners Logo" 
              width={167} 
              height={106} 
              className="h-16 w-auto object-contain transition-transform hover:scale-105"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <Link href="/team" className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all">
            Team
          </Link>
          <Link href="/updates" className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all">
            Updates
          </Link>
          <Link href="/sponsors" className="text-white/70 hover:text-[#F1EDE6] text-xs font-bold uppercase tracking-widest transition-all">
            Sponsors
          </Link>

          {/* DONATE BUTTON */}
          <Link 
            href="/donate" 
            className="bg-[#F1EDE6] text-black px-8 py-2.5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all"
          >
            Donate
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE (No border on button either) */}
        <div className="md:hidden">
           <button className="text-[#F1EDE6] p-2 border-none outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
             </svg>
           </button>
        </div>

      </div>
    </nav>
  );
}