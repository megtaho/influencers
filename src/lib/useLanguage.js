import { useState, useEffect } from 'react';
import { getLang } from './language';

export function useLanguage() {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    window.addEventListener('lang-change', handler);
    return () => window.removeEventListener('lang-change', handler);
  }, []);

  return lang;
}