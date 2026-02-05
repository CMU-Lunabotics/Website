'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { Update } from '@/lib/content';

interface UpdateModalProps {
  update: Update | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateModal({ update, open, onOpenChange }: UpdateModalProps) {
  if (!update) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        {/* Content */}
        <div className="space-y-4">
          <DialogDescription className="text-base">
            <p className="text-muted-foreground leading-relaxed">{update.content}</p>
          </DialogDescription>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {update.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Optional Links */}
          {(update.links && update.links.length > 0) || (update.link && update.link.trim() !== '') ? (
            <div className="pt-4 border-t flex flex-wrap gap-3">
              {/* Legacy single link support */}
              {update.link && update.link.trim() !== '' && (
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
              )}
              {/* Multiple links support */}
              {update.links && update.links.map((linkItem, index) => (
                <Button key={index} asChild variant="outline">
                  <a
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkItem.label}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

