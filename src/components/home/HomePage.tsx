import React from 'react';
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  QrCode, 
  Gift, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  Code2, 
  Music, 
  Star,
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';
import { WeddingData } from '../../types/wedding';
import { WEDDING_TEMPLATES, WeddingTemplate } from '../../data/templatesData';
import { MandalaMotif, OrnamentalDivider, GaneshIcon } from '../common/MandalaMotif';

interface HomePageProps {
  onStartCreating: () => void;
  onViewLiveDemo: () => void;
  onSelectTemplate: (template: WeddingTemplate) => void;
  onViewCode: () => void;
  onOpenSignIn: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCreating,
  onViewLiveDemo,
  onSelectTemplate,
  onViewCode,
  onOpenSignIn
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FAF8F5] border-b border-[#E7E2DA]">
        {/* Subtle background mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <MandalaMotif size={700} color="#D97706" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Digital Wedding Invitation Suite for Modern Celebrations</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-stone-900 leading-[1.1] mb-5 tracking-tight">
            Your story, <br className="hidden sm:inline" />
            <span className="italic font-light text-rose-950">beautifully invited.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Breathtaking, automated wedding websites for modern couples — from interactive royal wax-seal reveals and multi-day ceremony timelines to instant WhatsApp sharing and live RSVP management.
          </p>

          {/* Action CTAs (No form, purely direct buttons) */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-12">
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-7 py-3.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-rose-950/20 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Begin My Story — Create Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewLiveDemo}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-700" />
              <span>Explore Live Guest Invitation</span>
            </button>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-500 border-t border-stone-200/60 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-stone-900">4.9/5</span>
              <span>Rating</span>
            </div>
            <div className="text-stone-300">·</div>
            <div>
              <span className="font-semibold text-stone-900">500+</span> Couples Celebrating
            </div>
            <div className="text-stone-300">·</div>
            <div>
              <span className="font-semibold text-stone-900">18</span> Countries Worldwide
            </div>
          </div>

          {/* Hero Mockup Showcase */}
          <div className="mt-14 w-full max-w-4xl relative">
            <div className="relative mx-auto rounded-3xl bg-[#FAF8F5] border-8 border-stone-900 shadow-2xl p-4 sm:p-6 overflow-hidden max-w-md sm:max-w-lg">
              
              {/* Dynamic Island Header */}
              <div className="w-28 h-4 bg-stone-900 rounded-full mx-auto mb-4" />

              {/* Invitation Preview Card Mock */}
              <div className="bg-[#3B0E1E] text-white rounded-2xl p-6 border border-amber-500/30 text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-950/40 flex items-center justify-center mx-auto mb-3">
                  <GaneshIcon size={28} color="#F59E0B" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-medium mb-1">
                  ॥ शुभ विवाह ॥
                </div>
                <div className="font-serif-luxury text-3xl font-light text-amber-100 mb-1">
                  Aarav & Meera
                </div>
                <div className="text-[11px] text-amber-200/70 mb-4 font-sans">
                  The Oberoi Rajvilas · Jaipur, Rajasthan
                </div>
                
                {/* Wax seal simulation */}
                <div 
                  onClick={onViewLiveDemo}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 via-rose-800 to-amber-950 border-2 border-amber-400 mx-auto flex items-center justify-center font-royal font-bold text-amber-200 cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  A&M
                </div>
                <div className="mt-3 text-[10px] text-amber-300/80 uppercase tracking-wider">
                  Tap to unveil ceremonies & RSVP
                </div>
              </div>

              {/* Subdomain pill */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[11px]">aarav-weds-meera.shubhnimantran.in</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE COLLECTION: SIGNATURE TEMPLATES */}
      <section id="designs" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            Curated Suites
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-stone-900">
            The Signature Collection
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto mt-2">
            Each bespoke suite is designed around authentic regional rituals, royal palettes, and modern digital interactivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEDDING_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-[#E7E2DA] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Card Banner Preview */}
              <div
                className="h-44 p-5 flex flex-col justify-between text-white relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(135deg, ${tpl.colors.primary} 0%, #171412 100%)`
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-royal text-[11px] tracking-wider uppercase opacity-90">
                    {tpl.category}
                  </span>
                  {tpl.isPopular && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-semibold text-[9px]">
                      Most Popular
                    </span>
                  )}
                  {tpl.isNew && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-stone-950 font-semibold text-[9px]">
                      New Release
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[11px] text-amber-300 font-medium">॥ शुभ निमंत्रण ॥</div>
                  <div className="font-serif-luxury text-2xl font-light text-amber-100 mt-0.5">
                    {tpl.name}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {tpl.description}
                  </p>
                  <div className="mt-3 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                    <span className="font-medium text-amber-900">Ideal For: </span>
                    {tpl.idealFor}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.primary }} />
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: tpl.colors.accent }} />
                  </div>

                  <button
                    onClick={() => {
                      onSelectTemplate(tpl);
                      onStartCreating();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>Use Design</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MULTI-DAY CEREMONIES SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#FAF8F5] border-y border-[#E7E2DA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Indian Celebrations
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-stone-900">
              Built Specifically for Multi-Day Weddings
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mt-2">
              Unlike generic single-day templates, ShubhNimantran structures every ritual with individual timings, maps, and dress codes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Haldi & Phoolon Ki Holi',
                timing: 'Morning Ritual',
                attire: 'Ochre Yellow & Florals',
                desc: 'Auspicious turmeric ceremonies, marigold flower showers, and folk dhol music.'
              },
              {
                title: 'Mehendi & Sangeet',
                timing: 'Evening Celebration',
                attire: 'Indo-Western & Sequins',
                desc: 'Intricate henna artwork, choreographed family dances, cocktail bars, and midnight beats.'
              },
              {
                title: 'Shubh Vivah & Pheras',
                timing: 'Auspicious Muhurat',
                attire: 'Royal Sherwanis & Lehengas',
                desc: 'Sacred Vedic seven vows under the star-lit royal mandap in the presence of Agni.'
              },
              {
                title: 'Grand Gala Reception',
                timing: 'Evening Banquet',
                attire: 'Black Tie or Formal Regalia',
                desc: 'Gourmet banquet dinner, live musical symphony, family toasts, and celebration speeches.'
              }
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[#E7E2DA] rounded-2xl p-5 shadow-sm space-y-2">
                <div className="text-[11px] font-semibold text-amber-800 font-mono">
                  Ceremony 0{i + 1}
                </div>
                <h3 className="font-serif-luxury text-xl text-stone-900 font-medium">
                  {c.title}
                </h3>
                <div className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-700" />
                  <span>{c.timing}</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">Attire: </span>{c.attire}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            Modern Convenience
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-stone-900">
            Everything You Need For Your Celebration
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto mt-2">
            Eliminate print delays, last-minute venue update confusion, and unorganized RSVP sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">Live RSVP & Meal Tracking</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Track attendance per individual ceremony, plus-ones, dietary requirements (Pure Vegetarian, Jain, Vegan, Non-Veg), and hotel stay requirements with instant CSV export.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">WhatsApp-First Sharing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Share beautiful card previews on WhatsApp, iMessage, and Instagram with your couple photo, venue pin, and countdown timer automatically generated.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">Digital Shagun & UPI Registry</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Guests can scan your personalized QR code directly in GPay, PhonePe, or Paytm to send auspicious digital shagun blessings securely to your account.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">Tactile Wax Seal Entrance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Surprise your guests with an interactive royal wax seal or scratch-reveal opening experience that mimics luxury handmade Italian cardstock.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">Romantic Ambient Ragas</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Harmonious bansuri flute, shehnai, and classical tanpura ambient tones that welcome guests into a serene celebration mood.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E2DA] rounded-2xl shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-2xl text-stone-900">Next.js 14 Code Export</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Complete open-source Next.js App Router codebase included. Download a full ZIP with Tailwind CSS and Shadcn UI components for free.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS IN 3 STEPS */}
      <section id="how-it-works" className="py-20 px-6 bg-white border-y border-[#E7E2DA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Effortless Workflow
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-stone-900">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mt-2">
              Launch your wedding invitation suite in less than ten minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="space-y-3 text-center sm:text-left">
              <div className="font-mono text-3xl font-bold text-amber-800/80">01.</div>
              <h3 className="font-serif-luxury text-2xl text-stone-900">Choose Your Design</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Select from our curated collection of royal palace, temple heritage, or modern minimalist suites.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="font-mono text-3xl font-bold text-amber-800/80">02.</div>
              <h3 className="font-serif-luxury text-2xl text-stone-900">Personalize Details</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Add your multi-day ceremonies, venue maps, love story milestones, and couple photos in our live editor.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="font-mono text-3xl font-bold text-amber-800/80">03.</div>
              <h3 className="font-serif-luxury text-2xl text-stone-900">Share & Track RSVPs</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send your custom link via WhatsApp or print matching QR codes on your physical cards to gather responses instantly.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={onStartCreating}
              className="px-8 py-3.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Start Building Your Wedding Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#2A050F] via-[#3E0A1A] to-[#1F0208] text-white text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-950/40 flex items-center justify-center mx-auto text-amber-400">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-amber-100 leading-tight">
            Celebrate your sacred union with timeless elegance.
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed max-w-lg mx-auto font-sans">
            Join hundreds of modern couples celebrating with ShubhNimantran. Beautiful invitation links, zero paper waste, and complete Next.js source code.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartCreating}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xl shadow-rose-950/60"
            >
              Create Free Wedding Invitation
            </button>
            <button
              onClick={onViewCode}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs sm:text-sm font-medium transition-colors"
            >
              Download Next.js Source Code
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-[#FAF8F5] border-t border-[#E7E2DA] text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-royal font-bold text-stone-900 text-base">ShubhNimantran</span>
            <span className="text-stone-400">·</span>
            <span>शुभ निमंत्रण</span>
          </div>

          <div className="flex items-center gap-6 text-stone-600">
            <button onClick={onStartCreating} className="hover:text-stone-900">Studio Editor</button>
            <button onClick={onViewLiveDemo} className="hover:text-stone-900">Demo Invitation</button>
            <button onClick={onViewCode} className="hover:text-stone-900">Next.js Codebase</button>
            <button onClick={onOpenSignIn} className="hover:text-stone-900">Sign In</button>
          </div>

          <div className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} ShubhNimantran. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};
