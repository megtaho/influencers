import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '../lib/translations';

// Paper texture + spine shading shared by every page.
const paper = 'bg-[#fbf7f1] text-[#1c1712]';
const spineShadeRight = 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 6%, transparent 14%)';
const spineShadeLeft = 'linear-gradient(270deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 6%, transparent 14%)';

function Face({ side, children, className = '' }) {
  // side: 'front' = right-hand page, 'back' = left-hand page (mirrored)
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: side === 'back' ? 'rotateY(180deg)' : undefined,
        borderRadius: side === 'back' ? '10px 0 0 10px' : '0 10px 10px 0',
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: side === 'back' ? spineShadeLeft : spineShadeRight }}
      />
    </div>
  );
}

function Cover({ lang }) {
  return (
    <div className="relative h-full w-full bg-[#1c1712] text-[#f3e9dc] flex flex-col items-center justify-end p-[6cqw] pb-[5cqw] text-center">
      <img
        src="/book-cover.jpg"
        alt="Imaan & Megan"
        className="absolute inset-0 h-full w-full object-cover object-[45%_center]"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-[2.2cqw] border border-[#f3e9dc]/40 rounded-[6px]" />
      <h3 className="relative font-display text-[6.5cqw] leading-none">Les Gawas</h3>
      <div className="relative w-[6cqw] h-px bg-[#c9864a] my-[2cqw]" />
      <p className="relative font-display italic text-[2cqw] text-[#f3e9dc]/90">Imaan & Megan</p>
      <p className="relative mt-[2.5cqw] font-body uppercase tracking-[0.3em] text-[1cqw] text-[#f3e9dc]/60">
        {t(lang, 'book.open')}
      </p>
    </div>
  );
}

function StoryPage({ lang, k, n, first = false }) {
  return (
    <div className={`${paper} relative h-full w-full flex flex-col justify-center p-[5.5cqw]`}>
      <span className="absolute top-[3.5cqw] left-[5.5cqw] font-display italic text-[1.2cqw] text-[#a0643a]/70">Les Gawas</span>
      <p
        className={
          first
            ? 'font-display italic text-[4cqw] leading-[1.15] text-[#1c1712]'
            : 'font-display text-[2.1cqw] leading-[1.6] text-[#1c1712]/85 first-letter:float-left first-letter:font-display first-letter:text-[5.4cqw] first-letter:leading-[0.85] first-letter:mr-[0.8cqw] first-letter:mt-[0.4cqw] first-letter:text-[#c46d36]'
        }
      >
        {t(lang, k)}
      </p>
      <span className="absolute bottom-[3cqw] left-1/2 -translate-x-1/2 font-body text-[1cqw] tracking-[0.2em] text-[#1c1712]/35">— {n} —</span>
    </div>
  );
}

function PhotoPage({ src, alt }) {
  return (
    <div className="relative h-full w-full bg-[#fbf7f1] p-[3.5cqw]">
      <div className="relative h-full w-full overflow-hidden rounded-[4px] shadow-[0_6px_20px_rgba(0,0,0,0.25)] rotate-[-1.5deg]">
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-[45%_center]" draggable={false} loading="lazy" />
      </div>
    </div>
  );
}

const SPARKLES = [
  { top: '18%', left: '22%', size: 2.2, delay: '0s' },
  { top: '26%', left: '74%', size: 1.6, delay: '0.6s' },
  { top: '58%', left: '16%', size: 1.4, delay: '1.2s' },
  { top: '64%', left: '80%', size: 2, delay: '0.3s' },
  { top: '12%', left: '50%', size: 1.3, delay: '0.9s' },
  { top: '76%', left: '46%', size: 1.5, delay: '1.5s' },
];

function HeartPage({ lang }) {
  return (
    <div className={`${paper} relative h-full w-full flex flex-col items-center justify-center text-center p-[5cqw]`}>
      <div className="relative w-[22cqw] h-[22cqw] flex items-center justify-center">
        {SPARKLES.map((sp, i) => (
          <span
            key={i}
            className="book-sparkle absolute text-[#e0a24a]"
            style={{ top: sp.top, left: sp.left, fontSize: `${sp.size}cqw`, animationDelay: sp.delay }}
          >
            ✦
          </span>
        ))}
        <svg viewBox="0 0 24 24" className="book-heart w-[11cqw] h-[11cqw]" aria-hidden="true">
          <defs>
            <linearGradient id="bookHeartGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff6b8b" />
              <stop offset="100%" stopColor="#d6264f" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bookHeartGrad)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
      <p className="font-display italic text-[2.4cqw] mt-[1cqw]">Imaan, Megan & Yuki</p>
      <Link
        to="/journey"
        onClick={(e) => e.stopPropagation()}
        className="mt-[3cqw] inline-flex items-center gap-[1cqw] rounded-full bg-[#1c1712] text-[#fbf7f1] px-[2.6cqw] py-[1.2cqw] font-body uppercase tracking-[0.2em] text-[1cqw] hover:bg-[#c46d36] transition-colors"
      >
        {t(lang, 'home.cta')} →
      </Link>
    </div>
  );
}

