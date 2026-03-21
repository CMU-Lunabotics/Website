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

      {/* Bottom-left content — typography matches home Hero subhead */}
      <div className="absolute bottom-16 left-6 z-10 max-w-3xl pr-6 lg:left-12 lg:pr-12 text-left font-display">
        <h1 className="text-6xl lg:text-7xl font-semibold text-white font-display">
          Our Story
        </h1>
        <p className="mt-6 text-lg font-400 text-white/90 max-w-3xl leading-relaxed">
          Moon Miners is a student-led engineering team developing autonomous robotic systems for lunar excavation. By combining robotics, systems engineering, and innovation, we are preparing the technologies needed for humanity&apos;s next steps on the Moon.
        </p>
      </div>
    </section>
  );
}
