/* ============================================================
   SQUISHLY How It Works Section – 3 steps with icons
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

import { useEffect, useRef } from "react";
import { MousePointerClick, Package, Smile } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    emoji: "🛒",
    step: "01",
    title: "Pick Your Box",
    description: "Choose from Mini, Medium, or Mega — each packed with handpicked squishy surprises curated by our team.",
    color: "#c9a7ff",
    bg: "from-[#f3e8ff] to-[#ede9fe]",
  },
  {
    icon: Package,
    emoji: "📦",
    step: "02",
    title: "We Pack the Magic",
    description: "Our team carefully selects and packs your mystery items in adorable, eco-friendly packaging you'll want to keep.",
    color: "#f5a8e8",
    bg: "from-[#fce7f3] to-[#fdf2f8]",
  },
  {
    icon: Smile,
    emoji: "🤩",
    step: "03",
    title: "Unbox the Joy",
    description: "Your box arrives at your door. Open it, squeeze it, share it — and feel the stress melt away instantly.",
    color: "#a7d8ff",
    bg: "from-[#dbeafe] to-[#eff6ff]",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fdf8ff 0%, #fce7f3 50%, #f0f9ff 100%)" }}
    >
      {/* Floating decorations */}
      <div className="absolute top-12 left-[5%] text-4xl animate-float-y opacity-30" style={{ animationDelay: "0s" }}>✦</div>
      <div className="absolute bottom-16 right-[8%] text-3xl animate-float-y opacity-25" style={{ animationDelay: "1s" }}>✦</div>
      <div className="absolute top-[40%] right-[3%] w-24 h-24 rounded-full opacity-20 animate-blob-morph"
        style={{ background: "radial-gradient(circle, #c9a7ff, transparent)", filter: "blur(20px)" }} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 text-[#9b6ee8] text-sm font-bold font-nunito mb-4 border border-[#c9a7ff]/30">
            🪄 Super Simple
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-nunito text-[#3d2a5e] mb-4">
            How It <span className="squish-gradient-text">Works</span>
          </h2>
          <p className="text-lg text-[#9b7ec8] max-w-lg mx-auto font-dm-sans">
            Three easy steps to your next squishy obsession.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-[#c9a7ff] via-[#f5a8e8] to-[#a7d8ff] opacity-40 z-0" />

          {steps.map((step, i) => (
            <div key={step.step} className={`reveal reveal-delay-${i + 1} relative z-10`}>
              <div className="squish-glass rounded-3xl p-8 text-center h-full hover:-translate-y-2 transition-transform duration-300">
                {/* Step number */}
                <div className="text-xs font-black font-nunito tracking-widest text-[#c9a7ff] mb-3 uppercase">
                  Step {step.step}
                </div>

                {/* Icon circle */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}33, ${step.color}66)` }}
                >
                  {step.emoji}
                </div>

                <h3 className="text-xl font-black font-nunito text-[#3d2a5e] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#9b7ec8] font-dm-sans leading-relaxed">
                  {step.description}
                </p>

                {/* Connector dot */}
                <div
                  className="hidden md:block absolute top-16 right-0 translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md z-20"
                  style={{ background: step.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
