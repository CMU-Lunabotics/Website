import Image from 'next/image';
import { getUpdates } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { UpdatesPageContent } from '@/components/UpdatesPageContent';

export const metadata = {
  title: 'Team Updates - CMU MoonMiners',
  description: 'Stay up to date with our current milestones, goals, and accomplishments',
};

// Force dynamic rendering to show latest updates
export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const updates = await getUpdates();

  // Sort updates by date (newest first)
  const sortedUpdates = [...updates].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Featured update: admin-selected, or fall back to newest
  const featuredUpdate = sortedUpdates.find((u) => u.featured) || sortedUpdates[0];
  // Remaining updates for the grid
  const remainingUpdates = sortedUpdates.filter((u) => u !== featuredUpdate);

  // Extract unique categories
  const categories = Array.from(new Set(sortedUpdates.map((u) => u.category)));

  return (
    <section className="relative">
      <div className="w-full relative">
        <div className="relative min-h-[100svh] lg:min-h-[120vh] flex flex-col lg:block overflow-hidden pt-0 lg:pt-28 lg:pb-28">

          {/* Circles */}
          <div className="absolute inset-0 z-0 flex items-center justify-left pointer-events-none -translate-x-[-10%] -translate-y-[20%]">
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

          {/* Hero artwork */}
          <div className="relative lg:absolute lg:inset-y-0 lg:left-[28%] lg:right-0 z-[1] w-full h-[140vw] lg:h-auto flex-shrink-0 pointer-events-none">
            {/* Mobile image */}
            <Image
              src={getStorageUrl('updates/updatesbgmobile.png')}
              alt=""
              fill
              className="object-cover object-top lg:hidden"
              priority
              sizes="100vw"
              aria-hidden
            />
            {/* Desktop image */}
            <Image
              src={getStorageUrl('updates/updates-bg.png')}
              alt=""
              fill
              className="hidden lg:block object-contain object-right object-center"
              priority
              sizes="60vw"
              aria-hidden
            />
          </div>

          {/* Excavation Tag - hidden on mobile */}
          <div className="hidden lg:block absolute top-[22%] left-[20%] z-10">
            <Image
              src={getStorageUrl('updates/excavationgroup.png')}
              alt="Excavation"
              width={240}
              height={50}
              className="object-contain"
            />
          </div>

          {/* TEXT SECTION */}
          <div className="relative lg:absolute lg:bottom-[20%] lg:left-0 z-10 w-full px-6 lg:pl-12 mt-auto pt-0 pb-10 lg:pt-0 lg:pb-0">
            <div className="max-w-2xl">
              <div className="text-white text-left font-display">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] font-display">
                  News & Updates
                </h1>
                <p className="mt-4 text-base lg:text-lg font-medium text-white/90 leading-relaxed">
                  Stay up to date with our current milestones, goals and accomplishments
                </p>
              </div>
              
            </div>
          </div>

        </div>

        <UpdatesPageContent
          updates={remainingUpdates}
          featuredUpdate={featuredUpdate}
          categories={categories}
        />
      </div>
    </section>
  );
}
