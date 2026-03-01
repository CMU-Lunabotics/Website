'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Update } from '@/lib/content';
import { UpdateModal } from './UpdateModal';
import { getStorageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UpdateCardProps {
  update: Update;
  navigateOnClick?: boolean;
  variant?: 'default' | 'compact';
}

export function UpdateCard({ update, navigateOnClick = false, variant = 'default' }: UpdateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = update.images || [];
  const hasMultipleImages = images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);

  const safeIndex = images.length > 0 ? Math.max(0, Math.min(currentImageIndex, images.length - 1)) : 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    if (!navigateOnClick) {
      setIsModalOpen(true);
    }
  };

  const imageHeight = variant === 'compact' ? 'h-64' : 'h-[400px]';

  const cardContent = (
    <div
      className="inline-flex flex-col items-start gap-7 group cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image area */}
      <div className={cn('relative w-full overflow-hidden bg-zinc-800', imageHeight)}>
        {images.length > 0 ? (
          <>
            <Image
              key={`${update.id}-${safeIndex}`}
              src={images[safeIndex]}
              alt={`${update.title} - Image ${safeIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {hasMultipleImages && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1 rounded-full transition-all ${
                        index === safeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <Image
            src={getStorageUrl('team/team-2026.JPG')}
            alt="Group team cover"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col space-y-3">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2">
          <span className="font-display font-semibold text-sm flex items-center justify-center px-3 py-1 rounded-full bg-brand-white text-brand-black">
            {update.team ? update.team : "All"}
          </span>
          <span className="font-display font-semibold text-sm px-4 py-2 rounded-full border border-zinc-600 text-zinc-300">
            {update.category}
          </span>
        </div>

        {/* Title + date */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-4xl font-display font-semibold text-zinc-50 group-hover:text-white transition-colors leading-tight">
            {update.title}
          </h3>
          <div className="flex items-center text-sm text-zinc-400 shrink-0">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            {new Date(update.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>

        {/* Summary */}
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {update.summary}
        </p>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {update.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {navigateOnClick ? (
        <Link href="/updates" className="block h-full">
          {cardContent}
        </Link>
      ) : (
        <>
          {cardContent}
          <UpdateModal
            update={update}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
}
