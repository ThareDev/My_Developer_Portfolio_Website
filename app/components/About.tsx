"use client";

import { useEffect, useRef, useState } from "react";

const PILLARS = [
  { icon: "◈", title: "Precision Engineering", desc: "Every component we ship is built to spec — no shortcuts, no tech debt." },
  { icon: "⬡", title: "Design-First Culture", desc: "Beauty and function aren't trade-offs. We insist on both, every time." },
  { icon: "◉", title: "Radical Transparency", desc: "You always know where your project stands — no surprises, ever." },
];

function useInView(threshold = 0.2) {
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

export default function About() {
  const { ref: leftRef, visible: leftVisible } = useInView();
  const { ref: rightRef, visible: rightVisible } = useInView();
  const { ref: pillarsRef, visible: pillarsVisible } = useInView(0.1);

  return (
    <section id="about" className="relative bg-[#030A10] text-[#E0EFFF] font-sans py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[55vw] h-[55vw] max-w-[500px] max-h-[500px] rounded-full bg-[#00E5CC]/[0.04] blur-[130px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[35vw] h-[35vw] max-w-[280px] max-h-[280px] rounded-full bg-[#7B61FF]/[0.07] blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Top split: text + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 sm:mb-28">

          {/* Left: copy */}
          <div
            ref={leftRef}
            className="flex flex-col justify-center transition-all duration-700"
            style={{ opacity: leftVisible ? 1 : 0, transform: leftVisible ? "none" : "translateX(-28px)" }}
          >
            <div className="inline-flex items-center gap-2 border border-[#00E5CC]/20 bg-[#00E5CC]/5 rounded-full px-4 py-1.5 font-mono text-[10px] sm:text-xs tracking-widest text-[#00E5CC] uppercase mb-7 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] shadow-[0_0_6px_#00E5CC] animate-[blink_2s_infinite]" />
              Who We Are
            </div>
            <h2 className="font-bold leading-tight tracking-tight text-[clamp(2rem,5vw,3.2rem)] mb-6">
              <span className="text-[#E0EFFF]">A Studio Obsessed With </span>
              <span className="bg-gradient-to-r from-[#00E5CC] to-[#7B61FF] bg-clip-text text-transparent">Craft</span>
            </h2>
            <p className="text-[#4A6080] leading-relaxed font-light mb-5 text-[clamp(0.875rem,2vw,1rem)]">
              Zer0xLabs is an elite software studio founded on one belief: exceptional products demand exceptional people. Since 2016, we've been building digital products for startups, scale-ups, and enterprise teams who refuse to settle.
            </p>
            <p className="text-[#4A6080] leading-relaxed font-light text-[clamp(0.875rem,2vw,1rem)]">
              We're a lean team of 35+ engineers, designers, and AI specialists — operating with the agility of a startup and the rigour of an agency that's shipped over 120 products worldwide.
            </p>

            {/* Inline stat strip */}
            <div className="flex gap-8 mt-10">
              {[["2016", "Founded"], ["35+", "Specialists"], ["12", "Countries"]].map(([n, l]) => (
                <div key={l}>
                  <span className="block font-mono text-2xl bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] bg-clip-text text-transparent">{n}</span>
                  <span className="text-[#3A5070] text-xs tracking-widest uppercase font-mono">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: abstract visual */}
          <div
            ref={rightRef}
            className="flex items-center justify-center transition-all duration-700"
            style={{ opacity: rightVisible ? 1 : 0, transform: rightVisible ? "none" : "translateX(28px)", transitionDelay: "150ms" }}
          >
            <div className="relative w-full max-w-[380px] aspect-square">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#00E5CC]/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-[12%] rounded-full border border-[#7B61FF]/10 animate-[spin_28s_linear_infinite_reverse]" />
              <div className="absolute inset-[24%] rounded-full border border-[#00C2FF]/10 animate-[spin_18s_linear_infinite]" />

              {/* Floating dots on rings */}
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full bg-[#00E5CC] shadow-[0_0_8px_#00E5CC]"
                  style={{
                    top: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 47}% - 4px)`,
                    left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 47}% - 4px)`,
                    opacity: 0.6,
                  }}
                />
              ))}

              {/* Center card */}
              <div className="absolute inset-[30%] rounded-2xl bg-gradient-to-br from-[#00E5CC]/10 to-[#7B61FF]/10 border border-[#00E5CC]/20 grid place-items-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold font-mono bg-gradient-to-br from-[#00E5CC] to-[#7B61FF] bg-clip-text text-transparent">Z</div>
                  <div className="text-[9px] font-mono text-[#3A5070] tracking-widest uppercase mt-1">Labs</div>
                </div>
              </div>

              {/* Orbit label chips */}
              {[
                { label: "React", top: "4%",  left: "55%" },
                { label: "AI",    top: "55%", left: "90%" },
                { label: "UX",    top: "85%", left: "40%" },
                { label: "Cloud", top: "40%", left: "2%"  },
              ].map(chip => (
                <div
                  key={chip.label}
                  className="absolute font-mono text-[10px] px-2 py-1 rounded-md bg-white/[0.04] border border-[#00E5CC]/15 text-[#00E5CC] backdrop-blur-sm"
                  style={{ top: chip.top, left: chip.left }}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700"
          style={{ opacity: pillarsVisible ? 1 : 0, transform: pillarsVisible ? "none" : "translateY(24px)" }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-2xl border border-[#00E5CC]/08 bg-white/[0.02] p-6 hover:border-[#00E5CC]/25 hover:bg-[#00E5CC]/[0.03] transition-all duration-300 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#00E5CC] to-transparent rounded-t-2xl" />
              <span className="text-2xl text-[#00E5CC] mb-4 block">{p.icon}</span>
              <h4 className="font-semibold text-[#C0D8F0] mb-2 text-sm">{p.title}</h4>
              <p className="text-[#3A5070] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap');
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
        @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      `}</style>
    </section>
  );
}