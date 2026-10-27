import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Search, 
  Plus, 
  Trash2, 
  Share2, 
  Palette, 
  Settings, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WeddingData } from '../../types/wedding';
import { WEDDING_TEMPLATES } from '../../data/templatesData';

interface AdminPortalProps {
  currentWedding: WeddingData;
  onSwitchWedding: (weddingId: string) => void;
  onOpenEditor: () => void;
  onOpenPreview: () => void;
}

interface WeddingListItem {
  id: string;
  coupleNames: string;
  slug: string;
  city: string;
  date: string;
  theme: string;
  status: 'Published' | 'Draft';
  rsvpsCount: number;
  totalGuests: number;
  templateName: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentWedding,
  onSwitchWedding,
  onOpenEditor,
  onOpenPreview
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'suites' | 'templates' | 'analytics' | 'settings'>('suites');

  // Multi-suite database for Admin view
  const [suites, setSuites] = useState<WeddingListItem[]>([
    {
      id: 's1ze9iot',
      coupleNames: 'Aarav & Meera',
      slug: 'aarav-weds-meera',
      city: 'Jaipur, Rajasthan',
      date: 'Nov 28, 2026',
      theme: 'Jaipur Royal Crimson',
      status: 'Published',
      rsvpsCount: currentWedding.rsvps.length,
      totalGuests: currentWedding.rsvps.reduce((acc, r) => acc + (r.guestCount || 1), 0),
      templateName: 'Jaipur Royal Crimson & Gold'
    },
    {
      id: 'v2k89p1a',
      coupleNames: 'Kabir & Natasha',
      slug: 'kabir-weds-natasha',
      city: 'Udaipur, Rajasthan',
      date: 'Dec 14, 2026',
      theme: 'Udaipur Lake Emerald',
      status: 'Published',
      rsvpsCount: 28,
      totalGuests: 54,
      templateName: 'Udaipur Lake Emerald & Sage'
    },
    {
      id: 't9w34x1q',
      coupleNames: 'Rohan & Ananya',
      slug: 'rohan-weds-ananya',
      city: 'Goa Coastal Resort',
      date: 'Jan 08, 2027',
      theme: 'Champagne & Rose Gold',
      status: 'Published',
      rsvpsCount: 42,
      totalGuests: 86,
      templateName: 'Champagne & Rose Gold Modern'
    },
    {
      id: 'm7b41z8k',
      coupleNames: 'Siddharth & Devika',
      slug: 'siddharth-weds-devika',
      city: 'Chennai, Tamil Nadu',
      date: 'Feb 12, 2027',
      theme: 'Kanchipuram Temple Gold',
      status: 'Draft',
      rsvpsCount: 12,
      totalGuests: 22,
      templateName: 'Kanchipuram Temple Gold'
    }
  ]);

  const totalSuites = suites.length;
  const totalRsvps = suites.reduce((acc, s) => acc + s.rsvpsCount, 0);
  const totalGuests = suites.reduce((acc, s) => acc + s.totalGuests, 0);

