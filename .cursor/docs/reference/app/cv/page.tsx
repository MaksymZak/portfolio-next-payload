'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone, Github, Linkedin, MessageCircle, FileText, MonitorDot } from 'lucide-react';

export default function CvPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      
      {/* Output Top Bar */}
      <div className="print:hidden w-full bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between font-mono text-[10px] font-bold">
          <div className="flex items-center gap-4">
             <Link href="/" className="flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all font-bold hover:-translate-x-1">
              <ArrowLeft size={12}/> BACK TO INDEX
             </Link>
             <span className="text-[var(--border)] hidden sm:inline">|</span>
             <span className="text-[var(--muted-foreground)] hidden sm:inline">CV / RESUME</span>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors border border-transparent font-bold">
            <FileText size={11} /> SAVE PDF
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 md:p-12 print:p-0 print:max-w-[900px] print:mx-auto">
        
        {/* Header Unit */}
        <header className="mb-6 border-2 border-[var(--foreground)] print:border-black p-6 sm:p-10 bg-[var(--surface)] relative overflow-hidden">
          {/* Minimalist Technical Grid Background (like index hero) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-30 pointer-events-none z-0 print:hidden" />
          <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.05] pointer-events-none z-0 print:hidden" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-none print:text-black bg-[var(--surface)]/80 print:bg-transparent backdrop-blur-sm self-start inline-block">Maksym<br/>Zakaliuzhnyi</h1>
              <div className="mt-4 inline-block font-mono text-[10px] sm:text-xs uppercase tracking-widest bg-[var(--foreground)] print:bg-black text-[var(--background)] print:text-white px-3 py-1 font-bold">
                Full Stack (Frontend-focused) Developer
              </div>
            </div>
            
            <div className="flex flex-col gap-3 font-mono text-[10px] font-bold text-[var(--muted-foreground)] print:text-gray-700 bg-[var(--surface)]/80 print:bg-transparent backdrop-blur-sm p-2 -m-2">
              <a href="mailto:zaksumy1989@gmail.com" className="flex items-center md:justify-end gap-2 hover:text-[var(--foreground)] p-1 -m-1"><Mail size={14}/> zaksumy1989@gmail.com</a>
              <a href="tel:+380994322085" className="flex items-center md:justify-end gap-2 hover:text-[var(--foreground)] p-1 -m-1 mt-1"><Phone size={14}/> +38 (099) 432-20-85</a>
              
              <div className="flex items-center md:justify-end gap-4 mt-3 text-[var(--foreground)] print:text-black">
                <a href="https://t.me/MaksymZak" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 hover:text-[var(--accent)] hover:-translate-y-0.5 transition-transform">
                  <MessageCircle size={22} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://github.com/MaksymZak" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 hover:text-[var(--accent)] hover:-translate-y-0.5 transition-transform">
                  <Github size={22} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.linkedin.com/in/mzakaliuzhnyi/" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 hover:text-[var(--accent)] hover:-translate-y-0.5 transition-transform">
                  <Linkedin size={22} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                </a>
                <span className="flex items-center gap-1.5 ml-2 p-1 text-[var(--muted-foreground)]"><MapPin size={14}/> Sumy</span>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ABOUT - Span 2 */}
          <section className="md:col-span-2 border-2 border-[var(--border)] print:border-gray-300 p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [01] ABOUT
            </h2>
            <p className="text-sm md:text-base leading-relaxed print:text-black">
              Frontend-focused Full Stack Developer with 4+ years of commercial experience in building modern web applications using React, Next.js, Payload CMS, Node.js, and databases (PostgreSQL, MongoDB). Skilled in optimizing landing pages, implementing A/B testing, and mentoring developers. Seeking to join a professional team to create scalable, high-performance solutions.
            </p>
          </section>

          {/* HARD SKILLS - Span 1 */}
          <section className="border-2 border-[var(--border)] print:border-gray-300 p-6 sm:p-8 bg-[var(--surface-muted)] print:bg-gray-50">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-4 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [02] STACK
            </h2>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JS / TS', 'Tailwind', 'React', 'Next.js', 'Astro', 'Payload CMS', 'Redux', 'Zustand', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'Docker'].map((tech) => (
                <span key={tech} className="font-mono text-[9px] uppercase font-bold border border-[var(--border)] print:border-gray-300 px-2.5 py-1.5 bg-[var(--surface)] print:bg-white print:text-black hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all duration-150 hover:shadow-[3px_3px_0px_var(--foreground)] hover:border-[var(--foreground)] cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* WORK EXPERIENCE - Span 2 */}
          <section className="md:col-span-2 border-2 border-[var(--border)] print:border-gray-300 p-6 sm:p-8">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [03] EXPERIENCE
            </h2>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-[var(--foreground)] print:border-black space-y-3 pb-2">
                <div className="absolute w-2 h-2 bg-[var(--background)] print:bg-white border-[1.5px] border-[var(--foreground)] print:border-black -left-[5px] top-[4px]" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-extrabold text-[var(--foreground)] print:text-black tracking-tight text-sm uppercase">Frontend Developer</h3>
                    <div className="font-mono text-[10px] text-[var(--foreground)] print:text-black font-bold tracking-wider mt-1">Goiteens Company, Ukraine</div>
                  </div>
                  <div className="font-mono text-[10px] text-[var(--accent)] print:text-black font-bold uppercase tracking-widest bg-[var(--surface)] print:bg-transparent px-2 py-1 border border-[var(--border)] print:border-none inline-block self-start">
                    Jun 2024 - Present
                  </div>
                </div>
                <ul className="space-y-2 mt-2">
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--accent)] print:text-black select-none">→</span><span>Developed and optimized landing pages (Next.js, Payload CMS, Astro, Gulp).</span></li>
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--accent)] print:text-black select-none">→</span><span>Implemented A/B testing logic and analytics for conversion optimization.</span></li>
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--accent)] print:text-black select-none">→</span><span>Maintained scalable Next.js projects and mentored a junior developer.</span></li>
                </ul>
              </div>

              <div className="relative pl-6 border-l-2 border-[var(--border)] print:border-gray-300 space-y-3 pb-2">
                <div className="absolute w-2 h-2 bg-[var(--background)] print:bg-white border-[1.5px] border-[var(--border)] print:border-gray-400 -left-[5px] top-[4px]" />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-extrabold text-[var(--foreground)] print:text-black tracking-tight text-sm uppercase">Frontend Developer</h3>
                    <div className="font-mono text-[10px] text-[var(--foreground)] print:text-black font-bold tracking-wider mt-1">SoftRyzen Company, Ukraine</div>
                  </div>
                  <div className="font-mono text-[10px] text-[var(--muted-foreground)] print:text-gray-500 font-bold uppercase tracking-widest">
                    Jul 2022 - Apr 2024
                  </div>
                </div>
                <ul className="space-y-2 mt-2">
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--muted-foreground)] print:text-gray-500 border-b border-dotted select-none">·</span><span>Delivered 150+ landing pages and CRM systems with Gulp and React.</span></li>
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--muted-foreground)] print:text-gray-500 border-b border-dotted select-none">·</span><span>Collaborated with designers and backend developers to ensure UI/UX consistency.</span></li>
                  <li className="flex gap-2 text-xs text-[var(--muted-foreground)] print:text-gray-800 font-sans leading-relaxed"><span className="text-[var(--muted-foreground)] print:text-gray-500 border-b border-dotted select-none">·</span><span>Improved project performance and maintainability.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* SOFT SKILLS & LANGUAGES - Span 1 */}
          <section className="border-2 border-[var(--border)] print:border-gray-300 p-6 sm:p-8 flex flex-col gap-8">
            <div>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [04] SOFT SKILLS
              </h2>
              <ul className="grid grid-cols-1 gap-3 mt-3 font-mono text-[10px] uppercase font-bold text-[var(--foreground)] print:text-black">
                {['Problem-solving', 'Team-oriented', 'Effective Communication', 'Time Management', 'High Adaptability'].map((skill, i) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span className="text-[var(--muted-foreground)] font-light opacity-60 w-3 tracking-tighter">0{i+1}</span>
                    <span className="flex-1 border-b border-dotted border-[var(--border)] print:border-gray-300 pb-1">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [05] LANGUAGES
              </h2>
              <ul className="space-y-2 mt-2 font-mono text-[10px] uppercase font-bold text-[var(--foreground)] print:text-black">
                <li className="border-b border-[var(--border)] print:border-gray-200 pb-2 flex justify-between"><span>Ukrainian</span> <span className="text-[var(--accent)] print:text-black">Native</span></li>
                <li className="border-b border-[var(--border)] print:border-gray-200 pb-2 flex justify-between"><span>English</span> <span className="text-[var(--muted-foreground)]">Pre-Int</span></li>
              </ul>
            </div>
          </section>

          {/* EDUCATION & PORTFOLIO - Span 3 */}
          <section className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-[var(--border)] print:border-gray-300 p-6 sm:p-8 bg-[var(--surface-muted)] print:bg-gray-50">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-black inline-block" /> [06] EDUCATION
              </h2>
              <h3 className="font-extrabold text-[var(--foreground)] print:text-black tracking-tight text-sm uppercase mb-1">Full Stack Developer Bootcamp</h3>
              <div className="font-mono text-[10px] text-[var(--muted-foreground)] print:text-gray-500 font-bold uppercase tracking-widest mb-3">Feb 2021 – Nov 2021</div>
              <p className="text-xs text-[var(--muted-foreground)] print:text-gray-700 font-sans leading-relaxed">
                10-month intensive program focused on JavaScript, React, Node.js, and database development.
              </p>
            </div>
            
            <div className="border-2 border-[var(--foreground)] print:border-black p-6 sm:p-8 bg-[var(--foreground)] print:bg-black text-[var(--background)] print:text-white flex flex-col justify-between">
              <div>
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] print:text-gray-300 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--accent)] print:bg-white inline-block" /> [07] PORTFOLIO
                </h2>
                <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-tight mb-2">Complete Commercial Archive</h3>
                <p className="text-xs text-[var(--muted-foreground)] print:text-gray-300">Explore comprehensive project breakdowns, A/B tested landings, and full engineering context on the live index.</p>
              </div>
              <Link href="/" className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase font-bold py-3 bg-[var(--background)] print:bg-white text-[var(--foreground)] print:text-black hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors print:hidden">
                <MonitorDot size={14} /> VIEW LIVE PORTFOLIO
              </Link>
              <div className="hidden print:block mt-6 font-mono text-[10px] font-bold tracking-widest border-t border-gray-600 pt-4">
                VISIT: HTTPS://MZAKALIUZHNYI.DEV/
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
