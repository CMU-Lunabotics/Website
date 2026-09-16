'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const PROFILE_URL = 'https://www.instagram.com/cmumoonminers/';

export function InstagramProfileEmbed({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If embed.js already loaded before this component mounted, process now
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  function handleScriptLoad() {
    window.instgrm?.Embeds.process();
  }

  return (
    <div ref={containerRef} className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={PROFILE_URL}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0 auto',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '100%',
        }}
      >
        {/* Fallback link visible until embed.js renders the card */}
        <div style={{ padding: '16px' }}>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3897f0', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px' }}
          >
            View @cmumoonminers on Instagram
          </a>
        </div>
      </blockquote>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </div>
  );
}
