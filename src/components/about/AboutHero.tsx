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
