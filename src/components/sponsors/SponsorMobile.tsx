'use client';

import React from 'react';
import Image from 'next/image';
import { getStorageUrl } from '@/lib/supabase';

const shieldAiLogo = getStorageUrl('sponsors/shieldAI.png');
const sickLogo     = getStorageUrl('sponsors/sick.png');
const acmeLogo     = getStorageUrl('sponsors/acme.svg');
const synopsysLogo = getStorageUrl('sponsors/synopsys.png');
const xsensLogo    = getStorageUrl('sponsors/xsens-logo-motion-capture-for-humanoids.jpg');
const toprightImg  = getStorageUrl('sponsors/topright.png');
const topleftImg   = getStorageUrl('sponsors/topleft.png');
const actionImg    = getStorageUrl('sponsors/bottomleft.png');
const heroImg      = getStorageUrl('sponsors/Group 709.svg');
const bottomrightImg = 'https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/sponsors/bottomright.png';

const sponsors = [
  { tag: 'Milestone', name: 'Shield AI',  desc: 'Donated $5,000 to help with material and building costs and provided equipment to support our mission.', logo: shieldAiLogo },
  { tag: 'Milestone', name: 'SICK',       desc: 'Provided sensors and technical support to help the team accelerate testing and integration.',            logo: sickLogo },
  { tag: 'Milestone', name: 'ACME',       desc: 'Supported our manufacturing pipeline and helped fund critical drivetrain components.',                   logo: acmeLogo },
  { tag: 'Milestone', name: 'Synopsys',   desc: 'Enabled outreach and documentation efforts that help us recruit and grow the team.',                     logo: synopsysLogo },
  { tag: 'Milestone', name: 'Xsens',      desc: 'Provided cutting-edge motion capture technology to support our robotics development and testing.',       logo: xsensLogo },
];

