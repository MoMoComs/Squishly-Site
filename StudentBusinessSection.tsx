/* ============================================================
   SQUISHLY Student Business Section
   Highlights that this is a student-run HS business
   ============================================================ */

export default function StudentBusinessSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Wavy divider top */}
      <svg
        className="absolute top-0 left-0 w-full h-24 text-white"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <div className="squish-glass rounded-3xl p-8 sm:p-12 text-center">
          <div className="mb-6 text-5xl">🎓</div>
          
          <h2 className="text-3xl sm:text-4xl font-black font-nunito text-[#3d2a5e] mb-4">
            Made by Students, For Gen Z
          </h2>
          
          <p className="text-lg text-[#9b7ec8] font-dm-sans mb-6 leading-relaxed">
            Squishly is a high school student-run business born from a passion for stress relief and sensory joy. 
            We're a small team of Gen Z entrepreneurs dedicated to bringing happiness and comfort to our community 
            through thoughtfully curated mystery boxes.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-[#c9a7ff]/20 to-[#f5a8e8]/20 rounded-xl p-4">
              <div className="text-3xl font-black text-[#3d2a5e] mb-1">100%</div>
              <p className="text-sm text-[#9b7ec8] font-nunito">Student-Owned</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5a8e8]/20 to-[#a7d8ff]/20 rounded-xl p-4">
              <div className="text-3xl font-black text-[#3d2a5e] mb-1">💜</div>
              <p className="text-sm text-[#9b7ec8] font-nunito">Made with Love</p>
            </div>
            <div className="bg-gradient-to-br from-[#a7d8ff]/20 to-[#c9a7ff]/20 rounded-xl p-4">
              <div className="text-3xl font-black text-[#3d2a5e] mb-1">🌟</div>
              <p className="text-sm text-[#9b7ec8] font-nunito">Gen Z Energy</p>
            </div>
          </div>

          <p className="text-sm text-[#b09ec8] font-dm-sans mt-8">
            Supporting a student business means supporting young entrepreneurs and the future of commerce. 
            Thank you for believing in us! ✨
          </p>
        </div>
      </div>

      {/* Wavy divider bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 text-[#f9f5ff]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,0 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
