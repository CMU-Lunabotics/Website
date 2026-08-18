'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  headline: string;
  subhead?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function Hero({ headline, subhead, ctaPrimary, ctaSecondary }: HeroProps) {
  const headlineParts = headline.split(/(?<=win\.)/i);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24">
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

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-6">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl flex-1 text-starlight text-left font-display"
          >
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
              NASA Lunabotics · 2026
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] font-display">
              <span>{headlineParts[0].trim()}</span>
              <br />
              <span className="text-cosmic-gradient">
                {headlineParts.slice(1).join('').trim()}
              </span>
            </h1>
            {subhead && (
              <p className="mt-6 text-lg font-medium text-moon-dust leading-relaxed">
                {subhead}
              </p>
            )}
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
          </motion.div>

          {/* Arena action photo — rounded frame with cosmic overlay details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full lg:w-[56%] flex-shrink-0"
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
              className="relative w-full aspect-[4/3] overflow-hidden border border-titanium/40"
              style={{ clipPath: 'polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))' }}
            >
              <Image
                src="/images/rover-digging-arena.jpg"
                alt="The rover digging regolith in the Lunabotics competition arena"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
              />

              {/* Cosmic wash + depth fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(150deg, rgba(51,32,79,0.45) 0%, rgba(196,18,48,0.15) 60%, rgba(51,32,79,0.3) 100%)',
                  mixBlendMode: 'soft-light',
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void/50 via-transparent to-void/40"
                aria-hidden
              />

              {/* Space details on top */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                {/* Orbit rings, upper right */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-dashed border-starlight/30" />
                <div className="absolute -top-2 right-8 w-20 h-20 rounded-full border border-starlight/20" />
                {/* Glowing planet dot riding the big ring */}
                <div
                  className="absolute top-8 right-40 w-3 h-3 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #F04455 0%, #33204F 100%)',
                    boxShadow: '0 0 12px rgba(240,68,85,0.8)',
                  }}
                />
                {/* Small moon, lower left */}
                <div
                  className="absolute bottom-10 left-8 w-2 h-2 rounded-full bg-moon-dust/80"
                  style={{ boxShadow: '0 0 8px rgba(185,181,199,0.6)' }}
                />
                {/* Star specks */}
                <div className="absolute top-[18%] left-[12%] w-1 h-1 rounded-full bg-starlight/90" />
                <div className="absolute top-[9%] left-[38%] w-[3px] h-[3px] rounded-full bg-starlight/60" />
                <div className="absolute top-[30%] right-[14%] w-[3px] h-[3px] rounded-full bg-starlight/70" />
                <div className="absolute bottom-[18%] right-[26%] w-1 h-1 rounded-full bg-starlight/80" />
                <div className="absolute bottom-[30%] left-[22%] w-[3px] h-[3px] rounded-full bg-starlight/50" />
                <div className="absolute top-[55%] left-[6%] w-[3px] h-[3px] rounded-full bg-starlight/60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
