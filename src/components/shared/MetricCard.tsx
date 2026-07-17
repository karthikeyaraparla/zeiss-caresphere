import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: 'from-card to-card border-border',
  primary: 'from-primary/5 to-primary/10 border-primary/20',
  success: 'from-success/5 to-success/10 border-success/20',
  warning: 'from-warning/5 to-warning/10 border-warning/20',
  danger: 'from-destructive/5 to-destructive/10 border-destructive/20',
};

const iconVariantStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning-foreground',
  danger: 'bg-destructive/10 text-destructive',
};

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, { duration, ease: 'easeOut' });
    }
  }, [inView, value, motionValue, duration]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString();
      }
    });
  }, [spring]);

  return <span ref={ref}>0</span>;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendLabel,
  variant = 'default',
  className,
  delay = 0,
}: MetricCardProps) {
  const trendIcon =
    trend === undefined ? null :
    trend > 0 ? <TrendingUp className="size-3" /> :
    trend < 0 ? <TrendingDown className="size-3" /> :
    <Minus className="size-3" />;

  const trendColor =
    trend === undefined ? '' :
    trend > 0 ? 'text-success' :
    trend < 0 ? 'text-destructive' :
    'text-muted-foreground';

  const isNumeric = typeof value === 'number';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={className}
    >
      <Card
        className={cn(
          'relative overflow-hidden bg-gradient-to-br border p-6 gap-0 group',
          variantStyles[variant],
          'shadow-card hover:shadow-premium transition-all duration-300'
        )}
      >
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start justify-between mb-4 relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn(
              'flex items-center justify-center size-10 rounded-xl transition-transform',
              iconVariantStyles[variant]
            )}
          >
            {icon}
          </motion.div>
          {trend !== undefined && (
            <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
              {trendIcon}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1 relative z-10">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {isNumeric ? <AnimatedCounter value={value} /> : value}
          </p>
          {(subtitle || trendLabel) && (
            <p className="text-xs text-muted-foreground">
              {trendLabel || subtitle}
            </p>
          )}
        </div>

        {/* Decorative gradient orb */}
        <div
          className={cn(
            'absolute -top-6 -right-6 size-24 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20',
            variant === 'primary' ? 'bg-primary' :
            variant === 'success' ? 'bg-success' :
            variant === 'warning' ? 'bg-warning' :
            variant === 'danger' ? 'bg-destructive' :
            'bg-muted-foreground'
          )}
        />

        {/* Pulse indicator for important metrics */}
        {(variant === 'danger' || variant === 'warning') && (
          <div className="absolute top-3 right-3 size-2 rounded-full bg-current opacity-60 animate-pulse" style={{ color: variant === 'danger' ? 'oklch(0.58 0.22 27)' : 'oklch(0.72 0.18 75)' }} />
        )}
      </Card>
    </motion.div>
  );
}
