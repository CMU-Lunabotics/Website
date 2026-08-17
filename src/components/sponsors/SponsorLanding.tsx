'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';

const headerImage = getStorageUrl('sponsors/header.png');

export function SponsorLanding() {
  return (
    <>
      <section className="hidden md:block relative w-full min-h-[900px] overflow-hidden">
        <Image
          src={headerImage}
          alt="Wireframe render of a rover drive module"
          fill
          priority
          className="object-cover opacity-90"
          style={{ objectPosition: 'center top' }}
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
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent pointer-events-none" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-96 pb-24 flex flex-col lg:flex-row justify-start">
          <div className="max-w-xl text-left font-display">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              Partner With Us
            </p>
            <h1 className="text-starlight text-5xl md:text-6xl font-semibold mb-6 font-display">
              Sponsors
            </h1>
            <p className="text-moon-dust text-lg md:text-xl font-medium leading-relaxed mb-8">
              This mission is made possible by the organizations that support
              our team and believe in the impact of our work.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-lg rounded-none font-semibold">
              <Link href="/donate">Support Us →</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="hidden md:block w-full py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-starlight text-4xl md:text-4xl font-semibold mb-6">
            Why Sponsor Us?
          </h2>
          <p className="text-moon-dust text-lg md:text-xl leading-relaxed">
            Technology is table stakes. Execution wins championships. The difference
            between a contender and a champion is how fast you can test, break, and rebuild.
            As a first-year team, we don&apos;t rely on legacy funding, inherited infrastructure,
            or alumni pipelines.
          </p>
        </div>
      </section>
    </>
  );
}
