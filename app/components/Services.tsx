"use client";

import { useEffect, useRef, useState } from "react";

interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  accent: string;
}

const SERVICES: Service[] = [
  {
    id: "01",
    icon: "◈",
    title: "Web Development",
    desc: "Pixel-perfect, performant web applications built with modern stacks. From landing pages to complex SPAs, every line crafted with intent.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    accent: "#00E5CC",
  },
  {
    id: "02",
    icon: "◉",
    title: "Mobile Apps",
    desc: "Cross-platform mobile experiences that feel native. Smooth, fast, and beautifully designed for iOS and Android alike.",
    tags: ["React Native", "Expo", "Flutter"],
    accent: "#7B61FF",
  },
  {
    id: "03",
    icon: "◎",
    title: "AI Integration",
    desc: "Embed intelligence into your product. LLM pipelines, computer vision, recommendation engines — we make AI practical and production-ready.",
    tags: ["LLMs", "RAG", "OpenAI", "Fine-tuning"],
    accent: "#00C2FF",
  },
  {
    id: "04",
    icon: "⬡",
    title: "Admin Panels",
    desc: "Powerful internal tools that your team will actually enjoy using. Custom dashboards, role-based access, and real-time data at a glance.",
    tags: ["RBAC", "Analytics", "Real-time", "CMS"],
    accent: "#B8FF57",
  },
  {
    id: "05",
    icon: "◇",
    title: "Maintenance & Support",
    desc: "Ongoing care that keeps your product healthy. Performance monitoring, security patches, and rapid incident response — always-on.",
    tags: ["Monitoring", "SLA", "DevOps", "CI/CD"],
    accent: "#FF6B6B",
  },
  {
    id: "06",
    icon: "◆",
    title: "Software Development",
    desc: "End-to-end product engineering from architecture to deployment. Scalable backends, microservices, APIs — built to last.",
    tags: ["Node.js", "Python", "PostgreSQL", "AWS"],
    accent: "#FFB347",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transitionDelay: `${index * 80}ms`,
        borderColor: hovered ? `${service.accent}40` : "rgba(0,229,204,0.08)",
        boxShadow: hovered ? `0 0 40px ${service.accent}12, inset 0 0 30px ${service.accent}06` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
      className="relative group rounded-2xl border bg-white/[0.02] p-6 sm:p-7 flex flex-col gap-4 cursor-default transition-all duration-500 overflow-hidden"
    >
      {/* Corner accent line */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${service.accent}, transparent)`,
          width: hovered ? "100%" : "40%",
        }}
      />

      {/* ID + icon row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl grid place-items-center text-xl transition-all duration-300"
          style={{
            background: hovered ? `${service.accent}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${hovered ? service.accent + "50" : "rgba(255,255,255,0.06)"}`,
            color: service.accent,
            boxShadow: hovered ? `0 0 16px ${service.accent}30` : "none",
          }}
        >
          {service.icon}
        </div>
        <span className="font-mono text-xs text-[#2A3A50]">{service.id}</span>
      </div>

      <div>
        <h3
          className="font-bold text-[#D0E8FF] mb-2 transition-colors duration-300 text-[clamp(1rem,2.5vw,1.15rem)]"
          style={{ color: hovered ? "#fff" : "#D0E8FF" }}
        >
          {service.title}
        </h3>
        <p className="text-[#4A6080] leading-relaxed text-[clamp(0.8rem,2vw,0.875rem)]">
          {service.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map(t => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-1 rounded-md transition-all duration-300"
            style={{
              background: hovered ? `${service.accent}12` : "rgba(255,255,255,0.03)",
              color: hovered ? service.accent : "#3A5070",
              border: `1px solid ${hovered ? service.accent + "30" : "rgba(255,255,255,0.05)"}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          opacity: hovered ? 0.6 : 0,
        }}
      />
    </div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="relative bg-[#030A10] text-[#E0EFFF] font-sans py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#7B61FF]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] rounded-full bg-[#00E5CC]/[0.05] blur-[100px] pointer-events-none" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,229,204,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-14 sm:mb-20 transition-all duration-700"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(24px)" }}
        >
          <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
            What We Do
          </div>
          <h2 className="font-bold leading-tight tracking-tight text-[clamp(2rem,6vw,3.5rem)] mb-4">
            <span className="text-[#E0EFFF]">Services That </span>
            <span className="bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-[#00C2FF] bg-clip-text text-transparent">Scale</span>
          </h2>
          <p className="max-w-[520px] mx-auto text-[#4A6080] leading-relaxed font-light text-[clamp(0.875rem,2.5vw,1rem)]">
            From concept to deployment, we cover the full spectrum of digital product engineering — built for performance, designed to impress.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-14 sm:mt-20 transition-all duration-700"
          style={{ opacity: headerVisible ? 1 : 0, transitionDelay: "400ms" }}
        >
          <p className="text-[#3A5070] font-mono text-xs tracking-widest uppercase mb-5">
            Not sure what you need?
          </p>
          <button className="border border-[#00E5CC]/25 text-[#00E5CC] font-mono text-sm px-8 py-3 rounded-full hover:bg-[#00E5CC] hover:text-[#030A10] transition-all duration-200 cursor-pointer">
            Let's Talk →
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