/* ============================================================
   SQUISHLY Hero Section – Dreamy Glassmorphism + Organic Softness
   Full-bleed gradient hero with animated blobs, product image, CTA
   ============================================================ */

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 35%, #dbeafe 70%, #f0f9ff 100%)",
      }}
    >
      {/* Animated background blobs */}
      <div
        className="absolute top-[-10%] left-[-8%] w-[500px] h-[500px] opacity-50 animate-blob-morph"
        style={{
          background: "radial-gradient(circle, #c9a7ff 0%, #e9d5ff 60%, transparent 80%)",
          filter: "blur(40px)",
          animationDuration: "12s",
        }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] opacity-40 animate-blob-morph"
        style={{
          background: "radial-gradient(circle, #ffd6f6 0%, #fbcfe8 60%, transparent 80%)",
          filter: "blur(40px)",
          animationDuration: "15s",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] opacity-35 animate-blob-morph"
        style={{
          background: "radial-gradient(circle, #a7d8ff 0%, #bfdbfe 60%, transparent 80%)",
          filter: "blur(35px)",
          animationDuration: "18s",
          animationDelay: "6s",
        }}
      />

      {/* Floating decorative shapes */}
      <div className="absolute top-24 left-[12%] w-10 h-10 rounded-full bg-[#c9a7ff]/40 animate-float-y" style={{ animationDelay: "0s" }} />
      <div className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-[#ffd6f6]/60 animate-float-y" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-[20%] w-8 h-8 rounded-full bg-[#a7d8ff]/50 animate-float-y" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[55%] left-[5%] w-5 h-5 rotate-45 bg-[#c9a7ff]/30 animate-float-y-slow" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[20%] right-[8%] w-7 h-7 rotate-12 bg-[#ffd6f6]/40 animate-float-y-slow" style={{ animationDelay: "1.5s" }} />

      {/* Star sparkles */}
      {["top-16 left-[30%]", "top-28 right-[25%]", "bottom-40 right-[30%]", "bottom-20 left-[35%]"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-[#c9a7ff]/60 text-xl animate-float-y-slow`} style={{ animationDelay: `${i * 0.7}s` }}>
          ✦
        </div>
      ))}

      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#c9a7ff]/40 text-[#9b6ee8] text-sm font-semibold font-nunito mb-6 shadow-sm animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-[#c9a7ff] animate-pulse" />
              Now accepting preorders!
            </div>

            {/* Main title */}
            <h1
              className="text-7xl sm:text-8xl lg:text-9xl font-black font-nunito leading-none mb-4 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="squish-gradient-text">Squishly</span>
            </h1>

            {/* Tagline */}
            <p
              className="text-2xl sm:text-3xl font-bold font-nunito text-[#7a5fa0] mb-4 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Squeeze the Stress Away 🌸
            </p>

            {/* Subtext */}
            <p
              className="text-lg sm:text-xl text-[#9b7ec8] font-dm-sans max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Mystery boxes filled with satisfying squishy toys, stress balls, and sensory fidget items — curated just for you.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <a href="#preorder" className="squish-btn-primary text-base px-8 py-3.5 animate-pulse-glow">
                Preorder Now ✨
              </a>
              <a href="#shop" className="squish-btn-outline text-base px-8 py-3.5">
                See the Boxes →
              </a>
            </div>


          </div>

          {/* Hero product image */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
                style={{ background: "linear-gradient(135deg, #c9a7ff, #ffd6f6, #a7d8ff)" }}
              />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663507964845/kPyG3utKFV4PZFUJiysXnV/squishly-hero-gGDbab2iiihSPLDpTWzLC3.webp"
                alt="Squishly Mystery Box overflowing with pastel squishy toys"
                className="relative z-10 w-full rounded-3xl shadow-2xl animate-float-y"
                style={{ animationDuration: "5s" }}
              />
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 z-20 squish-glass rounded-2xl px-4 py-2.5 shadow-lg animate-float-y-slow" style={{ animationDelay: "1s" }}>
                <p className="text-xs font-bold text-[#9b6ee8] font-nunito">🎁 Mystery Inside!</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
    </section>
  );
}
