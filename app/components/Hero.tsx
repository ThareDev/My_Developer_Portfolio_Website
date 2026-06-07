"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png"

interface Service { icon: string; label: string; }
interface Stat { num: string; label: string; }

const services: Service[] = [
  { icon: "◈", label: "Web Dev" },
  { icon: "◉", label: "Mobile Apps" },
  { icon: "◎", label: "AI Integration" },
  { icon: "⬡", label: "Admin Panels" },
  { icon: "◇", label: "Maintenance" },
  { icon: "◆", label: "Software Dev" },
];

const words: string[] = ["Innovate.", "Integrate.", "Elevate."];

const STATS: Stat[] = [
  { num: "4+", label: "Years" },
  { num: "20+", label: "Projects" },
  { num: "10+", label: "Experts" },
  { num: "99%", label: "Satisfaction" },
];

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Founders", href: "#founders" },
];

interface Drop { y: number; speed: number; opacity: number; len: number; color: string; chars: string[]; }
interface Particle { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string; }

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIndex(i => (i + 1) % words.length); setVisible(true); }, 400);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const FONT = 13; const CHARS = "アイウエオカキクケコ0123456789ABCDEF<>{}[]|!@#$%";
    let drops: Drop[] = [];
    const initDrops = () => {
      const cols = Math.floor(canvas.width / 16);
      drops = Array.from({ length: cols }, (): Drop => ({
        y: Math.random() * -canvas.height, speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.25 + 0.04, len: Math.floor(Math.random() * 14) + 6,
        color: Math.random() > 0.8 ? "#7B61FF" : "#00E5CC", chars: [],
      }));
    };
    initDrops(); window.addEventListener("resize", initDrops);
    const colors = ["#00E5CC", "#7B61FF", "#00C2FF", "#B8FF57"];
    const particles: Particle[] = Array.from({ length: 45 }, (): Particle => ({
      x: Math.random() * (canvas.width || 400), y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4, opacity: Math.random() * 0.45 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    let last = 0;
    const draw = (t: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (t - last < 38) return; last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colW = canvas.width / (drops.length || 1);
      drops.forEach((d, i) => {
        if (Math.random() < 0.25)
          d.chars = Array.from({ length: d.len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        const x = i * colW + colW / 2;
        d.chars.forEach((ch, j) => {
          const cy = d.y - j * FONT; if (cy < 0 || cy > canvas.height) return;
          ctx.font = `${FONT}px monospace`;
          ctx.globalAlpha = j === 0 ? d.opacity : d.opacity * (1 - j / d.len) * 0.5;
          ctx.fillStyle = j === 0 ? "#fff" : d.color; ctx.fillText(ch, x - FONT / 2, cy);
        });
        d.y += d.speed * FONT * 0.45;
        if (d.y - d.len * FONT > canvas.height) {
          d.y = Math.random() * -150; d.speed = Math.random() * 0.8 + 0.3;
          d.opacity = Math.random() * 0.25 + 0.04;
          d.color = Math.random() > 0.8 ? "#7B61FF" : "#00E5CC";
        }
      });
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.opacity; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#00E5CC"; ctx.globalAlpha = (1 - d / 90) * 0.1;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); window.removeEventListener("resize", initDrops); };
  }, []);

  return (
    <section className="relative min-h-svh bg-[#030A10] text-[#E0EFFF] font-sans overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#7B61FF]/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[-5%] w-[45vw] h-[45vw] max-w-[350px] max-h-[350px] rounded-full bg-[#00E5CC]/[0.08] blur-[100px] pointer-events-none z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      {/* ── Nav ── */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-5 border-b border-[#00E5CC]/10 animate-[fadeDown_0.7s_ease_both]">
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center gap-2 font-mono text-sm sm:text-base tracking-wider">
          <Image
            src={logo}
            alt="Ravana Tech Solutions Logo"
            width={120}
            height={52}
            className="rounded-md"
            priority
          />
        </div>

        {/* Desktop links */}
        <ul className="hidden sm:flex gap-6 lg:gap-8 list-none text-sm text-[#6B7DA0]">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-[#00E5CC] transition-colors duration-200">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden sm:inline-flex border border-[#00E5CC]/25 text-[#00E5CC] text-xs sm:text-sm px-4 py-2 rounded-full font-mono hover:bg-[#00E5CC] hover:text-[#030A10] transition-all duration-200 whitespace-nowrap cursor-pointer">
          Contact →
        </a>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] p-2 cursor-pointer z-30"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-[#00E5CC] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#00E5CC] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#00E5CC] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`sm:hidden fixed inset-0 z-[15] transition-all duration-400 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#030A10]/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        {/* Panel */}
        <div className={`absolute top-0 right-0 h-full w-[72vw] max-w-[280px] bg-[#060F18] border-l border-[#00E5CC]/15 flex flex-col pt-24 pb-10 px-8 transition-transform duration-400 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <ul className="flex flex-col gap-1 list-none mb-10">
            {NAV_LINKS.map((l, i) => (
              <li key={l.label} style={{ animationDelay: `${i * 60}ms` }}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-3.5 text-[#6B7DA0] hover:text-[#00E5CC] transition-colors duration-200 font-mono text-sm tracking-wide border-b border-white/5"
                >
                  <span className="text-[#00E5CC]/40 text-xs">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="border border-[#00E5CC]/25 text-[#00E5CC] text-sm px-5 py-2.5 rounded-full font-mono text-center hover:bg-[#00E5CC] hover:text-[#030A10] transition-all duration-200"
          >
            Contact →
          </a>
          {/* Decorative corner */}
          <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-[#7B61FF]/10 blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Hero body */}
      <div className="relative z-[5] flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-10 pb-20 sm:pt-14 sm:pb-24 gap-0">
        <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-7 sm:mb-9 animate-[fadeUp_0.8s_0.1s_ease_both]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
          Ravana Tech Solutions
        </div>
        <h1 className="font-bold leading-[1.05] tracking-tight mb-2 animate-[fadeUp_0.9s_0.2s_ease_both] text-[clamp(2.2rem,9vw,5.5rem)]">
          <span className="block text-[#E0EFFF]">We Build Digital</span>
          <span className="block bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-[#00C2FF] bg-clip-text text-transparent">Experiences</span>
        </h1>
        <div className="flex items-center justify-center mb-5 sm:mb-8 animate-[fadeUp_0.9s_0.3s_ease_both] h-[clamp(2.8rem,8vw,5.5rem)]">
          <span className={`font-mono text-[#B8FF57] [text-shadow:0_0_30px_rgba(184,255,87,0.3)] inline-block transition-all duration-[350ms] text-[clamp(1.6rem,6vw,4rem)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5"}`}>
            {words[wordIndex]}
          </span>
        </div>
        <p className="max-w-[500px] font-light leading-[1.75] text-[#5A6E88] mb-7 sm:mb-11 animate-[fadeUp_0.9s_0.4s_ease_both] text-[clamp(0.85rem,2.5vw,1rem)]">
          Pixel-perfect web interfaces, AI-powered backends, mobile apps, admin systems, and ongoing maintenance — technology that scales.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8 sm:mb-12 animate-[fadeUp_0.9s_0.5s_ease_both]">
          <button className="bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] text-white font-medium rounded-full shadow-[0_0_28px_rgba(0,229,204,0.2)] hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(0,229,204,0.35)] transition-all duration-200 cursor-pointer text-[clamp(0.8rem,2.5vw,0.9rem)] px-6 sm:px-8 py-2.5 sm:py-3">
            Start a Project
          </button>
          <button className="border border-white/10 text-[#8A9BB8] rounded-full hover:border-[#00E5CC]/30 hover:text-[#00E5CC] transition-all duration-200 cursor-pointer text-[clamp(0.8rem,2.5vw,0.9rem)] px-6 sm:px-8 py-2.5 sm:py-3">
            View Our Work
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-[580px] w-full animate-[fadeUp_0.9s_0.6s_ease_both]">
          {services.map((s, i) => (
            <div key={s.label} style={{ animationDelay: `${i * 60}ms` }}
              className="flex items-center gap-2 bg-white/[0.03] border border-[#00E5CC]/10 rounded-xl px-3 py-2 text-[#6B7DA0] hover:border-[#00E5CC]/30 hover:text-[#E0EFFF] hover:bg-[#00E5CC]/[0.04] transition-all duration-200 cursor-default text-[clamp(0.72rem,2.2vw,0.82rem)]">
              <span className="text-[#00E5CC] text-base leading-none">{s.icon}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#3A4B60] font-mono uppercase tracking-widest text-[10px] animate-[fadeUp_1s_1.2s_ease_both]">
        <span>Scroll</span>
        <div className="w-px h-9 bg-gradient-to-b from-transparent to-[#00E5CC] relative overflow-hidden">
          <span className="absolute top-[-100%] left-0 w-full h-full bg-[#00E5CC] animate-[scrollDrop_1.6s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="relative z-[5] flex justify-center border-t border-[#00E5CC]/[0.08] animate-[fadeUp_0.9s_0.8s_ease_both]">
        {STATS.map((s, i) => (
          <div key={s.label} className={`flex-1 max-w-[180px] text-center py-4 sm:py-6 px-2 sm:px-4 ${i < STATS.length - 1 ? "border-r border-[#00E5CC]/[0.08]" : ""}`}>
            <span className="block font-mono bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] bg-clip-text text-transparent mb-0.5 text-[clamp(1.1rem,4vw,1.6rem)]">{s.num}</span>
            <span className="text-[#3A4B60] tracking-wider text-[clamp(0.6rem,1.8vw,0.72rem)]">{s.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap');
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        @keyframes fadeDown  { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:none; } }
        @keyframes fadeUp    { from { opacity:0; transform:translateY(20px);  } to { opacity:1; transform:none; } }
        @keyframes blink     { 0%,100%{opacity:1;} 50%{opacity:.3;} }
        @keyframes scrollDrop{ 0%{top:-100%;opacity:1;} 100%{top:100%;opacity:0;} }
      `}</style>
    </section>
  );
}