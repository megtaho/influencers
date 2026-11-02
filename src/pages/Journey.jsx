import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import ScrollReveal from '../components/ScrollReveal';
import MediaCube from '../components/MediaCube';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const FASHION_IMG = '/IMG3.JPG';
const TRAVEL_IMG = '/IMG2.jpg';
const LIFESTYLE_IMG = '/IMG1.PNG';
const MEGAN_IMG = '/IMG_1001.jpg';
const IMAAN_IMG = '/IMG_5276.jpg';

export default function Journey() {
  const lang = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const chapters = [
    {
      number: '01', tag: t(lang, 'journey.fashion.tag'),
      title: t(lang, 'journey.fashion.title'), desc: t(lang, 'journey.fashion.desc'),
      image: FASHION_IMG, alt: 'Fashion',
      stats: [{ label: t(lang, 'journey.collab'), value: '20+' }],
    },
    {
      number: '02', tag: t(lang, 'journey.travel.tag'),
      title: t(lang, 'journey.travel.title'), desc: t(lang, 'journey.travel.desc'),
      image: TRAVEL_IMG, alt: 'Travel',
      stats: [{ label: t(lang, 'journey.countries'), value: '10' }, { label: t(lang, 'journey.partners'), value: '15+' }],
    },
    {
      number: '03', tag: t(lang, 'journey.lifestyle.tag'),
      title: t(lang, 'journey.lifestyle.title'), desc: t(lang, 'journey.lifestyle.desc'),
      image: LIFESTYLE_IMG, alt: 'Lifestyle',
      stats: [{ label: t(lang, 'journey.brands'), value: '30+' }, { label: t(lang, 'journey.content'), value: '70+' }],
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[42vh] md:h-[48vh] pt-16 md:pt-20 flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center px-6">
          <h1 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl text-foreground leading-none">{t(lang, 'journey.tag')}</h1>
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            {t(lang, 'journey.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Meet section */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-4 md:pt-8 pb-16 md:pb-24">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'journey.about.tag')}</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Megan & Imaan</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <MemberCard
            name={t(lang, 'journey.megan.title')}
            role={t(lang, 'journey.megan.role')}
            image={MEGAN_IMG}
            cube={[
              { type: 'image', src: MEGAN_IMG, alt: 'Megan', position: 'top' },
              { type: 'video', src: '/megan-cube-1.mp4' },
              { type: 'image', src: '/megan-cube-portrait.jpg', alt: 'Megan' },
              { type: 'video', src: '/megan-cube-4.mp4' },
              { type: 'image', src: '/megan-cube-orange.jpg', alt: 'Megan', position: 'center 30%' },
              { type: 'video', src: '/megan-cube-3.mp4' },
            ]}
            chapters={[1, 2, 3, 4].map((n) => ({ label: t(lang, `journey.bio.tab${n}`), text: t(lang, `journey.megan.bio${n}`) }))}
            delay={0}
          />
          <MemberCard
            name={t(lang, 'journey.imaan.title')}
            role={t(lang, 'journey.imaan.role')}
            image={IMAAN_IMG}
            cube={[
              { type: 'image', src: IMAAN_IMG, alt: 'Imaan', position: 'center 40%' },
              { type: 'video', src: '/imaan-cube-1.mp4' },
              { type: 'image', src: '/imaan-cube-a.jpg', alt: 'Imaan', position: 'center 45%' },
              { type: 'video', src: '/imaan-cube-2.mp4' },
              { type: 'image', src: '/imaan-cube-b.jpg', alt: 'Imaan', position: 'center 45%' },
              { type: 'video', src: '/imaan-cube-3.mp4' },
            ]}
            chapters={[1, 2, 3, 4].map((n) => ({ label: t(lang, `journey.bio.tab${n}`), text: t(lang, `journey.imaan.bio${n}`) }))}
            delay={0.15}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-px bg-border" />
      </div>

      {/* Chapters */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {chapters.map((ch, i) => (
          <ParallaxSection key={ch.number} imageSrc={ch.image} imageAlt={ch.alt} reverse={i % 2 !== 0} speed={0.2}>
            <ScrollReveal delay={0.1}>
              <span className="font-body text-accent text-xs tracking-[0.3em] uppercase">{ch.tag}</span>
              <p className="font-body text-muted-foreground/30 text-6xl md:text-8xl font-light mt-2">{ch.number}</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mt-4 whitespace-pre-line">{ch.title}</h2>
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-6 max-w-md">{ch.desc}</p>
              <div className="flex gap-10 mt-8">
                {ch.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl md:text-3xl text-foreground">{s.value}</p>
                    <p className="font-body text-muted-foreground text-xs tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </ParallaxSection>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 md:py-40 text-center px-6">
        <ScrollReveal>
          <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">Continue</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {lang === 'fr' ? <>Explorez nos <span className="text-accent">collaborations</span></> : <>Explore our <span className="text-accent">collaborations</span></>}
          </h2>
          <Link to="/gallery" className="inline-block mt-8 font-body text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-accent transition-colors group">
            {lang === 'fr' ? 'Voir les collaborations' : 'See collaborations'} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}

function MemberCard({ name, role, image, chapters, delay, cube }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="flex flex-col gap-6">
        {cube ? <MediaCube items={cube} /> : <TiltPhoto image={image} name={name} />}
        <div>
          <h3 className="font-display text-2xl text-foreground">{name}</h3>
          <p className="font-body text-accent text-sm mt-1">{role}</p>
          <BioNotebook chapters={chapters} />
        </div>
      </div>
    </ScrollReveal>
  );
}

function TiltPhoto({ image, name }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="overflow-hidden rounded-sm aspect-[4/5] bg-muted"
      >
        <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
      </motion.div>
    </div>
  );
}


const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// Long bio split into numbered tabs, like flipping through a notebook.
function BioNotebook({ chapters }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const isLast = active === chapters.length - 1;

  return (
    <div className="mt-6">
      <div className="flex border-b border-border">
        {chapters.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setActive(i)}
            className={`relative flex-1 pb-3 pt-1 text-left transition-colors ${i === active ? 'text-foreground' : 'text-muted-foreground/60 hover:text-foreground/80'}`}
          >
            <span className="block font-display italic text-xs text-accent/80">{ROMAN[i]}</span>
            <span className="block font-body text-[10px] md:text-[11px] tracking-[0.15em] uppercase mt-0.5">{c.label}</span>
            {i === active && (
              <motion.span layoutId={`bio-tab-${uid}`} className="absolute left-0 right-2 -bottom-px h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="relative min-h-[230px] md:min-h-[200px] pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35 }}
            className="flex gap-4"
          >
            <span className="font-display text-5xl leading-none text-accent/20 select-none">{ROMAN[active]}</span>
            {isLast ? (
              <blockquote className="font-display italic text-lg md:text-xl leading-snug text-foreground border-l-2 border-accent pl-4">
                « {chapters[active].text} »
              </blockquote>
            ) : (
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{chapters[active].text}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="font-body text-[11px] tracking-[0.2em] text-muted-foreground/70">
          {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
        </span>
        <button
          onClick={() => setActive((a) => (a + 1) % chapters.length)}
          aria-label="Next"
          className="group w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-accent hover:border-accent transition-colors"
        >
          {isLast ? '↺' : <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>}
        </button>
      </div>
    </div>
  );
}
