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
      <section className="w-full text-starlight py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold text-starlight">Personal Sponsors</h2>
          <p className="mt-6 text-moon-dust text-base md:text-xl max-w-4xl mx-auto leading-relaxed">
            The following individuals have donated to the team, getting us one step closer to achieving our dream.
          </p>
          {individualDonors.length > 0 ? (
            <div
              className="mt-16 grid border border-titanium/30"
              style={{
                gridTemplateColumns: `repeat(${Math.min(individualDonors.length, 5)}, minmax(0, 1fr))`,
              }}
            >
              {individualDonors.map((donor, i) => {
                const isLinked = donor.url && donor.url !== '#';
                const cellClass = [
                  'py-10 px-6 text-lg md:text-xl font-medium flex items-center justify-center',
                  'bg-gradient-to-b from-deep-space to-void hover:from-plum/40 transition text-starlight',
                  // Add right border to all except last
                  i < individualDonors.length - 1 ? 'border-r border-titanium/30' : '',
                ].join(' ');
                return isLinked ? (
                  <a
                    key={donor.name}
                    href={donor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cellClass} hover:text-supernova`}
                  >
                    {donor.name}
                  </a>
                ) : (
                  <div key={donor.name} className={cellClass}>
                    {donor.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-16 text-moon-dust/60 text-lg">Individuals coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default SponsorCTA;
