import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  logoPath?: string;
}

export function Logo({ className, size = 'md', logoPath = '/images/logo/logo2026.svg' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={logoPath}
        alt="CMU MoonMiners Logo"
        width={200}
        height={60}
        className={cn('object-contain', sizeClasses[size])}
        priority
      />
    </div>
  );
}
