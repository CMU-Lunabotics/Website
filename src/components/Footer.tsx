'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#D9D9D9]/10 border-t border-white/10 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[80px]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-white font-[var(--font-noto)]">Home</h3>
              <Link href="/about" className="text-white underline text-base font-[var(--font-noto)]">About</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-white font-[var(--font-noto)]">Team</h3>
              <Link href="/team" className="text-white underline text-base font-[var(--font-noto)]">Our Team</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-white font-[var(--font-noto)]">Sponsors</h3>
              <Link href="/donate" className="text-white underline text-base font-[var(--font-noto)]">Donate</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-white font-[var(--font-noto)]">Updates</h3>
              <Link href="/updates" className="text-white underline text-base font-[var(--font-noto)]">News</Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:w-[410px] bg-white/5 border border-[#747474] rounded-[7px] p-8">
            <h3 className="text-[32px] font-bold text-white mb-2 font-[var(--font-noto)] text-center">Join our mailing list</h3>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Your Email Address" className="flex-grow bg-transparent border border-[#949494] rounded-[7px] px-4 py-2 text-white outline-none" />
              <button className="bg-white/20 px-6 py-2 rounded-full text-white font-[var(--font-noto)] hover:bg-white/30 transition">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white font-[var(--font-noto)]">Contact us</h3>
            <p className="text-white/60 text-sm">cmumoonminers@gmail.com</p>
          </div>
          <p className="text-white/40 text-sm">Moon Miners © 2026. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition"><Instagram className="text-black size-5" /></Link>
            <Link href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition"><Linkedin className="text-black size-5" /></Link>
            <Link href="#" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition"><Twitter className="text-black size-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}