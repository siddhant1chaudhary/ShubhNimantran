import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { WeddingData, LoveStoryMilestone } from '../../types/wedding';

interface StoryTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const StoryTab: React.FC<StoryTabProps> = ({ wedding, onChange }) => {
  const handleAddMilestone = () => {
    const newMilestone: LoveStoryMilestone = {
      id: `story-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      title: 'Our Next Beautiful Chapter',
      date: 'Recent Memory',
      location: wedding.weddingCity || 'Mumbai, India',
      description: 'A special milestone along our path together that made us realize we were meant for each other.'
    };
    onChange({ loveStory: [...wedding.loveStory, newMilestone] });
  };

  const handleUpdate = (id: string, updates: Partial<LoveStoryMilestone>) => {
    const updated = wedding.loveStory.map(s => s.id === id ? { ...s, ...updates } : s);
    onChange({ loveStory: updated });
  };

  const handleDelete = (id: string) => {
    const updated = wedding.loveStory.filter(s => s.id !== id);
    onChange({ loveStory: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Our Journey & Milestones</h3>
          <p className="text-xs text-stone-500">
            Share how you met, special travels, and the proposal story.
          </p>
        </div>
        <button
          onClick={handleAddMilestone}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Chapter</span>
        </button>
      </div>

      <div className="space-y-4">
        {wedding.loveStory.map((milestone, idx) => (
          <div key={milestone.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Milestone 0{idx + 1}
              </span>
              <button
                onClick={() => handleDelete(milestone.id)}
                className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => handleUpdate(milestone.id, { title: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                  placeholder="e.g. The First Coffee Date"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Year / Date</label>
                <input
                  type="text"
                  value={milestone.date}
                  onChange={(e) => handleUpdate(milestone.id, { date: e.target.value })}
                  className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                  placeholder="e.g. October 2021"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Location</label>
              <input
                type="text"
                value={milestone.location}
                onChange={(e) => handleUpdate(milestone.id, { location: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="e.g. Blue Tokai Cafe, Mumbai"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Story Narrative</label>
              <textarea
                rows={2}
                value={milestone.description}
                onChange={(e) => handleUpdate(milestone.id, { description: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-white"
                placeholder="Describe that unforgettable moment..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
