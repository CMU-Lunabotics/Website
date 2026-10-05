'use client';

import Image from 'next/image';
import type { MarqueeSponsor } from '@/lib/content';

const CLIP =
  'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))';

function isLinked(url: string | undefined): boolean {
  return Boolean(url && url.trim() !== '' && url !== '#');
}

function LogoCell({ sponsor }: { sponsor: MarqueeSponsor }) {
  const inner = (
    <div className="flex h-[140px] md:h-[180px] items-center justify-center bg-void px-4">
      {sponsor.logo ? (
        <div className="relative h-[72%] w-full">
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 280px, 33vw"
          />
        </div>
      ) : (
        <span className="text-sm text-moon-dust">{sponsor.name}</span>
      )}
    </div>
  );

  if (!isLinked(sponsor.url)) return inner;

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-supernova"
    >
      {inner}
    </a>
  );
}

interface SponsorLogoMarqueeProps {
  sponsors: MarqueeSponsor[];
}

export function SponsorLogoMarquee({ sponsors }: SponsorLogoMarqueeProps) {
  if (sponsors.length === 0) {
    return <p className="text-center text-moon-dust/60">Sponsors coming soon.</p>;
  }

  const loop = [...sponsors, ...sponsors];
  const n = sponsors.length;

  return (
    <div
      className="sponsor-marquee-viewport inline-block w-full max-w-4xl overflow-hidden border border-titanium/30"
      style={{ clipPath: CLIP }}
    >
      <div
        className="sponsor-marquee-track flex"
        style={{ width: `${((n * 2) / 3) * 100}%` }}
      >
        {loop.map((sponsor, i) => (
          <div
            key={`${sponsor.name}-${i}`}
            className="shrink-0"
            style={{ width: `${100 / (n * 2)}%` }}
            aria-hidden={i >= n}
          >
            <LogoCell sponsor={sponsor} />
          </div>
        ))}
      </div>
    </div>
  );
}
