"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import founder1 from "@/public/founder1.jpeg";
import founder2 from "@/public/founder2.jpeg";
import founder3 from "@/public/founder3.jpeg";

interface Founder {
  name: string;
  role: string;
  bio: string;
  img: StaticImageData | null;
  objectPosition: string; // e.g. "center top", "center center"
  initials: string;
  accent: string;
  links: { label: string; href: string }[];
  tags: string[];
}

const FOUNDERS: Founder[] = [
  {
    name: "Tharaka Athuluwage",
    role: "CEO & Co-Founder",
    bio: "Full-stack engineer with deep expertise in mobile and web development. Currently serving as Team Lead and Senior Software Engineer, Tharaka holds a degree in Information Technology specialized in Software Engineering — and doubles as Ravana Tech Solutions' AI/ML strategist.",
    img: founder1,
    objectPosition: "center 20%",
    initials: "TA",
    accent: "#00E5CC",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter",  href: "#" },
    ],
    tags: ["Mobile & Web Dev", "Team Lead", "SSE", "AI/ML Strategy", "IT Graduate"],
  },
  {
    name: "Chathil Mandinu",
    role: "Co-Founder & Chief Business Officer",
    bio: "The business engine behind Ravana Tech Solutions. Chathil drives investment strategy, brand partnerships, and social media growth — currently a 3rd-year Information Technology undergraduate with a sharp instinct for opportunity and an eye for what the market needs.",
    img: founder2,
    objectPosition: "center top",
    initials: "CM",
    accent: "#7B61FF",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
    tags: ["Business Strategy", "Main Investor", "Social Media", "IT Undergraduate"],
  },
  {
    name: "Kalpa Sahan",
    role: "Co-Founder & Marketing Strategist",
    bio: "A 4th-year Information Technology undergraduate with a sharp eye for brand storytelling and growth. Drives Ravana Tech Solutions' marketing strategy — turning complex technical products into compelling narratives that reach the right audience.",
    img: founder3,
    objectPosition: "center center",
    initials: "MK",
    accent: "#FF6B6B",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter",  href: "#" },
    ],
    tags: ["Marketing Strategy", "Brand Storytelling", "IT Undergraduate", "Growth"],
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

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border bg-white/[0.02] overflow-hidden transition-all duration-500 group"
      style={{
        borderColor: hovered ? `${founder.accent}40` : "rgba(0,229,204,0.07)",
        boxShadow: hovered ? `0 0 60px ${founder.accent}12` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${index % 2 === 0 ? 28 : 36}px)`,
        transition: "opacity 0.65s ease, transform 0.65s ease, border-color 0.4s, box-shadow 0.4s",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[3px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${founder.accent}, ${founder.accent}30, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Photo area */}
      <div
        className="relative mx-5 mt-5 rounded-xl overflow-hidden transition-all duration-400"
        style={{
          height: "clamp(320px, 45vw, 420px)",
          border: `1px solid ${hovered ? founder.accent + "40" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${founder.accent}18 0%, #060F18 70%)`,
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(${founder.accent}30 1px, transparent 1px), linear-gradient(90deg, ${founder.accent}30 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Real image — shown if img is set, falls back to avatar */}
        {founder.img ? (
          <Image
            src={founder.img}
            alt={founder.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: founder.objectPosition }}
            sizes="(max-width: 640px) 90vw, 45vw"
          />
        ) : (
          /* Placeholder avatar */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full grid place-items-center text-2xl font-bold font-mono border-2 transition-all duration-300"
              style={{
                background: `radial-gradient(ellipse at 30% 30%, ${founder.accent}30, ${founder.accent}08)`,
                borderColor: `${founder.accent}50`,
                color: founder.accent,
                boxShadow: hovered ? `0 0 24px ${founder.accent}40` : "none",
              }}
            >
              {founder.initials}
            </div>
            <span className="font-mono text-[10px] text-[#2A4060] tracking-widest">PHOTO PLACEHOLDER</span>
          </div>
        )}

        {/* Corner badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 rounded-lg border backdrop-blur-sm transition-all duration-300"
          style={{
            background: `${founder.accent}15`,
            borderColor: `${founder.accent}40`,
            color: founder.accent,
            boxShadow: hovered ? `0 0 10px ${founder.accent}25` : "none",
          }}
        >
          {founder.role.split(" ")[0]}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-[#D0E8FF] text-xl mb-0.5">{founder.name}</h3>
          <p className="font-mono text-xs tracking-wider" style={{ color: founder.accent }}>
            {founder.role}
          </p>
        </div>

        <p className="text-[#3A5070] text-sm leading-relaxed">{founder.bio}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {founder.tags.map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-1 rounded-md border transition-all duration-300"
              style={{
                background: hovered ? `${founder.accent}10` : "rgba(255,255,255,0.02)",
                borderColor: hovered ? `${founder.accent}30` : "rgba(255,255,255,0.05)",
                color: hovered ? founder.accent : "#2A4060",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Social links */}
        <div className="flex gap-3 pt-1">
          {founder.links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-xs border px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                borderColor: hovered ? `${founder.accent}40` : "rgba(255,255,255,0.08)",
                color: hovered ? founder.accent : "#2A4060",
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Founders() {
  const { ref: headRef, visible: headVisible } = useInView();

  return (
    <section id="founders" className="relative bg-[#030A10] text-[#E0EFFF] font-sans py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[550px] max-h-[550px] rounded-full bg-[#7B61FF]/[0.04] blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] max-w-[220px] max-h-[220px] rounded-full bg-[#00E5CC]/[0.05] blur-[80px] pointer-events-none" />

      <div className="relative w-full">
        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-14 sm:mb-20 transition-all duration-700"
          style={{ opacity: headVisible ? 1 : 0, transform: headVisible ? "none" : "translateY(24px)" }}
        >
          <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
            The Team
          </div>
          <h2 className="font-bold leading-tight text-[clamp(2rem,6vw,3.5rem)] mb-4">
            <span className="text-[#E0EFFF]">Meet the </span>
            <span className="bg-gradient-to-r from-[#00E5CC] via-[#7B61FF] to-[#00C2FF] bg-clip-text text-transparent">Founders</span>
          </h2>
          <p className="max-w-[480px] mx-auto text-[#4A6080] font-light text-[clamp(0.875rem,2vw,1rem)]">
            Two builders who&apos;ve been in the trenches — and came back to create something different.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} founder={f} index={i} />)}
        </div>

        {/* Quote strip */}
        <div
          className="mt-16 sm:mt-20 rounded-2xl border border-[#00E5CC]/08 bg-white/[0.015] p-8 sm:p-10 text-center relative overflow-hidden transition-all duration-700"
          style={{ opacity: headVisible ? 1 : 0, transitionDelay: "500ms" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5CC]/[0.03] to-[#7B61FF]/[0.03]" />
          <div className="relative">
            <div className="text-4xl text-[#00E5CC]/20 font-mono mb-4">&ldquo;</div>
            <p className="text-[#6A8AAA] text-base sm:text-lg font-light leading-relaxed max-w-[560px] mx-auto italic">
              We started Ravana Tech Solutions because we were tired of software that worked but didn&apos;t sing. Every product we ship should feel inevitable.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {FOUNDERS.map(f => (
                  <div
                    key={f.name}
                    className="w-8 h-8 rounded-full border-2 border-[#030A10] grid place-items-center font-mono text-[10px] font-bold"
                    style={{ background: `${f.accent}25`, color: f.accent, borderColor: "#030A10" }}
                  >
                    {f.initials[0]}
                  </div>
                ))}
              </div>
              <span className="text-[#2A4060] font-mono text-xs tracking-wide">Tharaka & Chathil & Kalpa</span>
            </div>
          </div>
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