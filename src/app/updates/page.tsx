import Link from 'next/link';
import { UpdateCard } from '@/components/UpdateCard';
import { getUpdates } from '@/lib/content';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';

export const metadata = {
  title: 'Team Updates - CMU MoonMiners',
  description: 'Latest news, milestones, and updates from the CMU MoonMiners team.',
};

export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const updates = await getUpdates();
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    // Added h-full and relative to ensure the main container occupies space
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      
      {/* Background Layer 
          - Changed to absolute instead of fixed to prevent "scroll-jacking"
          - Added pointer-events-none so mouse clicks pass through to links
      */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden h-full">
        <img
          src={getStorageUrl('hero/Rectangle 30.png')}
          alt=""
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 pt-[120px] px-4 sm:px-6 lg:px-8"> 
        <div className="py-12 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-[var(--font-audiowide)]">
              Team Updates
            </h1>
            <p className="mt-4 text-lg text-white/70 font-[var(--font-noto)]">
              Latest news, milestones, and achievements from our team
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mb-12">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 transition-colors">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Updates Grid */}
        <div className="mx-auto max-w-7xl pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedUpdates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}