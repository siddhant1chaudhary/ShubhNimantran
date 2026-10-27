import React from 'react';
import { WeddingData } from '../../types/wedding';

interface CoupleTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const CoupleTab: React.FC<CoupleTabProps> = ({ wedding, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-stone-900 mb-1">Couple & Family Information</h3>
        <p className="text-xs text-stone-500">
          Enter the names and parents of the bride and groom to appear on the formal royal invitation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Bride's Full Name</label>
          <input
            type="text"
            value={wedding.brideName}
            onChange={(e) => onChange({ brideName: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
            placeholder="e.g. Meera Sharma"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Groom's Full Name</label>
          <input
            type="text"
            value={wedding.groomName}
            onChange={(e) => onChange({ groomName: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
            placeholder="e.g. Aarav Singhania"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Bride's Parents</label>
          <input
            type="text"
            value={wedding.brideParents}
            onChange={(e) => onChange({ brideParents: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
            placeholder="e.g. Smt. Sunita & Shri Rajesh Sharma"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Groom's Parents</label>
          <input
            type="text"
            value={wedding.groomParents}
            onChange={(e) => onChange({ groomParents: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
            placeholder="e.g. Smt. Vandana & Shri Vikram Singhania"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Main Wedding Date & Time</label>
          <input
            type="datetime-local"
            value={wedding.weddingDate}
            onChange={(e) => onChange({ weddingDate: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Wedding City / Destination</label>
          <input
            type="text"
            value={wedding.weddingCity}
            onChange={(e) => onChange({ weddingCity: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
            placeholder="e.g. Jaipur, Rajasthan"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1">Main Ceremony Venue</label>
        <input
          type="text"
          value={wedding.mainVenue}
          onChange={(e) => onChange({ mainVenue: e.target.value })}
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
          placeholder="e.g. The Oberoi Rajvilas, Jaipur"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Wedding Hashtag</label>
          <input
            type="text"
            value={wedding.hashtag}
            onChange={(e) => onChange({ hashtag: e.target.value })}
            className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 font-mono"
            placeholder="#AaravKiMeera"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Custom Link Slug</label>
          <div className="flex items-center text-xs border border-stone-200 rounded-lg overflow-hidden">
            <span className="bg-stone-100 text-stone-500 px-2.5 py-2 select-none">shubhnimantran.in/</span>
            <input
              type="text"
              value={wedding.slug}
              onChange={(e) => onChange({ slug: e.target.value })}
              className="flex-1 p-2 focus:outline-none"
              placeholder="aarav-weds-meera"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1">Romantic Tagline</label>
        <input
          type="text"
          value={wedding.tagline}
          onChange={(e) => onChange({ tagline: e.target.value })}
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
          placeholder="Two souls, one heartfelt journey, united in lifelong love"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-stone-700 mb-1">Welcome & Blessing Note</label>
        <textarea
          rows={3}
          value={wedding.welcomeNote}
          onChange={(e) => onChange({ welcomeNote: e.target.value })}
          className="w-full text-xs p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
          placeholder="With the divine blessings of our beloved ancestors..."
        />
      </div>
    </div>
  );
};
