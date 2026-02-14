import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { UpdateCard } from '@/components/UpdateCard';
import { getUpdates } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <>
      <PageHeader
        title="Team Updates"
        subtitle="Latest news, milestones, and achievements from our team"
      />

      {/* Back to Home */}
      <Section className="py-4">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </Section>

      {/* Updates Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </Section>
    </>
  );
}

