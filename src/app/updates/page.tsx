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
      <div className="w-full relative min-h-screen">
        {/* Header section with rover background */}
        <div className="relative h-[600px] md:h-[800px] lg:h-[750px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getStorageUrl('updates/updates-bg.png')}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 opacity-[0.4] object-contain scale-85 origin-top-right"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end h-[578px] pb-8">
            <h1 className="text-[63.429px] font-semibold text-white leading-[76.749px] font-display">
              News and Updates
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              Stay up to date with our current milestones, goals, and accomplishments
            </p>
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
