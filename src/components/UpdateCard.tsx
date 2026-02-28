import React from 'react';
import Image from 'next/image';

interface Update {
  id: string | number;
  title: string;
  date: string;
  content: string;
  image_url?: string;
  summary?: string;
  // This helps catch any extra data coming from page.tsx
  [key: string]: any; 
}

interface UpdateCardProps {
  update: Update;
  navigateOnClick?: boolean; // The '?' makes it optional
}

export function UpdateCard({ update, navigateOnClick }: UpdateCardProps) {
  return (
    <div className={`bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all group ${navigateOnClick ? 'cursor-pointer' : ''}`}>
      {(update.image_url || (update.images && update.images[0])) && (
        <div className="relative h-48 w-full">
          <Image 
            src={update.image_url || update.images[0]} 
            alt={update.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-sm text-blue-400 mb-2">{update.date}</p>
        <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-audiowide)]">{update.title}</h3>
        <p className="text-white/60 line-clamp-3 mb-4">{update.summary || update.content}</p>
      </div>
    </div>
  );
}