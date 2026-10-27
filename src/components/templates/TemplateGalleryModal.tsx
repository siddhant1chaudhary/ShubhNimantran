import React, { useState } from 'react';
import { X, Check, Sparkles, ArrowRight, Palette } from 'lucide-react';
import { WEDDING_TEMPLATES, WeddingTemplate } from '../../data/templatesData';
import { WeddingData } from '../../types/wedding';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateTheme: string;
  onSelectTemplate: (template: WeddingTemplate) => void;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  currentTemplateTheme,
  onSelectTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Royal Palace', 'Minimalist Luxury', 'South Indian Heritage', 'Cocktail Modern', 'Festive Bohème'];

  const filteredTemplates = selectedCategory === 'All'
    ? WEDDING_TEMPLATES
    : WEDDING_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative border border-stone-200 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-0.5">
              ShubhNimantran Signature Suites
            </div>
            <h2 className="font-serif-luxury text-2xl text-stone-900">
              Select Wedding Invitation Template
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="py-3 flex items-center gap-1.5 overflow-x-auto shrink-0 border-b border-stone-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-900 text-white font-medium shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((tpl) => {
            const isCurrent = tpl.theme === currentTemplateTheme;
            return (
              <div
                key={tpl.id}
                className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md ${
                  isCurrent ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-stone-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                      {tpl.category}
                    </span>
                    {tpl.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200">
                        Popular Choice
                      </span>
                    )}
                    {tpl.isNew && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-200">
                        New Design
                      </span>
                    )}
                  </div>

                  {/* Visual Preview Swatch Card */}
                  <div
                    className="h-28 rounded-xl p-4 flex flex-col justify-between text-white relative overflow-hidden shadow-inner"
                    style={{
                      background: `linear-gradient(135deg, ${tpl.colors.primary} 0%, #1c1917 100%)`
                    }}
                  >
                    <div className="flex items-center justify-between text-xs opacity-90 font-royal">
                      <span>॥ शुभ विवाह ॥</span>
                      <span className="text-[11px] font-mono capitalize">{tpl.envelopeStyle}</span>
                    </div>

                    <div>
                      <div className="font-serif-luxury text-2xl font-light text-amber-100">
                        Aarav & Meera
                      </div>
                      <div className="text-[10px] text-amber-200/80 font-sans">
                        Jaipur · November 2026
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-xl text-stone-900">{tpl.name}</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                    <span className="font-medium text-amber-900">Recommended for: </span>
                    {tpl.idealFor}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.primary }} />
                    <div className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.accent }} />
                  </div>

                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onClose();
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isCurrent
                        ? 'bg-amber-100 text-amber-900 cursor-default'
                        : 'bg-rose-900 hover:bg-rose-800 text-white shadow-sm'
                    }`}
                  >
                    {isCurrent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Template</span>
                      </>
                    ) : (
                      <>
                        <span>Use This Template</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
