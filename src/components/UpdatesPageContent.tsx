'use client';

import { useState } from 'react';
import { Update } from '@/lib/content';
import { seasonKey, seasonLabel } from '@/lib/seasons';
import { UpdateCard } from './UpdateCard';
import { cn } from '@/lib/utils';

interface UpdatesPageContentProps {
  updates: Update[];
  seasons: string[];
}

export function UpdatesPageContent({ updates, seasons }: UpdatesPageContentProps) {
  const newest = seasons[seasons.length - 1] ?? '';
  const [activeSeason, setActiveSeason] = useState(newest);

  const visible = updates.filter((update) => seasonKey(update.date) === activeSeason);

  return (
    <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        {seasons.length > 0 ? (
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Seasons">
            {seasons.map((season) => (
              <button
                key={season}
                type="button"
                role="tab"
                aria-selected={activeSeason === season}
                onClick={() => setActiveSeason(season)}
                className={cn(
                  'flex-shrink-0 cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-medium transition-colors md:text-sm',
                  activeSeason === season
                    ? 'bg-tartan text-starlight'
                    : 'border border-titanium/50 text-moon-dust hover:border-supernova/70 hover:text-starlight'
                )}
              >
                {seasonLabel(season)}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-lg text-moon-dust">
            {activeSeason
              ? `No posts in ${seasonLabel(activeSeason)} yet.`
              : 'No posts yet.'}
          </p>
        )}
      </div>
    </div>
  );
}
