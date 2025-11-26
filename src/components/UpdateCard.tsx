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
  navigateOnClick?: boolean; // If true, navigate to updates page instead of opening modal
}

export function UpdateCard({ update, navigateOnClick = false }: UpdateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = update.images || [];
  const hasMultipleImages = images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Reset index when images change
  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);
  
  // Ensure index is always valid
  const safeIndex = images.length > 0 ? Math.max(0, Math.min(currentImageIndex, images.length - 1)) : 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % images.length;
      return next;
    });
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      return next;
    });
  };

  const handleCardClick = () => {
    if (!navigateOnClick) {
      setIsModalOpen(true);
    }
  };

  const cardContent = (
    <Card 
      className="group hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {images.length > 0 ? (
          <>
            <Image
              key={`${update.id}-${safeIndex}`}
              src={images[safeIndex]}
              alt={`${update.title} - Image ${safeIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === safeIndex
                          ? 'w-6 bg-white'
                          : 'w-1.5 bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <Image
            src="/images/team/team-2025.jpg"
            alt={`${update.title} - Team Photo`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary">{update.category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(update.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
        <CardTitle className="text-xl">{update.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{update.summary}</p>
        <div className="flex flex-wrap gap-2">
          {update.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {navigateOnClick ? (
        <Link href="/updates" className="block">
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

