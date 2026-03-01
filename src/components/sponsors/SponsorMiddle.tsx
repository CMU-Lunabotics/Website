'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

/*
  Local images in the SAME folder as this file.
*/
import topLeftImg from './picture1.png';
import orbitPicture from './picture2.png';
import placeholderLogo from './picture3.png';

type SponsorSlide = {
  tier: string;
  name: string;
  description: string;
  logo: StaticImageData;
};

export default function SponsorGrid() {
  return (
    <>
      {/* ========================= */}
      {/* IMAGE GRID SECTION */}
      {/* ========================= */}
      <section className="w-full bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* ---------- TOP ROW ---------- */}
          <div className="grid grid-cols-12 gap-6 items-stretch mb-8">
            {/* left image */}
            <div className="col-span-12 md:col-span-4">
              <div className="relative w-full h-[320px] md:h-[360px] overflow-hidden border border-gray-800">
                <Image
                  src={topLeftImg}
                  alt="Workshop photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* right hero */}
            <div className="col-span-12 md:col-span-8">
              <div
                className="relative w-full h-[320px] md:h-[360px] overflow-hidden"
                style={{
                  background:
                    'linear-gradient(180deg,#2238f6 0%,#6e4fe8 60%,rgba(48,47,52,0.7) 100%)',
                }}
              >
                <Image
                  src={topLeftImg}
                  alt="Support Our Team graphic"
                  fill
                  className="object-cover opacity-95"
                  priority
                />

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-3xl pl-8 md:pl-12 pr-6">
                    <h3 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">
                      Support Our Team
                    </h3>

                    <p className="text-gray-200 mt-4 text-base md:text-lg max-w-xl leading-relaxed">
                      Support the mission to design, manufacture, and deploy
                      field-ready lunar robotics as we represent Carnegie Mellon
                      University on the national stage at NASA Lunabotics.
                    </p>

                    <Link
                      href="#"
                      className="inline-block mt-6 border border-white text-white px-6 py-3 rounded-none bg-transparent hover:bg-white hover:text-black transition-all duration-200"
                    >
                      Learn more about our mission →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- BOTTOM ROW ---------- */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {/* left: big dark card with dashed border */}
            <div className="col-span-12 lg:col-span-8">
              <div
                className="relative w-full h-[320px] overflow-hidden border border-dashed border-gray-600"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(20,20,20,0.95), rgba(18,18,18,0.95))',
                }}
              >
                {/* subtle texture/pattern (using your same image as placeholder background) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Image
                    src={topLeftImg}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>

                <div className="relative z-10 h-full flex items-center">
                  <div className="px-8 md:px-12 py-8 max-w-3xl">
                    <div className="mb-6">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2 L14 9 L21 10 L16 14 L17 21 L12 17 L7 21 L8 14 L3 10 L10 9 Z"
                          fill="white"
                          opacity="0.95"
                        />
                      </svg>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
                      What We Can Offer
                    </h3>

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                      Our sponsorship tiers offer a range of strategic benefits,
                      from brand visibility via logo placement and newsletters to
                      exclusive recruiting access, prominent features in our
                      documentary and more.
                    </p>

                    <Link
                      href="#"
                      className="inline-block border border-white text-white px-6 py-3 rounded-none bg-transparent hover:bg-white hover:text-black transition-all duration-200"
                    >
                      View full sponsorship package →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* right: small image */}
            <div className="col-span-12 lg:col-span-4">
              <div className="relative w-full h-[320px] overflow-hidden border border-gray-800">
                <Image
                  src={topLeftImg}
                  alt="Team workshop photo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* TIER HEADER SECTION */}
      {/* ========================= */}
      <section className="w-full bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Those Who Made Our Mission Possible
          </h2>

          <p className="mt-5 text-base md:text-xl text-white/75">
            With your support, whether monetary or non-monetary, we are able to get closer to our goals.
          </p>

          <div className="mt-8">
            <Image
              src={orbitPicture}
              alt="Orbit graphic"
              width={500}
              height={300}
              className="mx-auto w-[280px] md:w-[380px] h-auto"
            />
          </div>

          <div className="mt-12">
            <div className="text-6xl md:text-7xl font-semibold tracking-wide">
              LAUNCH
            </div>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* CAROUSEL SECTION */}
      {/* ========================= */}
      <section className="w-full bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SponsorCarousel />
        </div>
      </section>
    </>
  );
}

function SponsorCarousel() {
  const slides: SponsorSlide[] = [
    {
      tier: 'Sponsor',
      name: 'Shield AI',
      description:
        'Donated $5000 to help with material and building costs and provided equipment to support our mission.',
      logo: placeholderLogo,
    },
    {
      tier: 'Sponsor',
      name: 'SICK',
      description:
        'Provided sensors and technical support to help the team accelerate testing and integration.',
      logo: placeholderLogo,
    },
    {
      tier: 'Sponsor',
      name: 'Another Sponsor',
      description:
        'Supported our manufacturing pipeline and helped fund critical drivetrain components.',
      logo: placeholderLogo,
    },
    {
      tier: 'Sponsor',
      name: 'One More',
      description:
        'Enabled outreach and documentation efforts that help us recruit and grow the team.',
      logo: placeholderLogo,
    },
  ];

  const [index, setIndex] = React.useState(0);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);
  const goTo = (i: number) => setIndex(i);

  return (
    <div className="relative">
      {/* Track viewport (shows peek of side cards) */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(50% - ${(index + 0.5) * 100}%))`,
          }}
        >
          {slides.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="shrink-0 w-full px-6"
              aria-hidden={i !== index}
            >
              <SponsorCard
                tier={s.tier}
                name={s.name}
                description={s.description}
                logo={s.logo}
                isActive={i === index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left / Right arrows */}
      <button
        type="button"
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 text-white/90 hover:border-white/60 hover:text-white transition flex items-center justify-center bg-black/40 backdrop-blur-sm"
        aria-label="Previous sponsor"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 text-white/90 hover:border-white/60 hover:text-white transition flex items-center justify-center bg-black/40 backdrop-blur-sm"
        aria-label="Next sponsor"
      >
        ›
      </button>

      {/* Dots */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={[
              'h-2.5 rounded-full transition-all',
              i === index ? 'w-10 bg-white/90' : 'w-2.5 bg-white/25 hover:bg-white/40',
            ].join(' ')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function SponsorCard({
  tier,
  name,
  description,
  logo,
  isActive,
}: {
  tier: string;
  name: string;
  description: string;
  logo: StaticImageData;
  isActive: boolean;
}) {
  return (
    <div
      className={[
        'relative w-full h-[380px] md:h-[420px] overflow-hidden',
        'border border-dashed border-white/25',
        'bg-gradient-to-br from-neutral-900 via-neutral-950 to-black',
        'shadow-[0_0_60px_rgba(0,0,0,0.6)]',
        isActive ? 'opacity-100' : 'opacity-45',
      ].join(' ')}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.75))]" />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[240px] md:w-[360px] h-[120px] md:h-[160px] opacity-95">
          <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
        </div>
      </div>

      {/* Bottom-left content */}
      <div className="absolute left-8 bottom-8 right-8 md:right-auto md:w-[520px]">
        <span className="inline-flex items-center justify-center px-4 py-1.5 border border-white/30 text-white/85 text-sm rounded-full mb-4 bg-black/30 backdrop-blur-sm">
          {tier}
        </span>

        <h3 className="text-white text-4xl md:text-5xl font-semibold leading-tight">
          {name}
        </h3>

        <p className="mt-3 text-white/75 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}