'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Update } from '@/lib/content';
import { UpdateCard } from './UpdateCard';
import { UpdateModal } from './UpdateModal';
import { getStorageUrl } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface UpdatesPageContentProps {
  updates: Update[];
  featuredUpdate: Update;
  categories: string[];
}

export function UpdatesPageContent({ updates, featuredUpdate, categories }: UpdatesPageContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);

  const filteredUpdates = activeCategory === 'All'
    ? updates
    : updates.filter((u) => u.category === activeCategory);

  const featuredImage = featuredUpdate.images?.[0] || getStorageUrl('team/team-2026.JPG');

  return (
    <div className="relative z-10">
      {/* Featured Update Card */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div
          className="relative w-[1280px] h-[612px] md:h-[550px] border border-zinc-600 hover:border-zinc-400 overflow-hidden cursor-pointer group clip-corner-tr"
          onClick={() => setFeaturedModalOpen(true)}
        >
          {/* Background image */}
          <Image
            src={featuredImage}
            alt={featuredUpdate.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="100vw"
            priority
          />

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, #000 19.88%, rgba(0, 0, 0, 0.00) 67.32%)' }}
          />

          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            {/* Category tag + date */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 text-white/90">
                {featuredUpdate.category}
              </span>
              <div className="flex items-center text-sm text-white/60">
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                {new Date(featuredUpdate.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl mb-3">
              {featuredUpdate.title}
            </h2>

            {/* Summary */}
            <p className="text-white/70 text-base leading-relaxed max-w-3xl line-clamp-2 mb-4">
              {featuredUpdate.summary}
            </p>

            {/* Topic tags */}
            <div className="flex flex-wrap gap-2">
              {featuredUpdate.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 text-white/80"
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
        <div className="flex flex-wrap gap-3">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2 text-sm font-medium transition-colors',
                activeCategory === category
                  ? 'bg-brand-blue text-white'
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

      {/* Featured update modal */}
      <UpdateModal
        update={featuredUpdate}
        isOpen={featuredModalOpen}
        onClose={() => setFeaturedModalOpen(false)}
      />
    </div>
  );
}
