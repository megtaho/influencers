import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import ScrollReveal from '../components/ScrollReveal';
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
      <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center px-6">
          <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'journey.tag')}</p>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl text-foreground leading-none">The Journey</h1>
          <p className="font-body text-muted-foreground text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            {t(lang, 'journey.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Meet section */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'journey.about.tag')}</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Megan & Imaan</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <MemberCard
            name={t(lang, 'journey.megan.title')}
            role={t(lang, 'journey.megan.role')}
            bio={t(lang, 'journey.megan.bio')}
            image={MEGAN_IMG}
            tags={lang === 'fr' ? ['Ingénieure', 'Artiste', 'Tech', 'Activiste'] : ['Engineer', 'Artist', 'Tech', 'Love Activist']}
            delay={0}
          />
          <MemberCard
            name={t(lang, 'journey.imaan.title')}
            role={t(lang, 'journey.imaan.role')}
            bio={t(lang, 'journey.imaan.bio')}
            image={IMAAN_IMG}
            tags={lang === 'fr' ? ['Architecte', 'Artiste', 'Couture', 'Activiste'] : ['Architect', 'Artist', 'Sewing', 'Love Activist']}
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
          <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">Continuer</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            {lang === 'fr' ? <>Explorez nos <span className="text-accent">visuels</span></> : <>Explore our <span className="text-accent">visuals</span></>}
          </h2>
          <a href="/gallery" className="inline-block mt-8 font-body text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-accent transition-colors group">
            {t(lang, 'journey.cta')} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}

function MemberCard({ name, role, bio, image, tags, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-sm aspect-[4/5] bg-muted">
          <img src={image} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-foreground">{name}</h3>
          <p className="font-body text-accent text-sm mt-1">{role}</p>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mt-4">{bio}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span key={tag} className="font-body text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}