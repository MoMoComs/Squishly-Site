/* ============================================================
   SQUISHLY Benefits Section – Icons + short text grid
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

import { useEffect, useRef } from "react";
import { Sparkles, Heart, Zap, Gift, Shield, Truck } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    emoji: "✨",
    title: "100% Surprise",
    description: "Every box is a mystery. No spoilers — just pure unboxing joy every single time.",
    color: "#c9a7ff",
  },
  {
    icon: Heart,
    emoji: "💆",
    title: "Stress-Relieving",
    description: "Scientifically-backed sensory toys that help calm anxiety and improve focus.",
    color: "#f5a8e8",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Gen Z Curated",
    description: "Handpicked by people who actually get the vibe. Trendy, satisfying, and totally shareable.",
    color: "#a7d8ff",
  },
  {
    icon: Gift,
    emoji: "🎁",
    title: "Perfect Gift",
    description: "Birthdays, care packages, or just because — Squishly boxes make everyone smile.",
    color: "#c9a7ff",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Safe & Tested",
    description: "All items are non-toxic, child-safe, and quality-tested before they reach your hands.",
    color: "#f5a8e8",
  },
  {
    icon: Truck,
    emoji: "🚀",
    title: "Fast Shipping",
    description: "Ships within 3–5 business days. Track your box every step of the way.",
    color: "#a7d8ff",
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #c9a7ff, transparent)", filter: "blur(50px)" }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #a7d8ff, transparent)", filter: "blur(50px)" }} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f3e8ff] text-[#9b6ee8] text-sm font-bold font-nunito mb-4">
            💜 Why Squishly?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-nunito text-[#3d2a5e] mb-4">
            Built for <span className="squish-gradient-text">Your Vibe</span>
          </h2>
          <p className="text-lg text-[#9b7ec8] max-w-lg mx-auto font-dm-sans">
            More than just toys — it's a whole mood. Here's why thousands of people love Squishly.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`reveal reveal-delay-${(i % 3) + 1} group`}
            >
              <div className="p-6 rounded-2xl border border-[#f3e8ff] hover:border-[#c9a7ff]/40 bg-gradient-to-br from-white to-[#fdf8ff] hover:shadow-xl hover:shadow-purple-100/40 transition-all duration-300 hover:-translate-y-1 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${benefit.color}22` }}
                >
                  {benefit.emoji}
                </div>
                <h3 className="text-lg font-black font-nunito text-[#3d2a5e] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#9b7ec8] font-dm-sans leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
