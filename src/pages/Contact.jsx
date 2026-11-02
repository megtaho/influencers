import { useState } from 'react';
import { MapPin, Send, Instagram, Youtube, Music, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';
import { toast } from 'sonner';

const socials = [
  { icon: Instagram, label: 'Instagram', handle: '@lesgawas', href: 'https://www.instagram.com/les.gawas/' },
  { icon: Youtube, label: 'YouTube', handle: 'Les Gawas', href: 'https://www.youtube.com/@Lesgawas' },
  { icon: Music, label: 'TikTok', handle: '@lesgawas', href: 'https://www.tiktok.com/@les.gawas' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLLAB_TYPE_LABELS = { brand: 'media.s1.title', stories: 'media.s2.title', travel: 'media.s3.title', creative: 'media.s4.title', other: 'contact.other' };

export default function Contact() {
  const lang = useLanguage();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', otherType: '', message: '', website: '' });

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(form.email)) {
      toast.error(t(lang, 'contact.invalidEmail'));
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          type: form.type === 'other' && form.otherType.trim()
            ? `${t(lang, 'contact.other')} : ${form.otherType.trim()}`
            : form.type ? t(lang, COLLAB_TYPE_LABELS[form.type]) : '',
          message: form.message,
          website: form.website,
          lang,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'send failed');

      toast.success(t(lang, 'contact.success'));
      setForm({ name: '', email: '', company: '', type: '', otherType: '', message: '', website: '' });
    } catch {
      toast.error(t(lang, 'contact.error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 md:gap-12 items-center">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'contact.tag')}</p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight whitespace-pre-line">
                {t(lang, 'contact.title')}
              </h1>
              <div className="w-16 h-[2px] bg-accent my-6" />
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">{t(lang, 'contact.desc')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-none">
              <div className="absolute -inset-4 md:-inset-6 border-2 border-accent/30 rounded-lg -rotate-3" aria-hidden="true" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative rounded-lg overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/contact-paris.jpg"
                  alt="Megan & Imaan à Paris"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-4 left-6 bg-accent text-accent-foreground font-body text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm shadow-lg">
                Paris, France
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <ScrollReveal>
          <div className="relative rounded-[2rem] border border-accent/20 shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-5 bg-card">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-3 p-6 md:p-12 space-y-6">
                <input
                  type="text"
                  value={form.website}
                  onChange={updateField('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">{lang === 'fr' ? 'Écrivez-nous' : 'Write to us'}</h2>
                  <p className="font-body text-sm text-muted-foreground mt-2">{lang === 'fr' ? 'Les champs marqués * sont obligatoires.' : 'Fields marked * are required.'}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={`${t(lang, 'contact.name')} *`}>
                    <Input required value={form.name} onChange={updateField('name')} placeholder={t(lang, 'contact.nameph')} className={FIELD} />
                  </Field>
                  <Field label={`${t(lang, 'contact.email')} *`}>
                    <Input required type="email" value={form.email} onChange={updateField('email')} placeholder="hello@lesgawas.com" className={FIELD} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t(lang, 'contact.company')}>
                    <Input value={form.company} onChange={updateField('company')} placeholder={t(lang, 'contact.companph')} className={FIELD} />
                  </Field>
                  <Field label={t(lang, 'contact.type')}>
                    <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                      <SelectTrigger className={FIELD}>
                        <SelectValue placeholder={t(lang, 'contact.select')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="brand">{t(lang, 'media.s1.title')}</SelectItem>
                        <SelectItem value="stories">{t(lang, 'media.s2.title')}</SelectItem>
                        <SelectItem value="travel">{t(lang, 'media.s3.title')}</SelectItem>
                        <SelectItem value="creative">{t(lang, 'media.s4.title')}</SelectItem>
                        <SelectItem value="other">{t(lang, 'contact.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                {form.type === 'other' && (
                  <Field label={`${t(lang, 'contact.otherLabel')} *`}>
                    <Input
                      required
                      autoFocus
                      maxLength={120}
                      value={form.otherType}
                      onChange={updateField('otherType')}
                      placeholder={t(lang, 'contact.otherph')}
                      className={FIELD}
                    />
                  </Field>
                )}
                <Field label={`${t(lang, 'contact.message')} *`}>
                  <div className="relative">
                    <Textarea
                      required
                      rows={6}
                      maxLength={3000}
                      value={form.message}
                      onChange={updateField('message')}
                      placeholder={t(lang, 'contact.messageph')}
                      className={`${FIELD} h-auto py-3 resize-none`}
                    />
                    <span className="absolute bottom-3 right-4 font-body text-[10px] text-muted-foreground/60 tabular-nums">{form.message.length}/3000</span>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-60 transition-colors h-14 px-10 font-body text-xs tracking-[0.2em] uppercase shadow-lg"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      {t(lang, 'contact.sending')}
                    </>
                  ) : (
                    <>
                      {t(lang, 'contact.send')}
                      <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Info panel */}
              <aside className="lg:col-span-2 relative overflow-hidden bg-card text-foreground border-t lg:border-t-0 lg:border-l border-accent/20 p-6 md:p-12 flex flex-col">

                <div className="relative">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-accent">{t(lang, 'contact.info')}</p>
                  <a href="mailto:contact@lesgawas.com" className="block font-display text-2xl md:text-3xl mt-4 break-all hover:text-accent transition-colors">
                    contact@lesgawas.com
                  </a>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <CopyEmail lang={lang} />
                    <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <MapPin size={13} className="text-accent" /> Internationale
                    </span>
                  </div>
                </div>

                <div className="relative mt-12">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-accent">{t(lang, 'contact.socials')}</p>
                  <div className="mt-4 divide-y divide-border border-y border-border">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                      >
                        <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors"><s.icon size={14} className="text-accent" /></span>
                        <span className="font-display text-xl">{s.label}</span>
                        <span className="ml-auto font-body text-xs text-muted-foreground/60">{s.handle}</span>
                        <span className="text-muted-foreground/40 group-hover:text-accent transition-colors">↗</span>
                      </a>
                    ))}
                  </div>
                </div>

                <p className="relative mt-auto pt-12 font-display italic text-lg text-muted-foreground">Megan & Imaan</p>
              </aside>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <footer className="border-t border-border py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-lg text-foreground">Les Gawas</span>
          <span className="font-body text-xs text-muted-foreground tracking-wider">{t(lang, 'contact.footer')}</span>
        </div>
      </footer>
    </div>
  );
}
const FIELD =
  'h-12 rounded-xl bg-background border-border font-body transition-all focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-0 focus-visible:border-accent';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-body text-[11px] tracking-[0.15em] text-muted-foreground uppercase mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function CopyEmail({ lang }) {
  const [copied, setCopied] = useState(false);
  const label = copied ? (lang === 'fr' ? 'Copié' : 'Copied') : lang === 'fr' ? "Copier l'email" : 'Copy email';
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText('contact@lesgawas.com').then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-3 py-1.5 font-body text-[11px] tracking-wider text-accent hover:border-accent hover:text-accent transition-colors"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {label}
    </button>
  );
}
