import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CyberBackground from './components/CyberBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-[#02040a] transition-colors duration-300">
        {/* TCS HackQuest Season 11 Cybersecurity Background */}
        <CyberBackground />

        {/* Custom Silky Cursor for Desktop */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main id="main-content" className="relative z-10">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Resume Viewer / Downloader Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
