'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStorageUrl } from '@/lib/supabase';
import type { SponsorWithTier } from '@/lib/content';

const topLeftImg     = '/images/rover-sponsor-decals.jpg';
const bottomRightImg = '/images/clean-room-crew-arena.jpg';
const topRightImg    = getStorageUrl('sponsors/topright.png');
const bottomLeftImg  = getStorageUrl('sponsors/bottomleft.png');
const sponsorsGraphic = '/images/mm_2026_sponsors.jpg';

interface SponsorMiddleProps {
  corporateSponsors: SponsorWithTier[];
}

export default function SponsorMiddle({ corporateSponsors }: SponsorMiddleProps) {
  return (
    <>
      {/* Sponsors Graphic SECTION */}
      <section className="w-full text-starlight py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-starlight">
            Those Who Made Our Mission Possible
          </h2>
          <p className="mt-3 text-moon-dust/80 text-lg md:text-xl">
            Our 2026 Sponsors
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center py-8">
          <div
            className="inline-block w-full max-w-4xl overflow-hidden border border-titanium/30"
            style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
          >
            <Image
              src={sponsorsGraphic}
              alt="Sponsors graphic"
              width={1000}
              height={400}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>
      </section>

      {/* WHY SPONSOR US */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-starlight text-4xl md:text-4xl font-semibold mb-6">
            Why Sponsor Us?
          </h2>
          <p className="text-moon-dust text-lg md:text-xl leading-relaxed">
            Building robots for the Moon takes more than great tech—it’s about the drive to test, learn, and adapt faster than the competition.
            We value hands-on execution, rapid iteration, and a willingness to push boundaries.
            Every experiment, every lesson learned, brings us closer to success.
       
          </p>
        </div>
      </section>

      {/* IMAGE GRID SECTION */}
      <section className="w-full text-starlight py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-6 items-stretch mb-8">
            <div className="col-span-12 md:col-span-4">
              <div
                className="relative w-full h-[320px] md:h-[360px] overflow-hidden border border-titanium/30"
                style={{ clipPath: 'polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)' }}
              >
                <Image src={topLeftImg} alt="Sponsor decals on the rover chassis" fill className="object-cover" priority />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div
                className="relative w-full min-h-[320px] md:min-h-[360px] overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#151426 0%,#33204F 55%,rgba(196,18,48,0.65) 100%)' }}
              >
                <Image src={topRightImg} alt="Support Our Team graphic" fill quality={100} className="object-cover opacity-95" priority />
                {/* Recolor the baked-in blue artwork toward cosmic plum */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: '#33204F', mixBlendMode: 'color' }} aria-hidden />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(21,20,38,0.5) 0%, rgba(51,32,79,0.35) 55%, rgba(196,18,48,0.4) 100%)' }} aria-hidden />
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-3xl px-6 py-8 md:pl-12 md:pr-6">
                    <h3 className="text-4xl md:text-5xl font-semibold text-starlight drop-shadow-lg">Support Our Team</h3>
                    <p className="text-starlight/85 mt-4 text-base md:text-lg max-w-xl leading-relaxed">
                      Support the mission to design, manufacture, and deploy field-ready lunar robotics as we represent Carnegie Mellon University on the national stage at NASA Lunabotics.
                    </p>
                    <Link href="/about" className="inline-block mt-6 bg-tartan text-starlight font-semibold px-6 py-3 rounded-none hover:bg-supernova transition-all duration-200">
                      Learn more about our mission →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 items-stretch">
            <div className="col-span-12 lg:col-span-8">
              <div
                className="relative w-full min-h-[320px] overflow-hidden border border-dashed border-titanium/50"
                style={{ background: 'linear-gradient(180deg, rgba(21,20,38,0.95), rgba(9,10,18,0.95))' }}
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Image src={bottomLeftImg} alt="" fill className="object-cover" style={{ objectPosition: 'center' }} />
                </div>
                <div className="relative z-10 h-full flex items-center">
                  <div className="px-6 md:px-12 py-8 max-w-3xl">
                    {/* <div className="mb-6">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2 L14 9 L21 10 L16 14 L17 21 L12 17 L7 21 L8 14 L3 10 L10 9 Z" fill="#F04455" opacity="0.95" />
                      </svg>
                    </div> */}
                    <h3 className="text-4xl md:text-5xl font-semibold text-starlight leading-tight mb-4">What We Can Offer</h3>
                    <p className="text-moon-dust text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                      Our sponsorship tiers offer a range of strategic benefits, from brand visibility via logo placement and newsletters to exclusive recruiting access, prominent features in our documentary and more.
                    </p>
                    <Link href="mailto:moonminers@cmu.edu" className="inline-block border border-titanium/50 text-starlight px-6 py-3 rounded-none bg-transparent hover:border-supernova/70 hover:bg-supernova/10 transition-all duration-200">
                      Contact Us →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div
                className="relative w-full h-[320px] overflow-hidden border border-titanium/30"
                style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
              >
                <Image src={bottomRightImg} alt="Pit crew in clean-room suits at the competition arena" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIER HEADER SECTION */}
      {/* <section className="w-full text-starlight py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-starlight">
            Those Who Made Our Mission Possible
          </h2>
        </div>
      </section> */}

      {/* CAROUSEL SECTION */}
      {/* <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6">
          {corporateSponsors.length > 0 ? (
            <SponsorCarousel sponsors={corporateSponsors} />
          ) : (
            <p className="text-center text-moon-dust/60 text-lg">Sponsors coming soon.</p>
          )}
        </div>
      </section> */}
    </>
  );
}

