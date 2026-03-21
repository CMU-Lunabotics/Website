'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getStorageUrl } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

const HEADLINE = 'The CMU\nMoon Miners Team';
const SUBTITLE =
  "We are a diverse team comprised of undergrads, graduates, and doctorates, united by a shared mission to push the boundaries of space technology.";

export function TeamHero() {
  return (
    <section className="relative min-h-[120vh] flex flex-col justify-end overflow-hidden pb-20 lg:pb-28 pt-20 lg:pt-28">
      {/* Background layer: circles behind, then main hero image on top */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
        {/* Decorative circle images — centered, behind hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-[5%] -translate-y-[18%]">
          <div className="relative w-[min(110vw,48rem)] aspect-square">
            <Image
              src={getStorageUrl('team/team-hero-circles1.png')}
              alt=""
              fill
              className="object-contain object-center opacity-90"
              sizes="(max-width: 768px) 90vw, 56rem"
              aria-hidden
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-x-[-10%] -translate-y-[33%]">
          <div className="relative w-[75%] max-w-xl aspect-square">
            <Image
              src={getStorageUrl('team/team-hero-circles2.png')}
              alt=""
              fill
              className="object-contain object-center opacity-90"
              sizes="(max-width: 700px) 60vw, 30rem"
              aria-hidden
            />
          </div>
        </div>
        {/* Main hero background image */}
        <div className="absolute inset-0 w-[80%] -translate-x-[-50%] -translate-y-[10%] overflow-visible">
          <Image
            src={getStorageUrl('team/team-hero.png')}
            alt=""
            fill
            className="object-cover object-center overflow-visible"
            sizes="100vw"
            priority
            aria-hidden
          />
        </div>
      </div>

      {/* Mobility label — over team imagery */}
      <div className="pointer-events-none absolute z-[2] top-[10%] sm:top-[12%] lg:top-[16%] left-[14%] sm:right-0.5 lg:right-1">
        <Image
          src={getStorageUrl('team/label_mobility.png')}
          alt="Mobility"
          width={238}
          height={58}
          className="h-auto w-[min(200px,52vw)] sm:w-[min(220px,40vw)] lg:w-[238px] object-contain"
          sizes="(max-width: 640px) 52vw, (max-width: 1024px) 40vw, 238px"
        />
      </div>

      <div className="relative z-10 w-full pl-6 pr-6 lg:pl-12 lg:pr-12 mb-12 lg:mb-20">
        <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-8">
          <div className="max-w-2xl flex-shrink-0 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-left font-display"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] font-display">
                {HEADLINE.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg font-medium text-white/90 max-w-2xl leading-relaxed">
                {SUBTITLE}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium rounded-none border-white text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white"
                >
                  <Link href="#advisors">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium rounded-none border-white bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white"
                >
                  <Link href="/contact">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="hidden lg:block flex-shrink-0 w-0 lg:w-[42%] xl:w-[40%]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
