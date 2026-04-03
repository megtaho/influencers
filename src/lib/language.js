// Simple language store using localStorage + custom events
const LANG_KEY = 'les-gawas-lang';
const LANG_EVENT = 'lang-change';

export function getLang() {
  return localStorage.getItem(LANG_KEY) || 'fr';
}

export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}

export function toggleLang() {
  setLang(getLang() === 'fr' ? 'en' : 'fr');
}