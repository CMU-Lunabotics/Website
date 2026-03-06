import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  /** Optional class for the header wrapper (e.g. mb-6 to reduce space below subtitle) */
  headerClassName?: string;
  /** 'left' for Figma-style left-aligned headers (e.g. Advisors), default 'center' */
  headerAlign?: 'left' | 'center';
  /** Optional title size: 'default' (3xl/4xl) or 'advisors' (42px semibold) */
  titleSize?: 'default' | 'advisors';
  /** Optional subtitle size: 'default' (lg) or 'advisors' (20px) */
  subtitleSize?: 'default' | 'advisors';
}

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
  titleClassName,
  subtitleClassName,
  headerClassName,
  headerAlign = 'center',
  titleSize = 'default',
  subtitleSize = 'default',
}: SectionProps) {
  const isLeft = headerAlign === 'left';
  const titleSizeClass = 'text-[36px] font-semibold leading-[100%]';
  const subtitleSizeClass = 'text-[20px] leading-[100%]';
  // Same title-to-subtitle spacing for all sections (Advisors + Team)
  const titleSubtitleGap = 'mt-2';

  return (
    <section id={id} className={cn('py-16', className)}>
      <Container>
        {(title || subtitle) && (
          <div
            className={cn(
              'mb-12',
              isLeft ? 'text-left' : 'text-center',
              headerClassName
            )}
          >
            {title && (
              <h2 className={cn(titleSizeClass, titleClassName, 'text-white')}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  subtitleSizeClass,
                  'text-white/90 max-w-2xl',
                  isLeft ? '' : 'mx-auto',
                  subtitleClassName,
                  titleSubtitleGap
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
