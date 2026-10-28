'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroBandScrim } from '@/components/HeroBandScrim';
import { HeroIntro, heroHeadingClass, heroSubheadClass } from '@/components/HeroIntro';
import { getStorageUrl } from '@/lib/supabase';

const headerImage = getStorageUrl('sponsors/header.png');

export function SponsorLanding() {
  return (
    <>
      <section className="hero-band w-full">
        <Image
          src={headerImage}
          alt="Wireframe render of a rover drive module"
          fill
          priority
          className="object-cover opacity-90"
          style={{ objectPosition: 'center center' }}
        />
        {/* Cosmic glow + fade to page background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 75% 35%, rgba(51,32,79,0.35) 0%, rgba(196,18,48,0.12) 50%, transparent 75%)',
          }}
          aria-hidden
        />
        <HeroBandScrim />

        <HeroIntro>
            <p className="eyebrow mb-5 flex min-h-5 items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Partner With Us
            </p>
            <h1 className={heroHeadingClass}>Sponsors</h1>
            <p className={heroSubheadClass}>
              This mission is made possible by the organizations and individuals that support
              our team and believe in the impact of our work.
            </p>
            <Button asChild size="lg" className="mt-10 h-12 px-8 text-lg rounded-none font-semibold">
              <Link href="/donate">Support Us →</Link>
            </Button>
        </HeroIntro>
      </section>
    </>
  );
}
