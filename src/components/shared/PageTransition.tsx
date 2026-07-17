import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { Variants } from 'framer-motion';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.985,
    filter: 'blur(10px)',
    y: 12,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.35, ease: 'easeOut' },
      filter: { duration: 0.45, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    filter: 'blur(8px)',
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.68, 0],
      opacity: { duration: 0.25, ease: 'easeIn' },
    },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: '100%', willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
