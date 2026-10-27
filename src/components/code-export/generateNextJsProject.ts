import JSZip from 'jszip';
import { WeddingData } from '../../types/wedding';

export function getNextJsProjectFiles(wedding: WeddingData): Record<string, string> {
  const serializedWedding = JSON.stringify(wedding, null, 2);

  const packageJson = JSON.stringify({
    name: 'shubhnimantran-wedding-suite',
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      next: '^14.2.15',
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      'lucide-react': '^0.453.0',
      'canvas-confetti': '^1.9.3',
      'class-variance-authority': '^0.7.0',
      clsx: '^2.1.1',
      'tailwind-merge': '^2.5.4',
      'framer-motion': '^11.11.9'
    },
    devDependencies: {
      '@types/node': '^20.17.0',
      '@types/react': '^18.3.11',
      '@types/react-dom': '^18.3.0',
      '@types/canvas-confetti': '^1.9.0',
      postcss: '^8.4.47',
      tailwindcss: '^3.4.14',
      typescript: '^5.6.3'
    }
  }, null, 2);

  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'api.qrserver.com'],
  },
};

export default nextConfig;
`;

  const tsConfig = JSON.stringify({
    compilerOptions: {
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next"
        }
      ],
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2);

  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

  const gitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel
`;

  const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        royal: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        royal: {
          crimson: "#881337",
          gold: "#D97706",
          amber: "#F59E0B",
          sand: "#FAF8F5",
        }
      }
    },
  },
  plugins: [],
};
export default config;`;

  const appLayout = `import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "${wedding.brideName} & ${wedding.groomName} - Wedding Celebration",
  description: "${wedding.tagline}. Join us to celebrate our wedding in ${wedding.weddingCity}.",
  openGraph: {
    title: "${wedding.brideName} & ${wedding.groomName} - Wedding Invitation",
    description: "${wedding.welcomeNote}",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${cormorant.variable} \${cinzel.variable} \${jakarta.variable} font-sans bg-[#FAF8F5] text-[#1E1B18] antialiased\`}>
        {children}
      </body>
    </html>
  );
}`;

  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .font-royal {
    font-family: var(--font-cinzel), serif;
  }
  .font-serif-luxury {
    font-family: var(--font-cormorant), Georgia, serif;
  }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(180, 140, 100, 0.3);
  border-radius: 9999px;
}`;

  const defaultDataFile = `// Initial Wedding Data Configuration
export const INITIAL_WEDDING_DATA = ${serializedWedding};`;

  const pageTsx = `'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, MapPin, Clock, Heart, Sun, Music, Flame, Sparkles, Gift, Share2, CheckCircle2 } from 'lucide-react';
import { INITIAL_WEDDING_DATA } from '@/data/weddingData';

export default function WeddingPage() {
  const [wedding, setWedding] = useState(INITIAL_WEDDING_DATA);
  const [isOpened, setIsOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(2);
  const [rsvpDiet, setRsvpDiet] = useState('Vegetarian');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    const target = new Date(wedding.weddingDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingDate]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    confetti({ particleCount: 100, spread: 80 });
  };

  if (!isOpened) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2A050F] via-[#3E0A1A] to-[#1F0208] text-white">
        <div className="max-w-md w-full bg-[#3B0E1E] border border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-2 font-medium">
            Royal Wedding Invitation
          </div>
          <h1 className="font-serif-luxury text-4xl font-normal text-amber-100 mb-2">
            {wedding.brideName} <span className="block text-2xl font-light text-amber-400 italic my-1">&</span> {wedding.groomName}
          </h1>
          <p className="text-xs text-amber-200/70 mb-6 font-sans">
            {wedding.weddingCity}
          </p>
          <button
            onClick={handleOpenEnvelope}
            className="group relative inline-flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 via-rose-800 to-amber-950 border-2 border-amber-400 shadow-xl flex items-center justify-center font-royal text-base font-bold text-amber-200">
              {wedding.brideName[0]}&{wedding.groomName[0]}
            </div>
            <span className="mt-3 text-xs tracking-wider uppercase font-medium text-amber-300">
              Open Invitation
            </span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200 px-6 py-3 flex items-center justify-between text-xs">
        <span className="font-royal font-semibold text-rose-950 tracking-wide">
          {wedding.brideName} & {wedding.groomName}
        </span>
        <button
          onClick={() => setIsRsvpOpen(true)}
          className="px-4 py-1.5 bg-rose-900 text-white rounded-full font-medium hover:bg-rose-800 transition-colors shadow-sm"
        >
          RSVP Now
        </button>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-6 max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-3">
          ॥ शुभ विवाह ॥
        </div>
        <h1 className="font-serif-luxury text-5xl sm:text-6xl font-normal text-stone-900 mb-3">
          {wedding.brideName}
          <span className="block text-3xl italic text-amber-700 font-light my-1">&</span>
          {wedding.groomName}
        </h1>
        <p className="text-sm font-serif-luxury italic text-stone-600 mb-6">
          "{wedding.tagline}"
        </p>
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="text-center">
            <div className="font-mono text-xl font-bold">{timeLeft.days}</div>
            <div className="text-[10px] text-stone-500 uppercase">Days</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl font-bold">{timeLeft.hours}</div>
            <div className="text-[10px] text-stone-500 uppercase">Hours</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl font-bold">{timeLeft.minutes}</div>
            <div className="text-[10px] text-stone-500 uppercase">Mins</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl font-bold">{timeLeft.seconds}</div>
            <div className="text-[10px] text-stone-500 uppercase">Secs</div>
          </div>
        </div>
      </section>

      {/* Ceremonies */}
      <section className="py-12 px-6 max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Ceremonies</div>
          <h2 className="font-serif-luxury text-3xl font-normal">Auspicious Celebrations</h2>
        </div>
        {wedding.events.map((ev, idx) => (
          <div key={ev.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="text-xs text-amber-800 font-medium">Ceremony 0{idx + 1}</div>
            <h3 className="font-serif-luxury text-2xl font-normal text-stone-900">{ev.title}</h3>
            <p className="text-xs text-stone-500 italic mb-3">{ev.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-3">
              <div>📅 {ev.date} · ⏰ {ev.time}</div>
              <div>📍 {ev.venueName}, {ev.venueAddress}</div>
            </div>
            <div className="text-xs text-stone-500">Dress Code: <span className="text-stone-800 font-medium">{ev.dressCode}</span></div>
          </div>
        ))}
      </section>

      {/* RSVP Modal */}
      {isRsvpOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif-luxury text-2xl font-normal text-stone-900 mb-2">RSVP Received!</h3>
                <p className="text-xs text-stone-600 mb-4">We are thrilled to celebrate with you!</p>
                <button
                  onClick={() => setIsRsvpOpen(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <h3 className="font-serif-luxury text-2xl font-normal text-stone-900 text-center">RSVP Attendance</h3>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200"
                    placeholder="Guest Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200"
                    placeholder="+91..."
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(false)}
                    className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-900 text-white rounded-lg text-xs font-medium hover:bg-rose-800"
                  >
                    Submit RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}`;

  const readmeMd = `# ShubhNimantran Digital Wedding Invitation Suite

A luxury Next.js 14 App Router digital wedding website & invitation platform built with Tailwind CSS and Shadcn-inspired UI components.

## Deploying to Vercel (Zero Config)

1. Upload or push this folder to GitHub.
2. In Vercel, click **Add New > Project** and import the repository.
3. Vercel automatically detects Next.js 14. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: \`./\`
4. Click **Deploy**!

## Running Locally

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customizing Your Wedding
Edit \`data/weddingData.ts\` to update couple names, ceremony schedules, venues, and photos.
`;

  return {
    'package.json': packageJson,
    'next.config.mjs': nextConfig,
    'tsconfig.json': tsConfig,
    'postcss.config.mjs': postcssConfig,
    'tailwind.config.ts': tailwindConfig,
    '.gitignore': gitignore,
    'app/layout.tsx': appLayout,
    'app/globals.css': globalsCss,
    'app/page.tsx': pageTsx,
    'data/weddingData.ts': defaultDataFile,
    'README.md': readmeMd
  };
}

export async function downloadNextJsZip(wedding: WeddingData) {
  const files = getNextJsProjectFiles(wedding);
  const zip = new JSZip();

  // Store all files DIRECTLY at the root of the ZIP
  // This guarantees package.json is at './package.json' for instant Vercel zero-config deploy
  for (const [filePath, content] of Object.entries(files)) {
    zip.file(filePath, content);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `shubhnimantran-${wedding.slug}-nextjs.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
