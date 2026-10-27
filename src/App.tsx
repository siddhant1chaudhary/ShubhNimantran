/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  Calendar, 
  Palette, 
  Image as ImageIcon, 
  Gift, 
  MessageSquare, 
  Code2, 
  Eye, 
  Layers,
  Sparkles,
  Share2,
  ShieldCheck,
  Home
} from 'lucide-react';
import { DEFAULT_WEDDING_DATA } from './data/defaultWedding';
import { WeddingData, RsvpEntry, BlessingEntry } from './types/wedding';
import { User, DEMO_COUPLE_USER, DEMO_ADMIN_USER } from './types/auth';
import { WeddingTemplate } from './data/templatesData';
import { Navbar, ActiveAppView } from './components/layout/Navbar';
import { HomePage } from './components/home/HomePage';
import { DeviceFrame } from './components/preview/DeviceFrame';
import { GuestInvitationView } from './components/preview/GuestInvitationView';
import { CoupleTab } from './components/editor/CoupleTab';
import { CeremoniesTab } from './components/editor/CeremoniesTab';
import { StoryTab } from './components/editor/StoryTab';
import { GalleryTab } from './components/editor/GalleryTab';
import { ThemeTab } from './components/editor/ThemeTab';
import { ShagunTab } from './components/editor/ShagunTab';
import { BlessingsTab } from './components/editor/BlessingsTab';
import { RsvpManagerTab } from './components/editor/RsvpManagerTab';
import { CodeExportStudio } from './components/code-export/CodeExportStudio';
import { AdminPortal } from './components/admin/AdminPortal';
import { TemplateGalleryModal } from './components/templates/TemplateGalleryModal';
import { AuthModal } from './components/auth/AuthModal';
import { ShareModal } from './components/share/ShareModal';

