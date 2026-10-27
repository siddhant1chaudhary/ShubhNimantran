import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { WeddingData, CeremonyEvent } from '../../types/wedding';

interface CeremoniesTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const CeremoniesTab: React.FC<CeremoniesTabProps> = ({ wedding, onChange }) => {
  const [activeEventId, setActiveEventId] = useState<string>(wedding.events[0]?.id || '');

  const handleAddEvent = () => {
    const newId = `event-${Date.now()}`;
    const newEvent: CeremonyEvent = {
      id: newId,
      title: 'New Auspicious Ceremony',
      subtitle: 'A memorable time of joy and prayers with loved ones',
      date: 'Saturday, 28 November 2026',
      time: '05:00 PM onwards',
      venueName: wedding.mainVenue || 'Grand Palace Venue',
      venueAddress: wedding.weddingCity || 'Jaipur, Rajasthan',
      mapUrl: 'https://maps.google.com/?q=Jaipur',
      dressCode: 'Festive Traditional Attire',
      dressColor: '#DC2626',
      iconName: 'sparkles',
      description: 'Kindly join us in celebrating this special wedding ceremony.',
      bannerColor: 'from-amber-700/30 to-rose-700/20'
    };

    onChange({ events: [...wedding.events, newEvent] });
    setActiveEventId(newId);
  };

  const handleUpdateEvent = (id: string, updates: Partial<CeremonyEvent>) => {
    const updated = wedding.events.map(ev => ev.id === id ? { ...ev, ...updates } : ev);
    onChange({ events: updated });
  };

  const handleDeleteEvent = (id: string) => {
    if (wedding.events.length <= 1) {
      alert('You must have at least one ceremony.');
      return;
    }
    const updated = wedding.events.filter(ev => ev.id !== id);
    onChange({ events: updated });
    if (activeEventId === id) {
      setActiveEventId(updated[0]?.id || '');
    }
  };

  const activeEvent = wedding.events.find(e => e.id === activeEventId) || wedding.events[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Multi-Day Ceremonies & Itinerary</h3>
          <p className="text-xs text-stone-500">
            Configure Haldi, Mehendi, Sangeet, Wedding & Reception rituals.
          </p>
        </div>
        <button
          onClick={handleAddEvent}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Ceremony</span>
        </button>
      </div>

      {/* Event Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {wedding.events.map((event, idx) => (
          <button
            key={event.id}
            onClick={() => setActiveEventId(event.id)}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors border ${
              activeEvent?.id === event.id
                ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-semibold'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {idx + 1}. {event.title || 'Untitled'}
          </button>
        ))}
      </div>

      {/* Active Event Editor Form */}
      {activeEvent && (
        <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Ceremony Details
            </span>
            <button
              onClick={() => handleDeleteEvent(activeEvent.id)}
              className="flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900"
              title="Delete this ceremony"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Ceremony Title</label>
              <input
                type="text"
                value={activeEvent.title}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { title: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. Sangeet & Cocktail Night"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Ritual Subtitle / Theme</label>
              <input
                type="text"
                value={activeEvent.subtitle}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { subtitle: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. An enchanted evening of music & dance"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Date String</label>
              <input
                type="text"
                value={activeEvent.date}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { date: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. Friday, 27 November 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Timing & Muhurat</label>
              <input
                type="text"
                value={activeEvent.time}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { time: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. 07:30 PM onwards"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Venue Hall / Lawn</label>
              <input
                type="text"
                value={activeEvent.venueName}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { venueName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. The Grand Lotus Pavilion"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Venue Address</label>
              <input
                type="text"
                value={activeEvent.venueAddress}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { venueAddress: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. Goner Road, Jaipur, Rajasthan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Google Maps Link</label>
              <input
                type="url"
                value={activeEvent.mapUrl}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { mapUrl: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Dress Code & Palette</label>
              <input
                type="text"
                value={activeEvent.dressCode}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { dressCode: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. Sunshine Yellow & Floral Traditional"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Ritual Icon</label>
              <select
                value={activeEvent.iconName}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { iconName: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
              >
                <option value="sun">Sun (Haldi / Morning)</option>
                <option value="music">Music Notes (Sangeet / Dance)</option>
                <option value="flame">Sacred Flame (Vivah / Pheras)</option>
                <option value="sparkles">Sparkles (Reception / Gala)</option>
                <option value="heart">Heart (Engagement / Roka)</option>
                <option value="glass">Cocktail Glass (Afterparty)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Ceremony Description</label>
              <input
                type="text"
                value={activeEvent.description}
                onChange={(e) => handleUpdateEvent(activeEvent.id, { description: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="Brief note on the customs or expectations"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
