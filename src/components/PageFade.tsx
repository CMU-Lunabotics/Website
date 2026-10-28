'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const ease = [0.22, 1, 0.36, 1] as const;

export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (reduceMotion) {
    return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        className="flex min-h-0 flex-1 flex-col will-change-[opacity]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
