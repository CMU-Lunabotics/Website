'use client';

import React from 'react';
import { X } from 'lucide-react';

export function UpdateModal({ update, isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <span className="text-blue-400 text-sm font-mono">{update.date}</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-6">{update.title}</h2>
          <div className="prose prose-invert max-w-none text-white/80">
            {update.content}
          </div>
          
          {update.links && update.links.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Resources</h4>
              <div className="flex flex-wrap gap-4">
                {update.links.map((linkItem: any, i: number) => (
                  <a 
                    key={i}
                    href={linkItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {linkItem.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}