export default function Book3D({ lang }) {
  const [current, setCurrent] = useState(0); // number of flipped leaves
  const wrapRef = useRef(null);
  const draggedRef = useRef(false);

  const leaves = [
    { front: <Cover lang={lang} />, back: <StoryPage lang={lang} k="story.p1" n={1} first />, cover: true },
    { front: <StoryPage lang={lang} k="story.p2" n={2} />, back: <StoryPage lang={lang} k="story.p3" n={3} /> },
    { front: <StoryPage lang={lang} k="story.p4" n={4} />, back: <StoryPage lang={lang} k="story.p5" n={5} /> },
    { front: <StoryPage lang={lang} k="story.p6" n={6} />, back: <PhotoPage src="/book-cover.jpg" alt="Imaan, Megan & Yuki" /> },
  ];
  const total = leaves.length;

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, total)), [total]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  // Keyboard arrows when the book is on screen.
  useEffect(() => {
    const onKey = (e) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Mouse tilt for depth.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [16, 4]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Center the closed book (only cover visible) and the finished book.
  const shift = current === 0 ? '-25%' : '0%';

  return (
    <div ref={wrapRef} className="w-full flex flex-col items-center select-none">
      <div
        className="relative w-full max-w-[980px] py-10 md:py-16"
        style={{ perspective: '2200px' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Floor shadow */}
        <motion.div
          className="absolute left-1/2 bottom-2 md:bottom-6 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-2xl"
          animate={{ x: current === 0 ? '-62%' : '-50%', scaleX: current === 0 ? 0.55 : 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        />

        <motion.div
          className="relative mx-auto w-full aspect-[3/2] cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', rotateX: rotX, rotateY: rotY, containerType: 'inline-size' }}
          animate={{ x: shift }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }}
          onPanStart={() => {
            draggedRef.current = true;
          }}
          onPanEnd={(_, info) => {
            setTimeout(() => (draggedRef.current = false), 0);
            if (info.offset.x < -40) next();
            else if (info.offset.x > 40) prev();
          }}
        >
          {/* Base right page, shown once every leaf is turned */}
          <div
            className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden shadow-2xl"
            style={{ borderRadius: '0 10px 10px 0', transform: 'translateZ(-2px)' }}
          >
            <HeartPage lang={lang} />
            <div className="pointer-events-none absolute inset-0" style={{ background: spineShadeRight }} />
          </div>

          {/* Page edges (thickness) */}
          <div
            className="absolute top-[0.6%] left-1/2 w-1/2 h-[98.8%] rounded-r-[10px] bg-[repeating-linear-gradient(90deg,#efe6d9_0_1px,#fbf7f1_1px_3px)]"
            style={{ transform: 'translateZ(-4px) translateX(5px)' }}
          />

          {leaves.map((leaf, i) => {
            const flipped = i < current;
            return (
              <motion.div
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  zIndex: flipped ? i : total - i,
                }}
                initial={false}
                animate={{ rotateY: flipped ? -180 : 0, z: flipped ? i * 0.6 : (total - i) * 0.6 }}
                transition={{ type: 'spring', stiffness: 55, damping: 14, mass: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (draggedRef.current) return;
                  if (flipped) prev();
                  else next();
                }}
              >
                <Face side="front" className={`shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${leaf.cover ? '' : paper}`}>
                  {leaf.front}
                </Face>
                <Face side="back" className={`shadow-[0_10px_40px_rgba(0,0,0,0.2)] ${paper}`}>
                  {leaf.back}
                </Face>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 mt-2">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label={t(lang, 'book.prev')}
          className="w-11 h-11 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: total + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-accent' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === total}
          aria-label={t(lang, 'book.next')}
          className="w-11 h-11 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-4">{t(lang, 'book.hint')}</p>
    </div>
  );
}
