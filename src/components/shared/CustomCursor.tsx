import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [variant, setVariant] = useState<'default' | 'button' | 'cta' | 'text'>('default');
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  const ringX = useSpring(x, { damping: 32, stiffness: 120, mass: 0.9 });
  const ringY = useSpring(y, { damping: 32, stiffness: 120, mass: 0.9 });

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsMobile(mobile);
    if (mobile) return;

    const moveHandler = (e: MouseEvent) => {
      if (reducedMotion) {
        x.set(e.clientX);
        y.set(e.clientY);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
      setHidden(false);

      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        const isCta = target.closest('[data-cta="true"]') || target.closest('button')?.classList.contains('bg-primary');
        setVariant(isCta ? 'cta' : 'button');
      } else if (target.closest('input, textarea, [contenteditable], select')) {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };

    const downHandler = () => setClicked(true);
    const upHandler = () => setClicked(false);
    const leaveHandler = () => setHidden(true);
    const enterHandler = () => setHidden(false);

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mousedown', downHandler);
    window.addEventListener('mouseup', upHandler);
    document.addEventListener('mouseleave', leaveHandler);
    document.addEventListener('mouseenter', enterHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mousedown', downHandler);
      window.removeEventListener('mouseup', upHandler);
      document.removeEventListener('mouseleave', leaveHandler);
      document.removeEventListener('mouseenter', enterHandler);
    };
  }, [x, y]);

  if (isMobile) return null;

  const cursorVariants = {
    default: { width: 22, height: 22 },
    button: { width: 36, height: 36 },
    cta: { width: 44, height: 44 },
    text: { width: 4, height: 24 },
  };

  const ringVariants = {
    default: { width: 40, height: 40, opacity: 0.35 },
    button: { width: 52, height: 52, opacity: 0.5 },
    cta: { width: 64, height: 64, opacity: 0.75 },
    text: { width: 32, height: 32, opacity: 0.25 },
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      {/* Glow ring (follows with delay) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={ringVariants[variant]}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: variant === 'cta' ? 'oklch(0.62 0.22 255)' : 'oklch(0.52 0.22 255 / 0.5)',
            boxShadow: variant === 'cta'
              ? '0 0 24px oklch(0.62 0.22 255 / 0.5), inset 0 0 12px oklch(0.62 0.22 255 / 0.25)'
              : '0 0 12px oklch(0.52 0.22 255 / 0.18)',
            background: variant === 'cta' ? 'oklch(0.62 0.22 255 / 0.06)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Core cursor — microscope icon for default/button/cta, bar for text */}
      <motion.div
        className="absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          ...cursorVariants[variant],
          scale: clicked ? 0.75 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 550 }}
      >
        {variant === 'text' ? (
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'oklch(0.62 0.22 255)',
              boxShadow: '0 0 10px oklch(0.62 0.22 255 / 0.6)',
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{
              filter: 'drop-shadow(0 0 8px oklch(0.62 0.22 255 / 0.55))',
            }}
          >
            <MicroscopeCursorSVG />
            {variant === 'cta' && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ border: '1.5px solid oklch(0.72 0.20 255 / 0.5)' }}
              />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function MicroscopeCursorSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="oklch(0.72 0.20 255)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ overflow: 'visible' }}
    >
      {/* Eyepiece */}
      <rect x="9.5" y="1.5" width="5" height="2.5" rx="0.6" fill="oklch(0.72 0.20 255 / 0.2)" />
      {/* Head tube */}
      <path d="M12 4 L12 8" />
      {/* Objective turret */}
      <circle cx="12" cy="9.2" r="2.2" fill="oklch(0.72 0.20 255 / 0.15)" />
      <circle cx="12" cy="9.2" r="0.6" fill="oklch(0.72 0.20 255)" />
      {/* Arm */}
      <path d="M12 11.4 L12 14 L8 14 L8 18" />
      {/* Stage */}
      <rect x="5.5" y="14" width="7" height="1.6" rx="0.4" fill="oklch(0.72 0.20 255 / 0.2)" />
      {/* Base */}
      <path d="M6 18 L10 18" />
      <rect x="4.5" y="18" width="9" height="3" rx="0.8" fill="oklch(0.72 0.20 255 / 0.12)" />
      {/* Focus knob */}
      <circle cx="9.5" cy="16" r="0.9" fill="oklch(0.72 0.20 255 / 0.25)" />
    </svg>
  );
}
