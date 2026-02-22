'use client';

import { getStorageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SponsorCTA() {
  return (
    <section className="relative w-full">
      {/* Full-bleed background */}
      <div className="relative w-full h-[1223px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getStorageUrl('hero/IMG_2424 1.png')}
          alt="Join The Crew background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-20">
          {/* Heading */}
          <h2 className="text-white text-5xl font-semibold mb-8">Join The Crew</h2>

          {/* Button */}
          <Button asChild size="lg" className="bg-rose-900 hover:bg-rose-800 transition-colors text-white text-xl font-semibold px-8 py-7 rounded-lg mb-6">
            <Link href="https://www.canva.com/design/DAHAtIDK2O0/6b-gnU3OEda1BFzFEbbxww/view?utm_content=DA[…]hare&utm_medium=link2&utm_source=uniquelinks&utlId=h6193394fec">
              View Sponsorship Packet
            </Link>
          </Button>

          {/* Contact info */}
          <div className="text-white text-xl font-semibold text-center">
            <p className="mb-1">Or contact us at</p>
            <a
              href="mailto:moonminers@andrew.cmu.edu"
              className="underline hover:no-underline transition-colors"
            >
              moonminers@andrew.cmu.edu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SponsorCTA;
