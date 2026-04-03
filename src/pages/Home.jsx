import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Upload, Play } from 'lucide-react';
import VideoScrubber from '../components/VideoScrubber';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const DEFAULT_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export default function Home() {
  const lang = useLanguage();
  const heroRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(DEFAULT_VIDEO);
  const fileInputRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <div className="bg-background">
      <div ref={heroRef} className="relative">
        <VideoScrubber videoSrc={videoSrc} />
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="fixed top-0 left-0 right-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-body text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          >
            {t(lang, 'home.tagline')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-8xl lg:text-9xl text-white text-center leading-none"
          >
            Les Gawas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-body text-white/60 text-sm md:text-base italic mt-4"
          >
            Megan & Imaan
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="font-body text-white/50 text-xs md:text-sm tracking-widest uppercase mt-4"
          >
            {t(lang, 'home.intro')}
          </motion.p>
        </motion.div>
        {/* Upload button - only visible to admin */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="fixed bottom-8 right-6 z-10"
        >
          <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white font-body text-[10px] tracking-[0.2em] uppercase px-3 py-2 rounded-sm transition-all hover:bg-black/60 border border-white/10"
          >
            <Upload size={12} />
            {lang === 'fr' ? 'Changer vidéo' : 'Change video'}
          </button>
        </motion.div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-body text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="text-white/40" size={18} />
          </motion.div>
        </motion.div>
      </div>

      <section className="relative z-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-40">
          <ScrollReveal>
            <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'home.universe')}</p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight whitespace-pre-line">
              {t(lang, 'home.story').split('\n')[0]}<br />
              <span className="text-accent">{t(lang, 'home.story').split('\n')[1]}</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mt-16 md:mt-24">
            <ChapterCard number="01" title={t(lang, 'home.ch1.title')} description={t(lang, 'home.ch1.desc')} delay={0} />
            <ChapterCard number="02" title={t(lang, 'home.ch2.title')} description={t(lang, 'home.ch2.desc')} delay={0.15} />
            <ChapterCard number="03" title={t(lang, 'home.ch3.title')} description={t(lang, 'home.ch3.desc')} delay={0.3} />
          </div>

          <ScrollReveal delay={0.4} className="mt-20 text-center">
            <Link
              to="/journey"
              className="inline-flex items-center gap-3 font-body text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-accent transition-colors duration-300 group"
            >
              {t(lang, 'home.cta')}
              <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function ChapterCard({ number, title, description, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group cursor-pointer">
        <span className="font-body text-accent/50 text-xs tracking-[0.3em]">{number}</span>
        <h3 className="font-display text-2xl md:text-3xl text-foreground mt-2 mb-4 group-hover:text-accent transition-colors duration-300">{title}</h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed">{description}</p>
        <div className="mt-6 h-px bg-border group-hover:bg-accent/40 transition-colors duration-500" />
      </div>
    </ScrollReveal>
  );
}