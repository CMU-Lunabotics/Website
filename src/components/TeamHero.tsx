'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HEADLINE = 'The CMU\nMoon Miners Team';
const SUBTITLE =
  'We are a diverse team comprised of undergrads, graduates, and doctorates, united by a shared mission to push the boundaries of space technology.';

export function TeamHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden pb-20 lg:pb-24 pt-32 lg:pt-40">
      {/* Background: team photo dimmed under void gradients + nebula glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/team-official-photo.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-45"
          priority
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 70% 30%, rgba(51,32,79,0.45) 0%, rgba(196,18,48,0.1) 50%, transparent 75%)',
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 w-full pl-6 pr-6 lg:pl-12 lg:pr-12 mb-6 lg:mb-10">
        <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-8">
          <div className="max-w-2xl flex-shrink-0 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-starlight text-left font-display"
            >
              <p className="eyebrow mb-5 flex items-center gap-3">
                <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
                76 members · 14 majors · 1 mission
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] font-display">
                {HEADLINE.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 text-lg font-medium text-moon-dust max-w-2xl leading-relaxed">
                {SUBTITLE}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-7 text-base font-semibold rounded-none">
                  <Link href="#advisors">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-7 text-base font-medium rounded-none"
                >
                  <a href="mailto:moonminers@cmu.edu">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