export default function App() {
  // Read URL query params on load (e.g. ?id=s1ze9iot&admin=false or &admin=true)
  const getInitialRouteState = (): { isAdmin: boolean; isEditor: boolean } => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isAdmin = params.get('admin') === 'true';
      const hasId = params.has('id');
      const isCreatePath = window.location.pathname.includes('/create');
      return { isAdmin, isEditor: hasId || isCreatePath };
    } catch {
      return { isAdmin: false, isEditor: false };
    }
  };

  const initialRoute = getInitialRouteState();

  const [wedding, setWedding] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('shubhnimantran_wedding_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_WEDDING_DATA;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (initialRoute.isAdmin) return DEMO_ADMIN_USER;
    if (initialRoute.isEditor) return DEMO_COUPLE_USER;
    return DEMO_COUPLE_USER;
  });

  const [activeView, setActiveView] = useState<ActiveAppView>(() => {
    if (initialRoute.isAdmin) return 'admin-portal';
    if (initialRoute.isEditor) return 'editor';
    return 'home';
  });

  const [activeEditorTab, setActiveEditorTab] = useState<'couple' | 'ceremonies' | 'story' | 'gallery' | 'theme' | 'shagun' | 'blessings'>('couple');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shubhnimantran_wedding_data', JSON.stringify(wedding));
    } catch {
      // Ignore
    }
  }, [wedding]);

  // Sync URL search params
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (activeView === 'home') {
        params.delete('id');
        params.delete('admin');
      } else {
        params.set('id', wedding.id);
        params.set('admin', currentUser?.role === 'admin' ? 'true' : 'false');
      }
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${window.location.pathname}${queryStr}`;
      window.history.replaceState({}, '', newUrl);
    } catch {
      // Ignore
    }
  }, [activeView, currentUser?.role, wedding.id]);

  const handleUpdateWedding = (updated: Partial<WeddingData>) => {
    setWedding(prev => ({ ...prev, ...updated }));
  };

  const handleApplyTemplate = (tpl: WeddingTemplate) => {
    handleUpdateWedding({
      theme: tpl.theme,
      envelopeStyle: tpl.envelopeStyle,
      musicTrack: tpl.musicTrack
    });
  };

  const handleAddRsvp = (rsvpData: {
    guestName: string;
    phone: string;
    email: string;
    attendingEvents: string[];
    guestCount: number;
    dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan';
    needsAccommodation: boolean;
    message?: string;
  }) => {
    const newEntry: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      ...rsvpData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setWedding(prev => ({
      ...prev,
      rsvps: [newEntry, ...prev.rsvps]
    }));
  };

  const handleAddBlessing = (blessingData: { authorName: string; relationship: string; message: string }) => {
    const newEntry: BlessingEntry = {
      id: `blessing-${Date.now()}`,
      ...blessingData,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1
    };

    setWedding(prev => ({
      ...prev,
      blessings: [newEntry, ...prev.blessings]
    }));
  };

  const handleLikeBlessing = (id: string) => {
    setWedding(prev => ({
      ...prev,
      blessings: prev.blessings.map(b => b.id === id ? { ...b, likes: b.likes + 1 } : b)
    }));
  };

  const handleUserLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveView('admin-portal');
    } else {
      setActiveView('editor');
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const editorTabs = [
    { id: 'couple', label: 'Couple & Date', icon: Heart },
    { id: 'ceremonies', label: 'Ceremonies', icon: Calendar },
    { id: 'story', label: 'Love Story', icon: Sparkles },
    { id: 'gallery', label: 'Moments Gallery', icon: ImageIcon },
    { id: 'theme', label: 'Design & Templates', icon: Palette },
    { id: 'shagun', label: 'Digital Shagun', icon: Gift },
    { id: 'blessings', label: 'Blessings Wall', icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
      {/* Top Bar Navigation */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        guestCount={wedding.rsvps.reduce((acc, r) => acc + (r.guestCount || 1), 0)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* VIEW 0: HOME PAGE (High-fidelity landing page with NO form fields) */}
        {activeView === 'home' && (
          <div className="flex-1 overflow-y-auto">
            <HomePage
              onStartCreating={() => setActiveView('editor')}
              onViewLiveDemo={() => setActiveView('guest-preview')}
              onSelectTemplate={(tpl) => {
                handleApplyTemplate(tpl);
                setActiveView('editor');
              }}
              onViewCode={() => setActiveView('code-export')}
              onOpenSignIn={() => setIsAuthOpen(true)}
            />
          </div>
        )}

        {/* VIEW 1: SPLIT STUDIO EDITOR + LIVE DEVICE PREVIEW */}
        {activeView === 'editor' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left: Editor Controls Panel */}
            <div className="w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-[#E7E2DA] flex flex-col shrink-0 overflow-hidden">
              
              {/* Editor Tabs Navigation */}
              <div className="px-4 py-2 border-b border-[#E7E2DA] bg-[#FAF8F5] overflow-x-auto shrink-0 flex items-center gap-1">
                {editorTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeEditorTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEditorTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-rose-900 text-white font-medium shadow-sm'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Form Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {activeEditorTab === 'couple' && (
                  <CoupleTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
                {activeEditorTab === 'ceremonies' && (
                  <CeremoniesTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
                {activeEditorTab === 'story' && (
                  <StoryTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
                {activeEditorTab === 'gallery' && (
                  <GalleryTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
                {activeEditorTab === 'theme' && (
                  <ThemeTab 
                    wedding={wedding} 
                    onChange={handleUpdateWedding} 
                    onOpenTemplates={() => setIsTemplatesOpen(true)}
                  />
                )}
                {activeEditorTab === 'shagun' && (
                  <ShagunTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
                {activeEditorTab === 'blessings' && (
                  <BlessingsTab wedding={wedding} onChange={handleUpdateWedding} />
                )}
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="p-3 bg-[#FAF8F5] border-t border-[#E7E2DA] flex items-center justify-between text-xs">
                <button
                  onClick={() => setIsTemplatesOpen(true)}
                  className="flex items-center gap-1 text-amber-900 hover:text-amber-950 font-medium"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span>Choose Template</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('code-export')}
                    className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-900 border border-amber-300 rounded-lg font-medium hover:bg-amber-500/20 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Get Next.js Code</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Responsive Preview Device Frame */}
            <div className="flex-1 overflow-hidden">
              <DeviceFrame onOpenQrShare={() => setIsShareOpen(true)}>
                <GuestInvitationView
                  wedding={wedding}
                  onAddRsvp={handleAddRsvp}
                  onAddBlessing={handleAddBlessing}
                  onLikeBlessing={handleLikeBlessing}
                  isIframeOrMobile={true}
                />
              </DeviceFrame>
            </div>
          </div>
        )}

        {/* VIEW 2: FULLSCREEN LIVE GUEST INVITATION */}
        {activeView === 'guest-preview' && (
          <div className="flex-1 overflow-y-auto">
            <GuestInvitationView
              wedding={wedding}
              onAddRsvp={handleAddRsvp}
              onAddBlessing={handleAddBlessing}
              onLikeBlessing={handleLikeBlessing}
              isIframeOrMobile={false}
            />
          </div>
        )}

        {/* VIEW 3: FULLSCREEN RSVP & GUESTLIST DASHBOARD */}
        {activeView === 'rsvp-dashboard' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full">
            <RsvpManagerTab wedding={wedding} onChange={handleUpdateWedding} />
          </div>
        )}

        {/* VIEW 4: NEXT.JS CODE EXPORT STUDIO */}
        {activeView === 'code-export' && (
          <div className="flex-1 overflow-hidden">
            <CodeExportStudio wedding={wedding} />
          </div>
        )}

        {/* VIEW 5: ADMIN PORTAL */}
        {activeView === 'admin-portal' && (
          <AdminPortal
            currentWedding={wedding}
            onSwitchWedding={(id) => {
              // active suite
            }}
            onOpenEditor={() => setActiveView('editor')}
            onOpenPreview={() => setActiveView('guest-preview')}
          />
        )}

      </main>

      {/* Template Selector Modal */}
      <TemplateGalleryModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        currentTemplateTheme={wedding.theme}
        onSelectTemplate={handleApplyTemplate}
      />

      {/* User Login & Role Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleUserLogin}
        onLogout={handleUserLogout}
      />

      {/* Share / WhatsApp & QR Modal */}
      <ShareModal
        wedding={wedding}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
