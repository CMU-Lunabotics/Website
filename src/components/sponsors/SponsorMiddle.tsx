import React from 'react';
import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';

interface SponsorMiddleProps {
  // optionally accept sponsors data later
}

export function SponsorMiddle(_props: SponsorMiddleProps) {
  return (
    <section className="relative">
      {/* Combined full-bleed area containing both backgrounds so we can precisely space headings */}
      <div className="w-full relative" style={{ height: '1100px' }}>
        {/* First background (Rectangle 30) */}
        <img
          src={getStorageUrl('hero/Rectangle 30.png')}
          alt="Sponsors section background"
          className="absolute left-0 top-0 w-full h-[1223px] object-cover"
        />

        {/* Headings and logos positioned absolutely so gap between them is exactly 386px */}
        {/* Place Current Sponsors at top 200px */}
        <div className="absolute left-0 w-full z-20" style={{ top: '200px' }}>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-6xl font-semibold mb-8">Current Sponsors</h2>
            <div className="flex items-center justify-center gap-12 mt-4">
              <div className="h-[262px] flex items-end">
                <img
                  src={getStorageUrl('sponsors/shieldAI.png')}
                  alt="Shield AI"
                  className="w-[465px] max-h-[240px] object-contain filter brightness-0 invert"
                />
              </div>
              <div className="h-[262px] flex items-end">
                <img
                  src={getStorageUrl('sponsors/sick.png')}
                  alt="SICK"
                  className="w-[401px] max-h-[240px] object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Individual Patrons placed exactly 386px below Current Sponsors (200 + 386 = 586px) */}
        <div className="absolute left-0 w-full z-20" style={{ top: '586px' }}>
          <div className="flex flex-col items-center px-6">
            <div className="text-white text-5xl font-semibold font-['Inter'] mb-6">Individual Patrons</div>

            <div className="w-full flex items-center justify-center">
              <div className="relative w-[1217px] h-[409px]">
                <div className="absolute inset-0 bg-zinc-300/20 rounded-[10px] z-0" />

                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex items-end gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-[284px] h-[284px] rounded-full overflow-hidden bg-neutral-300 shadow-md mb-2">
                      <img src={getStorageUrl('sponsors/choset.jpg')} alt="Prof. Howie Choset" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white text-[22px] font-semibold text-center">Prof. Howie Choset</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-[284px] h-[284px] rounded-full overflow-hidden bg-neutral-300 shadow-md mb-2">
                      <img src={getStorageUrl('sponsors/drkelly.jpg')} alt="Dr. Clinton W. Kelly III" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white text-[22px] font-semibold text-center">Dr. Clinton W. Kelly III</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-[284px] h-[284px] rounded-full overflow-hidden bg-neutral-300 shadow-md mb-2">
                      <img src={getStorageUrl('mentors/red-whittaker.jpg')} alt="Prof. Red Whittaker" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white text-[22px] font-semibold text-center">Prof. Red Whittaker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        

        
      </div>
    </section>
  );
}

export default SponsorMiddle;
