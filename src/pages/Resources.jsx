import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, BookOpen, Users, Sparkle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';
import { t } from '../lib/translations';

const lgbtResources = [
  {
    name: 'ILGA World',
    url: 'https://ilga.org',
    desc: { fr: "Association mondiale pour les droits LGBTQ+, présente dans plus de 160 pays.", en: "World association for LGBTQ+ rights, present in over 160 countries." },
    region: 'International',
  },
  {
    name: 'The Trevor Project',
    url: 'https://www.thetrevorproject.org',
    desc: { fr: "Prévention du suicide et soutien en crise pour les jeunes LGBTQ+.", en: "Suicide prevention and crisis support for LGBTQ+ youth." },
    region: 'USA',
  },
  {
    name: 'SOS Homophobie',
    url: 'https://www.sos-homophobie.org',
    desc: { fr: "Association française de lutte contre la LGBTphobie.", en: "French association fighting against LGBTphobia." },
    region: 'France',
  },
  {
    name: 'PFLAG',
    url: 'https://pflag.org',
    desc: { fr: "Soutien aux familles, alliés et personnes LGBTQ+.", en: "Support for families, allies, and LGBTQ+ people." },
    region: 'USA',
  },
  {
    name: 'Stonewall UK',
    url: 'https://www.stonewall.org.uk',
    desc: { fr: "Organisation caritative pour l'égalité LGBTQ+ au Royaume-Uni.", en: "Charity for LGBTQ+ equality in the UK." },
    region: 'UK',
  },
  {
    name: 'Rainbow Railroad',
    url: 'https://www.rainbowrailroad.org',
    desc: { fr: "Aide les personnes LGBTQ+ à fuir la violence d'État.", en: "Helps LGBTQ+ people flee state-sponsored violence." },
    region: 'International',
  },
];

const religionResources = [
  {
    name: 'Q Christian Fellowship',
    url: 'https://www.qchristian.org',
    desc: { fr: "Communauté pour les chrétiens LGBTQ+ et leurs alliés.", en: "Community for LGBTQ+ Christians and their allies." },
    region: 'International',
  },
  {
    name: 'Muslims for Progressive Values',
    url: 'https://www.mpvusa.org',
    desc: { fr: "Organisation islamique progressiste promouvant l'inclusion et l'égalité.", en: "Progressive Islamic organization promoting inclusion and equality." },
    region: 'International',
  },
  {
    name: 'Imaan (UK)',
    url: 'https://imaanlondon.wordpress.com',
    desc: { fr: "Groupe de soutien pour les musulmans LGBTQ+.", en: "Support group for LGBTQ+ Muslims." },
    region: 'UK',
  },
  {
    name: 'Fortunate Families',
    url: 'https://fortunatefamilies.com',
    desc: { fr: "Soutien catholique aux familles ayant des membres LGBTQ+.", en: "Catholic support for families with LGBTQ+ members." },
    region: 'USA',
  },
  {
    name: 'Keshet',
    url: 'https://www.keshetonline.org',
    desc: { fr: "Organisation juive pour l'inclusion LGBTQ+ dans la vie juive.", en: "Jewish organization for LGBTQ+ inclusion in Jewish life." },
    region: 'International',
  },
  {
    name: 'Reconciling Ministries',
    url: 'https://rmnetwork.org',
    desc: { fr: "Réseau de congrégations méthodistes inclusives pour les LGBTQ+.", en: "Network of inclusive Methodist congregations for LGBTQ+ people." },
    region: 'USA',
  },
];

const associations = [
  {
    name: 'Amnesty International',
    url: 'https://www.amnesty.org',
    desc: { fr: "Organisation mondiale de défense des droits humains.", en: "World organization defending human rights." },
    region: 'International',
  },
  {
    name: 'Human Rights Watch',
    url: 'https://www.hrw.org',
    desc: { fr: "Enquêtes et rapports sur les violations des droits humains dans le monde.", en: "Investigations and reporting on human rights abuses worldwide." },
    region: 'International',
  },
  {
    name: 'La Cimade',
    url: 'https://www.lacimade.org',
    desc: { fr: "Solidarité avec les personnes migrantes et réfugiées en France.", en: "Solidarity with migrants and refugees in France." },
    region: 'France',
  },
  {
    name: 'NAACP',
    url: 'https://naacp.org',
    desc: { fr: "Organisation américaine pour les droits civiques des Afro-Américains.", en: "American organization for the civil rights of African Americans." },
    region: 'USA',
  },
  {
    name: 'Égale Canada',
    url: 'https://egale.ca',
    desc: { fr: "Organisation canadienne pour les droits des personnes LGBTQ2+.", en: "Canadian organization for the rights of LGBTQ2+ people." },
    region: 'Canada',
  },
  {
    name: 'UN Free & Equal',
    url: 'https://www.unfe.org',
    desc: { fr: "Campagne de l'ONU pour l'égalité des personnes LGBTQ+.", en: "UN campaign for LGBTQ+ equality." },
    region: 'International',
  },
];

