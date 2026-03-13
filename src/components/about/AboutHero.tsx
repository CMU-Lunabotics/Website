import { getStorageUrl } from '@/lib/supabase';
import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Point cloud background — upload to hero/point-cloud.jpg in Supabase Storage */}
      <div className="absolute inset-0">
        <Image
          src={getStorageUrl('our-story/Group 702.png')}
          alt="Point cloud map"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Point Cloud Map label — top right */}
      <div className="absolute top-28 right-10 z-10 flex items-center gap-2">
        <div className="w-3.5 h-3.5 border border-white/60" />
        <span className="text-white/70 text-xs font-mono tracking-[0.2em] uppercase">
          Point Cloud Map
        </span>
      </div>

      {/* Framed rectangle overlay (decorative, matches design) */}
      <div
        className="absolute z-10 border border-white/30"
        style={{ top: '18%', left: '38%', width: '28%', height: '38%' }}
      >
        <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-white/70" />
        <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-white/70" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-white/70" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-white/70" />
      </div>

      {/* Bottom-left content */}
      <div className="absolute bottom-16 left-10 z-10 max-w-lg px-2 flex flex-col items-start gap-[6px]">
        <h1 className="text-6xl lg:text-7xl font-bold text-white font-[var(--font-noto)]">
          Our Story
        </h1>
        <p className="text-white/90 text-lg leading-relaxed font-[var(--font-noto)] max-w-md">
          Moon Miners is a student-led engineering team developing autonomous robotic systems for lunar excavation. By combining robotics, systems engineering, and innovation, we are preparing the technologies needed for humanity&apos;snext steps on the Moon.
        </p>
      </div>
    </section>
  );
}
