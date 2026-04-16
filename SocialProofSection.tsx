/* ============================================================
   SQUISHLY Social Proof Section – TikTok-style review cards
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mia K.",
    handle: "@miasquishworld",
    avatar: "M",
    avatarColor: "#c9a7ff",
    rating: 5,
    text: "omg the medium box literally made my whole week 😭✨ the purple bunny squishy is SO soft i can't stop squeezing it",
    likes: "2.4k",
    tag: "Medium Box",
  },
  {
    name: "Zoe R.",
    handle: "@zoefidgets",
    avatar: "Z",
    avatarColor: "#f5a8e8",
    rating: 5,
    text: "got the mega box as a birthday gift for myself and it did NOT disappoint. 10/10 would recommend to every single person i know 🌟",
    likes: "1.8k",
    tag: "Mega Box",
  },
  {
    name: "Lily T.",
    handle: "@lilysensory",
    avatar: "L",
    avatarColor: "#a7d8ff",
    rating: 5,
    text: "as someone with anxiety these squishies are genuinely life-changing. the mini box is perfect for my desk at school 💙",
    likes: "3.1k",
    tag: "Mini Box",
  },
  {
    name: "Ava M.",
    handle: "@ava.unboxes",
    avatar: "A",
    avatarColor: "#c9a7ff",
    rating: 5,
    text: "the packaging alone is so cute i couldn't throw it away 😂 everything inside was so satisfying and high quality too",
    likes: "987",
    tag: "Medium Box",
  },
  {
    name: "Jade P.",
    handle: "@jadepastel",
    avatar: "J",
    avatarColor: "#f5a8e8",
    rating: 5,
    text: "ordered for my little sister and she literally screamed when she opened it 🥹 the surprise element is SO fun",
    likes: "1.2k",
    tag: "Mega Box",
  },
  {
    name: "Chloe S.",
    handle: "@chloe.squish",
    avatar: "C",
    avatarColor: "#a7d8ff",
    rating: 5,
    text: "been stress-squeezing the cloud squishy during every zoom call this week and honestly it's the only reason i'm surviving 😅",
    likes: "4.2k",
    tag: "Mini Box",
  },
];

export default function SocialProofSection() {
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
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fdf8ff 0%, #fce7f3 40%, #f0f9ff 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-[8%] text-5xl opacity-20 animate-float-y">💬</div>
      <div className="absolute bottom-10 right-[6%] text-4xl opacity-20 animate-float-y-slow">⭐</div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 text-[#9b6ee8] text-sm font-bold font-nunito mb-4 border border-[#c9a7ff]/30">
            🎤 The People Have Spoken
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-nunito text-[#3d2a5e] mb-4">
            Everyone's <span className="squish-gradient-text">Obsessed</span>
          </h2>
          <p className="text-lg text-[#9b7ec8] max-w-lg mx-auto font-dm-sans">
            Real reviews from real squishy lovers. Don't just take our word for it.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#c9a7ff" className="text-[#c9a7ff]" />
              ))}
            </div>
            <span className="text-2xl font-black font-nunito text-[#3d2a5e]">4.9</span>
            <span className="text-[#9b7ec8] font-dm-sans text-sm">from 2,400+ reviews</span>
          </div>
        </div>

        {/* Review cards – TikTok-style masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, i) => (
            <div
              key={review.handle}
              className={`reveal reveal-delay-${(i % 3) + 1} break-inside-avoid`}
            >
              <div className="squish-glass rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black font-nunito text-[#3d2a5e] flex-shrink-0"
                      style={{ background: review.avatarColor }}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold font-nunito text-[#3d2a5e] leading-none">{review.name}</p>
                      <p className="text-xs text-[#9b7ec8] font-dm-sans">{review.handle}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold font-nunito px-2.5 py-1 rounded-full"
                    style={{ background: `${review.avatarColor}33`, color: "#3d2a5e" }}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={12} fill="#c9a7ff" className="text-[#c9a7ff]" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-[#5a3f80] font-dm-sans leading-relaxed mb-3">
                  "{review.text}"
                </p>

                {/* Likes */}
                <div className="flex items-center gap-1.5 text-xs text-[#9b7ec8]">
                  <span>❤️</span>
                  <span className="font-semibold">{review.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
