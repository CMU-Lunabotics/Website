import { getStorageUrl } from '@/lib/supabase';
import Image from 'next/image';

export function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Tracks drivetrain render background with plum glow */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 70% 40%, rgba(196,18,48,0.18) 0%, rgba(51,32,79,0.25) 45%, transparent 72%)',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 translate-x-[25%]">
          <Image
            src={getStorageUrl('team/team-hero.png')}
            alt=""
            fill
            className="object-contain object-[85%_40%] opacity-80"
            style={{ mixBlendMode: 'screen', filter: 'brightness(1.5) contrast(1.05)' }}
            priority
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
      </div>

      {/* Bottom-left content — typography matches home Hero subhead */}
      <div className="absolute bottom-16 left-6 z-10 max-w-3xl pr-6 lg:left-12 lg:pr-12 text-left font-display">
        <h1 className="text-6xl lg:text-7xl font-semibold text-starlight font-display">
          Our Journey
        </h1>
        <p className="mt-6 text-lg text-moon-dust max-w-3xl leading-relaxed">
          Moon Miners is a student-led engineering team developing autonomous robotic systems for lunar excavation. By combining robotics, systems engineering, and innovation, we are preparing the technologies needed for humanity&apos;s next steps on the Moon.
        </p>
      </div>
    </section>
  );
}
