import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Users, Eye, Heart, Share2, ArrowUpRight } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa6';
import ScrollReveal from '../components/ScrollReveal';
import { PaparazziFlashes, Barcode } from '../components/MagazineHero';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const HERO_IMG = '/IMG_4661.jpg';

export default function MediaKit() {
  const lang = useLanguage();

  const platforms = [
    { name: 'Instagram', icon: FaInstagram, followers: '122k', engagement: '8%', color: 'from-pink-500 to-purple-500', href: 'https://www.instagram.com/les.gawas/' },
    { name: 'YouTube', icon: FaYoutube, followers: '1.72k', engagement: '1.2%', color: 'from-red-500 to-red-600', href: 'https://www.youtube.com/@Lesgawas' },
    { name: 'TikTok', icon: FaTiktok, followers: '81.2k', engagement: '6.5%', color: 'from-neutral-900 to-black', href: 'https://www.tiktok.com/@les.gawas' },
  ];

  const stats = [
    { icon: Users, value: '205k+', label: t(lang, 'media.community') },
    { icon: Eye, value: '2M+', label: t(lang, 'media.impressions') },
    { icon: Heart, value: '8%', label: t(lang, 'media.engagement') },
    { icon: Share2, value: '400+', label: t(lang, 'media.contents') },
  ];

  const services = [
    { title: t(lang, 'media.s1.title'), desc: t(lang, 'media.s1.desc') },
    { title: t(lang, 'media.s2.title'), desc: t(lang, 'media.s2.desc') },
    { title: t(lang, 'media.s3.title'), desc: t(lang, 'media.s3.desc') },
    { title: t(lang, 'media.s4.title'), desc: t(lang, 'media.s4.desc') },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="relative h-[90vh] md:h-screen overflow-hidden bg-black">
        <img src={HERO_IMG} alt="Les Gawas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/50" />
        <PaparazziFlashes />

        <div className="relative z-10 h-full flex flex-col px-6 md:px-14 py-8 md:py-12">
          <div className="flex items-start justify-between">
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white bg-accent px-3 py-1 mt-16 md:mt-20">
              {t(lang, 'media.collab')}
            </span>
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 text-right">
              {lang === 'fr' ? 'Édition' : 'Issue'} N°01 — 2026
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="font-display text-6xl sm:text-7xl md:text-9xl text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              LES GAWAS
            </h1>
            <div className="w-24 h-[2px] bg-accent my-4 md:my-6" />
            <p className="font-body text-white/80 text-sm md:text-base tracking-[0.5em] uppercase">Media Kit</p>
          </div>

          <div className="flex items-end justify-between">
            <p className="font-body text-white/70 text-xs md:text-sm">Les Gawas · Megan & Imaan</p>
            <Barcode label="MEDIA KIT · 2026" />
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-2">{t(lang, 'media.numbers.tag')}</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">{t(lang, 'media.numbers.title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border rounded-2xl overflow-hidden mt-12 md:mt-16">
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
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block bg-background rounded-lg p-8 border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} aria-hidden="true" />

                  <div className="relative flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6`}>
                      <p.icon className="text-white" size={22} />
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
                  </div>
                  <h3 className="relative font-display text-xl text-foreground">{p.name}</h3>
                  <p className="relative font-display text-3xl md:text-4xl text-foreground mt-4">{p.followers}</p>
                  <p className="relative font-body text-muted-foreground text-sm mt-1">{t(lang, 'media.followers')}</p>
                  <div className="relative mt-6 pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">{t(lang, 'media.engagementLabel')}</span>
                    <span className="font-display text-lg text-accent">{p.engagement}</span>
                  </div>
                </a>
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

    </div>
  );
}

function parseStatValue(value) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

function useCountUp(target, isInView, duration = 1.4) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start;
    let raf;
    function step(ts) {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return display;
}

function StatCard({ stat, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { number, suffix } = parseStatValue(stat.value);
  const display = useCountUp(number, isInView, 1.4 + delay);

  return (
    <ScrollReveal delay={delay}>
      <div
        ref={ref}
        className="relative border-r border-b border-border px-6 py-10 md:py-14 flex flex-col items-center text-center group hover:bg-card transition-colors duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
          <stat.icon className="text-accent" size={20} />
        </div>
        <p className="font-display text-4xl md:text-5xl text-foreground tabular-nums">
          {display}
          {suffix}
        </p>
        <p className="font-body text-muted-foreground text-xs tracking-[0.15em] uppercase mt-3">{stat.label}</p>
      </div>
    </ScrollReveal>
  );
}