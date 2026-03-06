import React from 'react';
import { cn } from '../../utils/cn';

interface FooterT {
    tagline: string; nav: string; navLinks: string[]; socials: string; rights: string;
}

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function PortfolioFooter({ t }: { t: FooterT }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-surface relative overflow-hidden">
            {/* Subtle glow effect behind footer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-xl max-w-5xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Brand Col */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="text-white font-black text-xs font-heading">CL</span>
                            </div>
                            <span className="font-heading font-extrabold text-xl text-foreground tracking-tight">
                                Christ Lowe
                            </span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed font-body max-w-xs">
                            {t.tagline}
                        </p>
                    </div>

                    {/* Links Col */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-foreground font-semibold text-sm mb-4 font-body tracking-wider uppercase">{t.nav}</h4>
                            <div className="flex flex-col gap-3">
                                {(t.navLinks || ['Home', 'About', 'Skills', 'Projects']).map((label: string, idx: number) => {
                                    const ids = ['home', 'about', 'skills', 'projects'];
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => scrollTo(ids[idx])}
                                            className="text-left text-muted text-sm font-body transition-colors hover:text-cyan-400 w-fit"
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-foreground font-semibold text-sm mb-4 font-body tracking-wider uppercase">{t.socials}</h4>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: 'GitHub', href: 'https://github.com/MaxScience-PowerAi' },
                                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christ-lowe-10a210389/' },
                                    { label: 'PowerAi', href: '#' },
                                ].map(link => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank" rel="noopener noreferrer"
                                        className="text-muted text-sm font-body transition-colors hover:text-cyan-400 w-fit"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted text-xs font-body m-0 text-center sm:text-left">
                        &copy; {currentYear} LINZE LOWE CHRIST MAXIME. {t.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}

