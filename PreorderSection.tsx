/* ============================================================
   SQUISHLY Preorder Form Section – Clean styled form
   Dreamy Glassmorphism + Organic Softness
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function PreorderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    box: "",
    quantity: "1",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitMutation = trpc.preorder.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.box) return;
    setLoading(true);
    try {
      await submitMutation.mutateAsync(form);
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Preorder submission error:", error);
      alert("Failed to submit preorder. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section
      id="preorder"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%)" }}
    >
      {/* Animated blobs */}
      <div
        className="absolute top-[-5%] left-[-5%] w-96 h-96 opacity-40 animate-blob-morph"
        style={{ background: "radial-gradient(circle, #c9a7ff, transparent 70%)", filter: "blur(50px)", animationDuration: "14s" }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-80 h-80 opacity-30 animate-blob-morph"
        style={{ background: "radial-gradient(circle, #a7d8ff, transparent 70%)", filter: "blur(50px)", animationDuration: "18s", animationDelay: "4s" }}
      />

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/70 text-[#9b6ee8] text-sm font-bold font-nunito mb-4 border border-[#c9a7ff]/30">
            🎀 Limited Spots
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-nunito text-[#3d2a5e] mb-4">
            Reserve Your <span className="squish-gradient-text">Spot</span>
          </h2>
          <p className="text-lg text-[#9b7ec8] max-w-lg mx-auto font-dm-sans">
            Preorders are limited. Lock in your box now and be first in line when we ship.
          </p>
        </div>

        {/* Form card */}
        <div className="reveal reveal-delay-1">
          <div className="squish-glass rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-200/30">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold font-nunito text-[#7a5fa0] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Mia Kim"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a7ff]/40 bg-white/70 text-[#3d2a5e] placeholder-[#c4aee0] font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a7ff]/60 focus:border-[#c9a7ff] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold font-nunito text-[#7a5fa0] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a7ff]/40 bg-white/70 text-[#3d2a5e] placeholder-[#c4aee0] font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a7ff]/60 focus:border-[#c9a7ff] transition-all"
                  />
                </div>

                {/* Box selection */}
                <div>
                  <label className="block text-sm font-bold font-nunito text-[#7a5fa0] mb-1.5">
                    Box Selection
                  </label>
                  <select
                    name="box"
                    value={form.box}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#c9a7ff]/40 bg-white/70 text-[#3d2a5e] font-dm-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a7ff]/60 focus:border-[#c9a7ff] transition-all appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239b6ee8' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                  >
                    <option value="" disabled>Choose your box...</option>
                    <option value="mini">🌸 Mini Box – $14.99</option>
                    <option value="medium">💜 Medium Box – $24.99 (Most Popular)</option>
                    <option value="mega">🌟 Mega Box – $39.99</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold font-nunito text-[#7a5fa0] mb-1.5">
                    Quantity
                  </label>
                  <div className="flex gap-3">
                    {["1", "2", "3", "4+"].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setForm({ ...form, quantity: q })}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold font-nunito transition-all duration-200 border-2 ${
                          form.quantity === q
                            ? "border-[#c9a7ff] bg-[#c9a7ff]/20 text-[#3d2a5e]"
                            : "border-[#c9a7ff]/30 bg-white/50 text-[#9b7ec8] hover:border-[#c9a7ff]/60"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full squish-btn-primary py-4 text-base justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Reserving your spot...
                    </>
                  ) : (
                    "Reserve My Spot 🎀"
                  )}
                </button>

                <p className="text-xs text-center text-[#b09ec8] font-dm-sans">
                  No payment required now. We'll email you when it's time to complete your order.
                </p>
              </form>
            ) : (
              /* Confirmation state */
              <div className="text-center py-8 animate-fade-up">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #c9a7ff, #f5a8e8)" }}>
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-black font-nunito text-[#3d2a5e] mb-3">
                  You're on the list. 🎉
                </h3>
                <p className="text-[#9b7ec8] font-dm-sans text-base leading-relaxed max-w-sm mx-auto">
                  We've saved your spot, <strong className="text-[#7a5fa0]">{form.name}</strong>! Check your inbox at <strong className="text-[#7a5fa0]">{form.email}</strong> for a confirmation. We'll reach out when your box is ready to ship. ✨
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", box: "", quantity: "1" }); }}
                    className="squish-btn-outline text-sm"
                  >
                    Add another box
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