const sections = (lang) => [
  {
    tag: t(lang, 'res.lgbt.tag'),
    title: t(lang, 'res.lgbt.title'),
    desc: t(lang, 'res.lgbt.desc'),
    icon: Heart,
    items: lgbtResources,
    accentClass: 'from-pink-500/10 to-purple-500/10 border-pink-200',
    iconClass: 'text-pink-500',
  },
  {
    tag: t(lang, 'res.religion.tag'),
    title: t(lang, 'res.religion.title'),
    desc: t(lang, 'res.religion.desc'),
    icon: BookOpen,
    items: religionResources,
    accentClass: 'from-amber-500/10 to-orange-500/10 border-amber-200',
    iconClass: 'text-amber-500',
  },
  {
    tag: t(lang, 'res.assoc.tag'),
    title: t(lang, 'res.assoc.title'),
    desc: t(lang, 'res.assoc.desc'),
    icon: Users,
    items: associations,
    accentClass: 'from-blue-500/10 to-teal-500/10 border-blue-200',
    iconClass: 'text-blue-500',
  },
];

const themes = (lang) => [
  {
    emoji: '🌈',
    title: t(lang, 'res.theme1.title'),
    desc: t(lang, 'res.theme1.desc'),
    affirm: t(lang, 'res.theme1.affirm'),
  },
  {
    emoji: '🕊️',
    title: t(lang, 'res.theme2.title'),
    desc: t(lang, 'res.theme2.desc'),
    lead: t(lang, 'res.theme2.lead'),
    bullets: [t(lang, 'res.theme2.b1'), t(lang, 'res.theme2.b2'), t(lang, 'res.theme2.b3'), t(lang, 'res.theme2.b4')],
  },
  {
    emoji: '🌍',
    title: t(lang, 'res.theme3.title'),
    desc: t(lang, 'res.theme3.desc'),
    lead: t(lang, 'res.theme3.lead'),
    bullets: [t(lang, 'res.theme3.b1'), t(lang, 'res.theme3.b2'), t(lang, 'res.theme3.b3'), t(lang, 'res.theme3.b4')],
  },
  {
    emoji: '✝️☪️',
    title: t(lang, 'res.theme4.title'),
    desc: t(lang, 'res.theme4.desc'),
    lead: t(lang, 'res.theme4.lead'),
    bullets: [t(lang, 'res.theme4.b1'), t(lang, 'res.theme4.b2'), t(lang, 'res.theme4.b3'), t(lang, 'res.theme4.b4')],
  },
];

function HeartSparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 10 + Math.random() * 14,
        delay: Math.random() * 3,
        repeatDelay: 1 + Math.random() * 3,
        duration: 0.8 + Math.random() * 0.6,
        color: Math.random() > 0.5 ? '#f472b6' : '#facc15',
      })),
    []
  );

  return (
    <div className="absolute -inset-8 pointer-events-none">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay, ease: 'easeInOut' }}
        >
          <Sparkle size={s.size} style={{ color: s.color }} fill={s.color} />
        </motion.span>
      ))}
    </div>
  );
}

