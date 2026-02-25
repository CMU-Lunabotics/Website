import { getUpdates } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { UpdatesPageContent } from '@/components/UpdatesPageContent';

export const metadata = {
  title: 'Team Updates - CMU MoonMiners',
  description: 'Latest news, milestones, and updates from the CMU MoonMiners team.',
};

// Force dynamic rendering to avoid caching
export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const updates = await getUpdates();

  // Sort updates by date (newest first)
  const sortedUpdates = [...updates].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Featured update is the newest one
  const featuredUpdate = sortedUpdates[0];
  // Remaining updates for the grid
  const remainingUpdates = sortedUpdates.slice(1);

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
            <h1 className="text-5xl md:text-[60px] font-bold tracking-tight text-white leading-tight">
              News and Updates
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              Latest news, milestones, and achievements from the CMU MoonMiners team
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
