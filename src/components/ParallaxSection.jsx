import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({ children, imageSrc, imageAlt, reverse = false, speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const imageY = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 py-20 md:py-32 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full md:w-1/2 overflow-hidden rounded-sm">
        <motion.div style={{ y: imageY }} className="relative">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-[50vh] md:h-[70vh] object-cover"
          />
        </motion.div>
      </div>
      <motion.div style={{ y }} className="w-full md:w-1/2 px-6 md:px-0">
        {children}
      </motion.div>
    </div>
  );
}