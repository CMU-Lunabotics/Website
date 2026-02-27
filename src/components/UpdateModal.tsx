import React from 'react';
import { X } from 'lucide-react';

// Define the structure of an Update to satisfy TypeScript
interface Update {
  id?: string | number;
  title: string;
  content: string;
  date: string;
  image_url?: string;
}

interface UpdateModalProps {
  update: Update | null; // Replaced 'any'
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateModal({ update, isOpen, onClose }: UpdateModalProps) {
  if (!isOpen || !update) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <p className="text-sm text-blue-400 font-medium mb-2">{update.date}</p>
          <h2 className="text-3xl font-bold text-white mb-6 font-[var(--font-audiowide)]">{update.title}</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{update.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}