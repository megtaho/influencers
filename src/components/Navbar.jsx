import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/useLanguage';
import { toggleLang } from '../lib/language';
import { t } from '../lib/translations';

export default function Navbar() {
  const lang = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t(lang, 'nav.home') },
    { to: '/journey', label: t(lang, 'nav.journey') },
    { to: '/gallery', label: t(lang, 'nav.gallery') },
    { to: '/resources', label: t(lang, 'nav.resources') },
    { to: '/contact', label: t(lang, 'nav.contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'top-3 px-3 md:px-6' : 'top-0 px-0'
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'max-w-5xl h-14 md:h-16 px-5 md:px-8 rounded-full bg-background/70 backdrop-blur-xl border border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
              : 'max-w-7xl h-16 md:h-20 px-6 md:px-10 border border-transparent'
          }`}
        >
          <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Les Gawas
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-rainbow font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === l.to
                    ? 'text-accent'
                    : 'text-foreground/60'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <LangSwitch lang={lang} />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LangSwitch lang={lang} />
            <button onClick={() => setOpen(!open)} className="text-foreground p-2" aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link
                  to={l.to}
                  className={`font-display text-3xl transition-colors ${location.pathname === l.to ? 'text-accent' : 'text-foreground/70'}`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangSwitch({ lang }) {
  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 font-body text-xs tracking-widest uppercase border border-foreground/20 hover:border-accent hover:text-accent text-foreground/60 transition-all duration-300 px-3 py-1.5 rounded-full"
    >
      <span className={lang === 'fr' ? 'text-accent font-semibold' : ''}>FR</span>
      <span className="text-foreground/30">·</span>
      <span className={lang === 'en' ? 'text-accent font-semibold' : ''}>EN</span>
    </button>
  );
}