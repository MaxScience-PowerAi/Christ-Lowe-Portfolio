import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../../utils/animations';
import { SplitText } from '../ui/SplitText';
import { Magnetic } from '../ui/Magnetic';


interface ContactT {
    tag: string; title: string; heading: string; sub: string;
    name: string; email: string; message: string;
    send: string; sending: string; sent: string;
}

export function ContactSection({ t }: { t: ContactT }) {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
            if (!resp.ok) throw new Error('Failed');
            setFormState({ name: '', email: '', message: '' });
            alert(t.sent);
        } catch {
            alert('Error sending message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-pad relative overflow-hidden bg-background">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-brand-emerald/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container-xl max-w-5xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="text-brand-emerald font-bold text-xs tracking-[0.18em] uppercase font-heading">
                        <SplitText text={t.tag} />
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl md:text-5xl mt-2 mb-4 bg-hero-gradient bg-clip-text text-transparent">
                        <SplitText text={t.title} delay={0.3} />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-brand-emerald to-brand-cyan mx-auto mt-6 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
                    {/* Left - Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideInLeft}
                        className="flex flex-col gap-10"
                    >
                        <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                                {t.heading}
                            </h3>
                            <p className="text-muted text-base leading-relaxed font-body">
                                {t.sub}
                            </p>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            className="flex flex-col gap-4"
                        >
                            {[
                                { icon: '✉️', label: 'Email', value: 'christlowe6@gmail.com', href: 'mailto:christlowe6@gmail.com' },
                                { icon: '📱', label: 'WhatsApp', value: '+237 678831868', href: 'https://wa.me/237678831868' },
                                { icon: '💼', label: 'LinkedIn', value: 'Christ Lowe', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/' },
                                { icon: '📍', label: 'Location', value: 'Douala, Cameroon', href: null },
                            ].map((item, index) => (
                                <Magnetic key={item.label} strength={0.3}>
                                    <motion.a
                                        variants={fadeUp}
                                        href={item.href || '#'}
                                        target={item.href?.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 group
                                            ${item.href ? 'hover:bg-surface-hover hover:border-border-strong hover:-translate-y-1 cursor-pointer' : 'pointer-events-none'}`}
                                        style={{
                                            backgroundColor: 'var(--card-bg)',
                                            borderColor: 'var(--border)',
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                            style={{ backgroundColor: 'var(--glass-bg)' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-muted text-xs font-bold uppercase tracking-wider font-body mb-1">
                                                {item.label}
                                            </div>
                                            <div className="text-foreground text-[0.95rem] font-medium font-body group-hover:text-brand-cyan transition-colors">
                                                {item.value}
                                            </div>
                                        </div>
                                    </motion.a>
                                </Magnetic>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideInRight}
                        className="rounded-3xl p-8 md:p-10 relative overflow-hidden group/form"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--border)',
                            borderWidth: '1px',
                        }}
                    >
                        {/* Hover glow effect for the form container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-foreground text-sm font-semibold font-body ml-1">{t.name}</label>
                                    <input
                                        type="text" id="name" required
                                        value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-body outline-none transition-all duration-300 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 focus:bg-surface-hover hover:border-border-strong"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-foreground text-sm font-semibold font-body ml-1">{t.email}</label>
                                    <input
                                        type="email" id="email" required
                                        value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-body outline-none transition-all duration-300 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 focus:bg-surface-hover hover:border-border-strong"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-foreground text-sm font-semibold font-body ml-1">{t.message}</label>
                                <textarea
                                    id="message" required rows={5}
                                    value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground font-body outline-none transition-all duration-300 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 focus:bg-surface-hover hover:border-border-strong resize-y"
                                    placeholder="How can I help you?"
                                />
                            </div>

                            <Magnetic strength={0.4} className="w-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full justify-center py-4 text-base mt-2 relative overflow-hidden group/btn"
                                >
                                    <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'} flex items-center justify-center gap-2`}>
                                        {t.send}
                                        <span className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">↗</span>
                                    </span>
                                    {isSubmitting && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="ml-3">{t.sending}</span>
                                        </span>
                                    )}
                                </button>
                            </Magnetic>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
