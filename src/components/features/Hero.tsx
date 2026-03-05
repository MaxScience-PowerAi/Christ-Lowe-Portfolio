import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, ArrowDown } from 'lucide-react';

interface HeroProps {
    t: any;
    onJoin?: () => void;
}

const COUNTER_STATS = [
    { value: '∞', label: 'Capacité de Génération' },
    { value: '< 1ms', label: 'Temps de Réponse' },
    { value: 'Maxime', label: 'Architecte Unique' },
    { value: 'V1.0', label: 'Noyau Actif' },
];

export const Hero = ({ t, onJoin }: HeroProps) => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-slate-50 dark:bg-deep-space">
            {/* Deep magical background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/10 to-transparent dark:from-purple-900/20 dark:via-black dark:to-black pointer-events-none" />

            {/* AI Core Visualization - Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none flex items-center justify-center">
                {/* Orbit Rings */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/10 dark:border-cyan-500/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-10 rounded-full border border-purple-500/10 dark:border-purple-500/20 animate-spin-reverse-slow" style={{ animationDuration: '40s' }} />

                {/* Glowing Core */}
                <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute w-[200px] h-[200px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[60px] animate-glow" />
                <div className="absolute w-[100px] h-[100px] bg-white/30 dark:bg-neon-blue/20 rounded-full blur-[40px] animate-float" />
            </div>

            {/* Subtle cyber grid */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(var(--color-brand-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-cyan) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    perspective: '1000px',
                    transform: 'rotateX(60deg) translateY(-100px) scale(2.5)',
                    transformOrigin: 'top center'
                }}
            />

            {/* Scroll progress indicator */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
                <div className="w-px h-16 bg-gradient-to-b from-transparent to-cyan-500/50" />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-400 -rotate-90 whitespace-nowrap drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {t.header.scrollInfo}
                </span>
                <div className="w-px h-16 bg-gradient-to-t from-transparent to-cyan-500/50" />
            </div>

            {/* Main content - Wrapped in glass for that premium magical feel */}
            <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center">

                {/* Tag badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full glass-extreme mb-12"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-800 dark:text-cyan-100">
                        {t.report.cover.tag} &nbsp;·&nbsp; {t.header.city}
                    </span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl sm:text-7xl md:text-[6.5rem] font-bold tracking-tighter leading-[0.9] mb-8"
                >
                    <span className="text-slate-800 dark:text-white drop-shadow-sm">{t.report.cover.title1}</span>
                    <br />
                    <span className="text-gradient-magic drop-shadow-[0_0_20px_rgba(192,132,252,0.3)]">{t.report.cover.title2}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-14 font-light leading-relaxed backdrop-blur-sm bg-white/10 dark:bg-black/20 p-4 rounded-2xl"
                >
                    {t.report.cover.desc}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-5 mb-20"
                >
                    <button
                        onClick={onJoin}
                        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 overflow-hidden border border-white/10"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                        <Sparkles size={16} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
                        <span className="relative z-10">{t.header.aiAssistant}</span>
                    </button>

                    <a
                        href="#constat"
                        className="group px-8 py-4 glass text-slate-700 dark:text-slate-300 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:-translate-y-1 flex items-center gap-2"
                    >
                        <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                        {t.header.presentation}
                    </a>
                </motion.div>

                {/* AI Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-px glass-extreme rounded-3xl overflow-hidden shadow-2xl"
                >
                    {COUNTER_STATS.map((stat, i) => (
                        <div key={i} className="bg-white/50 dark:bg-black/40 backdrop-blur-md px-6 py-6 flex flex-col items-center justify-center transition-colors hover:bg-white/60 dark:hover:bg-white/5">
                            <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tighter drop-shadow-sm">{stat.value}</p>
                            <p className="text-[9px] text-slate-500 dark:text-cyan-200/70 uppercase tracking-[0.25em] font-bold mt-2 text-center">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* subtle connection note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 2 }}
                    className="mt-8 flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold"
                >
                    <Cpu size={12} className="animate-pulse text-cyan-500" />
                    Connecté au Nexus Central
                </motion.div>

            </div>
        </section>
    );
};
