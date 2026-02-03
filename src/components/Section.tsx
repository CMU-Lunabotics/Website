import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function Section({ title, subtitle, children, className, id, titleClassName, subtitleClassName }: SectionProps) {
  return (
    <section id={id} className={cn('py-16', className)}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={cn('text-3xl font-bold tracking-tight sm:text-4xl', titleClassName)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('mt-4 text-lg text-muted-foreground max-w-2xl mx-auto', subtitleClassName)}>
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
