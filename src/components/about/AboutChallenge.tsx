import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutChallenge() {
  return (
    <section>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] items-center px-6 lg:px-12">
        {/* Left: image centered in its column */}
        <div className="flex items-center justify-center py-10">
          <div
            className="relative overflow-hidden"
            style={{
              width: '737px',
              height: '450px',
              maxWidth: '100%',
              clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))',
            }}
          >
            <Image
              src="/images/nasa-team.png"
              alt="Moon Miners with their award in front of the NASA globe at Kennedy Space Center"
              fill
              className="object-cover"
              sizes="737px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, rgba(51, 32, 79, 0.35) 17.4%, rgba(196, 18, 48, 0.12) 69.53%, rgba(196, 18, 48, 0.00) 103.76%)',
                mixBlendMode: 'soft-light',
              }}
            />
          </div>
        </div>

        {/* Right: text block nudged right, left-aligned for readability */}
        <div className="flex flex-col justify-center items-start text-left px-10 py-20 lg:pl-28 lg:pr-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-starlight font-[var(--font-noto)] mb-6">
            The Challenge
          </h2>
          <p className="text-moon-dust text-base leading-relaxed font-[var(--font-noto)] mb-10 max-w-md">
            Founded in 2025, CMU Moon Miners went from a blank whiteboard to the
            national stage in a single season. Now we&apos;re back with hard-won
            experience, a proven playbook, and a new rover in the works — not as a
            class project, not as a research demo, but to win the NASA Lunabotics
            Competition outright.
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-tartan text-starlight text-sm font-semibold font-[var(--font-noto)] px-6 py-3 hover:bg-supernova transition-all w-fit"
          >
            Meet the team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
