import Link from 'next/link';
import { Section } from '@/components/Section';
import { UpdateCard } from '@/components/UpdateCard';
import { getUpdates } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';

export const metadata = {
  title: 'Team Updates - CMU MoonMiners',
  description: 'Latest news, milestones, and updates from the CMU MoonMiners team.',
};

export default async function UpdatesPage() {
  const updates = await getUpdates();

  // Sort updates by date (newest first)
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="relative">
      {/* Background image matching SponsorMiddle */}
      <div className="w-full relative min-h-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getStorageUrl('hero/Rectangle 30.png')}
          alt="Updates section background"
          className="absolute left-0 top-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with white text */}
          <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Team Updates
                </h1>
                <p className="mt-4 text-lg text-white/90">
                  Latest news, milestones, and achievements from our team
                </p>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
}

