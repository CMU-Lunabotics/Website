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
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
      </div>

      {/* Rover arena photo — moved from home hero */}
      <div className="relative z-[1] mx-auto mb-10 w-full max-w-xl px-6 lg:pointer-events-none lg:absolute lg:right-12 lg:top-[clamp(6.5rem,18vh,10rem)] lg:mb-0 lg:w-[min(44%,36rem)] lg:max-w-none lg:px-0">
        <div
          className="relative w-full aspect-[4/3] overflow-hidden border border-titanium/40"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))',
          }}
        >
          <Image
            src="/images/rover-digging-arena.jpg"
            alt="The rover digging regolith in the Lunabotics competition arena"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void/40 via-transparent to-void/20"
            aria-hidden
          />
        </div>
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
