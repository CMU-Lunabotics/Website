'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getStorageUrl } from '@/lib/supabase';
import type { MarqueeSponsor } from '@/lib/content';
import {
  INVERTED_STAR_COLOR,
  STARFIELD_STARS,
  STARFIELD_VB_H,
  STARFIELD_VB_W,
} from '@/components/starfield-data';

const topLeftImg     = '/images/rover-sponsor-decals.jpg';
const bottomRightImg = '/images/clean-room-crew-arena.jpg';
const topRightImg    = getStorageUrl('sponsors/topright.png');
const bottomLeftImg  = getStorageUrl('sponsors/bottomleft.png');

function isLinked(url: string | undefined): boolean {
  return Boolean(url && url.trim() !== '' && url !== '#');
}

/** White company artwork that disappears on the light gray cards. */
const BLACK_LOGO_NAMES = new Set(['Shield AI']);

/**
 * Dark stars in the exact wallpaper positions.
 * Same fixed frame as Starfield so dots line up with the light stars
 * outside the tiles; clip-path on the tile keeps them inside the card.
 */
function TileStarfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${STARFIELD_VB_W} ${STARFIELD_VB_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {STARFIELD_STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={INVERTED_STAR_COLOR}
            opacity={star.maxOpacity}
          />
        ))}
      </svg>
    </div>
  );
}

function SponsorTile({
  sponsor,
  showCaption = true,
}: {
  sponsor: MarqueeSponsor;
  showCaption?: boolean;
}) {
  const card = (
    <>
      <div
        className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-black/15 bg-[#C1BEBA] p-6 transition-colors group-hover:border-supernova/50 md:h-44"
        style={{ clipPath: 'inset(0 round 1rem)' }}
      >
        <TileStarfield />
        {sponsor.logo ? (
          <div className="relative z-10 h-full w-full">
            <Image
              src={sponsor.logo}
              alt=""
              fill
              className={`object-contain ${BLACK_LOGO_NAMES.has(sponsor.name) ? 'brightness-0' : ''}`}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            />
          </div>
        ) : (
          <span className="relative z-10 px-2 text-center font-[var(--font-noto)] text-2xl font-semibold tracking-tight text-void whitespace-nowrap sm:text-3xl md:text-4xl">
            {sponsor.name}
          </span>
        )}
      </div>
      {showCaption && (
        <p className="mt-3 text-center text-base font-medium text-starlight transition-colors group-hover:text-supernova md:text-lg">
          {sponsor.name}
        </p>
      )}
    </>
  );

  const className =
    'group block rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-supernova';

  if (!isLinked(sponsor.url)) {
    return <div className={className}>{card}</div>;
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
      className={className}
    >
      {card}
    </a>
  );
}

function SponsorCardGrid({
  sponsors,
  showCaption = true,
  columns = 3,
}: {
  sponsors: MarqueeSponsor[];
  showCaption?: boolean;
  columns?: 3 | 4;
}) {
  if (sponsors.length === 0) {
    return <p className="text-moon-dust/60">Sponsors coming soon.</p>;
  }

  const gridClass =
    columns === 4
      ? 'grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul className={gridClass}>
      {sponsors.map((sponsor) => (
        <li key={sponsor.name}>
          <SponsorTile sponsor={sponsor} showCaption={showCaption} />
        </li>
      ))}
    </ul>
  );
}

interface SponsorMiddleProps {
  marqueeSponsors: MarqueeSponsor[];
  individualSponsors: MarqueeSponsor[];
}

export default function SponsorMiddle({
  marqueeSponsors,
  individualSponsors,
}: SponsorMiddleProps) {
  return (
    <>
      <section className="w-full py-16 text-starlight">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-left text-3xl font-semibold tracking-tight text-starlight sm:text-4xl md:text-5xl">
            Thank you to our 2026-2027 sponsors!
          </h2>
          <SponsorCardGrid sponsors={marqueeSponsors} />
          {individualSponsors.length > 0 && (
            <>
              <h3 className="mb-6 mt-16 text-left text-2xl font-semibold text-supernova md:text-3xl">
                Individual Sponsors
              </h3>
              <SponsorCardGrid sponsors={individualSponsors} showCaption={false} columns={4} />
            </>
          )}
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
                    <h3 className="text-4xl md:text-5xl font-semibold text-starlight leading-tight mb-6">What We Can Offer</h3>
                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                      {[
                        { title: 'Visibility', body: 'Logo placement, newsletters, and a place in the season’s story.' },
                        { title: 'Recruiting', body: 'Time with students who design, build, and ship a field robot.' },
                        { title: 'In-kind', body: 'Parts, software, and shop time that go straight onto the rover.' },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="border border-dotted border-titanium/40 bg-void/40 p-4"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
                        >
                          <p className="text-sm font-bold uppercase tracking-[0.16em] text-starlight">{item.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-moon-dust">{item.body}</p>
                        </div>
                      ))}
                    </div>
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
    </>
  );
}
