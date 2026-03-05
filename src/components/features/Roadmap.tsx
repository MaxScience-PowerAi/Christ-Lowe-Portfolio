import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';

interface RoadmapProps {
    t: any;
}

export const Roadmap = ({ t }: RoadmapProps) => {
    return (
        <Section id="roadmap">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <Calendar className="text-cyan-400 animate-pulse" size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">Timeline</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white tracking-tight">
                        {t.report.roadmap.title}
                    </h2>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" /> {t.report.roadmap.interactive.current}
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-zinc-800" /> {t.report.roadmap.interactive.next}
                    </span>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 hidden lg:block" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                    {t.report.roadmap.steps.map((step: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            <div className={cn(
                                "p-8 rounded-[2rem] border transition-all duration-700 h-full flex flex-col glass-extreme",
                                i === 0
                                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                    : "dark:bg-black/40 border-white/10 hover:border-cyan-500/30"
                            )}>
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all font-black text-sm relative overflow-hidden",
                                    i === 0
                                        ? "bg-gradient-to-br from-cyan-400 to-indigo-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                        : "bg-white/5 text-zinc-400 border border-white/10 group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
                                )}>
                                    {i === 0 && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />}
                                    {step.period}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-3 leading-tight drop-shadow-sm">{step.title}</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed mt-auto font-medium">{step.desc}</p>
                            </div>

                            <div className={cn(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-slate-950 dark:border-zinc-950 z-20 hidden lg:block",
                                i === 0 ? "bg-cyan-500" : "bg-slate-300 dark:bg-zinc-800"
                            )} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
