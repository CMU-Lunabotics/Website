import { UpdateCard } from '@/components/UpdateCard';
import { Section } from '@/components/Section';
import { getUpdates } from '@/lib/content';

export const metadata = {
  title: 'Team Updates - CMU MoonMiners',
  description: 'Latest news, milestones, and updates from the CMU MoonMiners team.',
};

// Force dynamic rendering to show latest updates
export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const updates = await getUpdates();
  
  // Sort updates by date descending
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen pt-24 pb-16 bg-black text-white">
      <Section title="All Updates" titleClassName="text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedUpdates.map((update) => (
              /* Use 'data' prop to match the UpdateCard component requirements */
              <UpdateCard key={update.id} data={update} />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
} 
