import { WeddingData, WeddingTheme } from '../types/wedding';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  id: 's1ze9iot',
  slug: 'aarav-weds-meera',
  brideName: 'Meera Sharma',
  groomName: 'Aarav Singhania',
  brideParents: 'Smt. Sunita & Shri Rajesh Sharma',
  groomParents: 'Smt. Vandana & Shri Vikram Singhania',
  tagline: 'Two souls, one heartfelt journey, united in lifelong love',
  hashtag: '#AaravKiMeera',
  weddingDate: '2026-11-28T18:30',
  weddingCity: 'Jaipur, Rajasthan',
  mainVenue: 'The Oberoi Rajvilas, Jaipur',
  theme: 'royal-crimson',
  envelopeStyle: 'wax-seal',
  musicTrack: 'royal-shehnai',
  shagunUpiId: 'aarav.meera@okhdfcbank',
  shagunBankDetails: 'Aarav & Meera Wedding Account | HDFC Bank | A/C: 501004928172 | IFSC: HDFC0001234',
  shagunMessage: 'Your love, presence, and blessings are our greatest treasure. If you wish to honor us with digital shagun or gift blessings, you may use our secure QR code.',
  welcomeNote: 'With the divine blessings of our beloved ancestors and the boundless warmth of our families, we cordially invite you to join us in celebrating the sacred union of our hearts.',
  events: [
    {
      id: 'event-haldi',
      title: 'Manglik Haldi & Phoolon Ki Holi',
      subtitle: 'A golden morning of auspicious turmeric and fragrant flower petals',
      date: 'Friday, 27 November 2026',
      time: '10:30 AM onwards',
      venueName: 'The Heritage Courtyard, Rajvilas',
      venueAddress: 'Goner Road, Jaipur, Rajasthan 302031',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Rajvilas+Jaipur',
      dressCode: 'Sunshine Ochre & Floral Indian Wear',
      dressColor: '#FBBF24',
      iconName: 'sun',
      description: 'Join us for a joyful ceremony steeped in laughter, haldi paste, and marigold petals as we bless the bride and groom.',
      bannerColor: 'from-amber-600/30 to-yellow-500/20'
    },
    {
      id: 'event-sangeet',
      title: 'Sangeet & Sufi Night',
      subtitle: 'An enchanted evening of rhythmic beats, family performances & celebrations',
      date: 'Friday, 27 November 2026',
      time: '07:30 PM onwards',
      venueName: 'The Grand Lotus Pavilion',
      venueAddress: 'Goner Road, Jaipur, Rajasthan 302031',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Rajvilas+Jaipur',
      dressCode: 'Glamorous Indo-Western & Sequins',
      dressColor: '#6366F1',
      iconName: 'music',
      description: 'Lace up your dancing shoes for an unforgettable night filled with high-energy family dance performances, cocktails, and midnight dhol beats.',
      bannerColor: 'from-indigo-900/40 to-purple-800/20'
    },
    {
      id: 'event-wedding',
      title: 'Shubh Vivah & Pheras',
      subtitle: 'The sacred Vedic union under the star-lit royal mandap',
      date: 'Saturday, 28 November 2026',
      time: '04:30 PM (Baraat) | 06:30 PM (Pheras)',
      venueName: 'The Royal Lakefront Mandap',
      venueAddress: 'Goner Road, Jaipur, Rajasthan 302031',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Rajvilas+Jaipur',
      dressCode: 'Royal Traditional Indian / Sherwanis & Lehengas',
      dressColor: '#DC2626',
      iconName: 'flame',
      description: 'Witness the traditional Vedic seven vows as Aarav and Meera tie the sacred knot in the presence of Agni and their nearest loved ones.',
      bannerColor: 'from-rose-950/50 to-amber-900/30'
    },
    {
      id: 'event-reception',
      title: 'The Royal Gala Reception',
      subtitle: 'A toast to forever, accompanied by classical gourmet dining & music',
      date: 'Sunday, 29 November 2026',
      time: '08:00 PM onwards',
      venueName: 'The Imperial Ballroom',
      venueAddress: 'Goner Road, Jaipur, Rajasthan 302031',
      mapUrl: 'https://maps.google.com/?q=The+Oberoi+Rajvilas+Jaipur',
      dressCode: 'Black Tie Formal or Regal Festive Wear',
      dressColor: '#0F172A',
      iconName: 'sparkles',
      description: 'An elegant sit-down banquet, champagne toasts, live symphony orchestra, and heartfelt speeches to conclude our multi-day celebration.',
      bannerColor: 'from-slate-950/60 to-amber-950/20'
    }
  ],
  loveStory: [
    {
      id: 'story-1',
      year: '2021',
      title: 'The Coffee Shop Serendipity',
      date: 'October 14, 2021',
      location: 'Blue Tokai, Fort, Mumbai',
      description: 'A shared table during a torrential Mumbai monsoon drizzle, a mutual debate over pour-over versus espresso, and three hours that felt like three minutes.'
    },
    {
      id: 'story-2',
      year: '2023',
      title: 'Climbing Triund Together',
      date: 'May 20, 2023',
      location: 'Dharamshala, Himachal Pradesh',
      description: 'When the mountain trail was steep and slippery, holding hands was instinctive. Sitting beneath a blanket of Himalayan constellations, we knew this was forever.'
    },
    {
      id: 'story-3',
      year: '2025',
      title: 'The Sunset Whisper at Lake Pichola',
      date: 'December 12, 2025',
      location: 'Udaipur, Rajasthan',
      description: 'A private boat ride as the sun dipped behind the Aravali hills. With a trembling voice and an heirloom solitaire ring, Aarav asked, and Meera joyfully said Yes!'
    }
  ],
  photos: [
    {
      id: 'p-1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      title: 'The Royal Engagement',
      category: 'Pre-Wedding'
    },
    {
      id: 'p-2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      title: 'A Golden Afternoon in Jaipur',
      category: 'Pre-Wedding'
    },
    {
      id: 'p-3',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
      title: 'Auspicious Haldi Preparation',
      category: 'Haldi'
    },
    {
      id: 'p-4',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      title: 'Sangeet Choreography Laughs',
      category: 'Sangeet'
    },
    {
      id: 'p-5',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      title: 'Handcrafted Mehendi Details',
      category: 'Ceremony'
    },
    {
      id: 'p-6',
      url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1000&q=80',
      title: 'Forever Starts Today',
      category: 'Ceremony'
    }
  ],
  rsvps: [
    {
      id: 'rsvp-1',
      guestName: 'Rohan & Ananya Verma',
      phone: '+91 98201 44520',
      email: 'rohan.verma@example.com',
      attendingEvents: ['event-haldi', 'event-sangeet', 'event-wedding', 'event-reception'],
      guestCount: 2,
      dietaryPreference: 'Vegetarian',
      needsAccommodation: true,
      message: 'So ecstatic for both of you! Cannot wait to dance our hearts out at Sangeet.',
      createdAt: '2026-10-15'
    },
    {
      id: 'rsvp-2',
      guestName: 'Kabir & Natasha Mehta',
      phone: '+91 97110 33819',
      email: 'kabir.m@example.com',
      attendingEvents: ['event-wedding', 'event-reception'],
      guestCount: 2,
      dietaryPreference: 'Jain',
      needsAccommodation: false,
      message: 'Heartiest congratulations to the gorgeous couple!',
      createdAt: '2026-10-18'
    },
    {
      id: 'rsvp-3',
      guestName: 'Devika Sengupta',
      phone: '+91 99304 88201',
      email: 'devika.s@example.com',
      attendingEvents: ['event-sangeet', 'event-wedding'],
      guestCount: 1,
      dietaryPreference: 'Vegetarian',
      needsAccommodation: true,
      message: 'Wishing you a lifetime of joy and adventures!',
      createdAt: '2026-10-22'
    }
  ],
  blessings: [
    {
      id: 'b-1',
      authorName: 'Grandma Kaushalya Singhania',
      relationship: "Groom's Grandmother",
      message: 'May Lord Krishna shower both of my dearest children with boundless love, understanding, good health, and mutual respect throughout all seven lifetimes.',
      createdAt: '2026-10-20',
      likes: 18
    },
    {
      id: 'b-2',
      authorName: 'Sanjay & Radhika Uncle',
      relationship: "Bride's Family",
      message: 'Watching Meera grow into such a poised and radiant woman has been a joy. Aarav, you are gaining a gem. God bless your marriage forever!',
      createdAt: '2026-10-22',
      likes: 12
    },
    {
      id: 'b-3',
      authorName: 'Vikram, Siddharth & College Gang',
      relationship: 'Best Friends',
      message: 'From cramming college exams together to watching you marry the love of your life! Cheers to Aarav and Meera!',
      createdAt: '2026-10-25',
      likes: 24
    }
  ]
};

