import React from 'react';
import { 
  Share2, 
  Sparkles, 
  Code2, 
  Users, 
  Edit3, 
  Eye, 
  Palette, 
  ShieldCheck, 
  User as UserIcon, 
  LogIn,
  Layers,
  Home
} from 'lucide-react';
import { User } from '../../types/auth';

export type ActiveAppView = 'home' | 'editor' | 'guest-preview' | 'rsvp-dashboard' | 'code-export' | 'admin-portal';

interface NavbarProps {
  activeView: ActiveAppView;
  onSelectView: (view: ActiveAppView) => void;
  onOpenShare: () => void;
  onOpenTemplates: () => void;
  onOpenAuth: () => void;
  currentUser: User | null;
  guestCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenShare,
  onOpenTemplates,
  onOpenAuth,
  currentUser,
  guestCount
}) => {
  return (
    <header className="flex items-center justify-between gap-6 px-6 py-3.5 bg-[#FFFDF9] border-b border-[#E7E2DA] sticky top-0 z-50">
      
      {/* Zone 1: Single element brand wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onSelectView('home')}
          className="font-royal text-lg font-bold tracking-tight text-amber-950 whitespace-nowrap hover:opacity-90 transition-opacity text-left flex items-baseline gap-1.5"
        >
          <span>ShubhNimantran</span>
          <span className="text-xs text-amber-800/80 font-normal hidden sm:inline">शुभ निमंत्रण</span>
        </button>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-stone-600">
        <button
          onClick={() => onSelectView('home')}
          className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'home' ? 'text-amber-900 font-semibold' : ''
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onSelectView('editor')}
          className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'editor' ? 'text-amber-900 font-semibold' : ''
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Studio Editor</span>
        </button>

        <button
          onClick={() => onSelectView('guest-preview')}
          className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'guest-preview' ? 'text-amber-900 font-semibold' : ''
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Guest View</span>
        </button>

        <button
          onClick={onOpenTemplates}
          className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-amber-900"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>

        <button
          onClick={() => onSelectView('rsvp-dashboard')}
          className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'rsvp-dashboard' ? 'text-amber-900 font-semibold' : ''
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>RSVP Guestlist ({guestCount})</span>
        </button>

        <button
          onClick={() => onSelectView('code-export')}
          className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeView === 'code-export' ? 'text-amber-900 font-semibold' : ''
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Next.js Code</span>
        </button>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => onSelectView('admin-portal')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-rose-900 font-semibold ${
              activeView === 'admin-portal' ? 'underline' : ''
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
            <span>Admin Console</span>
          </button>
        )}
      </nav>

      {/* Zone 3: 1 Primary Action + User Auth Status */}
      <div className="flex items-center gap-2.5 shrink-0">
        
        {/* User Role & Login Switcher */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs text-stone-700 transition-colors"
          title="Account & Role Switcher"
        >
          {currentUser?.role === 'admin' ? (
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          ) : currentUser ? (
            <UserIcon className="w-3.5 h-3.5 text-rose-700" />
          ) : (
            <LogIn className="w-3.5 h-3.5 text-stone-500" />
          )}

          <span className="font-medium hidden sm:inline">
            {currentUser?.role === 'admin'
              ? 'Admin'
              : currentUser
              ? currentUser.name
              : 'Sign In'}
          </span>
        </button>

        {/* Primary CTA */}
        {activeView === 'home' ? (
          <button
            onClick={() => onSelectView('editor')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-rose-900 rounded-lg hover:bg-rose-800 transition-colors whitespace-nowrap shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Create Invitation</span>
          </button>
        ) : (
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-rose-900 rounded-lg hover:bg-rose-800 transition-colors whitespace-nowrap shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Invitation</span>
          </button>
        )}
      </div>
    </header>
  );
};
