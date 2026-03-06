import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLang } from '../../hooks/useLang';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavT {
    home: string; about: string; skills: string; services: string;
    projects: string; journey: string; contact: string;
    lightMode: string; darkMode: string;
}

interface Props {
    activeSection: string;
    t: NavT;
}

export function PortfolioNav({ activeSection, t }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { lang, setLang } = useLang();

    const navLinks = [
        { id: 'home', label: t.home },
        { id: 'about', label: t.about },
        { id: 'skills', label: t.skills },
        { id: 'services', label: t.services },
        { id: 'projects', label: t.projects },
        { id: 'journey', label: t.journey },
        { id: 'contact', label: t.contact },
    ];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            // Optional: close mobile menu on scroll
            if (menuOpen && window.scrollY > 100) setMenuOpen(false);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [menuOpen]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr');

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'navbar-blur backdrop-blur-xl' : 'bg-transparent'
            )}
        >
            <div className="container-xl h-20 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollTo('home')}
                    className="flex items-center gap-3 bg-transparent border-none cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0 transition-transform group-hover:scale-105">
                        <span className="text-white font-black text-base font-heading">CL</span>
                    </div>
                    <div className="flex flex-col text-left leading-tight hidden sm:flex">
                        <span className="font-heading font-extrabold text-base bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                            Christ Lowe
                        </span>
                        <span className="font-heading font-medium text-[0.65rem] text-muted tracking-widest uppercase mt-0.5">
                            AI Engineer
                        </span>
                    </div>
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={cn(
                                'nav-link',
                                activeSection === link.id && 'active'
                            )}
                        >
                            {link.label}
                        </button>
                    ))}

                    <div className="w-px h-6 bg-border mx-2" />

                    <div className="flex items-center gap-3">
                        {/* Language toggle */}
                        <button
                            onClick={toggleLang}
                            title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                            className="bg-white/5 border border-border rounded-lg text-foreground font-body font-bold text-xs px-3 py-1.5 tracking-wider transition-all hover:border-cyan-500 hover:bg-cyan-500/10"
                        >
                            {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
                        </button>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                            className="btn-primary py-2 text-xs xl:text-sm px-5"
                        >
                            {lang === 'fr' ? 'Me contacter' : 'Contact me'}
                        </a>
                    </div>
                </div>

                {/* Mobile controls */}
                <div className="flex md:hidden items-center gap-3">
                    <button
                        onClick={toggleLang}
                        className="bg-white/5 border border-border rounded-lg text-foreground font-body font-bold text-xs px-2 py-1"
                    >
                        {lang === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-1.5 text-foreground transition-transform"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-surface-hover/95 backdrop-blur-2xl border-t border-border p-4 flex flex-col gap-2 animate-fade-up">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={cn(
                                'text-left font-body font-semibold text-[0.95rem] py-3 px-4 rounded-xl transition-colors',
                                activeSection === link.id
                                    ? 'bg-cyan-500/10 text-cyan-400'
                                    : 'text-muted hover:bg-white/5'
                            )}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                        className="btn-primary justify-center mt-4 w-full"
                    >
                        {lang === 'fr' ? 'Me contacter ✦' : 'Contact me ✦'}
                    </a>
                </div>
            )}
        </nav>
    );
}
