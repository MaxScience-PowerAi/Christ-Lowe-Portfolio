import React from 'react';
import { ChevronRight, ArrowRight, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export const CTA = ({ t }: { t: any }) => {
    return (
        <Section id="cta">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Call to Action</span>
                </div>
                <h2 className="text-4xl md:text-[5rem] font-bold text-white mb-8 tracking-tighter drop-shadow-lg leading-tight">
                    {t.report.cta.title}
                </h2>
                <p className="text-zinc-400 text-xl font-light max-w-2xl mx-auto italic leading-relaxed">
                    {t.report.cta.sub}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
                {t.report.cta.profiles.map((profile: any, i: number) => (
                    <Card key={i} className="group cursor-pointer glass-extreme dark:bg-black/60 border-white/10 hover:border-cyan-500/50 p-10 transition-all hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center justify-between drop-shadow-sm">
                            {profile.title}
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </h4>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-10 font-medium">{profile.desc}</p>
                        <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-cyan-400 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,1)] animate-pulse" />
                            {t.report.solution.labels.contactUs}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                <Phone size={14} className="text-cyan-600 dark:text-cyan-500" />
                            </div>
                            <span className="text-xs text-slate-700 dark:text-zinc-400 font-bold">Maxime (Christ): +237 678 831 868</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <Mail size={16} className="text-cyan-600 dark:text-cyan-500" />
                        </div>
                        <span className="text-xs text-slate-700 dark:text-zinc-400 font-bold">contact@powerai.cm</span>
                    </div>
                </div>
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-600/50 dark:text-cyan-500/50 italic text-center md:text-right">
                    {t.report.cta.footer}
                </p>
            </div>
        </Section>
    );
};
