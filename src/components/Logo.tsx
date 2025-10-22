import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <div className={cn('flex items-center justify-center rounded-lg bg-red-600 text-white font-bold', sizeClasses[size])}>
        <span className="text-sm font-bold">CMU</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-foreground">MoonMiners</span>
        <span className="text-xs text-muted-foreground">NASA Lunabotics</span>
      </div>
    </div>
  );
}
