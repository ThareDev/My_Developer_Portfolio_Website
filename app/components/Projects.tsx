"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  accent: string;
  stat: { label: string; value: string };
  size: "large" | "small";
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "NexusPay",
    category: "Fintech · Web App",
    desc: "A real-time payment orchestration platform handling $2M+ in daily transactions across 18 currencies. Built with sub-200ms latency at scale.",
    tech: ["Next.js", "Node.js", "Redis", "PostgreSQL"],
    accent: "#00E5CC",
    stat: { label: "Daily Volume", value: "$2M+" },
    size: "large",
  },
  {
    id: "02",
    title: "Orbis AI",
    category: "AI · SaaS",
    desc: "GPT-4 powered document intelligence for legal teams. 90% reduction in contract review time.",
    tech: ["Python", "RAG", "React"],
    accent: "#7B61FF",
    stat: { label: "Time Saved", value: "90%" },
    size: "small",
  },
  {
    id: "03",
    title: "TrailOS",
    category: "Mobile · Logistics",
    desc: "Fleet management mobile app with live GPS, predictive maintenance, and driver analytics for 800+ vehicles.",
    tech: ["React Native", "WebSocket", "Maps"],
    accent: "#00C2FF",
    stat: { label: "Vehicles", value: "800+" },
    size: "small",
  },
  {
    id: "04",
    title: "Vanta Commerce",
    category: "E-commerce · Admin",
    desc: "Headless commerce engine with AI-powered merchandising, multi-warehouse inventory, and a custom CMS — deployed across 6 markets.",
    tech: ["Next.js", "Stripe", "Sanity", "AWS"],
    accent: "#B8FF57",
    stat: { label: "Markets", value: "6" },
    size: "large",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border bg-white/[0.02] overflow-hidden cursor-default transition-all duration-500 flex flex-col ${
        project.size === "large" ? "sm:col-span-1 lg:col-span-1" : ""
      }`}
      style={{
        borderColor: hovered ? `${project.accent}40` : "rgba(0,229,204,0.07)",
        boxShadow: hovered ? `0 0 50px ${project.accent}10` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.4s, box-shadow 0.4s",
        transitionDelay: `${index * 90}ms`,
      }}
    >
      {/* Top bar */}
      <div
        className="h-[3px] transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)`, opacity: hovered ? 1 : 0.4 }}
      />

      {/* Mock screen area */}
      <div
        className="relative h-[160px] sm:h-[180px] mx-5 mt-5 rounded-xl overflow-hidden border transition-all duration-400"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${project.accent}10, transparent 70%), #060F18`,
          borderColor: hovered ? `${project.accent}30` : "rgba(255,255,255,0.05)",
        }}
      >
        {/* Grid lines inside mock screen */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${project.accent}20 1px, transparent 1px), linear-gradient(90deg, ${project.accent}20 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Fake UI bars */}
        <div className="absolute top-4 left-4 right-4 flex flex-col gap-2">
          <div className="h-1.5 rounded-full w-2/3" style={{ background: `${project.accent}50` }} />
          <div className="h-1.5 rounded-full w-1/2 opacity-30" style={{ background: project.accent }} />
          <div className="h-1.5 rounded-full w-3/4 opacity-20" style={{ background: project.accent }} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
          {[0.6, 0.4, 0.8].map((h, i) => (
            <div
              key={i}
              className="rounded-sm transition-all duration-300"
              style={{
                height: `${h * (hovered ? 48 : 36)}px`,
                background: `linear-gradient(to top, ${project.accent}60, ${project.accent}20)`,
              }}
            />
          ))}
        </div>
        {/* Stat badge */}
        <div
          className="absolute top-3 right-3 font-mono text-xs px-2.5 py-1 rounded-lg border backdrop-blur-sm transition-all duration-300"
          style={{
            background: `${project.accent}15`,
            borderColor: `${project.accent}40`,
            color: project.accent,
            boxShadow: hovered ? `0 0 12px ${project.accent}30` : "none",
          }}
        >
          {project.stat.value} {project.stat.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-[#D0E8FF] text-base sm:text-lg">{project.title}</h3>
            <span
              className="font-mono text-[10px] tracking-wider"
              style={{ color: project.accent }}
            >
              {project.category}
            </span>
          </div>
          <span className="font-mono text-xs text-[#1E3050] shrink-0">{project.id}</span>
        </div>

        <p className="text-[#3A5070] text-sm leading-relaxed flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded-md border transition-all duration-300"
              style={{
                background: hovered ? `${project.accent}10` : "rgba(255,255,255,0.02)",
                borderColor: hovered ? `${project.accent}30` : "rgba(255,255,255,0.05)",
                color: hovered ? project.accent : "#2A4060",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          className="mt-2 self-start font-mono text-xs tracking-wider transition-all duration-200"
          style={{ color: hovered ? project.accent : "#2A4060" }}
        >
          View Case Study →
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: headRef, visible: headVisible } = useInView();

  return (
    <section id="projects" className="relative bg-[#020810] text-[#E0EFFF] font-sans py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-[#00E5CC]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[40vw] h-[40vw] max-w-[320px] max-h-[320px] rounded-full bg-[#7B61FF]/[0.05] blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-14 sm:mb-20 transition-all duration-700"
          style={{ opacity: headVisible ? 1 : 0, transform: headVisible ? "none" : "translateY(24px)" }}
        >
          <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
            Selected Work
          </div>
          <h2 className="font-bold leading-tight text-[clamp(2rem,6vw,3.5rem)] mb-4">
            <span className="text-[#E0EFFF]">Products We&apos;re </span>
            <span className="bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-[#00C2FF] bg-clip-text text-transparent">Proud Of</span>
          </h2>
          <p className="max-w-[480px] mx-auto text-[#4A6080] font-light text-[clamp(0.875rem,2vw,1rem)]">
            A curated selection of products that showcase our range — from fintech to AI to enterprise logistics.
          </p>
        </div>

        {/* Projects grid: 2 cols on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        {/* View all */}
        <div
          className="text-center mt-14 transition-all duration-700"
          style={{ opacity: headVisible ? 1 : 0, transitionDelay: "500ms" }}
        >
          <button className="bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] text-white font-medium rounded-full text-sm px-8 py-3 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,229,204,0.25)] transition-all duration-200 cursor-pointer">
            View All Projects →
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap');
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
      `}</style>
    </section>
  );
}