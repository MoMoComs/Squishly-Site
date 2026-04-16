/* ============================================================
   SQUISHLY Product Section – 3 Box Cards with glassmorphism
   Mini Box, Medium Box (Most Popular), Mega Box
   ============================================================ */

import { useEffect, useRef } from "react";
import { ShoppingBag, Star } from "lucide-react";

const products = [
  {
    id: "mini",
    name: "Mini Box",
    emoji: "🌸",
    price: "$14.99",
    description: "Perfect starter kit with 2–3 adorable squishy surprises. Great for gifting or trying Squishly for the first time.",
    items: ["2–3 squishies", "1 stress ball", "Surprise item"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507964845/kPyG3utKFV4PZFUJiysXnV/squishly-mini-box-VyrCgPt8SmCxkZGwM6mxEU.webp",
    gradient: "from-[#f3e8ff] to-[#fce7f3]",
    accent: "#c9a7ff",
    popular: false,
  },
  {
    id: "medium",
    name: "Medium Box",
    emoji: "💜",
    price: "$24.99",
    description: "Our fan-favorite box packed with 4–5 curated squishies, fidget toys, and a mystery bonus item.",
    items: ["4–5 squishies", "1 fidget toy", "1 mystery bonus"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507964845/kPyG3utKFV4PZFUJiysXnV/squishly-medium-box-fNdtZM6QAvnDZ4Meq5TQDV.webp",
    gradient: "from-[#fce7f3] to-[#ede9fe]",
    accent: "#f5a8e8",
    popular: true,
  },
  {
    id: "mega",
    name: "Mega Box",
    emoji: "🌟",
    price: "$39.99",
    description: "The ultimate squishy haul — 8–10 premium items including rare squishies and sensory toys.",
    items: ["8–10 squishies", "2 fidget toys", "Priority shipping"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507964845/kPyG3utKFV4PZFUJiysXnV/squishly-mega-box-b62R973egHPXAhrGaFeFUW.webp",
    gradient: "from-[#dbeafe] to-[#f3e8ff]",
    accent: "#a7d8ff",
    popular: false,
  },
];

export default function ProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="shop" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
        style={{ background: "radial-gradient(circle, #c9a7ff, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-15 rounded-full"
        style={{ background: "radial-gradient(circle, #a7d8ff, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#f3e8ff] text-[#9b6ee8] text-sm font-bold font-nunito mb-4">
            🎁 Choose Your Box
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-nunito text-[#3d2a5e] mb-4">
            Pick Your <span className="squish-gradient-text">Squishy Haul</span>
          </h2>
          <p className="text-lg text-[#9b7ec8] max-w-xl mx-auto font-dm-sans">
            Every box is a surprise. Every squeeze is a vibe. Choose the size that fits your mood.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`reveal reveal-delay-${i + 1} relative group`}
            >
              {/* Popular badge */}
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-white text-xs font-bold font-nunito shadow-lg"
                  style={{ background: "linear-gradient(135deg, #c9a7ff, #f5a8e8)" }}>
                  <Star size={12} fill="white" />
                  Most Popular
                </div>
              )}

              {/* Card */}
              <div
                className={`h-full rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
                  ${product.popular
                    ? "border-[#c9a7ff] shadow-2xl shadow-purple-200/50 scale-105"
                    : "border-transparent shadow-xl shadow-purple-100/30 hover:shadow-2xl hover:shadow-purple-200/40"
                  }
                  hover:-translate-y-2 group-hover:border-[#c9a7ff]/60`}
                style={{ background: `linear-gradient(160deg, ${product.gradient.replace("from-", "").replace("to-", "").split(" ").join(", ")})` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56 bg-white/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black font-nunito text-[#3d2a5e]">
                      {product.emoji} {product.name}
                    </h3>
                    <span className="text-2xl font-black font-nunito squish-gradient-text">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-sm text-[#9b7ec8] font-dm-sans leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Items list */}
                  <ul className="space-y-1.5 mb-6">
                    {product.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#7a5fa0] font-medium">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                          style={{ background: product.accent }}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Preorder button */}
                  <a
                    href="#preorder"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold font-nunito text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
                      color: "#3d2a5e",
                      boxShadow: `0 4px 16px ${product.accent}66`,
                    }}
                  >
                    <ShoppingBag size={16} />
                    Preorder
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
