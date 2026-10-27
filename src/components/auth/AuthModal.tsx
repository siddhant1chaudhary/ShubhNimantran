import React, { useState } from 'react';
import { X, ShieldCheck, Heart, User as UserIcon, Lock, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { User, DEMO_COUPLE_USER, DEMO_ADMIN_USER } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [loginRole, setLoginRole] = useState<'couple' | 'admin'>('couple');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMsg('Please enter your email or mobile number.');
      return;
    }

    if (loginRole === 'admin') {
      const adminUser: User = {
        id: `usr-admin-${Date.now()}`,
        name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Administrator',
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@shubhnimantran.in`,
        role: 'admin'
      };
      onLogin(adminUser);
      onClose();
    } else {
      const coupleUser: User = {
        id: `usr-couple-${Date.now()}`,
        name: 'Aarav & Meera',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'couple@shubhnimantran.in',
        phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98201 44520',
        role: 'couple',
        weddingId: 's1ze9iot'
      };
      onLogin(coupleUser);
      onClose();
    }
  };

  const handleDemoCoupleLogin = () => {
    onLogin(DEMO_COUPLE_USER);
    onClose();
  };

  const handleDemoAdminLogin = () => {
    onLogin(DEMO_ADMIN_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* CURRENTLY LOGGED IN VIEW */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-800">
              {currentUser.role === 'admin' ? (
                <ShieldCheck className="w-7 h-7 text-amber-700" />
              ) : (
                <Heart className="w-7 h-7 text-rose-700" />
              )}
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
                {currentUser.role === 'admin' ? 'Super Administrator' : 'Couple Account'}
              </div>
              <h3 className="font-serif-luxury text-2xl text-stone-900 mt-0.5">
                {currentUser.name}
              </h3>
              <p className="text-xs text-stone-500 font-mono mt-1">
                {currentUser.email}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onLogout();
                }}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Continue to Platform
              </button>
            </div>
          </div>
        ) : (
          /* LOGIN FORM */
          <div>
            <div className="text-center mb-5">
              <div className="font-royal text-xl font-bold text-amber-950">
                ShubhNimantran
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Sign in to manage your luxury wedding invitation suite or access platform administration.
              </p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl mb-4 text-xs font-medium">
              <button
                onClick={() => setLoginRole('couple')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  loginRole === 'couple'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-700" />
                <span>Couple Sign In</span>
              </button>
              <button
                onClick={() => setLoginRole('admin')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  loginRole === 'admin'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin Portal</span>
              </button>
            </div>

            {/* Quick 1-Click Demo Buttons */}
            <div className="mb-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <div className="text-[11px] font-semibold text-amber-900 mb-2">
                Instant One-Click Demo Access
              </div>
              {loginRole === 'couple' ? (
                <button
                  type="button"
                  onClick={handleDemoCoupleLogin}
                  className="w-full py-2 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Demo Login: Aarav & Meera (Couple)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Demo Login: Platform Super Admin</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 my-3 text-stone-400 text-[11px]">
              <div className="h-[1px] flex-1 bg-stone-200" />
              <span>or sign in with credentials</span>
              <div className="h-[1px] flex-1 bg-stone-200" />
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleCustomLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {loginRole === 'couple' ? 'Registered Email or Mobile Number' : 'Admin Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={loginRole === 'couple' ? 'aarav.meera@shubhnimantran.in' : 'admin@shubhnimantran.in'}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Sign In as {loginRole === 'couple' ? 'Couple' : 'Administrator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
