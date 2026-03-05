import React from 'react';
import {
    Users, Settings, TrendingUp, Code2, Server, BarChart2,
    Palette, Shield, Quote, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

const MEMBER_COLORS = [
    { gradient: 'from-cyan-500 to-purple-600', glow: 'bg-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-300', border: 'group-hover:border-cyan-500/50' },
];

const MEMBER_ICONS = [Sparkles];
const MEMBER_KEYS = ['maxime'] as const;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

export const Founders = ({ t }: { t: any }) => {
    const ft = t.report.founders;

    return (
        <Section dark id="founders" className="relative pb-24 dark:bg-black overflow-hidden">
            {/* Dark glowing backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-cyan-500/30 bg-cyan-500/10 mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                    <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                        1 Architecte · Le Créateur
                    </span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4 drop-shadow-md"
                >
                    {ft.title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto text-slate-500 dark:text-zinc-400 text-base leading-relaxed"
                >
                    {ft.teamDesc}
                </motion.p>
            </div>

            {/* 1-member showcase pane */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex justify-center mb-16 px-4"
            >
                {MEMBER_KEYS.map((key, i) => {
                    const member = ft[key];
                    const color = MEMBER_COLORS[i];
                    const Icon = MEMBER_ICONS[i];
                    if (!member) return null;

                    return (
                        <motion.div
                            key={key}
                            variants={cardVariants}
                            className={`group relative glass-extreme dark:bg-black/40 border border-cyan-500/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 max-w-4xl w-full transition-all duration-700 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)] ${color.border} overflow-hidden backdrop-blur-3xl`}
                        >
                            {/* Dramatic glow */}
                            <div className={`absolute -top-32 -right-32 w-96 h-96 ${color.glow} rounded-full blur-[100px] opacity-30 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow`} />

                            {/* Left side: visual identity */}
                            <div className="flex flex-col items-center justify-center md:w-1/3 pt-4 pb-4 md:pb-0">
                                <div className="relative mb-6 sm:mb-8 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-72 rounded-full md:rounded-[2rem] shadow-2xl overflow-hidden border-2 border-cyan-500/30 group">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} blur-[30px] opacity-20 animate-pulse-slow`} />

                                    <img
                                        src="/maxime.jpg"
                                        alt={member.name}
                                        className="absolute inset-0 w-full h-full object-cover object-top z-10 transition-transform duration-1000 group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://ui-avatars.com/api/?name=ML&background=0D8ABC&color=fff&size=400";
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none" />
                                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-20 pointer-events-none" />

                                    <span className="absolute bottom-4 right-6 text-[11px] font-bold tracking-widest text-white/90 z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/10">DEV</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 text-center drop-shadow-md">{member.name}</h3>
                                <p className={`text-xs font-bold uppercase tracking-[0.2em] text-center bg-clip-text text-transparent bg-gradient-to-r ${color.gradient} drop-shadow-sm`}>{member.role}</p>
                            </div>

                            {/* Right side: Information */}
                            <div className="flex-1 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                                <span className={`inline-flex w-fit px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]`}>
                                    {member.tag}
                                </span>

                                <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-8 font-light italic px-2 sm:px-0">
                                    "{member.bio}"
                                </p>

                                <div className="space-y-4">
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Ses Contributions au Noyau</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {member.brings.map((item: string, j: number) => (
                                            <div key={j} className="flex items-start gap-3 text-sm text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">
                                                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${color.text} shadow-[0_0_8px_currentColor]`} style={{ backgroundColor: 'currentColor' }} />
                                                <span className="leading-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Team Philosophy Banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative z-10 rounded-[2.5rem] overflow-hidden glass-extreme border border-white/20 dark:border-slate-800 shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(3,0,20,0.8) 50%, rgba(192,132,252,0.08) 100%)'
                }}
            >
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-orange-500/08 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 p-8 md:p-14">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <Quote size={18} className="text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{ft.philosophy.title}</h3>
                    </div>

                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-4xl italic mb-8 font-light">
                        "{ft.philosophy.quote}"
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {ft.philosophy.tags.map((tag: string, i: number) => (
                            <span
                                key={i}
                                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};
