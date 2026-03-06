import React, { useState, useEffect } from 'react';
import { PortfolioNav } from './components/portfolio/PortfolioNav';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { SkillsSection } from './components/portfolio/SkillsSection';
import { ServicesSection } from './components/portfolio/ServicesSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { JourneySection } from './components/portfolio/JourneySection';
import { PortfolioFooter } from './components/portfolio/PortfolioFooter';
import { portfolioTranslations } from './portfolioTranslations';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { AnimatePresence, motion } from 'framer-motion';
import { Magnetic } from './components/ui/Magnetic';
import { ChevronUp } from 'lucide-react';


import { ThemeProvider } from './hooks/useTheme';
import { LangProvider, useLang } from './hooks/useLang';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <LangProvider>
        <AppInner />
      </LangProvider>
    </ThemeProvider>
  );
}

function AppInner() {
  const { lang } = useLang();
  const t = portfolioTranslations[lang];
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  // Scroll progress & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);

      // find active section
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'journey', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }

      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`bg-background text-foreground min-h-screen overflow-x-hidden transition-colors duration-300 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <CustomCursor />

        {/* Scroll progress bar */}
        <div
          id="scroll-bar"
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet z-[9999] transition-[width] duration-100 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Navbar */}
        <PortfolioNav activeSection={activeSection} t={t.nav} />

        {/* Sections */}
        <main>
          <section id="home">   <HeroSection t={t.hero} /></section>
          <section id="about">  <AboutSection t={t.about} /></section>
          <section id="skills">   <SkillsSection t={t.skills} /></section>
          <section id="services"> <ServicesSection t={t.services} /></section>
          <section id="projects"> <ProjectsSection t={t.projects} /></section>
          <section id="journey">  <JourneySection t={t.journey} /></section>
          <section id="contact">  <ContactSection t={t.contact} /></section>
        </main>

        <PortfolioFooter t={t.footer} />

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="fixed bottom-8 right-8 z-[9000]"
            >
              <Magnetic strength={0.5}>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 backdrop-blur-md text-brand-cyan flex items-center justify-center hover:bg-brand-cyan hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  aria-label="Back to top"
                >
                  <ChevronUp size={24} />
                </button>
              </Magnetic>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
