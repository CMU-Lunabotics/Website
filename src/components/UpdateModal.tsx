'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Update } from '@/lib/content';

interface UpdateModalProps {
  update: Update | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateModal({ update, open, onOpenChange }: UpdateModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!update) return null;

  const images = update.images || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setCurrentImageIndex(0);
    }
    onOpenChange(newOpen);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open || !hasMultipleImages || images.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultipleImages, images.length]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{update.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(update.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <DialogTitle className="text-2xl">{update.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Image Carousel */}
        {images.length > 0 && (
          <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-muted">
            <Image
              src={images[currentImageIndex]}
              alt={`${update.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          <DialogDescription className="text-base">
            <p className="text-muted-foreground">{update.content}</p>
          </DialogDescription>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {update.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Optional Link */}
          {update.link && update.link.trim() !== '' && (
            <div className="pt-4 border-t">
              <Button asChild variant="outline">
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {update.linkLabel || 'View Resource'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

