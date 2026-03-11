import Image from 'next/image';
import Link from 'next/link';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export function AboutChallenge() {
  return (
    <section className="bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Left: image with left padding so it doesn't touch the border */}
        <div className="flex items-center pl-10 lg:pl-16 py-10">
          <div className="relative overflow-hidden" style={{ width: '737px', height: '450px', maxWidth: '100%' }}>
            <Image
              src={getStorageUrl('our-story/IMG_1869.jpg')}
              alt="System overview presentation"
              fill
              className="object-cover"
              sizes="737px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, rgba(2, 16, 253, 0.18) 17.4%, rgba(163, 150, 150, 0.18) 69.53%, rgba(163, 150, 150, 0.00) 103.76%)',
                mixBlendMode: 'soft-light',
              }}
            />
          </div>
        </div>

        {/* Right: text */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-20 bg-black">
          <h2 className="text-4xl lg:text-5xl font-bold text-white font-[var(--font-noto)] mb-6">
            The Challenge
          </h2>
          <p className="text-white/70 text-base leading-relaxed font-[var(--font-noto)] mb-10 max-w-md">
            Founded in 2025, CMU Moon Miners is a first-year team with nothing to
            inherit and everything to prove. We are building a fully autonomous lunar
            excavation rover from scratch — not as a class project, not as a research
            demo, but to win the NASA Lunabotics Competition outright.
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 border border-white text-white text-sm font-[var(--font-noto)] px-6 py-3 hover:bg-white hover:text-black transition-all w-fit"
          >
            Meet the team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
