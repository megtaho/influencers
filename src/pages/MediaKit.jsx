import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Instagram, Youtube, Music, Users, TrendingUp, Eye, Heart, Share2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const HERO_IMG = 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/9cce3e88e_generated_1794015b.png';

export default function MediaKit() {
  const lang = useLanguage();

  const platforms = [
    { name: 'Instagram', icon: Instagram, followers: '2.4M', engagement: '4.8%', color: 'from-pink-500 to-purple-500' },
    { name: 'YouTube', icon: Youtube, followers: '890K', engagement: '6.2%', color: 'from-red-500 to-red-600' },
    { name: 'TikTok', icon: Music, followers: '3.1M', engagement: '8.5%', color: 'from-cyan-400 to-blue-500' },
  ];

  const stats = [
    { icon: Users, value: '6.4M+', label: t(lang, 'media.community') },
    { icon: Eye, value: '45M+', label: t(lang, 'media.impressions') },
    { icon: Heart, value: '5.8%', label: t(lang, 'media.engagement') },
    { icon: Share2, value: '2,400+', label: t(lang, 'media.contents') },
  ];

  const services = [
    { title: t(lang, 'media.s1.title'), desc: t(lang, 'media.s1.desc') },
    { title: t(lang, 'media.s2.title'), desc: t(lang, 'media.s2.desc') },
    { title: t(lang, 'media.s3.title'), desc: t(lang, 'media.s3.desc') },
    { title: t(lang, 'media.s4.title'), desc: t(lang, 'media.s4.desc') },
  ];

  const brands = ['Louis Vuitton', 'Dior', 'Chanel', 'Gucci', 'Cartier', 'Four Seasons', 'Aman Resorts', 'Emirates', 'BMW', 'Apple', 'Lancôme', 'YSL Beauty', 'Rolex', 'Hermès', 'Bulgari'];

  return (
    <div className="bg-background min-h-screen">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={HERO_IMG} alt="Les Gawas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-white/60 text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'media.collab')}</p>
          <h1 className="font-display text-4xl md:text-7xl text-white">Media Kit</h1>
          <p className="font-body text-white/60 text-sm mt-3">Les Gawas · Megan & Imaan</p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'media.numbers.tag')}</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">{t(lang, 'media.numbers.title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 md:mt-16">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 0.1} />)}
        </div>
      </section>

      <section className="bg-card py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'media.platforms.tag')}</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">{t(lang, 'media.platforms.title')}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {platforms.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div className="bg-background rounded-lg p-8 border border-border hover:border-accent/30 transition-colors duration-300 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6`}>
                    <p.icon className="text-white" size={22} />
                  </div>
                  <h3 className="font-display text-xl text-foreground">{p.name}</h3>
                  <p className="font-display text-3xl md:text-4xl text-foreground mt-4">{p.followers}</p>
                  <p className="font-body text-muted-foreground text-sm mt-1">{t(lang, 'media.followers')}</p>
                  <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">{t(lang, 'media.engagementLabel')}</span>
                    <span className="font-display text-lg text-accent">{p.engagement}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'media.services.tag')}</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">{t(lang, 'media.services.title')}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="p-8 border border-border rounded-lg hover:border-accent/30 transition-all duration-300 group">
                <span className="font-body text-accent/40 text-xs tracking-[0.3em]">0{i + 1}</span>
                <h3 className="font-display text-xl md:text-2xl text-foreground mt-3 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mt-3">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-card py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'media.brands.tag')}</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-12">{t(lang, 'media.brands.title')}</h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-x-10 gap-y-6 justify-center items-center">
            {brands.map((b, i) => (
              <ScrollReveal key={b} delay={i * 0.03}>
                <span className="font-display text-lg md:text-xl text-muted-foreground/40 hover:text-foreground/80 transition-colors duration-300 cursor-default">{b}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 text-center px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">{t(lang, 'media.cta')}</h2>
          <a href="/contact" className="inline-block mt-8 px-10 py-4 bg-accent text-accent-foreground font-body text-sm tracking-[0.2em] uppercase rounded-sm hover:bg-accent/90 transition-colors">
            {t(lang, 'media.ctabtn')}
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}

function StatCard({ stat, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="text-center md:text-left">
        <stat.icon className="mx-auto md:mx-0 text-accent mb-4" size={24} />
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="font-display text-3xl md:text-4xl text-foreground"
        >
          {stat.value}
        </motion.p>
        <p className="font-body text-muted-foreground text-xs tracking-wider mt-2">{stat.label}</p>
      </div>
    </ScrollReveal>
  );
}