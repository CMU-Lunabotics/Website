'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getStorageUrl } from '@/lib/supabase';

export function HomepageBackground() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={getStorageUrl('hero/homepage-bg.png')}
        alt="Homepage background"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}
