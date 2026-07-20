import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function PaparazziFlashes() {
  const flashes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: `${5 + Math.random() * 85}%`,
        left: `${3 + Math.random() * 92}%`,
        size: 30 + Math.random() * 70,
        delay: Math.random() * 5,
        repeatDelay: 1.5 + Math.random() * 4,
        duration: 0.3 + Math.random() * 0.25,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {flashes.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full bg-white"
          style={{ top: f.top, left: f.left, width: f.size, height: f.size, filter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, repeatDelay: f.repeatDelay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function Barcode({ label }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-16"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0 2px, transparent 2px 4px)' }}
        aria-hidden="true"
      />
      <span className="font-body text-white/60 text-[10px] tracking-widest">{label}</span>
    </div>
  );
}
