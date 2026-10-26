'use client';

import Image from 'next/image';
import { HeroBandScrim } from '@/components/HeroBandScrim';
import { HeroIntro, heroHeadingClass, heroSubheadClass } from '@/components/HeroIntro';

const HEADLINE = 'The CMU\nMoon Miners Team';
const SUBTITLE =
  'We are a diverse team comprised of undergrads, graduates, and doctorates, united by a shared mission to push the boundaries of space technology.';

export function TeamHero() {
  return (
    <section className="hero-band">
      {/* Background: team photo dimmed under void gradients + nebula glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/team-official-photo.jpg"
          alt=""
          fill
          className="object-cover object-[center_40%] opacity-65"
          priority
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 70% 30%, rgba(51,32,79,0.45) 0%, rgba(196,18,48,0.1) 50%, transparent 75%)',
          }}
          aria-hidden
        />
      </div>

      <HeroBandScrim />

      <HeroIntro className="hero-copy-lower">
        <p className="eyebrow mb-5 flex min-h-5 items-center gap-3">
          <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
          100+ members · 15+ majors · 1 mission
        </p>
        <h1 className={heroHeadingClass}>
          {HEADLINE.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
        <p className={heroSubheadClass}>{SUBTITLE}</p>
      </HeroIntro>
    </section>
  );
}
