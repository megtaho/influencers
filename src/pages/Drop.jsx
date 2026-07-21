import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Mail } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../lib/useLanguage';

const PRODUCTS = [
  {
    id: 1,
    name: { fr: 'Tote Bag Les Gawas', en: 'Les Gawas Tote Bag' },
    category: 'Accessoires',
    price: '35€',
    image: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/0edfdde09_generated_image.png',
    badge: { fr: 'Bestseller', en: 'Bestseller' },
    desc: {
      fr: 'Tote bag en coton naturel premium avec logo Les Gawas sérigraphié. Résistant, élégant, éco-responsable.',
      en: 'Premium natural cotton tote bag with screen-printed Les Gawas logo. Durable, elegant, eco-friendly.',
    },
    colors: ['Blanc naturel', 'Sable', 'Noir'],
    sizes: null,
  },
  {
    id: 2,
    name: { fr: 'T-Shirt Love Activist', en: 'Love Activist T-Shirt' },
    category: 'Vêtements',
    price: '49€',
    image: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/31f3b693f_generated_image.png',
    badge: { fr: 'Nouveau', en: 'New' },
    desc: {
      fr: 'T-shirt unisexe en coton bio avec print exclusif "Love Activist". Coupe ample et confortable.',
      en: 'Unisex organic cotton t-shirt with exclusive "Love Activist" print. Relaxed, comfortable fit.',
    },
    colors: ['Blanc', 'Beige', 'Noir'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 4,
    name: { fr: 'Sculpture 3D Love Symbol', en: '3D Love Symbol Sculpture' },
    category: 'Objets 3D',
    price: '89€',
    image: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/ffa5767b0_generated_image.png',
    badge: { fr: 'Édition Limitée', en: 'Limited Edition' },
    desc: {
      fr: "Sculpture géométrique 3D symbolisant l'amour universel. Design exclusif, impression matte premium. Pièce de décoration d'exception.",
      en: 'Geometric 3D sculpture symbolizing universal love. Exclusive design, premium matte finish. Exceptional decorative piece.',
    },
    colors: ['Blanc mat', 'Noir mat', 'Or satiné'],
    sizes: null,
  },
  {
    id: 5,
    name: { fr: 'Hoodie Les Gawas', en: 'Les Gawas Hoodie' },
    category: 'Vêtements',
    price: '79€',
    image: 'https://media.base44.com/images/public/69cfbcba1181dce806686de0/a9151f970_generated_image.png',
    badge: { fr: 'Nouveau', en: 'New' },
    desc: {
      fr: 'Hoodie premium en molleton doux avec logo brodé Les Gawas. Coupe oversize, parfait pour tous les jours.',
      en: 'Premium fleece hoodie with embroidered Les Gawas logo. Oversized cut, perfect for everyday wear.',
    },
    colors: ['Noir', 'Gris chiné', 'Ivoire'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 7,
    name: { fr: 'Vase Fait Main par Imaan', en: 'Handmade Vase by Imaan' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/vase-imaan.jpg',
    detailImage: '/vase-imaan-detail.jpg',
    images: ['/vase-imaan-detail.jpg', '/vase-imaan-2.jpg', '/vase-imaan-3.jpg', '/vase-imaan-4.jpg', '/vase-imaan-5.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: 'Vase en céramique façonné à la main par Imaan, à la texture alvéolée et aux tons crème naturels. Chaque pièce est unique.',
      en: 'Ceramic vase handcrafted by Imaan, with a honeycomb texture and natural cream tones. Each piece is unique.',
    },
    colors: ['Crème'],
    sizes: null,
  },
  {
    id: 8,
    name: { fr: 'Trio de Mugs Personnalisés', en: 'Set of 3 Personalized Mugs' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-mugs-personnalises-1.jpg',
    detailImage: '/ceramics-mugs-personnalises-1.jpg',
    images: ['/ceramics-mugs-personnalises-1.jpg', '/ceramics-mugs-personnalises-2.jpg', '/ceramics-mugs-personnalises-3.jpg', '/ceramics-mugs-personnalises-4.jpg', '/ceramics-mugs-personnalises-5.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: "Trio de mugs en céramique façonnés et gravés à la main, liseré bleu. Prénoms ou mots doux personnalisables — comme \"Nathalie Ange\", \"Laurine Mégane\" ou \"Madeleine\" en exemple. Chaque pièce est unique.",
      en: 'Set of three handcrafted ceramic mugs with a hand-painted blue rim. Names or sweet words can be personalized — shown here as "Nathalie Ange", "Laurine Mégane" and "Madeleine". Each piece is unique.',
    },
    colors: ['Crème / Bleu'],
    sizes: null,
  },
  {
    id: 9,
    name: { fr: 'Vase Rouge "In Love"', en: 'Red "In Love" Vase' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-vase-love-1.jpg',
    detailImage: '/ceramics-vase-love-1.jpg',
    images: ['/ceramics-vase-love-1.jpg', '/ceramics-vase-love-2.jpg', '/ceramics-vase-love-3.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Vase en céramique rouge façonné à la main, inscription "Les Gawas in Love" peinte à la main. Parfait pour sublimer un bouquet.',
      en: 'Handcrafted red ceramic vase with a hand-painted "Les Gawas in Love" inscription. Perfect for showing off a bouquet.',
    },
    colors: ['Rouge'],
    sizes: null,
  },
  {
    id: 10,
    name: { fr: 'Set Ombré Soleil', en: 'Sunset Ombré Set' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-set-soleil-1.jpg',
    detailImage: '/ceramics-set-soleil-1.jpg',
    images: ['/ceramics-set-soleil-1.jpg', '/ceramics-set-soleil-2.jpg', '/ceramics-set-soleil-3.jpg', '/ceramics-set-soleil-4.jpg', '/ceramics-set-soleil-5.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: "Set de 3 pièces (bol, mug, tasse) en céramique façonnées à la main, dégradé jaune soleil vers terracotta. Chaque pièce est unique.",
      en: 'Set of 3 handcrafted ceramic pieces (bowl, mug, cup) with a sunny yellow-to-terracotta ombré glaze. Each piece is unique.',
    },
    colors: ['Dégradé Soleil'],
    sizes: null,
  },
  {
    id: 11,
    name: { fr: 'Trio Ombré Corail', en: 'Coral Ombré Trio' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-chandelier-1.jpg',
    detailImage: '/ceramics-chandelier-1.jpg',
    images: ['/ceramics-chandelier-1.jpg', '/ceramics-chandelier-2.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: 'Trio en céramique façonné à la main (1 bol, 2 tasses) au dégradé corail, rose et bleu pastel. Chaque pièce est unique.',
      en: 'Handcrafted ceramic trio (1 bowl, 2 cups) with a coral, pink and pastel-blue ombré glaze. Each piece is unique.',
    },
    colors: ['Dégradé Corail'],
    sizes: null,
  },
  {
    id: 12,
    name: { fr: 'Collection Bleu Nuit', en: 'Midnight Blue Collection' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-set-bleu-nuit-1.jpg',
    detailImage: '/ceramics-set-bleu-nuit-1.jpg',
    images: ['/ceramics-set-bleu-nuit-1.jpg', '/ceramics-set-bleu-nuit-2.jpg', '/ceramics-set-bleu-nuit-3.jpg', '/ceramics-set-bleu-nuit-4.jpg', '/ceramics-set-bleu-nuit-5.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: 'Collection de 5 pièces en céramique bleu nuit strié (coupelle verseuse, bol facetté, jarre côtelée, mug, vase boule), façonnées à la main. Chaque pièce est unique.',
      en: 'Collection of 5 handcrafted midnight-blue ceramic pieces (pouring bowl, faceted bowl, ribbed jar, mug, round vase). Each piece is unique.',
    },
    colors: ['Bleu Nuit'],
    sizes: null,
  },
  {
    id: 13,
    name: { fr: 'Mug Bronze Strié', en: 'Ribbed Bronze Mug' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-mug-bronze-1.jpg',
    detailImage: '/ceramics-mug-bronze-1.jpg',
    images: ['/ceramics-mug-bronze-1.jpg', '/ceramics-mug-bronze-2.jpg', '/ceramics-mug-bronze-3.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Mug en céramique côtelé à l\'émail bronze/olive, façonné à la main. Une pièce unique.',
      en: 'Ribbed ceramic mug with a bronze-olive glaze, handcrafted. A one-of-a-kind piece.',
    },
    colors: ['Bronze'],
    sizes: null,
  },
  {
    id: 14,
    name: { fr: 'Coupelle Verseuse Bleu Nuit', en: 'Midnight Blue Pouring Bowl' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-bol-anses-1.jpg',
    detailImage: '/ceramics-bol-anses-1.jpg',
    images: ['/ceramics-bol-anses-1.jpg', '/ceramics-bol-anses-2.jpg', '/ceramics-bol-anses-3.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Petite coupelle verseuse en céramique bleu nuit avec anses, façonnée à la main. Idéale pour une sauce ou une vinaigrette.',
      en: 'Small midnight-blue ceramic pouring bowl with handles, handcrafted. Perfect for sauces or dressings.',
    },
    colors: ['Bleu Nuit'],
    sizes: null,
  },
  {
    id: 15,
    name: { fr: 'Boîte Céramique Peinte', en: 'Painted Ceramic Box' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-boite-peinte-1.jpg',
    detailImage: '/ceramics-boite-peinte-1.jpg',
    images: ['/ceramics-boite-peinte-1.jpg', '/ceramics-boite-peinte-2.jpg', '/ceramics-boite-peinte-3.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Boîte en céramique noir et blanc, couvercle peint à la main à motif pinceau, avec deux bols nichés à l\'intérieur. Pièce unique.',
      en: 'Black and white ceramic box with a hand-painted brushstroke lid, with two nested bowls inside. A one-of-a-kind piece.',
    },
    colors: ['Noir / Blanc'],
    sizes: null,
  },
  {
    id: 16,
    name: { fr: 'Bol Imprimé Pêche', en: 'Peach Print Bowl' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-peche-1.jpg',
    detailImage: '/ceramics-peche-1.jpg',
    images: ['/ceramics-peche-1.jpg', '/ceramics-peche-2.jpg', '/ceramics-peche-3.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Bol en céramique terracotta à motif pêche peint à la main, intérieur crème, façonné à la main. Une pièce unique.',
      en: 'Terracotta ceramic bowl with a hand-painted peach print and cream interior, handcrafted. A one-of-a-kind piece.',
    },
    colors: ['Terracotta / Pêche'],
    sizes: null,
  },
  {
    id: 17,
    name: { fr: 'Set Terracotta Brut', en: 'Raw Terracotta Set' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-set-terracotta-2.jpg',
    detailImage: '/ceramics-set-terracotta-2.jpg',
    images: ['/ceramics-set-terracotta-2.jpg', '/ceramics-set-terracotta-1.jpg', '/ceramics-set-terracotta-3.jpg', '/ceramics-set-terracotta-4.jpg', '/ceramics-set-terracotta-5.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: 'Bol et tasse en terracotta brute émaillée, façonnés à la main, esthétique naturelle et minimale. Chaque pièce est unique.',
      en: 'Bowl and cup in glazed raw terracotta, handcrafted with a natural, minimal look. Each piece is unique.',
    },
    colors: ['Terracotta'],
    sizes: null,
  },
  {
    id: 18,
    name: { fr: 'Duo Presse-Agrumes Bleu Marbré', en: 'Marbled Blue Citrus Juicer Duo' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-presse-agrumes-1.jpg',
    detailImage: '/ceramics-presse-agrumes-1.jpg',
    images: ['/ceramics-presse-agrumes-1.jpg', '/ceramics-presse-agrumes-2.jpg', '/ceramics-presse-agrumes-3.jpg', '/ceramics-presse-agrumes-4.jpg'],
    badge: { fr: 'Artisanal', en: 'Handmade' },
    desc: {
      fr: 'Duo de presse-agrumes en céramique à l\'émail bleu marbré, façonnés à la main. Aussi beaux qu\'utiles sur une table.',
      en: 'Pair of ceramic citrus juicers with a marbled blue glaze, handcrafted. As beautiful as they are useful on a table.',
    },
    colors: ['Bleu Marbré'],
    sizes: null,
  },
  {
    id: 19,
    name: { fr: 'Duo de Mugs Visage Sculptés', en: 'Sculpted Face Mug Duo' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-mugs-visage-1.jpg',
    detailImage: '/ceramics-mugs-visage-1.jpg',
    images: ['/ceramics-mugs-visage-1.jpg', '/ceramics-mugs-visage-2.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: "Duo de mugs sculptés à la main en forme de visage, l'un en grès brut à anses torsadées, l'autre en émail ivoire. Pièces uniques et sculpturales.",
      en: 'A pair of hand-sculpted face mugs, one in raw stoneware with twisted handles, one in ivory glaze. Unique, sculptural pieces.',
    },
    colors: ['Grès Brut / Ivoire'],
    sizes: null,
  },
  {
    id: 20,
    name: { fr: 'Collection Tasses Pièces Uniques', en: 'One-of-a-Kind Cup Collection' },
    category: 'Céramique Artisanale',
    price: '',
    image: '/ceramics-collection-unique-1.jpg',
    detailImage: '/ceramics-collection-unique-1.jpg',
    images: ['/ceramics-collection-unique-1.jpg', '/ceramics-collection-unique-2.jpg', '/ceramics-collection-unique-3.jpg', '/ceramics-collection-unique-4.jpg', '/ceramics-collection-unique-5.jpg', '/ceramics-collection-unique-6.jpg'],
    badge: { fr: 'Pièce Unique', en: 'One of a Kind' },
    desc: {
      fr: 'Petites tasses en céramique façonnées à la main, chacune avec son propre glaçage et motif. Sélectionnez un coloris, chaque tasse est un exemplaire unique et le stock est limité.',
      en: 'Small handcrafted ceramic cups, each with its own glaze and pattern. Pick a colorway — every cup is a one-of-a-kind piece and stock is limited.',
    },
    colors: ['Calligraphie Bleue', 'Vert Émeraude Strié', 'Trio Pois Colorés', 'Duo Ivoire / Terracotta', 'Vert Céladon Coulures', 'Rose Poudré'],
    sizes: null,
  },
];

const CATEGORIES = {
  fr: ['Tout', 'Vêtements', 'Accessoires', 'Objets 3D', 'Céramique Artisanale'],
  en: ['All', 'Clothing', 'Accessories', '3D Objects', 'Handmade Ceramics'],
};

const CAT_MAP = { 'Tout': 'All', 'All': 'All', 'Vêtements': 'Clothing', 'Clothing': 'Clothing', 'Accessoires': 'Accessories', 'Accessories': 'Accessories', 'Objets 3D': '3D Objects', '3D Objects': '3D Objects', 'Céramique Artisanale': 'Handmade Ceramics', 'Handmade Ceramics': 'Handmade Ceramics' };
const CAT_FILTER_MAP = { 'All': null, 'Clothing': 'Vêtements', 'Accessories': 'Accessoires', '3D Objects': 'Objets 3D', 'Handmade Ceramics': 'Céramique Artisanale' };

function ceramicsMailto(product, lang) {
  const subject = lang === 'fr'
    ? `Demande de prix / personnalisation — ${product.name.fr}`
    : `Price request / customization — ${product.name.en}`;
  const body = lang === 'fr'
    ? `Bonjour, je suis intéressé·e par la pièce "${product.name.fr}" (Handmade Ceramics). Pouvez-vous me donner le prix et/ou les options de personnalisation ?`
    : `Hi, I'm interested in the "${product.name.en}" piece (Handmade Ceramics). Could you tell me the price and/or the customization options?`;
  return `mailto:contact@lesgawas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Drop() {
  const lang = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const cats = CATEGORIES[lang];
  const catKey = CAT_MAP[activeFilter] || 'All';
  const filterCat = CAT_FILTER_MAP[catKey];
  const filtered = filterCat ? PRODUCTS.filter(p => p.category === filterCat) : PRODUCTS;

  const handleAdd = (id) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen pt-20 md:pt-28">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-6">
        <ScrollReveal>
          <p className="font-body text-accent text-xs tracking-[0.3em] uppercase mb-4">Les Gawas</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-none">
                The Drop
              </h1>
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-4 max-w-xl">
                {lang === 'fr'
                  ? 'Notre boutique exclusive. Des pièces créées avec amour, à notre effigie, pour vous.'
                  : 'Our exclusive shop. Pieces made with love, in our image, for you.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-body text-xs text-muted-foreground tracking-widest uppercase">
                {lang === 'fr' ? 'Drop actif' : 'Drop live'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex gap-6 overflow-x-auto">
          {cats.map((cat) => {
            const key = CAT_MAP[cat] || 'All';
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(key)}
                className={`font-body text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 pb-1 border-b-2 ${
                  catKey === key ? 'text-accent border-accent' : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.07}>
              <div className="group flex flex-col">
                {/* Image */}
                <div
                  className="relative overflow-hidden rounded-sm bg-muted cursor-pointer aspect-square"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 font-body text-[10px] tracking-[0.15em] uppercase bg-accent text-accent-foreground px-2.5 py-1 rounded-full">
                      {product.badge[lang]}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/90 backdrop-blur-sm font-body text-xs tracking-wider px-3 py-2 rounded-sm"
                  >
                    {lang === 'fr' ? 'Voir détails' : 'View details'}
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4 flex-1 flex flex-col">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/60">{product.category}</span>
                  <h3 className="font-display text-lg text-foreground mt-1">{product.name[lang]}</h3>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="font-display text-xl text-foreground">{product.price}</span>
                    {product.category === 'Céramique Artisanale' ? (
                      <a
                        href={ceramicsMailto(product, lang)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase px-4 py-2.5 rounded-sm transition-all duration-300 bg-foreground text-background hover:bg-accent"
                      >
                        <Mail size={13} />
                        {lang === 'fr' ? 'Nous écrire' : 'Email us'}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleAdd(product.id)}
                        className={`flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase px-4 py-2.5 rounded-sm transition-all duration-300 ${
                          addedId === product.id
                            ? 'bg-green-500 text-white'
                            : 'bg-foreground text-background hover:bg-accent'
                        }`}
                      >
                        <ShoppingBag size={13} />
                        {addedId === product.id
                          ? (lang === 'fr' ? 'Ajouté ✓' : 'Added ✓')
                          : (lang === 'fr' ? 'Ajouter' : 'Add')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer message */}
        <ScrollReveal className="mt-20 md:mt-32 text-center">
          <p className="font-display text-2xl md:text-4xl text-foreground">
            {lang === 'fr' ? <>Fait avec <span className="text-accent">amour.</span></> : <>Made with <span className="text-accent">love.</span></>}
          </p>
          <p className="font-body text-muted-foreground text-sm mt-3">Megan & Imaan · @lesgawas</p>
        </ScrollReveal>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key={selectedProduct.id}
            product={selectedProduct}
            lang={lang}
            onClose={() => setSelectedProduct(null)}
            onAdd={() => handleAdd(selectedProduct.id)}
            addedId={addedId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductModal({ product, lang, onClose, onAdd, addedId }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const gallery = product.images && product.images.length ? product.images : [product.detailImage || product.image];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-background w-full md:max-w-3xl md:rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col md:h-full min-h-[280px] bg-muted">
            <div className="flex-1 aspect-square md:aspect-auto overflow-hidden">
              <img src={gallery[selectedImage]} alt={product.name[lang]} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto shrink-0">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-14 h-14 rounded-sm overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/60">{product.category}</span>
                <h2 className="font-display text-2xl text-foreground mt-1">{product.name[lang]}</h2>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
                <X size={20} />
              </button>
            </div>

            <p className="font-body text-muted-foreground text-sm leading-relaxed mt-4">{product.desc[lang]}</p>

            {product.badge && (
              <span className="inline-block mt-3 font-body text-[10px] tracking-[0.15em] uppercase bg-accent/10 text-accent px-2.5 py-1 rounded-full w-fit">
                {product.badge[lang]}
              </span>
            )}

            {/* Colors */}
            <div className="mt-6">
              <p className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-3">
                {lang === 'fr' ? 'Couleur' : 'Color'} : <span className="text-foreground">{product.colors[selectedColor]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(i)}
                    className={`font-body text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                      selectedColor === i ? 'border-accent text-accent' : 'border-border text-muted-foreground hover:border-foreground'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div className="mt-5">
                <p className="font-body text-xs tracking-wider text-muted-foreground uppercase mb-3">
                  {lang === 'fr' ? 'Taille' : 'Size'} : <span className="text-foreground">{product.sizes[selectedSize]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(i)}
                      className={`font-body text-xs w-10 h-10 rounded-sm border transition-colors ${
                        selectedSize === i ? 'border-accent text-accent bg-accent/5' : 'border-border text-muted-foreground hover:border-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex items-center justify-between">
              <span className="font-display text-3xl text-foreground">{product.price}</span>
              {product.category === 'Céramique Artisanale' ? (
                <a
                  href={ceramicsMailto(product, lang)}
                  className="flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-sm transition-all duration-300 bg-foreground text-background hover:bg-accent"
                >
                  <Mail size={15} />
                  {lang === 'fr' ? 'Demander le prix' : 'Ask for price'}
                </a>
              ) : (
                <button
                  onClick={onAdd}
                  className={`flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-sm transition-all duration-300 ${
                    addedId === product.id
                      ? 'bg-green-500 text-white'
                      : 'bg-foreground text-background hover:bg-accent'
                  }`}
                >
                  <ShoppingBag size={15} />
                  {addedId === product.id
                    ? (lang === 'fr' ? 'Ajouté ✓' : 'Added ✓')
                    : (lang === 'fr' ? 'Ajouter au panier' : 'Add to cart')}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}