import { memo } from 'react';
import { motion } from 'framer-motion';

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
  drift: { x: number; y: number };
}

const orbs: OrbConfig[] = [
  { size: 520, x: '-12%', y: '-8%', color: 'oklch(0.55 0.22 255 / 0.14)', duration: 24, delay: 0, drift: { x: 40, y: -30 } },
  { size: 380, x: '82%', y: '8%', color: 'oklch(0.62 0.19 195 / 0.11)', duration: 28, delay: 2, drift: { x: -35, y: 25 } },
  { size: 440, x: '65%', y: '72%', color: 'oklch(0.70 0.17 155 / 0.09)', duration: 32, delay: 5, drift: { x: 30, y: -40 } },
  { size: 300, x: '8%', y: '62%', color: 'oklch(0.55 0.22 255 / 0.10)', duration: 26, delay: 8, drift: { x: -25, y: 35 } },
  { size: 220, x: '45%', y: '40%', color: 'oklch(0.72 0.18 280 / 0.06)', duration: 30, delay: 3, drift: { x: 20, y: -20 } },
];

const particles = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 6,
  drift: Math.random() * 40 - 20,
}));

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-70"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 20% 30%, oklch(0.55 0.22 255 / 0.08), transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 80% 70%, oklch(0.55 0.22 255 / 0.08), transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.62 0.19 195 / 0.06), transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 30% 80%, oklch(0.72 0.18 280 / 0.05), transparent 60%)',
            'radial-gradient(ellipse 80% 60% at 20% 30%, oklch(0.55 0.22 255 / 0.08), transparent 60%)',
          ],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay with perspective fade */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.55 0.22 255) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.55 0.22 255) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 100% 80% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Blurred glowing orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, orb.drift.x, -orb.drift.x * 0.6, 0],
            y: [0, orb.drift.y, -orb.drift.y * 0.6, 0],
            scale: [1, 1.12, 0.94, 1],
            opacity: [0.85, 1, 0.8, 0.85],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Tiny floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/25"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 4px oklch(0.62 0.22 255 / 0.4)',
          }}
          animate={{
            y: [0, p.drift, 0],
            opacity: [0.15, 0.55, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle top vignette for depth */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, oklch(0 0 0 / 0.04), transparent)',
        }}
      />
    </div>
  );
});
