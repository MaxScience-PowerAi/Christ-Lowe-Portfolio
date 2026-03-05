import React from 'react';
import { Briefcase, GraduationCap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export const Mission = ({ t }: { t: any }) => {
    return (
        <Section id="mission" dark className="relative bg-black py-24 overflow-hidden">
            {/* Magic backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-black to-black pointer-events-none" />

            <div className="relative z-10 text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {t.report.mission.title}
                </h2>
                <div className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full border border-cyan-500/30 mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(192,132,252,0.15)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-[shine_2s_infinite]" />
                    <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {t.report.mission.main}
                    </span>
                </div>
                <p className="text-slate-300 text-lg font-medium max-w-2xl mx-auto">
                    {t.report.mission.sub}
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {t.report.mission.blocks.map((block: any, i: number) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-8 glass-extreme dark:bg-black/40 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    >
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-sm">
                            {i === 0 ? <Briefcase className="text-cyan-600 dark:text-cyan-400" /> : i === 1 ? <GraduationCap className="text-orange-600 dark:text-orange-400" /> : <Globe className="text-cyan-600 dark:text-cyan-400" />}
                            {block.title}
                        </h4>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200/50 mb-2">
                                    {t.report.solution.labels.how}
                                </p>
                                <p className="text-sm text-slate-300 font-medium">{block.comment}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300/60 mb-2">
                                    {t.report.solution.labels.impact}
                                </p>
                                <p className="text-sm text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{block.impact}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 text-center italic text-xl md:text-2xl text-slate-400 font-light max-w-4xl mx-auto px-4 border-l-2 border-r-2 border-cyan-500/20 py-4 font-heading">
                "{t.report.mission.quote}"
            </div>
        </Section>
    );
};
