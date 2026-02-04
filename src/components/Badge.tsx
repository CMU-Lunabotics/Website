import { cn } from '@/lib/utils';
import { Badge as BadgePrimitive } from '@/components/ui/badge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className 
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <BadgePrimitive
      variant={variant}
      className={cn(sizeClasses[size], className)}
    >
      {children}
    </BadgePrimitive>
  );
}
