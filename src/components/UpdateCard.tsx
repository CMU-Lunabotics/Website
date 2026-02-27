import React from 'react';
import Image from 'next/image';

// Define the Update interface here as well
interface Update {
  id?: string | number;
  title: string;
  content: string;
  date: string;
  image_url?: string;
}

interface UpdateCardProps {
  update: Update; // Replace 'any' with Update
}

export function UpdateCard({ update }: UpdateCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all group">
      {update.image_url && (
        <div className="relative h-48 w-full">
          <Image 
            src={update.image_url} 
            alt={update.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-sm text-blue-400 mb-2">{update.date}</p>
        <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-audiowide)]">{update.title}</h3>
        <p className="text-white/60 line-clamp-3 mb-4">{update.content}</p>
      </div>
    </div>
  );
}