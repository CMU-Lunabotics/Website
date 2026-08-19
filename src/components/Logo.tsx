import Image from 'next/image';
import { cn } from '@/lib/utils';
import logo from '../../public/brand/moonminers-logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-24',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Moon Miners logo"
      className={cn('w-auto object-contain', sizes[size], className)}
      priority
    />
  );
}
