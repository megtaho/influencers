import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const logo = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const COLLECTIONS = {
  Mode: [
    { name: { fr: 'Hijab', en: 'Hijab' }, items: [
      { id: '7583782018144554262' },
      { id: '7465802918327799062' },
    ] },
    { name: { fr: 'La Broderie', en: 'La Broderie' }, items: [
      { id: '7575997398128807171' },
    ] },
    { name: { fr: 'Octopied Mind', en: 'Octopied Mind' }, items: [
      { id: '7560429037454265622' },
    ] },
    { name: { fr: 'Gawa Fashion', en: 'Gawa Fashion' }, items: [
      { id: '7550019632439102742' },
      { id: '7522225508382215446' },
      { id: '7433043857497115936' },
      { id: '7417912936263404832' },
    ] },
    { name: { fr: 'Zara', en: 'Zara' }, logo: logo('zara.com'), items: [
      { id: '7372631320180133153' },
    ] },
    { name: { fr: 'Favorite Child Collective', en: 'Favorite Child Collective' }, items: [
      { id: '7520311000080370966' },
    ] },
    { name: { fr: 'Mango', en: 'Mango' }, logo: logo('mango.com'), items: [
      { id: '7442847500639243553' },
    ] },
    { name: { fr: 'Cosplay', en: 'Cosplay' }, items: [
      { id: '7393775911025265952', caption: 'Bridgerton' },
      { id: '7388620369789226272', caption: 'Shrek' },
    ] },
  ],
  Voyage: [
    { name: { fr: 'France', en: 'France' }, items: [
      { id: '7474593394837196054' },
      { id: '7596021614244875542' },
      { id: '7456168889001577750' },
    ] },
    { name: { fr: 'Brésil', en: 'Brazil' }, items: [
      { id: '7582664366982548739' },
      { id: '7578141000187612438' },
      { id: '7575181932263263510' },
    ] },
    { name: { fr: 'Trip.com', en: 'Trip.com' }, logo: logo('trip.com'), items: [
      { id: '7466503884710710550' },
    ] },
    { name: { fr: 'Grenade', en: 'Granada' }, items: [
      { id: '7394528778828959009' },
      { id: '7378506391830433056' },
    ] },
    { name: { fr: 'Angleterre', en: 'England' }, items: [
      { id: '7621270787135130902', caption: 'Radisson Hotel', logo: logo('radissonhotels.com') },
      { id: '7620879000272899350', caption: 'Cut & Craft' },
    ] },
  ],
  Lifestyle: [
    { name: { fr: 'Garnier Coloration', en: 'Garnier Coloration' }, logo: logo('garnier.com'), items: [
      { id: '7458395681858899222' },
    ] },
    { name: { fr: 'MAC Cosmetics', en: 'MAC Cosmetics' }, logo: logo('maccosmetics.com'), items: [
      { id: '7535539278827375894' },
    ] },
    { name: { fr: 'Espace Plaisir', en: 'Espace Plaisir' }, logo: logo('espaceplaisir.fr'), items: [
      { id: '7620517973844970774' },
    ] },
    { name: { fr: 'Sorbet Vitamine C', en: 'Sorbet Vitamine C' }, items: [
      { id: '7615322120234519830' },
    ] },
    { name: { fr: 'Bowling Mouffetard', en: 'Bowling Mouffetard' }, logo: logo('bowlingmouffetard.fr'), items: [
      { id: '7609768105123794198' },
      { id: '7604231877272046850' },
    ] },
    { name: { fr: 'Suno AI', en: 'Suno AI' }, logo: logo('suno.com'), items: [
      { id: '7606433639798344962' },
    ] },
    { name: { fr: 'Megan Thee Stallion', en: 'Megan Thee Stallion' }, items: [
      { id: '7594920475738918166' },
    ] },
    { name: { fr: 'App HER', en: 'App HER' }, logo: logo('weareher.com'), items: [
      { id: '7588585005643894018' },
      { id: '7564463174787992854' },
    ] },
    { name: { fr: 'Soundgame', en: 'Soundgame' }, logo: logo('thatsoundgame.com'), items: [
      { id: '7584150039837084950' },
    ] },
    { name: { fr: 'Ohmu Sofa', en: 'Ohmu Sofa' }, logo: logo('omhucph.com'), items: [
      { id: '7509584215294348566' },
      { id: '7508809640604421398' },
    ] },
    { name: { fr: 'Soins de la peau', en: 'Skincare' }, items: [
      { id: '7469496957652897047' },
      { id: '7460624458919841046' },
    ] },
    { name: { fr: 'Technologie 3D Print', en: '3D Print Technology' }, items: [
      { id: '7437574364653997345' },
    ] },
  ],
};

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

  const activeCategories = filter === 'All' ? Object.keys(COLLECTIONS) : [filter];

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

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {activeCategories.map((catKey) => (
          <CategoryBlock key={catKey} name={catKey} lang={lang} collections={COLLECTIONS[catKey]} />
        ))}
      </div>
    </div>
  );
}

