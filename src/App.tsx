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
import { ThemeProvider } from './hooks/useTheme';
import { LangProvider, useLang } from './hooks/useLang';
import { portfolioTranslations } from './portfolioTranslations';

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
  const [scrollProgress, setScrollProgress] = useState(0);
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
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden transition-colors duration-300">
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
    </div>
  );
}
