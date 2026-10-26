import { getStorageUrl } from '@/lib/supabase';
import Image from 'next/image';
import { HeroBandScrim } from '@/components/HeroBandScrim';
import { HeroIntro, heroHeadingClass, heroSubheadClass } from '@/components/HeroIntro';

export function AboutHero() {
  return (
    <section className="hero-band">
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
            className="object-cover object-[80%_center] opacity-80"
            style={{ mixBlendMode: 'screen', filter: 'brightness(1.5) contrast(1.05)' }}
            priority
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
      </div>

      <HeroBandScrim />

      <HeroIntro>
        <p className="eyebrow mb-5 flex min-h-5 items-center gap-3" aria-hidden>
          <span className="inline-block h-px w-10 bg-tartan" />
          <span className="invisible">Mission</span>
        </p>
        <h1 className={heroHeadingClass}>Our Journey</h1>
        <p className={heroSubheadClass}>
          Moon Miners is a student-led engineering team developing autonomous robotic systems for lunar excavation. By combining robotics, systems engineering, and innovation, we are preparing the technologies needed for humanity&apos;s next steps on the Moon.
        </p>
      </HeroIntro>
    </section>
  );
}
