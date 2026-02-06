'use client';

import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';

export function SponsorLanding() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[483px]">
        <img
          src={getStorageUrl('hero/image 6.png')}
          alt="Sponsors hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gray overlay background */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
          {/* Overlay background panel behind content */}
          <div className="absolute w-[90%] md:w-[1440px] h-[372px] top-[111px] bg-neutral-200/40 -z-10" />

          {/* Main content container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
            {/* Heading */}
            <h1 className="text-white text-5xl md:text-6xl font-semibold text-center mb-12 drop-shadow-lg">
              Powering the Mission
            </h1>

            {/* Description box with semi-transparent background */}
            <div className="max-w-2xl animate-fade-in">
              <div className="bg-gray-700/60 rounded-lg px-8 py-6 backdrop-blur-sm">
                <p className="text-white text-center text-lg md:text-xl font-medium leading-relaxed">
                  We are proud to be supported by industry leaders in robotics, aerospace, and engineering. Thank you for making our journey to the NASA Lunabotics Competition possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
