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
    { to: '/media-kit', label: t(lang, 'nav.mediakit') },
    { to: '/drop', label: t(lang, 'nav.drop') },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Les Gawas
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === l.to
                    ? 'text-accent'
                    : 'text-foreground/60 hover:text-foreground'
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
      className="flex items-center gap-1 font-body text-xs tracking-widest uppercase border border-foreground/20 hover:border-accent hover:text-accent text-foreground/60 transition-all duration-300 px-3 py-1.5 rounded-sm"
    >
      <span className={lang === 'fr' ? 'text-accent font-semibold' : ''}>FR</span>
      <span className="text-foreground/30">·</span>
      <span className={lang === 'en' ? 'text-accent font-semibold' : ''}>EN</span>
    </button>
  );
}