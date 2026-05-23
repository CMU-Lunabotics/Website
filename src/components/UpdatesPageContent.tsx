'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Update } from '@/lib/content';
import { UpdateCard } from './UpdateCard';
import { getStorageUrl } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface UpdatesPageContentProps {
  updates: Update[];
  featuredUpdate: Update;
  categories: string[];
}

export function UpdatesPageContent({ updates, featuredUpdate, categories }: UpdatesPageContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredUpdates = activeCategory === 'All'
    ? updates
    : updates.filter((u) => u.category === activeCategory);

  const featuredImage = featuredUpdate.images?.[0] || getStorageUrl('team/team-2026.JPG');

  return (
    <div className="relative z-10">
      {/* Featured Update Card */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div
          className="relative w-full h-[320px] md:h-[500px] lg:h-[550px] border border-zinc-600 overflow-hidden group"
          style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)' }}
        >
          {/* Background image */}
          <Image
            src={featuredImage}
            alt={featuredUpdate.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, #000 19.88%, rgba(0, 0, 0, 0.00) 67.32%)' }}
          />

          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">

            {/* Category tags row */}
            <div className="flex items-center gap-3 mb-3">
              {featuredUpdate.category && (
                <span className="text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/40 bg-black/40 text-white font-medium">
                  {featuredUpdate.category}
                </span>
              )}
              <div className="flex items-center text-xs md:text-sm text-white/60">
                <Calendar className="mr-1.5 h-3 w-3 md:h-3.5 md:w-3.5" />
                {new Date(featuredUpdate.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl mb-2">
              {featuredUpdate.title}
            </h2>

            {/* Summary */}
            <p className="text-white/70 text-xs md:text-base leading-relaxed max-w-3xl line-clamp-2 mb-3">
              {featuredUpdate.summary}
            </p>

            {/* Bottom tags */}
            <div className="flex flex-wrap gap-2">
              {featuredUpdate.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] md:text-sm px-2.5 md:px-4 py-0.5 md:py-1.5 rounded-full bg-white/15 border border-white/20 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-nowrap overflow-x-auto gap-2 scrollbar-hide">
          {[...new Set(['All', ...categories, 'Outreach'])].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0',
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'border border-zinc-600 text-white hover:border-zinc-400'
              )}
            >
              {category === 'All' ? 'All tags' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Updates Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>

        {filteredUpdates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No updates found for this category.</p>
          </div>
        )}
      </div>

      {/* TODO: Re-enable featured update modal */}
    </div>
  );
}
