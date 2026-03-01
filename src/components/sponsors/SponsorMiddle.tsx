'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/*
  Replace these imports with your actual filenames (in the same folder as this component)
  or change to your getStorageUrl(...) pattern if you load from Supabase/storage.
*/
import topLeftImg from './picture1.png';     // 1) small left photo (top-left)
// import topRightImg from './picture1.png';   // 2) wide hero graphic (top-right)
// import bottomRightImg from './picture1.jpg'; // 3) small right photo (bottom-right)
// import decorativePattern from './picture1.png'; // optional pattern for the big dark card

export default function SponsorGrid() {
  return (
    <section className="w-full bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* ---------- TOP ROW ---------- */}
        <div className="grid grid-cols-12 gap-6 items-stretch mb-8">
          {/* left image */}
          <div className="col-span-12 md:col-span-4">
            <div className="relative w-full h-[320px] md:h-[360px] rounded-sm overflow-hidden border border-gray-800">
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
                /* subtle chamfer effect on right top corner */
                background:
                  'linear-gradient(180deg,#2238f6 0%,#6e4fe8 60%,rgba(48,47,52,0.7) 100%)',
              }}
            >
              {/* optional decorative pattern or shapes */}
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
          {/* left: big dark card with chamfer and dashed border */}
          <div className="col-span-12 lg:col-span-8">
            <div
              className="relative w-full h-[320px] overflow-hidden border border-dashed border-gray-600"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,20,20,0.95), rgba(18,18,18,0.95))',
              }}
            >
              {/* optional pattern / subtle artwork on the dark card */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* If you have a decorative pattern, show it here. Otherwise remove. */}
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
                  {/* star icon / small emblem */}
                  <div className="mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2 L14 9 L21 10 L16 14 L17 21 L12 17 L7 21 L8 14 L3 10 L10 9 Z" fill="white" opacity="0.95" />
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
            <div className="relative w-full h-[320px] rounded-sm overflow-hidden border border-gray-800">
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
  );
}
