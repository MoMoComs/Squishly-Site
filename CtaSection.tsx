/* ============================================================
   SQUISHLY CTA Section – Final push before footer
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

import { useEffect, useRef } from "react";

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3d2a5e 0%, #6b3fa0 50%, #9b6ee8 100%)" }}
    >
      {/* Animated blobs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] opacity-20 animate-blob-morph"
        style={{ background: "radial-gradient(circle, #c9a7ff, transparent 70%)", filter: "blur(60px)", animationDuration: "16s" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] opacity-15 animate-blob-morph"
        style={{ background: "radial-gradient(circle, #ffd6f6, transparent 70%)", filter: "blur(60px)", animationDuration: "20s", animationDelay: "5s" }}
      />

      {/* Floating sparkles */}
      {["top-8 left-[10%]", "top-16 right-[12%]", "bottom-12 left-[20%]", "bottom-8 right-[18%]"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-white/20 text-3xl animate-float-y`} style={{ animationDelay: `${i * 0.5}s` }}>
          ✦
        </div>
      ))}

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-bold font-nunito mb-6 border border-white/20">
            🚀 Limited First Drop
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-nunito text-white mb-6 leading-tight">
            Don't Miss Your<br />
            <span style={{ background: "linear-gradient(135deg, #ffd6f6, #c9a7ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Squishy Moment
            </span>
          </h2>
          <p className="text-lg text-white/70 font-dm-sans max-w-xl mx-auto mb-10 leading-relaxed">
            Our first drop is almost sold out. Secure your mystery box now and be part of the Squishly community from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#preorder"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-black font-nunito text-base text-[#3d2a5e] transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{ background: "linear-gradient(135deg, #ffd6f6, #c9a7ff)", boxShadow: "0 8px 30px rgba(201, 167, 255, 0.4)" }}
            >
              Preorder Now ✨
            </a>
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold font-nunito text-base text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              Browse Boxes →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
