import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export const Vision = ({ t }: { t: any }) => {
    return (
        <Section dark id="vision" className="relative pb-24 overflow-hidden dark:bg-black">
            {/* Ambient magic glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-md">
                        {t.report.vision.title}
                    </h2>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative glass-extreme dark:bg-black/50 p-10 rounded-[2.5rem] group shadow-[0_0_30px_rgba(34,211,238,0.1)] border-cyan-500/20 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />
                        <div className="absolute top-6 right-6 px-4 py-1.5 bg-cyan-500/10 text-cyan-300 text-[10px] font-bold rounded-full border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            {t.report.vision.time}
                        </div>
                        <p className="text-3xl font-bold text-white mb-8 leading-tight drop-shadow-sm">
                            {t.report.vision.main}
                        </p>
                        <p className="text-cyan-100/70 italic mb-10 leading-relaxed text-lg">
                            "{t.report.vision.quote}"
                        </p>
                        <div className="flex flex-wrap gap-4 relative z-10">
                            {t.report.vision.pillars.map((p: string, i: number) => (
                                <span key={i} className="px-5 py-2 glass dark:bg-white/5 rounded-xl text-xs font-bold text-white border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:border-cyan-400/50 transition-colors">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-md">
                        {t.report.values.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {t.report.values.list.map((val: any, i: number) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="p-6 glass-extreme dark:bg-black/40 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                            >
                                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-3 drop-shadow-sm">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                                    {val.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                    {val.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};
