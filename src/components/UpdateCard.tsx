'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Update } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { formatUpdateDate } from '@/lib/seasons';
import { cn } from '@/lib/utils';

interface UpdateCardProps {
  update: Update;
  variant?: 'default' | 'compact';
}

const CLIP = 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)';

export function UpdateCard({ update, variant = 'default' }: UpdateCardProps) {
  const images = update.images || [];
  const hasMultipleImages = images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const detailed = update.detailedView;
  const href = `/updates/${update.id}`;

  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);

  const safeIndex = images.length > 0 ? Math.max(0, Math.min(currentImageIndex, images.length - 1)) : 0;
  const imageHeight = variant === 'compact' ? 'h-48' : 'h-[280px] md:h-[400px]';
  const imageAlt = images.length > 0
    ? `${update.title}, image ${safeIndex + 1} of ${images.length}`
    : `${update.title} cover`;

  const frame = (
    <div
      className={cn('relative w-full overflow-hidden bg-deep-space', imageHeight)}
      style={{ clipPath: CLIP }}
    >
      <Image
        key={`${update.id}-${safeIndex}`}
        src={images[safeIndex] || getStorageUrl('team/team-2026.JPG')}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {hasMultipleImages && (
        <>
          <button
            type="button"
            aria-label={`Previous image for ${update.title}`}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-void/70 text-starlight opacity-100 transition-opacity hover:bg-void focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={`Next image for ${update.title}`}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-void/70 text-starlight opacity-100 transition-opacity hover:bg-void focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
          <div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === safeIndex ? 'true' : undefined}
                className="flex h-11 w-11 cursor-pointer items-center justify-center"
                onClick={() => setCurrentImageIndex(index)}
              >
                <span
                  className={cn(
                    'block h-1 rounded-full',
                    index === safeIndex ? 'w-6 bg-starlight' : 'w-1.5 bg-starlight/40'
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const title = (
    <h3 className="text-2xl font-display font-semibold leading-tight text-starlight md:text-3xl">
      {update.title}
    </h3>
  );

  return (
    <article className="group flex h-full w-full flex-col items-start gap-5">
      {detailed ? (
        <Link href={href} className="block w-full cursor-pointer">
          {frame}
        </Link>
      ) : (
        frame
      )}

      <div className="flex w-full flex-col gap-2 px-1">
        <time dateTime={update.date} className="text-sm text-moon-dust">
          {formatUpdateDate(update.date)}
        </time>
        {detailed ? (
          <Link href={href} className="cursor-pointer transition-colors hover:text-supernova">
            {title}
          </Link>
        ) : (
          title
        )}
        <p className="line-clamp-2 text-sm leading-relaxed text-moon-dust">{update.summary}</p>
      </div>
    </article>
  );
}
