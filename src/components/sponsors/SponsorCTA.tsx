'use client';

import React from 'react';
import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';

const shieldAiLogo = getStorageUrl('sponsors/shieldAI.png');
const sickLogo     = getStorageUrl('sponsors/sick.png');
const acmeLogo     = getStorageUrl('sponsors/acme.svg');
const synopsysLogo = getStorageUrl('sponsors/synopsys.png');
const xsensLogo    = 'https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/sponsors/xsens-logo-motion-capture-for-humanoids.jpg';

const sponsors = [
  { name: 'Shield AI',  desc: 'Donated $5,000 to help with material and building costs and provided equipment to support our mission.', logo: shieldAiLogo },
  { name: 'SICK',       desc: 'Provided sensors and technical support to help the team accelerate testing and integration.',            logo: sickLogo },
  { name: 'ACME',       desc: 'Supported our manufacturing pipeline and helped fund critical drivetrain components.',                   logo: acmeLogo },
  { name: 'Synopsys',   desc: 'Enabled outreach and documentation efforts that help us recruit and grow the team.',                     logo: synopsysLogo },
  { name: 'Xsens',      desc: 'Provided cutting-edge motion capture technology to support our robotics development and testing.',       logo: xsensLogo },
];

export function SponsorCTA() {
  return (
    <>
      {/* PERSONAL DONATIONS SECTION */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold">Personal Donations</h2>
          <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            The following individuals have donated to the team, getting us one step closer to achieving our dream.
          </p>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/20">
            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 sm:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">Red Whittaker</div>
            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">Clint Kelly</div>
            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b lg:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">Howie Choset</div>
            <div className="py-10 px-6 text-lg md:text-xl font-medium bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">Linda & Andrew Nelson</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SponsorCTA;