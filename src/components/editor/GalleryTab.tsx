import React, { useState } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { WeddingData, PhotoItem } from '../../types/wedding';

interface GalleryTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ wedding, onChange }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'Pre-Wedding' | 'Haldi' | 'Sangeet' | 'Ceremony'>('Pre-Wedding');

  const handleAddPhoto = () => {
    if (!newUrl.trim()) return;
    const item: PhotoItem = {
      id: `p-${Date.now()}`,
      url: newUrl.trim(),
      title: newTitle.trim() || 'Wedding Memory',
      category: newCategory
    };
    onChange({ photos: [...wedding.photos, item] });
    setNewTitle('');
    setNewUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const item: PhotoItem = {
            id: `p-${Date.now()}`,
            url: reader.result,
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: newCategory
          };
          onChange({ photos: [...wedding.photos, item] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id: string) => {
    onChange({ photos: wedding.photos.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-stone-900">Photo Moments & Gallery</h3>
        <p className="text-xs text-stone-500">
          Upload couple portraits, Haldi snaps, and engagement memories for guests to cherish.
        </p>
      </div>

      {/* Add Photo Form */}
      <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
        <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
          Add Photo / Portrait
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-700 mb-1">Image URL</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
            >
              <option value="Pre-Wedding">Pre-Wedding</option>
              <option value="Haldi">Haldi</option>
              <option value="Sangeet">Sangeet</option>
              <option value="Ceremony">Ceremony</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
          <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-dashed border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-stone-500" />
            <span>Upload from Computer</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleAddPhoto}
            disabled={!newUrl.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add by URL</span>
          </button>
        </div>
      </div>

      {/* Existing Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {wedding.photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-stone-200 aspect-[4/3] bg-stone-100">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 text-white">
              <span className="text-[11px] truncate flex-1">{photo.title}</span>
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="p-1 rounded bg-rose-700 hover:bg-rose-800 text-white shrink-0"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] bg-black/60 text-white font-medium">
              {photo.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
