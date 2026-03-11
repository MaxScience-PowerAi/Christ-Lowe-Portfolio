import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. imports
content = content.replace(
    `import { AnimatePresence, motion } from 'framer-motion';`,
    `import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';`
);

content = content.replace(
    `import { ThemeProvider } from './hooks/useTheme';
import { LangProvider, useLang } from './hooks/useLang';`,
    `import { ThemeProvider } from './hooks/useTheme';
import { LangProvider, useLang } from './hooks/useLang';

// Lazy load heavy components
const LazyServicesSection = React.lazy(() => import('./components/portfolio/ServicesSection').then(m => ({ default: m.ServicesSection })));
const LazyProjectsSection = React.lazy(() => import('./components/portfolio/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const LazyJourneySection = React.lazy(() => import('./components/portfolio/JourneySection').then(m => ({ default: m.JourneySection })));
`
);

// 2. Logic inside AppInner
content = content.replace(
    `  const [isLoading, setIsLoading] = useState(true);
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
  }, []);`,
    `  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let visibleSection = activeSection;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleSection = entry.target.id;
        }
      });
      
      if (maxRatio > 0 && visibleSection !== activeSection) {
        setActiveSection(visibleSection);
      }
    }, { threshold: [0.1, 0.5, 0.9], rootMargin: "-10% 0px -40% 0px" });

    const sections = ['home', 'about', 'skills', 'services', 'projects', 'journey', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  // Back to top observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !showBackToTop) setShowBackToTop(true);
      if (window.scrollY <= 500 && showBackToTop) setShowBackToTop(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showBackToTop]);`
);


// 3. Render
content = content.replace(
    `        {/* Scroll progress bar */}
        <div
          id="scroll-bar"
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet z-[9999] transition-[width] duration-100 ease-linear"
          style={{ width: \`\${scrollProgress}%\` }}
        />`,
    `        {/* Scroll progress bar */}
        <motion.div
          id="scroll-bar"
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet z-[9999] origin-left"
          style={{ scaleX }}
        />`
);

content = content.replace(
    `          <section id="services"> <ServicesSection t={t.services} /></section>
          <section id="projects"> <ProjectsSection t={t.projects} /></section>
          <section id="journey">  <JourneySection t={t.journey} /></section>`,
    `          <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-cyan-500">Loading...</div>}>
            <section id="services"> <LazyServicesSection t={t.services} /></section>
            <section id="projects"> <LazyProjectsSection t={t.projects} /></section>
            <section id="journey">  <LazyJourneySection t={t.journey} /></section>
          </React.Suspense>`
);

fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx refactored successfully.");
