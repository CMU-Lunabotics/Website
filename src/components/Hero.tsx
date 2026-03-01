'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from './Container';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  headline: string;
  headlineAccent?: boolean;
  subhead?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function Hero({ headline, headlineAccent, subhead, ctaPrimary, ctaSecondary }: HeroProps) {
  const headlineParts = headline.split(/(?<=win\.)/i);
  const showAccent = headlineAccent && headlineParts.length >= 2;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-24 lg:py-32">
      {/* Hero image - extends to top of section */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] flex justify-center lg:justify-end items-center pointer-events-none">
        <div className="relative w-full max-w-[500px] lg:max-w-[550px] h-full min-h-[320px] lg:min-h-0">
          <Image
            src={getStorageUrl('home/home-hero.png')}
            alt="Lunar rover"
            fill
            className="scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <Container className="relative z-10 mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="max-w-2xl flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {showAccent ? (
                  <>
                    {headlineParts[0]}
                    <span className="inline-block w-2 h-2 rounded-full bg-[#8B5CF6] align-middle ml-0.5" aria-hidden />
                    {' '}{headlineParts.slice(1).join('').trim()}
                  </>
                ) : (
                  headline
                )}
              </h1>
              {subhead && (
                <p className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed">
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

          {/* Spacer for image on desktop (image is absolutely positioned) */}
          <div className="hidden lg:block flex-shrink-0 w-0 lg:w-[40%] xl:w-[45%]" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
