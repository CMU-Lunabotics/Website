'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Update } from '@/lib/content';
import { UpdateModal } from './UpdateModal';
import { Button } from '@/components/ui/button';

interface UpdateCardProps {
  update: Update;
  navigateOnClick?: boolean; 
}

export function UpdateCard({ update, navigateOnClick = false }: UpdateCardProps) {
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

  const cardContent = (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer bg-muted/20 border-zinc-800 text-white hover:border-zinc-700 p-0" 
      onClick={handleCardClick}
    >
      {/* FIX: 
         1. Added 'p-0' to the Card className above to kill any default padding.
         2. The image div below is the very first child, so it sits flush against the top border.
      */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 m-0">
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
            
            <div className="absolute inset-0" />

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
            src="/images/team/team-2025.jpg"
            alt="Default team cover"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* TEXT CONTENT CONTAINER - This applies the padding only to the bottom half */}
      <div className="flex flex-col p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-100 border-none hover:bg-zinc-700">
            {update.category}
          </Badge>
          <div className="flex items-center text-sm text-zinc-400">
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            {new Date(update.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-zinc-50 group-hover:text-white transition-colors">
            {update.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
            {update.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 mt-auto">
          {update.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider bg-white/70 text-zinc-500 py-0 px-2">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
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
            open={isModalOpen} 
            onOpenChange={setIsModalOpen} 
          />
        </>
      )}
    </>
  );
}