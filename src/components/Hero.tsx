'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from './Container';

interface HeroProps {
  headline: string;
  subhead: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  heroImage: string;
}

export function Hero({ headline, subhead, ctaPrimary, ctaSecondary, heroImage }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="CMU MoonMiners lunar excavation robot"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container>
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
            <p className="mt-6 text-xl text-gray-200 sm:text-2xl">
              {subhead}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href={ctaPrimary.href}>
                  {ctaPrimary.label}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black bg-transparent">
                <Link href={ctaSecondary.href}>
                  {ctaSecondary.label}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
