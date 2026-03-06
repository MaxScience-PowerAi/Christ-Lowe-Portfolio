import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


export function AboutSection({ t }: { t: any }) {
    return (
        <section id="about" className="section-pad relative overflow-hidden bg-surface">
            {/* Background accent */}
            <div className="absolute top-0 left-[-20%] w-[60%] h-full bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="container-xl relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="text-brand-blue font-bold text-xs tracking-[0.18em] uppercase font-heading">
                        <SplitText text={t.tag} />
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-2 mb-4 bg-hero-gradient bg-clip-text text-transparent">
                        <SplitText text={t.title} delay={0.3} />
                    </h2>
                    <div className="section-divider mx-auto mt-3" />
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* 1. Photo & Intro Card (Spans 1 col, 2 rows on large screens) */}
                    <motion.div variants={fadeUp} className="glass-card p-8 flex flex-col items-center text-center md:row-span-2 justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative mb-6">
                            <div className="w-[180px] h-[180px] rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-blue-600">
                                <img
                                    src="/avatar.webp"
                                    alt="Christ Lowe"
                                    className="w-full h-full rounded-full object-cover object-top border-4 border-surface"
                                    loading="lazy"
                                />
                            </div>
                            {/* Online indicator */}
                            <div className="absolute bottom-2 right-4 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-surface shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        </div>

                        <h3 className="font-heading font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                            <SplitText text="Christ Lowe" />
                        </h3>
                        <p className="text-muted text-xs font-body tracking-[0.05em] uppercase">
                            <SplitText text={t.subtitle || 'AI Engineer · Douala 🇨🇲'} delay={0.5} />
                        </p>
                    </motion.div>

                    {/* 2. Bio Card (Spans 2 cols) */}
                    <motion.div variants={fadeUp} className="glass-card p-8 md:col-span-2 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/5 rounded-full blur-3xl group-hover:bg-brand-violet/10 transition-colors duration-500" />
                        <h4 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                            <span className="text-brand-cyan">✦</span> {t.introTitle || 'Who am I?'}
                        </h4>
                        <div className="space-y-4 font-body text-muted leading-relaxed text-[0.95rem] md:text-base relative z-10">
                            <p>{t.intro}</p>
                            <p>{t.intro2}</p>
                        </div>
                    </motion.div>

                    {/* 3. Quick Facts Card */}
                    <motion.div variants={fadeUp} className="glass-card p-6 md:col-span-1 lg:col-span-1 flex flex-col justify-center">
                        <div className="space-y-4 divide-y divide-border/50">
                            {(t.quickFacts || [
                                { icon: '🎓', label: 'Level 3 Mathematics', sub: 'University of Douala' },
                                { icon: '📍', label: 'Douala, Cameroon', sub: 'Available remote / on-site' },
                                { icon: '🚀', label: 'Co-founder', sub: 'PowerAi Community' },
                                { icon: '✝️', label: 'Faith-driven', sub: 'God is my engine' },
                            ]).map((f: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 pt-4 first:pt-0">
                                    <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-lg shadow-inner">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <div className="text-foreground font-semibold text-sm font-body">{f.label}</div>
                                        <div className="text-muted text-xs font-body mt-0.5">{f.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 4. What I'm Looking For Card */}
                    <motion.div variants={fadeUp} className="glass-card p-6 md:col-span-1 lg:col-span-1 border-brand-cyan/20 bg-brand-cyan/5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-xl">🎯</span>
                            <span className="text-brand-cyan font-bold text-sm font-heading uppercase tracking-widest">
                                {t.lookingFor?.title || "🎯 Target"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {(t.lookingFor?.items || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-brand-cyan mt-0.5 text-xs">✓</span>
                                    <div className="font-body text-sm leading-snug">
                                        <strong className="text-foreground font-semibold">{item.label} : </strong>
                                        <span className="text-muted">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 5. Languages Card */}
                    <motion.div variants={fadeUp} className="glass-card p-6 md:col-span-3">
                        <h4 className="font-heading font-bold text-sm text-muted uppercase tracking-wider mb-4">
                            {t.languagesTitle || 'Languages'}
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {(t.langs || []).map((l: any, i: number) => (
                                <Magnetic key={i} strength={0.3}>
                                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-hover border border-border/50 hover:border-brand-cyan/30 transition-colors">
                                        <span className="text-lg">{l.flag}</span>
                                        <div className="flex flex-col">
                                            <span className="text-foreground text-xs font-bold font-body">{l.lang}</span>
                                            <span className="text-muted text-[0.65rem] font-medium font-body uppercase tracking-wider">{l.level}</span>
                                        </div>
                                    </div>
                                </Magnetic>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
