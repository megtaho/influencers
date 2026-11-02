import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

// Rotation that brings each face to the front, in display order.
const FACE_VIEWS = [
  { x: 0, y: 0 }, // front
  { x: 0, y: -90 }, // right
  { x: 0, y: -180 }, // back
  { x: 0, y: -270 }, // left
  { x: -90, y: 0 }, // top
  { x: 90, y: 0 }, // bottom
];

const FACE_TRANSFORMS = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
];

function Media({ item, active }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  if (item.type === 'video') {
    return (
      <video
        ref={ref}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={item.alt || ''}
      draggable={false}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectPosition: item.position || 'center' }}
    />
  );
}

// Interactive 3D cube: drag to spin, it snaps to the closest face and autoplays when idle.
export default function MediaCube({ items, interval = 3500 }) {
  const wrapRef = useRef(null);
  const [size, setSize] = useState(320);
  const [face, setFace] = useState(0);
  const [hover, setHover] = useState(false);
  const rx = useMotionValue(-8);
  const ry = useMotionValue(12);
  const drag = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = (i) => {
    const target = FACE_VIEWS[i];
    // keep spinning the short way around for Y
    const curY = ry.get();
    const turns = Math.round((curY - target.y) / 360);
    const ty = target.y + turns * 360;
    const isCap = i >= 4; // top/bottom: no Y offset so the image stays upright
    animate(rx, isCap ? target.x * 0.92 : target.x - 6, { type: 'spring', stiffness: 70, damping: 14 });
    animate(ry, isCap ? ty : ty + 10, { type: 'spring', stiffness: 70, damping: 14 });
    setFace(i);
  };

  // Autoplay through faces when not interacting.
  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => goTo((face + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [face, hover, items.length, interval]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, rx: rx.get(), ry: ry.get() };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    ry.set(drag.current.ry + dx * 0.5);
    rx.set(Math.max(-90, Math.min(90, drag.current.rx - dy * 0.5)));
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    // snap to the nearest face
    const x = rx.get();
    const y = ry.get();
    let i;
    if (x < -45) i = 4;
    else if (x > 45) i = 5;
    else {
      const k = ((Math.round(-y / 90) % 4) + 4) % 4;
      i = k;
    }
    goTo(i);
  };

  const half = size / 2;

  return (
    <div
      className="select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div ref={wrapRef} className="relative w-full aspect-square" style={{ perspective: `${size * 3}px` }}>
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
          style={{ transformStyle: 'preserve-3d', rotateX: rx, rotateY: ry, scale: 0.78 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {items.slice(0, 6).map((item, i) => (
            <div
              key={item.src}
              className="absolute inset-0 overflow-hidden bg-black"
              style={{
                transform: `${FACE_TRANSFORMS[i]} translateZ(${half}px)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
              }}
            >
              <Media item={item} active={face === i} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              {item.label && (
                <span className="absolute bottom-3 left-3 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 font-body text-[10px] tracking-[0.2em] uppercase text-white">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </motion.div>
        {/* floor shadow */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2/3 h-6 rounded-[50%] bg-black/25 blur-xl -z-10" />
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {items.slice(0, 6).map((item, i) => (
          <button
            key={item.src}
            onClick={() => goTo(i)}
            aria-label={item.label || `${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === face ? 'w-8 bg-accent' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
