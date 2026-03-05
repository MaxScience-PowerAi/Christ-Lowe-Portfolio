import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sun, Moon, MessageSquare, Users, LogOut, ShieldAlert, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
    view: string;
    setView: (view: any) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    lang: 'fr' | 'en';
    setLang: (lang: 'fr' | 'en') => void;
    isChatOpen: boolean;
    setIsChatOpen: (open: boolean) => void;
    scrollProgress: number;
    t: any;
}

export const Navbar = ({
    view, setView, theme, setTheme, lang, setLang,
    isChatOpen, setIsChatOpen, scrollProgress, t
}: NavbarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
                {/* Scroll progress bar */}
                <div
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-400 z-[60] transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />

                {/* Glassmorphism bar */}
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className={`glass-extreme dark:bg-black/60 rounded-[2rem] border transition-all duration-500 flex items-center justify-between px-6 h-14 ${scrollProgress > 5 ? 'border-cyan-500/30 bg-black/80 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-white/10'
                        }`}>
                        {/* Logo & Status */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => { setView('landing'); setMobileOpen(false); }}
                                className="flex items-center gap-3 group select-none"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                                    <Zap size={18} className="text-white relative z-10 drop-shadow-md" fill="currentColor" />
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                                </div>
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="text-lg font-black tracking-tighter text-white drop-shadow-md leading-none">PowerAi</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400/80">System Active</span>
                                    </div>
                                </div>
                            </button>
                        </div>

                        {/* Desktop controls */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* Lang Toggle */}
                            <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-1">
                                {(['fr', 'en'] as const).map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-cyan-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>

                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            >
                                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                            </button>

                            {/* AI Assistant Button */}
                            <button
                                onClick={() => setIsChatOpen(!isChatOpen)}
                                className={`flex items-center gap-2 px-5 h-9 rounded-full font-bold uppercase tracking-widest text-[9px] border transition-all duration-500 ${isChatOpen
                                    ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(192,132,252,0.5)]'
                                    : 'glass border-white/10 text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                                    }`}
                            >
                                <Sparkles className={isChatOpen ? 'animate-spin-slow' : 'animate-pulse'} size={14} />
                                <span>{t.header.aiAssistant}</span>
                            </button>

                            {view !== 'landing' && (
                                <button
                                    onClick={() => { setView('landing'); setMobileOpen(false); }}
                                    className="flex items-center gap-2 px-4 h-9 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white transition-all"
                                >
                                    <LogOut size={14} className="rotate-180" />
                                    {t.report.communityPortal.onboarding.back}
                                </button>
                            )}
                        </div>

                        {/* Mobile controls */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={() => setIsChatOpen(!isChatOpen)}
                                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-cyan-400"
                            >
                                <Sparkles size={16} />
                            </button>
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-zinc-400"
                            >
                                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white dark:bg-black border-b border-slate-200 dark:border-zinc-800 overflow-hidden"
                        >
                            <div className="px-4 py-4 flex flex-col gap-2">
                                {view === 'landing' ? (
                                    <>
                                        <button onClick={() => { setIsChatOpen(!isChatOpen); setMobileOpen(false); }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                                            <MessageSquare size={16} className="text-cyan-500" /> {t.header.aiAssistant}
                                        </button>
                                        <button onClick={() => { setView('members'); setMobileOpen(false); }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                                            <Users size={16} className="text-cyan-500" /> Membres
                                        </button>
                                        <button onClick={() => { setView('founders'); setMobileOpen(false); }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                                            <ShieldAlert size={16} className="text-cyan-500" /> Portail Fondateurs
                                        </button>
                                        <button onClick={() => { setView('community'); setMobileOpen(false); }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-600 text-sm font-bold text-white transition-colors">
                                            <Zap size={16} fill="currentColor" /> {t.report.solution.community.title}
                                        </button>
                                        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                                            🌐 {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => { setView('landing'); setMobileOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                                        <LogOut size={16} className="rotate-180 text-cyan-500" /> {t.report.communityPortal.onboarding.back}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};
