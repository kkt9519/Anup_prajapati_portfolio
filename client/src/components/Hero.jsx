import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye, Github, Linkedin, Mail, Sparkles, Terminal, Code2, Database, ShieldCheck } from 'lucide-react';

export default function Hero({ onOpenResume }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Software Engineer (Fresher)',
    'Java & DSA Problem Solver',
    'Full-Stack MERN Developer',
    'B.Tech Computer Science & Design',
  ];

  // Dynamic role rotator
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background mesh spotlights */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[120px] animate-pulse-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-600/15 dark:bg-purple-600/20 blur-[130px] animate-glow-pulse"
        aria-hidden="true"
      />

      {/* Interactive mouse follow spotlight */}
      <div
        className="pointer-events-none absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-[90px] transition-all duration-300 ease-out hidden lg:block"
        style={{
          left: `${mousePos.x - 225}px`,
          top: `${mousePos.y - 225}px`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-card border border-cyan-500/30 bg-cyan-500/5 text-xs font-medium text-slate-800 dark:text-cyan-300 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Placement Ready • Available for 2026-2027 SDE Roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono font-medium text-cyan-600 dark:text-cyan-400 tracking-wide">
                Hello World! I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Anup Prajapati
              </h1>
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-cyan-purple tracking-tight">
                  {roles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Intro paragraph from official resume */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Final-year B.Tech <span className="text-slate-900 dark:text-white font-semibold">Computer Science & Design</span> student at <span className="text-slate-900 dark:text-white font-semibold">R.R. Group of Modern Technology (AKTU)</span> with a <span className="text-cyan-600 dark:text-cyan-400 font-semibold">7.38 / 10 CGPA</span>. Strong skills in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Java, DSA, SQL</span>, and full-stack <span className="text-purple-600 dark:text-purple-400 font-semibold">MERN</span> development. Passionate about solving complex problems and building scalable software.
            </p>

            {/* Quick Tech Highlights Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Java 21</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>DSA Algorithms</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>MERN Stack</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Spring Boot Basics</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="interactive-hover w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="interactive-hover w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 transition-all duration-200"
              >
                <span>Get in Touch</span>
              </a>

              <button
                onClick={onOpenResume}
                className="interactive-hover w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>View CV</span>
              </button>
            </div>

            {/* Social Channels */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Connect:</span>
              <a
                href="https://github.com/kkt9519"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="interactive-hover p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/anup-prajapati-kkt2004"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="interactive-hover p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:anuprajprajapati123@gmail.com"
                aria-label="Send Email to Anup"
                className="interactive-hover p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-navy-900/60 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Profile Picture Card & Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer Glow Backing */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-60 blur-xl group-hover:opacity-85 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Main Card Container */}
              <div className="relative rounded-3xl p-3 glass-card bg-navy-900/90 border border-slate-700/60 shadow-2xl overflow-hidden">
                
                {/* Photo with subtle gradient overlay */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-navy-950">
                  <img
                    src="/anup_prajapati.jpg"
                    alt="Anup Prajapati - Software Engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Bottom details on image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md bg-navy-950/80 border border-white/10 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-mono text-cyan-400 font-semibold">B.Tech CSD • CGPA 7.38 / 10</p>
                        <p className="text-sm font-bold text-white">Anup Prajapati</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        AKTU 2023-27
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Badges around card */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl glass-card bg-navy-900/95 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-lg flex items-center space-x-1.5 animate-float-slow">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold">CGPA: 7.38 / 10</span>
                </div>

                <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl glass-card bg-navy-900/95 border border-purple-500/40 text-xs font-mono text-purple-300 shadow-lg flex items-center space-x-1.5 animate-float-reverse">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Java, DSA & MERN</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