export function SponsorMobile() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="bg-black w-full font-display text-white md:hidden">

      {/* ── MOBILE HERO ── */}
      <section className="relative w-full bg-black overflow-hidden" style={{ height: '674px' }}>
        <Image
          src={heroImg}
          alt="Sponsors hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-5 right-5 pb-8 z-10">
          <h1 className="text-[48px] font-semibold leading-[65px] text-white mb-2">
            Sponsorship
          </h1>
          <p className="text-base font-medium leading-[22px] text-white mb-4">
            This mission is made possible by the organizations that support our
            team and believe in the impact of our work.
          </p>
          <button className="border border-[#F1EDE6] text-white px-4 py-2 text-base rounded-sm hover:bg-white hover:text-black transition-all duration-300">
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* ── WHY SPONSOR US ── */}
      <section className="px-5 pt-6 pb-2">
        <h2 className="text-[36px] font-semibold leading-[49px] mb-2">Why Sponsor Us?</h2>
        <p className="text-[20px] font-normal leading-[27px] text-white mb-6">
          Technology is table stakes. Execution wins championships.
        </p>

        {/* Card 1 — topleft.png, image only */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={topleftImg} alt="Team member" fill className="object-cover" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ top: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ bottom: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
        </div>

        {/* Card 2 — topright.png with "Support Our Team" overlay */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={toprightImg} alt="Support our team" fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(2,16,253,0.36) 17.4%, rgba(163,150,150,0.36) 69.53%, rgba(163,150,150,0) 103.76%)' }}
            />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute bottom-[24px] left-[29px] right-6 z-10">
            <p className="text-[28px] font-semibold text-[#F1EDE6] leading-[38px] mb-2">Support Our Team</p>
            <p className="text-base text-[#F1EDE6] leading-[22px] mb-4">
              Setting the standard for student-led lunar robotics, building field-ready systems.
            </p>
            <button className="border border-[#F1EDE6] text-[#F1EDE6] px-4 py-2 text-base rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              Donate to support us
            </button>
          </div>
        </div>

        {/* Card 3 — dashed "What we can offer" with bottomleft.png */}
        <div className="relative w-full h-[280px] mb-6">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ border: '1px dashed #888888', background: 'linear-gradient(180deg, rgba(240,240,240,0.14) 0%, rgba(115,115,115,0.14) 100%)' }}
          >
            <Image src={actionImg} alt="Team in action" fill className="object-cover opacity-30" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute left-[33px] z-10" style={{ top: '32px' }}>
            <svg width="28" height="31" viewBox="0 0 28 31" fill="white" className="mb-2 opacity-90">
              <path d="M14 0 L17 11 L28 13 L20 20 L22 31 L14 26 L6 31 L8 20 L0 13 L11 11 Z" />
            </svg>
            <p className="text-[28px] font-semibold text-white leading-[38px] mb-2">What we can offer</p>
            <p className="text-base text-white leading-[22px] mb-4">
              An interdisciplinary team across engineering, business, computer science and more.
            </p>
            <button className="border border-[#F1EDE6] text-white px-4 py-2 text-base rounded-sm hover:bg-white hover:text-black transition-all duration-300">
              View our sponsorship deck
            </button>
          </div>
        </div>

        {/* Card 4 — bottomright.png, image only */}
        <div className="relative w-full h-[280px] mb-6">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={bottomrightImg} alt="Team at work" fill className="object-cover" />
          </div>
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ top: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
          <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ bottom: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
        </div>
      </section>

      {/* ── THOSE WHO MADE OUR MISSION POSSIBLE ── */}
      <section className="px-5 pt-10 text-center">
        <h2 className="text-[36px] font-semibold leading-[49px]">Those Who Made Our</h2>
        <h2 className="text-[36px] font-semibold leading-[49px] mb-4">Mission Possible</h2>
        <p className="text-[20px] font-normal text-white leading-[27px]">
          With your support, we are able to get closer to our goals.
        </p>
      </section>

      {/* ── SPONSOR CAROUSEL ── */}
      <section className="pt-8 pb-4">
        <div className="px-5">
          <div className="relative">
            <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ bottom: '-13px', left: '-13px', transform: 'rotate(-45deg)' }} />
            <div className="absolute w-[27px] h-[27px] bg-black z-10" style={{ top: '-13px', right: '-13px', transform: 'rotate(-45deg)' }} />
            <div
              className="w-full overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(0deg, rgba(30,30,30,0.54) 0%, rgba(132,132,132,0.3) 100%)',
                border: '0.886px dashed rgba(255,255,255,0.25)',
                minHeight: '397px',
                padding: '40px 30px 30px',
              }}
            >
              {/* Logo */}
              <div className="flex items-center justify-center mb-8" style={{ height: '100px' }}>
                <div className="relative w-[262px] h-[78px]">
                  <Image
                    src={sponsors[activeIndex].logo}
                    alt={`${sponsors[activeIndex].name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <span
                  className="inline-flex items-center justify-center text-white text-[12px] font-semibold self-start"
                  style={{ border: '0.886px solid #999999', borderRadius: '17.7px', padding: '7px 14px' }}
                >
                  {sponsors[activeIndex].tag}
                </span>
                <p className="text-[32px] font-semibold text-white leading-[43px]">{sponsors[activeIndex].name}</p>
                <p className="text-[14px] text-white/75 leading-[19px]">{sponsors[activeIndex].desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {sponsors.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: '14px',
                width: i === activeIndex ? '55px' : '14px',
                background: i === activeIndex ? '#D9D9D9' : 'rgba(217,217,217,0.3)',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── LAUNCH ── */}
      <section className="py-16 flex flex-col items-center">
        <div className="relative mb-6" style={{ width: '175px', height: '175px' }}>
          <div className="absolute inset-0 rounded-full" style={{ border: '1px dashed rgba(163,150,150,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '96px', height: '96px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: '1px dashed rgba(163,150,150,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '28px', right: '-4px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#0210FD 0%,#A39696 100%)', border: '1px solid rgba(163,150,150,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '17px', height: '17px', bottom: '-8px', left: '49px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#0210FD 0%,#A39696 100%)', border: '1px solid rgba(163,150,150,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '83px', left: '23px', background: 'linear-gradient(180deg,#1E1E1E 50%,#848484 335.15%)', border: '1px solid rgba(163,150,150,0.75)' }} />
          <div className="absolute rounded-full" style={{ width: '9px', height: '9px', top: '90px', right: '-4px', background: 'linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#0210FD 0%,#A39696 100%)', border: '1px solid rgba(163,150,150,0.75)' }} />
        </div>
        <p className="text-[54px] font-semibold text-white leading-[73px]">LAUNCH</p>
      </section>

      {/* ── PERSONAL DONATIONS ── */}
      <section className="px-5 pt-10 pb-6 text-center">
        <h2 className="text-[36px] font-semibold leading-[49px] mb-3">Personal Donations</h2>
        <p className="text-[20px] font-normal text-white leading-[27px] mb-6">
          The following individuals have donated to the team, getting us one step closer to achieving our dream.
        </p>
        <div className="grid grid-cols-2">
          {['Red Whittaker', 'Clint Kelly', 'Howie Choset', 'Linda & Andrew Nelson'].map((name) => (
            <div
              key={name}
              className="py-4 px-2 flex items-center justify-center"
              style={{ border: '1px solid #686868', background: 'linear-gradient(0deg, rgba(30,30,30,0.56) 50%, rgba(132,132,132,0.56) 335.15%)', height: '55px' }}
            >
              <p className="text-[16px] font-medium text-white text-center leading-[22px]">{name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}