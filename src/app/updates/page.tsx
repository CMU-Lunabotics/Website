import Image from 'next/image';
import { getUpdates } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { seasonKey } from '@/lib/seasons';
import { UpdatesPageContent } from '@/components/UpdatesPageContent';
import { HeroBandScrim } from '@/components/HeroBandScrim';
import { HeroIntro, heroHeadingClass, heroSubheadClass } from '@/components/HeroIntro';

export const metadata = {
  title: 'Updates',
  description: 'Stay up to date with our current milestones, goals, and accomplishments',
};

// Force dynamic rendering to show latest updates
export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const updates = await getUpdates();

  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const seasons = Array.from(new Set(sortedUpdates.map((update) => seasonKey(update.date)))).sort();

  return (
    <section className="relative">
      <div className="w-full relative">
        <div className="hero-band">
          {/* Plum glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(51,32,79,0.4) 0%, rgba(196,18,48,0.1) 55%, transparent 75%)',
            }}
            aria-hidden
          />

          {/* Circles */}
          <div className="absolute inset-0 z-0 flex items-center justify-left pointer-events-none -translate-x-[-10%] -translate-y-[20%] opacity-80">
            <div className="relative w-[min(180vw,1000px)] h-[min(180vh,1000px)]">
              <Image
                src={getStorageUrl('updates/circles-hero.png')}
                alt=""
                fill
                className="object-contain object-center"
                sizes="600px"
                aria-hidden
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-void/70 via-void/25 to-transparent"
            aria-hidden
          />

          {/* Hero artwork — excavation subsystem render */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[1] lg:left-[28%]">
            {/* Mobile image */}
            <Image
              src={getStorageUrl('updates/updatesbgmobile.png')}
              alt=""
              fill
              className="object-cover object-center lg:hidden"
              priority
              sizes="100vw"
              aria-hidden
            />
            {/* Desktop image — cover crops the top and bottom to the shared hero height */}
            <Image
              src={getStorageUrl('updates/updates-bg.png')}
              alt=""
              fill
              className="hidden object-cover object-center lg:block"
              priority
              sizes="72vw"
              aria-hidden
            />
          </div>

          <HeroBandScrim />

          <HeroIntro>
            <p className="eyebrow mb-5 flex min-h-5 items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Mission Log
            </p>
            <h1 className={heroHeadingClass}>News &amp; Updates</h1>
            <p className={heroSubheadClass}>
              Stay up to date with our current milestones, goals and accomplishments
            </p>
          </HeroIntro>
        </div>

        <UpdatesPageContent updates={sortedUpdates} seasons={seasons} />
      </div>
    </section>
  );
}
