import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 3D coverflow of Instagram reels: the centered one is playable, the others tilt away.
export default function ReelCoverflow({ reels, prevLabel = 'Previous', nextLabel = 'Next' }) {
  const [active, setActive] = useState(Math.floor(reels.length / 2) - 1);
  const [cardW, setCardW] = useState(260);
  const wrapRef = useRef(null);

  useEffect(() => {
    const update = () => setCardW(window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 240 : 270);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const go = useCallback((d) => setActive((a) => (a + d + reels.length) % reels.length), [reels.length]);

  useEffect(() => {
    const onKey = (e) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const cardH = Math.round(((cardW - 14) * 19) / 9) + 14;
  const n = reels.length;

  return (
    <div ref={wrapRef} className="relative w-full">
      <motion.div
        className="relative mx-auto"
        style={{ height: cardH + 60, perspective: '1600px' }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        {reels.map((reel, i) => {
          // shortest signed distance on the loop
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const abs = Math.abs(o);
          const isActive = o === 0;
          return (
            <motion.div
              key={reel.code}
              className="absolute top-6 left-1/2"
              style={{ width: cardW, marginLeft: -cardW / 2, transformStyle: 'preserve-3d', zIndex: 20 - abs }}
              initial={false}
              animate={{
                x: o * cardW * 0.62,
                rotateY: Math.max(-50, Math.min(50, -o * 32)),
                scale: 1 - Math.min(abs, 3) * 0.12,
                z: -abs * 80,
                opacity: abs > 2 ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              <div
                className="relative rounded-[2.2rem] p-[7px] bg-[#111] transition-shadow duration-500"
                style={{
                  boxShadow: isActive
                    ? `0 30px 80px -20px ${reel.color}aa, 0 0 0 1.5px ${reel.color}`
                    : '0 20px 50px -20px rgba(0,0,0,0.5)',
                }}
              >
                <div className="relative bg-black rounded-[1.8rem] overflow-hidden aspect-[9/19]">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20" />
                  {abs <= 2 && (
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.code}/embed`}
                      allowFullScreen
                      scrolling="no"
                      referrerPolicy="no-referrer"
                      allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      className="w-full h-full border-0"
                      title={`Instagram reel ${reel.code}`}
                      loading="lazy"
                    />
                  )}
                  {!isActive && (
                    <button
                      onClick={() => setActive(i)}
                      aria-label={`Reel ${i + 1}`}
                      className="absolute inset-0 z-30 bg-black/35 hover:bg-black/15 transition-colors cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {/* reflection */}
              <div
                className="mx-6 mt-3 h-4 rounded-full blur-xl transition-opacity duration-500"
                style={{ backgroundColor: reel.color, opacity: isActive ? 0.5 : 0.15 }}
                aria-hidden="true"
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="w-12 h-12 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {reels.map((reel, i) => (
            <button
              key={reel.code}
              onClick={() => setActive(i)}
              aria-label={`Reel ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: i === active ? 32 : 6, backgroundColor: i === active ? reel.color : 'hsl(var(--foreground) / 0.2)' }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="w-12 h-12 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
