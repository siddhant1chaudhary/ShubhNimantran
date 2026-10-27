export interface CeremonyEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  dressCode: string;
  dressColor: string;
  iconName: 'sun' | 'sparkles' | 'heart' | 'flame' | 'music' | 'glass';
  description: string;
  bannerColor: string;
}

export interface LoveStoryMilestone {
  id: string;
  year: string;
  title: string;
  date: string;
  description: string;
  location: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'All' | 'Pre-Wedding' | 'Haldi' | 'Sangeet' | 'Ceremony';
}

export interface RsvpEntry {
  id: string;
  guestName: string;
  phone: string;
  email: string;
  attendingEvents: string[];
  guestCount: number;
  dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan';
  needsAccommodation: boolean;
  message?: string;
  createdAt: string;
}

export interface BlessingEntry {
  id: string;
  authorName: string;
  relationship: string;
  message: string;
  createdAt: string;
  likes: number;
}

export type WeddingTheme = 'royal-crimson' | 'champagne-gold' | 'emerald-sage' | 'midnight-gold' | 'terracotta-marigold';

export interface WeddingData {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  tagline: string;
  hashtag: string;
  weddingDate: string; // ISO date string: YYYY-MM-DDTHH:mm
  weddingCity: string;
  mainVenue: string;
  theme: WeddingTheme;
  envelopeStyle: 'wax-seal' | 'floral-fold' | 'royal-scroll' | 'scratch-reveal';
  musicTrack: 'royal-shehnai' | 'sitara-ambient' | 'flute-romance' | 'temple-bells';
  shagunUpiId: string;
  shagunBankDetails: string;
  shagunMessage: string;
  welcomeNote: string;
  events: CeremonyEvent[];
  loveStory: LoveStoryMilestone[];
  photos: PhotoItem[];
  rsvps: RsvpEntry[];
  blessings: BlessingEntry[];
}
