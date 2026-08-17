'use client';

import React from 'react';
import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';
import type { SponsorWithTier } from '@/lib/content';

const toprightImg  = getStorageUrl('sponsors/topright.png');
const topleftImg   = '/images/rover-sponsor-decals.jpg';
const actionImg    = getStorageUrl('sponsors/bottomleft.png');
const heroImg      = getStorageUrl('sponsors/Group 709.svg');
const bottomrightImg = '/images/clean-room-crew-arena.jpg';

interface SponsorMobileProps {
  corporateSponsors: SponsorWithTier[];
  individualDonors: SponsorWithTier[];
}

function CarouselCardWrapper({ url, name, children }: { url: string; name: string; children: React.ReactNode }) {
  if (!url || url === '#') return <>{children}</>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name}`} className="block">
      {children}
    </a>
  );
}

export function SponsorMobile({ corporateSponsors, individualDonors }: SponsorMobileProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Guard against empty sponsors array
  const safeIndex = corporateSponsors.length > 0 ? activeIndex % corporateSponsors.length : 0;
  const goPrev = () => {
    if (corporateSponsors.length === 0) return;
    setActiveIndex((i) => (i - 1 + corporateSponsors.length) % corporateSponsors.length);
  };
  const goNext = () => {
    if (corporateSponsors.length === 0) return;
    setActiveIndex((i) => (i + 1) % corporateSponsors.length);
  };

  return (
    <div className="w-full font-display text-starlight md:hidden">

      {/* ── MOBILE HERO ── */}
      <section className="relative w-full overflow-hidden" style={{ height: '674px' }}>
        <Image
          src={heroImg}
          alt="Sponsors hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
        <div className="absolute bottom-0 left-5 right-5 pb-8 z-10">
          <h1 className="text-[48px] font-semibold leading-[65px] text-starlight mb-2">
            Sponsorship
          </h1>
          <p className="text-base font-medium leading-[22px] text-moon-dust mb-4">
            This mission is made possible by the organizations that support our
            team and believe in the impact of our work.
          </p>
          <button className="bg-tartan text-starlight px-4 py-2 text-base rounded-sm hover:bg-supernova transition-all duration-300 font-semibold">
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* ── WHY SPONSOR US ── */}
      <section className="px-5 pt-6 pb-2">
        <h2 className="text-[36px] font-semibold leading-[49px] mb-2 text-starlight">Why Sponsor Us?</h2>
        <p className="text-[20px] font-normal leading-[27px] text-moon-dust mb-6">
          Technology is table stakes. Execution wins championships.
        </p>

        {/* Card 1 — topleft.png, image only */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={topleftImg} alt="Team member" fill className="object-cover" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ top: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ bottom: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
        </div>

        {/* Card 2 — topright.png with "Support Our Team" overlay */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={toprightImg} alt="Support our team" fill className="object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: '#33204F', mixBlendMode: 'color' }} aria-hidden />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(51,32,79,0.55) 17.4%, rgba(196,18,48,0.2) 69.53%, rgba(196,18,48,0) 103.76%)' }}
            />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute bottom-[24px] left-[29px] right-6 z-10">
            <p className="text-[28px] font-semibold text-starlight leading-[38px] mb-2">Support Our Team</p>
            <p className="text-base text-starlight/85 leading-[22px] mb-4">
              Setting the standard for student-led lunar robotics, building field-ready systems.
            </p>
            <button className="bg-tartan text-starlight px-4 py-2 text-base rounded-sm hover:bg-supernova transition-all duration-300 font-semibold">
              Donate to support us
            </button>
          </div>
        </div>

        {/* Card 3 — dashed "What we can offer" with bottomleft.png */}
        <div className="relative w-full h-[280px] mb-6">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ border: '1px dashed rgba(118,119,134,0.6)', background: 'linear-gradient(180deg, rgba(51,32,79,0.35) 0%, rgba(21,20,38,0.5) 100%)' }}
          >
            <Image src={actionImg} alt="Team in action" fill className="object-cover opacity-30" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute left-[33px] z-10" style={{ top: '32px' }}>
            <svg width="28" height="31" viewBox="0 0 28 31" fill="#F04455" className="mb-2 opacity-90">
              <path d="M14 0 L17 11 L28 13 L20 20 L22 31 L14 26 L6 31 L8 20 L0 13 L11 11 Z" />
            </svg>
            <p className="text-[28px] font-semibold text-starlight leading-[38px] mb-2">What we can offer</p>
            <p className="text-base text-moon-dust leading-[22px] mb-4">
              An interdisciplinary team across engineering, business, computer science and more.
            </p>
            <button className="bg-tartan text-starlight px-4 py-2 text-base rounded-sm hover:bg-supernova transition-all duration-300 font-semibold">
              View our sponsorship deck
            </button>
          </div>
        </div>

        {/* Card 4 — bottomright.png, image only */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={bottomrightImg} alt="Team at work" fill className="object-cover" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ top: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ bottom: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
        </div>
      </section>

      {/* ── THOSE WHO MADE OUR MISSION POSSIBLE ── */}
      <section className="px-5 pt-10 text-center">
        <h2 className="text-[36px] font-semibold leading-[49px] text-starlight">Those Who Made Our</h2>
        <h2 className="text-[36px] font-semibold leading-[49px] mb-4 text-starlight">Mission Possible</h2>
        <p className="text-[20px] font-normal text-moon-dust leading-[27px]">
          With your support, we are able to get closer to our goals.
        </p>
      </section>

      {/* ── SPONSOR CAROUSEL ── */}
      <section className="pt-8 pb-4">
        <div className="px-5">
          {corporateSponsors.length > 0 ? (
            <div className="relative">
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-titanium/40 text-starlight hover:border-supernova/70 transition flex items-center justify-center bg-deep-space/60 backdrop-blur-sm text-xl leading-none"
                aria-label="Previous sponsor"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-titanium/40 text-starlight hover:border-supernova/70 transition flex items-center justify-center bg-deep-space/60 backdrop-blur-sm text-xl leading-none"
                aria-label="Next sponsor"
              >
                ›
              </button>
              <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
              <div className="absolute w-[27px] h-[27px] bg-void z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
              <CarouselCardWrapper url={corporateSponsors[safeIndex].url} name={corporateSponsors[safeIndex].name}>
              <div
                className="w-full overflow-hidden flex flex-col"
                style={{
                  background: 'linear-gradient(0deg, rgba(21,20,38,0.85) 0%, rgba(51,32,79,0.45) 100%)',
                  border: '0.886px dashed rgba(118,119,134,0.5)',
                  minHeight: '397px',
                  padding: '40px 30px 30px',
                }}
              >
                {/* Logo */}
                <div className="flex items-center justify-center mb-8" style={{ height: '100px' }}>
                  <div className="relative w-[262px] h-[78px] flex items-center justify-center">
                    {corporateSponsors[safeIndex].logo ? (
                      <Image
                        src={corporateSponsors[safeIndex].logo}
                        alt={`${corporateSponsors[safeIndex].name} logo`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="text-starlight text-2xl font-bold opacity-60 tracking-wider select-none">
                        {corporateSponsors[safeIndex].name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <span
                    className="inline-flex items-center justify-center text-starlight text-[12px] font-semibold self-start"
                    style={{ border: '0.886px solid rgba(240,68,85,0.6)', borderRadius: '17.7px', padding: '7px 14px' }}
                  >
                    {corporateSponsors[safeIndex].tierName}
                  </span>
                  <p className="text-[32px] font-semibold text-starlight leading-[43px]">{corporateSponsors[safeIndex].name}</p>
                  <p className="text-[14px] text-moon-dust leading-[19px]">{corporateSponsors[safeIndex].blurb}</p>
                </div>
              </div>
              </CarouselCardWrapper>
            </div>
          ) : (
            <p className="text-center text-moon-dust/60 text-lg py-8">Sponsors coming soon.</p>
          )}
        </div>

        {/* Dots */}
        {corporateSponsors.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {corporateSponsors.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  height: '14px',
                  width: i === safeIndex ? '55px' : '14px',
                  background: i === safeIndex ? '#F04455' : 'rgba(118,119,134,0.4)',
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── LAUNCH ── */}
      <section className="py-16 flex flex-col items-center">
        <div className="relative mb-6" style={{ width: '175px', height: '175px' }}>
          <div className="absolute inset-0 rounded-full" style={{ border: '1px dashed rgba(118,119,134,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '96px', height: '96px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px dashed rgba(118,119,134,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '28px', right: '-4px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#F04455 0%,#33204F 100%)', border: '1px solid rgba(118,119,134,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '17px', height: '17px', bottom: '-8px', left: '49px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#F04455 0%,#33204F 100%)', border: '1px solid rgba(118,119,134,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '83px', left: '23px', background: 'linear-gradient(180deg,#151426 50%,#767786 335.15%)', border: '1px solid rgba(118,119,134,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '90px', right: '-4px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#F04455 0%,#33204F 100%)', border: '1px solid rgba(118,119,134,0.75)' }} />
        </div>
        <p className="text-[54px] font-semibold text-starlight leading-[73px] font-tech tracking-[0.15em]">LAUNCH</p>
      </section>

      {/* ── PERSONAL DONATIONS ── */}
      <section className="px-5 pt-10 pb-6 text-center">
        <h2 className="text-[36px] font-semibold leading-[49px] mb-3 text-starlight">Personal Donations</h2>
        <p className="text-[20px] font-normal text-moon-dust leading-[27px] mb-6">
          The following individuals have donated to the team, getting us one step closer to achieving our dream.
        </p>
        {individualDonors.length > 0 ? (
          <div className="grid grid-cols-2">
            {individualDonors.map((donor) => {
              const cell = (
                <div
                  className="py-4 px-2 flex items-center justify-center"
                  style={{ border: '1px solid rgba(118,119,134,0.5)', background: 'linear-gradient(0deg, rgba(21,20,38,0.85) 50%, rgba(51,32,79,0.6) 335.15%)', height: '55px' }}
                >
                  <p className="text-[16px] font-medium text-starlight text-center leading-[22px]">{donor.name}</p>
                </div>
              );
              return donor.url && donor.url !== '#' ? (
                <a key={donor.name} href={donor.url} target="_blank" rel="noopener noreferrer">
                  {cell}
                </a>
              ) : (
                <React.Fragment key={donor.name}>{cell}</React.Fragment>
              );
            })}
          </div>
        ) : (
          <p className="text-moon-dust/60 text-lg">Individual donors coming soon.</p>
        )}
      </section>

    </div>
  );
}