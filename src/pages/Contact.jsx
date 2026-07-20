import { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Youtube, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
const COLLAB_TYPE_LABELS = { brand: 'media.s1.title', stories: 'media.s2.title', travel: 'media.s3.title', creative: 'media.s4.title' };

export default function Contact() {
  const lang = useLanguage();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: '', message: '', website: '' });

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
          type: form.type ? t(lang, COLLAB_TYPE_LABELS[form.type]) : '',
          message: form.message,
          website: form.website,
          lang,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'send failed');

      toast.success(t(lang, 'contact.success'));
      setForm({ name: '', email: '', company: '', type: '', message: '', website: '' });
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

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-accent/20 rounded-lg p-6 md:p-10 shadow-xl">
              <input
                type="text"
                value={form.website}
                onChange={updateField('website')}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.name')}</label>
                  <Input required value={form.name} onChange={updateField('name')} placeholder={t(lang, 'contact.nameph')} className="bg-background border-border font-body h-12" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.email')}</label>
                  <Input required type="email" value={form.email} onChange={updateField('email')} placeholder="hello@lesgawas.com" className="bg-background border-border font-body h-12" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.company')}</label>
                  <Input value={form.company} onChange={updateField('company')} placeholder={t(lang, 'contact.companph')} className="bg-background border-border font-body h-12" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.type')}</label>
                  <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                    <SelectTrigger className="bg-background border-border font-body h-12">
                      <SelectValue placeholder={t(lang, 'contact.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">{t(lang, 'media.s1.title')}</SelectItem>
                      <SelectItem value="stories">{t(lang, 'media.s2.title')}</SelectItem>
                      <SelectItem value="travel">{t(lang, 'media.s3.title')}</SelectItem>
                      <SelectItem value="creative">{t(lang, 'media.s4.title')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.message')}</label>
                <Textarea required rows={6} value={form.message} onChange={updateField('message')} placeholder={t(lang, 'contact.messageph')} className="bg-background border-border font-body resize-none" />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-sm tracking-[0.15em] uppercase h-12 px-10 rounded-sm"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    {t(lang, 'contact.sending')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    {t(lang, 'contact.send')}
                  </span>
                )}
              </Button>
            </form>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="space-y-10 bg-card border border-accent/20 rounded-lg p-6 md:p-10 shadow-xl h-full">
              <div>
                <h3 className="font-display text-lg text-foreground">{t(lang, 'contact.info')}</h3>
                <div className="w-8 h-[2px] bg-accent mt-2 mb-5" />
                <div className="space-y-4">
                  <a href="mailto:contact@lesgawas.com" className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-accent" />
                    </span>
                    contact@lesgawas.com
                  </a>
                  <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-accent" />
                    </span>
                    Internationale
                  </div>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h3 className="font-display text-lg text-foreground">{t(lang, 'contact.socials')}</h3>
                <div className="w-8 h-[2px] bg-accent mt-2 mb-5" />
                <div className="space-y-4">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-accent transition-colors group">
                      <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <s.icon size={14} className="text-accent" />
                      </span>
                      <span>{s.label}</span>
                      <span className="text-muted-foreground/40 ml-auto">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
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