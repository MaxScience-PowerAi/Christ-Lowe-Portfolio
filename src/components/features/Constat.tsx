import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const GROWTH_DATA = [
    { year: '2024', value: 120 },
    { year: '2025', value: 168 },
    { year: '2026', value: 235 },
    { year: '2027', value: 329 },
    { year: '2028', value: 460 },
    { year: '2029', value: 644 },
];

function GrowthChart({ t }: { t: any }) {
    return (
        <div className="h-[300px] w-full mt-8 glass-extreme dark:bg-black/60 p-5 rounded-3xl border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.1)] relative overflow-hidden group">
            {/* Chart glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <h4 className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300 drop-shadow-md mb-4">{t.report.constat.chart.title}</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={GROWTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                    <XAxis
                        dataKey="year"
                        stroke="#52525b"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#52525b"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}M`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                        itemStyle={{ color: '#22d3ee', fontSize: '12px' }}
                        labelStyle={{ color: '#71717a', fontSize: '10px', marginBottom: '4px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        dot={{ fill: '#22d3ee', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export const Constat = ({ t }: { t: any }) => {
    return (
        <Section dark id="constat" className="relative pb-32 overflow-hidden dark:bg-black">
            {/* Ambient magic glow */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-float">
                        <Globe className="text-cyan-400 drop-shadow-md" size={32} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        {t.report.constat.title}
                    </h2>
                    <GrowthChart t={t} />
                </div>
                <div className="flex-1 space-y-8">
                    <div className="relative glass-extreme dark:bg-black/50 p-8 rounded-[2rem] border-cyan-500/30 shadow-[0_0_30px_rgba(192,132,252,0.15)] italic text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                        <div className="absolute -left-4 top-8 w-1 h-12 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        "{t.report.constat.quote}"
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[t.report.constat.global.market, t.report.constat.global.whatsapp].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="flex items-center gap-5 p-6 glass dark:bg-black/40 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white drop-shadow-sm">{item.label}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {t.report.constat.stats.map((stat: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-8 glass-extreme dark:bg-black/40 rounded-[2.5rem] border border-white/10 text-center group transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-500/50"
                    >
                        <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-400 mb-3 tracking-tighter drop-shadow-sm">{stat.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200 mb-2">{stat.label}</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
