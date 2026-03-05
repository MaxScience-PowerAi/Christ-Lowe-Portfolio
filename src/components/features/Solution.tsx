import React from 'react';
import { Rocket, Briefcase, GraduationCap, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SolutionProps {
    t: any;
    setView: (view: any) => void;
}

export const Solution = ({ t, setView }: SolutionProps) => {
    const pillars = [
        {
            key: 'b2b',
            icon: Briefcase,
            color: 'cyan',
            pillText: t.report.solution.b2b.pilier,
            title: t.report.solution.b2b.title,
            target: t.report.solution.b2b.target,
            prop: t.report.solution.b2b.prop,
            model: t.report.solution.b2b.model,
        },
        {
            key: 'aistart',
            icon: GraduationCap,
            color: 'orange',
            pillText: t.report.solution.aistart.pilier,
            title: t.report.solution.aistart.title,
            target: t.report.solution.aistart.target,
            prop: t.report.solution.aistart.prop,
            model: t.report.solution.aistart.model,
        },
        {
            key: 'community',
            icon: Users,
            color: 'cyan',
            pillText: t.report.solution.community.pilier,
            title: t.report.solution.community.title,
            target: t.report.solution.community.target,
            prop: t.report.solution.community.prop,
            model: t.report.solution.community.model,
            action: {
                text: t.report.communityPortal.foundersPortal.members.title,
                onClick: () => setView('members'),
            },
        },
    ];

    return (
        <Section id="solution" className="relative dark:bg-black py-24 overflow-hidden">
            {/* Ambient magic glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="text-center mb-20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-[0_0_30px_rgba(192,132,252,0.3)] animate-pulse-slow">
                    <Rocket className="text-white" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-6 tracking-tight drop-shadow-md">
                    {t.report.solution.title}
                </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {pillars.map((pillar) => (
                    <motion.div
                        key={pillar.key}
                        whileHover={{ y: -5 }}
                        className={`group relative glass-extreme dark:bg-black/40 rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] overflow-hidden`}
                    >
                        {/* Hover flare */}
                        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-[shine_2s_ease-in-out]" />

                        <div className="relative z-10 flex justify-between items-start mb-8">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                pillar.color === 'orange' ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                            )}>
                                <pillar.icon size={24} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-cyan-200/50">
                                {pillar.pillText}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 drop-shadow-sm">{pillar.title}</h3>

                        <div className="space-y-6">
                            <div>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", pillar.color === 'orange' ? "text-orange-600 dark:text-orange-400" : "text-cyan-700 dark:text-cyan-400")}>
                                    {t.report.solution.labels.target}
                                </p>
                                <p className="text-sm text-slate-800 dark:text-zinc-400 font-medium">{pillar.target}</p>
                            </div>
                            <div>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", pillar.color === 'orange' ? "text-orange-600 dark:text-orange-400" : "text-cyan-700 dark:text-cyan-400")}>
                                    {t.report.solution.labels.prop}
                                </p>
                                <p className="text-sm text-slate-800 dark:text-zinc-400 font-medium">{pillar.prop}</p>
                            </div>
                            <div>
                                <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", pillar.color === 'orange' ? "text-orange-600 dark:text-orange-400" : "text-cyan-700 dark:text-cyan-400")}>
                                    {t.report.solution.labels.model}
                                </p>
                                <p className="text-sm text-slate-800 dark:text-zinc-400 font-medium">{pillar.model}</p>
                            </div>

                            {pillar.action && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={pillar.action.onClick}
                                    className="w-full mt-4 flex items-center justify-center gap-2"
                                >
                                    <Users size={14} />
                                    {pillar.action.text}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative z-10 glass-extreme dark:bg-black/50 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 border-cyan-500/30 shadow-[0_0_40px_rgba(192,132,252,0.1)]"
            >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                    <Target className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" size={28} />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 drop-shadow-sm">{t.report.solution.diff.title}</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t.report.solution.diff.desc}</p>
                </div>
            </motion.div>
        </Section>
    );
};

// Helper for classNames since we are in a separate file
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
