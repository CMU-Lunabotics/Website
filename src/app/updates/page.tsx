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
        <div className="relative min-h-[120vh] flex flex-col justify-end overflow-hidden pb-20 lg:pb-28 pt-20 lg:pt-28">
          {/* Circles*/}
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
          {/* Hero artwork — aligned with home Hero rover strip */}
          <div className="absolute inset-y-0 left-[40%] lg:left-[36%] right-0 z-[1] flex justify-end items-center pointer-events-none">
            <div className="relative w-full h-full min-h-[280px] lg:min-w-[58%] translate-x-[-2%] lg:translate-x-[-4%] translate-y-[-2%] lg:translate-y-[-5%]">
              <Image
                src={getStorageUrl('updates/updates-bg.png')}
                alt=""
                fill
                className="object-contain object-left object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                aria-hidden
              />
            </div>
          </div>
          <div className="relative z-10 w-full pl-6 pr-6 lg:pl-12 lg:pr-12 mb-12 lg:mb-20">
            <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-8">
              <div className="max-w-3xl flex-shrink-0 lg:pr-4">
                <div className="text-white text-left font-display">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] font-display">
                    News & Updates
                  </h1>
                  <p className="mt-6 text-lg font-medium text-white/90 leading-relaxed">
                    Stay up to date with our current milestones, goals, and accomplishments.
                  </p>
                </div>
              </div>
              <div
                className="hidden lg:block flex-shrink-0 w-0 lg:w-[42%] xl:w-[40%]"
                aria-hidden
              />
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
