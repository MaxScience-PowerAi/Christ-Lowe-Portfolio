import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLang } from '../../hooks/useLang';
import { Moon, Sun } from 'lucide-react';

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
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr');

    return (
        <nav
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                transition: 'all 0.3s ease',
                backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
                background: scrolled ? 'var(--nav-bg)' : 'transparent',
                borderBottom: scrolled ? '1px solid var(--border)' : 'none',
            }}
        >
            <div style={{
                maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
                height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <button
                    onClick={() => scrollTo('home')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                >
                    <div style={{
                        width: 40, height: 40, borderRadius: '0.75rem',
                        background: 'linear-gradient(135deg, var(--color-brand-cyan), var(--color-brand-blue))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 22px rgba(34,211,238,0.35)', flexShrink: 0,
                    }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>CL</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                        <span style={{
                            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                            background: 'linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-blue))',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.01em',
                        }}>
                            Christ Lowe
                        </span>
                        <span style={{
                            fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: '0.7rem',
                            color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                            AI Engineer
                        </span>
                    </div>
                </button>

                {/* Desktop links */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={`nav-link${activeSection === link.id ? ' active' : ''}`}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Language toggle */}
                    <button
                        onClick={toggleLang}
                        title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                        style={{
                            background: 'var(--glass-bg)', border: '1px solid var(--border)',
                            borderRadius: '0.5rem', cursor: 'pointer',
                            color: 'var(--color-foreground)', fontFamily: 'Inter, sans-serif',
                            fontWeight: 700, fontSize: '0.75rem', padding: '0.3rem 0.65rem',
                            letterSpacing: '0.05em', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-brand-cyan)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                        {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label="Toggle theme"
                        style={{ color: 'var(--color-foreground)' }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <a
                        href="mailto:christlowe6@gmail.com"
                        className="btn-primary"
                        style={{ padding: '0.5rem 1.25rem', fontSize: '0.82rem' }}
                    >
                        {lang === 'fr' ? 'Me contacter ✦' : 'Contact me ✦'}
                    </a>
                </div>

                {/* Mobile controls */}
                <div style={{ display: 'none', alignItems: 'center', gap: '0.6rem' }} className="mobile-controls">
                    <button
                        onClick={toggleLang}
                        style={{
                            background: 'var(--glass-bg)', border: '1px solid var(--border)',
                            borderRadius: '0.5rem', cursor: 'pointer',
                            color: 'var(--color-foreground)', fontFamily: 'Inter, sans-serif',
                            fontWeight: 700, fontSize: '0.7rem', padding: '0.25rem 0.5rem',
                        }}
                    >
                        {lang === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        aria-label="Toggle theme"
                        style={{ color: 'var(--color-foreground)' }}
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-foreground)', padding: '0.5rem' }}
                        aria-label="Toggle menu"
                    >
                        <div style={{ width: 22, height: 2, background: 'var(--color-foreground)', marginBottom: 5, borderRadius: 9999, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                        <div style={{ width: 22, height: 2, background: 'var(--color-foreground)', marginBottom: 5, borderRadius: 9999, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
                        <div style={{ width: 22, height: 2, background: 'var(--color-foreground)', borderRadius: 9999, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    background: 'var(--mobile-nav-bg)', backdropFilter: 'blur(20px)',
                    borderTop: '1px solid var(--border)',
                    padding: '1rem 1.5rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                }}>
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            style={{
                                background: activeSection === link.id ? 'var(--tag-bg)' : 'none',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                color: activeSection === link.id ? 'var(--color-brand-cyan)' : 'var(--text-muted)',
                                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                                padding: '0.75rem 1rem', borderRadius: '0.5rem', transition: 'all 0.2s',
                            }}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        href="mailto:christlowe6@gmail.com"
                        className="btn-primary"
                        style={{ padding: '0.75rem 1rem', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.5rem' }}
                    >
                        {lang === 'fr' ? 'Me contacter ✦' : 'Contact me ✦'}
                    </a>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
