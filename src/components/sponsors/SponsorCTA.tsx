'use client';

import React from 'react';
import Image from 'next/image';
import placeholderImage from './picture4.png';

export function SponsorCTA() {
  return (
    <>
      {/* =============================== */}
      {/* FUEL OUR MISSION SECTION */}
      {/* =============================== */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold">Fuel Our Mission</h2>

          <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            We are deeply grateful for the partners who support our team and believe in our vision.
            The sponsorship tiers below highlight how various forms of support contribute to our success.
          </p>

          {/* Tier Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { tier: 'Tier 1', name: 'Support' },
              { tier: 'Tier 2', name: 'Launch' },
              { tier: 'Tier 3', name: 'Flight' },
              { tier: 'Tier 4', name: 'Command' },
            ].map((t) => (
              <div key={t.tier} className="flex flex-col items-center">
                <div className="relative w-[180px] h-[180px] mb-6">
                  <Image
                    src={placeholderImage}
                    alt={t.name}
                    fill
                    className="object-contain opacity-90"
                  />
                </div>
                <span className="text-white/50 text-sm mb-2">{t.tier}</span>
                <h3 className="text-2xl md:text-3xl font-semibold">{t.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== */}
{/* PERSONAL DONATIONS SECTION */}
{/* =============================== */}
<section className="w-full bg-black text-white py-28">
  <div className="max-w-7xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-6xl font-semibold">
      Personal Donations
    </h2>

    {/* Subtitle */}
    <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
      The following individuals have donated to the team, getting us one step closer to achieving our dream.
    </p>

    {/* Donor Grid */}
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/20">

      {/* Donor 1 */}
      <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 sm:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
        Red Whittaker
      </div>

      {/* Donor 2 */}
      <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
        Clint Kelly
      </div>

      {/* Donor 3 */}
      <div className="py-10 px-6 text-lg md:text-xl font-medium border-b lg:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
        Howie Choset
      </div>

      {/* Donor 4 */}
      <div className="py-10 px-6 text-lg md:text-xl font-medium bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
        Linda & Andrew Nelson
      </div>

    </div>

  </div>
</section>
    </>
  );
}

export default SponsorCTA;