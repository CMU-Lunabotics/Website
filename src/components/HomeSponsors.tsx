'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Sponsors } from '@/lib/content';

interface HomeSponsorsProps {
  sponsors: Sponsors;
}

const desiredOrder = [
  'sponsors/drkelly.jpg',
  'mentors/wenshan.jpeg',
  'mentors/red-whittaker.jpg',
  'sponsors/choset.jpg',
];

function getPathSuffix(url: string) {
  return url.replace(/^.*\/images\//, '').replace(/^.*\/media\//, '');
}

export function HomeSponsors({ sponsors }: HomeSponsorsProps) {
  const logos = sponsors.sponsors;
  const ordered = desiredOrder
    .map((path) => logos.find((s) => getPathSuffix(s.logo) === path))
    .filter(Boolean) as typeof logos;
  const slots = ordered.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // show 3 at a time (Figma)
  const maxIndex = Math.max(0, slots.length - visibleCount);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  return (
    <section className="py-16">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header: title + subtitle centered, "View all" top-right */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div className="w-16 flex-shrink-0" aria-hidden />
          <div className="flex-1 flex flex-col items-center justify-center text-center min-w-0">
            <h2 className="text-4xl font-bold text-starlight">Meet some of our Sponsors</h2>
            <p className="mt-2 text-lg text-moon-dust">Learn more about those supporting us!</p>
          </div>
          <div className="w-16 flex-shrink-0 flex justify-end">
            <Link
              href="/sponsors"
              className="text-sm text-moon-dust hover:text-supernova underline underline-offset-2 whitespace-nowrap transition-colors"
            >
              View all 
            </Link>
          </div>
        </div>

        {/* Carousel: arrows + sponsor cards */}
        <div className="flex items-center justify-center gap-4 md:gap-2">
          {/* Left arrow */}
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex-shrink-0 w-12 h-12 border rounded-full border-titanium/40 bg-deep-space/60 flex items-center justify-center text-starlight hover:border-supernova/70 hover:bg-supernova/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Previous sponsors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Visible window of sponsor cards (3 at a time) */}
          <div className="flex-1 min-w-0 overflow-hidden relative">
            {/* Left edge shadow (Figma: gradient fade on leftmost card) */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 md:w-28 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(9,10,18,0.9) 0%, rgba(9,10,18,0) 100%)',
              }}
              aria-hidden
            />
            {/* Right edge shadow (Figma: gradient fade on rightmost card) */}
            <div
              className="absolute right-0 top-0 bottom-0 w-20 md:w-28 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(9,10,18,0.9) 0%, rgba(9,10,18,0) 100%)',
              }}
              aria-hidden
            />
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                width: `${(slots.length / visibleCount) * 100}%`,
                transform: `translateX(-${(currentIndex / slots.length) * 100}%)`,
              }}
            >
              {slots.map((sponsor, idx) => (
                <div
                  key={sponsor ? `${sponsor.name}-${idx}` : `slot-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center px-0"
                  style={{ width: `${100 / slots.length}%` }}
                >
                  {!sponsor ? (
                    <div
                      className="w-full max-w-[420px] aspect-[5/3] bg-deep-space/80 flex items-center justify-center border border-dotted border-titanium/40"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
                    >
                      <span className="text-sm text-moon-dust/60">Sponsor slot</span>
                    </div>
                  ) : (
                    <a
                      href={sponsor.url || '#'}
                      target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                      rel={sponsor.url && sponsor.url !== '#' ? 'noopener noreferrer' : undefined}
                      className="block w-full max-w-[420px] aspect-[5/3] bg-deep-space/80 overflow-hidden flex items-center justify-center p-6 hover:bg-plum/40 hover:border-supernova/50 transition-colors border border-titanium/40"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        {sponsor.logo ? (
                          <Image
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            fill
                            className="object-contain"
                            sizes="420px"
                          />
                        ) : (
                          <span className="text-starlight text-lg font-semibold">{sponsor.name}</span>
                        )}
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-titanium/40 bg-deep-space/60 flex items-center justify-center text-starlight hover:border-supernova/70 hover:bg-supernova/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            aria-label="Next sponsors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
