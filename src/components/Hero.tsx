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
    <section className="relative min-h-[120vh] flex flex-col justify-end overflow-hidden pb-20 lg:pb-28 pt-20 lg:pt-28">
      {/* Circles / geometric elements - large, behind text and rover, does not affect layout */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none -translate-y-[10%]">
        <div className="relative w-[min(120vw,600px)] h-[min(120vh,600px)]">
          <Image
            src={getStorageUrl('home/home-hero-circles.png')}
            alt=""
            fill
            className="object-contain object-center"
            sizes="600px"
            aria-hidden
          />
        </div>
      </div>
      {/* Hero image - full height, rover fully visible (no bottom cutoff) */}
      <div className="absolute inset-y-0 left-[55%] lg:left-[52%] right-0 z-[1] flex justify-end items-center pointer-events-none">
        <div className="relative w-full h-full min-h-[280px] lg:min-w-[58%]">
          <Image
            src={getStorageUrl('home/home-hero.png')}
            alt="Lunar rover"
            fill
            className="object-contain object-left object-center"
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
          />
        </div>
      </div>
      {/* Full-width wrapper: text pinned to left and bottom */}
      <div className="relative z-10 w-full pl-6 pr-6 lg:pl-12 lg:pr-12 mb-12 lg:mb-20">
        <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-8">
          {/* Text content - left-aligned, no centering */}
          <div className="max-w-2xl flex-shrink-0 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-left font-[var(--font-noto)]"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {(
                  <>
                    <span>{headlineParts[0].trim()}</span>
                    <br />
                    <span>{headlineParts.slice(1).join('').trim()}</span>
                  </>
                )}
              </h1>
              {subhead && (
                <p className="mt-6 text-lg text-white/90 max-w-2xl leading-relaxed">
                  {subhead}
                </p>
              )}
              <div className="mt-10">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium rounded-none border-white text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white"
                >
                  <Link href={ctaPrimary.href}>
                    {ctaPrimary.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          {/* Spacer so rover area stays right (rover is absolute) */}
          <div className="hidden lg:block flex-shrink-0 w-0 lg:w-[42%] xl:w-[40%]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
