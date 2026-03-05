import React, { useState, useEffect, Suspense } from 'react';
import { translations } from './translations';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/features/Hero';
import { Constat } from './components/features/Constat';
import { Solution } from './components/features/Solution';
import { Founders } from './components/features/Founders';
import { Mission } from './components/features/Mission';
import { Vision } from './components/features/Vision';
import { Roadmap } from './components/features/Roadmap';
import { NeedsAndRisks } from './components/features/NeedsAndRisks';
import { CTA } from './components/features/CTA';
import { AIChatPanel } from './components/features/AIChatPanel';

// Late-loaded for performance
const CommunityPortal = React.lazy(() =>
  import('./components/features/CommunityPortal').then(m => ({ default: m.CommunityPortal }))
);
const FoundersPortal = React.lazy(() =>
  import('./components/features/FoundersPortal').then(m => ({ default: m.FoundersPortal }))
);

type View = 'landing' | 'community' | 'founders' | 'members';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('powerai_theme') as any) || 'dark'
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('powerai_theme', theme);
  }, [theme]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[lang];

  const LoadingScreen = () => (
    <div className="h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black animate-pulse-slow" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-orbit">
          <span className="text-white font-black text-4xl drop-shadow-lg">P</span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full animate-[shine_2s_infinite]" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-cyan-400 uppercase tracking-[0.5em] font-black animate-pulse">Initialisation du Système</p>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)] animate-[loading_2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-zinc-200 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        view={view} setView={setView}
        theme={theme} setTheme={setTheme}
        lang={lang} setLang={setLang}
        isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}
        scrollProgress={scrollProgress} t={t}
      />

      {/* Main content */}
      <main>
        {view === 'landing' && (
          <>
            <Hero t={t} onJoin={() => setView('community')} />
            <div id="constat">
              <Constat t={t} />
            </div>
            <Solution t={t} setView={setView} />
            <Founders t={t} />
            <Mission t={t} />
            <Vision t={t} />
            <Roadmap t={t} />
            <NeedsAndRisks t={t} />
            <CTA t={t} />
          </>
        )}

        <Suspense fallback={<LoadingScreen />}>
          {view === 'community' && (
            <CommunityPortal lang={lang} t={t} onBack={() => setView('landing')} />
          )}
          {(view === 'founders' || view === 'members') && (
            <FoundersPortal
              t={t} lang={lang} onBack={() => setView('landing')} theme={theme}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">P</span>
            </div>
            <span className="font-bold text-slate-400 dark:text-zinc-600 text-sm">PowerAi</span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-700 font-bold uppercase tracking-[0.25em]">
            © 2026 PowerAi · Douala, Cameroun · Tous droits réservés
          </p>
          <div className="flex gap-4 text-[10px] text-slate-400 dark:text-zinc-700 font-bold uppercase tracking-widest">
            <button onClick={() => setView('community')} className="hover:text-cyan-500 transition-colors">Rejoindre</button>
            <span>·</span>
            <button onClick={() => setView('founders')} className="hover:text-cyan-500 transition-colors">Fondateurs</button>
          </div>
        </div>
      </footer>

      {/* Floating AI Chat */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        lang={lang}
        t={t}
      />
    </div>
  );
}
