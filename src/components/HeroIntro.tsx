'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const heroHeadingClass =
  'text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-starlight font-display';

export const heroSubheadClass =
  'mt-6 max-w-2xl text-lg font-medium leading-relaxed text-moon-dust';

export function HeroIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
      }
      className={cn('hero-copy-anchor text-left font-display', className)}
    >
      {children}
    </motion.div>
  );
}
