import React, { useState } from 'react';
import { Download, Users, Utensils, Home, Search, Plus, Trash2, Mail, Phone } from 'lucide-react';
import { WeddingData, RsvpEntry } from '../../types/wedding';

interface RsvpManagerTabProps {
  wedding: WeddingData;
  onChange: (updated: Partial<WeddingData>) => void;
}

export const RsvpManagerTab: React.FC<RsvpManagerTabProps> = ({ wedding, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvent, setFilterEvent] = useState('all');

  // Stats
  const totalRsvps = wedding.rsvps.length;
  const totalGuests = wedding.rsvps.reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const vegCount = wedding.rsvps.filter(r => r.dietaryPreference === 'Vegetarian').reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const jainCount = wedding.rsvps.filter(r => r.dietaryPreference === 'Jain').reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const nonVegCount = wedding.rsvps.filter(r => r.dietaryPreference === 'Non-Vegetarian').reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const accommodationNeeded = wedding.rsvps.filter(r => r.needsAccommodation).reduce((acc, r) => acc + (r.guestCount || 1), 0);

  // Filtered RSVPs
  const filteredRsvps = wedding.rsvps.filter(r => {
    const matchesSearch = r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.phone.includes(searchTerm) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === 'all' || r.attendingEvents.includes(filterEvent);
    return matchesSearch && matchesEvent;
  });

  const handleDelete = (id: string) => {
    onChange({ rsvps: wedding.rsvps.filter(r => r.id !== id) });
  };

  const handleExportCsv = () => {
    const headers = ['Guest Name', 'Phone', 'Email', 'Guests Count', 'Dietary Preference', 'Needs Accommodation', 'Attending Events', 'Message', 'RSVP Date'];
    const rows = wedding.rsvps.map(r => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      r.guestCount,
      r.dietaryPreference,
      r.needsAccommodation ? 'Yes' : 'No',
      `"${r.attendingEvents.join(', ')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${wedding.slug}-rsvps.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Guestlist & RSVP Analytics</h3>
          <p className="text-xs text-stone-500">
            Real-time tracking of confirmed guests, meals, and hotel stay requests.
          </p>
        </div>
        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-stone-200 rounded-xl">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Users className="w-3 h-3 text-amber-700" />
            <span>Total Attendees</span>
          </div>
          <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {totalGuests}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">{totalRsvps} groups responded</div>
        </div>

        <div className="p-3 bg-white border border-stone-200 rounded-xl">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Utensils className="w-3 h-3 text-emerald-700" />
            <span>Vegetarian</span>
          </div>
          <div className="font-mono text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
            {vegCount}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Pure veg catering</div>
        </div>

        <div className="p-3 bg-white border border-stone-200 rounded-xl">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Utensils className="w-3 h-3 text-amber-700" />
            <span>Strict Jain</span>
          </div>
          <div className="font-mono text-2xl font-bold text-amber-800 mt-1 tabular-nums">
            {jainCount}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">No root vegetables</div>
        </div>

        <div className="p-3 bg-white border border-stone-200 rounded-xl">
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <Home className="w-3 h-3 text-rose-700" />
            <span>Need Hotel / Stay</span>
          </div>
          <div className="font-mono text-2xl font-bold text-rose-800 mt-1 tabular-nums">
            {accommodationNeeded}
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">Rooms to reserve</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by guest name, phone, or email..."
            className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
          />
        </div>
        <select
          value={filterEvent}
          onChange={(e) => setFilterEvent(e.target.value)}
          className="text-xs p-2 bg-white rounded-lg border border-stone-200 focus:outline-none text-stone-700 w-full sm:w-auto"
        >
          <option value="all">All Ceremonies</option>
          {wedding.events.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title}</option>
          ))}
        </select>
      </div>

      {/* Guest Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
              <tr>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Guests</th>
                <th className="p-3">Diet</th>
                <th className="p-3">Stay</th>
                <th className="p-3">Ceremonies</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-stone-400">
                    No RSVPs match your search.
                  </td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-3">
                      <div className="font-medium text-stone-900">{rsvp.guestName}</div>
                      {rsvp.message && (
                        <div className="text-[11px] text-stone-500 italic mt-0.5 truncate max-w-xs">
                          "{rsvp.message}"
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-stone-600">
                      <div>{rsvp.phone}</div>
                      <div className="text-[11px] text-stone-400">{rsvp.email}</div>
                    </td>
                    <td className="p-3 font-mono font-medium text-stone-900">
                      {rsvp.guestCount}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        rsvp.dietaryPreference === 'Vegetarian' ? 'bg-emerald-50 text-emerald-800' :
                        rsvp.dietaryPreference === 'Jain' ? 'bg-amber-50 text-amber-800' :
                        'bg-stone-100 text-stone-800'
                      }`}>
                        {rsvp.dietaryPreference}
                      </span>
                    </td>
                    <td className="p-3 text-stone-700">
                      {rsvp.needsAccommodation ? (
                        <span className="text-rose-700 font-medium">Yes</span>
                      ) : (
                        <span className="text-stone-400">No</span>
                      )}
                    </td>
                    <td className="p-3 text-stone-600 font-mono text-[11px]">
                      {rsvp.attendingEvents.length} events
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        className="p-1 rounded text-stone-400 hover:text-rose-700 transition-colors"
                        title="Delete RSVP"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
