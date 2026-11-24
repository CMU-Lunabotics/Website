'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroBandScrim } from '@/components/HeroBandScrim';
import { HeroIntro, heroHeadingClass, heroSubheadClass } from '@/components/HeroIntro';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  headline: string;
  subhead?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function Hero({ headline, subhead, ctaPrimary, ctaSecondary }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const headlineParts = headline.split(/(?<=win\.)/i);

  return (
    <section className="hero-band">
      {/* Supernova / plum glow behind the tracks */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 72% 55%, rgba(196,18,48,0.22) 0%, rgba(51,32,79,0.24) 45%, transparent 72%)',
        }}
        aria-hidden
      />

      {/* Decorative orbit circles */}
      <div
        className="absolute inset-y-0 right-[34%] left-[6%] z-0 hidden lg:flex items-center justify-center pointer-events-none opacity-35"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 78%)',
        }}
      >
        <div className="relative w-[min(60vw,640px)] h-[min(60vw,640px)]">
          <Image
            src={getStorageUrl('home/home-hero-circles.png')}
            alt=""
            fill
            className="object-contain object-center"
            sizes="640px"
            aria-hidden
          />
        </div>
      </div>

      <HeroBandScrim />

      <HeroIntro>
            <p className="eyebrow mb-5 flex min-h-5 items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              NASA Lunabotics · 2026
            </p>
            <h1 className={heroHeadingClass}>
              <span>{headlineParts[0].trim()}</span>
              <br />
              <span className="text-cosmic-gradient">
                {headlineParts.slice(1).join('').trim()}
              </span>
            </h1>
            {subhead && <p className={heroSubheadClass}>{subhead}</p>}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold rounded-none">
                <Link href={ctaPrimary.href}>
                  {ctaPrimary.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {ctaSecondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-7 text-base font-medium rounded-none"
                >
                  <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
      </HeroIntro>

          {/* Arena action photo — rounded frame with cosmic overlay details */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7 }}
            className="relative z-[1] mx-6 mb-16 w-auto lg:absolute lg:right-12 lg:top-1/2 lg:mb-0 lg:w-[44%] lg:-translate-y-1/2"
          >
            {/* Soft glow behind the card */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(51,32,79,0.5) 0%, rgba(196,18,48,0.12) 55%, transparent 75%)',
              }}
              aria-hidden
            />

            <div
              className="relative w-full aspect-video overflow-hidden border border-titanium/40 bg-void"
              style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/DUWANREGrFE?autoplay=1&mute=1&playsinline=1&rel=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
    </section>
  );
}