export default function Resources() {
  const lang = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 md:gap-12 items-center">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-4">Les Gawas</p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">{t(lang, 'res.title')}</h1>
              <div className="w-16 h-[2px] bg-accent my-6" />
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">{t(lang, 'res.subtitle')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative mx-auto w-80 h-80 sm:w-[26rem] sm:h-[26rem] md:w-[32rem] md:h-[32rem] flex flex-col items-center">
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
                    <path d="M0.5,0.9 C0.5,0.9 0.05,0.55 0.05,0.28 C0.05,0.08 0.25,-0.02 0.5,0.2 C0.75,-0.02 0.95,0.08 0.95,0.28 C0.95,0.55 0.5,0.9 0.5,0.9 Z" />
                  </clipPath>
                </defs>
              </svg>

              <div className="relative w-full aspect-square">
                <motion.div
                  className="absolute inset-0 heart-rainbow-bg drop-shadow-2xl"
                  style={{ clipPath: 'url(#heart-clip)' }}
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src="/resources-hearts.jpg"
                    alt="Megan & Imaan"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <HeartSparkles />
              </div>

              <span className="mt-2 bg-pink-500 text-white font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-1.5">
                <Heart size={11} className="fill-white" />
                {lang === 'fr' ? "L'amour est un droit" : 'Love is a right'}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-40">
        {/* Advocacy block */}
        <ScrollReveal delay={0.15} className="mt-12">
          <div className="bg-card rounded-lg p-8 md:p-12 border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-3">{t(lang, 'res.advocacy.title')}</p>
            <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed max-w-3xl whitespace-pre-line">
              {t(lang, 'res.advocacy.desc')}
            </p>
            <p className="font-display text-muted-foreground/40 text-xl md:text-2xl mt-6">— Megan & Imaan, @lesgawas</p>
          </div>
        </ScrollReveal>

        {/* Vous n'êtes pas seul·e */}
        <ScrollReveal delay={0.1} className="mt-20 md:mt-32">
          <div className="max-w-3xl">
            <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-3">Les Gawas</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">{t(lang, 'res.notalone.title')}</h2>
            <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed mt-6">{t(lang, 'res.notalone.p1')}</p>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-4">{t(lang, 'res.notalone.p2')}</p>
            <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-4">{t(lang, 'res.notalone.p3')}</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
          {themes(lang).map((theme, i) => (
            <ScrollReveal key={theme.title} delay={i * 0.08}>
              <div className="border-l-2 border-accent/40 pl-6 md:pl-8">
                <h3 className="font-display text-xl md:text-2xl text-foreground flex items-center gap-3">
                  <span aria-hidden="true">{theme.emoji}</span>
                  {theme.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-3 max-w-2xl">{theme.desc}</p>
                {theme.affirm && (
                  <p className="font-body text-foreground/80 text-sm md:text-base leading-relaxed mt-3 max-w-2xl italic">{theme.affirm}</p>
                )}
                {theme.bullets && (
                  <>
                    <p className="font-body text-muted-foreground text-sm mt-4">{theme.lead}</p>
                    <ul className="mt-3 space-y-2">
                      {theme.bullets.map((b) => (
                        <li key={b} className="font-body text-muted-foreground text-sm leading-relaxed flex gap-2 max-w-2xl">
                          <span className="text-accent">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Espaces où parler */}
        <ScrollReveal delay={0.15} className="mt-20 md:mt-32">
          <div className="bg-card rounded-lg p-8 md:p-12 border border-border relative overflow-hidden text-center">
            <div className="absolute inset-0 heart-rainbow-bg opacity-[0.06]" aria-hidden="true" />
            <p className="relative font-body text-accent text-xs tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2">
              <Heart size={12} className="fill-accent" />
              {t(lang, 'res.closing.title')}
            </p>
            <p className="relative font-body text-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{t(lang, 'res.closing.p1')}</p>
            <p className="relative font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">{t(lang, 'res.closing.p2')}</p>
            <p className="relative font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-4">{t(lang, 'res.closing.p3')}</p>
          </div>
        </ScrollReveal>

        {/* Resource Sections */}
        {sections(lang).map((section, si) => (
          <section key={section.title} className="mt-20 md:mt-32">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-2">
                <section.icon className={`${section.iconClass}`} size={18} />
                <p className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase">{section.tag}</p>
              </div>
              <h2 className="font-display text-2xl md:text-4xl text-foreground">{section.title}</h2>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mt-3 max-w-2xl">{section.desc}</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {section.items.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.06}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-6 rounded-lg border bg-gradient-to-br ${section.accentClass} hover:shadow-md transition-all duration-300 group h-full`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors leading-tight">{item.name}</h3>
                      <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-accent transition-colors flex-shrink-0 ml-2 mt-1" />
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc[lang]}</p>
                    <span className="inline-block mt-4 font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50 border border-border rounded-full px-2 py-0.5">
                      {item.region}
                    </span>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </section>
        ))}

        {/* Final message */}
        <ScrollReveal className="mt-24 md:mt-40 text-center">
          <p className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            {lang === 'fr' ? <>L'amour est <span className="text-accent">un droit.</span></> : <>Love is <span className="text-accent">a right.</span></>}
          </p>
          <p className="font-body text-muted-foreground text-sm mt-4">@lesgawas · Megan & Imaan</p>
        </ScrollReveal>
      </div>
    </div>
  );
}