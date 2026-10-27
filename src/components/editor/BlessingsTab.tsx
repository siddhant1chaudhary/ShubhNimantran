import React from 'react';
import { Trash2, Heart, Plus, MessageCircle } from 'lucide-react';
import { WeddingData, BlessingEntry } from '../../types/wedding';

interface BlessingsTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const BlessingsTab: React.FC<BlessingsTabProps> = ({ wedding, onChange }) => {
  const handleDelete = (id: string) => {
    onChange({ blessings: wedding.blessings.filter(b => b.id !== id) });
  };

  const handleAddSample = () => {
    const newB: BlessingEntry = {
      id: `b-${Date.now()}`,
      authorName: 'Family Friend',
      relationship: 'Well Wisher',
      message: 'May God shower both of you with joy, affection, and unending prosperity!',
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1
    };
    onChange({ blessings: [newB, ...wedding.blessings] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Blessings & Wishes Moderation</h3>
          <p className="text-xs text-stone-500">
            View, moderate, or add well-wishes from friends and family.
          </p>
        </div>
        <button
          onClick={handleAddSample}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Blessing</span>
        </button>
      </div>

      <div className="space-y-3">
        {wedding.blessings.map((b) => (
          <div key={b.id} className="p-4 bg-white border border-stone-200 rounded-xl flex items-start justify-between gap-3 shadow-sm">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-stone-900">{b.authorName}</span>
                <span className="text-stone-400">·</span>
                <span className="text-amber-800 font-medium">{b.relationship}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-400 text-[11px]">{b.createdAt}</span>
              </div>
              <p className="text-xs text-stone-600 italic font-serif-luxury text-base">
                "{b.message}"
              </p>
              <div className="flex items-center gap-1 text-[11px] text-rose-700 pt-1">
                <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
                <span>{b.likes} Likes</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(b.id)}
              className="p-1.5 text-stone-400 hover:text-rose-700 rounded-lg hover:bg-stone-50 transition-colors"
              title="Delete blessing"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
