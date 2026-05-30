'use client';

import React from 'react';
import type { SponsorWithTier } from '@/lib/content';

interface SponsorCTAProps {
  individualDonors: SponsorWithTier[];
}

export function SponsorCTA({ individualDonors }: SponsorCTAProps) {
  return (
    <>
      {/* PERSONAL DONATIONS SECTION */}
      <section className="w-full bg-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold">Personal Sponsors</h2>
          <p className="mt-6 text-white/75 text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            The following individuals have donated to the team, getting us one step closer to achieving our dream.
          </p>
          {individualDonors.length > 0 ? (
            <div
              className="mt-16 grid border border-white/20"
              style={{
                gridTemplateColumns: `repeat(${Math.min(individualDonors.length, 5)}, minmax(0, 1fr))`,
              }}
            >
              {individualDonors.map((donor, i) => (
                <div
                  key={donor.name}
                  className={[
                    'py-10 px-6 text-lg md:text-xl font-medium flex items-center justify-center',
                    'bg-gradient-to-b from-neutral-900 to-black hover:bg-neutral-800/40 transition',
                    // Add right border to all except last
                    i < individualDonors.length - 1 ? 'border-r border-white/20' : '',
                  ].join(' ')}
                >
                  {donor.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-16 text-white/50 text-lg">Individual donors coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default SponsorCTA;
