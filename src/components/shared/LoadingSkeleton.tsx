import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 rounded-md shimmer',
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 rounded shimmer" />
          <div className="h-3 w-1/4 rounded shimmer" />
        </div>
      </div>
      <div className="h-8 w-1/2 rounded shimmer" />
      <div className="h-3 w-2/3 rounded shimmer" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <div className="h-10 w-full rounded shimmer" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 w-full rounded shimmer opacity-70" style={{ opacity: 1 - i * 0.1 }} />
      ))}
    </div>
  );
}

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClass = size === 'sm' ? 'size-4' : size === 'lg' ? 'size-10' : 'size-6';
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'rounded-full border-2 border-primary/20 border-t-primary',
        sizeClass,
        className
      )}
    />
  );
}
