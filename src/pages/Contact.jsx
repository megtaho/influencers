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
  { icon: Instagram, label: 'Instagram', handle: '@lesgawas', href: 'https://instagram.com/lesgawas' },
  { icon: Youtube, label: 'YouTube', handle: 'Les Gawas', href: '#' },
  { icon: Music, label: 'TikTok', handle: '@lesgawas', href: '#' },
];

export default function Contact() {
  const lang = useLanguage();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(t(lang, 'contact.success'));
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen pt-20 md:pt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-20 md:pb-32">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-4">{t(lang, 'contact.tag')}</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight whitespace-pre-line">
              {t(lang, 'contact.title')}
            </h1>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-6 max-w-lg">{t(lang, 'contact.desc')}</p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-16 mt-16 md:mt-24">
          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.name')}</label>
                  <Input required placeholder={t(lang, 'contact.nameph')} className="bg-card border-border font-body h-12" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.email')}</label>
                  <Input required type="email" placeholder="hello@lesgawas.com" className="bg-card border-border font-body h-12" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.company')}</label>
                  <Input placeholder={t(lang, 'contact.companph')} className="bg-card border-border font-body h-12" />
                </div>
                <div>
                  <label className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-2 block">{t(lang, 'contact.type')}</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border font-body h-12">
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
                <Textarea required rows={6} placeholder={t(lang, 'contact.messageph')} className="bg-card border-border font-body resize-none" />
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
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-lg text-foreground mb-4">{t(lang, 'contact.info')}</h3>
                <div className="space-y-4">
                  <a href="mailto:contact@lesgawas.com" className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    <Mail size={16} className="text-accent" />
                    contact@lesgawas.com
                  </a>
                  <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                    <MapPin size={16} className="text-accent" />
                    Paris, France
                  </div>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h3 className="font-display text-lg text-foreground mb-4">{t(lang, 'contact.socials')}</h3>
                <div className="space-y-4">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-accent transition-colors group">
                      <s.icon size={16} className="text-accent/60 group-hover:text-accent transition-colors" />
                      <span>{s.label}</span>
                      <span className="text-muted-foreground/40 ml-auto">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <h3 className="font-display text-lg text-foreground mb-3">{t(lang, 'contact.delay')}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t(lang, 'contact.delaytext')}</p>
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