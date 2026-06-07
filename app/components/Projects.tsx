"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import pr1 from "@/public/pr1.png";
import pr2 from "@/public/p2.png";
import pr3 from "@/public/pr3.png";
import pr4 from "@/public/pr4.png";

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  tech: string[];
  accent: string;
  stat: { label: string; value: string };
  size: "large" | "small";
  link: string;
  image: StaticImageData;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Lil Rome Praba",
    category: "Music · Artist Website",
    desc: "Official website for Sri Lankan rapper Lil Rome Praba — manage shows, stream tracks, and book the artist. A genre-bending hub for his growing fanbase.",
    tech: ["Next.js", "Tailwind", "Streaming API"],
    accent: "#B8FF57",
    stat: { label: "Genre", value: "Hip-Hop" },
    size: "large",
    link: "https://www.lilromepraba.com/",
    image: pr1,
  },
  {
    id: "02",
    title: "SS West Coast",
    category: "Business · Cleaning Services",
    desc: "Premium cleaning services showcase for an Australian company. Elegant, conversion-focused design with smooth animations and attention to detail.",
    tech: ["Next.js", "Tailwind", "Animations"],
    accent: "#00E5CC",
    stat: { label: "Location", value: "AU" },
    size: "small",
    link: "https://www.sswestcoast.com.au/",
    image: pr2,
  },
  {
    id: "03",
    title: "Holixia Enterprises",
    category: "E-commerce · DTF Printing",
    desc: "Upload designs, get professional DTF prints with vibrant colors and fast delivery. Includes a full admin panel for order and inventory management.",
    tech: ["Next.js", "MongoDB", "Redux", "Nodemailer"],
    accent: "#7B61FF",
    stat: { label: "Users", value: "1000+" },
    size: "small",
    link: "https://holixia-dtf-client-web.vercel.app/",
    image: pr3,
  },
  {
    id: "04",
    title: "Sri Sambuddhaloka",
    category: "Education · Dhamma School",
    desc: "Official website for Sri Sambuddhaloka Dhamma School — illuminating hearts with timeless wisdom, shaping thousands of lives across the globe.",
    tech: ["Next.js", "Tailwind"],
    accent: "#00C2FF",
    stat: { label: "Reach", value: "Global" },
    size: "large",
    link: "https://sri-sambudhdhaloka-dhamma-school-we.vercel.app/",
    image: pr4,
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
      className="relative rounded-2xl border bg-white/[0.02] overflow-hidden cursor-default flex flex-col"
      style={{
        borderColor: hovered ? `${project.accent}40` : "rgba(0,229,204,0.07)",
        boxShadow: hovered ? `0 0 50px ${project.accent}10` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.4s, box-shadow 0.4s",
        transitionDelay: `${index * 90}ms`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Screenshot area */}
      <div
        className="relative h-[140px] sm:h-[200px] mx-5 mt-5 rounded-xl overflow-hidden border transition-all duration-400"
        style={{
          borderColor: hovered ? `${project.accent}30` : "rgba(255,255,255,0.05)",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${project.accent}20 0%, transparent 60%)`,
          }}
        />
        {/* Stat badge */}
        <div
          className="absolute top-3 right-3 font-mono text-xs px-2.5 py-1 rounded-lg border backdrop-blur-sm transition-all duration-300"
          style={{
            background: `${project.accent}20`,
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
            <span className="font-mono text-[10px] tracking-wider" style={{ color: project.accent }}>
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

        {/* View Project button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-start font-mono text-xs tracking-wider px-4 py-2 rounded-full border transition-all duration-200"
          style={{
            color: hovered ? project.accent : "#2A4060",
            borderColor: hovered ? `${project.accent}40` : "rgba(255,255,255,0.05)",
            background: hovered ? `${project.accent}10` : "transparent",
          }}
        >
          View Project →
        </a>
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
            A curated selection of products that showcase our range — from music to e-commerce to education.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
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