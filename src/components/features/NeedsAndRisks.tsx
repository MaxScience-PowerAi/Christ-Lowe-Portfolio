import React from 'react';
import { DollarSign, Handshake, Users, Globe, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export const NeedsAndRisks = ({ t }: { t: any }) => {
    return (
        <>
            <Section dark id="needs">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-950 dark:text-white mb-20 text-center tracking-tight">
                    {t.report.needs.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {t.report.needs.list.map((need: any, i: number) => (
                        <Card key={i} className="p-8 glass-extreme dark:bg-black/40 border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                {i === 0 ? <DollarSign className="text-cyan-400" /> :
                                    i === 1 ? <Handshake className="text-orange-400" /> :
                                        i === 2 ? <Users className="text-cyan-400" /> :
                                            <Globe className="text-red-400" />}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-4 drop-shadow-sm">{need.title}</h4>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{need.desc}</p>
                        </Card>
                    ))}
                </div>
                <Card variant="glass" className="text-center italic text-xl text-zinc-400 font-light border-white/5 bg-white/5 backdrop-blur-xl py-10 px-12 rounded-[2.5rem]">
                    "{t.report.needs.quote}"
                </Card>
            </Section>

            <Section id="risks">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-950 dark:text-white mb-20 text-center tracking-tight">
                    {t.report.risks.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {t.report.risks.list.map((risk: any, i: number) => (
                        <Card key={i} className="p-6 md:p-8 glass-extreme dark:bg-black/40 border-white/10 hover:border-red-500/30 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-base md:text-lg font-bold text-white pr-4 drop-shadow-sm">{risk.title}</h4>
                                <span className={cn(
                                    "px-3 py-1 text-[10px] font-bold rounded-full border whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                                    risk.color === 'orange' ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                )}>
                                    {risk.level}
                                </span>
                            </div>
                            <div className="flex gap-4 text-xs text-zinc-400">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                    risk.color === 'orange' ? "bg-orange-500/10" : "bg-cyan-500/10"
                                )}>
                                    <ShieldAlert className={risk.color === 'orange' ? "text-orange-500" : "text-cyan-500"} size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-500 mb-1 uppercase tracking-widest text-[9px]">Mitigation</p>
                                    <p className="leading-relaxed font-medium text-zinc-300">{risk.mitigation}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </>
    );
};

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
