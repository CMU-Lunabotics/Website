import { cn } from '@/lib/utils';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:font-serif prose-headings:font-bold',
        'prose-p:text-muted-foreground prose-p:leading-relaxed',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground',
        'prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-muted prose-pre:border',
        'prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-2',
        className
      )}
    >
      {children}
    </div>
  );
}
