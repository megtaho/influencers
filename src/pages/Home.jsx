import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Music, Instagram } from 'lucide-react';
import VideoScrubber from '../components/VideoScrubber';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const DEFAULT_VIDEO = '/video.mp4';

export default function Home() {
  const lang = useLanguage();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="bg-background">
      <div ref={heroRef} className="relative">
        <VideoScrubber videoSrc={DEFAULT_VIDEO} />
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="fixed top-0 left-0 right-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-body text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          >
            {t(lang, 'home.tagline')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-8xl lg:text-9xl text-white text-center leading-none"
          >
            Les Gawas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-body text-white/60 text-sm md:text-base italic mt-4"
          >
            Imaan & Megan
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="font-body text-white/50 text-xs md:text-sm tracking-widest uppercase mt-4"
          >
            {t(lang, 'home.intro')}
          </motion.p>
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

          {/* Video Showcase */}
          <ScrollReveal delay={0.6}>
            <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 mt-32">{t(lang, 'home.content.title')}</p>
            
            <section className="mb-20">
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 flex items-center gap-3">
                <Music className="text-accent" size={32} />
                {t(lang, 'home.tiktok')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {tiktokVideos.map((video, index) => (
                  <VideoSquare key={index} videoId={video.id} isTikTok />
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 flex items-center gap-3">
                <Instagram className="text-accent" size={32} />
                {t(lang, 'home.instagram')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {instagramVideos.map((video, index) => (
                  <VideoSquare key={index} videoId={video.id} label={video.label} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

const tiktokVideos = [
  { id: '7465802918327799062' },
  { id: '7558602416728444182' },
  { id: '7396406633397538080' }
];

const instagramVideos = [
  { id: 'DV-6yOlAGbB', label: 'Interview Pinknews' },
  { id: 'DFgPOPTuF4E', label: 'Vidéo 1' },
  { id: 'DPhiYjSDBwt', label: 'Vidéo 2' },
  { id: 'DG-4AMNMaLB', label: 'Vidéo 3' }
];

function VideoSquare({ videoId, label = '', isTikTok = false }) {
  const embedUrl = isTikTok 
    ? `https://www.tiktok.com/embed/v2/${videoId}`
    : `https://www.instagram.com/reel/${videoId}/embed`;

  if (isTikTok) {
    return (
      <div className="group relative bg-black/20 backdrop-blur-sm rounded-3xl p-6 border-4 border-black/50 shadow-2xl hover:shadow-white/20 hover:scale-[1.02] transition-all duration-500 max-w-sm mx-auto">
        {/* Phone bezel top */}
        <div className="w-16 h-1 bg-black/80 rounded-full mx-auto mb-4"></div>
        {/* Screen */}
        <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative">
          <iframe
            src={embedUrl}
            allowFullScreen
            scrolling="no"
            referrerPolicy="no-referrer"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            className="w-full h-full border-0"
            title={label}
            loading="lazy"
          />
          {/* Screen glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        </div>
        {/* Phone bezel bottom */}
        <div className="w-24 h-3 bg-black/80 rounded-b-3xl mx-auto mt-4"></div>
      </div>
    );
  }

  return (
    <div className="aspect-square rounded-2xl border-2 border-border hover:border-accent overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      <iframe
        src={embedUrl}
        allowFullScreen
        scrolling="no"
        referrerPolicy="no-referrer"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        className="w-full h-full border-0"
        title={label}
        loading="lazy"
      />
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

