'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function HomepageBackground() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/hero/homepage-bg.png"
        alt="Homepage background"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Rover artwork */}
      <div className="hidden lg:block absolute right-12 top-16 w-[560px] h-[520px] pointer-events-none">
        <Image
          src="/images/hero/rover-clear.png"
          alt="Rover render"
          width={560}
          height={520}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