  const filteredSuites = suites.filter(s =>
    s.coupleNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setSuites(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Published' ? 'Draft' : 'Published'
        };
      }
      return s;
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] text-stone-900 overflow-y-auto">
      {/* Admin Top Header */}
      <div className="bg-[#1C1917] text-white px-6 py-6 border-b border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-royal text-lg font-bold text-white tracking-wide">
                  ShubhNimantran Admin Console
                </h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Central management for digital wedding suites, templates catalogue, and RSVP analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEditor}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Open Active Suite ({currentWedding.brideName[0]}&{currentWedding.groomName[0]})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          {[
            { id: 'suites', label: 'Wedding Suites', count: totalSuites },
            { id: 'templates', label: 'Templates Catalogue', count: WEDDING_TEMPLATES.length },
            { id: 'analytics', label: 'Platform Metrics', count: null },
            { id: 'settings', label: 'Settings', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-rose-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="ml-1.5 font-mono text-[10px] opacity-80">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: ALL WEDDING SUITES */}
        {activeTab === 'suites' && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="text-xs text-stone-500">Active Wedding Suites</div>
                <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
                  {totalSuites}
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">3 Live / 1 Draft</div>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="text-xs text-stone-500">Total RSVPs Logged</div>
                <div className="font-mono text-2xl font-bold text-amber-800 mt-1 tabular-nums">
                  {totalRsvps}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">Across all celebrations</div>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="text-xs text-stone-500">Confirmed Guests</div>
                <div className="font-mono text-2xl font-bold text-rose-800 mt-1 tabular-nums">
                  {totalGuests}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">Attending ceremonies</div>
              </div>
              <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="text-xs text-stone-500">WhatsApp Shares</div>
                <div className="font-mono text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
                  342
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">Viral invite clicks</div>
              </div>
            </div>

            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by couple, city or ID..."
                  className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div className="text-xs text-stone-500">
                Current Active Editing Suite: <span className="font-semibold text-stone-900">{currentWedding.brideName} & {currentWedding.groomName}</span> (ID: <code className="font-mono">{currentWedding.id}</code>)
              </div>
            </div>

            {/* Suites Table */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                    <tr>
                      <th className="p-3">Suite ID & Couple</th>
                      <th className="p-3">Destination & Date</th>
                      <th className="p-3">Template</th>
                      <th className="p-3">RSVPs</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredSuites.map((suite) => {
                      const isCurrent = suite.id === currentWedding.id;
                      return (
                        <tr key={suite.id} className={`hover:bg-stone-50 transition-colors ${isCurrent ? 'bg-amber-50/40' : ''}`}>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-stone-900">{suite.coupleNames}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-200/80 text-amber-900 font-medium">
                                  Editing
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                              ID: {suite.id} · shubhnimantran.in/{suite.slug}
                            </div>
                          </td>
                          <td className="p-3 text-stone-600">
                            <div>{suite.city}</div>
                            <div className="text-[11px] text-stone-400">{suite.date}</div>
                          </td>
                          <td className="p-3 text-stone-700 font-medium">
                            {suite.templateName}
                          </td>
                          <td className="p-3 font-mono">
                            <span className="text-stone-900 font-semibold">{suite.rsvpsCount}</span>
                            <span className="text-stone-400 text-[11px]"> ({suite.totalGuests} guests)</span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleStatus(suite.id)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                                suite.status === 'Published'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-stone-100 text-stone-600 border border-stone-200'
                              }`}
                            >
                              {suite.status}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={onOpenPreview}
                                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                                title="View Public Guest Invitation"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={onOpenEditor}
                                className="p-1.5 rounded-lg bg-rose-900 text-white hover:bg-rose-800"
                                title="Edit & Manage Suite"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TEMPLATES CATALOGUE */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-stone-900">Platform Wedding Templates</h3>
                <p className="text-xs text-stone-500">
                  Manage signature templates available to couples on ShubhNimantran.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WEDDING_TEMPLATES.map((tpl) => (
                <div key={tpl.id} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                      {tpl.category}
                    </span>
                    {tpl.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-serif-luxury text-xl text-stone-900">{tpl.name}</h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {tpl.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.primary }} />
                    <div className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.accent }} />
                    <span className="text-[11px] text-stone-400 font-mono ml-auto">
                      Unveil: {tpl.envelopeStyle}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-medium">● Active in Catalogue</span>
                    <button
                      onClick={onOpenEditor}
                      className="text-rose-800 hover:text-rose-900 font-medium flex items-center gap-1"
                    >
                      <span>Preview in Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PLATFORM METRICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-stone-900">Platform Performance & RSVP Delivery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-500">Average RSVP Conversion</div>
                  <div className="font-mono text-3xl font-bold text-stone-900 mt-1">78.4%</div>
                  <div className="text-[11px] text-emerald-700 mt-1">↑ High engagement via WhatsApp links</div>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-500">Digital Shagun Transferred</div>
                  <div className="font-mono text-3xl font-bold text-amber-800 mt-1">₹4,28,000</div>
                  <div className="text-[11px] text-stone-500 mt-1">Via direct UPI peer-to-peer</div>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-500">Global Guest Views</div>
                  <div className="font-mono text-3xl font-bold text-rose-800 mt-1">14,892</div>
                  <div className="text-[11px] text-stone-500 mt-1">Across 18 countries (NRI friendly)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4 max-w-2xl">
            <h3 className="text-sm font-semibold text-stone-900">Platform System Settings</h3>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Platform Brand Name</label>
              <input
                type="text"
                readOnly
                value="ShubhNimantran"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Primary Subdomain Base</label>
              <input
                type="text"
                readOnly
                value="https://shubhnimantran.in"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Customer Support WhatsApp</label>
              <input
                type="text"
                readOnly
                value="+91 98200 12345"
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 font-mono"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
