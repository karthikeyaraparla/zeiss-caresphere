import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

/**
 * Pure CSS/SVG/Framer Motion microscope — no WebGL, no R3F, zero external 3D deps.
 * Renders a photorealistic-looking microscope with depth, metallic sheen, and animations.
 */
export function Microscope3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const rotateX = useSpring(mouseY, { damping: 30, stiffness: 120 });

  const floatY = useMotionValue(0);
  const floatTime = useRef(0);

  useAnimationFrame((t) => {
    floatTime.current = t / 1000;
    floatY.set(Math.sin(floatTime.current * 0.9) * 14);
    mouseX.set(Math.sin(floatTime.current * 0.35) * 6);
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / rect.width * 22);
      mouseY.set(-(e.clientY - cy) / rect.height * 16);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '900px', perspectiveOrigin: '50% 45%' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 55% 50%, oklch(0.62 0.22 255 / 0.18), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Main microscope body — CSS 3D */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          y: floatY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <MicroscopeSVG />
      </motion.div>

      {/* Contact shadow */}
      <motion.div
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.25, 0.15, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full pointer-events-none"
        style={{
          y: floatY,
          background: 'radial-gradient(ellipse at 50% 50%, oklch(0.52 0.22 255 / 0.35), transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}

function MicroscopeSVG() {
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      setScanAngle(((ts - start) / 1000 * 60) % 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scanRad = (scanAngle * Math.PI) / 180;
  const sr = 46;
  const sx = 215 + Math.cos(scanRad) * sr;
  const sy = 330 + Math.sin(scanRad) * sr;

  return (
    <svg
      width="340"
      height="520"
      viewBox="0 0 340 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 24px 48px oklch(0 0 0 / 0.35)) drop-shadow(0 4px 12px oklch(0.52 0.22 255 / 0.25))' }}
    >
      <defs>
        {/* Metal gradient — body */}
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c8d0e0" />
          <stop offset="25%" stopColor="#e8ecf6" />
          <stop offset="60%" stopColor="#f2f4fc" />
          <stop offset="85%" stopColor="#d0d8ec" />
          <stop offset="100%" stopColor="#b8c0d4" />
        </linearGradient>
        {/* Dark metal */}
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8898b0" />
          <stop offset="40%" stopColor="#a8b8cc" />
          <stop offset="100%" stopColor="#7888a0" />
        </linearGradient>
        {/* Blue accent */}
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        {/* Glass / lens */}
        <radialGradient id="lensGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.85" />
        </radialGradient>
        {/* Base gradient */}
        <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c0c8dc" />
          <stop offset="50%" stopColor="#a8b4c8" />
          <stop offset="100%" stopColor="#90a0b8" />
        </linearGradient>
        {/* Arm highlight */}
        <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8c4d8" />
          <stop offset="20%" stopColor="#dce4f4" />
          <stop offset="55%" stopColor="#eef2fc" />
          <stop offset="80%" stopColor="#ccd4e8" />
          <stop offset="100%" stopColor="#aab4c8" />
        </linearGradient>
        {/* Turret */}
        <radialGradient id="turretGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#d0d8ec" />
          <stop offset="60%" stopColor="#a8b4cc" />
          <stop offset="100%" stopColor="#8898b0" />
        </radialGradient>
        {/* Scan ring */}
        <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* === BASE PLATFORM === */}
      <ellipse cx="195" cy="470" rx="105" ry="18" fill="url(#baseGrad)" />
      <rect x="108" y="455" width="174" height="20" rx="6" fill="url(#baseGrad)" />
      {/* Base top highlight */}
      <rect x="115" y="455" width="162" height="3" rx="2" fill="#e8ecf8" opacity="0.7" />
      {/* Blue accent ring */}
      <rect x="108" y="453" width="174" height="3" rx="1.5" fill="url(#blueGrad)" />
      {/* Feet */}
      <ellipse cx="145" cy="472" rx="24" ry="7" fill="#7888a4" />
      <ellipse cx="250" cy="472" rx="24" ry="7" fill="#7888a4" />

      {/* === LOWER COLUMN === */}
      <rect x="175" y="380" width="42" height="80" rx="8" fill="url(#bodyGrad)" />
      {/* Column shading */}
      <rect x="175" y="380" width="10" height="80" rx="4" fill="#a8b4cc" opacity="0.5" />
      <rect x="207" y="380" width="10" height="80" rx="4" fill="#b0bccc" opacity="0.3" />

      {/* === STAGE PLATE === */}
      <rect x="130" y="356" width="130" height="28" rx="5" fill="url(#darkGrad)" />
      {/* Stage top sheen */}
      <rect x="135" y="357" width="120" height="6" rx="3" fill="#c0cce0" opacity="0.5" />
      {/* Aperture hole */}
      <ellipse cx="195" cy="370" rx="28" ry="12" fill="#1a2440" />
      <ellipse cx="195" cy="370" rx="24" ry="10" fill="url(#lensGrad)" opacity="0.7" />
      {/* Blue accent on stage */}
      <rect x="130" y="356" width="130" height="3" rx="1.5" fill="url(#blueGrad)" opacity="0.8" />
      {/* Stage clips */}
      <rect x="148" y="352" width="16" height="9" rx="2" fill="url(#blueGrad)" />
      <rect x="228" y="352" width="16" height="9" rx="2" fill="url(#blueGrad)" />

      {/* === MAIN ARM === */}
      <rect x="178" y="140" width="52" height="245" rx="10" fill="url(#armGrad)" />
      {/* Arm left shadow */}
      <rect x="178" y="140" width="14" height="245" rx="7" fill="#9aabbc" opacity="0.4" />
      {/* Arm right shadow */}
      <rect x="216" y="140" width="14" height="245" rx="7" fill="#b0bece" opacity="0.3" />
      {/* Front accent stripe */}
      <rect x="190" y="145" width="8" height="232" rx="4" fill="url(#blueGrad)" opacity="0.55" />
      {/* Arm top cap */}
      <rect x="174" y="138" width="60" height="14" rx="7" fill="url(#darkGrad)" />

      {/* === FOCUS KNOBS — LEFT === */}
      {/* Coarse */}
      <ellipse cx="148" cy="268" rx="16" ry="28" fill="url(#blueGrad)" />
      <ellipse cx="148" cy="268" rx="10" ry="22" fill="#60a5fa" opacity="0.5" />
      {/* Knob grooves */}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1="136" y1={246 + i * 6}
          x2="160" y2={246 + i * 6}
          stroke="#1d4ed8" strokeWidth="1.5" opacity="0.5"
        />
      ))}
      {/* Fine */}
      <ellipse cx="148" cy="310" rx="11" ry="18" fill="url(#darkGrad)" />
      <ellipse cx="148" cy="310" rx="7" ry="13" fill="#a0b0c4" opacity="0.4" />

      {/* === FOCUS KNOBS — RIGHT === */}
      <ellipse cx="244" cy="268" rx="16" ry="28" fill="url(#blueGrad)" />
      <ellipse cx="244" cy="268" rx="10" ry="22" fill="#60a5fa" opacity="0.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1="232" y1={246 + i * 6}
          x2="256" y2={246 + i * 6}
          stroke="#1d4ed8" strokeWidth="1.5" opacity="0.5"
        />
      ))}
      <ellipse cx="244" cy="310" rx="11" ry="18" fill="url(#darkGrad)" />
      <ellipse cx="244" cy="310" rx="7" ry="13" fill="#a0b0c4" opacity="0.4" />

      {/* === OBJECTIVE TURRET === */}
      <ellipse cx="195" cy="252" rx="48" ry="32" fill="url(#turretGrad)" />
      {/* Turret ring */}
      <ellipse cx="195" cy="252" rx="48" ry="32" fill="none" stroke="url(#blueGrad)" strokeWidth="2.5" />
      <ellipse cx="195" cy="252" rx="42" ry="27" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />

      {/* Objectives */}
      {/* Main active objective (front) */}
      <rect x="186" y="257" width="18" height="52" rx="5" fill="url(#bodyGrad)" />
      <ellipse cx="195" cy="309" rx="9" ry="5" fill="url(#lensGrad)" filter="url(#glow)" />
      <ellipse cx="195" cy="309" rx="6" ry="3.5" fill="#93c5fd" opacity="0.8" />
      <ellipse cx="193" cy="307" rx="2.5" ry="1.5" fill="white" opacity="0.6" />
      {/* Left objective */}
      <rect x="155" y="252" width="13" height="38" rx="4" fill="#b0bece" />
      <ellipse cx="161" cy="290" rx="6.5" ry="4" fill="url(#lensGrad)" opacity="0.7" />
      {/* Right objective */}
      <rect x="225" y="252" width="13" height="38" rx="4" fill="#b0bece" />
      <ellipse cx="231" cy="290" rx="6.5" ry="4" fill="url(#lensGrad)" opacity="0.7" />

      {/* === EYEPIECE TUBE === */}
      <rect x="180" y="68" width="30" height="76" rx="8" fill="url(#bodyGrad)" />
      {/* Tube highlight */}
      <rect x="180" y="68" width="8" height="76" rx="4" fill="white" opacity="0.25" />
      {/* Ring accents */}
      <rect x="178" y="90" width="34" height="5" rx="2" fill="url(#blueGrad)" opacity="0.7" />
      <rect x="178" y="115" width="34" height="4" rx="2" fill="url(#darkGrad)" opacity="0.6" />

      {/* === EYEPIECE HEAD === */}
      <ellipse cx="195" cy="68" rx="22" ry="10" fill="url(#darkGrad)" />
      <rect x="173" y="52" width="44" height="20" rx="8" fill="url(#darkGrad)" />
      {/* Eyepiece lens */}
      <ellipse cx="195" cy="52" rx="18" ry="8" fill="url(#lensGrad)" filter="url(#glow)" />
      <ellipse cx="195" cy="52" rx="12" ry="5.5" fill="#93c5fd" opacity="0.7" />
      <ellipse cx="191" cy="49" rx="5" ry="3" fill="white" opacity="0.55" />
      {/* Top cap */}
      <ellipse cx="195" cy="44" rx="16" ry="7" fill="url(#darkGrad)" />
      <ellipse cx="195" cy="44" rx="10" ry="4.5" fill="#b0c4e0" opacity="0.4" />

      {/* === HOLOGRAPHIC SCAN RING around stage === */}
      {/* Static outer ring */}
      <ellipse cx="195" cy="370" rx="48" ry="16"
        fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" strokeDasharray="6 4" />
      {/* Static inner ring */}
      <ellipse cx="195" cy="370" rx="36" ry="12"
        fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.2" />
      {/* Animated scan dot */}
      <circle cx={sx} cy={sy / 7.17 + 318} r="3" fill="#60a5fa" filter="url(#softGlow)" opacity="0.85" />
      <circle cx={sx} cy={sy / 7.17 + 318} r="6" fill="#3b82f6" opacity="0.2" />

      {/* === LIGHT BEAM from objective === */}
      <path
        d={`M 188 310 L 175 358 M 202 310 L 215 358`}
        stroke="#93c5fd" strokeWidth="1" opacity="0.25" strokeDasharray="4 3"
      />

      {/* === REFLECTIVE HIGHLIGHTS on arm === */}
      <rect x="181" y="155" width="4" height="80" rx="2" fill="white" opacity="0.18" />
      <rect x="207" y="200" width="3" height="50" rx="1.5" fill="white" opacity="0.1" />

      {/* Microscope brand label */}
      <rect x="186" y="190" width="36" height="14" rx="3" fill="#1d2d4a" opacity="0.6" />
      <text x="204" y="201" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="600" fontFamily="monospace" letterSpacing="1">ZEISS</text>
    </svg>
  );
}