export const THEME_CONFIGS: Record<WeddingTheme, {
  name: string;
  primary: string;
  primaryLight: string;
  accent: string;
  gold: string;
  cardBg: string;
  bgGradient: string;
  border: string;
  badgeBg: string;
}> = {
  'royal-crimson': {
    name: 'Royal Crimson & Gold',
    primary: '#881337',
    primaryLight: '#be123c',
    accent: '#B45309',
    gold: '#D97706',
    cardBg: '#FFFDF9',
    bgGradient: 'from-[#2E020F] via-[#4C0519] to-[#1F020A]',
    border: '#E8D3B9',
    badgeBg: '#FDF2F4'
  },
  'champagne-gold': {
    name: 'Champagne & Rose Gold',
    primary: '#78350F',
    primaryLight: '#B45309',
    accent: '#D97706',
    gold: '#F59E0B',
    cardBg: '#FAFAF9',
    bgGradient: 'from-[#291B10] via-[#3E2715] to-[#1C120A]',
    border: '#E7DFD5',
    badgeBg: '#FEF3C7'
  },
  'emerald-sage': {
    name: 'Royal Emerald & Sage',
    primary: '#064E3B',
    primaryLight: '#047857',
    accent: '#059669',
    gold: '#D97706',
    cardBg: '#F9FAF8',
    bgGradient: 'from-[#03221A] via-[#064E3B] to-[#021813]',
    border: '#D1E0D7',
    badgeBg: '#ECFDF5'
  },
  'midnight-gold': {
    name: 'Midnight Celestial Gold',
    primary: '#0F172A',
    primaryLight: '#1E293B',
    accent: '#D97706',
    gold: '#FBBF24',
    cardBg: '#F8FAFC',
    bgGradient: 'from-[#020617] via-[#0F172A] to-[#020617]',
    border: '#CBD5E1',
    badgeBg: '#F1F5F9'
  },
  'terracotta-marigold': {
    name: 'Festive Marigold & Terracotta',
    primary: '#9A3412',
    primaryLight: '#C2410C',
    accent: '#D97706',
    gold: '#EAB308',
    cardBg: '#FFFBF7',
    bgGradient: 'from-[#3A1407] via-[#7C2D12] to-[#240B04]',
    border: '#F4D3C5',
    badgeBg: '#FFF7ED'
  }
};
