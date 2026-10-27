import { WeddingTheme } from '../types/wedding';

export interface WeddingTemplate {
  id: string;
  name: string;
  category: 'Royal Palace' | 'Minimalist Luxury' | 'South Indian Heritage' | 'Cocktail Modern' | 'Festive Bohème';
  tagline: string;
  description: string;
  theme: WeddingTheme;
  envelopeStyle: 'wax-seal' | 'floral-fold' | 'royal-scroll' | 'scratch-reveal';
  musicTrack: 'royal-shehnai' | 'sitara-ambient' | 'flute-romance' | 'temple-bells';
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
  isPopular?: boolean;
  isNew?: boolean;
  idealFor: string;
}

export const WEDDING_TEMPLATES: WeddingTemplate[] = [
  {
    id: 'tpl-jaipur-palace',
    name: 'Jaipur Royal Crimson & Gold',
    category: 'Royal Palace',
    tagline: 'Regal Rajputana palace aesthetic with heritage gold filigree and wax seal',
    description: 'Our most celebrated design inspired by the royal courtyards of Rajasthan. Features handcrafted Vedic calligraphy, wax seal unsealing, and auspicious mandap motifs.',
    theme: 'royal-crimson',
    envelopeStyle: 'wax-seal',
    musicTrack: 'royal-shehnai',
    colors: {
      primary: '#881337',
      accent: '#D97706',
      background: '#FFFDF9'
    },
    isPopular: true,
    idealFor: 'Traditional North Indian, Marwari, Punjabi & Royal Destination Weddings'
  },
  {
    id: 'tpl-udaipur-emerald',
    name: 'Udaipur Lake Emerald & Sage',
    category: 'Royal Palace',
    tagline: 'Lakeside palace elegance with deep emerald tones and antique gold',
    description: 'Evokes the serene majesty of Lake Pichola at twilight. Calming sage green backgrounds with royal emerald velvet cards and romantic bansuri flute melodies.',
    theme: 'emerald-sage',
    envelopeStyle: 'floral-fold',
    musicTrack: 'flute-romance',
    colors: {
      primary: '#064E3B',
      accent: '#10B981',
      background: '#F9FAF8'
    },
    isPopular: true,
    idealFor: 'Destination Palace Weddings, Outdoor Lawn Ceremonies & Spring Celebrations'
  },
  {
    id: 'tpl-champagne-rose',
    name: 'Champagne & Rose Gold Modern',
    category: 'Minimalist Luxury',
    tagline: 'Contemporary editorial typography with soft ivory and rose shimmer',
    description: 'Clean, understated sophistication tailored for couples who love contemporary chic aesthetics. Smooth animations, generous whitespace, and delicate rose gold borders.',
    theme: 'champagne-gold',
    envelopeStyle: 'wax-seal',
    musicTrack: 'sitara-ambient',
    colors: {
      primary: '#78350F',
      accent: '#F59E0B',
      background: '#FAFAF9'
    },
    isNew: true,
    idealFor: 'Modern Minimalist, NRI International & Indo-Western Celebrations'
  },
  {
    id: 'tpl-kanchipuram-gold',
    name: 'Kanchipuram Temple Gold',
    category: 'South Indian Heritage',
    tagline: 'Auspicious temple aesthetics with sacred brass bells and temple arches',
    description: 'Crafted with reverence for South Indian traditions. Features auspicious mango leaf torans, temple gopuram motifs, sacred Vedic chants, and rich temple gold accents.',
    theme: 'champagne-gold',
    envelopeStyle: 'royal-scroll',
    musicTrack: 'temple-bells',
    colors: {
      primary: '#92400E',
      accent: '#D97706',
      background: '#FFFBEB'
    },
    idealFor: 'Tamil, Telugu, Kannada, Malayalam & South Indian Traditional Vivaham'
  },
  {
    id: 'tpl-midnight-stars',
    name: 'Midnight Celestial & Starlight',
    category: 'Cocktail Modern',
    tagline: 'Deep midnight navy with twinkling celestial constellations and modern flair',
    description: 'Designed for couples planning an unforgettable evening cocktail, Sangeet night, or black-tie gala. Deep navy blue background with radiant starlight accents.',
    theme: 'midnight-gold',
    envelopeStyle: 'scratch-reveal',
    musicTrack: 'sitara-ambient',
    colors: {
      primary: '#0F172A',
      accent: '#FBBF24',
      background: '#F8FAFC'
    },
    idealFor: 'Glamorous Sangeet Nights, Evening Receptions & Modern Black-Tie Weddings'
  },
  {
    id: 'tpl-marigold-boheme',
    name: 'Festive Marigold & Terracotta',
    category: 'Festive Bohème',
    tagline: 'Joyous sun-kissed yellow marigolds with rustic terracotta warmth',
    description: 'A burst of laughter and sunshine inspired by Haldi ceremonies and Phoolon Ki Holi. Warm terracotta textures, festive marigold yellow, and vibrant floral joy.',
    theme: 'terracotta-marigold',
    envelopeStyle: 'floral-fold',
    musicTrack: 'royal-shehnai',
    colors: {
      primary: '#9A3412',
      accent: '#EAB308',
      background: '#FFFBF7'
    },
    isNew: true,
    idealFor: 'Haldi, Mehendi, Bohemian Weddings & Intimate Rustic Celebrations'
  }
];
