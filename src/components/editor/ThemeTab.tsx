import React from 'react';
import { Palette, Mail, Music, Sparkles, Layers } from 'lucide-react';
import { WeddingData, WeddingTheme } from '../../types/wedding';
import { THEME_CONFIGS } from '../../data/defaultWedding';
import { WEDDING_TEMPLATES, WeddingTemplate } from '../../data/templatesData';

interface ThemeTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
  onOpenTemplates?: () => void;
}

export const ThemeTab: React.FC<ThemeTabProps> = ({ wedding, onChange, onOpenTemplates }) => {
  const themeList: { key: WeddingTheme; name: string; primary: string; accent: string }[] = [
    { key: 'royal-crimson', name: 'Jaipur Royal Crimson', primary: '#881337', accent: '#D97706' },
    { key: 'champagne-gold', name: 'Champagne & Rose Gold', primary: '#78350F', accent: '#F59E0B' },
    { key: 'emerald-sage', name: 'Udaipur Emerald Sage', primary: '#064E3B', accent: '#10B981' },
    { key: 'midnight-gold', name: 'Midnight Celestial Gold', primary: '#0F172A', accent: '#FBBF24' },
    { key: 'terracotta-marigold', name: 'Festive Marigold & Ochre', primary: '#9A3412', accent: '#EAB308' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Design & Luxury Templates</h3>
          <p className="text-xs text-stone-500">
            Personalize your wedding aesthetic, royal unsealing animation, and background ambient raga.
          </p>
        </div>
        {onOpenTemplates && (
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Browse Templates</span>
          </button>
        )}
      </div>

      {/* Palette Chooser */}
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-2">
          Color Palette & Atmosphere
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {themeList.map((t) => {
            const isSelected = wedding.theme === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange({ theme: t.key })}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex -space-x-2 shrink-0">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: t.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: t.accent }}
                  />
                </div>
                <div>
                  <div className="text-xs font-medium text-stone-900">{t.name}</div>
                  <div className="text-[10px] text-stone-500">Curated royal styling</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Envelope Unveil Style */}
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-2">
          Entrance Envelope Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'wax-seal', name: 'Monogram Wax Seal Stamp', desc: 'Guests click royal wax seal to break & open invite' },
            { id: 'scratch-reveal', name: 'Scratch-to-Reveal Card', desc: 'Interactive foil scratch card revealing auspicious date' },
            { id: 'floral-fold', name: 'Royal Silk Gatefold', desc: 'Traditional two-door palace gateway opening' },
            { id: 'royal-scroll', name: 'Heritage Farman Scroll', desc: 'Unrolling golden parchment with royal blessing' }
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => onChange({ envelopeStyle: style.id as any })}
              className={`p-3 rounded-xl border text-left transition-all ${
                wedding.envelopeStyle === style.id
                  ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="text-xs font-medium text-stone-900">{style.name}</div>
              <div className="text-[10px] text-stone-500 mt-0.5">{style.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Ambient Music */}
      <div>
        <label className="block text-xs font-medium text-stone-700 mb-2">
          Background Ambient Music
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'royal-shehnai', name: 'Auspicious Shehnai & Dhol', desc: 'Raag Yaman classical wedding drone & flute' },
            { id: 'sitara-ambient', name: 'Sitar & Tanpura Reverie', desc: 'Serene acoustic sitar and meditative strings' },
            { id: 'flute-romance', name: 'Bansuri Romantic Melody', desc: 'Gentle Krishna flute arpeggio' },
            { id: 'temple-bells', name: 'Sacred Vedic Chimes & Bells', desc: 'Traditional auspicious temple sanctuary tones' }
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => onChange({ musicTrack: track.id as any })}
              className={`p-3 rounded-xl border text-left transition-all ${
                wedding.musicTrack === track.id
                  ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                  : 'border-stone-200 bg-white hover:bg-stone-50'
              }`}
            >
              <div className="text-xs font-medium text-stone-900">{track.name}</div>
              <div className="text-[10px] text-stone-500 mt-0.5">{track.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
