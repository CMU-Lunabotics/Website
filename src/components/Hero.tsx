'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from './Container';

interface HeroProps {
  headline: string;
  subhead?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export function Hero({ headline, subhead, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-start pl-24 pt-24 md:pt-40 overflow-hidden">

      <Container className="mx-0 pl-4 sm:pl-6 md:pl-12 lg:pl-20">
        <div className="max-w-4xl md:max-w-3xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-left"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-6xl whitespace-pre-line leading-tight text-left">
              {headline}
            </h1>
            {subhead && (
              <p className="mt-6 text-xl text-gray-200 sm:text-2xl">
                {subhead}
              </p>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#900043] hover:bg-[#7a0037] text-white">
                <Link href={ctaPrimary.href}>
                  {ctaPrimary.label}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-black hover:bg-transparent hover:text-white bg-white">
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
