import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  Sun, 
  Music, 
  Flame, 
  Wine, 
  Volume2, 
  VolumeX, 
  Send, 
  CheckCircle2, 
  Copy, 
  Share2,
  ChevronRight,
  ExternalLink,
  Gift,
  QrCode,
  X
} from 'lucide-react';
import { WeddingData, CeremonyEvent } from '../../types/wedding';
import { THEME_CONFIGS } from '../../data/defaultWedding';
import { MandalaMotif, OrnamentalDivider, GaneshIcon } from '../common/MandalaMotif';
import { weddingAudio } from '../../utils/audioEngine';
import { generateUpiUri, renderQrSvg } from '../../utils/generateQrCode';

interface GuestInvitationViewProps {
  wedding: WeddingData;
  onAddRsvp: (rsvp: {
    guestName: string;
    phone: string;
    email: string;
    attendingEvents: string[];
    guestCount: number;
    dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan';
    needsAccommodation: boolean;
    message?: string;
  }) => void;
  onAddBlessing: (blessing: { authorName: string; relationship: string; message: string }) => void;
  onLikeBlessing: (id: string) => void;
  isIframeOrMobile?: boolean;
}

export const GuestInvitationView: React.FC<GuestInvitationViewProps> = ({
  wedding,
  onAddRsvp,
  onAddBlessing,
  onLikeBlessing,
  isIframeOrMobile = false
}) => {
  const theme = THEME_CONFIGS[wedding.theme] || THEME_CONFIGS['royal-crimson'];

  // Wax seal opening state
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Gallery filter & lightbox
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // RSVP Form State
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuestCount, setRsvpGuestCount] = useState(2);
  const [rsvpDiet, setRsvpDiet] = useState<'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan'>('Vegetarian');
  const [rsvpAccommodation, setRsvpAccommodation] = useState(false);
  const [rsvpSelectedEvents, setRsvpSelectedEvents] = useState<string[]>(
    wedding.events.map(e => e.id)
  );
  const [rsvpNote, setRsvpNote] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Blessing Form State
  const [blessingAuthor, setBlessingAuthor] = useState('');
  const [blessingRelation, setBlessingRelation] = useState('');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [blessingSuccess, setBlessingSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Calculate countdown
  useEffect(() => {
    const target = new Date(wedding.weddingDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingDate]);

  // Handle Envelope Open
  const handleOpenEnvelope = () => {
    setIsOpened(true);
    weddingAudio.play();
    setIsPlayingMusic(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D97706', '#B45309', '#F59E0B', '#E11D48']
    });
  };

  const toggleMusic = () => {
    const playing = weddingAudio.toggle();
    setIsPlayingMusic(playing);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(wedding.shagunUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    onAddRsvp({
      guestName: rsvpName.trim(),
      phone: rsvpPhone.trim(),
      email: rsvpEmail.trim(),
      attendingEvents: rsvpSelectedEvents,
      guestCount: Number(rsvpGuestCount),
      dietaryPreference: rsvpDiet,
      needsAccommodation: rsvpAccommodation,
      message: rsvpNote.trim()
    });

    setRsvpSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 }
    });
  };

  const handleBlessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingAuthor.trim() || !blessingMessage.trim()) return;

    onAddBlessing({
      authorName: blessingAuthor.trim(),
      relationship: blessingRelation.trim() || 'Well Wisher',
      message: blessingMessage.trim()
    });

    setBlessingAuthor('');
    setBlessingRelation('');
    setBlessingMessage('');
    setBlessingSuccess(true);
    setTimeout(() => setBlessingSuccess(false), 4000);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (ev: CeremonyEvent) => {
    const title = encodeURIComponent(`${wedding.brideName} & ${wedding.groomName} - ${ev.title}`);
    const details = encodeURIComponent(`${ev.subtitle}\nDress Code: ${ev.dressCode}\nVenue: ${ev.venueName}`);
    const location = encodeURIComponent(`${ev.venueName}, ${ev.venueAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const renderEventIcon = (name: string) => {
    switch (name) {
      case 'sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'music': return <Music className="w-5 h-5 text-indigo-500" />;
      case 'flame': return <Flame className="w-5 h-5 text-rose-500" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'glass': return <Wine className="w-5 h-5 text-sky-500" />;
      default: return <Heart className="w-5 h-5 text-rose-500" />;
    }
  };

  // Filtered photos
  const filteredPhotos = activeCategory === 'All' 
    ? wedding.photos 
    : wedding.photos.filter(p => p.category === activeCategory);

  // IF NOT YET OPENED: SHOW ROYAL ENVELOPE / WAX SEAL SCREEN
  if (!isOpened) {
    return (
      <div className="relative min-h-[720px] w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-b from-[#2A050F] via-[#3E0A1A] to-[#1F0208] text-white">
        {/* Subtle background mandala */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <MandalaMotif size={600} color="#FBBF24" />
        </div>

        {/* Envelope Mock */}
        <div className="relative z-10 max-w-md w-full bg-[#3B0E1E] border border-amber-500/30 rounded-2xl p-8 shadow-2xl shadow-black/60 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full border border-amber-500/40 flex items-center justify-center mb-4 bg-amber-950/40">
            <GaneshIcon size={36} color="#F59E0B" />
          </div>

          <div className="text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-2 font-medium">
            Royal Wedding Invitation
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-amber-100 mb-2">
            {wedding.brideName}
            <span className="block text-2xl font-light text-amber-400/90 italic my-1">&</span>
            {wedding.groomName}
          </h2>

          <div className="text-xs text-amber-200/70 mb-6 font-sans-clean">
            {new Date(wedding.weddingDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })} · {wedding.weddingCity}
          </div>

          <OrnamentalDivider color="#F59E0B" className="mb-6" />

          <p className="text-xs text-amber-100/80 leading-relaxed italic mb-8 max-w-xs font-serif-luxury text-base">
            "{wedding.tagline}"
          </p>

          {/* Interactive Wax Seal Button */}
          <button
            onClick={handleOpenEnvelope}
            className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label="Break Wax Seal to Open Invitation"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 via-rose-800 to-amber-950 border-2 border-amber-400 shadow-xl shadow-rose-950/80 flex items-center justify-center relative overflow-hidden group-hover:ring-4 group-hover:ring-amber-400/30 transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent)]" />
              <div className="font-royal text-base font-bold text-amber-200 tracking-wider">
                {wedding.brideName[0]}&{wedding.groomName[0]}
              </div>
            </div>
            <span className="mt-3 text-xs tracking-wider uppercase font-medium text-amber-300 group-hover:text-amber-200 flex items-center gap-1.5">
              <span>Open Invitation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <div className="mt-6 text-[11px] text-amber-300/50">
            Tap the wax seal to unveil ceremonies & celebrations
          </div>
        </div>
      </div>
    );
  }

  // OPENED INVITATION VIEW
  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#292524] transition-colors duration-300">
      
      {/* Floating Audio & Quick RSVP Controls */}
      <div className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2DA] px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 transition-colors"
            title={isPlayingMusic ? 'Mute Music' : 'Play Indian Wedding Ambient Shehnai'}
          >
            {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 text-amber-800 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-amber-800" />}
            <span className="font-medium">{isPlayingMusic ? 'Music Playing' : 'Play Music'}</span>
          </button>
          <span className="text-stone-400 hidden sm:inline">·</span>
          <span className="text-stone-600 font-medium hidden sm:inline">{wedding.hashtag}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="px-3 py-1 bg-rose-900 text-white rounded-full font-medium hover:bg-rose-800 transition-colors shadow-sm"
          >
            RSVP Now
          </button>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Invitation link copied to clipboard!');
            }}
            className="p-1 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative text-center py-16 px-6 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FAF8F5]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-25 pointer-events-none">
          <MandalaMotif size={480} color="#D97706" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border border-amber-600/30 bg-amber-50 flex items-center justify-center mb-4">
            <GaneshIcon size={32} color="#B45309" />
          </div>

          <div className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-3">
            ॥ शुभ विवाह ॥
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-stone-900 leading-tight mb-3">
            {wedding.brideName}
            <span className="block text-2xl sm:text-3xl italic text-amber-700 font-light my-1">&</span>
            {wedding.groomName}
          </h1>

          <p className="text-sm sm:text-base font-serif-luxury italic text-stone-600 max-w-md mx-auto mb-6">
            "{wedding.tagline}"
          </p>

          <OrnamentalDivider color="#B45309" className="mb-6" />

          {/* Parents Invitation */}
          <div className="text-xs text-stone-600 leading-relaxed max-w-lg mb-8 font-sans-clean space-y-1">
            <p>
              Daughter of <span className="font-semibold text-stone-900">{wedding.brideParents}</span>
            </p>
            <p>
              Son of <span className="font-semibold text-stone-900">{wedding.groomParents}</span>
            </p>
            <p className="pt-2 text-stone-500 italic max-w-sm mx-auto">
              {wedding.welcomeNote}
            </p>
          </div>

          {/* COUNTDOWN TIMER */}
          <div className="w-full max-w-md bg-white border border-[#E7E2DA] rounded-2xl p-5 shadow-sm mb-4">
            <div className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold mb-3 text-center">
              Counting Down to the Sacred Union
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] uppercase text-stone-500 font-medium mt-0.5">Days</div>
              </div>
              <div className="p-2 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {timeLeft.hours}
                </div>
                <div className="text-[10px] uppercase text-stone-500 font-medium mt-0.5">Hours</div>
              </div>
              <div className="p-2 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {timeLeft.minutes}
                </div>
                <div className="text-[10px] uppercase text-stone-500 font-medium mt-0.5">Mins</div>
              </div>
              <div className="p-2 bg-[#FAF8F5] rounded-xl border border-stone-200/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {timeLeft.seconds}
                </div>
                <div className="text-[10px] uppercase text-stone-500 font-medium mt-0.5">Secs</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-2">
            <MapPin className="w-3.5 h-3.5 text-rose-800 shrink-0" />
            <span>{wedding.mainVenue} · {wedding.weddingCity}</span>
          </div>
        </div>
      </section>

      {/* MULTI-DAY CEREMONIES TIMELINE */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            Wedding Itinerary
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal">
            Auspicious Ceremonies
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-2">
            Every ritual is a celebration of timeless culture, sacred prayers, and lifelong joyous memories.
          </p>
        </div>

        <div className="space-y-6">
          {wedding.events.map((event, idx) => (
            <div
              key={event.id}
              className="group bg-white border border-[#E7E2DA] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Event Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60">
                      {renderEventIcon(event.iconName)}
                    </div>
                    <div>
                      <div className="text-xs text-amber-800 font-medium">Ceremony 0{idx + 1}</div>
                      <h3 className="font-serif-luxury text-2xl font-normal text-stone-900 leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 italic font-serif-luxury text-base">
                    {event.subtitle}
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{event.venueName}, {event.venueAddress}</span>
                    </div>
                  </div>

                  {/* Attire Dress code */}
                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span className="text-stone-500 font-medium">Dress Code:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200/60">
                      {event.dressCode}
                    </span>
                  </div>

                  {event.description && (
                    <p className="text-xs text-stone-500 leading-relaxed pt-1">
                      {event.description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-rose-700" />
                    <span>View Venue Map</span>
                  </a>
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 border border-amber-200 rounded-lg text-amber-900 hover:bg-amber-100 transition-colors"
                  >
                    <Calendar className="w-3 h-3 text-amber-700" />
                    <span>Add to Calendar</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOVE STORY JOURNEY */}
      {wedding.loveStory.length > 0 && (
        <section className="py-12 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                Our Journey
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal">
                How Love Unfolded
              </h2>
            </div>

            <div className="relative border-l border-amber-300/60 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {wedding.loveStory.map((milestone) => (
                <div key={milestone.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-[#F5EFE6] shadow-sm" />

                  <div className="bg-white border border-[#E7E2DA] rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
                      <span>{milestone.date}</span>
                      <span className="font-mono text-stone-400">{milestone.location}</span>
                    </div>
                    <h3 className="font-serif-luxury text-xl font-normal text-stone-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans-clean">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PHOTO MOMENTS & GALLERY */}
      {wedding.photos.length > 0 && (
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Captured Moments
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal">
              Memories & Portraits
            </h2>

            {/* Category Filter */}
            <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap">
              {['All', 'Pre-Wedding', 'Haldi', 'Sangeet', 'Ceremony'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    activeCategory === cat
                      ? 'bg-rose-900 text-white font-medium shadow-sm'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxImage(photo.url)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-stone-200 shadow-sm"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to elegant gradient card if remote image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs text-white font-medium">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DIGITAL SHAGUN & GIFT REGISTRY */}
      {wedding.shagunUpiId && (
        <section className="py-12 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5]">
          <div className="max-w-xl mx-auto bg-white border border-[#E7E2DA] rounded-2xl p-6 sm:p-8 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-amber-800" />
            </div>

            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Shagun & Blessings
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-stone-900 font-normal mb-2">
              Digital Shagun & Registry
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
              {wedding.shagunMessage}
            </p>

            {/* QR Code Container */}
            <div className="inline-block p-4 bg-[#FAF8F5] border border-amber-200/80 rounded-2xl shadow-inner mb-4">
              <img
                src={renderQrSvg(generateUpiUri(wedding.shagunUpiId, `${wedding.brideName} & ${wedding.groomName}`), 180)}
                alt="Digital Shagun UPI QR Code"
                className="w-36 h-36 rounded-lg mx-auto"
              />
              <div className="text-[11px] text-amber-900 font-medium mt-2 flex items-center justify-center gap-1">
                <span>Scan with GPay / PhonePe / Paytm</span>
              </div>
            </div>

            {/* UPI ID Copy Box */}
            <div className="flex items-center justify-center gap-2 max-w-sm mx-auto p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs">
              <span className="font-mono text-stone-800 font-medium truncate">{wedding.shagunUpiId}</span>
              <button
                onClick={handleCopyUpi}
                className="shrink-0 px-2.5 py-1 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-1"
              >
                {copiedUpi ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {wedding.shagunBankDetails && (
              <div className="mt-4 text-[11px] text-stone-500 leading-relaxed">
                {wedding.shagunBankDetails}
              </div>
            )}
          </div>
        </section>
      )}

      {/* BLESSINGS & WISHES WALL */}
      <section className="py-12 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            Heartfelt Words
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-normal">
            Blessings & Wishes Wall
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
            Leave your warm congratulations and blessings for Aarav & Meera.
          </p>
        </div>

        {/* Post Blessing Form */}
        <form onSubmit={handleBlessingSubmit} className="bg-white border border-[#E7E2DA] rounded-2xl p-5 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={blessingAuthor}
                onChange={(e) => setBlessingAuthor(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Relationship</label>
              <input
                type="text"
                value={blessingRelation}
                onChange={(e) => setBlessingRelation(e.target.value)}
                placeholder="e.g. Groom's Cousin, College Friend"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-700 mb-1">Your Blessing Message</label>
            <textarea
              required
              rows={2}
              value={blessingMessage}
              onChange={(e) => setBlessingMessage(e.target.value)}
              placeholder="May your journey ahead be filled with laughter, joy and boundless blessings..."
              className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>
          <div className="flex items-center justify-between">
            {blessingSuccess ? (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Your blessing was shared!
              </span>
            ) : <span />}
            <button
              type="submit"
              className="px-4 py-2 bg-rose-900 text-white rounded-xl text-xs font-medium hover:bg-rose-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Blessing</span>
            </button>
          </div>
        </form>

        {/* Wishes List */}
        <div className="space-y-4">
          {wedding.blessings.map((b) => (
            <div key={b.id} className="bg-white border border-[#E7E2DA] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div>
                  <span className="font-semibold text-stone-900">{b.authorName}</span>
                  <span className="text-stone-400 mx-1.5">·</span>
                  <span className="text-amber-800">{b.relationship}</span>
                </div>
                <button
                  onClick={() => onLikeBlessing(b.id)}
                  className="flex items-center gap-1 text-xs text-rose-800 hover:text-rose-900 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span className="font-mono text-[11px]">{b.likes}</span>
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic font-serif-luxury text-base">
                "{b.message}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#E7E2DA] bg-[#FFFDF9] text-center text-xs text-stone-500">
        <div className="font-serif-luxury text-xl text-stone-800 mb-1">
          {wedding.brideName} & {wedding.groomName}
        </div>
        <p className="text-stone-400 mb-4">{wedding.hashtag} · {wedding.weddingCity}</p>
        <p className="text-[11px] text-stone-400">
          Created with love on ShubhNimantran Digital Wedding Suite
        </p>
      </footer>

      {/* RSVP MODAL */}
      {isRsvpOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsRsvpOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-stone-900 mb-2">
                  RSVP Confirmed!
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto mb-6">
                  Thank you, <span className="font-semibold text-stone-800">{rsvpName}</span>! Your attendance details have been recorded for Aarav & Meera's wedding.
                </p>
                <button
                  onClick={() => {
                    setIsRsvpOpen(false);
                    setRsvpSubmitted(false);
                  }}
                  className="px-5 py-2 bg-rose-900 text-white rounded-xl text-xs font-medium hover:bg-rose-800"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                    Kindly Respond
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-stone-900">
                    Will You Celebrate With Us?
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="e.g. Rahul & Sneha Kapoor"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800"
                    />
                  </div>
                </div>

                {/* Attending Events Multiselect */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5">
                    Which ceremonies will you attend?
                  </label>
                  <div className="space-y-1.5">
                    {wedding.events.map((ev) => {
                      const isChecked = rsvpSelectedEvents.includes(ev.id);
                      return (
                        <label
                          key={ev.id}
                          className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer text-xs transition-colors ${
                            isChecked ? 'bg-amber-50/60 border-amber-300' : 'bg-stone-50 border-stone-200'
                          }`}
                        >
                          <span className="font-medium text-stone-800">{ev.title}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRsvpSelectedEvents([...rsvpSelectedEvents, ev.id]);
                              } else {
                                setRsvpSelectedEvents(rsvpSelectedEvents.filter(id => id !== ev.id));
                              }
                            }}
                            className="w-4 h-4 accent-amber-700 rounded"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Total Guests</label>
                    <select
                      value={rsvpGuestCount}
                      onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Dietary Preference</label>
                    <select
                      value={rsvpDiet}
                      onChange={(e) => setRsvpDiet(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800 bg-white"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Jain">Strict Jain</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={rsvpAccommodation}
                      onChange={(e) => setRsvpAccommodation(e.target.checked)}
                      className="w-4 h-4 accent-amber-700 rounded"
                    />
                    <span>Hotel accommodation or airport shuttle needed</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Note for the Couple</label>
                  <textarea
                    rows={2}
                    value={rsvpNote}
                    onChange={(e) => setRsvpNote(e.target.value)}
                    placeholder="Song requests, special wishes, or arrival times..."
                    className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-900 text-white rounded-xl text-xs font-medium hover:bg-rose-800 transition-colors shadow-sm"
                >
                  Submit RSVP Attendance
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl">
            <img
              src={lightboxImage}
              alt="Enlarged photo"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/75"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
