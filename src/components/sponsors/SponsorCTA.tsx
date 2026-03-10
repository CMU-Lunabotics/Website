'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStorageUrl } from '@/lib/supabase';

const tiers = [
  { image: getStorageUrl('sponsors/tier1photo.png'), alt: 'Tier 1 sponsorship graphic' },
  { image: getStorageUrl('sponsors/tier2photo.png'), alt: 'Tier 2 sponsorship graphic' },
  { image: getStorageUrl('sponsors/tier3photo.png'), alt: 'Tier 3 sponsorship graphic' },
  { image: getStorageUrl('sponsors/tier4photo.png'), alt: 'Tier 4 sponsorship graphic' },
];

export function SponsorCTA() {
  return (
    <>
      {/* =============================== */}
      {/* FUEL OUR MISSION SECTION */}
      {/* =============================== */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-6xl font-semibold">
            Fuel Our Mission
          </h2>

          <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            We are deeply grateful for the partners who support our team and believe in our vision.
            The sponsorship tiers below highlight how various forms of support contribute to our success.
          </p>

          {/* Tier Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((t, i) => (
              <div
                key={i}
                className="border border-white/15 bg-gradient-to-b from-neutral-900 to-black overflow-hidden"
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Learn more bar */}
          <div className="mt-14">
            <Link
              href="#"
              className="block w-full border border-white/70 px-6 py-5 text-lg md:text-2xl text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              Learn more about our sponsorship packages →
            </Link>
          </div>

        </div>
      </section>

      {/* =============================== */}
      {/* PERSONAL DONATIONS SECTION */}
      {/* =============================== */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-6xl font-semibold">
            Personal Donations
          </h2>

          <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            The following individuals have donated to the team, getting us one step closer to achieving our dream.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/20">

            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 sm:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
              Red Whittaker
            </div>

            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b sm:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
              Clint Kelly
            </div>

            <div className="py-10 px-6 text-lg md:text-xl font-medium border-b lg:border-b-0 lg:border-r border-white/20 bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition">
              Howie Choset
            </div>

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