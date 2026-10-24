import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Instagram, Youtube } from 'lucide-react';
import VideoScrubber from '../components/VideoScrubber';
import ScrollReveal from '../components/ScrollReveal';
import Book3D from '../components/Book3D';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const DEFAULT_VIDEO = '/video.mp4';

const INSTAGRAM_REELS = [
  { code: 'DV-6yOlAGbB', color: '#E8412C' },
  { code: 'DFgPOPTuF4E', color: '#FF8A00' },
  { code: 'DPCbm0SjENV', color: '#FFD500' },
  { code: 'DXxMljHsAtb', color: '#22B14C' },
  { code: 'DUq7YnWDIth', color: '#0072FF' },
  { code: 'DR5awkNDYqs', color: '#9B30D9' },
];

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

      <section className="relative z-20 bg-background overflow-hidden">
        {/* Soft aurora glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-accent/20 blur-[120px] animate-blob" />
          <div className="absolute top-[30%] -right-40 w-[480px] h-[480px] rounded-full bg-[#9B30D9]/10 blur-[120px] animate-blob [animation-delay:-6s]" />
          <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#0072FF]/10 blur-[120px] animate-blob [animation-delay:-12s]" />
          <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-10 py-24 md:py-32">
          <ScrollReveal className="text-center">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
              {t(lang, 'home.story').split('\n')[0]}<br />
              <span className="italic bg-gradient-to-r from-accent via-[#e0567a] to-[#9B30D9] bg-clip-text text-transparent">
                {t(lang, 'home.story').split('\n')[1]}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-10 md:mt-14">
            <Book3D lang={lang} />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-16 text-center">
            <Link
              to="/journey"
              className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-3.5 font-body text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300 group shadow-lg"
            >
              {t(lang, 'home.cta')}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </ScrollReveal>

          {/* Instagram Showcase */}
          <div className="mt-32">
            <ScrollReveal delay={0.6}>
              <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4">
                {t(lang, 'home.content.title')}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground max-w-lg">
                {t(lang, 'home.content.subtitle')}
              </h3>
            </ScrollReveal>

            <div className="flex flex-wrap justify-center items-end gap-x-6 gap-y-14 md:gap-x-8 mt-16 md:mt-24">
              {INSTAGRAM_REELS.map((reel, i) => (
                <PhoneReel
                  key={reel.code}
                  code={reel.code}
                  color={reel.color}
                  delay={0.1 * i}
                  rotate={i % 3 === 1 ? 2 : i % 3 === 2 ? -2 : 0}
                  offset={i % 2 === 1 ? 'md:-translate-y-6' : ''}
                />
              ))}
            </div>

            <ScrollReveal delay={0.3} className="mt-16 text-center">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/60 mb-5">
                {t(lang, 'home.content.follow')}
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/les.gawas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@les.gawas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  <TikTokIcon size={17} />
                </a>
                <a
                  href="https://www.youtube.com/@Lesgawas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-border text-foreground/60 hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  <Youtube size={19} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.02 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

function PhoneReel({ code, color, delay, rotate, offset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 90, scaleY: 0.4 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformOrigin: 'bottom center' }}
      className={`flex-shrink-0 w-[150px] sm:w-[170px] md:w-[200px] ${offset}`}
    >
      <div
        className="group relative rounded-[2rem] p-[7px] shadow-2xl transition-transform duration-500 hover:-translate-y-3"
        style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${rotate}deg)`)}
      >
        <div className="absolute -right-[3px] top-14 w-[3px] h-7 rounded-full bg-black/25" />
        <div className="absolute -left-[3px] top-20 w-[3px] h-10 rounded-full bg-black/25" />
        <div className="relative bg-black rounded-[1.6rem] overflow-hidden aspect-[9/19]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-black rounded-full z-20" />
          <iframe
            src={`https://www.instagram.com/reel/${code}/embed`}
            allowFullScreen
            scrolling="no"
            referrerPolicy="no-referrer"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            className="w-full h-full border-0"
            title={`Instagram reel ${code}`}
            loading="lazy"
          />
        </div>
      </div>
      <div className="h-3 mx-6 mt-1 rounded-full blur-md opacity-40" style={{ backgroundColor: color }} aria-hidden="true" />
    </motion.div>
  );
}
