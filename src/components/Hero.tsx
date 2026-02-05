'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from './Container';
import { getStorageUrl } from '@/lib/supabase';

interface HeroProps {
  headline: string;
  subhead?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export function Hero({ headline, subhead, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20">
      {/* 1. Center the entire container on the screen */}
      <Container className="mx-auto px-6 lg:px-12">
        {/* 2. Use a grid or flex to split the text and the media */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white text-left"
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl leading-tight">
                {headline}
              </h1>
              {subhead && (
                <p className="mt-6 text-xl text-gray-200">
                  {subhead}
                </p>
              )}
              {/* Buttons container */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-lg bg-[#900043] hover:bg-[#7a0037] text-white">
                  <Link href={ctaPrimary.href}>
                    {ctaPrimary.label}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg text-black hover:bg-transparent hover:text-white bg-white">
                  <Link href={ctaSecondary.href}>
                    {ctaSecondary.label}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* 3. Rover GIF */}
          <div className="hidden lg:block relative w-[500px] h-[500px]">
             <video
                src={getStorageUrl('hero/rover-360.gif')}
                autoPlay loop muted playsInline
                className="w-full h-full object-contain"
              />
          </div>
          
        </div>
      </Container>
    </section>
  );
}