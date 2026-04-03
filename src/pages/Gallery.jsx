import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const IMAGES = [
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/9cce3e88e_generated_1794015b.png', alt: { fr: 'Couple dans une rue parisienne', en: 'Couple on a Parisian street' }, category: 'Mode' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/71522133f_generated_c731faab.png', alt: { fr: 'Portrait noir et blanc', en: 'Black and white portrait' }, category: 'Mode' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/4612195c1_generated_b5960717.png', alt: { fr: 'Resort à Bali', en: 'Bali resort' }, category: 'Voyage' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/95245b6d9_generated_a385d92e.png', alt: { fr: 'Rooftop de nuit', en: 'Night rooftop' }, category: 'Mode' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/bc7f4cb12_generated_473b7f3b.png', alt: { fr: 'Cuisine ensemble', en: 'Cooking together' }, category: 'Lifestyle' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/0c29c7dcc_generated_fdd8da89.png', alt: { fr: 'Désert du Sahara', en: 'Sahara Desert' }, category: 'Voyage' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/7f46acb12_generated_41aee0e9.png', alt: { fr: 'Détails bijoux', en: 'Jewelry details' }, category: 'Lifestyle' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/49710cc26_generated_bb1180cf.png', alt: { fr: 'Fashion show', en: 'Fashion show' }, category: 'Mode' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/c1e2ef2ae_generated_e05319cc.png', alt: { fr: 'Yacht Méditerranée', en: 'Mediterranean yacht' }, category: 'Voyage' },
  { src: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/501cc51cc_generated_355b0791.png', alt: { fr: 'Petit-déjeuner lifestyle', en: 'Lifestyle breakfast' }, category: 'Lifestyle' },
];

export default function Gallery() {
  const lang = useLanguage();
  const [filter, setFilter] = useState('All');
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  const categories = [
    { key: 'All', label: t(lang, 'gallery.all') },
    { key: 'Mode', label: lang === 'fr' ? 'Mode' : 'Fashion' },
    { key: 'Voyage', label: lang === 'fr' ? 'Voyage' : 'Travel' },
    { key: 'Lifestyle', label: 'Lifestyle' },
  ];

  const filtered = filter === 'All' ? IMAGES : IMAGES.filter((img) => img.category === filter);

  return (
    <div ref={scrollRef} className="bg-background min-h-screen">
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="h-[50vh] md:h-[60vh] flex flex-col items-center justify-center px-6"
      >
        <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'gallery.tag')}</p>
        <h1 className="font-display text-4xl md:text-7xl lg:text-8xl text-foreground text-center">{t(lang, 'gallery.title')}</h1>
        <p className="font-body text-muted-foreground text-sm mt-6 max-w-md text-center leading-relaxed">{t(lang, 'gallery.desc')}</p>
      </motion.div>

      <div className="sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`font-body text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 pb-1 border-b-2 ${
                filter === cat.key ? 'text-accent border-accent' : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <HorizontalGallery images={filtered} lang={lang} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <ScrollReveal>
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-12">{t(lang, 'gallery.full')}</h2>
        </ScrollReveal>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <ScrollReveal key={img.src + i} delay={i * 0.05}>
              <div className="break-inside-avoid group overflow-hidden rounded-sm">
                <img src={img.src} alt={img.alt[lang]} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="py-3 flex justify-between items-center">
                  <span className="font-body text-xs text-muted-foreground">{img.alt[lang]}</span>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/60">{img.category}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function HorizontalGallery({ images, lang }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['5%', `-${(images.length - 2) * 30}%`]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-20 md:top-24 h-[calc(100vh-5rem)] overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-10">
          {images.map((img, i) => (
            <motion.div key={img.src + i} className="flex-shrink-0 w-[75vw] md:w-[40vw] lg:w-[30vw] group">
              <div className="overflow-hidden rounded-sm h-[60vh] md:h-[65vh]">
                <img src={img.src} alt={img.alt[lang]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-body text-sm text-foreground">{img.alt[lang]}</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/60">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}