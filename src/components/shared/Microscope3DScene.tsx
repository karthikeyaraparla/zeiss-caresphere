import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Microscope3D } from './Microscope3D';

export function Microscope3DScene() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <Microscope3D />

      {/* Floating UI badges */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-4 glass rounded-2xl px-3 py-2 shadow-md z-10"
      >
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-foreground">3,241 Assets Monitored</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 left-4 glass rounded-2xl px-3 py-2 shadow-md z-10"
      >
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-foreground">AI Analysis Ready</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/3 left-2 glass rounded-2xl px-3 py-2 shadow-md z-10"
      >
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-medium text-foreground">Risk Score: 94%</span>
        </div>
      </motion.div>
    </div>
  );
}

export const heroTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      variants={heroTextVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
