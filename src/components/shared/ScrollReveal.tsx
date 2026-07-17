import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

const hiddenState: Record<Direction, object> = {
  up:    { opacity: 0, y: 40, filter: 'blur(6px)' },
  down:  { opacity: 0, y: -40, filter: 'blur(6px)' },
  left:  { opacity: 0, x: 40, filter: 'blur(6px)' },
  right: { opacity: 0, x: -40, filter: 'blur(6px)' },
  scale: { opacity: 0, scale: 0.93, filter: 'blur(4px)' },
  none:  { opacity: 0 },
};

const visibleState = { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' };

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={hiddenState[direction] as any}
      whileInView={visibleState}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, -speed * 80]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