function SponsorCarousel({ sponsors }: { sponsors: SponsorWithTier[] }) {
  const [index, setIndex] = React.useState(0);
  const goPrev = () => setIndex((i) => (i - 1 + sponsors.length) % sponsors.length);
  const goNext = () => setIndex((i) => (i + 1) % sponsors.length);
  const goTo   = (i: number) => setIndex(i);

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(calc(50% - ${(index + 0.5) * 100}%))` }}
        >
          {sponsors.map((s, i) => (
            <div key={`${s.name}-${i}`} className="shrink-0 w-full px-6" aria-hidden={i !== index}>
              <SponsorCard name={s.name} description={s.blurb} logo={s.logo} url={s.url} isActive={i === index} />
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-titanium/40 text-starlight hover:border-supernova/70 hover:text-starlight transition flex items-center justify-center bg-deep-space/60 backdrop-blur-sm" aria-label="Previous sponsor">‹</button>
      <button type="button" onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-titanium/40 text-starlight hover:border-supernova/70 hover:text-starlight transition flex items-center justify-center bg-deep-space/60 backdrop-blur-sm" aria-label="Next sponsor">›</button>

      <div className="mt-10 flex items-center justify-center gap-3">
        {sponsors.map((_, i) => (
          <button key={i} type="button" onClick={() => goTo(i)}
            className={['h-2.5 rounded-full transition-all', i === index ? 'w-10 bg-supernova' : 'w-2.5 bg-titanium/40 hover:bg-titanium/70'].join(' ')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function SponsorCard({ name, description, logo, url, isActive }: { name: string; description: string; logo: string; url: string; isActive: boolean }) {
  const isLinked = Boolean(url && url !== '#');
  const card = (
    <div className={['relative w-full h-[380px] md:h-[420px] overflow-hidden', 'border border-dashed border-titanium/40', 'bg-gradient-to-br from-deep-space via-void to-void', 'shadow-[0_0_60px_rgba(9,10,18,0.7)]', isActive ? 'opacity-100' : 'opacity-45', isLinked ? 'transition-colors hover:border-supernova/60 cursor-pointer' : ''].join(' ')}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(51,32,79,0.35),rgba(9,10,18,0.75))]" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[340px] md:w-[520px] h-[180px] md:h-[260px] flex items-center justify-center">
          {logo ? (
            <Image src={logo} alt={`${name} logo`} fill className="object-contain" style={{ mixBlendMode: 'screen' }} />
          ) : (
            <div className="text-starlight text-3xl font-bold opacity-60 tracking-wider select-none">{name}</div>
          )}
        </div>
      </div>
      <div className="absolute left-8 bottom-8 right-8 md:right-auto md:w-[520px]">
        <h3 className="text-starlight text-4xl md:text-5xl font-semibold leading-tight whitespace-nowrap">{name}</h3>
        <p className="mt-3 text-moon-dust text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );

  if (!isLinked) return card;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`} className="block">
      {card}
    </a>
  );
}