function flattenCollections(collections, lang) {
  return collections.flatMap((collection) =>
    collection.items.map((item) => ({
      ...item,
      caption: item.caption || collection.name[lang],
      logo: item.logo || collection.logo,
    }))
  );
}

function CategoryBlock({ name, lang, collections }) {
  const label = name === 'Mode' ? (lang === 'fr' ? 'Mode' : 'Fashion') : name === 'Voyage' ? (lang === 'fr' ? 'Voyage' : 'Travel') : 'Lifestyle';

  return (
    <section className="mb-24 md:mb-32 last:mb-0">
      <ScrollReveal>
        <div className="flex items-center gap-6 mb-14 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-foreground whitespace-nowrap">{label}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
      </ScrollReveal>
      <MarqueeRow items={flattenCollections(collections, lang)} />
    </section>
  );
}

function MarqueeRow({ items }) {
  const loop = [...items, ...items];
  const [playing, setPlaying] = useState(false);
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    let rafId;
    const speed = 0.6;
    function tick() {
      const el = scrollerRef.current;
      if (el && !playing && !pausedRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += speed;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [playing]);

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), []);

  function nudge(direction) {
    const el = scrollerRef.current;
    if (!el) return;
    pausedRef.current = true;
    el.scrollBy({ left: direction * 400, behavior: 'smooth' });
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 900);
  }

  return (
    <ScrollReveal>
      <div className="flex items-center gap-3 md:gap-6">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Précédent"
          className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full border border-border flex items-center justify-center hover:border-accent/50 hover:scale-105 transition-all duration-300"
        >
          <span className="gallery-arrow font-display text-4xl md:text-6xl leading-none select-none">‹</span>
        </button>

        <div
          ref={scrollerRef}
          className="flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
        >
          <div className="flex w-max gap-5 md:gap-6">
            {loop.map((item, i) => (
              <div key={item.id + i} className="flex-shrink-0 w-[190px] sm:w-[210px] md:w-[230px] group">
                <div className="aspect-[9/16] rounded-sm overflow-hidden border border-border bg-black shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-accent/40 group-hover:-translate-y-1">
                  <LazyTikTok id={item.id} caption={item.caption} onPlay={() => setPlaying(true)} />
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <BrandLogo src={item.logo} alt={item.caption} size={16} />
                  <p className="font-body text-xs text-center text-muted-foreground tracking-wide">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Suivant"
          className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full border border-border flex items-center justify-center hover:border-accent/50 hover:scale-105 transition-all duration-300"
        >
          <span className="gallery-arrow font-display text-4xl md:text-6xl leading-none select-none">›</span>
        </button>
      </div>
    </ScrollReveal>
  );
}

const tiktokThumbCache = new Map();

function useTikTokThumbnail(id) {
  const [thumbnail, setThumbnail] = useState(() => tiktokThumbCache.get(id) ?? null);

  useEffect(() => {
    if (tiktokThumbCache.has(id)) {
      setThumbnail(tiktokThumbCache.get(id));
      return;
    }
    let cancelled = false;
    fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@x/video/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const url = data.thumbnail_url || null;
        tiktokThumbCache.set(id, url);
        if (!cancelled) setThumbnail(url);
      })
      .catch(() => {
        tiktokThumbCache.set(id, null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return thumbnail;
}

function LazyTikTok({ id, caption, onPlay }) {
  const [loaded, setLoaded] = useState(false);
  const thumbnail = useTikTokThumbnail(id);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          onPlay?.();
        }}
        aria-label={caption ? `${caption} — lecture` : 'Lecture'}
        className="relative w-full h-full flex flex-col items-center justify-center gap-3 bg-neutral-900 bg-cover bg-center"
        style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}
      >
        <div className="absolute inset-0 bg-black/35" />
        <span className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/25 transition-transform duration-300 group-hover:scale-110">
          <Play size={18} className="text-white fill-white ml-0.5" />
        </span>
        <span className="relative font-body text-[10px] tracking-[0.25em] uppercase text-white/40">TikTok</span>
      </button>
    );
  }

  return (
    <iframe
      src={`https://www.tiktok.com/embed/v2/${id}`}
      allowFullScreen
      scrolling="no"
      referrerPolicy="no-referrer"
      allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      className="w-full h-full border-0"
      title={caption}
    />
  );
}

function BrandLogo({ src, alt, size = 22 }) {
  if (!src) return null;
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-white border border-border shadow-sm overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="w-3/5 h-3/5 object-contain" loading="lazy" />
    </span>
  );
}

